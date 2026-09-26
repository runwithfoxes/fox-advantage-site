import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { formatDay, getLibrary } from "../../resources/library";
import { CATEGORIES } from "../../resources/data";
import NextNav from "../NextNav";
import AgentsSection from "@/components/agents/AgentsSection";
import "@/components/agents/agents-section.css";
import { MODULES } from "../../course/courseModules";
import { DESKS, TRACKERS, STUDIES, TOOL_CARDS, AREAS_NEXT, type Study } from "../content";
import f from "../../resources/front.module.css";
import h from "../../resources/hero.module.css";
import n from "../next.module.css";

export const metadata: Metadata = {
  title: "Run with Foxes",
  robots: { index: false, follow: false },
};

/* GEO Ireland day one (23 Aug 2026), NOT signed off by Paul: categories whose most-named
   answer is a state body. Counted off data.ts, never typed. */
const STATE_LED = CATEGORIES.filter((c) => c.owner === "state").length;
const GEO_READING = { value: String(STATE_LED), of: `of ${CATEGORIES.length} categories led by a state body`, last: "23 Aug" };

function Ex({ on = true }: { on?: boolean }) {
  return on ? <span className={f.ex}>Example</span> : null;
}

const SHADES = ["#E3EEF5", "#C4DCEA", "#6CAAC8", "#3A7CA5", "#2B5E80", "#1A3A4E"];

/** Each study gets its own drawing in the blues, and one subtle fox. No drawing carries a number. */
function Cover({ st }: { st: Study }) {
  return (
    <div className={n.cover}>
      <div className={n.coverTop}>
        <span>{st.no}</span>
        <span>Quarterly</span>
      </div>
      <div className={n.coverArt} aria-hidden>
        <svg viewBox="0 0 200 150" className={n.coverSvg}>
          {st.cover === "bars" &&
            CATEGORIES.map((c, i) => (
              <rect key={c.name} x={6 + i * 4.6} y={146 - c.rate * 130} width="3.4" height={c.rate * 130} fill={c.owner === "state" ? "#1A3A4E" : c.owner === "middle" ? "#6CAAC8" : "#CFCFC9"} />
            ))}
          {st.cover === "rings" && [70, 55, 40, 25, 10].map((r, i) => <circle key={r} cx="100" cy="76" r={r} fill={SHADES[i + 1]} />)}
          {st.cover === "blocks" && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 28} y={146 - (i + 1) * 21} width="20" height={(i + 1) * 21} fill={SHADES[i]} />)}
          {st.cover === "grid" &&
            Array.from({ length: 40 }).map((_, i) => <rect key={i} x={10 + (i % 8) * 23} y={8 + Math.floor(i / 8) * 28} width="19" height="24" fill={SHADES[(i * 7 + Math.floor(i / 8)) % 6]} />)}
          {st.cover === "dots" &&
            Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={14 + (i % 10) * 19} cy={14 + Math.floor(i / 10) * 24} r={3 + ((i * 13) % 7)} fill={SHADES[(i * 5) % 6]} />)}
          {st.cover === "steps" &&
            [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${10 + i * 36} 140 V${120 - i * 22} H${40 + i * 36}`} stroke={SHADES[i + 1]} strokeWidth="6" fill="none" />)}
        </svg>
        <img className={n.coverFox} src={`/fox/${st.fox}`} alt="" />
      </div>
      <div className={n.coverFoot}>{st.title}</div>
    </div>
  );
}

/**
 * /home-next. The Resource hub turned into the homepage, drawn at the size it is meant to
 * reach: ten trackers, six studies, eight writers, eight tools. Paul, 25 Sep 2026.
 * The headline is a placeholder on purpose: "Don't worry about the headline for the moment."
 */
export default function HomeNextMore() {
  const essays = getAllEssays().slice(0, 3);
  const diary = getAllDispatches().slice(0, 3);
  const openMod = MODULES.find((m) => m.built);
  const nextMod = MODULES.find((m) => !m.built);
  /* What's new: one list across every kind of thing we publish, newest first. Only real
     items, except where tagged. */
  const news: { type: string; who: string; t: string; href: string; day: string; ex?: boolean }[] = [
    ...(essays[0] ? [{ type: "Essay", who: "Paul Dervan", t: essays[0].title, href: `/essays/${essays[0].slug}`, day: formatDay(essays[0].date) }] : []),
    { type: "Tracker", who: "Jeff", t: "About 1 in 11 new marketing and sales ads asks anything real about AI", href: "/resources/jobs-ai", day: "Read 24 Sept 2026" },
    ...(openMod ? [{ type: "Course · module " + openMod.n + " open", who: "Paul Dervan", t: openMod.title.replace(/^\(\d\)\s*/, ""), href: `/course/${openMod.n}`, day: nextMod ? `Module ${nextMod.n} opens ${nextMod.when}` : "" }] : []),
    ...(diary[0] ? [{ type: "Diary", who: "Lena", t: diary[0].title, href: `/diary/${diary[0].slug}`, day: formatDay(diary[0].date) }] : []),
    ...(essays[1] ? [{ type: "Essay", who: "Paul Dervan", t: essays[1].title, href: `/essays/${essays[1].slug}`, day: formatDay(essays[1].date) }] : []),
    { type: "Study", who: "Jess", t: "GEO Ireland: who five AI engines name across 41 categories of Irish life", href: "/resources/geo-ireland", day: "Day one, 23 Aug 2026" },
    { type: "Research", who: "Sam", t: "How other firms run free research, and what we took from it", href: "/resources", day: "Coming", ex: true },
  ];
  const trackers = TRACKERS.map((t) => (t.name === "AI answers in Ireland" ? { ...t, reading: GEO_READING } : t));
  const flagship = STUDIES[0];
  /* The card's lines, built the way the hub builds them: studies, trackers, then every
     published piece. Invented studies and trackers say "example" in their label. */
  const lines = [
    ...STUDIES.map((st) => ({ label: `Study ${st.no}${st.example ? " · example" : ""}`, title: st.title, href: st.href })),
    ...trackers.map((t) => ({ label: `Tracker${t.example ? " · example" : ""}`, title: t.what, href: t.href })),
    ...getLibrary()
      .filter((e) => !e.soon && e.type !== "Study")
      .map((e) => ({ label: `${e.type} · ${formatDay(e.date)}`, title: e.title, href: e.href })),
  ];

  return (
    <div className={f.page}>
      {/* The second page (Paul, 25 Sep): "everything at the bottom half of the page... we can move
          that to a different page." Same nav, a short band of the same film, then the programme. */}
      <section className={`${h.hero} ${n.heroShort}`} id="top">
        <video className={`${h.film} ${n.film}`} autoPlay muted playsInline preload="auto" poster="/resources/fox-hero-flip-last-frame.jpg" src="/resources/fox-hero-flip-dublin-cliffs-beach-2206x946.mp4" />
        <NextNav />
        <div className={n.shortInner}>
          <h1 className={n.shortTitle}>Agents, trackers, studies and tools</h1>
        </div>
      </section>

      <main className={f.wrap}>
        {/* The live homepage's agents section, whole: its inline reader, and the full-screen
            surface the four buttons under the hero open (Paul, 25 Sep). */}
        <div className={n.agentsWrap}>
          <AgentsSection />
        </div>

        {/* ── The board: one row per tracker, after the DI price board ── */}
        <section className={f.shelf} id="trackers">
          <div className={f.shelfHead}>
            <h2 className={f.h2}>The trackers</h2>
            <span className={f.meta}>Ten things we measure in Irish marketing, each read by a named desk</span>
          </div>
          <div className={n.board}>
            <div className={`${n.bRow} ${n.bHead}`}>
              <span>Tracker</span>
              <span>Latest reading</span>
              <span>Since last read</span>
              <span>Desk</span>
              <span>Reads</span>
              <span>Last read</span>
            </div>
            {trackers.map((t) => (
              <Link key={t.name} href={t.href ?? "#trackers"} className={n.bRow}>
                <span className={n.bName}>
                  <span className={`${n.live} ${t.reading ? n.liveOn : ""}`} aria-hidden />
                  <span>
                    {t.name} <Ex on={t.example} />
                    <span className={n.bWhat}>{t.what}</span>
                  </span>
                </span>
                <span className={n.bRead}>
                  {t.reading ? (
                    <>
                      <b>{t.reading.value}</b> <span>{t.reading.of}</span>
                    </>
                  ) : (
                    <span className={n.bSoon}>first read {t.first}</span>
                  )}
                </span>
                <span className={n.bSpark} aria-hidden>
                  {t.reading ? <span className={n.firstRead}>first read, no change yet</span> : <i />}
                </span>
                <span className={n.bCell}>{t.desk}</span>
                <span className={n.bCell}>{t.reads}</span>
                <span className={n.bCell}>{t.reading ? t.reading.last : " - "}</span>
              </Link>
            ))}
          </div>
          <div className={n.boardFoot}>
            <span>Every number carries the day it was read. A big move waits for the next read to confirm it.</span>
            <form className={n.boardJoin}>
              <input type="email" placeholder="Every change on Monday: your work email" aria-label="Work email" />
              <button type="button">Send me the read</button>
            </form>
          </div>
        </section>

        {/* ── The studies: this quarter's flagship big, the programme beside it ── */}
        <section className={f.shelf} id="studies">
          <div className={f.shelfHead}>
            <h2 className={f.h2}>The studies</h2>
            <span className={f.meta}>Six studies, each on a fixed calendar, free to read with no form</span>
          </div>
          <div className={n.studies}>
            <Link href={flagship.href!} className={n.flag}>
              <Cover st={flagship} />
              <div>
                <span className={f.meta}>This quarter &middot; {flagship.no}</span>
                <span className={n.flagTitle}>{flagship.title}</span>
                <p className={n.flagLine}>{flagship.line} Day one results, read 23 August 2026.</p>
                <span className={n.doorGo}>Read the study →</span>
              </div>
            </Link>
            <div className={n.covers}>
              {STUDIES.slice(1).map((st) => (
                <div key={st.no} className={n.coverCard}>
                  <Cover st={st} />
                  <span className={f.meta}>
                    First edition {st.next} <Ex on={st.example} />
                  </span>
                  <p className={n.coverLine}>{st.line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={n.cal}>
            {[
              ["Oct", ["Tools in job specs, first read", "Same brief, every model"]],
              ["Nov", ["Irish ads by sector, first read", "Marketing leader moves"]],
              ["Dec", ["GEO Ireland, second read", "Irish Advertising Audit"]],
              ["Jan", ["What Irish Marketers Do with AI"]],
              ["Feb", ["The Irish Marketing Team"]],
              ["Mar", ["What Comes to Mind", "GEO Ireland, Q1"]],
            ].map(([mo, items]) => (
              <div key={mo as string} className={n.calMonth}>
                <span className={n.calName}>{mo as string}</span>
                {(items as string[]).map((t) => (
                  <span key={t} className={n.calItem}>{t}</span>
                ))}
              </div>
            ))}
          </div>
          <span className={n.calNote}>
            Calendar <Ex />
          </span>
        </section>

        {/* ── Tools ── */}
        <section className={f.shelf} id="tools">
          <div className={f.shelfHead}>
            <h2 className={f.h2}>Tools</h2>
            <span className={f.meta}>Free. Your own full result is the only thing we ask an email for.</span>
          </div>
          <div className={n.tools}>
            {TOOL_CARDS.map((t) => {
              const inner = (
                <>
                  <div className="mod-winbar">
                    <span className="mod-lights">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="mod-wintitle">{t.bar}</span>
                  </div>
                  <div className={f.toolBody}>
                    <span className={f.toolName}>
                      {t.name} <Ex on={t.example} />
                    </span>
                    <p>{t.line}</p>
                    <span className={f.toolGo}>{t.href ? "Open →" : "Coming"}</span>
                  </div>
                </>
              );
              return t.href ? (
                <Link key={t.name} href={t.href} className={`mod-win ${f.tool}`}>
                  {inner}
                </Link>
              ) : (
                <div key={t.name} className={`mod-win ${f.tool} ${f.toolSoon}`}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Areas: every piece, cut by subject ── */}
        <section className={n.areas} aria-label="Areas">
          {AREAS_NEXT.map((a) => (
            <div key={a.name} className={n.area}>
              <span className={n.areaName}>{a.name}</span>
              <span className={n.areaLine}>{a.line}</span>
              <span className={n.areaGo}>Everything on {a.name.toLowerCase()} →</span>
            </div>
          ))}
        </section>

        {/* ── Proof: who is behind it ── */}
        <section className={`${f.shelf} ${n.proof}`}>
          <div className={n.proofPerson}>
            <img src="/Paul_photo.jpg" alt="Paul Dervan" />
            <div>
              <span className={f.meta}>Founder</span>
              <span className={n.proofName}>Paul Dervan</span>
              <p className={n.proofLine}>
                Twenty years in brand. Head of brand at O2 Ireland, CMO at the National Lottery, head of brand at
                Indeed and Miro. Trained by Peter Field.
              </p>
            </div>
          </div>
          <div className={n.proofFacts}>
            <div>
              <span className={n.factBig}>2022</span>
              <span className={n.factLine}>Ireland&rsquo;s Marketer of the Year</span>
            </div>
            <div>
              <span className={n.factBig}>€1bn</span>
              <span className={n.factLine}>The National Lottery&rsquo;s first billion-euro year</span>
            </div>
            <div>
              <span className={n.factBig}>1,000+</span>
              <span className={n.factLine}>Marketers signed up to the course</span>
            </div>
          </div>
          <div className={n.logos}>
            <span className={f.meta}>Clients</span>
            <span className={n.logoRow}>
              Client names to agree <Ex />
            </span>
          </div>
        </section>

        {/* ── The account (Paul, 25 Sep): read a good amount free, sign in for the depth. One free
             account holds the research and the course. There is no paid tier. ── */}
        <section className={n.account} id="account">
          <div>
            <h2 className={f.h2}>Read it free. Sign in for the detail.</h2>
            <div className={n.accCols}>
              <div>
                <span className={n.dKick}>Free to everyone</span>
                <ul className={n.accList}>
                  <li>Every chart and its headline</li>
                  <li>The studies, the essays and the diary</li>
                </ul>
              </div>
              <div>
                <span className={n.dKick}>With a free account</span>
                <ul className={n.accList}>
                  <li>Your sector and your own brand&rsquo;s results</li>
                  <li>Full tables and downloads</li>
                  <li>Each tracker&rsquo;s weekly read, by email</li>
                  <li>The whole course, with your progress saved</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={n.accSide}>
            <form className={n.joinRow}>
              <input type="email" placeholder="you@company.ie" aria-label="Work email" />
              <button type="button">Create a free account</button>
            </form>
            <span className={n.accFine}>Already have one? <a href="#">Sign in</a>. Same account as the course.</span>
            <div className={`mod-win ${n.dWin}`}>
              <div className="mod-winbar">
                <span className="mod-lights">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mod-wintitle">your_course</span>
              </div>
              <div className={n.winBody}>
              <span className={n.dKick}>The course, in your account</span>
              <ol className={n.accMods}>
                {MODULES.map((m) => (
                  <li key={m.n} className={m.built ? n.accModOn : ""}>
                    <span>{m.n}</span>
                    {m.title.replace(/^\(\d\)\s*/, "")}
                    <em>{m.built ? "Open" : m.when}</em>
                  </li>
                ))}
              </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter current="/" wide />
      <div className={f.banner}>
        Mockup, 25 Sep 2026. The homepage at full scale. Anything tagged Example is made up. GEO Ireland numbers are day one and not signed off. The headline is a placeholder.
      </div>
    </div>
  );
}
