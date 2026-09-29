import data from "./catalogue.json";
import type { Catalogue, Report, ReportSeries, Tracker, Dataset, Tool, Playbook, Area } from "./types";

/**
 * The one way into the catalogue. Pages import from here, never from catalogue.json directly, so
 * a later move to a database changes this file and nothing else.
 * catalogue.json is WRITTEN by scripts/resources/build-catalogue.mjs. Never edit it by hand.
 */
export const CATALOGUE = data as unknown as Catalogue;

/*
  LIVE, 29 Sep 2026. The site went live with the new homepage before the research programme was
  ready, so this is the one door every made-up thing is stopped at. Every item with example: true
  is dropped here, which means no page, count, card, PDF list or report route can show one: a
  made-up report's URL returns not found because reportBySlug never sees it. Two REAL series are
  held back as well, by slug, until Paul signs them off (his words, 29 Sep: "The GEO isn't ready
  and neither is the other research"): GEO Ireland and the Ad Audit. Take a slug out of HELD to
  release it. Flip LIVE to false to see the full mockup again.
*/
const LIVE = true;
const HELD = new Set(["geo-ireland", "the-ad-audit", "geo-ireland-day-one", "ai-answers-in-ireland"]);
const held = (x: { slug: string; series?: string; report?: string }) => HELD.has(x.slug) || HELD.has(x.series ?? "") || HELD.has((x.report ?? "").replace(/-(2026|2027)-q\d$|-no-\d+$/, ""));
const live = <T extends { slug: string; example: boolean; series?: string }>(xs: T[]): T[] => (LIVE ? xs.filter((x) => !x.example && !held(x)) : xs);

export const SERIES: ReportSeries[] = live(CATALOGUE.series);
export const REPORTS: Report[] = live(CATALOGUE.reports);
export const TRACKERS: Tracker[] = live(CATALOGUE.trackers);
export const DATASETS: Dataset[] = live(CATALOGUE.datasets);
export const TOOLS: Tool[] = live(CATALOGUE.tools);
export const PLAYBOOKS: Playbook[] = live(CATALOGUE.playbooks);

/* The held real series, shown as "coming soon" on the homepage shelf with a box to be told when
   each one lands (Paul, 29 Sep: "have the GEO report and also the Meta advertising report... coming
   soon and people can just subscribe"). Their pages stay off until they are released from HELD. */
export const COMING_SOON: ReportSeries[] = ["the-ad-audit", "geo-ireland"]
  .map((slug) => CATALOGUE.series.find((se) => se.slug === slug))
  .filter((se): se is ReportSeries => Boolean(se) && HELD.has(se!.slug));

/** Published and draft reports, newest first. "coming" editions are announced, not listed as reports. */
export const PUBLISHED: Report[] = REPORTS.filter((r) => r.status !== "coming");
export const COMING: Report[] = REPORTS.filter((r) => r.status === "coming");

export const seriesOf = (r: Report) => SERIES.find((s) => s.slug === r.series)!;
export const reportBySlug = (slug: string) => REPORTS.find((r) => r.slug === slug);
export const seriesBySlug = (slug: string) => SERIES.find((s) => s.slug === slug);
export const editionsOf = (s: ReportSeries) => s.editions.map((e) => reportBySlug(e)!).filter(Boolean);
export const trackerBySlug = (slug: string) => TRACKERS.find((t) => t.slug === slug);
export const datasetBySlug = (slug: string) => DATASETS.find((d) => d.slug === slug);
export const byArea = <T extends { area: Area }>(xs: T[], a: Area) => xs.filter((x) => x.area === a);

/** Where each kind of thing lives. Real reports keep their own page (href); the rest use the template route. */
export const reportHref = (r: Report) => r.href ?? `/resources/reports/${r.series}/${r.slug}`;
export const trackerHref = (t: Tracker) => t.href ?? `/resources/trackers/${t.slug}`;
export const datasetHref = (d: Dataset) => `/resources/data/${d.slug}`;
export const seriesHref = (s: ReportSeries) => `/resources/reports/${s.slug}`;

export const COUNTS = {
  series: SERIES.length,
  reports: PUBLISHED.length,
  trackers: TRACKERS.length,
  datasets: DATASETS.length,
  tools: TOOLS.length,
  playbooks: PLAYBOOKS.length,
  rows: DATASETS.reduce((a, d) => a + d.rows, 0),
};

export function day(iso: string) {
  const d = new Date(iso.length === 7 ? iso + "-01T12:00:00Z" : iso + "T12:00:00Z");
  return d.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export * from "./types";
