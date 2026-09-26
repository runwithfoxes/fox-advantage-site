import Link from "next/link";
import Cover, { COVER_ARTS, COVER_FOXES } from "./Cover";
import Publications, { type Pub } from "../resources/Publications";
import {
  SERIES, PUBLISHED, COUNTS, AREA_LABEL,
  seriesOf, editionsOf, reportBySlug, reportHref, seriesHref, day,
  type Author,
} from "../resources/catalogue";
import { Chart, FigureWindow, DownloadPdf, Example } from "../resources/kit";
import { MODULES } from "../course/courseModules";
import { librarySummary } from "../resources/library/summary";
import L from "../resources/library/library.module.css";
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
 * Band 3, the course and the library, together and big. Paul, 26 Sep, on bands 1 and 2: "the
 * training course should be more prominent. And where would people find the library, for
 * example? I think they're all important parts." The course is his 25 Sep your_course window
 * (six modules, module 1 open, the sign-up); the library is its shelf on a deep band, counted
 * live off the course's own sources, with the first prompts to copy right here and the door
 * to the whole library.
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

  const lib = librarySummary();
  const nextModule = MODULES.find((m) => !m.built);

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

      {/* ── Band 3: the course ── */}
      <section className={f.shelf} id="course">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>The course</h2>
          <span className={f.meta}>AI Fluency for Ambitious Marketers. Free. Module 1 is open now.</span>
        </div>
        <div className={n.learnGrid}>
          {/* The module window from 25 Sep. Module 1 is open; the rest carry their dates. */}
          <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">your_course</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>The course, free · {MODULES.filter((m) => m.built).length} of {MODULES.length} modules open</span>
              <ol className={n.accMods}>
                {MODULES.map((m) => (
                  <li key={m.n} className={m.built ? n.accModOn : ""}>
                    <span>{m.n}</span>
                    {m.title.replace(/^\(\d\)\s*/, "")}
                    <em>{m.built ? <Link href={`/course/${m.n}`}>Open</Link> : m.when}</em>
                  </li>
                ))}
              </ol>
              <form className={`${n.joinRow} ${n.learnJoin}`}>
                <input type="email" placeholder="you@company.ie" aria-label="Work email" />
                <button type="button">Start module 1, free</button>
              </form>
              <span className={n.accFine}>
                {nextModule ? `Module ${nextModule.n} opens ${nextModule.when}. ` : ""}Same free account as everything else here.
              </span>
            </div>
          </article>
          {/* The course's own words (its page description), the fox from the module pages, one door. */}
          <div className={n.courseSide}>
            <img className={n.courseFox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            <p className={n.courseStand}>
              A free, practical, non&#8209;hype AI fluency course for ambitious marketers. Six modules, one a fortnight, from Monday 21 September 2026.
            </p>
            <p className={n.courseLine}>Each module is a lesson you read once. What it hands you, the prompts, the links and the files, goes into the library, so you never have to go back through a lesson to find the thing you half remember.</p>
            <Link href="/course" className={n.doorGo}>About the course →</Link>
          </div>
        </div>
      </section>

      {/* ── Band 4: the library, its own door. Paul, 26 Sep: "I want people to want to go to
           library even if they don't want training. Library requires email too." ── */}
      <section className={f.shelf} id="library">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>The library</h2>
          <span className={f.meta}>Every prompt, link, file, person and tool we use, in one place. Free with an account.</span>
        </div>
        <div className={n.libGrid}>
          <div className={n.libCol}>
            <div className={n.libBand}>
              <div className={n.libHead}>
                <span className={n.libLab}>What is in it</span>
                <span className={n.libSub}>{lib.everything} things · {lib.built} of {lib.perModule.length} modules open</span>
              </div>
              <div className={L.shelf} role="img" aria-label={`Things in the library by module: ${lib.perModule.map((m) => `module ${m.n} ${m.things}`).join(", ")}`}>
                {lib.perModule.map((m) => (
                  <div key={m.n} className={`${L.spine} ${m.has ? L.spineOn : ""}`}>
                    <span className={L.spineN}>{m.things}</span>
                    <span className={L.spineBar} style={{ height: `${14 + Math.round((m.things / lib.maxThings) * 64)}px` }} />
                    <span className={L.spineMod}>{String(m.n).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
              <ul className={n.libLedger}>
                {lib.ledger.slice(0, 6).map((x) => (
                  <li key={x.l}><b>{x.n}</b> {x.l}</li>
                ))}
              </ul>
            </div>
            <form className={`${n.joinRow} ${n.learnJoin} ${n.libJoin}`}>
              <input type="email" placeholder="you@company.ie" aria-label="Work email" />
              <button type="button">Open the library, free</button>
            </form>
            <span className={n.accFine}>One free account for the library, the course, every PDF and every dataset. Already have one? <Link href="/resources/library">Sign in</Link>.</span>
          </div>
          {/* A look inside: the first prompts by name. The words themselves open with the account. */}
          <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">library · prompts · {lib.prompts.length} so far</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>A look inside</span>
              <ol className={n.libRows}>
                {lib.prompts.slice(0, 6).map((r) => (
                  <li key={r.key}>
                    <span className={n.libRowName}>{r.name}</span>
                    <span className={n.libRowFrom}>{r.from} · module {r.modN} · {r.lines} {r.lines === 1 ? "line" : "lines"}</span>
                    <span className={n.libRowLock} aria-label="With a free account">
                      <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden><rect x="2" y="5.5" width="8" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M4 5.5V4a2 2 0 014 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                      copy
                    </span>
                  </li>
                ))}
              </ol>
              <span className={n.accFine}>
                And {lib.ledger.filter((x) => x.l !== "prompts").map((x) => `${x.n} ${x.l.toLowerCase().replace(" i ", " I ")}`).slice(0, 4).join(", ")}. Every one opens with the account.
              </span>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
