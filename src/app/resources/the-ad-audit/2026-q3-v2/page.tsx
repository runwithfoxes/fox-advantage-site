import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import AccessForm from "../../kit/AccessForm";
import C from "./copy.json";
import F from "./facts.json";
import { FigWin, Fig, Frames } from "./Charts";
import { Rail } from "../../the-ai-ask/2026-q3/Parts";
import fr from "../../front.module.css";
import h from "../../hero.module.css";
import n from "../../../home-next/next.module.css";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import a from "./audit.module.css";

export const metadata: Metadata = {
  title: "The Ad Audit, Q3 2026 (draft two) | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * THE AD AUDIT, Q3 2026, DRAFT TWO. Sam's rewrite of 28 Sep: Meta advertising best practice with
 * the banks as the worked example (Paul: "Sam's report on meta advertising best practice using
 * the banking category as examples"). The page keeps the first draft's shape exactly, at Paul's
 * word ("I really like his current format design so not to change that if possible"): the AI
 * Ask's hero, byline, standfirst, at-a-glance window, findings, and numbered figures in windows.
 *
 * copy.json, charts.json and facts.json are written by scripts/resources/ad-audit-v2-copy.py from
 * Sam's v2 folder, never typed. The first draft stays at /resources/the-ad-audit/2026-q3 until Paul
 * picks. NOT FOR THE LIVE SITE, and not in the catalogue or the PDF build.
 */

type Block =
  | { p: string }
  | { small: string }
  | { list: string[] }
  | { fig: string; kind: string; no: string; title: string; cap: string }
  | { strip: string; frames: { t: number; img: string }[]; alt: string; no: string; title: string; cap: string }
  | { gallery: { img: string; lines: string[] }[] };

const BASE = "/resources/the-ad-audit/2026-q3-v2/";

const day = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-IE", { day: "numeric", month: "long", timeZone: "UTC" });

function Gallery({ items }: { items: { img: string; lines: string[] }[] }) {
  return (
    <div className={a.gallery}>
      {items.map((g, i) => {
        const [who, tag] = g.lines[0].split(" · ");
        return (
          <figure key={g.img} className={a.adCard}>
            <div className={a.adPic}>
              <span className={a.adRank}>{String(i + 1).padStart(2, "0")}</span>
              <img src={`${BASE}${g.img}`} alt={`${who} ad`} loading="lazy" />
            </div>
            <figcaption className={a.adCap}>
              <span className={a.adAdv}>{who}</span>
              {tag ? <span className={a.adTags}>{tag}</span> : null}
              {g.lines[1] ? <span className={a.adQuote}>{g.lines[1]}</span> : null}
              {g.lines[2] ? <span className={a.adReach}>{g.lines.slice(2).join(" ")}</span> : null}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  if ("p" in b) return <p className={r.p}>{b.p}</p>;
  if ("small" in b) return <p className={r.small}>{b.small}</p>;
  if ("list" in b)
    return (
      <ul className={`${r.p} ${a.list}`}>
        {b.list.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  if ("gallery" in b) return <Gallery items={b.gallery} />;
  if ("strip" in b)
    return (
      <FigWin id={b.strip.replace(/\.jpg$/, "")} kind="Figure" n={b.no} title={b.title} cap={b.cap}>
        <Frames frames={b.frames} base={BASE} alt={b.alt} />
      </FigWin>
    );
  return (
    <FigWin id={b.fig} kind={b.kind} n={b.no} title={b.title} cap={b.cap}>
      <Fig id={b.fig} />
    </FigWin>
  );
}

export default function AdAuditQ3v2() {
  const chapters = C.chapters as { id: string; n: number; title: string; lede: Block[]; subs: { n: string; title: string; blocks: Block[] }[] }[];
  const intro = (C.intro as Block[]).filter((b) => !("p" in b && /^What we found, in short:?$/.test(b.p)));
  const findings = C.findings.map((f) => ({ ch: f.ch, text: f.text.replace(/\s*\(Chapter \d+\)\.?$/, ".") }));
  const [date, ...who] = C.meta.byline.split(" · ");
  const author = who.filter((w) => !/^Draft/.test(w)).join(" · ");
  const status = who.find((w) => /^Draft/.test(w));
  const allText = [C.standfirst, ...intro.map((b) => ("p" in b ? b.p : "")), ...chapters.flatMap((c) => [...c.lede, ...c.subs.flatMap((s) => s.blocks)].map((b) => ("p" in b ? b.p : "list" in b ? b.list.join(" ") : "")))];
  const mins = Math.round(allText.join(" ").split(/\s+/).length / 230);
  // The headline, split where the sky starts: what the report counted, then what it tells you.
  const cut = C.meta.h1.indexOf(" about ");
  const heroTitle = cut > 0 ? C.meta.h1.slice(0, cut) : C.meta.h1;
  const heroHl = cut > 0 ? C.meta.h1.slice(cut + 1) : "";
  const gn = F.biggest_single_ad;
  const rail = [
    { id: "intro", k: "", t: "Introduction" },
    { id: "findings", k: "", t: "What we found" },
    ...chapters.map((c) => ({ id: c.id, k: String(c.n), t: c.title })),
    { id: "method", k: "", t: "How we did it" },
  ];

  return (
    <div className={`${fr.page} ${r.page}`}>
      <section className={`${h.hero} ${r.heroR}`} id="top">
        <img className={h.film} src="/resources/the-ad-audit/2026-q3/hero-flip.jpg" alt="" style={{ objectPosition: "50% 78%" }} />
        <NextNav />
        <div className={`${h.inner} ${n.heroInner} ${r.heroInnerR}`}>
          <div className={h.text}>
            <span className={r.eyebrowW}>{C.meta.kicker}</span>
            <h1 className={r.h1W}>
              {heroTitle} {heroHl ? <span className={r.hlW}>{heroHl}</span> : null}
            </h1>
          </div>
        </div>
      </section>

      <div className={r.draft}>Draft for Paul. Sam&rsquo;s text, checked by Cato, not approved for the live site.</div>

      <div className={r.body}>
        <aside className={r.railCol}>
          <Rail items={rail} />
        </aside>

        <main className={r.main} id="report-main">
          <header className={r.mast} id="intro">
            <div className={r.mastMain}>
              <div className={r.who}>
                <span className={r.whoFaces}>
                  <i className={r.byMark}>S</i>
                  <img className={r.whoImg} src="/Paul_photo.jpg" alt="Paul Dervan" />
                </span>
                <span className={r.whoText}>
                  <span className={r.whoLine}>
                    <span>{author}</span>
                    {status ? (
                      <>
                        <span className={r.byDot}>·</span>
                        <span>{status}</span>
                      </>
                    ) : null}
                  </span>
                  <span className={`${r.whoLine} ${r.whoMeta}`}>
                    <span>Issue 01 · Q3 2026 · {date}</span>
                    <span className={r.byDot}>·</span>
                    <span>{mins} min read</span>
                  </span>
                </span>
              </div>
              <p className={r.standfirst}>{C.standfirst}</p>
              {intro.map((b, i) => (
                <div key={i}>
                  <BlockView b={b} />
                  {i === 0 ? (
                    <div className={a.opener}>
                      <img src="/resources/the-ad-audit/2026-q3/0.jpg" alt="Revolut's Graham Norton ad" />
                      <span className={a.openerText}>
                        <b>{gn.adv}</b>
                        <span>
                          Shown only in Ireland, {day(gn.start)} to {day(gn.stop)}
                        </span>
                        <b className={a.openerBig}>{gn.reach.toLocaleString("en-IE")}</b>
                        <span>people reached by its biggest copy, the most of any single ad in the study</span>
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </header>

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
                { v: String(F.advertisers), l: "advertisers: the main Irish banks and lenders, the credit unions, An Post's money arm and three digital banks" },
                { v: F.bank_ads.toLocaleString("en-IE"), l: "ads shown in Ireland, 1 July to 26 September 2026" },
                { v: F.bank_creatives.toLocaleString("en-IE"), l: "different creatives, once copies with the same words are merged" },
                { v: F.new_creatives.toLocaleString("en-IE"), l: "of those creatives new this quarter" },
              ].map((s) => (
                <div key={s.l} className={r.glanceRow}>
                  <span className="mod-num">{s.v}</span>
                  <span className="mod-lbl">{s.l}</span>
                </div>
              ))}
              <span className={r.glanceNext}>Next issue: Q4 2026, in December</span>
            </div>
          </aside>

          <section className={r.findings} id="findings">
            <div className={r.fHead}>
              <h2 className={r.h2s}>What we found</h2>
              <span className={r.fSub}>{findings.length} findings, each one a chapter</span>
            </div>
            <ol className={r.fGrid}>
              {findings.map((fd, i) => (
                <li key={i}>
                  <a href={`#ch${fd.ch}`} className={r.fCard}>
                    <span className={r.fN}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={r.fText}>{fd.text}</span>
                    <span className={r.fGo}>Chapter {fd.ch} &rarr;</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {chapters.map((c) => (
            <section key={c.id} id={c.id} className={r.chapter}>
              <div className={r.chHead}>
                <span className={r.chN}>Chapter {c.n}</span>
                <h2 className={r.h2}>{c.title}</h2>
              </div>
              {c.lede.map((b, i) =>
                "p" in b ? (
                  <p key={i} className={r.lede}>
                    {b.p}
                  </p>
                ) : (
                  <BlockView key={i} b={b} />
                ),
              )}
              {c.subs.map((s) => (
                <div key={s.n} className={r.sub} id={`s${s.n.replace(".", "-")}`}>
                  <h3 className={r.h3}>
                    <span className={r.subN}>{s.n}</span>
                    {s.title}
                  </h3>
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} b={b} />
                  ))}
                </div>
              ))}
            </section>
          ))}

          <section id="join" className={r.join}>
            <div>
              <span className={r.eyebrow}>Get full access, free</span>
              <h2 className={r.h2}>Every ad behind this report, and the next one first</h2>
              <p className={r.p}>A free account opens the full tables and the downloads. The December issue comes to you when it&rsquo;s ready.</p>
            </div>
            <AccessForm want="report" item="the-ad-audit-2026-q3" className={r.joinForm} doneClassName={r.p} done="You're in. The tables are yours, and the next issue comes to you the day it lands." />
          </section>

          <section id="method" className={r.chapter}>
            <div className={r.chHead}>
              <span className={r.chN}>Method</span>
              <h2 className={r.h2}>How we did it</h2>
            </div>
            {C.method.map((m, i) => (
              <details key={m.k} className={r.meth} open={i === 0}>
                <summary>
                  <span>{m.k}</span>
                  <em>open</em>
                </summary>
                <p className={r.small}>{m.t}</p>
              </details>
            ))}
            <Link href="/resources/the-ad-audit/2026-q3" className={r.back}>
              &larr; The first draft
            </Link>
          </section>
        </main>
      </div>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
