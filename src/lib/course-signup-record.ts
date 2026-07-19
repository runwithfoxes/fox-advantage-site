/*
  Paul's own record of who signed up, separate from Klaviyo.

  It earns its place on one property: it survives Klaviyo failing. If the API
  call is rejected or rate-limited, the person is still here and recoverable.
  A Klaviyo-only record turns a failed call into a person who silently never
  existed. It is also the only view of the signups that does not require
  logging into someone else's dashboard.

  Two halves, because Vercel's filesystem is ephemeral:
   - deployed, it appends to Upstash Redis, reusing the getRedis() pattern from
     conversation-store.ts and client-feedback-store.ts
   - locally, it appends to an NDJSON file

  NDJSON rather than a JSON array or a CSV: Paul reads this in Claude Code, so
  the format that matters is the one a terminal can grep, wc -l and tail without
  a client, and NDJSON survives a partial write where an array does not.

  Nothing in here may ever throw. By the time it is called the visitor is already
  subscribed, and a recording problem must not turn a successful signup into an
  error on their screen.

  Shape approved in QA-B Q1, 19 Jul.
*/

import { appendFile } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

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

const REDIS_KEY = "course:signups";

// Mirrors the existing getRedis() in conversation-store.ts.
function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Overridable so a test run never writes into the real record.
const LOCAL_PATH =
  process.env.COURSE_SIGNUP_RECORD_PATH ||
  path.join(
    process.env.HOME || "",
    "paul-hub/intelligence/course-launch/signups.ndjson"
  );

export async function recordSignup(rec: SignupRecord): Promise<void> {
  // Always log. Greppable in the Vercel deployment logs, and a last resort if
  // both stores are unavailable.
  console.info("[course-signup] record", JSON.stringify(rec));

  const redis = getRedis();
  if (redis) {
    try {
      // A list, appended to. Ordered, cheap to read back, and one failed write
      // cannot corrupt the others.
      await redis.rpush(REDIS_KEY, JSON.stringify(rec));
    } catch (err) {
      console.error("[course-signup] redis append failed", err);
    }
  }

  if (process.env.VERCEL) return;

  try {
    await appendFile(LOCAL_PATH, JSON.stringify(rec) + "\n", "utf8");
  } catch (err) {
    console.error("[course-signup] local record write failed", err);
  }
}

/* Read the record back. Used by the admin route so Paul can pull the signups
   in Claude Code with a curl, the way he already reads client feedback. */
export async function readSignups(): Promise<SignupRecord[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const rows = await redis.lrange<string>(REDIS_KEY, 0, -1);
    return rows
      .map((r) => {
        try {
          return typeof r === "string" ? (JSON.parse(r) as SignupRecord) : (r as SignupRecord);
        } catch {
          return null;
        }
      })
      .filter((r): r is SignupRecord => r !== null);
  } catch (err) {
    console.error("[course-signup] redis read failed", err);
    return [];
  }
}
