"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MODULES, isLive } from "./courseModules";
import ModuleArtefact from "./ModuleArtefact";
import CourseSignup from "./CourseSignup";
import { MarksContext, Ph } from "./Ph";
import { ASK, BIO_LINES, BIO_NAME, CARD_ACTION, FORMATS, HERO, MODULE_BLURBS, QUESTIONS, STRIP } from "./placeholderCopy";
import type { Placeholder } from "./placeholderCopy";

/**
 * /course - THE COURSE HOME PAGE.
 *
 * REBUILT 19 Jul 2026 to the wireframe Paul drew that morning (BRIEF-A §3). It
 * replaces the draggable board that shipped on 18 Jul.
 *
 * WHY IT CHANGED, in Paul's words: "it lacked a sense of what is this about? Why
 * should I do it? It was visually interesting but it didn't sell the course to me,"
 * and "it doesn't feel like a course landing page, it feels like a random bunch of
 * buttons."
 *
 * The diagnosis: the six artefact cards were being asked to be the evidence AND the
 * argument at once. The reference pages (anthropic.com/academy, Coursera, Maven,
 * Reforge) separate the two jobs - the top of the page sells, and the curriculum
 * below it is quiet and does not try to. Ours had no selling layer at all.
 *
 * ⭐ THE TEST FOR ANYTHING ADDED HERE: WHERE DO THE WORDS GO?
 *
 * WHAT WENT, and it was all Paul's call on 19 Jul:
 *  - THE DRAG. "It doesn't have to be a grabbable card. That may be just theatre."
 *  - THE CONNECTORS AND THE SPRAWL. A card per row leaves nothing to join and nothing
 *    to arrange, so the serpentine composition, the wire docking maths and the whole
 *    of courseBoard.js go with them.
 *  - THE DETAIL PANEL that an earlier proposal put behind the click. Rejected, and the
 *    reasoning is the argument for the new card shape: the old square cards were mute,
 *    so a click had to explain something. The long card carries a sentence or two on
 *    its face, so the selling has already happened by the time anyone clicks. Putting
 *    reading in front of the action adds a step and gains nothing.
 *    CARD FACE SELLS, CLICK CONVERTS. There is no detail layer on this page.
 *
 * WHAT STAYED:
 *  - The window chrome with the three traffic lights, as house style. It runs through
 *    the homepage hero and the agent cards. Paul has explicitly accepted that here
 *    they are decorative rather than an affordance. Flagged to him, his call, closed.
 *  - The six artefacts, and the fabrication ban around them (see ModuleArtefact).
 *  - Uniformity: every card the same height and treatment.
 *
 * 🔴 NO FOX AND NO ILLUSTRATION IN THE HERO. Paul, 19 Jul, and his reasoning is the
 * design principle for the whole page: "I want to have as few things on as possible so
 * that people can just see it and sign up. Many will check out my website homepage
 * before they do anything, so they'll know where they are." THE OPEN SPACE BESIDE THE
 * TEXT IS THE DESIGN. Do not fill it.
 */

/* Marks default ON. The page is a wireframe carrying sample copy and it must not be
   possible to look at it and mistake it for the real thing by accident. */
const MARKS_DEFAULT = true;

function countPlaceholders(): number {
  const all: Placeholder[] = [
    HERO.sub,
    FORMATS,
    ...Object.values(MODULE_BLURBS),
    ...Object.values(ASK),
    ...QUESTIONS.map((q) => q.a),
  ];
  return all.length;
}

/* ---------------------------------------------------------------- module card */

function ModuleCard({
  m,
  open,
  onToggle,
}: {
  m: (typeof MODULES)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const live = isLive(m);
  const blurb = MODULE_BLURBS[m.n];

  /* ⚠️ THE POST-LAUNCH BRANCH, LEFT OBVIOUS AND UNWIRED ON PURPOSE (BRIEF-A §3).
     Before a module's date, the click asks for the email. AFTER it opens, the click
     should go to the module itself - the visitor may already be signed up and asking
     again would be daft. That destination is the module page, which TERMINAL C is
     designing and which does not exist yet, so this points at nothing rather than at
     a 404. The seam is A's link and C's page.
     `live` is false for all six today (nothing is built), so this branch cannot fire
     yet. It is here so that wiring it later is one href, not a redesign. */
  const MODULE_HREF: string | null = null;

  return (
    <article className={"co-card" + (live ? "" : " soon") + (open ? " open" : "")}>
      {/* window chrome - drawn the way a real window looks. Decorative here. */}
      <div className="co-chrome">
        <i className="r" />
        <i className="y" />
        <i className="g" />
        <span className="co-chrome-name">Module {m.n}</span>
      </div>

      <div className="co-cardbody">
        <div className="co-cardinfo">
          <h3 className="co-cardtitle">{m.title}</h3>
          <Ph v={blurb} as="p" />

          <div className="co-cardfoot">
            <span className="co-badge">{live ? "Live" : "Coming"}</span>
            <span className="co-when">{live ? "Open now" : `Opens ${m.when}`}</span>
          </div>

          {live && MODULE_HREF ? (
            <a className="co-cardaction" href={MODULE_HREF}>
              What&apos;s in it <span aria-hidden>→</span>
            </a>
          ) : (
            <button className="co-cardaction" type="button" onClick={onToggle} aria-expanded={open}>
              {CARD_ACTION} <span aria-hidden>→</span>
            </button>
          )}
        </div>

        <ModuleArtefact art={m.art} />
      </div>

      {/* THE ASK, SPECIFIC TO THIS MODULE.
          §3, requirement 1: it must not be a generic box that happens to sit nearby.
          It names the module the person just read, and it is what preserves the intent
          capture - signup_module is stored on first touch and cannot be reconstructed
          later. A generic panel would silently throw that away.
          Only one card is open at a time; with a short panel rather than a body of
          detail that still holds, and it keeps the page from filling with panels. */}
      {open ? (
        <div className="co-cardask">
          <p className="co-asklead">
            <Ph
              v={{
                ...ASK.cardLine,
                text: ASK.cardLine.text.replace("{when}", m.when).replace("{title}", m.title),
              }}
            />
          </p>
          <CourseSignup
            source="card"
            module={m.n}
            lands={m.on}
            compact
            doneText={
              <Ph
                v={{
                  ...ASK.cardDone,
                  text: ASK.cardDone.text.replace("{when}", m.when).replace("{title}", m.title),
                }}
              />
            }
          />
        </div>
      ) : null}
    </article>
  );
}

/* ---------------------------------------------------------------- questions */

function Questions() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="co-qs" id="questions">
      <h2 className="co-h2">Questions</h2>
      <div className="co-qlist">
        {QUESTIONS.map((item, i) => (
          <div className={"co-q" + (open === i ? " open" : "")} key={item.q}>
            <button type="button" className="co-qhead" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span>{item.q}</span>
              <span className="co-qmark" aria-hidden>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i ? (
              <div className="co-qbody">
                <Ph v={item.a} as="p" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- the page */

export default function CourseClient() {
  const [marks, setMarks] = useState(MARKS_DEFAULT);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const phCount = useMemo(countPlaceholders, []);

  return (
    <MarksContext.Provider value={marks}>
      {/*
        The site nav, copied from BookLanding.tsx rather than extracted into a shared
        component. This is the FOURTH copy of this markup on the site and that is a
        knowing choice, not an oversight. It carries hp-nav-scrolled from the top
        because the course page is cream, the same reason the homepage does it.

        ⚠️ IT SITS OUTSIDE .co-root DELIBERATELY. The course CSS is scoped under
        .co-root; when this nav was inside, the course page's own bare `nav` rule
        matched it and beat the site's `.hp-nav` on specificity - the logo rendered
        flush against the left edge, cut off. Keeping the nav outside the scope means
        the course CSS cannot reach it at all, which is a better fix than a
        counter-rule.
      */}
      <nav className="hp-nav hp-nav-scrolled" style={{ position: "fixed" }}>
        <Link href="/" className="hp-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <div className="hp-nav-links">
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/tools &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">MODULES</div>
                  <Link href="/#mod-effectiveness">Marketing effectiveness</Link>
                  <Link href="/#mod-segmentation">Segmentation</Link>
                  <Link href="/#mod-brand-strategy">Brand strategy</Link>
                  <Link href="/#mod-advertising">Advertising</Link>
                  <Link href="/#mod-studio">Studio</Link>
                  <Link href="/#mod-business-development">Business development</Link>
                  <Link href="/#mod-research">Research and insights</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/previous &#9662;</span>
            <div className="hp-mega">
              <div className="hp-projects-dropdown">
                <div className="hp-pd-label">CASE STUDIES</div>
                <Link href="/millionaire-raffle">Millionaire Raffle</Link>
                <Link href="/marketer-of-the-year">Marketer of the Year</Link>
                <Link href="/48">48</Link>
                <Link href="/run-with-foxes">Run with Foxes (book 1)</Link>
              </div>
            </div>
          </div>
          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-nav-cta">
            /contact
          </Link>
        </div>
      </nav>

      <div className="co-root">
        {/* BUILD-TIME AFFORDANCE, NOT PART OF THE DESIGN. It comes out the day the real
            copy lands. Marks on by default; off lets Paul judge rhythm and structure on
            a clean page. The count is rendered from the data, never typed. */}
        <div className="co-marksbar">
          <span className="co-marksnote">
            Wireframe. <b>{phCount}</b> pieces of copy on this page are not written yet.
          </span>
          <button type="button" className="co-marksbtn" onClick={() => setMarks(!marks)}>
            marks {marks ? "on" : "off"}
          </button>
        </div>

        <header className="co-hero wrap" id="top">
          <h1 className="co-h1">
            {HERO.headline[0]}
            <br />
            {HERO.headline[1]}
          </h1>

          <Ph v={HERO.sub} as="p" />

          <div className="co-herojoin">
            <CourseSignup
              source="hero"
              doneText={<Ph v={ASK.heroDone} />}
              note={<span className="co-joinnote">{HERO.freeNote}</span>}
            />
          </div>
        </header>

        {/* THE STRIP. One line, not a section. It answers how big this is and how long
            it runs before anyone scrolls - the Coursera reassurance device, compressed.
            Every item is a fact from canon, so it carries no placeholder mark. */}
        <div className="wrap">
          <div className="co-strip">
            {STRIP.map((s, i) => (
              <span key={s}>
                {i > 0 ? <i className="co-stripdot" aria-hidden /> : null}
                {s}
              </span>
            ))}
          </div>
        </div>

        <main className="wrap">
          <section className="co-modules">
            <div className="co-moduleshead">
              <h2 className="co-h2">The six modules</h2>
              {/* ⭐ THE MOST CONCRETE FACT THE COURSE OWNS, and until now it appeared on
                  no page anywhere. It is identical across all six modules, so it sits
                  once above them rather than six times inside them. */}
              <Ph v={FORMATS} as="p" />
            </div>

            {MODULES.map((m) => (
              <ModuleCard
                key={m.n}
                m={m}
                open={openCard === m.n}
                onToggle={() => setOpenCard(openCard === m.n ? null : m.n)}
              />
            ))}
          </section>

          <Questions />

          {/* PAUL'S BIO, AT THE BOTTOM AND SHORT. His reasoning: it is on the homepage
              already and this is not a big website. Do not build it into a feature. */}
          <section className="co-bio" id="about">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="co-biophoto" src="/Paul_photo.jpg" alt="Paul Dervan" />
            <div className="co-biotext">
              <span className="co-bioname">{BIO_NAME}</span>
              {BIO_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

          {/* THE PILL AGAIN. Paul's call, asked and answered. */}
          <section className="co-footjoin">
            <CourseSignup
              source="foot"
              doneText={<Ph v={ASK.heroDone} />}
              note={
                <span className="co-joinnote">
                  <Ph v={ASK.footLine} />
                </span>
              }
            />
          </section>
        </main>

        <div className="hp-bottom-bar hp-bb-visible">
          <a href="#top">#top</a>
          <a href="#about">#about</a>
          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-cta-bar">
            get in touch
          </Link>
        </div>
      </div>
    </MarksContext.Provider>
  );
}
