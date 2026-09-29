import Link from "next/link";
import Cover, { COVER_PHOTOS, seriesShelf } from "./Cover";
import { INTRO as ASK_INTRO } from "../resources/the-ai-ask/2026-q3/copy";
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
import AccessForm from "../resources/kit/AccessForm";
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

/* The opening of the big cover's latest edition, in the report's own words (Paul, 27 Sep). Add a
   series here when it becomes the big cover; without an entry the column shows title and line only. */
const SHOW_FEATURED = false;
const SHOW_TABLE = false;
const SHOW_WRITING = false;
const SHOW_USE = false;
const SHOW_CALENDAR = false;
/* Trackers, hidden on launch day (29 Sep 2026): one real tracker is a list of one. Back when there are three. */
const SHOW_TRACKERS = false;

const FLAG_EXCERPT: Record<string, string[]> = {
  /* The AI Ask: Sam's own opening, read from the report's copy so it can never drift from the page. */
  "the-ai-ask": ASK_INTRO.slice(0, 2),
  "geo-ireland": [
    "We put the questions people in Ireland ask to Claude, ChatGPT, Perplexity and Google\u2019s AI Overviews, in 41 categories from tax to hotels, and counted which names came back and how often.",
    "In 17 of 41 categories the most-named name is a state body or a regulator. Some of those are natural, like Revenue for tax. The striking ones are markets where advertisers spend and the regulator still wins. The Health Insurance Authority, at 0.61, beats every insurer. The Charities Regulator is named more than four times as often as any charity.",
    "Reddit is cited 1,313 times, ahead of citizensinformation.ie and the HSE. gov.uk is cited 176 times on Irish questions. What forums say about a brand is now part of how it is found.",
  ],
};

/* An outside link in the band copy: opens in a new tab, keeps the page's link colour. */
function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" className={n.tellLink}>{children}</a>;
}

export default function ResearchBands({ part }: { part?: "reports" | "rest" } = {}) {
  const featured = reportBySlug("the-ai-ask-2026-q3")!;
  const featSeries = seriesOf(featured);
  const featFig = featured.figures[1] ?? featured.figures[0];

  /* The covers: the shelf (Cover.tsx), minus the featured series, which is drawn big above. */
  const newest = (slug: string) => editionsOf(SERIES.find((se) => se.slug === slug)!).filter((r) => r.status !== "coming")[0];
  /* Band 1 is hidden, so the featured series stays on the shelf: with one real series (29 Sep) it
     is the shelf. Taking it out here would leave nothing to draw. */
  const shelf = SHOW_FEATURED ? seriesShelf().filter((e) => e.se.slug !== featSeries.slug) : seriesShelf();
  const plural = (k: number, w: string, ws = `${w}s`) => `${k} ${k === 1 ? w : ws}`;
  const [flagE, ...restE] = shelf;
  const flag = flagE.se;
  const flagEd = newest(flag.slug);

  /* The reading list: every report, dated, newest first. Search and filter live inside it. */
  const pubs: Pub[] = PUBLISHED.map<Pub>((r) => ({
    date: r.date, day: day(r.date), type: "Report", title: r.title, href: reportHref(r),
    author: r.author.name, sector: r.sectors[0] ?? AREA_LABEL[r.area], example: r.example,
  })).sort((a, b) => b.date.localeCompare(a.date));

  const lib = librarySummary();
  /* the tools count in the band copy reads off the shelf, so it never rots (Paul, 27 Sep: "wire it") */
  const toolsN = lib.ledger.find((x) => x.l.toLowerCase() === "tools")?.n ?? 0;
  const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];
  const toolCount = toolsN <= 20 ? WORDS[toolsN] : String(toolsN);
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

  /* Band 2 stands alone because Paul moved it up the page (27 Sep: "let's move the reports up to just
     under my first section"). page.tsx renders part="reports" under the essay and part="rest" for the
     other bands; with no part the whole set renders in its old order. */
  const reportsBand = (
    <section className={f.shelf} id="reports">
      <div className={f.shelfHead}>
        <h2 className={f.h2}>Reports and papers</h2>
        <span className={f.meta}>
          {plural(COUNTS.series, "study", "studies")} on a fixed calendar, {plural(COUNTS.reports, "edition")}. Free to read with no form; every PDF with a free account.
        </span>
      </div>
      <div className={n.studies}>
        <Link href={flagEd && editionsOf(flag).filter((r) => r.status !== "coming").length === 1 && !flag.example ? reportHref(flagEd) : seriesHref(flag)} className={n.flag}>
          <Cover no={flagE.no} cadence={CADENCE_SHORT[flag.cadence] ?? flag.cadence} title={flag.name} cover={flagE.cover} fox={flagE.fox} photo={COVER_PHOTOS[flag.slug]} />
          <div>
            <span className={f.meta}>
              {flagEd ? `Latest edition ${flagEd.edition} · ${day(flagEd.date)}` : flag.cadence} <Example on={flag.example} />
            </span>
            <span className={n.flagTitle}>{flag.name}</span>
            <p className={n.flagLine}>{flag.line}</p>
            {/* Paul, 27 Sep: "This space should have some of the report in it. Similar format to my
                one above. So we give readers a sense of it." The byline and the report's own opening,
                word for word, as the essay band does. */}
            {flagEd && (
              <div className={n.flagBy}>
                <i className={n.flagMark}>{flagEd.author.name.slice(0, 1)}</i>
                <span>
                  By <b>{flagEd.author.name}</b>
                  {flagEd.checkedBy ? <>, checked by <b>{flagEd.checkedBy}</b></> : null}
                </span>
              </div>
            )}
            {FLAG_EXCERPT[flag.slug] && (
              <div className={n.flagBody}>
                {FLAG_EXCERPT[flag.slug].map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            )}
            <span className={n.doorGo}>Read the latest edition →</span>
          </div>
        </Link>
        <div className={`${n.covers} ${n.coversWide}`}>
          {restE.map(({ se, no, cover, fox }) => {
            const ed = newest(se.slug);
            return (
              <Link key={se.slug} href={editionsOf(se).filter((r) => r.status !== "coming").length === 1 && !se.example ? reportHref(newest(se.slug)!) : seriesHref(se)} className={n.coverCard}>
                <Cover no={no} cadence={CADENCE_SHORT[se.cadence] ?? se.cadence} title={se.name} cover={cover} fox={fox} photo={COVER_PHOTOS[se.slug]} />
                {/* Paul, 27 Sep: "too much copy squeezed to the report covers". One line, the same
                    height on every card: the edition count and the example tag. The latest date
                    lives on the series page. */}
                <span className={`${f.meta} ${n.coverMeta}`}>
                  {ed ? plural(editionsOf(se).filter((r) => r.status !== "coming").length, "edition") : `First edition ${se.cadence}`} <Example on={se.example} />
                </span>
                <p className={n.coverLine}>{se.line}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Paul, 27 Sep, on the every_report table: it comes off the homepage. The full list, with
          search and the filters, lives on /resources/reports; one line points there. SHOW_TABLE brings
          the window back. */}
      {SHOW_TABLE && (
        <article className={`mod-win ${n.rbList}`}>
          <div className="mod-winbar">
            <span className="mod-lights"><i /><i /><i /></span>
            <span className="mod-wintitle">every_report · {PUBLISHED.length} editions · newest first</span>
          </div>
          <div className={n.rbListBody}>
            <Publications rows={pubs} />
          </div>
        </article>
      )}
      <Link href="/resources/reports" className={`${n.doorGo} ${n.rbAll}`}>Every edition, dated, newest first →</Link>
    </section>
  );
  if (part === "reports") return reportsBand;

  return (
    <>
      {/* ── Band 1: the featured report, drawn big. HIDDEN (Paul, 27 Sep): "I like these insights
           and format of them, although may be a bit big. But think this section is not needed. Is
           overlap." The three-number row under the figure is the format the insights should take
           when they get a home. SHOW_FEATURED brings it back. ── */}
      {SHOW_FEATURED && (
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

        </>
      )}

      {part === undefined && reportsBand}

      {/* ── Band 4: the library, its own door. Paul, 26 Sep: "I want people to want to go to
           library even if they don't want training. Library requires email too." ── */}
      <section className={f.shelf} id="library">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          <h2 className={f.h2}>The library</h2>
          <span className={f.meta}>Prompts, datasets, tools, templates and files. Free with an account, course or no course.</span>
        </div>
        {/* Paul, 27 Sep: the essay's shape, "section of left side explain what is the library... And the
            scroller on the right", and "we need to talk up the library... I want people to be motivated
            to get stuff (datasets, tools, prompts etc) even if they don't want to do the course." */}
        <div className={n.tellGrid}>
          <div className={n.tellCol}>
            {/* Paul, 27 Sep: "explain what is in it... name a few tools and link to them, as well as
                articles and people and link to them, so they get a feel for it. So they want it all
                and subscribe, and we'll let them know when we've added new ones we think they'd like."
                Every name and link below is a real entry in the shelf (src/app/course/shelf.ts). */}
            <p className={n.tellStand}>
              This is where we keep the things we use, and we add to it every week.
            </p>
            <div className={n.tellBody}>
              <p>
                The tools. <Ext href="https://clay.com">Clay</Ext>, which finds data on companies and people.{" "}
                <Ext href="https://apify.com">Apify</Ext>, which collects data from websites.{" "}
                <Ext href="https://playwright.dev">Playwright</Ext>, which lets Claude open a web page and click
                through it for you. {toolCount} of
                them, with a line on what each one is for.
              </p>
              <p>
                The people we read, like <Ext href="https://www.oneusefulthing.org">Ethan Mollick</Ext> and{" "}
                <Ext href="https://x.com/danshipper">Dan Shipper</Ext>. The companies we watch for how they build,
                like <Ext href="https://ramp.com">Ramp</Ext>, <Ext href="https://every.to">Every</Ext> and{" "}
                <Ext href="https://anthropic.com">Anthropic</Ext>. The articles and videos we send each other, like{" "}
                <Ext href="https://x.com/mattshumer_/status/2081054356405731740">the game Claude built in one go</Ext>.
              </p>
              <p>
                And datasets to practise on, with real Irish numbers: the AI Ask&rsquo;s
                job ads, and more as each report lands. Plus every prompt from the course, written out in full.
              </p>
              <p>
                Register and it is all yours. When we add something we think you would like, we will let you know.
              </p>
            </div>
            <ul className={n.tellLedger}>
              {lib.ledger.slice(0, 6).map((x) => (
                <li key={x.l}><b>{x.n}</b> {x.l}</li>
              ))}
            </ul>
            <AccessForm want="library" label="Open the library, free" className={`${n.joinRow} ${n.learnJoin} ${n.libJoin}`} doneClassName={n.accFine} done="You're in. The library is open to you, and we'll tell you when we add something you'd like." />
            <span className={n.accFine}>One free account for the library, every PDF, every dataset and the course. Already have one? <Link href="/resources/library">Sign in</Link>.</span>
          </div>
          <article className={`mod-win ${n.dWin} ${n.scrollWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">the library · {lib.everything} things · {lib.built} of {lib.perModule.length} modules open</span>
            </div>
            <video className={n.scrollFilm} autoPlay muted loop playsInline preload="metadata" poster="/resources/scroll/library-scroll-poster.jpg" src="/resources/scroll/library-scroll.mp4" aria-label="The library page, scrolled top to bottom" />
          </article>
        </div>
      </section>

      {/* ── Band 3: the course ── */}
      <section className={f.shelf} id="course">
        <div className={`${f.shelfHead} ${n.learnHead}`}>
          {/* Paul, 27 Sep: "we want to name it properly. Free Course: AI Fluency for Ambitious Marketers" */}
          <h2 className={f.h2}>Free course: AI Fluency for Ambitious Marketers</h2>
          <span className={f.meta}>Six modules, one a fortnight. Module 1 is open now.</span>
        </div>
        {/* Paul, 27 Sep: the essay's shape here too, the course's own words on the left ("the course copy
            here is fine"), the module 2 scroller on the right, "as you see video of me up front". */}
        <div className={n.tellGrid}>
          <div className={n.tellCol}>
            <p className={n.tellStand}>
              A free, practical, non&#8209;hype AI fluency course for ambitious marketers. Six modules, one a fortnight, from Monday 21 September 2026.
            </p>
            <div className={n.tellBody}>
              <p>Each module is a lesson you read once. What it hands you, the prompts, the links and the files, goes into the library, so you never have to go back through a lesson to find the thing you half remember.</p>
            </div>
            <ol className={`${n.accMods} ${n.courseMods}`}>
              {MODULES.map((m) => (
                <li key={m.n} className={m.built ? n.accModOn : ""}>
                  <span>{m.n}</span>
                  {m.title.replace(/^\(\d\)\s*/, "")}
                  <em>{m.built ? <Link href={`/course/${m.n}`}>Open</Link> : m.when}</em>
                </li>
              ))}
            </ol>
            <AccessForm want="course" label="Start module 1, free" className={`${n.joinRow} ${n.learnJoin}`} doneClassName={n.accFine} done="You're in. Module 1 is open to you now, and the rest arrive by email as they open." />
            <span className={n.accFine}>{nextModule ? `Module ${nextModule.n} opens ${nextModule.when}. ` : ""}Same free account as everything else here. <Link href="/course">About the course</Link>.</span>
          </div>
          <article className={`mod-win ${n.dWin} ${n.scrollWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">module 2 · Slow, then fast · opens Mon 5 Oct</span>
            </div>
            <video className={n.scrollFilm} autoPlay muted loop playsInline preload="metadata" poster="/resources/scroll/course-module-2-scroll-poster.jpg" src="/resources/scroll/course-module-2-scroll.mp4" aria-label="Module 2 of the course, scrolled top to bottom" />
          </article>
        </div>
      </section>

      {/* Band 5, essays and the diary: HIDDEN (Paul, 27 Sep: "I think there are overlap and don't need
           them here. Hide them for now."). The latest essay and the what's new list sit under the hero. */}
      {SHOW_WRITING && (
        <>
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

        </>
      )}

      {/* Band 6, things to use: HIDDEN (Paul, 27 Sep, same note). The library band carries the
           playbooks, datasets and tools story now. */}
      {SHOW_USE && (
        <>
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

        </>
      )}

      {/* ── Band 7: trackers, small ── */}
      {SHOW_TRACKERS && (
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
      )}

      {/* Band 8, coming up: HIDDEN (Paul, 27 Sep: "let's remove this for now? So we can review properly"). */}
      {SHOW_CALENDAR && (
        <>
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

        </>
      )}

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
          <AccessForm want="account" className={n.joinRow} doneClassName={n.accFine} done="You're in. Every report, the library and the course are open to you." />
          <span className={n.accFine}>One account for everything here. Already have one? <a href="/signin">Sign in</a>. No paid tier; there is nothing to upgrade to.</span>
          <div className={`mod-win ${n.dWin}`}>
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">your_account</span>
            </div>
            <div className={n.winBody}>
              <span className={n.dKick}>What is waiting in it</span>
              <ol className={n.accMods}>
                <li><span>1</span>{COUNTS.reports === 1 ? "The report as a PDF" : `${COUNTS.reports} reports as PDFs`}<em>{plural(COUNTS.series, "series", "series")}</em></li>
                <li><span>2</span>{COUNTS.datasets === 1 ? "The dataset as a file" : `${COUNTS.datasets} datasets as files`}<em>{COUNTS.rows >= 1000 ? `${Math.round(COUNTS.rows / 1000)}k rows` : `${COUNTS.rows} rows`}</em></li>
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
