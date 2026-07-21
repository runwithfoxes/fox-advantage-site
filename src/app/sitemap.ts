import type { MetadataRoute } from "next";
import { getAllChapters, isChapterGated } from "@/lib/chapters";
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
  "/ai-writer",
  "/answer-engine-optimization",
  "/answers",
  "/book",
  "/books",
  "/brand",
  "/brief-diagnostician",
  "/coach",
  "/contact",
  "/cookies",
  "/course",
  "/distinctive",
  "/experts",
  "/info",
  "/marketer-of-the-year",
  "/millionaire-raffle",
  "/privacy",
  "/productivity",
  "/research",
  "/run-with-foxes",
  "/students",
  "/students/tools/ai-writer",
  "/training",
  "/what-is-a-marketing-agent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  /* Chapters and tool buckets come from the same source the routes render from,
     so this list cannot drift out of sync with what actually exists. */
  const chapters = getAllChapters()
    .filter((ch) => !isChapterGated(ch))
    .map((ch) => `/chapter/${ch.slug}`);

  const tools = toolBuckets.map((b) => `/students/tools/${b.slug}`);

  const paths = [...PUBLIC_ROUTES, ...chapters, ...tools];

  return paths.map((path) => ({ url: `${BASE}${path}` }));
}
