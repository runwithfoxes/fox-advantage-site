import Link from "next/link";
import NextNav from "../../home-next/NextNav";
import { Example } from "../kit";
import { COMING, editionsOf, reportBySlug, seriesHref, day, type Finding, type Report, type ReportSeries, type FigLine } from "../catalogue";
import s from "./reports.module.css";

/**
 * Shared pieces for the three report pages. Kept small on purpose: the shapes live in the pages.
 */

/** The deep band that carries the site nav, so the film hero and these pages share one nav. */
export function Top({ crumbs }: { crumbs?: { href?: string; t: string }[] }) {
  return (
    <div className={s.top}>
      <div className={s.topInner}>
        <NextNav />
        {crumbs?.length ? (
          <div className={s.crumb}>
            {crumbs.map((c, i) => (
              <span key={c.t} style={{ display: "contents" }}>
                {i ? <i>/</i> : null}
                {c.href ? <Link href={c.href}>{c.t}</Link> : <span>{c.t}</span>}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Byline({ r, compact }: { r: Report; compact?: boolean }) {
  const isAgent = r.author.kind === "agent";
  return (
    <div className={s.meta}>
      <i className={s.mark}>{r.author.name[0]}</i>
      <span>
        {r.author.name}
        {isAgent ? `, ${r.author.role}` : ` · ${r.author.role}`}
      </span>
      {r.checkedBy ? (
        <>
          <span className={s.dot}>·</span>
          <span>Checked by {r.checkedBy}</span>
        </>
      ) : null}
      <span className={s.dot}>·</span>
      <span>{day(r.date)}</span>
      {!compact && r.minutes ? (
        <>
          <span className={s.dot}>·</span>
          <span>{r.minutes} min read</span>
        </>
      ) : null}
    </div>
  );
}

/** "38%" -> 38 with unit %, "17 of 41" -> 17 count, "€41" -> 41 euro, "2.4x" -> 2.4 index. */
export function bigNumber(f: Finding | undefined): { v: number; unit: FigLine["unit"] } | null {
  if (!f) return null;
  if (f.count) return { v: f.count.pct, unit: "%" };
  const b = f.big.replace(/,/g, "").trim();
  let m = b.match(/^([\d.]+)%$/);
  if (m) return { v: +m[1], unit: "%" };
  m = b.match(/^(\d+(?:\.\d+)?) of (\d+)/);
  if (m) return { v: +m[1], unit: "count" };
  m = b.match(/^€([\d.]+)k?$/);
  if (m) return { v: +m[1] * (b.endsWith("k") ? 1000 : 1), unit: "€" };
  m = b.match(/^([\d.]+)x$/);
  if (m) return { v: +m[1], unit: "index" };
  m = b.match(/^([\d.]+)$/);
  if (m) return { v: +m[1], unit: "count" };
  return null;
}

/**
 * The trend a series carries: its first finding's number across every published edition, oldest
 * first. The unit is the first edition's; an edition whose first finding is in another unit is
 * left out and named, so the line never mixes a percentage with a count.
 */
export function trendOf(series: ReportSeries): { data: FigLine; label: string; skipped: string[] } | null {
  const eds = editionsOf(series)
    .filter((r) => r.status !== "coming" && r.findings.length)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!eds.length) return null;
  const first = bigNumber(eds[0].findings[0]);
  if (!first) return null;
  const skipped: string[] = [];
  const pts = eds.filter((r) => {
    const n = bigNumber(r.findings[0]);
    if (n && n.unit === first.unit) return true;
    skipped.push(r.edition);
    return false;
  });
  return {
    data: { kind: "line", unit: first.unit, x: pts.map((r) => r.edition), series: [{ name: eds[eds.length - 1].findings[0].label, values: pts.map((r) => bigNumber(r.findings[0])!.v), highlight: true }] },
    label: eds[eds.length - 1].findings[0].label,
    skipped,
  };
}

/** The next edition of a series: the announced one if there is one, else the cadence added to the newest. */
export function nextEdition(series: ReportSeries): { t: string; date: string; announced: boolean } | null {
  const coming = COMING.filter((r) => r.series === series.slug).sort((a, b) => a.date.localeCompare(b.date))[0];
  if (coming) return { t: coming.edition, date: coming.date, announced: true };
  const newest = series.editions.map((e) => reportBySlug(e)).filter((r): r is Report => !!r && r.status !== "coming").sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!newest) return null;
  const months: Record<string, number> = { Daily: 0, Weekly: 0, Monthly: 1, Quarterly: 3, "Twice a year": 6, Yearly: 12 };
  const d = new Date(newest.date + "T12:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + (months[series.cadence] ?? 3));
  return { t: `No. ${String(newest.n + 1).padStart(2, "0")}`, date: d.toISOString().slice(0, 10), announced: false };
}

export function SeriesLink({ series }: { series: ReportSeries }) {
  return (
    <Link href={seriesHref(series)} style={{ color: "inherit", textDecoration: "none" }}>
      {series.name}
      <Example on={series.example} />
    </Link>
  );
}
