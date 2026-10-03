import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import C from "./copy.json";
import { FigWin, Fig, Stats } from "./Charts";
import Checklist, { type Check } from "./Checklist";
import { Opener, PullBand, CaseBand, Wall, type Pic, type Tone } from "./Big";
import PICS from "../../../../../public/resources/the-winning-paper/2026-10/cases/SOURCES.json";
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
type Line = { key: string; q: string; brand: string; award: string };
type CaseB = { case: string; quote: string; brand: string; award: string; why: string; href?: string; link?: string };
type Block =
  | { do: string; label: string }
  | CaseB
  | { lines: Line[] }
  | { named: { brand: string; award: string; text: string }[]; title: string }
  | { p: string; hl?: string; pull?: string }
  | { held: string; label: string }
  | ({ fig: string; alt: string } & FigBase)
  | ({ stats: { v: string; l: string }[] } & FigBase);
type Chapter = { id: string; n: number; title: string; lede: Block[]; subs: { n: string; title: string; blocks: Block[] }[] };

/* THE PICTURES. Each one is a campaign the report quotes or names, from a public source listed in
   cases/SOURCES.json. A picture is matched to a case by the case's key, or by the brand's name. */
const PICTURES = PICS.pictures as unknown as Pic[];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const picsFor = (key: string, brand: string) => PICTURES.filter((x) => x.id === key || norm(x.brand) === norm(brand) || (x.aliases ?? []).some((al) => norm(al) === norm(brand)));
const wide = (x: Pic) => x.size[0] / x.size[1] >= 1.25;

/* Where each picture goes, worked out once so no picture is shown twice. First every chapter's
   opener takes a wide picture of a campaign that chapter quotes or names. Then a quoted case with a
   picture left gets a band of its own, a named case gets its picture beside its line, and a wall of
   lines takes what remains. A brand can hold more than one still, so it can open one chapter and
   sit on a tile in another. */
const TONES: Tone[] = ["navy", "sky", "orange"];
function plan(chapters: Chapter[]) {
  const used = new Set<string>();
  const opener = new Map<number, Pic>();
  const band = new Map<Block, Pic>();
  const tile = new Map<string, Pic>();
  const take = (xs: Pic[], ok: (x: Pic) => boolean = () => true) => {
    const x = xs.find((c) => !used.has(c.id) && ok(c));
    if (x) used.add(x.id);
    return x;
  };
  const all = (c: Chapter) => [...c.lede, ...c.subs.flatMap((s) => s.blocks)];
  for (const c of chapters) {
    for (const bl of all(c)) {
      const cands = "case" in bl ? [picsFor(bl.case, bl.brand)] : "lines" in bl ? bl.lines.map((l) => picsFor(l.key, l.brand)) : "named" in bl ? bl.named.map((x) => picsFor("", x.brand)) : [];
      const got = cands.map((xs) => xs.find((x) => !used.has(x.id) && wide(x))).find(Boolean);
      if (got) {
        used.add(got.id);
        opener.set(c.n, got);
        break;
      }
    }
  }
  for (const c of chapters)
    for (const bl of all(c))
      if ("case" in bl) {
        const got = take(picsFor(bl.case, bl.brand));
        if (got) band.set(bl, got);
      }
  for (const c of chapters)
    for (const bl of all(c))
      if ("named" in bl)
        for (const x of bl.named) {
          const got = take(picsFor("", x.brand));
          if (got) tile.set("named:" + x.brand + x.award, got);
        }
  for (const c of chapters)
    for (const bl of all(c))
      if ("lines" in bl)
        for (const l of bl.lines) {
          const got = take(picsFor(l.key, l.brand));
          if (got) tile.set(l.key, got);
        }
  return { opener, band, tile };
}
type Plan = ReturnType<typeof plan>;

function Para({ b, lede }: { b: { p: string; hl?: string }; lede?: boolean }) {
  // a marked line gets the AI Ask's marker, swept in behind the words the first time it is seen
  const at = b.hl ? b.p.indexOf(b.hl) : -1;
  if (!b.p.trim()) return null;
  return (
    <p className={lede ? r.lede : r.p}>
      {at < 0 || !b.hl ? (
        b.p
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
  if ("do" in b)
    return (
      <p className={w.doThis}>
        <span className={w.doLab}>{b.label}</span>
        {b.do}
      </p>
    );
  if ("lines" in b) return <Wall items={b.lines} pics={(key) => pl.tile.get(key)} tone={b.lines.length > 9 ? "navy" : b.lines.length > 4 ? "white" : "sky"} />;
  if ("case" in b) {
    const pic = pl.band.get(b);
    if (pic) return <CaseBand pic={pic} brand={b.brand} award={b.award} quote={b.quote} why={b.why} href={b.href} link={b.link} tone={TONES[i % 3]} flip={i % 2 === 1} />;
    return (
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
    );
  }
  if ("named" in b)
    return (
      <aside className={w.named}>
        <span className={w.namedHead}>{b.title}</span>
        <ul>
          {b.named.map((c) => {
            const pic = pl.tile.get("named:" + c.brand + c.award);
            return (
            <li key={c.brand + c.award} className={pic ? w.namedPic : undefined}>
              {pic ? <img src={`/resources/the-winning-paper/2026-10/cases/${pic.file}`} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading="lazy" /> : null}
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
        <PullBand text={b.pull} tone={TONES[(i + 1) % 3]} />
        <Para b={{ p: b.p.slice(at + b.pull.length) }} lede={lede} />
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
                <BlockView key={i} b={b} pl={pl} i={i} />
              ))}
            </div>
          </header>

          <Checklist c={check} />

          {chapters.map((c, ci) => {
            const doB = c.lede.find((b) => "do" in b) as { do: string; label: string } | undefined;
            return (
              <section key={c.id} className={w.chap}>
                <Opener id={c.id} n={c.n} title={c.title} label={doB?.label} doThis={doB?.do} pic={pl.opener.get(c.n)} tone={TONES[ci % 3]} />
                {c.lede
                  .filter((b) => !("do" in b))
                  .map((b, i) => (
                    <BlockView key={i} b={b} lede pl={pl} i={ci + i} />
                  ))}
                {c.subs.map((s, si) => (
                  <div key={s.n} className={r.sub} id={`s${s.n.replace(".", "-")}`}>
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
