import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function redis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Rate limiter for the chat API.
 * Allows 10 requests per 60-second sliding window per IP.
 * Falls back to null if Redis isn't configured (dev without Redis).
 */
export function getRateLimiter(): Ratelimit | null {
  const r = redis();
  if (!r) return null;

  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    prefix: "ratelimit:chat",
  });
}

/**
 * Rate limiter for course signup. Its OWN prefix, so chat traffic and signup
 * traffic can never eat each other's budget.
 *
 * ⭐ FIVE A MINUTE IS DELIBERATELY GENEROUS, AND THE REASON IS SHARED IPs.
 * Irish mobile carriers run carrier-grade NAT and an office or a conference
 * room is a single address, so a roomful of people signing up after a talk all
 * arrive from one IP. A tight limit would block most of that room silently,
 * which is a far worse outcome than letting a bot through. Five a minute stops
 * an endpoint being hammered and sits well above any plausible human burst.
 */
export function getSignupRateLimiter(): Ratelimit | null {
  const r = redis();
  if (!r) return null;

  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "ratelimit:course-signup",
  });
}
