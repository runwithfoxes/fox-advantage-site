import type { MetadataRoute } from "next";
import { getAllChapters, isChapterGated } from "@/lib/chapters";
import { getAllEssays } from "@/lib/essays";
import { toolBuckets } from "./students/toolData";

const BASE = "https://runwithfoxes.com";

/* Public routes only.
   Deliberately excluded because they are password gated or client confidential:
   /clients/*, /proposals/*, /retail-media, /presentation, /chief,
   and the client pages served by rewrite (/bellinter, /april, /ucd, /broad-lake).
   A sitemap is an invitation to index, so anything gated must never appear here. */
const PUBLIC_ROUTES = [
  "/",
  "/48",
  "/about",
  "/ai-marketing-agent-vs-agency",
  "/ai-marketing-ireland",
  "/ai-writer",
  "/answer-engine-optimization",
  "/answers",
  "/book",
  "/books",
  "/brand",
  "/brief-diagnostician",
  /* ⛔ "/coach" WAS HERE AND CAME OUT, 2 Aug 2026. It is not a page: the route is
     an 11-line `redirect()` that 307s to metrics-pyramid.vercel.app, where the
     Marketing Effectiveness Coach actually lives. A sitemap advertises URLs you
     want indexed, and a URL that leaves the domain can never be indexed at that
     URL, so this was asking Google to index a signpost. It lands in Search
     Console as a "Page with redirect" exclusion.
     ⚠️ THE REDIRECT ITSELF STAYS. /coach is a working vanity URL and anyone who
     has it keeps landing on the tool. This removes it from the sitemap only.
     ⚠️ Do NOT "fix" this by building a /coach page that describes the tool. That
     is a new content page and the 21 Jul standing hold is live.
     How it stayed hidden: site_gaps.py follows redirects, so it was counting the
     DESTINATION's words, scoring 200+ and reporting "ok". Fixed the same day - it
     now tests for an off-domain hop BEFORE the word count. */
  "/contact",
  "/cookies",
  "/course",
  "/essays",
  "/distinctive",
  "/experts",
  "/info",
  "/marketer-of-the-year",
  "/millionaire-raffle",
  "/privacy",
  "/productivity",
  "/run-with-foxes",
  "/students",
  "/students/tools/ai-writer",
  "/training",
  "/when-an-ai-agent-needs-a-human",
  "/what-does-a-marketing-agent-cost",
  "/what-is-a-marketing-agent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  /* Chapters and tool buckets come from the same source the routes render from,
     so this list cannot drift out of sync with what actually exists. */
  const chapters = getAllChapters()
    .filter((ch) => !isChapterGated(ch))
    .map((ch) => `/chapter/${ch.slug}`);

  const tools = toolBuckets.map((b) => `/students/tools/${b.slug}`);

  /* same principle: read from the loader the pages render from, so an essay cannot
     exist without being in the sitemap or linger in it after being removed */
  const essays = getAllEssays().map((e) => `/essays/${e.slug}`);

  const paths = [...PUBLIC_ROUTES, ...chapters, ...tools, ...essays];

  return paths.map((path) => ({ url: `${BASE}${path}` }));
}
