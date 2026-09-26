import data from "./catalogue.json";
import type { Catalogue, Report, ReportSeries, Tracker, Dataset, Tool, Playbook, Area } from "./types";

/**
 * The one way into the catalogue. Pages import from here, never from catalogue.json directly, so
 * a later move to a database changes this file and nothing else.
 * catalogue.json is WRITTEN by scripts/resources/build-catalogue.mjs. Never edit it by hand.
 */
export const CATALOGUE = data as unknown as Catalogue;

export const SERIES: ReportSeries[] = CATALOGUE.series;
export const REPORTS: Report[] = CATALOGUE.reports;
export const TRACKERS: Tracker[] = CATALOGUE.trackers;
export const DATASETS: Dataset[] = CATALOGUE.datasets;
export const TOOLS: Tool[] = CATALOGUE.tools;
export const PLAYBOOKS: Playbook[] = CATALOGUE.playbooks;

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
