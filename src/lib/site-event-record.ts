/*
  What a signed-in person looked at on the rest of the site: an essay, a diary piece, a
  report, the library, the homepage.

  Paul, 3 Oct 2026: "can you fix that all tracking work on runwithfoxes.com for people signed
  in." Until then a named person was only recorded inside a course module. A walk through
  the live site with a signed-in test profile that day (module 1, the library, The AI Ask,
  an essay, a diary piece, the homepage, /resources) left one row in the record.

  ⛔ ITS OWN KEY, `site:events`, AND NEVER `course:events`. Everything that reads the course
  record treats any row as "this person has been into the course": the course report, the
  Attio course status, the course check, and the groups behind each module email. One essay
  view written there would move a person out of "never came in".

  Same shape and the same three rules as course-event-record.ts: Redis when deployed, an
  NDJSON file locally, a console line that survives both, and nothing here may ever throw.
*/

import { appendFile } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

export interface SiteEvent {
  ts: string;
  email: string;
  domain: string;
  /** page_viewed is any page; resource_viewed is a report, dataset, tracker, tool or playbook. */
  event: "page_viewed" | "resource_viewed";
  /** The path, no query string. */
  page: string | null;
  /** resource_viewed only: what kind of thing, and which one. */
  want?: string | null;
  item?: string | null;
}

const REDIS_KEY = "site:events";
const LOCAL_PATH = path.join(process.cwd(), "site-events.ndjson");

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

export async function recordSiteEvent(rec: SiteEvent): Promise<void> {
  console.info("[site-event] record", JSON.stringify(rec));

  const redis = getRedis();
  if (redis) {
    try {
      await redis.rpush(REDIS_KEY, JSON.stringify(rec));
    } catch (err) {
      console.error("[site-event] redis append failed", err);
    }
  }

  if (process.env.VERCEL) return;

  try {
    await appendFile(LOCAL_PATH, JSON.stringify(rec) + "\n", "utf8");
  } catch (err) {
    console.error("[site-event] local record write failed", err);
  }
}
