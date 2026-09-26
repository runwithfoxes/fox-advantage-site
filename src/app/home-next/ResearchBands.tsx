import Link from "next/link";
import Cover, { COVER_ARTS, COVER_FOXES } from "./Cover";
import Publications, { type Pub } from "../resources/Publications";
import {
  SERIES, PUBLISHED, COUNTS, AREA_LABEL,
  seriesOf, editionsOf, reportBySlug, reportHref, seriesHref, day,
  type Author,
} from "../resources/catalogue";
import { Chart, FigureWindow, DownloadPdf, Example } from "../resources/kit";
import s from "../resources/hub.module.css";
import f from "../resources/front.module.css";
import n from "./next.module.css";

/**
 * THE RESEARCH BANDS under Your sector, 26 Sep 2026. Paul's rulings that day, in order:
 * the homepage IS the research and resources page ("this is the place"); it is "more about
 * reports than trackers... lots of reports that people can read and download and look at and
 * share"; "lots of essays as well as features from the course from the library"; "resources,
 * not just research, but it's not a tracking terminal board"; and the look is the one he built
 * on 25 Sep: "stylish, colourful, and professional", not "a Claude design". So every band here
 * is drawn with his 25 Sep parts (the cover, the module window, the blues) and nothing is a
 * bare table on the page.
 *
 * Band 1, the featured report: The AI Ask drawn big, its real figure in a window, the three
 * findings as numerals, the PDF. His Anthropic Economic Index reference.
 * Band 2, reports and papers: the twelve series as covers, the newest big, then every report
 * dated as a reading list inside a window, with search and every PDF.
 */

const AUTHOR_MARK = (a: Author) => (a.kind === "person" ? a.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() : a.name[0]);

const CADENCE_SHORT: Record<string, string> = { Quarterly: "Quarterly", "Twice a year": "Twice a year", Yearly: "Yearly", Monthly: "Monthly" };

export default function ResearchBands() {
  const featured = reportBySlug("the-ai-ask-2026-q3")!;
  const featSeries = seriesOf(featured);
  const featFig = featured.figures[1] ?? featured.figures[0];

  /* The covers: the series, newest edition first, the featured one's series left out because it
     is drawn big just above. Each series keeps the same drawing and fox every time it appears. */
  const newest = (slug: string) => editionsOf(SERIES.find((se) => se.slug === slug)!).filter((r) => r.status !== "coming")[0];
  /* Real studies first (GEO Ireland is the big one), then the examples, newest edition first. The
     number on a cover is its place on this shelf; the drawing and the fox belong to the series. */
  const series = [...SERIES]
    .filter((se) => se.slug !== featSeries.slug)
    .sort((a, b) => Number(a.example) - Number(b.example) || (newest(b.slug)?.date ?? "").localeCompare(newest(a.slug)?.date ?? ""));
  const art = (i: number) => COVER_ARTS[i % COVER_ARTS.length];
  const fox = (i: number) => COVER_FOXES[i % COVER_FOXES.length];
  const idx = (slug: string) => SERIES.findIndex((se) => se.slug === slug);
  const no = (slug: string) => `No. ${String(series.findIndex((se) => se.slug === slug) + 1).padStart(2, "0")}`;
  const plural = (k: number, w: string) => `${k} ${w}${k === 1 ? "" : "s"}`;
  const [flag, ...rest] = series;
  const flagEd = newest(flag.slug);

  /* The reading list: every report, dated, newest first. Search and filter live inside it. */
  const pubs: Pub[] = PUBLISHED.map<Pub>((r) => ({
    date: r.date, day: day(r.date), type: "Report", title: r.title, href: reportHref(r),
    author: r.author.name, sector: r.sectors[0] ?? AREA_LABEL[r.area], example: r.example,
  })).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ── Band 1: the featured report, drawn big ── */}
      <section className={`${f.shelf} ${n.rbFeat}`} id="featured">
        <div className={f.shelfHead}>
          <h2 className={f.h2}>This quarter</h2>
          <span className={f.meta}>Our newest report. Free to read in full, the PDF with a free account.</span>
        </div>
        <div className={s.feat}>
          <div>
            <FigureWindow id="feat-fig" n={featFig.id.replace("f", "")} title={featFig.title} caption={`${featFig.caption} Source: ${featSeries.name}, ${featured.edition}.`} tools={<span>{featured.sample}</span>}>
              <Chart data={featFig.data} />
            </FigureWindow>
            <div className={s.featBig}>
              {featured.findings.slice(0, 3).map((x) => (
                <div key={x.label}>
                  <b>{x.big}</b>
                  <span>{x.label}</span>
                  <p>{x.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={s.featKick}>
              {featSeries.name} · {featured.edition} <b>{featured.status === "draft" ? "Draft, not approved" : "Published"} · {day(featured.date)}</b>
            </p>
            <h3 className={s.featTitle}>
              <Link href={reportHref(featured)}>{featured.title}</Link>
            </h3>
            <p className={s.featStand}>{featured.standfirst}</p>
            <p className={s.featBy}>
              <i>{AUTHOR_MARK(featured.author)}</i>
              <span><b>{featured.author.name}</b> · {featured.author.role}{featured.checkedBy ? ` · checked by ${featured.checkedBy}` : ""} · {featured.minutes} min read</span>
            </p>
            <div className={s.featActs}>
              <Link href={reportHref(featured)} className={s.link}>Read the report →</Link>
              <DownloadPdf href={featured.pdf} pages={featured.pages} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Band 2: reports and papers, the covers and the reading list ── */}
      <section className={f.shelf} id="reports">
        <div className={f.shelfHead}>
          <h2 className={f.h2}>Reports and papers</h2>
          <span className={f.meta}>
            {COUNTS.series} studies on a fixed calendar, {COUNTS.reports} editions. Free to read with no form; every PDF with a free account.
          </span>
        </div>
        <div className={n.studies}>
          <Link href={seriesHref(flag)} className={n.flag}>
            <Cover no={no(flag.slug)} cadence={CADENCE_SHORT[flag.cadence] ?? flag.cadence} title={flag.name} cover={art(idx(flag.slug))} fox={fox(idx(flag.slug))} />
            <div>
              <span className={f.meta}>
                {flagEd ? `${flagEd.edition} · ${day(flagEd.date)}` : flag.cadence} <Example on={flag.example} />
              </span>
              <span className={n.flagTitle}>{flag.name}</span>
              <p className={n.flagLine}>{flag.line}</p>
              <span className={n.doorGo}>Read the latest edition →</span>
            </div>
          </Link>
          <div className={`${n.covers} ${n.coversWide}`}>
            {rest.map((se) => {
              const ed = newest(se.slug);
              const i = idx(se.slug);
              return (
                <Link key={se.slug} href={seriesHref(se)} className={n.coverCard}>
                  <Cover no={no(se.slug)} cadence={CADENCE_SHORT[se.cadence] ?? se.cadence} title={se.name} cover={art(i)} fox={fox(i)} />
                  <span className={f.meta}>
                    {ed ? `${plural(editionsOf(se).filter((r) => r.status !== "coming").length, "edition")} · latest ${day(ed.date)}` : `First edition ${se.cadence}`} <Example on={se.example} />
                  </span>
                  <p className={n.coverLine}>{se.line}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Every report, dated, inside a module window so the list has a frame and not flat edges
            (Paul, 25 Sep). Search and the filters are the window's own. */}
        <article className={`mod-win ${n.rbList}`}>
          <div className="mod-winbar">
            <span className="mod-lights"><i /><i /><i /></span>
            <span className="mod-wintitle">every_report · {PUBLISHED.length} editions · newest first</span>
          </div>
          <div className={n.rbListBody}>
            <Publications rows={pubs} />
          </div>
        </article>
      </section>
    </>
  );
}
