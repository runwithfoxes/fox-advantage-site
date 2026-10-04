import type React from "react";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import C from "./copy.json";
import { FigWin, Fig, Stats } from "./Charts";
import Checklist, { type Check } from "./Checklist";
import { Opener, PullBand, Wall, Plate, ColumnArt, type Pic, type Tone } from "./Big";
import ART from "./art.json";
import { Hl, Rail } from "../../the-ai-ask/2026-q3/Parts";
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
 * Ask's shape: the hero, the byline, the rail, numbered figures in windows. Then, at Paul's word the
 * same night ("Make it more active... here is your checklist... Let's move this from dry academic to
 * the colourful run with foxes feel"), a checklist sheet up front, a Do this line on each chapter,
 * public Irish cases quoted with their campaign pictures, and named cases worth reading.
 *
 * copy.json and charts.json are written by scripts/resources/winning-paper-copy.py from Sam's page,
 * never typed, because Sam is still rebuilding it. The page is on no list: not in the catalogue,
 * the library, the reports index, the menu or the PDF build, and it has no sign-up form.
 * The hero picture is a stand-in (the AI Ask's last frame) until this report has its own cover.
 */

type FigBase = { kind: string; no: string; title: string; cap: string };
type Link = { t: string; href: string };
type Line = { key: string; q: string; brand: string; award: string };
type CaseB = { case: string; quote: string; brand: string; award: string; why: string; href?: string; link?: string };
type Block =
  | { do: string; label: string }
  | CaseB
  | { lines: Line[] }
  | { named: { brand: string; award: string; text: string }[]; title: string }
  | { p: string; hl?: string; pull?: string; links?: Link[] }
  | { told: string; brand: string; award: string; tags: string[]; paras: { p: string; links?: Link[] }[] }
  | { held: string; label: string }
  | ({ fig: string; alt: string } & FigBase)
  | ({ stats: { v: string; l: string }[] } & FigBase);
type Chapter = { id: string; n: number; title: string; lede: Block[]; subs: { n: string; title: string; blocks: Block[] }[] };

/* THE PICTURES. Chosen and placed by hand in art.json (Paul, 4 Oct: "be an art director... be
   selective... Curate"). Nothing fills a slot by rule. Each entry names the file, its crop's focal
   point and the line under it; where each file came from is in cases/SOURCES.json beside the files.
   hero: the top of the page. openers: by chapter number. pulls: by chapter number, the ad beside
   that chapter's pull line. bands: by case key, a quoted case shown with its ad. plates: by
   sub-section number, one ad across the window before that sub-section opens. */
const A = ART as unknown as { hero?: Pic | null; openers: Record<string, Pic>; pulls: Record<string, Pic>; bands: Record<string, Pic>; plates: Record<string, Pic> };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const TONES: Tone[] = ["navy", "sky", "orange"];
function plan(chapters: Chapter[]) {
  const opener = new Map<number, Pic>();
  const pull = new Map<Block, Pic>();
  const band = new Map<Block, Pic>();
  for (const c of chapters) {
    if (A.openers[c.n]) opener.set(c.n, A.openers[c.n]);
    for (const bl of [...c.lede, ...c.subs.flatMap((s) => s.blocks)]) {
      if ("p" in bl && bl.pull && A.pulls[c.n] && ![...pull.values()].includes(A.pulls[c.n])) pull.set(bl, A.pulls[c.n]);
      if ("case" in bl && A.bands[bl.case]) band.set(bl, A.bands[bl.case]);
    }
  }
  return { opener, pull, band };
}
/* Where in a chapter a campaign is quoted or named, so the picture at the top of the chapter can
   point to it (Paul, 4 Oct: "It's odd to talk about cases and not talk about them"). */
function quotedIn(c: Chapter, brand?: string) {
  if (!brand) return undefined;
  const has = (bl: Block) => ("case" in bl && norm(bl.brand) === norm(brand)) || ("lines" in bl && bl.lines.some((l) => norm(l.brand) === norm(brand))) || ("named" in bl && bl.named.some((x) => norm(x.brand) === norm(brand)));
  const s = c.subs.find((x) => x.blocks.some(has));
  if (s) return { n: s.n, href: `#s${s.n.replace(".", "-")}` };
  return c.lede.some(has) ? { n: "this chapter", href: `#${c.id}` } : undefined;
}
type Plan = ReturnType<typeof plan>;

/* A paragraph's words, with any public paper it names as a plain link inside the sentence. */
function Words({ t, links }: { t: string; links?: Link[] }) {
  if (!links?.length) return <>{t}</>;
  const out: React.ReactNode[] = [];
  let rest = t;
  links.forEach((l, i) => {
    const at = rest.indexOf(l.t);
    if (at < 0) return;
    out.push(rest.slice(0, at));
    out.push(
      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className={w.inlineLink}>
        {l.t}
      </a>,
    );
    rest = rest.slice(at + l.t.length);
  });
  out.push(rest);
  return <>{out}</>;
}

function Para({ b, lede }: { b: { p: string; hl?: string; links?: Link[] }; lede?: boolean }) {
  // a marked line gets the AI Ask's marker, swept in behind the words the first time it is seen
  const at = b.hl ? b.p.indexOf(b.hl) : -1;
  if (!b.p.trim()) return null;
  return (
    <p className={lede ? r.lede : r.p}>
      {at < 0 || !b.hl ? (
        <Words t={b.p} links={b.links} />
      ) : (
        <>
          {b.p.slice(0, at)}
          <Hl>{b.hl}</Hl>
          {b.p.slice(at + b.hl.length)}
        </>
      )}
    </p>
  );
}

function BlockView({ b, lede, pl, i }: { b: Block; lede?: boolean; pl: Plan; i: number }) {
  if ("told" in b) {
    // A case told properly (Paul, 4 Oct: "you can't do a report talking about brilliant case studies
    // without talking about some of the case studies for illumination"). No box: a rule, the brand,
    // its ad where there is a good one, and the telling in the report's own type.
    const pic = A.bands[b.told];
    return (
      <section className={w.told}>
        <header className={w.toldHead}>
          <span className={w.toldKick}>The case</span>
          <h4 className={w.toldBrand}>{b.brand}</h4>
          <span className={w.toldTags}>{[b.award, ...b.tags].join(" · ")}</span>
        </header>
        {pic ? <ColumnArt pic={pic} /> : null}
        {b.paras.map((x, k) => (
          <Para key={k} b={x} />
        ))}
      </section>
    );
  }
  if ("do" in b)
    return (
      <p className={w.doThis}>
        <span className={w.doLab}>{b.label}</span>
        {b.do}
      </p>
    );
  if ("lines" in b) return <Wall items={b.lines} tone={b.lines.length > 9 ? "navy" : b.lines.length > 4 ? "white" : "sky"} />;
  if ("case" in b) {
    const pic = pl.band.get(b);
    // the ad sits with the case the report is quoting, in the column, and the case is named under it
    return (
      <>
      {pic ? <ColumnArt pic={pic} /> : null}
      <figure className={`${w.caseCard} ${w.caseWords}`}>
        <div className={w.caseBody}>
          <blockquote className={w.caseQuote}>{b.quote}</blockquote>
          <figcaption className={w.caseWhy}>
            <span className={w.caseTag}>
              <b>{b.brand}</b>
              <em>{b.award}</em>
            </span>
            {b.why ? <span>{b.why} </span> : null}
            {b.href ? (
              <a href={b.href} target="_blank" rel="noopener noreferrer" className={w.caseLink}>
                {b.link} &rarr;
              </a>
            ) : null}
          </figcaption>
        </div>
      </figure>
      </>
    );
  }
  if ("named" in b)
    return (
      <aside className={w.named}>
        <span className={w.namedHead}>{b.title}</span>
        <ul>
          {b.named.map((c) => {
            return (
            <li key={c.brand + c.award}>
              <span className={w.namedWho}>
                <b>{c.brand}</b>
                <em>{c.award}</em>
              </span>
              <span className={w.namedText}>{c.text}</span>
            </li>
            );
          })}
        </ul>
      </aside>
    );
  if ("p" in b) {
    if (!b.pull) return <Para b={b} lede={lede} />;
    // the pull line is lifted out of its paragraph and set large where it stood, so it is said once
    const at = b.p.indexOf(b.pull);
    return (
      <>
        <Para b={{ p: b.p.slice(0, at) }} lede={lede} />
        <PullBand text={b.pull} tone={TONES[(i + 1) % 3]} pic={pl.pull.get(b)} flip={i % 2 === 0} />
        <Para b={{ p: b.p.slice(at + b.pull.length), links: b.links }} lede={lede} />
      </>
    );
  }
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
  const chapters = C.chapters as unknown as Chapter[];
  const pl = plan(chapters);
  const intro = C.intro as Block[];
  const check = C.checklist as Check;
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
    { id: "checklist", k: "", t: check.title },
    ...chapters.map((c) => ({ id: c.id, k: String(c.n), t: c.title })),
    { id: "how", k: "", t: methodTitle },
  ];

  return (
    <div className={`${fr.page} ${r.page} ${w.clip}`}>
      <section className={`${h.hero} ${r.heroR}`} id="top">
        {/* one ad from the papers, chosen by hand; the fox on the beach stands in when none is set */}
        <img className={h.film} src={A.hero ? `/resources/the-winning-paper/2026-10/cases/${A.hero.file}` : "/resources/fox-hero-flip-last-frame.jpg"} alt={A.hero?.label ?? ""} style={{ objectPosition: A.hero?.pos ?? "50% 70%" }} />
        {A.hero ? <span style={{ position: "absolute", right: 16, bottom: 10, zIndex: 2, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".04em", color: "rgba(255,255,255,.62)" }}>{A.hero.label}</span> : null}
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

      <div className={r.draft}>Preview for Paul. Sam&rsquo;s text, checked by Cato. Not approved for the live site.</div>

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
                <BlockView key={i} b={b} pl={pl} i={i} />
              ))}
            </div>
          </header>

          <Checklist c={check} />

          {chapters.map((c, ci) => {
            const doB = c.lede.find((b) => "do" in b) as { do: string; label: string } | undefined;
            return (
              <section key={c.id} className={w.chap}>
                <Opener id={c.id} n={c.n} title={c.title} label={doB?.label} doThis={doB?.do} pic={pl.opener.get(c.n)?.fit === "bleed" ? pl.opener.get(c.n) : undefined} tone={TONES[ci % 3]} />
                {pl.opener.get(c.n) && pl.opener.get(c.n)?.fit !== "bleed" ? <ColumnArt pic={pl.opener.get(c.n) as Pic} eager={c.n === 1} where={quotedIn(c, pl.opener.get(c.n)?.brand)} /> : null}
                {c.lede
                  .filter((b) => !("do" in b))
                  .map((b, i) => (
                    <BlockView key={i} b={b} lede pl={pl} i={ci + i} />
                  ))}
                {c.subs.map((s, si) => (
                  <div key={s.n} className={r.sub} id={`s${s.n.replace(".", "-")}`}>
                    {A.plates[s.n] ? <Plate pic={A.plates[s.n]} /> : null}
                    <h3 className={r.h3}>
                      <span className={r.subN}>{s.n}</span>
                      {s.title}
                    </h3>
                    {s.blocks.map((b, i) => (
                      <BlockView key={i} b={b} pl={pl} i={ci + si + i} />
                    ))}
                  </div>
                ))}
              </section>
            );
          })}

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
