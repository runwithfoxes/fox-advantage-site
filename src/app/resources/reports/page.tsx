import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { SERIES, PUBLISHED, COMING, seriesOf, reportHref, seriesHref, editionsOf, day, COUNTS } from "../catalogue";
import { Chart, FigureWindow, Gate, Example } from "../kit";
import ReportsTable from "./ReportsTable";
import { Top, Byline, nextEdition } from "./shared";
import s from "./reports.module.css";

export const metadata: Metadata = {
  title: "Reports | Run with Foxes",
  description: "Numbered studies on a fixed calendar, about AI and marketing in Ireland. Free to read.",
  robots: { index: false, follow: false },
};

/**
 * /resources/reports, THE INDEX. Its shape is a research index, not a shop: one edition drawn big,
 * then a table (BUILD-NOTES: "an index that is a table not a card grid, one featured thing per
 * page drawn big, dates on everything").
 *
 * Craft ledger (DOCTRINE 7 Sep):
 * - the top band: the site nav on deep, so the same nav serves the film hero and this page.
 * - the head: two columns, name and count on the left, the standfirst on the right, the way a
 *   research index opens; the count is real, read from the catalogue.
 * - the featured edition: its first figure at full size, with the fox on the window's corner
 *   (one fox per page, brand spec), and beside it the four newest editions as dated rows so
 *   "what's new" is answered without a card grid.
 * - the twelve series: marks in a row, the real ones filled, the examples outlined, so at a
 *   glance you can tell what is measured today from what the programme will grow into.
 * - the table: Date, Series, Title, By, PDF; filters change it in place. Titles are findings,
 *   never labels, which is what makes a plain table readable.
 * - the gate: at the end, listing what an account adds across the whole programme.
 */
export default function ReportsIndex() {
  const byDate = [...PUBLISHED].sort((a, b) => b.date.localeCompare(a.date));
  const featured = byDate[0];
  const fSeries = seriesOf(featured);
  const latest = byDate.slice(1, 5);
  const fig = featured.figures[0];
  const sectors = Array.from(new Set(PUBLISHED.flatMap((r) => r.sectors))).sort();
  const years = Array.from(new Set(PUBLISHED.map((r) => r.date.slice(0, 4)))).sort().reverse();
  const rows = byDate.map((r) => ({ r, series: seriesOf(r), href: reportHref(r) }));
  const since = SERIES.map((x) => x.started).sort()[0].slice(0, 4);
  const realSeries = SERIES.filter((x) => !x.example).length;

  return (
    <div className={s.page}>
      <Top crumbs={[{ href: "/resources", t: "Resources" }, { t: "Reports" }]} />
      <main className={s.wrap}>
        <p className={s.note}>Mockup, 26 Sep 2026. Anything tagged Example is made up. The two real reports are drafts.</p>
        <header className={s.head}>
          <div>
            <h1 className={s.h1}>Reports</h1>
            <p className={s.count}>
              <b>{COUNTS.series}</b> series · <b>{COUNTS.reports}</b> editions · since {since} · {realSeries} running today, the rest planned
            </p>
          </div>
          <p className={s.stand}>
            Numbered studies on a fixed calendar. Each one asks the same question the same way every time, so the change between editions is the finding. Every report is free to read, with no form. An account adds the PDF, the data behind it and your own sector&rsquo;s cut.
          </p>
        </header>

        <section className={s.feature} aria-label="Featured edition">
          <div className={s.featText}>
            <div className={s.eyebrow}>
              <span>{fSeries.name}</span>
              <span className={s.badge}>{featured.edition}</span>
              {featured.status === "draft" ? <span className={s.badge}>Draft</span> : null}
              <Example on={featured.example} />
            </div>
            <h2 className={s.featTitle}>
              <Link href={reportHref(featured)}>{featured.title}</Link>
            </h2>
            <p className={s.featStand}>{featured.standfirst}</p>
            <Byline r={featured} />
            {fig ? (
              <div className={s.featFig}>
                <FigureWindow id="featured" n="1" title={fig.title} caption={fig.caption}>
                  <Chart data={fig.data} />
                </FigureWindow>
              </div>
            ) : null}
          </div>
          <div className={s.latest}>
            <img className={s.featFox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            <p className={s.latestLab}>Also new</p>
            {latest.map((r) => (
              <Link key={r.slug} href={reportHref(r)} className={s.latestRow}>
                <span className={s.latestD}>{day(r.date)}</span>
                <span>
                  <span className={s.latestT}>
                    {r.title}
                    <Example on={r.example} />
                  </span>
                  <span className={s.latestM}>
                    {seriesOf(r).name} · {r.edition} · {r.author.name}
                  </span>
                </span>
              </Link>
            ))}
            <Link href="#every" className={s.more} style={{ display: "inline-block", marginTop: 14 }}>Every edition &darr;</Link>
          </div>
        </section>

        <div className={s.sectionHead}>
          <h2 className={s.h2}>The series</h2>
          <span>Filled marks are running today. Outlined ones are planned, with example editions to show the shape.</span>
        </div>
        <div className={s.seriesGrid}>
          {SERIES.map((se) => {
            const eds = editionsOf(se).filter((r) => r.status !== "coming");
            const next = nextEdition(se);
            return (
              <Link key={se.slug} href={seriesHref(se)} className={s.seriesCell} data-real={!se.example}>
                <span className={s.markBox}>{se.mark}</span>
                <span>
                  <span className={s.seriesName}>
                    {se.name}
                    <Example on={se.example} />
                  </span>
                  <span className={s.seriesLine}>
                    {se.cadence} · {eds.length} {eds.length === 1 ? "edition" : "editions"}
                    {next ? <><br />next {day(next.date)}</> : null}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className={s.sectionHead} id="every">
          <h2 className={s.h2}>Every edition</h2>
          <span>
            {COUNTS.reports} published · {COMING.length} announced
          </span>
        </div>
        <ReportsTable rows={rows} sectors={sectors} years={years} />

        <Gate adds={["Every report as a PDF", "The next edition of any series, by email the day it lands", "Your sector's cut of every report that has one", "The data behind every figure, as a CSV"]} />
      </main>
      <SiteFooter current="/resources" wide />
    </div>
  );
}
