/**
 * ⛔ EXAMPLE CONTENT FOR THE MOCKUP. Paul, 24 Sep 2026: "think about different places for
 * other reports, so we don't have them yet, so just make them up."
 *
 * Every item with `example: true` is INVENTED and carries a visible "Example" tag on the page.
 * Invented here: titles, formats, how often, what each would cover, release months.
 * NEVER invented here: a finding, a percentage, a named Irish brand's result, a quote, a
 * partner or a contributor. The candidates come from Sam's 23 Sep briefing
 * (intelligence/research/2026-09-23-resource-centre-how-others-do-research.md), so each one is
 * a plausible next build, not fiction. Nothing in this file ships to production as it is.
 */

export type Report = {
  no: string;
  title: string;
  kind: string;
  cadence: string;
  when: string;
  line: string;
  href?: string;
  cover: "bars" | "rings" | "blocks" | "grid";
  fox: string;
  example: boolean;
};

export const REPORTS: Report[] = [
  {
    no: "No. 01",
    title: "GEO Ireland",
    kind: "Study",
    cadence: "Quarterly",
    when: "Aug 2026",
    line: "Who five AI engines name across 41 Irish categories.",
    href: "/resources/geo-ireland",
    cover: "bars",
    fox: "fox-sideeye-right-nobg.png",
    example: false,
  },
  {
    no: "No. 02",
    title: "The State of AI in Irish Marketing",
    kind: "Annual report",
    cadence: "Every January",
    when: "Jan 2027",
    line: "What Irish marketing teams do with AI, from what they do, not what they say.",
    href: "/resources/reports/state-of-ai-in-irish-marketing",
    cover: "rings",
    fox: "chapter-fox-bored-nobg.png",
    example: true,
  },
  {
    no: "No. 03",
    title: "Agent Economics",
    kind: "Report",
    cadence: "Twice a year",
    when: "Mar 2027",
    line: "What a marketing agent costs to build and run, from the agents we run ourselves.",
    cover: "blocks",
    fox: "fox-pm-nobg.png",
    example: true,
  },
  {
    no: "No. 04",
    title: "Irish Ads by Sector",
    kind: "Quarterly review",
    cadence: "Quarterly",
    when: "Dec 2026",
    line: "What each Irish sector ran on Meta and Google this quarter, and what changed.",
    cover: "grid",
    fox: "fox-facepalm-nobg.png",
    example: true,
  },
];

export type Instrument = {
  name: string;
  what: string;
  reads: string;
  status: "testing" | "planned";
  last?: string;
  line: string;
  href?: string;
  example: boolean;
};

export const INSTRUMENTS: Instrument[] = [
  {
    name: "Jobs and AI",
    what: "The AI asks in Irish marketing and sales job ads",
    reads: "Daily",
    status: "testing",
    last: "23 Sep",
    line: "Wayflyer is hiring a revenue analyst: “You’re an AI-native builder.”",
    href: "/resources/jobs-ai",
    example: false,
  },
  {
    name: "AI answers in Ireland",
    what: "Who AI names for Irish questions, every morning",
    reads: "Daily",
    status: "planned",
    line: "The GEO Ireland questions asked daily, so a brand can watch its own name move.",
    example: true,
  },
  {
    name: "Irish ads by sector",
    what: "New ads from the Meta and Google ad libraries",
    reads: "Weekly",
    status: "planned",
    line: "What each sector started running this week.",
    example: true,
  },
  {
    name: "AI Overviews coverage",
    what: "How often Google shows an AI answer on Irish searches",
    reads: "Weekly",
    status: "planned",
    line: "The share of Irish searches where Google answers before anyone clicks.",
    example: true,
  },
  {
    name: "Tools in job specs",
    what: "Which AI tools Irish employers name in job ads",
    reads: "Weekly",
    status: "planned",
    line: "Claude, ChatGPT, Copilot and the rest, counted where employers name them.",
    example: true,
  },
];

export type Tool = { name: string; line: string; href?: string; bar: string; example: boolean };

export const TOOLS: Tool[] = [
  { name: "Brief Diagnostician", line: "Paste a brief. It tells you which way it wants the ad to work, and the choice it avoids.", href: "/brief-diagnostician", bar: "brief_diagnostician", example: false },
  { name: "The metrics pyramid", line: "Paste what you track and see where each metric sits, from activity to commercial outcome.", href: "/coach", bar: "metrics_pyramid", example: false },
  { name: "AI Writer", line: "How we build a writer trained on a brand, step by step.", href: "/ai-writer", bar: "ai_writer", example: false },
  { name: "Your brand in the answer", line: "Put in your brand and category. See what five AI engines say about you.", bar: "brand_in_the_answer", example: true },
  { name: "Message grader", line: "Paste your homepage. It grades whether a buyer can tell what you do.", bar: "message_grader", example: true },
];

export type Playbook = { name: string; kind: string; from: string; href?: string; example: boolean };

export const PLAYBOOKS: Playbook[] = [
  { name: "The CFO brief prompt", kind: "Prompt", from: "Course, module 1", href: "/course/1#i2", example: false },
  { name: "Kite campaign results 2025", kind: "Data file", from: "Course, module 1", href: "/course/1#i2", example: false },
  { name: "The agent brief", kind: "Template", from: "How we brief an agent", example: true },
  { name: "GEO audit checklist", kind: "Checklist", from: "GEO Ireland", example: true },
  { name: "Messaging framework", kind: "Template", from: "How we start a brand", example: true },
];

/** Months across the top of the calendar, and what lands in each. Course dates are real. */
export const CALENDAR: { month: string; items: { t: string; example: boolean }[] }[] = [
  { month: "Oct", items: [{ t: "Course module 2, 5 Oct", example: false }, { t: "Course module 3, 19 Oct", example: false }, { t: "Jobs and AI, first 30-day rate", example: true }] },
  { month: "Nov", items: [{ t: "Course module 4, 2 Nov", example: false }, { t: "Course module 5, 16 Nov", example: false }, { t: "Course module 6, 30 Nov", example: false }] },
  { month: "Dec", items: [{ t: "GEO Ireland No. 01, second read", example: true }, { t: "Irish Ads by Sector, Q4", example: true }] },
  { month: "Jan", items: [{ t: "The State of AI in Irish Marketing", example: true }] },
  { month: "Feb", items: [{ t: "GEO Ireland, Q1", example: true }] },
  { month: "Mar", items: [{ t: "Agent Economics", example: true }] },
];
