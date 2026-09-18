import { Redis } from "@upstash/redis";

// Visit and section events for prospect pages, one Redis list per slug.
// Mirrors the getRedis() pattern in conversation-store.ts / client-feedback-store.ts.

export interface ProspectEvent {
  type: "visit" | "section" | "open" | "download" | "resource";
  name?: string; // section id, resource name, etc.
  visitor: string; // anonymous visitor id from the cookie
  at: string; // ISO timestamp
  ua?: string; // user agent, rough device signal only
}

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

const key = (slug: string) => `prospect:${slug}:events`;

// Newest first. Capped so a stuck tab cannot grow the list without bound.
const MAX_EVENTS = 5000;

export async function logProspectEvent(
  slug: string,
  event: ProspectEvent
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.lpush(key(slug), JSON.stringify(event));
    await redis.ltrim(key(slug), 0, MAX_EVENTS - 1);
  } catch (e) {
    console.error("[prospect-visit-store] failed to log event:", e);
  }
}

export async function getProspectEvents(
  slug: string,
  limit = 500
): Promise<ProspectEvent[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const raw = await redis.lrange<string | ProspectEvent>(key(slug), 0, limit - 1);
    return raw
      .map((r) => {
        if (typeof r === "string") {
          try {
            return JSON.parse(r) as ProspectEvent;
          } catch {
            return null;
          }
        }
        return r as ProspectEvent;
      })
      .filter((e): e is ProspectEvent => e !== null);
  } catch (e) {
    console.error("[prospect-visit-store] failed to read events:", e);
    return [];
  }
}
