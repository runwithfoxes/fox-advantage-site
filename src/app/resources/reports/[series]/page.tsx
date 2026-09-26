import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import { SERIES, seriesBySlug, editionsOf, reportHref, day } from "../../catalogue";
import { Chart, FigureWindow, Gate, Example } from "../../kit";
import { Top, trendOf, nextEdition } from "../shared";
import s from "../reports.module.css";
import Cover, { shelfEntry } from "../../../home-next/Cover";

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function generateStaticParams() {
  return SERIES.map((x) => ({ series: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }): Promise<Metadata> {
  const se = seriesBySlug((await params).series);
  return { title: se ? `${se.name} | Run with Foxes` : "Reports | Run with Foxes", robots: { index: false, follow: false } };
}

/**
 * /resources/reports/[series], A SERIES PAGE. One subject owns it (BUILD-NOTES, the Economic
 * Index: "a coloured full-width band, a mark, a serif title with the subtitle in grey on the same
 * measure, Last updated under it. One subject owns the page").
 *
 * Craft ledger:
 * - the band: deep, full width, the series mark drawn big in a bordered square, name, the one
 *   line it measures, lead and checker, editions and last read. The fox sits low on the right
 *   edge of the band, half out, so the headline furniture never lands on him.
 * - what it measures / how to read it: the method as prose on the left, the facts of the series
 *   as labelled rows on the right (how often, the sample, the next date), so a reader can decide
 *   in ten seconds whether to follow it.
 * - the trend: ONE chart, the headline number across every edition, oldest first. This is the
 *   point of a series and it gets the only figure on the page. One edition draws as a dot with a
 *   caption saying the line starts on the next reading.
 * - every edition: dated rows, newest first, title as the finding, standfirst, author, pages.
 * - the next edition: the announced one, or the cadence added to the newest, labelled as such.
 * - the gate: what an account adds to this series.
 */
export default async function SeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const se = seriesBySlug((await params).series);
  if (!se) notFound();
  const eds = editionsOf(se).filter((r) => r.status !== "coming").sort((a, b) => b.date.localeCompare(a.date));
  const newest = eds[0];
  const trend = trendOf(se);
  const next = nextEdition(se);
  const withAccount = Array.from(new Set(["The next edition by email, the day it lands", "Every edition as a PDF", ...eds.flatMap((r) => r.withAccount)])).slice(0, 5);

  return (
    <div className={s.page}>
      <Top crumbs={[{ href: "/resources", t: "Resources" }, { href: "/resources/reports", t: "Reports" }, { t: se.name }]} />
      <header className={s.band}>
        <div className={s.bandInner}>
          {/* The series' own cover, the same drawing and fox as on the homepage shelf (Paul, 26 Sep:
              the covers are the look; a letter stamp is not). */}
          <div className={s.bigCover}>
            {(() => { const e = shelfEntry(se.slug); return e ? <Cover no={e.no} cadence={se.cadence} title={se.name} cover={e.cover} fox={e.fox} /> : <span className={s.bigMark} aria-hidden>{se.mark}</span>; })()}
          </div>
          <div>
            <div className={s.bandEyebrow}>
              <span>Report series</span>
              <span className={`${s.badge} ${se.example ? s.bandEx : ""}`} style={{ borderColor: "rgba(255,255,255,.4)", color: "rgba(255,255,255,.85)" }}>{se.cadence}</span>
              <span>since {se.started.slice(0, 4)}</span>
              <Example on={se.example} />
            </div>
            <h1 className={s.bandH1}>{se.name}</h1>
            <p className={s.bandLine}>{se.line}</p>
            <div className={s.bandMeta}>
              <i className={s.mark}>{se.lead.name[0]}</i>
              <span>
                {se.lead.name}, {se.lead.role}
              </span>
              {se.checker ? (
                <>
                  <span className={s.dot}>·</span>
                  <span>Checked by {se.checker}</span>
                </>
              ) : null}
              <span className={s.dot}>·</span>
              <span>
                {eds.length} {eds.length === 1 ? "edition" : "editions"}
              </span>
              {newest ? (
                <>
                  <span className={s.dot}>·</span>
                  <span>Last read {day(newest.date)}</span>
                </>
              ) : null}
            </div>
          </div>
          <img className={s.bandFox} src="/fox/fox-sideeye-right-nobg.png" alt="" />
        </div>
      </header>

      <main className={s.wrap}>
        {se.example ? <p className={s.note}>Example series. Every edition and every number below is made up, to show the shape of a series page.</p> : null}
        <section className={s.about}>
          <div>
            <p className={s.eyebrow} style={{ marginBottom: 12 }}>What it measures</p>
            <p className={s.stand}>{se.method}</p>
            {newest ? (
              <p className={s.p} style={{ marginTop: 16, color: "#4a4a46" }}>
                The newest edition, {newest.edition}: {newest.standfirst}
              </p>
            ) : null}
          </div>
          <div>
            <p className={s.eyebrow} style={{ marginBottom: 12 }}>How to read it</p>
            <div className={s.readRows}>
              <div className={s.readRow}><span>How often</span><span>{se.cadence}, on a fixed date</span></div>
              <div className={s.readRow}><span>Sample</span><span>{newest?.sample ?? "Set per edition"}</span></div>
              <div className={s.readRow}><span>Lead</span><span>{se.lead.name}{se.lead.kind === "agent" ? ", an agent" : ""}</span></div>
              {se.checker ? <div className={s.readRow}><span>Checked</span><span>Every number, by {se.checker}</span></div> : null}
              {next ? <div className={s.readRow}><span>Next</span><span>{next.t}, {day(next.date)}{next.announced ? "" : " (expected)"}</span></div> : null}
              <div className={s.readRow}><span>To read</span><span>Free, no form</span></div>
            </div>
          </div>
        </section>

        {trend ? (
          <>
            <div className={s.sectionHead}>
              <h2 className={s.h2}>The trend</h2>
              <span>{trend.label}, every edition, oldest first</span>
            </div>
            <FigureWindow
              id="trend"
              n="1"
              title={trend.data.x.length > 1 ? `${cap(trend.label)}, ${trend.data.x[0]} to ${trend.data.x[trend.data.x.length - 1]}.` : `${cap(trend.label)}, the first reading. The line starts on the next one.`}
              caption={`${trend.data.x.length} ${trend.data.x.length === 1 ? "edition" : "editions"} plotted.${trend.skipped.length ? ` Left out because they count something else: ${trend.skipped.join(", ")}.` : ""}${se.example ? " Example data." : " Source: the editions below."}`}
            >
              <div className={s.trendWrap}>
                <Chart data={trend.data} />
              </div>
            </FigureWindow>
          </>
        ) : null}

        <div className={s.sectionHead}>
          <h2 className={s.h2}>Every edition</h2>
          <span>Newest first</span>
        </div>
        <div>
          {next ? (
            <div className={s.next}>
              <span className={s.edNo}>
                {next.t}
                <small>{day(next.date)}{next.announced ? "" : ", expected"}</small>
              </span>
              <div>
                <p className={s.edTitle} style={{ color: "#3A7CA5" }}>Next edition</p>
                <p className={s.edStand}>Same sources, same rulebook. An account gets it by email the day it lands.</p>
              </div>
            </div>
          ) : null}
          {eds.map((r) => (
            <article key={r.slug} className={s.edRow}>
              <span className={s.edNo}>
                {r.edition}
                <small>{day(r.date)}</small>
              </span>
              <div>
                <h3 className={s.edTitle}>
                  <Link href={reportHref(r)}>{r.title}</Link>
                  <Example on={r.example} />
                  {r.status === "draft" ? <span className={s.badge} style={{ marginLeft: 8, fontSize: 9.5 }}>Draft</span> : null}
                </h3>
                <p className={s.edStand}>{r.standfirst}</p>
              </div>
              <span className={s.edBy}>
                {r.author.name}
                <br />
                {r.checkedBy ? `Checked by ${r.checkedBy}` : ""}
              </span>
              <span className={s.edPdf}>
                {r.minutes} min
                <br />
                <a href={reportHref(r) + "#download"}>PDF, {r.pages} pp</a>
              </span>
            </article>
          ))}
        </div>

        <Gate adds={withAccount} />
      </main>
      <SiteFooter current="/resources" wide />
    </div>
  );
}
