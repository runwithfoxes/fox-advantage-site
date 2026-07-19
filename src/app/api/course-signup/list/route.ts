import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { readSignups } from "@/lib/course-signup-record";

/*
  Paul's read of the course signups, from Claude Code rather than a dashboard:

    curl -s -H "x-admin-token: $CLIENT_FEEDBACK_ADMIN_TOKEN" \
      https://runwithfoxes.com/api/course-signup/list

  Guarded the same way the client-feedback admin route is, and it reuses that
  same token deliberately: it is already set in Vercel, so this adds no new
  secret for anyone to configure or forget. COURSE_ADMIN_TOKEN overrides it if
  the two should ever be separated.
*/

function authed(req: NextRequest): boolean {
  const token =
    process.env.COURSE_ADMIN_TOKEN || process.env.CLIENT_FEEDBACK_ADMIN_TOKEN;
  if (!token) return false;
  const supplied = req.headers.get("x-admin-token") ?? "";
  if (supplied.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(token));
}

export async function GET(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const signups = await readSignups();

  // A count and a split, so the answer to "how are we doing" does not need
  // arithmetic at the far end.
  const byDoor = { interest: 0, member: 0 };
  const bySource = { hero: 0, card: 0 };
  const byModule: Record<string, number> = {};
  let failed = 0;

  for (const s of signups) {
    byDoor[s.door] = (byDoor[s.door] ?? 0) + 1;
    bySource[s.signup_source] = (bySource[s.signup_source] ?? 0) + 1;
    if (s.signup_module != null) {
      const k = String(s.signup_module);
      byModule[k] = (byModule[k] ?? 0) + 1;
    }
    if (s.klaviyo === "failed") failed += 1;
  }

  return NextResponse.json({
    total: signups.length,
    byDoor,
    bySource,
    byModule,
    // The number that matters most: signups this record holds but Klaviyo does
    // not. Anything above zero needs reconciling by hand.
    klaviyoFailed: failed,
    signups,
  });
}
