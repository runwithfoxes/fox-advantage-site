/*
  What a named person did on a course page.

  ⭐⭐ WHY THIS EXISTS, PAUL 3 Aug 2026, verbatim: "i want to see what people do on the pages,
  so I can trigger personalised emails or chatbot messages to them. This is the main reason."
  And, asked what that means concretely: "When Sarah or John is doing the course, I want to
  know what Sarah clicks on, what she copies, pastes."

  ⭐⭐ SO THE EMAIL DOOR IS NOT A LOCK AND MUST NEVER BE BUILT AS ONE. He said in the same
  conversation that he does not mind people reaching the material. The email is there to put a
  NAME on the behaviour, because an anonymous click cannot trigger an email to Sarah. Anyone
  who builds a gate here that turns people away has solved a problem he does not have and
  broken the one he does.

  Two halves and a console line, copied deliberately from course-signup-record.ts rather than
  invented: Upstash Redis when deployed, an NDJSON file locally, and a log line that survives
  both being unavailable. NDJSON because Paul reads this in Claude Code, so the format that
  matters is the one a terminal can grep, wc -l and tail.

  ⛔ NOTHING IN HERE MAY EVER THROW, same rule as the signup record and for a sharper reason.
  A signup fails in front of someone who is waiting for it. An event fires while somebody is
  reading, and a recording problem must never surface as an error over a lesson.
*/

import { appendFile } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

/**
 * ⭐ THE VERBS ARE HIS, NOT A TAXONOMY. "what Sarah clicks on, what she copies, pastes."
 * ⛔ Do not add an event because it is easy to capture. Every one of these has to be worth
 * an email to somebody, which is the whole point of the record.
 */
export type CourseEventName =
  /** Opened a module page. The floor: it says they turned up. */
  | "module_viewed"
  /** Opened one item, by slug. What they are actually interested in. */
  | "item_opened"
  /** Took a prompt. The strongest signal on the page: they intend to use it. */
  | "prompt_copied"
  /** Took a file. Same weight as a copy, different shape. */
  | "download_taken"
  /** Saved a self-rated fluency number. Module 1 opens it, module 6 closes it. */
  | "fluency_rated";

export interface CourseEvent {
  ts: string;
  /** Lowercased. The join key to the signup record, to Klaviyo, and to Sarah. */
  email: string;
  /**
   * ⭐ DERIVED AT WRITE TIME, ON PURPOSE. Paul's own standing metric for this course is
   * companies with two or more people inside it, scored on accounts rather than
   * registrations. A behavioural record that cannot group by company cannot answer the
   * question he will actually ask of it, and adding this later needs a backfill.
   */
  domain: string;
  event: CourseEventName;
  module: number | null;
  /** Which item, where the event has one. The slug from slugOf(), so it is shareable. */
  item: string | null;
  /** Free-form, small. The fluency number, the file taken, the prompt's label. */
  detail: string | null;
}

const REDIS_KEY = "course:events";

// Mirrors getRedis() in course-signup-record.ts and conversation-store.ts.
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

const LOCAL_PATH =
  process.env.COURSE_EVENT_RECORD_PATH ||
  path.join(
    process.env.HOME || "",
    "paul-hub/intelligence/course-launch/events.ndjson",
  );

/** Everything after the @, lowercased. Empty string rather than a throw on a malformed address. */
export function domainOf(email: string): string {
  const at = email.lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).toLowerCase();
}

/**
 * ⭐⭐ UNSUBSCRIBING STOPS THE RECORDING, NOT JUST THE EMAIL. Paul approved the door's copy on
 * 3 Aug 2026 and it ends "You can unsubscribe from any email." Someone reading that assumes
 * the whole thing stops, and they are right to: the sentence is what makes it true.
 *
 * ⛔ THE COOKIE AND THE KLAVIYO SUBSCRIPTION ARE SEPARATE THINGS, which is exactly how this
 * would have gone wrong on its own. Unsubscribing happens in Klaviyo and does nothing to a
 * browser cookie, so without this set a person who opted out would carry on generating events
 * silently, and the door's promise would quietly become a lie. Nothing would fail.
 *
 * ⚠️ NOT AUTOMATIC YET. Something has to TELL us an unsubscribe happened, and Klaviyo does
 * not volunteer it. `/api/course-optout` exists to be pointed at by a Klaviyo webhook, and
 * until that webhook is configured in Klaviyo this set only fills when Paul adds someone by
 * hand. The check below is correct either way; the gap is upstream and it is named here so
 * nobody reads a working suppression check as a working suppression.
 */
const OPTOUT_KEY = "course:optout";

export async function addOptOut(email: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.sadd(OPTOUT_KEY, email.trim().toLowerCase());
  } catch (err) {
    console.error("[course-event] optout write failed", err);
  }
}

/** ⛔ FAILS OPEN, DELIBERATELY AND NARROWLY. If Redis is unreachable this returns false and
 *  the event is recorded. The alternative, dropping every event whenever the store blinks,
 *  loses real behaviour for everyone to protect a set that is usually empty. */
export async function isOptedOut(email: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    return (await redis.sismember(OPTOUT_KEY, email.trim().toLowerCase())) === 1;
  } catch (err) {
    console.error("[course-event] optout read failed", err);
    return false;
  }
}

export async function recordEvent(rec: CourseEvent): Promise<void> {
  console.info("[course-event] record", JSON.stringify(rec));

  const redis = getRedis();
  if (redis) {
    try {
      await redis.rpush(REDIS_KEY, JSON.stringify(rec));
    } catch (err) {
      console.error("[course-event] redis append failed", err);
    }
  }

  if (process.env.VERCEL) return;

  try {
    await appendFile(LOCAL_PATH, JSON.stringify(rec) + "\n", "utf8");
  } catch (err) {
    console.error("[course-event] local record write failed", err);
  }
}

/** Read the record back, for the admin route. Same shape as readSignups(). */
export async function readEvents(): Promise<CourseEvent[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const rows = await redis.lrange<string>(REDIS_KEY, 0, -1);
    return rows
      .map((r) => {
        try {
          return typeof r === "string" ? (JSON.parse(r) as CourseEvent) : (r as CourseEvent);
        } catch {
          return null;
        }
      })
      .filter((r): r is CourseEvent => r !== null);
  } catch (err) {
    console.error("[course-event] redis read failed", err);
    return [];
  }
}
