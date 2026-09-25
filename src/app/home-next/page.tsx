import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { formatDay } from "../resources/library";
import { CATEGORIES } from "../resources/data";
import NextNav from "./NextNav";
import { DESKS, TRACKERS, STUDIES, TOOL_CARDS, AREAS_NEXT, type Study } from "./content";
import f from "../resources/front.module.css";
import h from "../resources/hero.module.css";
import n from "./next.module.css";

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
export default function HomeNext() {
  const essays = getAllEssays().slice(0, 3);
  const diary = getAllDispatches().slice(0, 3);
  const trackers = TRACKERS.map((t) => (t.name === "AI answers in Ireland" ? { ...t, reading: GEO_READING } : t));
  const tape = trackers.filter((t) => t.reading).concat(trackers.filter((t) => !t.reading));
  const flagship = STUDIES[0];

  return (
    <div className={f.page}>
      {/* ── The header: film, headline, and the latest move ── */}
      <section className={`${h.hero} ${n.hero}`} id="top">
        <video className={h.film} autoPlay muted loop playsInline poster="/resources/hero-cliff.jpg" src="/resources/hero-cliff.mp4" />
        <NextNav />

        {/* The tape: every tracker's latest reading, after the DI board's strip. */}
        <div className={n.tape} aria-label="Latest readings">
          <div className={n.tapeInner}>
            {[...tape, ...tape].map((t, i) => (
              <span key={i} className={n.tapeItem} aria-hidden={i >= tape.length ? true : undefined}>
                <span className={n.tapeName}>{t.name}</span>
                {t.reading ? (
                  <>
                    <b>{t.reading.value}</b> {t.reading.of} <span className={n.tapeWhen}>read {t.reading.last}</span>
                  </>
                ) : (
                  <span className={n.tapeWhen}>first read {t.first} · example</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className={h.inner}>
          <div className={h.text}>
            <span className={h.pill}>Marketing consultancy · research · agents · training</span>
            <h1 className={`${h.title} ${n.placeholder}`}>The headline goes here</h1>
            <p className={h.sub}>
              A line under it saying what Run with Foxes is: a consultancy that measures Irish
              marketing every week, builds the agents that do the work, and teaches marketers to use them.
            </p>
            <p className={h.stamp}>New study: who AI names across 41 categories of Irish life</p>
          </div>

          {/* The latest move, after the DI board's panel: one reading, big, with where it came from. */}
          <Link href="/resources/jobs-ai" className={`${h.panel} ${n.move}`}>
            <div className={h.head}>
              <span className={h.headLab}>Latest move</span>
              <span className={h.headCount}>read 24 Sep 2026</span>
            </div>
            <div className={n.moveBig}>
              <span className={n.moveNum}>48</span>
              <span className={n.moveOf}>of 739</span>
            </div>
            <p className={n.moveLine}>Irish marketing and sales job ads asked for anything real about AI, across seven sources in one day.</p>
            <div className={n.moveBar} aria-hidden>
              <i style={{ width: `${(48 / 739) * 100}%` }} />
            </div>
            <div className={n.moveFoot}>
              <span>The jobs and AI desk · an agent</span>
              <span>The tracker →</span>
            </div>
          </Link>
        </div>
      </section>

      <main className={f.wrap}>
        {/* ── The four doors ── */}
        <section className={n.doors} aria-label="What we do">
          {[
            { k: "Consulting", t: "We diagnose what is holding your marketing back, and fix it with you.", href: "/contact", ex: true },
            { k: "Agents", t: "Ten agents we build for marketing teams, working every day.", href: "/#agents", ex: false },
            { k: "Training", t: "A free course for marketers, and training for whole teams.", href: "/course", ex: false },
            { k: "Resources", t: "Studies, trackers and tools on what AI is doing to marketing.", href: "/resources", ex: false },
          ].map((d, i) => (
            <Link key={d.k} href={d.href} className={n.door}>
              <span className={n.doorNum}>0{i + 1}</span>
              <span className={n.doorName}>{d.k}</span>
              <span className={n.doorLine}>
                {d.t} {d.ex ? <Ex /> : null}
              </span>
              <span className={n.doorGo}>/{d.k.toLowerCase()} →</span>
            </Link>
          ))}
        </section>

        {/* ── Who writes here: eight streams, people and agents ── */}
        <section className={f.shelf} id="writers">
          <div className={f.shelfHead}>
            <h2 className={f.h2}>Who writes here</h2>
            <span className={f.meta}>Two people and six agents, each named for what they are</span>
          </div>
          <div className={n.writers}>
            <div className={f.writer}>
              <div className={f.byline}>
                <img src="/Paul_photo.jpg" alt="" />
                <div>
                  <span className={f.personName}>Paul Dervan</span>
                  <span className={f.meta}>Essays &middot; founder</span>
                </div>
              </div>
              <ul className={f.writerList}>
                {essays.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/essays/${e.slug}`}>{e.title}</Link>
                    <span>{formatDay(e.date)}</span>
                  </li>
                ))}
              </ul>
              <Link className={f.writerAll} href="/essays">All essays →</Link>
            </div>
            <div className={f.writer}>
              <div className={f.byline}>
                <span className={f.initials}>SO</span>
                <div>
                  <span className={f.personName}>Susan O&rsquo;Shea</span>
                  <span className={f.meta}>Research &middot; head of research</span>
                </div>
              </div>
              <p className={f.writerSoon}>Susan joins in October. Her first piece goes up here.</p>
            </div>
            <div className={f.writer}>
              <div className={f.byline}>
                <span className={f.agentMark}>L</span>
                <div>
                  <span className={f.personName}>Lena</span>
                  <span className={f.meta}>The agent team diary &middot; an agent, daily</span>
                </div>
              </div>
              <ul className={f.writerList}>
                {diary.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/diary/${d.slug}`}>{d.title}</Link>
                    <span>{formatDay(d.date)}</span>
                  </li>
                ))}
              </ul>
              <Link className={f.writerAll} href="/diary">The whole diary →</Link>
            </div>
            {DESKS.map((d) => (
              <div key={d.key} className={f.writer}>
                <div className={f.byline}>
                  <span className={f.agentMark}>{d.mark}</span>
                  <div>
                    <span className={f.personName}>
                      {d.name} <Ex on={d.example} />
                    </span>
                    <span className={f.meta}>{d.what}</span>
                  </div>
                </div>
                <ul className={f.writerList}>
                  {d.pieces.map((p) => (
                    <li key={p.t}>
                      {p.href ? <Link href={p.href}>{p.t}</Link> : <span className={n.soonTitle}>{p.t}</span>}
                      <span>{p.day}</span>
                    </li>
                  ))}
                </ul>
                <Link className={f.writerAll} href={d.all.href}>{d.all.t}</Link>
              </div>
            ))}
          </div>
        </section>

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

        {/* ── One sign-up, choose what you get ── */}
        <section className={n.join}>
          <div>
            <h2 className={f.h2}>Get the reads you want</h2>
            <p className={n.joinLine}>Pick the trackers and studies. We send each one when it is read, and nothing else.</p>
          </div>
          <form className={n.joinForm}>
            <div className={n.picks}>
              {["Jobs and AI", "AI answers in Ireland", "Irish ads by sector", "The studies", "Paul's essays", "The agent diary"].map((p, i) => (
                <label key={p} className={n.pick}>
                  <input type="checkbox" defaultChecked={i < 2} /> {p}
                </label>
              ))}
            </div>
            <div className={n.joinRow}>
              <input type="email" placeholder="you@company.ie" aria-label="Work email" />
              <button type="button">Send me these</button>
            </div>
          </form>
        </section>
      </main>

      <SiteFooter current="/" wide />
      <div className={f.banner}>
        Mockup, 25 Sep 2026. The homepage at full scale. Anything tagged Example is made up. GEO Ireland numbers are day one and not signed off. The headline is a placeholder.
      </div>
    </div>
  );
}
