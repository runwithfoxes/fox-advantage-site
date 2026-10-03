import { NextRequest, NextResponse } from "next/server";
import { domainOf, isOptedOut } from "@/lib/course-event-record";
import { recordSiteEvent, type SiteEvent } from "@/lib/site-event-record";

/*
  A signed-in person opened a page. Sent by SiteViewPing in the root layout, once per page.

  The same rules as /api/course-event, for the same reasons. Identity comes from the httpOnly
  cookie and never from the body, so a page cannot claim to be someone. No cookie is a no-op.
  Opted out means nothing is written, here or in Klaviyo. It writes twice: Paul's own record
  (site:events, see site-event-record.ts for why it is not course:events) and a Klaviyo event,
  "Site: page viewed", because only an event can trigger a flow.
*/

const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

/** Module pages record module_viewed themselves; client and prospect pages are not ours to
    watch; /api is not a page. The body is public input, so this is checked here as well as
    in the component. */
const SKIP = /^\/(course\/\d+|for|clients|proposals|api)(\/|$)/;
const PATH = /^\/[A-Za-z0-9\-._~/%]{0,199}$/;

export async function POST(req: NextRequest) {
  const email = (req.cookies.get("rwf_course_id")?.value ?? "").trim().toLowerCase();
  if (!email.includes("@")) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const page = String(body.page ?? "").split("?")[0].split("#")[0];
  if (!PATH.test(page) || SKIP.test(page)) return new NextResponse(null, { status: 204 });

  if (await isOptedOut(email)) return new NextResponse(null, { status: 204 });

  const rec: SiteEvent = {
    ts: new Date().toISOString(),
    email,
    domain: domainOf(email),
    event: "page_viewed",
    page,
  };
  await recordSiteEvent(rec);

  /* ⛔ Klaviyo never decides the response, and a failure is logged, not thrown. */
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (key) {
    await fetch(`${KLAVIYO}/events/`, {
      method: "POST",
      headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: REVISION, accept: "application/vnd.api+json", "content-type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: { page },
            metric: { data: { type: "metric", attributes: { name: "Site: page viewed" } } },
            profile: { data: { type: "profile", attributes: { email } } },
            time: rec.ts,
          },
        },
      }),
    }).catch((err) => console.error("[site-view] klaviyo failed", err));
  }

  return new NextResponse(null, { status: 204 });
}
