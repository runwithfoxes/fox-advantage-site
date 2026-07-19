/*
  Paul's own record of who signed up, separate from Klaviyo.

  Two reasons it exists rather than trusting the ESP: if a Klaviyo call fails the
  person is still recoverable from here, and it is the only view of the signups
  that does not require logging into someone else's dashboard.

  SHAPE IS PROVISIONAL - proposed in QA-B Q1 and not yet ruled on. The durable
  production half (Upstash, mirroring the client-feedback store) is deliberately
  NOT wired yet, because the shape was put to the director before building. What
  is here works locally and never throws, so a recording problem can never cost a
  signup: the visitor's subscription is the thing that matters and it has already
  happened by the time this is called.
*/

import { appendFile } from "fs/promises";
import path from "path";

export interface SignupRecord {
  ts: string;
  email: string;
  first_name: string;
  signup_source: "hero" | "card";
  signup_module: number | null;
  signup_module_lands: string | null;
  door: "interest" | "member";
  klaviyo: "ok" | "failed";
}

// Overridable so a test run does not write into the real record.
const LOCAL_PATH =
  process.env.COURSE_SIGNUP_RECORD_PATH ||
  path.join(
    process.env.HOME || "",
    "paul-hub/intelligence/course-build/signups.ndjson"
  );

export async function recordSignup(rec: SignupRecord): Promise<void> {
  // Always log. On Vercel this is the only durable trace until the store is
  // agreed, and it is greppable in the deployment logs.
  console.info("[course-signup] record", JSON.stringify(rec));

  // Vercel's filesystem is ephemeral and read-only outside /tmp, so the local
  // file is a local-run convenience, not the production record.
  if (process.env.VERCEL) return;

  try {
    await appendFile(LOCAL_PATH, JSON.stringify(rec) + "\n", "utf8");
  } catch (err) {
    // Never let a recording failure surface to a visitor who has already
    // successfully signed up.
    console.error("[course-signup] local record write failed", err);
  }
}
