/**
 * THE HOMEPAGE AT FULL SCALE, 25 Sep 2026. Paul: "No, don't start small. I want you to think
 * about how big this could be and design for that... lots of trackers and lots of reports."
 *
 * The programme is Sam's list from 23 Sep
 * (~/paul-hub/intelligence/research/2026-09-23-resource-centre-how-others-do-research.md):
 * six quarterly studies, the always-on trackers, the tools.
 *
 * ⛔ Same rule as ../resources/examples.ts. `example: true` = INVENTED for the mockup and shown
 * with an Example tag. Invented: names of desks, titles, cadences, release months. NEVER
 * invented: a finding, a number, a named brand's result, a quote. An example tracker shows
 * when it will first read, never a reading.
 */

export type Desk = {
  key: string;
  name: string;
  what: string;
  mark: string;
  kind: "person" | "agent";
  pieces: { t: string; day: string; href?: string }[];
  all: { t: string; href: string };
  example: boolean;
};

/** Writers beyond Paul and Lena, whose pieces are read from their own files in page.tsx. */
export const DESKS: Desk[] = [
  {
    key: "sam",
    // Paul, 25 Sep: "Sam, who's an AI researcher". His pieces are not published yet.
    name: "Sam",
    what: "AI researcher · an AI",
    mark: "S",
    kind: "agent",
    pieces: [
      { t: "How other firms run free research, and what we took from it", day: "Coming" },
      { t: "What people come to a marketing resource centre looking for", day: "Coming" },
    ],
    all: { t: "All research →", href: "/resources" },
    example: true,
  },
  {
    key: "jobs",
    // Paul, 25 Sep: "Jeff will be an AI". Title is a working one: he did not want "research agent".
    name: "Jeff",
    what: "Hiring correspondent · an AI, weekly",
    mark: "J",
    kind: "agent",
    pieces: [
      { t: "About 1 in 14 new marketing and sales ads asks anything real about AI", day: "24 Sept 2026", href: "/resources/jobs-ai" },
      { t: "Tech firms’ careers pages ask for AI four times as often", day: "24 Sept 2026", href: "/resources/jobs-ai#careers" },
    ],
    all: { t: "The tracker →", href: "/resources/jobs-ai" },
    example: false,
  },
  {
    key: "answers",
    // Jess is the real Search Lead (team/jess.md) and the GEO work is hers. Proposed, not agreed.
    name: "Jess",
    what: "AI search lead · an AI, weekly",
    mark: "Js",
    kind: "agent",
    pieces: [
      { t: "Who five AI engines name across 41 categories of Irish life", day: "23 Aug 2026", href: "/resources/geo-ireland" },
      { t: "Hotels: the booking sites get named before the hotels do", day: "23 Aug 2026", href: "/resources/geo-ireland/hotels" },
    ],
    all: { t: "The study →", href: "/resources/geo-ireland" },
    example: true,
  },
  {
    key: "ads",
    name: "The ads desk",
    what: "Irish ads by sector · an AI, weekly",
    mark: "D",
    kind: "agent",
    pieces: [
      { t: "The week’s new ads, sector by sector", day: "Weekly" },
      { t: "Who changed their creative, and who ran the same ad all quarter", day: "Quarterly" },
    ],
    all: { t: "The tracker →", href: "#trackers" },
    example: true,
  },
  {
    key: "models",
    name: "The models desk",
    what: "Same brief, every model · an AI, monthly",
    mark: "M",
    kind: "agent",
    pieces: [
      { t: "One marketing brief, put to ChatGPT, Claude and Gemini this month", day: "Monthly" },
    ],
    all: { t: "The test →", href: "#trackers" },
    example: true,
  },
  {
    key: "moves",
    name: "The moves desk",
    what: "Irish marketing leaders · an AI, monthly",
    mark: "V",
    kind: "agent",
    pieces: [
      { t: "Heads of marketing who changed jobs this month", day: "Monthly" },
    ],
    all: { t: "The list →", href: "#trackers" },
    example: true,
  },
];

export type Tracker = {
  name: string;
  what: string;
  desk: string;
  reads: string;
  /** Only for trackers that have read at least once. From a real file, never typed. */
  reading?: { value: string; of: string; last: string };
  first?: string;
  href?: string;
  example: boolean;
};

export const TRACKERS: Tracker[] = [
  {
    name: "Jobs and AI",
    what: "The AI asks in Irish marketing and sales job ads",
    desk: "Jeff",
    reads: "Weekly",
    // Sam's recount, 25 Sep: 660 marketing and sales ads on 24 Sep, 47 with a real AI ask (7.1%), frozen.
    reading: { value: "47", of: "of 660 ads ask for AI", last: "24 Sep" },
    href: "/resources/jobs-ai",
    example: false,
  },
  {
    name: "AI answers in Ireland",
    what: "Who five AI engines name for Irish questions",
    desk: "Jess",
    reads: "Weekly",
    // filled in page.tsx from data.ts (GEO Ireland day one, not signed off)
    href: "/resources/geo-ireland",
    example: false,
  },
  { name: "Irish ads by sector", what: "New ads from the Meta and Google ad libraries", desk: "The ads desk", reads: "Weekly", first: "Nov", example: true },
  { name: "AI Overviews coverage", what: "How often Google answers an Irish search itself", desk: "Jess", reads: "Weekly", first: "Nov", example: true },
  { name: "Tools in job specs", what: "Which AI and marketing tools employers name", desk: "Jeff", reads: "Weekly", first: "Oct", example: true },
  { name: "Same brief, every model", what: "One marketing brief put to every model, monthly", desk: "The models desk", reads: "Monthly", first: "Oct", example: true },
  { name: "Agent watch", what: "What Irish companies actually deploy as agents", desk: "Jeff", reads: "Monthly", first: "Dec", example: true },
  { name: "What Ireland says online", what: "Brands and categories on Reddit and boards.ie", desk: "Jess", reads: "Weekly", first: "Dec", example: true },
  { name: "Marketing leader moves", what: "Heads of marketing who changed jobs in Ireland", desk: "The moves desk", reads: "Monthly", first: "Nov", example: true },
  { name: "What marketers do with AI", what: "What 1,000+ marketers on our course actually use", desk: "Sam", reads: "Quarterly", first: "Jan", example: true },
];

export type Study = { no: string; title: string; line: string; next: string; cover: "bars" | "rings" | "blocks" | "grid" | "dots" | "steps"; fox: string; href?: string; example: boolean };

export const STUDIES: Study[] = [
  { no: "No. 01", title: "GEO Ireland", line: "Who five AI engines name across 41 categories of Irish life.", next: "Second read, Dec", cover: "bars", fox: "fox-sideeye-right-nobg.png", href: "/resources/geo-ireland", example: false },
  { no: "No. 02", title: "What Irish Marketers Do with AI", line: "From what 1,000+ marketers do on our course, not what they say.", next: "Jan 2027", cover: "rings", fox: "chapter-fox-bored-nobg.png", example: true },
  { no: "No. 03", title: "The Irish Marketing Team", line: "Team size and roles at the top Irish companies, by sector.", next: "Feb 2027", cover: "blocks", fox: "fox-pm-nobg.png", example: true },
  { no: "No. 04", title: "Irish Advertising Audit", line: "Who advertises, how often creative changes, brand against activation.", next: "Dec 2026", cover: "grid", fox: "fox-facepalm-nobg.png", example: true },
  { no: "No. 05", title: "What Comes to Mind", line: "Which brands Irish people think of in real buying moments, by phone.", next: "Mar 2027", cover: "dots", fox: "chapter-fox-sitting-nobg.png", example: true },
  { no: "No. 06", title: "The Mystery Shop", line: "The same question put to 50 Irish brands’ chat, email and phone.", next: "Apr 2027", cover: "steps", fox: "fox-rain-nobg.png", example: true },
];

export type ToolCard = { name: string; line: string; href?: string; bar: string; example: boolean };

export const TOOL_CARDS: ToolCard[] = [
  { name: "Brief Diagnostician", line: "Paste a brief. See which way it wants the ad to work.", href: "/brief-diagnostician", bar: "brief_diagnostician", example: false },
  { name: "The metrics pyramid", line: "See where each metric you track sits, activity to outcome.", href: "/coach", bar: "metrics_pyramid", example: false },
  { name: "What an agent costs", line: "What a marketing agent costs to build and to run.", href: "/what-does-a-marketing-agent-cost", bar: "agent_cost", example: false },
  { name: "AI Writer", line: "How we build a writer trained on a brand.", href: "/ai-writer", bar: "ai_writer", example: false },
  { name: "Which agent first", line: "Answer six questions. Get the agent to build first, drawn out.", bar: "which_agent_first", example: true },
  { name: "Your brand in the answer", line: "See what five AI engines say about your brand.", bar: "brand_in_the_answer", example: true },
  { name: "How many are in market", line: "The share of your buyers ready to buy this quarter.", bar: "in_market", example: true },
  { name: "Team benchmark", line: "Your sector, revenue and team size. See where you sit.", bar: "team_benchmark", example: true },
];

export const AREAS_NEXT: { name: string; line: string }[] = [
  { name: "AI search", line: "What the engines say, and who they send people to" },
  { name: "Advertising", line: "What Irish brands run, and what changes" },
  { name: "Teams and hiring", line: "Who marketing teams hire, and what they ask for" },
  { name: "Brand", line: "What people think of when they come to buy" },
  { name: "Sales", line: "Outreach, pipeline and what a reply costs" },
  { name: "Agents", line: "What agents do in marketing, and what they cost" },
];

/** The ten agents, as named in src/components/agents/AgentsSection.tsx. Real. */
export const AGENTS: { num: string; name: string; short: string }[] = [
  { num: "01", name: "Research Agents", short: "the morning research note" },
  { num: "02", name: "Growth Agent Team", short: "the pipeline, the outbound, the meetings" },
  { num: "03", name: "Email Marketing Agents", short: "the emails that keep customers" },
  { num: "04", name: "Ghostwriters", short: "posts and articles in your voice" },
  { num: "05", name: "Search Agents", short: "new terms, new ads, live by morning" },
  { num: "06", name: "Advertising Agents", short: "ads written, made, live and remade" },
  { num: "07", name: "Website Agent Team", short: "a site built with craft, changed by asking" },
  { num: "08", name: "Brand Guardians", short: "every file measured against the book" },
  { num: "09", name: "Campaign Managers", short: "where everything stands" },
  { num: "10", name: "Red Team", short: "the mistakes, caught before you see them" },
];
