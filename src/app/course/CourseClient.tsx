"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, isLive } from "./courseModules";
import ModuleArtefact from "./ModuleArtefact";
import CourseSignup from "./CourseSignup";
import ShareRow, { CopyModuleLink } from "./ShareRow";
import {
  ASK,
  BIO_LINES,
  BIO_NAME,
  CARD_ACTION,
  COURSE_URL,
  HERO,
  MODULE_BLURBS,
  SHARE,
  STRIP,
} from "./courseCopy";

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
    /* ⭐ THE ID IS WHAT MAKES THE PAGE FORWARDABLE IN PIECES. Added 20 Jul. Before it,
       the only two ids on the whole page were #top and #about, so there was no way for
       anyone to send a colleague one module rather than the entire course. The copy
       control in the card foot hands out this anchor.
       ⚠️ .co-card needs scroll-margin-top to clear the fixed nav, or an arriving link
       parks the card under it. That rule is in the .co- block in globals.css. */
    <article id={"m" + m.n} className={"co-card" + (live ? "" : " soon") + (open ? " open" : "")}>
      {/* window chrome - drawn the way a real window looks. Decorative here. */}
      <div className="co-chrome">
        <i className="r" />
        <i className="y" />
        <i className="g" />
        <span className="co-chrome-name">Module {m.n}</span>
      </div>

      {/* ⭐ THE WHOLE CARD BODY IS THE TAP TARGET, not just the link.
          BRIEF-A §3 says "clicking a module card asks for the signup", and until now
          only the small text link did. On a phone that is a 13px line inside a 611px
          card, which is a poor target for the page's main conversion. The link stays
          as the visible affordance and as the keyboard control; the body just widens
          what counts as a tap.
          The ask panel is OUTSIDE this div on purpose - a click inside it must never
          toggle the card shut while someone is typing into the form. */}
      <div
        className="co-cardbody"
        onClick={(e) => {
          /* the button handles its own click; without this it would fire twice and
             cancel itself out */
          /* the copy control is inside the body, so without it here a click would copy
             the link AND toggle the card, which reads as the page misfiring */
          if ((e.target as HTMLElement).closest(".co-cardaction, .co-copylink")) return;
          onToggle();
        }}
      >
        <div className="co-cardinfo">
          <h3 className="co-cardtitle">{m.title}</h3>
          <p>{blurb}</p>

          <div className="co-cardfoot">
            <span className="co-badge">{live ? "Live" : "Coming"}</span>
            <span className="co-when">{live ? "Open now" : `Opens ${m.when}`}</span>
            {/* hard right, out of the reading path. One control, not a share cluster. */}
            <CopyModuleLink n={m.n} />
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
            {ASK.cardLine.replace("{when}", m.when).replace("{title}", m.title)}
          </p>
          <CourseSignup
            source="card"
            module={m.n}
            lands={m.on}
            compact
            /* ⭐ THE SHARE CONTROLS LIVE IN THE CONFIRMATION, NOT ON THE PAGE FACE.
               Somebody who has just signed up is the most likely person on the page to
               pass it on, and showing it only here means nobody sees a share prompt
               before they have done the thing the page is for. It carries the MODULE
               anchor, because they signed up for this module specifically. */
            doneText={
              <>
                {ASK.cardDone.replace("{when}", m.when).replace("{title}", m.title)}
                <ShareRow url={`${COURSE_URL}#m${m.n}`} lead={SHARE.lead} compact />
              </>
            }
          />
        </div>
      ) : null}
    </article>
  );
}

/* ⛔ THE QUESTIONS BLOCK WAS DELETED IN FULL, 19 Jul. Reasoning is in courseCopy.ts
   so it does not creep back. If real questions arrive from real signups, it gets
   rebuilt from their actual wording. */

/* ---------------------------------------------------------------- the page */

export default function CourseClient() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  /**
   * 🔴 THE BROWSER DOES NOT HONOUR #m4 ON A COLD LOAD, AND THIS SHIPPED BROKEN.
   * Measured on the live domain 20 Jul: hash "#m4", the card 1669px down the page,
   * scroll-margin-top correctly computed at 96px, and window.scrollY sitting at 3.
   * Next's App Router restores scroll to the top during hydration and the native
   * anchor jump is lost.
   *
   * ⚠️ HOW IT GOT PAST VERIFICATION, worth more than the fix: it was "tested" by
   * loading /course and THEN navigating to /course#m4. That is a same-document hash
   * jump, which always works and exercises none of this. The case that matters is the
   * COLD load, because that is what the person receiving a copied link does. A test
   * that cannot fail is not a test.
   *
   * 🔴 behavior:"instant" IS LOAD-BEARING, DO NOT DROP IT. globals.css sets
   * scroll-behavior:smooth on html, so a bare scrollIntoView() starts a SMOOTH
   * ANIMATION rather than jumping. On a cold load that animation is competing with
   * hydration and never survives it, which is why the first attempt at this fix still
   * left scrollY at 0. Measured: window.scrollTo(0,1672) read back as 3 mid-animation,
   * while scrollIntoView({behavior:"instant"}) landed at 1576 immediately, which is
   * 1672 minus the 96px scroll-margin-top. Smooth is right for a click on the page and
   * wrong for arriving at an address.
   *
   * Two passes on purpose. The first lands it; the second corrects for the module
   * artefacts finishing their layout underneath and shifting the target.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!/^m[1-6]$/.test(id)) return;
    const el = document.getElementById(id);
    if (!el) return;
    const jump = () => el.scrollIntoView({ behavior: "instant", block: "start" });
    jump();
    const t = setTimeout(jump, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
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

        <header className="co-hero wrap" id="top">
          <h1 className="co-h1">{HERO.headline}</h1>

          <p>{HERO.sub}</p>

          <div className="co-herojoin">
            <CourseSignup
              source="hero"
              /* 🔴 THE SHARE ROW APPEARS ONLY AFTER SIGNUP, NEVER BESIDE THE PILL. Paul,
                 19 Jul: "as few things on as possible so that people can just see it and
                 sign up." A share cluster above the fold competes with the one thing the
                 hero exists to do. This replaces the pill once it has done its job, so
                 the hero at rest is unchanged. */
              doneText={
                <>
                  {ASK.heroDone}
                  <ShareRow url={COURSE_URL} lead={SHARE.lead} />
                </>
              }
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
              doneText={
                <>
                  {ASK.heroDone}
                  <ShareRow url={COURSE_URL} lead={SHARE.lead} />
                </>
              }
              note={
                <span className="co-joinnote">{ASK.footLine}</span>
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
    </>
  );
}
