import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import C from "./copy.json";
import { FigWin, Fig, Stats } from "./Charts";
import { Rail } from "../../the-ai-ask/2026-q3/Parts";
import fr from "../../front.module.css";
import h from "../../hero.module.css";
import n from "../../../home-next/next.module.css";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import w from "./paper.module.css";

export const metadata: Metadata = {
  title: "The Winning Paper (draft) | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * THE WINNING PAPER, OCTOBER 2026. A PREVIEW FOR PAUL, NOT FOR THE LIVE SITE. Paul, 3 Oct: "Can
 * dray put this onto our website so i can see in situ but not pushed live?" Sam's report in the AI
 * Ask's shape: the hero, the byline, the rail, findings as cards, numbered figures in windows.
 *
 * copy.json and charts.json are written by scripts/resources/winning-paper-copy.py from Sam's page,
 * never typed, because Sam is still rebuilding it. The page is on no list: not in the catalogue,
 * the library, the reports index, the menu or the PDF build, and it has no sign-up form.
 * The hero picture is a stand-in (the AI Ask's last frame) until this report has its own cover.
 */

type FigBase = { kind: string; no: string; title: string; cap: string };
type Block = { p: string } | ({ held: string; label: string }) | ({ fig: string; alt: string } & FigBase) | ({ stats: { v: string; l: string }[] } & FigBase);

function BlockView({ b, lede }: { b: Block; lede?: boolean }) {
  if ("p" in b) return <p className={lede ? r.lede : r.p}>{b.p}</p>;
  if ("held" in b)
    return (
      <div className={w.held}>
        <span className={w.heldLab}>{b.label}</span>
        {b.held}
      </div>
    );
  if ("stats" in b)
    return (
      <FigWin id={`f${b.no.replace(".", "")}`} kind={b.kind} n={b.no} title={b.title} cap={b.cap}>
        <Stats items={b.stats} />
      </FigWin>
    );
  return (
    <FigWin id={b.fig} kind={b.kind} n={b.no} title={b.title} cap={b.cap}>
      <Fig id={b.fig} alt={b.alt} />
    </FigWin>
  );
}

export default function WinningPaper() {
  const chapters = C.chapters as { id: string; n: number; title: string; lede: Block[]; subs: { n: string; title: string; blocks: Block[] }[] }[];
  // Sam's "What we found:" line is the findings heading here, so it is not printed twice.
  const intro = (C.intro as Block[]).filter((b) => !("p" in b && /^What we found:?$/.test(b.p)));
  const findings = C.findings.map((f) => ({ ch: f.ch, text: f.text.replace(/\s*\(Chapter \d+\)\.?$/, ".") }));
  const [date, ...who] = C.meta.byline.split(" · ");
  const author = who.join(" · ");
  const words = [...intro, ...chapters.flatMap((c) => [...c.lede, ...c.subs.flatMap((s) => s.blocks)])].map((b) => ("p" in b ? b.p : "")).join(" ");
  const mins = Math.round(words.split(/\s+/).length / 230);
  // The headline, split at Sam's colon: the report's name, then what it tells you.
  const cut = C.meta.h1.indexOf(": ");
  const heroTitle = cut > 0 ? C.meta.h1.slice(0, cut + 1) : C.meta.h1;
  const heroHl = cut > 0 ? C.meta.h1.slice(cut + 2) : "";
  const methodTitle = C.methodTitle.split(" · ").pop() as string;
  const rail = [
    { id: "intro", k: "", t: "Introduction" },
    { id: "findings", k: "", t: "What we found" },
    ...chapters.map((c) => ({ id: c.id, k: String(c.n), t: c.title })),
    { id: "how", k: "", t: methodTitle },
  ];

  return (
    <div className={`${fr.page} ${r.page}`}>
      <section className={`${h.hero} ${r.heroR}`} id="top">
        <img className={h.film} src="/resources/fox-hero-flip-last-frame.jpg" alt="" style={{ objectPosition: "50% 70%" }} />
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

      <div className={r.draft}>Preview for Paul. Sam&rsquo;s text, still changing, no second check yet. Not approved for the live site.</div>

      <div className={r.body}>
        <aside className={r.railCol}>
          <Rail items={rail} />
        </aside>

        <main className={r.main} id="report-main">
          <header className={`${r.mast} ${w.introGap}`} id="intro">
            <div className={r.mastMain}>
              <div className={r.who}>
                <span className={r.whoFaces}>
                  <i className={r.byMark}>S</i>
                  <img className={r.whoImg} src="/Paul_photo.jpg" alt="Paul Dervan" />
                </span>
                <span className={r.whoText}>
                  <span className={r.whoLine}>
                    <span>{author}</span>
                  </span>
                  <span className={`${r.whoLine} ${r.whoMeta}`}>
                    <span>{date}</span>
                    <span className={r.byDot}>·</span>
                    <span>{mins} min read</span>
                  </span>
                </span>
              </div>
              {intro.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>
          </header>

          <section className={r.findings} id="findings">
            <div className={r.fHead}>
              <h2 className={r.h2s}>What we found</h2>
              <span className={r.fSub}>{findings.length} findings, each one a chapter</span>
            </div>
            <ol className={r.fGrid}>
              {findings.map((fd, i) => (
                <li key={i}>
                  <a href={`#c${fd.ch}`} className={r.fCard}>
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
              {c.lede.map((b, i) => (
                <BlockView key={i} b={b} lede />
              ))}
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

          <section id="how" className={r.chapter}>
            <div className={r.chHead}>
              <span className={r.chN}>Method</span>
              <h2 className={r.h2}>{methodTitle}</h2>
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
          </section>
        </main>
      </div>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
