import Link from "next/link";
import Cover, { COVER_ARTS, COVER_FOXES } from "./Cover";
import Publications, { type Pub } from "../resources/Publications";
import {
  SERIES, PUBLISHED, COMING, COUNTS, AREA_LABEL, TOOLS, PLAYBOOKS, DATASETS, TRACKERS, CATALOGUE,
  seriesOf, editionsOf, reportBySlug, reportHref, seriesHref, datasetHref, trackerHref, day,
  type Author,
} from "../resources/catalogue";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { formatDay } from "../resources/library";
import { Chart, FigureWindow, DownloadPdf, Example, Sparkline } from "../resources/kit";
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
 * Band 5, essays and the diary: Paul's essays and Lena's diary as two reading lists, mono
 * titles, no bold, no pictures (Paul, 25 Sep: "tidier and cleaner and less pulling the
 * attention"). "I think the homepage should have lots of latest writing."
 * Band 6, resources to use: prompts and playbooks to download, datasets to practise on, tools
 * with a free first go. Paul, 26 Sep: "it's resources, not just research, but it's not a
 * tracking terminal board."
 * Band 3, the course and the library, together and big. Paul, 26 Sep, on bands 1 and 2: "the
 * training course should be more prominent. And where would people find the library, for
 * example? I think they're all important parts." The course is his 25 Sep your_course window
 * (six modules, module 1 open, the sign-up); the library is its shelf on a deep band, counted
 * live off the course's own sources, with the first prompts to copy right here and the door
 * to the whole library.
 */

const AUTHOR_MARK = (a: Author) => (a.kind === "person" ? a.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() : a.name[0]);

const CADENCE_SHORT: Record<string, string> = { Quarterly: "Quarterly", "Twice a year": "Twice a year", Yearly: "Yearly", Monthly: "Monthly" };

/* Coming up: the next six months, from what is announced, what repeats, and the course. */
const CADENCE_MONTHS: Record<string, number> = { Monthly: 1, Quarterly: 3, "Twice a year": 6, Yearly: 12 };
function addMonths(iso: string, k: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + k);
  return d.toISOString().slice(0, 10);
}
const monthKey = (iso: string) => iso.slice(0, 7);
function nextEditionLabel(cadence: string, iso: string) {
  const y = iso.slice(0, 4), m = Number(iso.slice(5, 7));
  if (cadence === "Quarterly") return `Q${Math.ceil(m / 3)} ${y}`;
  if (cadence === "Twice a year") return `H${m <= 6 ? 1 : 2} ${y}`;
  if (cadence === "Yearly") return y;
  return `${new Date(iso + "T12:00:00Z").toLocaleDateString("en-IE", { month: "short", timeZone: "UTC" })} ${y}`;
}
const monthName = (k: string) => new Date(k + "-01T12:00:00Z").toLocaleDateString("en-IE", { month: "short", timeZone: "UTC" });

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
  const essays = getAllEssays().slice(0, 7);
  const diary = getAllDispatches().slice(0, 7);
  const essayCount = getAllEssays().length;
  const diaryCount = getAllDispatches().length;
  const playbooks = [...PLAYBOOKS].sort((a, b) => Number(a.example) - Number(b.example)).slice(0, 6);
  const datasets = [...DATASETS].sort((a, b) => Number(a.example) - Number(b.example) || b.rows - a.rows).slice(0, 6);
  const toolOrder: Record<string, number> = { live: 0, beta: 1, coming: 2 };
  const tools = [...TOOLS].sort((a, b) => toolOrder[a.status] - toolOrder[b.status]).slice(0, 6);

  /* Trackers, small (Paul, 26 Sep: "not a tracking terminal board"): the real two, then four examples. */
  const trackerOrder: Record<string, number> = { live: 0, testing: 1, planned: 2 };
  const trackers = [...TRACKERS]
    .filter((t) => t.status !== "planned")
    .sort((a, b) => Number(a.example) - Number(b.example) || trackerOrder[a.status] - trackerOrder[b.status] || b.lastRead.localeCompare(a.lastRead))
    .slice(0, 6);

  const today = CATALOGUE.built.slice(0, 10);
  const months: string[] = [];
  for (let i = 0; i < 6; i++) months.push(monthKey(addMonths(today.slice(0, 7) + "-01", i + 1)));
  type Up = { key: string; title: string; example: boolean; course?: boolean; href?: string };
  const upcoming: Up[] = [
    ...COMING.map<Up>((r) => ({ key: monthKey(r.date), title: `${seriesOf(r).name}, ${r.edition}`, example: r.example, href: seriesHref(seriesOf(r)) })),
    ...SERIES.filter((se) => se.example).flatMap<Up>((se) => {
      const step = CADENCE_MONTHS[se.cadence];
      const last = editionsOf(se).filter((r) => r.status !== "coming")[0];
      if (!step || !last) return [];
      const next = addMonths(last.date, step);
      return months.includes(monthKey(next)) ? [{ key: monthKey(next), title: `${se.name}, ${nextEditionLabel(se.cadence, next)}`, example: true, href: seriesHref(se) }] : [];
    }),
    ...MODULES.filter((m) => !m.built).map<Up>((m) => ({ key: monthKey(m.on), title: `Course module ${m.n}: ${m.title.replace(/^\(\d+\)\s*/, "")}`, example: false, course: true, href: "/course" })),
  ];

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

      {/* ── Band 5: essays and the diary ── */}
      <section className={f.shelf} id="writing">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>Essays, and the diary</h2>
          <span className={f.meta}>How we build, written up as we go. {essayCount} essays by Paul, {diaryCount} diary entries by Lena. Always free, no form.</span>
        </div>
        <div className={n.writeGrid}>
          <div>
            <span className={n.dKick}>Essays · Paul Dervan</span>
            <ol className={n.writeList}>
              {essays.map((e) => (
                <li key={e.slug}>
                  <Link href={`/essays/${e.slug}`} className={n.writeT}>{e.title}</Link>
                  <span className={n.writeDek}>{e.dek}</span>
                  <span className={n.writeMeta}>{formatDay(e.date)}</span>
                </li>
              ))}
            </ol>
            <Link href="/essays" className={n.doorGo}>All {essayCount} essays →</Link>
          </div>
          <div>
            <span className={n.dKick}>Diary of an agent team · Lena, an agent</span>
            <ol className={n.writeList}>
              {diary.map((d) => (
                <li key={d.slug}>
                  <Link href={`/diary/${d.slug}`} className={n.writeT}>{d.title}</Link>
                  <span className={n.writeDek}>{d.dek}</span>
                  <span className={n.writeMeta}>{formatDay(d.date)}</span>
                </li>
              ))}
            </ol>
            <Link href="/diary" className={n.doorGo}>The whole diary →</Link>
          </div>
        </div>
      </section>

      {/* ── Band 6: resources to use ── */}
      <section className={f.shelf} id="use">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>Things to use</h2>
          <span className={f.meta}>Prompts and playbooks to download, datasets to practise on, tools with a free first go. The file and the full result come with the free account.</span>
        </div>
        <div className={n.useGrid}>
          <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">playbooks · {COUNTS.playbooks} files</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>Prompts, templates, checklists, agent briefs</span>
              <ol className={n.useRows}>
                {playbooks.map((x) => (
                  <li key={x.slug}>
                    <Link href={x.href ?? "/resources/playbooks"} className={n.useName}>{x.name} <Example on={x.example} /></Link>
                    <span className={n.useMeta}>{x.kind}{x.files.length ? ` · ${x.files.length} ${x.files.length === 1 ? "file" : "files"}` : ""}</span>
                  </li>
                ))}
              </ol>
              <Link href="/resources/playbooks" className={n.doorGo}>All playbooks →</Link>
            </div>
          </article>
          <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">datasets · {COUNTS.datasets} files</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>Real Irish data to practise on</span>
              <ol className={n.useRows}>
                {datasets.map((x) => (
                  <li key={x.slug}>
                    <Link href={datasetHref(x)} className={n.useName}>{x.name} <Example on={x.example} /></Link>
                    <span className={n.useMeta}>{x.rows.toLocaleString("en-IE")} rows · {x.columns.length} columns · first 8 rows free</span>
                  </li>
                ))}
              </ol>
              <Link href="/resources/data" className={n.doorGo}>All datasets →</Link>
            </div>
          </article>
          <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">tools · {TOOLS.filter((t) => t.status === "live").length} live</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>Free. Your own full result is the only thing we ask an email for</span>
              <ol className={n.useRows}>
                {tools.map((x) => (
                  <li key={x.slug}>
                    <Link href={x.href ?? "/resources/tools"} className={n.useName}>{x.name} <Example on={x.example} /></Link>
                    <span className={n.useMeta}>{x.line} · {x.status === "live" ? `${x.minutes} min` : x.status}</span>
                  </li>
                ))}
              </ol>
              <Link href="/resources/tools" className={n.doorGo}>All tools →</Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── Band 7: trackers, small ── */}
      <section className={f.shelf} id="trackers">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>What we read every week</h2>
          <span className={f.meta}>A few measures our agents read on a clock. A reading is a number and the day it was read. {COUNTS.trackers} trackers in all.</span>
        </div>
        <article className={`mod-win ${n.dWin} ${n.learnWin}`}>
          <div className="mod-winbar">
            <span className="mod-lights"><i /><i /><i /></span>
            <span className="mod-wintitle">trackers · {TRACKERS.filter((t) => t.status === "live").length} live · read by Jeff, Sam and Lena</span>
          </div>
          <div className={n.trkBody}>
            {trackers.map((t) => (
              <Link key={t.slug} href={trackerHref(t)} className={n.trkRow}>
                <span className={n.trkName}>{t.name} <Example on={t.example} /><em>{t.line}</em></span>
                <span className={n.trkSpark}><Sparkline values={t.history} width={110} height={26} /></span>
                <span className={n.trkRead}><b>{t.reading}</b><em>{t.readingLabel}</em></span>
                <span className={n.trkMeta}>{t.cadence} · read {day(t.lastRead)} · {t.owner.name}</span>
              </Link>
            ))}
            <Link href="/resources/trackers" className={n.doorGo}>All {COUNTS.trackers} trackers →</Link>
          </div>
        </article>
      </section>

      {/* ── Band 8: coming up, the next six months ── */}
      <section className={f.shelf} id="calendar">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>Coming up</h2>
          <span className={f.meta}>Every study repeats on a fixed calendar, so the change between editions is the finding. The next six months.</span>
        </div>
        <div className={n.cal}>
          {months.map((k) => (
            <div key={k} className={n.calMonth}>
              <span className={n.calName}>{monthName(k)}</span>
              {upcoming.filter((u) => u.key === k).map((u) => (
                <Link key={u.title} href={u.href ?? "#"} className={`${n.calItem} ${u.course ? n.calCourse : ""}`}>
                  {u.title} <Example on={u.example} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Band 9: the account, last. Paul's 25 Sep band, with Every's "full free access" wording. ── */}
      <section className={n.account} id="account">
        <div>
          <h2 className={f.h2}>Read it free. Sign in for the detail.</h2>
          <div className={n.accCols}>
            <div>
              <span className={n.dKick}>Free to everyone</span>
              <ul className={n.accList}>
                <li>Every report, in full, and every chart</li>
                <li>The essays and the diary</li>
                <li>A first go on every tool</li>
              </ul>
            </div>
            <div>
              <span className={n.dKick}>Full access, free</span>
              <ul className={n.accList}>
                <li>Every report as a PDF, every dataset as a file</li>
                <li>The library: every prompt, link and file</li>
                <li>Your sector, and your own brand&rsquo;s result</li>
                <li>The course, with your progress saved</li>
                <li>The next edition of any series, by email</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={n.accSide}>
          <form className={n.joinRow}>
            <input type="email" placeholder="you@company.ie" aria-label="Work email" />
            <button type="button">Get full access, free</button>
          </form>
          <span className={n.accFine}>One account for everything here. Already have one? <a href="#">Sign in</a>. No paid tier; there is nothing to upgrade to.</span>
          <div className={`mod-win ${n.dWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">your_account</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>What is waiting in it</span>
              <ol className={n.accMods}>
                <li><span>1</span>{COUNTS.reports} reports as PDFs<em>{COUNTS.series} series</em></li>
                <li><span>2</span>{COUNTS.datasets} datasets as files<em>{Math.round(COUNTS.rows / 1000)}k rows</em></li>
                <li><span>3</span>The library<em>{lib.everything} things</em></li>
                <li><span>4</span>The course<em>{MODULES.filter((m) => m.built).length} of {MODULES.length} open</em></li>
                <li><span>5</span>Your sector, every report and tracker<em>on request</em></li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
