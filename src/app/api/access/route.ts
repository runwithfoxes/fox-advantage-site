import { NextRequest, NextResponse } from "next/server";
import { getSignupRateLimiter } from "@/lib/rate-limit";

/*
  FULL ACCESS, FREE. Every ask on the resource centre posts here, except the course's own
  forms, which keep posting to /api/course-signup so course people stay on the course list
  and its welcome flow.

  Paul, 27 Sep 2026: "I want them going to klaviyo and we need to tag what they were looking
  for, so we can separate out people on the course from people looking for library only or
  a free report." So every submission carries WHAT the person asked for (`want`: library,
  report, dataset, tool, playbook, tracker, research) and WHICH one (`item`, a slug), and:

   1. the profile is upserted with `rwf_first_want` / `rwf_first_item` set once, on the first
      touch only (the first ask is the true one, same rule as course-signup's module), and
      `rwf_last_want` / `rwf_last_item` / `rwf_last_page` every time;
   2. `rwf_wants` is appended to, so a segment can say "wants contains library and not course";
   3. the profile is subscribed to the `resources-access` list (KLAVIYO_RESOURCES_LIST_ID,
      created 27 Sep 2026 with NO flow on it; re-check /lists/{id}/flow-triggers/ before
      attaching one, because adding to course-interest sends a live email and this must not);
   4. an event on a metric of its own, `Resource Access`, with the same properties, so a
      flow can be built on it later. ⛔ Never the metric name `Joined` (see course-signup).

  On success the browser gets an httpOnly cookie `rwf_access=1` for a year, which is what
  "sign in" means at launch: the pages can open their downloads to a returning reader without
  asking twice. Same two-step order as course-signup: profile first, then list, so a flow that
  fires on the list can read the properties.
*/

const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";
const WANTS = new Set(["library", "report", "dataset", "tool", "playbook", "tracker", "research", "account"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function headers(key: string, write: boolean) {
  const h: Record<string, string> = { Authorization: `Klaviyo-API-Key ${key}`, revision: REVISION, accept: "application/vnd.api+json" };
  if (write) h["content-type"] = "application/vnd.api+json";
  return h;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function existingProfile(key: string, email: string) {
  const res = await fetch(`${KLAVIYO}/profiles/?filter=${encodeURIComponent(`equals(email,"${email}")`)}`, { headers: headers(key, false) });
  if (!res.ok) return null;
  const hit = (await res.json().catch(() => null))?.data?.[0];
  if (!hit) return null;
  return { id: hit.id as string, hasFirst: hit.attributes?.properties?.rwf_first_want != null };
}

export async function POST(req: NextRequest) {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_RESOURCES_LIST_ID;
  if (!key || !listId) {
    console.error("[access] KLAVIYO_PRIVATE_KEY or KLAVIYO_RESOURCES_LIST_ID is not set");
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });

  const wantRaw = String(body.want ?? "account").trim().toLowerCase();
  const want = WANTS.has(wantRaw) ? wantRaw : "account";
  const item = String(body.item ?? "").trim().slice(0, 120) || null;
  const page = String(body.page ?? "").trim().slice(0, 200) || null;

  const limiter = getSignupRateLimiter();
  if (limiter) {
    const { success } = await limiter.limit(clientIp(req));
    if (!success) {
      console.warn("[access] rate limited", clientIp(req));
      return NextResponse.json({ ok: false, error: "server" }, { status: 429 });
    }
  }

  const stamp = new Date().toISOString();
  try {
    const existing = await existingProfile(key, email);
    const first = !existing?.hasFirst;
    const properties: Record<string, unknown> = {
      rwf_last_want: want,
      rwf_last_item: item,
      rwf_last_page: page,
      rwf_last_ask_at: stamp,
    };
    if (first) {
      properties.rwf_first_want = want;
      properties.rwf_first_item = item;
      properties.rwf_first_ask_at = stamp;
    }

    // 1. the profile, with what they asked for
    const importRes = await fetch(`${KLAVIYO}/profile-import/`, {
      method: "POST",
      headers: headers(key, true),
      body: JSON.stringify({ data: { type: "profile", attributes: { email, properties } } }),
    });
    if (!importRes.ok) {
      console.error("[access] profile-import failed", importRes.status, await importRes.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }
    const profileId: string | undefined = (await importRes.json().catch(() => null))?.data?.id;

    // 2. the running list of wants, appended, never overwritten
    if (profileId) {
      const tag = item ? `${want}:${item}` : want;
      await fetch(`${KLAVIYO}/profiles/${profileId}/`, {
        method: "PATCH",
        headers: headers(key, true),
        body: JSON.stringify({ data: { type: "profile", id: profileId, attributes: {}, meta: { patch_properties: { append: { rwf_wants: tag } } } } }),
      }).catch(() => null);
    }

    // 3. the list, with email consent
    const subRes = await fetch(`${KLAVIYO}/profile-subscription-bulk-create-jobs/`, {
      method: "POST",
      headers: headers(key, true),
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: `runwithfoxes.com resource centre (${want}${item ? `:${item}` : ""})`,
            profiles: { data: [{ type: "profile", attributes: { email, subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } } } }] },
          },
          relationships: { list: { data: { type: "list", id: listId } } },
        },
      }),
    });
    if (!subRes.ok) {
      console.error("[access] subscribe failed", subRes.status, await subRes.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }

    // 4. the event, on its own metric
    await fetch(`${KLAVIYO}/events/`, {
      method: "POST",
      headers: headers(key, true),
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: { want, item, page, first },
            metric: { data: { type: "metric", attributes: { name: "Resource Access" } } },
            profile: { data: { type: "profile", attributes: { email } } },
            time: stamp,
          },
        },
      }),
    }).catch(() => null);

    const res = NextResponse.json({ ok: true, first });
    const jar = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365 };
    res.cookies.set("rwf_access", "1", jar);
    // the course's identity cookie too, so one person is one person across the course and the centre (src/lib/access.ts)
    res.cookies.set("rwf_course_id", email, jar);
    return res;
  } catch (err) {
    console.error("[access] failed", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
