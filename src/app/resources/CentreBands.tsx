import Link from "next/link";
import Publications, { type Pub } from "./Publications";
import { getLibrary, formatDay } from "./library";
import { MODULES, isLive } from "../course/courseModules";
import { MODULES_BY_N } from "../course/moduleData";
import { SHELF } from "../course/shelf";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import {
  CATALOGUE, SERIES, PUBLISHED, COMING, TRACKERS, DATASETS, TOOLS, PLAYBOOKS, COUNTS,
  AREA_LABEL, seriesOf, editionsOf, reportBySlug, reportHref, trackerHref, datasetHref, seriesHref, day,
  type Report, type Tracker, type Author,
} from "./catalogue";
import { Chart, FigureWindow, Gate, DownloadPdf, Sparkline, Example } from "./kit";
import s from "./hub.module.css";

/**
 * THE BANDS OF THE RESOURCE CENTRE, one component, drawn on two pages: /home-next (the homepage,
 * under everything Paul settled on 25 Sep) and /resources (the same bands under a short head).
 * Paul, 25 Sep: "the Resource hub becomes the homepage"; and 26 Sep, on finding them built apart:
 * "Why aren't you using some of the work we did from last night?" So one component, never two copies.
 *
 * /resources, THE HUB. 26 Sep 2026. Paul: "the best place for AI and marketing in Ireland...
 * as professional as Anthropic does for its research and resources", "a very expert authority-led
 * consultancy", "a pretty busy, active website", "think big... lots of trackers and lots of reports".
 *
 * The page is an INDEX of the whole centre, read off the catalogue and the course's own sources,
 * so it fills itself as things are added and nothing here knows how many of anything there are.
 * Its shape, top to bottom (each band's craft line sits on the band):
 * the film and the research card · the ruler · one featured piece drawn big · the series rail and
 * the publications table · the trackers board · datasets · tools beside playbooks · the library as
 * a shelf · who writes here · coming up · how we publish, and the gate.
 *
 * ⛔ MOCKUP. Anything tagged Example is made up by the generator. Every form posts nowhere.
 */

const CADENCE_MONTHS: Record<string, number> = { Daily: 0, Weekly: 0, Monthly: 1, Quarterly: 3, "Twice a year": 6, Yearly: 12 };

function addMonths(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}
const monthKey = (iso: string) => iso.slice(0, 7);
/** "Q4 2026", "H1 2027", "2027": the next edition's label, in the series' own naming. */
function nextEditionLabel(cadence: string, iso: string) {
  const y = iso.slice(0, 4), m = Number(iso.slice(5, 7));
  if (cadence === "Quarterly") return `Q${Math.ceil(m / 3)} ${y}`;
  if (cadence === "Twice a year") return `H${m <= 6 ? 1 : 2} ${y}`;
  if (cadence === "Yearly") return y;
  return `${new Date(iso + "T12:00:00Z").toLocaleDateString("en-IE", { month: "short", timeZone: "UTC" })} ${y}`;
}
const rowsShort = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

/** The library of everything, counted off the course's own files. No second copy of any list. */
function libraryCounts() {
  let lessons = 0, prompts = 0, links = 0, files = 0;
  MODULES.forEach((m) => {
    const def = MODULES_BY_N[m.n];
    if (!def) return;
    if (isLive(m)) {
      def.items.forEach((it) => {
        if (it.placeholder) return;
        lessons += 1;
        if (it.prompt) prompts += 1;
        prompts += Object.keys(it.inlinePrompts ?? {}).length;
        links += (it.links?.length ?? 0) + (it.reading?.length ?? 0);
      });
    }
    def.files?.forEach((set) => (files += set.files.length));
  });
  const shelf = SHELF.map((sec) => ({ slug: sec.slug, title: sec.title, n: sec.entries.length })).filter((x) => x.n > 0);
  const shelfTotal = shelf.reduce((a, x) => a + x.n, 0);
  const sections = [
    { slug: "lessons", title: "From the lessons", n: lessons },
    { slug: "files", title: "Files from the modules", n: files },
    ...shelf,
  ].filter((x) => x.n > 0);
  return { lessons, prompts, links, files, shelf, shelfTotal, sections, total: lessons + files + shelfTotal };
}

/* The shelf's inks: five blues from the page's own palette, cycled. Never grey, never orange. */
const SHELF_INK = ["#1A3A4E", "#3A7CA5", "#6CAAC8", "#2B5E80", "#B9D3E2"];

const AUTHOR_MARK = (a: Author) => (a.kind === "person" ? a.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() : a.name[0]);

export default function CentreBands() {
  const library = getLibrary().filter((e) => !e.soon);
  const essays = getAllEssays();
  const diary = getAllDispatches();
  const lib = libraryCounts();
  const featured = reportBySlug("the-ai-ask-2026-q3")!;
  const featSeries = seriesOf(featured);
  const featFig = featured.figures[1] ?? featured.figures[0];

  /* ── Publications: every dated piece, one table ── */
  const pubs: Pub[] = [
    ...PUBLISHED.map<Pub>((r) => ({ date: r.date, day: day(r.date), type: "Report", title: r.title, href: reportHref(r), author: r.author.name, sector: r.sectors[0] ?? AREA_LABEL[r.area], example: r.example })),
    ...TRACKERS.filter((t) => t.status !== "planned").map<Pub>((t) => ({ date: t.lastRead, day: day(t.lastRead), type: "Tracker", title: `${t.name}: ${t.reading} ${t.readingLabel}`, href: trackerHref(t), author: t.owner.name, sector: t.sectors[0] ?? AREA_LABEL[t.area], example: t.example })),
    ...DATASETS.map<Pub>((d) => ({ date: d.updated, day: day(d.updated), type: "Dataset", title: `${d.name}, ${d.rows.toLocaleString("en-IE")} rows`, href: datasetHref(d), author: d.owner.name, sector: d.sectors[0] ?? AREA_LABEL[d.area], example: d.example })),
    ...essays.map<Pub>((e) => ({ date: e.date, day: formatDay(e.date), type: "Essay", title: e.title, href: `/essays/${e.slug}`, author: "Paul Dervan", sector: AREA_LABEL[(library.find((l) => l.href === `/essays/${e.slug}`)?.area as keyof typeof AREA_LABEL) ?? "work"] ?? "Skills and work", example: false })),
    ...diary.map<Pub>((d) => ({ date: d.date, day: formatDay(d.date), type: "Diary", title: d.title, href: `/diary/${d.slug}`, author: "Lena", sector: "Agents", example: false })),
    ...library.filter((e) => e.type === "Answer" || e.type === "Category").map<Pub>((e) => ({ date: e.date, day: formatDay(e.date), type: "Answer", title: e.title, href: e.href, author: "Paul Dervan", sector: e.area === "search" ? "AI search" : e.area === "agents" ? "Agents" : "Skills and work", example: false })),
    ...MODULES.filter((m) => isLive(m)).map<Pub>((m) => ({ date: m.on, day: formatDay(m.on), type: "Module", title: `Module ${m.n}: ${m.title.replace(/^\(\d+\)\s*/, "")}`, href: `/course/${m.n}`, author: "Paul Dervan", sector: "The course", example: false })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  /* ── Trackers: live first, then testing, then planned; newest read first inside each ── */
  const order: Record<Tracker["status"], number> = { live: 0, testing: 1, planned: 2 };
  const trackers = [...TRACKERS].sort((a, b) => order[a.status] - order[b.status] || b.lastRead.localeCompare(a.lastRead));

  /* ── Datasets: biggest first, the real ones kept at the top ── */
  const datasets = [...DATASETS].sort((a, b) => Number(a.example) - Number(b.example) || b.rows - a.rows);
  const maxRowsLog = Math.log10(Math.max(...DATASETS.map((d) => d.rows)));

  /* ── Who writes here: every author in the catalogue, counted ── */
  const writers = CATALOGUE.authors.map((a) => {
    const reports = PUBLISHED.filter((r) => r.author.name === a.name);
    const owned = TRACKERS.filter((t) => t.owner.name === a.name).length + DATASETS.filter((d) => d.owner.name === a.name).length;
    const checked = PUBLISHED.filter((r) => r.checkedBy?.includes(a.name)).length;
    const own = a.name === "Paul Dervan" ? essays.length : a.name === "Lena" ? diary.length : 0;
    const latest =
      a.name === "Paul Dervan" && essays[0] ? { title: essays[0].title, href: `/essays/${essays[0].slug}`, day: formatDay(essays[0].date), example: false }
      : a.name === "Lena" && diary[0] ? { title: diary[0].title, href: `/diary/${diary[0].slug}`, day: formatDay(diary[0].date), example: false }
      : reports[0] ? { title: reports[0].title, href: reportHref(reports[0]), day: day(reports[0].date), example: reports[0].example }
      : null;
    const parts = [
      own ? `${own} ${a.name === "Lena" ? "diary entries" : "essays"}` : "",
      reports.length ? `${reports.length} reports` : "",
      owned ? `${owned} trackers and datasets` : "",
      checked ? `${checked} reports checked` : "",
    ].filter(Boolean);
    return { a, latest, parts };
  });

  /* ── Coming up: the next six months, from what is announced, what repeats, and the course ── */
  const today = CATALOGUE.built.slice(0, 10);
  const months: string[] = [];
  for (let i = 0; i < 6; i++) months.push(monthKey(addMonths(today.slice(0, 7) + "-01", i + 1)));
  type Up = { key: string; mark: string; title: string; sub: string; href?: string; example: boolean; course?: boolean };
  const upcoming: Up[] = [
    ...COMING.map<Up>((r) => ({ key: monthKey(r.date), mark: seriesOf(r).mark, title: `${seriesOf(r).name}, ${r.edition}`, sub: `${seriesOf(r).cadence} · ${day(r.date)}`, href: seriesHref(seriesOf(r)), example: r.example })),
    ...SERIES.filter((se) => se.example).flatMap<Up>((se) => {
      const step = CADENCE_MONTHS[se.cadence];
      const last = editionsOf(se).filter((r) => r.status !== "coming")[0];
      if (!step || !last) return [];
      const next = addMonths(last.date, step);
      return months.includes(monthKey(next)) ? [{ key: monthKey(next), mark: se.mark, title: `${se.name}, ${nextEditionLabel(se.cadence, next)}`, sub: `${se.cadence} · due ${day(next)}`, href: seriesHref(se), example: true }] : [];
    }),
    ...MODULES.filter((m) => !isLive(m)).map<Up>((m) => ({ key: monthKey(m.on), mark: `M${m.n}`, title: `Course module ${m.n}: ${m.title.replace(/^\(\d+\)\s*/, "")}`, sub: m.when, href: `/course#m${m.n}`, example: false, course: true })),
  ];
  const monthName = (k: string) => new Date(k + "-01T12:00:00Z").toLocaleDateString("en-IE", { month: "short", year: "numeric", timeZone: "UTC" });

  const adds = [
    "Every report as a PDF, and every dataset as a CSV",
    "Your sector, filtered out of every tracker and report",
    "A note when a tracker you follow moves",
    "The next issue of any series, by email, the day it lands",
    "The course, every module as it opens",
  ];

  return (
    <div className={s.wrap}>
        {/* ── The ruler: the centre in one line of numbers, and the page's contents. Each figure is an
             anchor into its band. Drawn as a scale (a hairline under, an orange tick on hover)
             rather than a list, so the size of the place is the first thing read. ── */}
        <nav className={s.ruler} aria-label="What is here">
          <a className={s.rule} href="#reports"><span className={s.ruleN}>{COUNTS.reports}</span><span className={s.ruleL}>Reports</span><span className={s.ruleS}>{COUNTS.series} series on a calendar</span></a>
          <a className={s.rule} href="#trackers"><span className={s.ruleN}>{COUNTS.trackers}</span><span className={s.ruleL}>Trackers</span><span className={s.ruleS}>read by our agents, weekly or daily</span></a>
          <a className={s.rule} href="#data"><span className={s.ruleN}>{COUNTS.datasets}<em>{rowsShort(COUNTS.rows)} rows</em></span><span className={s.ruleL}>Datasets</span><span className={s.ruleS}>first rows free, the file for an email</span></a>
          <a className={s.rule} href="#tools"><span className={s.ruleN}>{COUNTS.tools}</span><span className={s.ruleL}>Tools</span><span className={s.ruleS}>a free first look, every one</span></a>
          <a className={s.rule} href="#playbooks"><span className={s.ruleN}>{COUNTS.playbooks}</span><span className={s.ruleL}>Playbooks</span><span className={s.ruleS}>prompts, templates, agent briefs</span></a>
          <a className={s.rule} href="#library"><span className={s.ruleN}>{lib.total}</span><span className={s.ruleL}>In the library</span><span className={s.ruleS}>{lib.prompts} prompts, {lib.links} links, {lib.files} files</span></a>
          <a className={s.rule} href="#writers"><span className={s.ruleN}>{essays.length + diary.length}</span><span className={s.ruleL}>Essays and diary</span><span className={s.ruleS}>{essays.length} essays, {diary.length} diary entries</span></a>
        </nav>

        {/* ── Featured: one piece drawn big. The figure breaks out of the reading measure, the way a
             figure in an Anthropic post does; the three findings stand beside it as numerals, the
             way The AI Ask's own at-a-glance card does. Real numbers, from the report's own file. ── */}
        <section className={s.feat} aria-label="Featured">
          <div>
            <FigureWindow id="feat-fig" n={featFig.id.replace("f", "")} title={featFig.title} caption={`${featFig.caption} Source: ${featSeries.name}, ${featured.edition}.`} tools={<span>{featured.sample}</span>}>
              <Chart data={featFig.data} />
            </FigureWindow>
            <div className={s.featBig}>
              {featured.findings.slice(0, 3).map((f) => (
                <div key={f.label}>
                  <b>{f.big}</b>
                  <span>{f.label}</span>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={s.featKick}>
              {featSeries.name} · {featured.edition} <b>{featured.status === "draft" ? "Draft, not approved" : "Published"} · {day(featured.date)}</b>
            </p>
            <h2 className={s.featTitle}>
              <Link href={reportHref(featured)}>{featured.title}</Link>
            </h2>
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
        </section>

        {/* ── Publications: the series rail (every recurring study as a stamp: mark, cadence,
             editions), then Anthropic's plain table with our two extra columns. ── */}
        <section className={s.band} id="reports">
          <div className={s.bandHead}>
            <h2 className={s.h2}>Reports and papers</h2>
            <span className={s.meta}>{COUNTS.series} series · {COUNTS.reports} editions · first edition {day([...PUBLISHED].sort((a, b) => a.date.localeCompare(b.date))[0].date)}</span>
            <p className={s.bandLine}>Every study repeats on a fixed calendar, with the same method each time, so the change between editions is the finding.</p>
          </div>
          <div className={s.seriesRail}>
            {SERIES.map((se) => {
              const eds = editionsOf(se).filter((r) => r.status !== "coming");
              return (
                <Link key={se.slug} href={seriesHref(se)} className={`${s.stamp} ${se.example ? s.ex : ""}`}>
                  <span className={s.stampMark}>{se.mark}</span>
                  <span>
                    <span className={s.stampName}>{se.name}<Example on={se.example} /></span>
                    <span className={s.stampMeta}>{se.cadence} · {eds.length} {eds.length === 1 ? "edition" : "editions"} · {se.lead.name}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <Publications rows={pubs} />
        </section>

        {/* ── The trackers board. Status lamp, name, sparkline, reading, move, cadence, owner. ── */}
        <section className={s.band} id="trackers">
          <div className={s.bandHead}>
            <h2 className={s.h2}>Trackers</h2>
            <span className={s.meta}>{trackers.filter((t) => t.status === "live").length} live · {trackers.filter((t) => t.status === "testing").length} testing · {trackers.filter((t) => t.status === "planned").length} planned</span>
            <p className={s.bandLine}>Read by our agents on a fixed rhythm. A big move waits for the next read to confirm it before it is called a change.</p>
          </div>
          <div className={s.board}>
            <div className={s.boardHead} aria-hidden>
              <span />
              <span>Tracker</span>
              <span>History</span>
              <span>Reading</span>
              <span>Move</span>
              <span>Read</span>
              <span>By</span>
            </div>
            {trackers.map((t) => (
              <div key={t.slug} className={s.row}>
                <i className={`${s.lamp} ${t.status === "live" ? s.lampLive : t.status === "testing" ? s.lampTest : ""}`} title={t.status} />
                <div className={s.rowName}>
                  <Link href={trackerHref(t)}>{t.name}<Example on={t.example} /></Link>
                  <span>{t.line}</span>
                </div>
                <Sparkline values={t.history} width={120} height={30} color={t.status === "planned" ? "#B9D3E2" : "#3A7CA5"} label={`${t.name}, ${t.history.length} readings`} />
                <div className={s.reading}>
                  <b>{t.reading}</b>
                  <span>{t.readingLabel}</span>
                </div>
                <span className={`${s.delta} ${t.direction === "up" ? s.up : t.direction === "down" ? s.down : s.flat}`}>
                  {t.direction === "up" ? "▲ " : t.direction === "down" ? "▼ " : "= "}{t.delta}
                </span>
                <span className={s.cell}>{t.cadence}<br />{day(t.lastRead)}</span>
                <span className={s.cell}>{t.owner.name}<br />{t.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Datasets: a dense table, rows drawn as a log-scale bar so 26,886 and 41 share a column. ── */}
        <section className={s.band} id="data">
          <div className={s.bandHead}>
            <h2 className={s.h2}>Datasets</h2>
            <span className={s.meta}>{COUNTS.datasets} files · {COUNTS.rows.toLocaleString("en-IE")} rows</span>
            <p className={s.bandLine}>The rows behind the reports. The first eight of each are on the page; the whole file is one of the things a free account adds.</p>
          </div>
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Dataset</th>
                <th>Rows</th>
                <th>Columns</th>
                <th>Updated</th>
                <th>Cadence</th>
                <th>Size</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((d) => (
                <tr key={d.slug}>
                  <td className={s.dName}>
                    <Link href={datasetHref(d)}>{d.name}</Link><Example on={d.example} />
                    <span className={s.dLine}>{d.line}</span>
                  </td>
                  <td>
                    <span className={s.rowsCell}>
                      <b>{d.rows.toLocaleString("en-IE")}</b>
                      <span className={s.rowsBar}><i style={{ width: `${Math.max(4, (Math.log10(d.rows) / maxRowsLog) * 100)}%` }} /></span>
                    </span>
                  </td>
                  <td>{d.columns.length}</td>
                  <td>{day(d.updated)}</td>
                  <td>{d.cadence}</td>
                  <td>{d.size}</td>
                  <td>{d.owner.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Tools beside playbooks. Windows for software you open, files for things you take. ── */}
        <section className={`${s.band} ${s.twoUp}`} id="tools">
          <div>
            <div className={s.bandHead}>
              <h2 className={s.h2}>Tools</h2>
              <span className={s.meta}>{TOOLS.filter((t) => t.status === "live").length} live · {TOOLS.filter((t) => t.status === "beta").length} in beta</span>
              <p className={s.bandLine}>Free. The first look is on screen; your own full result is the only thing we ask an email for.</p>
            </div>
            <div className={s.tools}>
              {TOOLS.map((t) => {
                const inner = (
                  <>
                    <div className="mod-winbar">
                      <span className="mod-lights"><i /><i /><i /></span>
                      <span className="mod-wintitle">{t.slug.replace(/-/g, "_")}</span>
                    </div>
                    <div className={s.toolBody}>
                      <span className={s.toolName}>{t.name}<Example on={t.example} /></span>
                      <p>{t.line}</p>
                      <span className={s.toolFoot}>
                        <b>{t.status === "live" ? "Open →" : t.status === "beta" ? "Beta →" : "Coming"}</b>
                        <span>{t.minutes} min</span>
                      </span>
                    </div>
                  </>
                );
                const href = t.href ?? `/resources/tools#${t.slug}`;
                return t.status === "coming" ? (
                  <div key={t.slug} className={`mod-win ${s.tool} ${s.toolSoon}`}>{inner}</div>
                ) : (
                  <Link key={t.slug} href={href} className={`mod-win ${s.tool}`}>{inner}</Link>
                );
              })}
            </div>
          </div>
          <div id="playbooks">
            <div className={s.bandHead}>
              <h2 className={s.h2}>Playbooks</h2>
              <span className={s.meta}>{COUNTS.playbooks} files</span>
              <p className={s.bandLine}>The prompts, templates, checklists and agent briefs we use ourselves. The short version is on the page; the files come with an account.</p>
            </div>
            <div className={s.files}>
              {PLAYBOOKS.map((p) => (
                <Link key={p.slug} href={p.href ?? `/resources/playbooks#${p.slug}`} className={s.file}>
                  <svg viewBox="0 0 14 16" width="12" height="14" aria-hidden><path d="M1.5 1h7l4 4v10h-11z M8.5 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
                  <span>
                    <span className={s.fileName}>{p.name}<Example on={p.example} /></span>
                    <span className={s.fileKind}>{p.kind}{p.from ? ` · ${p.from}` : ""}</span>
                  </span>
                  <span className={s.fileN}>{p.files.length} {p.files.length === 1 ? "file" : "files"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── The library of everything, as a shelf. Each spine is a section, its width its count,
             read off the course's own sources. One link into the library page. ── */}
        <section className={s.libBand} id="library">
          <div className={s.libGrid}>
            <div>
              <h2 className={s.h2}>The Library</h2>
              <p className={s.bandLine}>Everything from the course that you can take with you: every prompt, every link, every file, and Paul&rsquo;s own lists of people, companies, articles and tools. Searched, copied, consulted a hundred times.</p>
              <div className={s.libNums}>
                <div><b>{lib.prompts}</b><span>Prompts</span></div>
                <div><b>{lib.links}</b><span>Links</span></div>
                <div><b>{lib.files}</b><span>Files</span></div>
                <div><b>{lib.lessons}</b><span>Lessons open</span></div>
                <div><b>{lib.shelfTotal}</b><span>On Paul&rsquo;s shelf</span></div>
                <div><b>{MODULES.filter((m) => isLive(m)).length} of {MODULES.length}</b><span>Modules live</span></div>
              </div>
              <ul className={s.libRules}>
                <li>The prompts and links are public. The teaching is not: his prose, the figures, the order and the reason stay in the course.</li>
                <li>Nothing here is a second copy. A module added to the course appears on the shelf the day it opens.</li>
              </ul>
              <p style={{ marginTop: 22 }}><Link href="/resources/library" className={s.link}>Open the Library →</Link></p>
            </div>
            <div>
              <div className={s.shelf} role="img" aria-label={lib.sections.map((x) => `${x.title}: ${x.n}`).join(", ")}>
                {lib.sections.map((x, i) => {
                  const max = Math.max(...lib.sections.map((y) => y.n));
                  return (
                    <Link key={x.slug} href={`/resources/library#${x.slug}`} className={s.spine} style={{ flex: x.n, height: `${40 + (x.n / max) * 60}%`, ["--c" as string]: SHELF_INK[i % SHELF_INK.length] }}>
                      <i />
                      <em>{x.n}</em>
                      {x.n >= 9 ? <span>{x.title}</span> : null}
                    </Link>
                  );
                })}
              </div>
              <div className={s.shelfKey}>
                {lib.sections.map((x, i) => (
                  <span key={x.slug} style={{ ["--c" as string]: SHELF_INK[i % SHELF_INK.length] }}><i />{x.title} {x.n}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Who writes here: every voice in the catalogue, each named for what it is. ── */}
        <section className={s.band} id="writers">
          <div className={s.bandHead}>
            <h2 className={s.h2}>Who writes here</h2>
            <span className={s.meta}>{writers.filter((w) => w.a.kind === "person").length} people and {writers.filter((w) => w.a.kind === "agent").length} agents, each named for what they are</span>
          </div>
          <div className={s.writers}>
            {writers.map(({ a, latest, parts }) => (
              <div key={a.name} className={s.writer}>
                <div className={s.byline}>
                  {a.name === "Paul Dervan" ? <img src="/Paul_photo.jpg" alt="" /> : <span className={`${s.mark} ${a.kind === "person" ? s.markPerson : ""}`}>{AUTHOR_MARK(a)}</span>}
                  <div className={s.who}>
                    <b>{a.name}</b>
                    <span>{a.role}</span>
                  </div>
                </div>
                {parts.length ? <span className={s.writerCount}>{parts.join(" · ")}</span> : null}
                {latest ? (
                  <div className={s.writerLatest}>
                    <Link href={latest.href}>{latest.title}<Example on={latest.example} /></Link>
                    <span>Latest · {latest.day}</span>
                  </div>
                ) : (
                  <p className={s.writerSoon}>{a.name === "Susan O'Shea" ? "Susan joins in October. Her first piece goes up here." : "Checks the work; publishes nothing under their own name."}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Coming up: six months, the programme repeating. Stamp marks carry the series. ── */}
        <section className={s.band} id="calendar">
          <div className={s.bandHead}>
            <h2 className={s.h2}>Coming up</h2>
            <span className={s.meta}>The next six months, from what is announced and what repeats</span>
          </div>
          <div className={s.calendar}>
            {months.map((k) => (
              <div key={k} className={s.month}>
                <span className={s.monthName}>{monthName(k)}</span>
                {upcoming.filter((u) => u.key === k).map((u) => (
                  <Link key={u.title} href={u.href ?? "#"} className={s.monthItem}>
                    <i className={u.course ? s.course : u.example ? s.exm : ""}>{u.mark}</i>
                    <span>{u.title}<Example on={u.example} /><small>{u.sub}</small></span>
                  </Link>
                ))}
                {upcoming.filter((u) => u.key === k).length === 0 ? <span className={s.meta}>Nothing announced yet</span> : null}
              </div>
            ))}
          </div>
        </section>

        {/* ── How we publish, then the gate at the very end: the finding is free, your own answer and
             the files need an email, and nobody is asked twice. ── */}
        <section className={s.band}>
          <div className={s.bandHead}>
            <h2 className={s.h2}>How we publish</h2>
          </div>
          <ol className={s.standards}>
            <li>Every number carries the date it was read, and the method sits beside the finding.</li>
            <li>The same method every edition, so the change is the finding and not the noise.</li>
            <li>A big move waits for the next read to confirm it.</li>
            <li>Every report, tracker and dataset is free to read in full. No form, no pop-up, nothing cut off halfway.</li>
            <li>We ask for an email once, for the things that are about you: your sector, your own result, the files. One free account opens everything.</li>
            <li>Agents are named as agents. A person checks anything that carries a person&rsquo;s name.</li>
          </ol>
          <Gate adds={adds} head="With one free account" />
        </section>
    </div>
  );
}
