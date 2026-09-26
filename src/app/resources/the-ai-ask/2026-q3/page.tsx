import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import N from "./numbers.json";
import { META, INTRO, FINDINGS, CHAPTERS, DISCUSSION, METHOD, SIGNOFF, type Block } from "./copy";
import { FigWin, F11, F21, F31, F32, F33, F34, F41, F42, F51, F52, F71 } from "./Charts";

/* each chart imported by name: a map object exported from a client file arrives empty on the server */
const FIGS = { f11: F11, f21: F21, f31: F31, f32: F32, f33: F33, f34: F34, f41: F41, f42: F42, f51: F51, f52: F52, f71: F71 };
import { Hl, Rail } from "./Parts";
import { Gate, DownloadPdf } from "../../kit";
import { reportBySlug } from "../../catalogue";
import f from "../../front.module.css";
import h from "../../hero.module.css";
import n from "../../../home-next/next.module.css";
import r from "./report.module.css";

export const metadata: Metadata = {
  title: "The AI Ask, Q3 2026 | Run with Foxes",
  robots: { index: false, follow: false },
};

/** Sam's ==phrase== marks become the module highlight. The words are never touched. */
function Text({ s }: { s: string }) {
  const parts = s.split("==");
  return <>{parts.map((p, i) => (i % 2 ? <Hl key={i}>{p}</Hl> : <span key={i}>{p}</span>))}</>;
}

function Lock() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
      <rect x="2" y="5.5" width="8" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 014 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* this edition's row in the resource centre catalogue: the PDF path, page count and what an account adds */
const CAT = reportBySlug("the-ai-ask-2026-q3");

let figNo: Record<string, string> = {};

function BlockView({ b, ch }: { b: Block; ch: number }) {
  if ("p" in b)
    return (
      <p className={r.p}>
        <Text s={b.p} />
      </p>
    );
  if ("q" in b)
    return (
      <blockquote className={`mod-win ${r.quote}`}>
        <div className="mod-winbar">
          <span className="mod-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="mod-wintitle">job_ad</span>
        </div>
        <p>
          &ldquo;<Text s={b.q} />&rdquo;
        </p>
        <cite>{b.cite}</cite>
      </blockquote>
    );
  if ("gate" in b)
    return (
      <a href="#join" className={r.gate}>
        <Lock />
        <span>{b.gate}</span>
        <em>Get full access, free &rarr;</em>
      </a>
    );
  const Fig = FIGS[b.fig];
  return (
    <FigWin id={b.fig} n={figNo[b.fig]} title={b.title} cap={b.cap}>
      <Fig />
    </FigWin>
  );
}

/**
 * THE AI ASK, Q3 2026, the reading template. Paul, 25 Sep 2026: "give the report the full dray
 * works. Make me joyful. Use the tricks we use in our modules for highlighting stuff, interactive
 * charts, make it full really compact and modern day consulting feel while staying on brand."
 *
 * Built so each quarter drops in: copy.ts holds Sam's words, numbers.json every figure. The
 * shell is the module page's (masthead, sticky contents rail with dots, numbered sections,
 * figures in module windows). NOT FOR THE LIVE SITE until Paul approves Sam's text.
 */
export default function AiAskQ3() {
  // figure numbers follow Sam's chapter.section order: first figure in chapter 3 is 3.1, etc.
  figNo = {};
  CHAPTERS.forEach((c) => {
    let k = 0;
    c.subs.forEach((s) => s.blocks.forEach((b) => "fig" in b && (figNo[b.fig] = `${c.n}.${++k}`)));
  });
  const words = [...INTRO, ...DISCUSSION, ...CHAPTERS.flatMap((c) => [...(c.lede ?? []), ...c.subs.flatMap((s) => s.blocks.map((b) => ("p" in b ? b.p : "")))])].join(" ").split(/\s+/).length;
  const mins = Math.round(words / 230);
  const mk = N.jobsie;
  const dm = N.fine_roles_boards_year.find((x) => x.role === "Digital marketing")!;
  const big: Record<string, { v: string; l: string }> = {
    mkt: { v: `${mk["2025-Q4"].marketing.pct}% → ${mk["2026-Q3"].marketing.pct}%`, l: "marketing ads asking for AI, a year apart" },
    talk: { v: `${N.talk_vs_ask.mention_ai.pct}% · ${N.talk_vs_ask.real_ask.pct}%`, l: "mention AI · actually ask for it" },
    digital: { v: `${dm.k} of ${dm.n}`, l: "digital marketing ads on the job boards asked for AI over the year" },
    speed: { v: `${N.tools_asks_reasons["speed, efficiency, productivity"]}`, l: `sentences want speed, against ${N.tools_asks_reasons["writing, drafting, copy"]} about writing` },
    tools: { v: `${N.ai_tools_named.generic_without_any_name} of ${N.ai_tools_named.ads_generic_ai_tools}`, l: "ads asking for AI tools name no tool at all" },
    rules: { v: "0", l: `of ${N.total_ads.toLocaleString("en-IE")} ads tell you to keep AI out of your CV` },
  };
  const rail = [
    { id: "intro", k: "", t: "Introduction" },
    { id: "findings", k: "", t: "What we found" },
    ...CHAPTERS.map((c) => ({ id: c.id, k: String(c.n), t: c.title.split(":")[0] })),
    { id: "discussion", k: "", t: "Discussion" },
    { id: "method", k: "", t: "How we did it" },
  ];

  return (
    <div className={`${f.page} ${r.page}`}>
      {/* Paul, 25 Sep: the band "same size as hero in homepage and put headline into photo". The
          report's title and byline sit in the film; the at-a-glance card went back under it (Paul, late 25 Sep) to give the film room, as the homepage's do. */}
      <section className={`${h.hero} ${r.heroR}`} id="top">
        <video className={`${h.film} ${n.film}`} autoPlay muted playsInline preload="auto" poster="/resources/fox-hero-flip-poster-first-frame.jpg" src="/resources/fox-hero-flip-dublin-cliffs-beach-2206x946.mp4" />
        <NextNav />
        <div className={`${h.inner} ${n.heroInner} ${r.heroInnerR}`}>
          <div className={h.text}>
            <span className={r.eyebrowW}>
              {META.kicker} <span className={r.issueW}>Issue 01 · Q3 2026</span>
            </span>
            <h1 className={r.h1W}>
              {META.title} <span className={r.hlW}>{META.titleHl}</span>
            </h1>
            <div className={r.byW}>
              <i className={r.byMark}>S</i>
              <span>{META.byline}</span>
              <span className={r.byDot}>·</span>
              <span>{META.checked}</span>
              <span className={r.byDot}>·</span>
              <span>{META.date}</span>
              <span className={r.byDot}>·</span>
              <span>{mins} min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className={r.draft}>
        Draft for Paul. Sam&rsquo;s text and numbers, not yet approved for the live site, and Cato is reviewing them now.
      </div>

      <header className={r.mast} id="intro">
        <div className={r.mastMain}>
          <p className={r.standfirst}>
            <Text s={INTRO[0]} />
          </p>
          {INTRO.slice(1).map((p, i) => (
            <p key={i} className={r.p}>
              <Text s={p} />
            </p>
          ))}
          {/* The PDF is the page (BUILD-NOTES, the PDF rule), built by scripts/resources/build-pdfs.mjs. */}
          <div id="download" style={{ marginTop: 8 }}>
            <DownloadPdf href={CAT?.pdf ?? "/resources/pdf/the-ai-ask-q3-2026.pdf"} pages={CAT?.pages} />
          </div>
        </div>
        <aside className={`mod-win ${r.glance}`}>
          <div className="mod-winbar">
            <span className="mod-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="mod-wintitle">at_a_glance</span>
          </div>
          <div className={r.glanceBody}>
            <img className={r.glanceFox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            {[
              { v: N.total_ads.toLocaleString("en-IE"), l: "Irish marketing and sales job ads read" },
              { v: `${N.sep_all.pct}%`, l: `of September's ads ask for AI, ${N.sep_all.k} of ${N.sep_all.n}` },
              { v: `${mk["2026-Q3"].marketing.pct}%`, l: `of marketing ads on jobs.ie ask, up from ${mk["2025-Q4"].marketing.pct}% a year ago` },
              { v: `${N.talk_vs_ask_by_channel.careers_pages.real_ask.pct}%`, l: `of tech firms' careers-page ads ask, against ${N.talk_vs_ask_by_channel.job_boards.real_ask.pct}% on the job boards` },
            ].map((s) => (
              <div key={s.l} className={r.glanceRow}>
                <span className="mod-num">{s.v}</span>
                <span className="mod-lbl">{s.l}</span>
              </div>
            ))}
            <span className={r.glanceNext}>Next issue: Q4 2026, the December ads</span>
          </div>
        </aside>
      </header>

      <section className={r.findings} id="findings">
        <div className={r.fHead}>
          <h2 className={r.h2s}>What we found</h2>
          <span className={r.fSub}>Six findings, each one a chapter</span>
        </div>
        <ol className={r.fGrid}>
          {FINDINGS.map((fd, i) => (
            <li key={i}>
              <a href={`#ch${fd.ch}`} className={r.fCard}>
                <span className={r.fN}>0{i + 1}</span>
                <span className={r.fBig}>{big[fd.big].v}</span>
                <span className={r.fBigL}>{big[fd.big].l}</span>
                <span className={r.fText}>{fd.text}</span>
                <span className={r.fGo}>Chapter {fd.ch} &rarr;</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className={r.body}>
        <aside className={r.railCol}>
          <Rail items={rail} />
        </aside>

        <main className={r.main} id="report-main">
          {CHAPTERS.map((c) => (
            <section key={c.id} id={c.id} className={r.chapter}>
              <div className={r.chHead}>
                <span className={r.chN}>Chapter {c.n}</span>
                <h2 className={r.h2}>{c.title}</h2>
              </div>
              {c.lede?.map((p, i) => (
                <p key={i} className={r.lede}>
                  <Text s={p} />
                </p>
              ))}
              {c.subs.map((s) => (
                <div key={s.n} className={r.sub} id={`s${s.n.replace(".", "-")}`}>
                  <h3 className={r.h3}>
                    <span className={r.subN}>{s.n}</span>
                    {s.title}
                  </h3>
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} b={b} ch={c.n} />
                  ))}
                </div>
              ))}
            </section>
          ))}

          <section id="discussion" className={r.chapter}>
            <div className={r.chHead}>
              <span className={r.chN}>Discussion</span>
              <h2 className={r.h2}>What it means, and what I still don&rsquo;t know</h2>
            </div>
            {DISCUSSION.map((p, i) => (
              <p key={i} className={i === 0 ? r.lede : r.p}>
                <Text s={p} />
              </p>
            ))}
          </section>

          <section id="join" className={r.join}>
            <div>
              <span className={r.eyebrow}>Get full access, free</span>
              <h2 className={r.h2}>Every ad behind this report, and the next one first</h2>
              <p className={r.p}>
                A free account opens the full tables, every ad by role, level, employer and county, and the downloads. The December issue comes to you when it&rsquo;s read.
              </p>
            </div>
            <form className={r.joinForm}>
              <input type="email" placeholder="you@company.ie" aria-label="Work email" />
              <button type="button">Get full access, free</button>
            </form>
          </section>

          <section id="method" className={r.chapter}>
            <div className={r.chHead}>
              <span className={r.chN}>Method</span>
              <h2 className={r.h2}>How we did it</h2>
            </div>
            {METHOD.map((m, i) => (
              <details key={m.k} className={r.meth} open={i === 0}>
                <summary>
                  <span>{m.k}</span>
                  <em>open</em>
                </summary>
                <p className={r.small}>{m.t}</p>
              </details>
            ))}
            <div className={r.sign}>
              <i className={r.byMark}>S</i>
              <p className={r.small}>{SIGNOFF}</p>
            </div>
            {/* The gate rule (Paul, 26 Sep): the finding is free, the files need an email. Listed once, at the end. */}
            <Gate adds={CAT?.withAccount ?? []} />
            <Link href="/home-next" className={r.back}>
              &larr; Back to the homepage
            </Link>
          </section>
        </main>
      </div>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
