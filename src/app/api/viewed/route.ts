import { NextRequest, NextResponse } from "next/server";
import { domainOf, isOptedOut } from "@/lib/course-event-record";
import { recordSiteEvent } from "@/lib/site-event-record";

/*
  RESOURCE VIEWED. A signed-in reader opening a report, dataset, tracker or the library.

  Paul, 27 Sep 2026: "we can track those so we know that somebody came in through a report, but
  now they're doing the course or now they're looking at the library." The asks are tracked by
  /api/access; this is the LOOKING. Identity comes from the httpOnly identity cookie only, never
  from the body, the same rule as the course's event route: a page cannot claim to be someone.
  No cookie, no event, 204, nothing learned. Metric of its own, `Resource Viewed`; never `Joined`.
*/
const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";
const WANTS = new Set(["library", "report", "dataset", "tool", "playbook", "tracker"]);

export async function POST(req: NextRequest) {
  const email = (req.cookies.get("rwf_course_id")?.value ?? "").trim().toLowerCase();
  if (!email.includes("@")) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const wantRaw = String(body.want ?? "").toLowerCase();
  if (!WANTS.has(wantRaw)) return new NextResponse(null, { status: 204 });
  const item = String(body.item ?? "").slice(0, 120) || null;
  const page = String(body.page ?? "").slice(0, 200) || null;

  /* 3 Oct 2026, two gaps closed. Someone who has unsubscribed was still sending their views to
     Klaviyo, because only /api/course-event checked. And the view went to Klaviyo alone, so
     Paul's own record never held it; it now goes to site:events first (site-event-record.ts). */
  if (await isOptedOut(email)) return new NextResponse(null, { status: 204 });
  const ts = new Date().toISOString();
  await recordSiteEvent({ ts, email, domain: domainOf(email), event: "resource_viewed", page, want: wantRaw, item });

  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) return new NextResponse(null, { status: 204 });

  await fetch(`${KLAVIYO}/events/`, {
    method: "POST",
    headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: REVISION, accept: "application/vnd.api+json", "content-type": "application/vnd.api+json" },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: { want: wantRaw, item, page },
          metric: { data: { type: "metric", attributes: { name: "Resource Viewed" } } },
          profile: { data: { type: "profile", attributes: { email } } },
          time: ts,
        },
      },
    }),
  }).catch(() => null);

  return new NextResponse(null, { status: 204 });
}
