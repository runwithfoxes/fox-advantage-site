/**
 * THE RESOURCE CENTRE CATALOGUE, FROZEN TYPES. 26 Sep 2026.
 *
 * Paul, 26 Sep: "think big and be ambitious... I want to do 10x that amount. So add dummy reports
 * and trackers and datasets." Every page in the resource centre reads catalogue.json through
 * index.ts, which is written by scripts/resources/build-catalogue.mjs from a seed. No dummy number
 * is typed by hand, and every k of n carries the pct worked out from it.
 *
 * ⛔ example: true means made up. Every page that shows an example item shows the Example tag
 * (kit/Example.tsx) beside it, and every example PDF carries "Example, made-up numbers" on every
 * page. Real items (The AI Ask Q3 2026, GEO Ireland day one, the Jobs and AI tracker) carry
 * example: false and their numbers come from the real files, never from the seed.
 *
 * ⛔ Examples name sectors and made-up firms only. Never a real Irish brand or person attached to a
 * made-up finding.
 *
 * Adding a field is fine. Renaming or removing one breaks the template agents, so don't.
 */

export type Area = "search" | "agents" | "brand" | "work" | "adoption" | "media";

export type Sector =
  | "Tourism and hospitality"
  | "Retail and ecommerce"
  | "Financial services"
  | "Tax and accounting"
  | "Technology and SaaS"
  | "Food and drink"
  | "Health"
  | "Property"
  | "Education"
  | "Public sector"
  | "Professional services"
  | "Motor"
  | "Energy"
  | "Media and publishing";

/** Who wrote it. Person = a human; agent = one of the named agents, always labelled as an AI. */
export type Author = { name: string; role: string; kind: "person" | "agent" };

/** A count out of a total. pct is always 100*k/n rounded to one decimal, written by the generator. */
export type KofN = { k: number; n: number; pct: number };

export type Finding = {
  /** The number that carries it, as it should be printed: "38%", "3 in 10", "€41", "2.4x". */
  big: string;
  /** What the number counts, short, mono label size. */
  label: string;
  /** The finding as a sentence, written as a consequence for the reader (DOCTRINE: insight, not fact). */
  text: string;
  /** The count behind it, when there is one. */
  count?: KofN;
};

/* ── Figures. Varied on purpose: a report of forty identical bar charts reads as a template. ── */

export type FigBars = {
  kind: "bars";
  unit: "%" | "count" | "€";
  rows: { label: string; value: number; count?: KofN; highlight?: boolean }[];
};
export type FigLine = {
  kind: "line";
  unit: "%" | "count" | "€" | "index";
  /** x labels, shared by every series */
  x: string[];
  series: { name: string; values: number[]; highlight?: boolean }[];
};
export type FigStack = {
  kind: "stack";
  /** each row is one bar split into parts that sum to 100 */
  parts: string[];
  rows: { label: string; values: number[] }[];
};
export type FigRange = {
  kind: "range";
  unit: "%" | "€" | "count";
  rows: { label: string; low: number; mid: number; high: number }[];
};
export type FigSmall = {
  kind: "small";
  unit: "%" | "index";
  x: string[];
  panels: { label: string; values: number[] }[];
};
export type FigTable = {
  kind: "table";
  columns: string[];
  rows: (string | number)[][];
};
export type FigWaffle = {
  kind: "waffle";
  /** one square per item; parts sum to total */
  total: number;
  parts: { label: string; n: number }[];
};

export type FigureData = FigBars | FigLine | FigStack | FigRange | FigSmall | FigTable | FigWaffle;

export type Figure = {
  id: string; // "f1", "f2"
  /** The one sentence the figure proves. Written first; the figure is drawn for it. */
  title: string;
  caption: string;
  data: FigureData;
};

/* ── Reports ── */

export type Cadence = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Twice a year" | "Yearly";

export type ReportSeries = {
  slug: string;
  name: string;
  /** one line: what the series measures, every edition */
  line: string;
  cadence: Cadence;
  area: Area;
  lead: Author;
  /** where the numbers come from, one line */
  method: string;
  /** a short mark for the series cover: 2 to 3 letters in mono */
  mark: string;
  started: string; // ISO
  example: boolean;
  /** edition slugs, newest first */
  editions: string[];
};

export type Report = {
  slug: string; // unique across all reports, e.g. "geo-ireland-2026-q3"
  series: string; // series slug
  edition: string; // "Q3 2026", "No. 04", "2026"
  n: number; // edition number within the series, 1 is the first
  date: string; // ISO publish date
  title: string; // the report's title, a finding not a label
  standfirst: string;
  author: Author;
  checkedBy?: string;
  area: Area;
  sectors: Sector[];
  /** sample size line, "1,240 job ads", "212 marketing leads" */
  sample: string;
  findings: Finding[]; // 3 to 5
  figures: Figure[]; // 2 to 3, varied kinds
  /** What anyone can read, no email. */
  free: string[];
  /** What a free account adds. The gate lists these at the end of the piece. */
  withAccount: string[];
  pages: number; // PDF page count
  /** /resources/pdf/<slug>.pdf once built. */
  pdf: string;
  /** For real reports that already have their own page. */
  href?: string;
  minutes: number; // reading time
  example: boolean;
  status: "published" | "draft" | "coming";
};

/* ── Trackers ── */

export type Tracker = {
  slug: string;
  name: string;
  line: string;
  area: Area;
  sectors: Sector[];
  cadence: Cadence;
  owner: Author;
  status: "live" | "testing" | "planned";
  lastRead: string; // ISO
  /** The reading as printed, with the unit: "8.8%", "412", "€0.35". */
  reading: string;
  readingLabel: string; // "of job ads ask for AI"
  count?: KofN;
  /** change since the previous read, as printed: "+1.2 pts", "-3" */
  delta: string;
  direction: "up" | "down" | "flat";
  unit: "%" | "count" | "€" | "index";
  /** 12 to 26 points, oldest first, for the sparkline */
  history: number[];
  historyLabels: string[];
  /** what a free account adds */
  withAccount: string[];
  href?: string;
  example: boolean;
};

/* ── Datasets ── */

export type ColumnType = "text" | "number" | "percent" | "date" | "euro" | "category" | "url" | "boolean";

export type Dataset = {
  slug: string;
  name: string;
  line: string;
  area: Area;
  sectors: Sector[];
  columns: { name: string; type: ColumnType; about: string }[];
  rows: number;
  updated: string; // ISO
  cadence: Cadence;
  owner: Author;
  licence: string;
  /** first 8 rows, free, keyed by column name */
  sample: Record<string, string | number | boolean>[];
  /** size of the full CSV as printed, "184 KB" */
  size: string;
  csv: string; // /resources/data/<slug>.csv (behind the gate)
  /** reports that use this dataset */
  usedIn: string[];
  example: boolean;
};

/* ── Tools and playbooks ── */

export type Tool = {
  slug: string;
  name: string;
  line: string;
  area: Area;
  /** what you put in, one line */
  input: string;
  /** what the free first look gives you */
  free: string;
  /** what the full result adds, for an email */
  full: string;
  minutes: number;
  status: "live" | "beta" | "coming";
  href?: string;
  example: boolean;
};

export type PlaybookKind = "Prompt" | "Template" | "Checklist" | "Agent brief" | "Spreadsheet" | "Framework";

export type Playbook = {
  slug: string;
  name: string;
  kind: PlaybookKind;
  line: string;
  area: Area;
  /** the short version shown on the page, 3 to 6 steps */
  steps: string[];
  /** the files an account gets */
  files: { name: string; format: string }[];
  from?: string; // "Course, module 1", "GEO Ireland"
  href?: string;
  example: boolean;
};

export type Catalogue = {
  built: string; // ISO timestamp of the generator run
  seed: number;
  authors: Author[];
  series: ReportSeries[];
  reports: Report[];
  trackers: Tracker[];
  datasets: Dataset[];
  tools: Tool[];
  playbooks: Playbook[];
};

export const AREA_LABEL: Record<Area, string> = {
  search: "AI search",
  agents: "Agents",
  brand: "Brand and creative",
  work: "Skills and work",
  adoption: "Adoption",
  media: "Media and ads",
};
