import { getAllEssays } from "@/lib/essays";
import { MODULES } from "../course/courseModules";

/**
 * EVERYTHING WE HAVE PUBLISHED, ONE LIST. The table on /resources is this list. Essays and
 * modules are read from their own sources so a new one appears without anyone touching
 * this file. The studies, trackers and answer pages are listed here by hand.
 * ⚠️ Answer page dates are the day each route was added in git, not a publish date.
 */

export type Area = "search" | "agents" | "brand" | "work" | "course";

export const AREAS: { key: Area; name: string; line: string }[] = [
  { key: "search", name: "AI search", line: "Who AI names, what it cites, and how a brand gets into the answer." },
  { key: "agents", name: "Agents", line: "How we build marketing agents, what they cost and where they need a person." },
  { key: "brand", name: "Brand and creative", line: "Distinctive assets, ads and websites, made faster without losing quality." },
  { key: "work", name: "Skills and work", line: "What employers now ask for, and how marketing roles are changing." },
  { key: "course", name: "The course", line: "AI Fluency for Ambitious Marketers. Six free modules, one a fortnight." },
];

export type Entry = {
  date: string; // ISO
  area: Area;
  type: "Study" | "Tracker" | "Essay" | "Module" | "Answer" | "Category";
  title: string;
  href: string;
  dek?: string;
  image?: string;
  soon?: boolean;
};

const ESSAY_AREA: Record<string, Area> = {
  "18-things-worth-knowing-about-geo": "search",
  "getting-cited-by-ai-is-a-brand-problem-not-an-seo-one": "search",
  "i-built-74-answers-for-my-website-in-2-hours": "search",
  "a-robot-called-jo": "agents",
  "build-a-proactive-agent": "agents",
  "diary-of-an-ai-agent-team": "agents",
  "four-agents-for-a-gym-in-madrid": "agents",
  "how-i-build-an-ai-writer": "agents",
  "two-ways-i-work-with-agents": "agents",
  "when-an-agent-is-not-an-agent": "agents",
  "distinctive-brand-assets-in-an-ai-world": "brand",
  "dear-marketers-create-adjacent-value": "brand",
  "ad-versioning-in-six-seconds": "brand",
  "dump-your-website-and-start-again": "brand",
  "i-built-a-website-tonight-using-claude-code": "brand",
  "build-a-system": "work",
  "the-95-5-rule-the-day-one-list": "work",
  "the-future-marketer-is-a-swiss-army-knife": "work",
  "think-in-bets": "work",
};

export function getLibrary(): Entry[] {
  const essays: Entry[] = getAllEssays().map((e) => ({
    date: e.date,
    area: ESSAY_AREA[e.slug] ?? "work",
    type: "Essay",
    title: e.title,
    href: `/essays/${e.slug}`,
    dek: e.dek,
    image: e.image ?? undefined,
  }));
  const modules: Entry[] = MODULES.map((m) => ({
    date: m.on,
    area: "course",
    type: "Module",
    title: m.title.replace(/^\(\d\)\s*/, ""),
    href: m.built ? `/course/${m.n}` : `/course#m${m.n}`,
    soon: !m.built,
  }));
  const fixed: Entry[] = [
    {
      date: "2026-09-24",
      area: "work",
      type: "Tracker",
      title: "About 1 in 13 new marketing and sales ads asks anything real about AI",
      href: "/resources/jobs-ai",
      dek: "302 new ads read across seven sources. Tech firms' careers pages ask four times as often.",
    },
    {
      date: "2026-08-23",
      area: "search",
      type: "Study",
      title: "Who AI names when you ask an Irish question",
      href: "/resources/geo-ireland",
      dek: "Five AI engines, 41 categories. In 17 of them the name AI gives first is a state body.",
    },
    {
      date: "2026-08-23",
      area: "search",
      type: "Category",
      title: "Hotels: AI names the booking sites, not the hotels",
      href: "/resources/geo-ireland/hotels",
    },
    { date: "2026-08-28", area: "agents", type: "Answer", title: "Diary of an AI marketing team", href: "/diary" },
    { date: "2026-07-21", area: "agents", type: "Answer", title: "What is a marketing agent?", href: "/what-is-a-marketing-agent" },
    { date: "2026-07-21", area: "agents", type: "Answer", title: "What does a marketing agent cost?", href: "/what-does-a-marketing-agent-cost" },
    { date: "2026-07-21", area: "agents", type: "Answer", title: "An AI marketing agent or an agency?", href: "/ai-marketing-agent-vs-agency" },
    { date: "2026-07-21", area: "agents", type: "Answer", title: "When does an AI agent need a human?", href: "/when-an-ai-agent-needs-a-human" },
    { date: "2026-07-21", area: "search", type: "Answer", title: "AI marketing for Irish businesses", href: "/ai-marketing-ireland" },
    { date: "2026-07-21", area: "search", type: "Answer", title: "Answer engine optimisation: 18 things worth knowing", href: "/answer-engine-optimization" },
    { date: "2026-03-12", area: "work", type: "Answer", title: "Marketing questions, answered", href: "/answers" },
  ];
  return [...fixed, ...essays, ...modules].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDay(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
