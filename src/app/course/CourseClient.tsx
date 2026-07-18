"use client";

import { useEffect } from "react";
import Link from "next/link";
import { initCourseBoard } from "./courseBoard";

/**
 * The course home page, ported from
 * lifecycle-agent/training-page/course-home-v2.html @ 89ea41e.
 *
 * The board (six draggable cards, the connectors that redraw on drag, the card
 * animations) is driven by the page's ORIGINAL script, kept verbatim in
 * ./courseBoard.js and run once on mount. That is deliberate - see the comment
 * at the top of that file. The cards are injected by that script, so this
 * component renders only the shell; there is nothing for React to hydrate
 * inside #board and therefore no hydration mismatch.
 */
export default function CourseClient() {
  useEffect(() => initCourseBoard(), []);

  return (
    <>
      {/*
        The site nav, copied from BookLanding.tsx rather than extracted into a
        shared component. This is the FOURTH copy of this markup on the site and
        that is a knowing choice, not an oversight: extracting it would mean
        editing HomePage.tsx the same day the agents hero shipped to production.
        Reasoning in COURSE-QA.md Q1 (nav-shape). It carries hp-nav-scrolled from
        the top because the course page is cream, the same reason the homepage
        does it since the hero landed.

        ⚠️ IT SITS OUTSIDE .co-root DELIBERATELY. The course page's own CSS
        includes a bare `nav { padding: 26px 0 }` rule. Scoped, that becomes
        `.co-root nav`, which matched this element when it was inside and beat
        the site's own `.hp-nav { padding: 14px 48px }` on specificity - the
        logo rendered flush against the left edge of the window, cut off. Keeping
        the nav outside the scope means the course CSS cannot reach it at all,
        which is a better fix than a counter-rule.
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
      <header className="hero wrap" id="top">
        <h1>
          AI fluency for
          <br />
          ambitious marketers.
        </h1>
        {/*
          Paul's words, 18 Jul, REVERSING the sub-line he deleted earlier the same
          day. The deleted line described the course; this one states THE DEAL -
          free, practical, non-hype - which is the one thing the artefact cards
          cannot say for themselves. "free", never "free forever".
        */}
        <p className="sub">
          A free, practical, non-hype AI fluency course for ambitious marketers.
        </p>

        <div className="join" id="join">
          <form className="join-bar" id="joinFields">
            <input type="text" placeholder="First name" required />
            <span className="sep"></span>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" aria-label="Join">
              &#8594;
            </button>
          </form>
          <span className="join-done">
            You&apos;re in. We&apos;ll tell you when module one opens.
          </span>
        </div>
      </header>

      <main className="wrap">
        <div className="board" id="board">
          <svg id="wires"></svg>
          {/* cards injected by courseBoard.js */}
        </div>
      </main>
      </div>
    </>
  );
}
