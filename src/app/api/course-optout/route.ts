import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { addOptOut } from "@/lib/course-event-record";

/*
  Stop recording what somebody does on the course pages.

  ⭐⭐ THIS EXISTS BECAUSE OF ONE SENTENCE. The door's copy, approved by Paul 3 Aug 2026, ends
  "You can unsubscribe from any email." Unsubscribing happens inside Klaviyo and does nothing
  whatsoever to a browser cookie, so without this route a person who opted out would keep
  generating events, quietly, forever, and nothing would fail. The sentence is the spec.

  ⚠️⚠️ IT IS NOT WIRED TO KLAVIYO YET, AND THAT IS THE WHOLE GAP. Klaviyo does not tell anyone
  about an unsubscribe unless a webhook is configured to say so, in the Klaviyo UI, pointing
  here. Until Paul does that, this route only fires when he calls it himself. ⛔ Do not read
  a working endpoint as a working opt-out: the check in the event route is correct, the set it
  reads is correct, and the thing that FILLS the set is missing.

  Guarded with the same admin token as /api/course-signup/list, deliberately: it is already
  set in Vercel, so this adds no new secret to configure or forget. A Klaviyo webhook can send
  it as a custom header.
*/

function authed(req: NextRequest): boolean {
  const token =
    process.env.COURSE_ADMIN_TOKEN || process.env.CLIENT_FEEDBACK_ADMIN_TOKEN;
  if (!token) return false;
  const supplied = req.headers.get("x-admin-token") ?? "";
  if (supplied.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(token));
}

export async function POST(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  /* Klaviyo's webhook payloads nest the profile, so accept either shape rather than
     depending on a body format nobody has run yet. */
  const nested = (body.data as { email?: unknown } | undefined)?.email;
  const raw = typeof body.email === "string" ? body.email : nested;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  await addOptOut(email);
  return NextResponse.json({ ok: true, email });
}
