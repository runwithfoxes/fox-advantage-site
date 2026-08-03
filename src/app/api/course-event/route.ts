import { NextRequest, NextResponse } from "next/server";
import {
  domainOf,
  recordEvent,
  type CourseEvent,
  type CourseEventName,
} from "@/lib/course-event-record";

/*
  One thing a named person did on a course page.

  ⭐⭐ PAUL, 3 Aug 2026: "When Sarah or John is doing the course, I want to know what Sarah
  clicks on, what she copies, pastes." That sentence is the spec. The record is per PERSON,
  which is the only reason the email door exists at all, and it is why every field here is
  useless without the identity cookie.

  ⭐ IT WRITES TWICE, AND THE TWO WRITES HAVE DIFFERENT JOBS. Paul's own Redis record is the
  durable one: it survives Klaviyo failing, it is greppable from Claude Code, and it is the
  thing that answers "what did Sarah do" without logging into somebody else's dashboard. The
  Klaviyo event is the one that can TRIGGER something, because flows fire on events and
  nothing in Redis can send an email. Neither replaces the other.

  ⛔ THE KLAVIYO CALL MUST NEVER DECIDE THE RESPONSE. It is awaited so a failure is logged
  rather than lost, and then ignored. A reader who copies a prompt must not see an error
  because a marketing API was rate limited, and the event must still be in Paul's record when
  it was.
*/

const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

/** Set by the door. Holds the email, which is the whole identity model. */
export const IDENTITY_COOKIE = "rwf_course_id";

/* ⛔ AN ALLOWLIST, NOT A STRING. The body is public input, and an open `event` field would let
   anyone write arbitrary rows into Paul's record and invent Klaviyo metrics that then appear
   in the flow builder as if he had designed them. */
const ALLOWED: readonly CourseEventName[] = [
  "module_viewed",
  "item_opened",
  "prompt_copied",
  "download_taken",
  "fluency_rated",
];

/** Small, because everything here is attacker-controlled and lands in a durable record. */
const MAX_DETAIL = 120;
const MAX_ITEM = 120;

function clean(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
}

export async function POST(req: NextRequest) {
  /* ⭐ IDENTITY COMES FROM THE COOKIE, NEVER FROM THE BODY. A posted email would let anyone
     write events onto anyone else's timeline, and Paul's whole use for this record is
     deciding what to send a named person. */
  const email = (req.cookies.get(IDENTITY_COOKIE)?.value ?? "")
    .trim()
    .toLowerCase();

  /* ⭐ ANONYMOUS IS A NO-OP, AND IT RETURNS 200. There is nothing to record without a name,
     and an error here would put a failed request in the console of someone who has simply
     not signed up yet. Not a problem to report, just nothing to do. */
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: true, recorded: false });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const event = body.event as CourseEventName;
  if (!ALLOWED.includes(event)) {
    return NextResponse.json({ ok: false, error: "unknown event" }, { status: 400 });
  }

  const moduleN =
    typeof body.module === "number" && body.module >= 1 && body.module <= 6
      ? body.module
      : null;

  const rec: CourseEvent = {
    ts: new Date().toISOString(),
    email,
    domain: domainOf(email),
    event,
    module: moduleN,
    item: clean(body.item, MAX_ITEM),
    detail: clean(body.detail, MAX_DETAIL),
  };

  await recordEvent(rec);
  await forwardToKlaviyo(rec);

  return NextResponse.json({ ok: true, recorded: true });
}

/* Klaviyo's events endpoint, which is the one the signup route never needed: it uses
   profiles, profile-import and the subscription job, none of which can trigger a flow.
   A metric is created on first use, so the metric NAME is the thing Paul will pick from
   in the flow builder. Hence "Course: item opened" rather than "item_opened". */
async function forwardToKlaviyo(rec: CourseEvent): Promise<void> {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) return;

  const metric = {
    module_viewed: "Course: module viewed",
    item_opened: "Course: item opened",
    prompt_copied: "Course: prompt copied",
    download_taken: "Course: download taken",
    fluency_rated: "Course: fluency rated",
  }[rec.event];

  try {
    const res = await fetch(`${KLAVIYO}/events`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: REVISION,
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: {
              module: rec.module,
              item: rec.item,
              detail: rec.detail,
              domain: rec.domain,
            },
            time: rec.ts,
            metric: { data: { type: "metric", attributes: { name: metric } } },
            profile: {
              data: { type: "profile", attributes: { email: rec.email } },
            },
          },
        },
      }),
    });
    if (!res.ok) {
      console.error("[course-event] klaviyo rejected", res.status, await res.text());
    }
  } catch (err) {
    console.error("[course-event] klaviyo call failed", err);
  }
}
