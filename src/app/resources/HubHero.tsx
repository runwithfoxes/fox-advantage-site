"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./hero.module.css";
import ResourcesMenu from "./ResourcesMenu";

/**
 * THE HUB'S HEADER. Paul, 24 Sep 2026: "take the header from the geo ireland website and have
 * that as our overall top of our page. Title is 'Ireland and AI'... Add a login and email
 * capture on the image if you can."
 *
 * The film and poster are the GEO Ireland cover (the cliffs, the fox looking out to sea),
 * copied from the box starter's public/rwf/world. Over photography the logo and nav go white,
 * per the brand spec. The glass panel follows the GEO hero's question paper.
 *
 * ⛔ MOCKUP: both forms post nowhere. No Klaviyo, no Attio, no course signup route.
 */
export type Line = { label: string; title: string; href?: string };

export type Counts = { series: number; reports: number; trackers: number; datasets: number; tools: number; playbooks: number; rows: number };

export default function HubHero({ lines, counts }: { lines: Line[]; counts?: Counts }) {
  const [done, setDone] = useState(false);

  return (
    <section className={s.hero} id="top">
      <video className={s.film} autoPlay muted loop playsInline poster="/resources/hero-cliff.jpg" src="/resources/hero-cliff.mp4" />
      <header className={s.nav}>
        <Link href="/" className={s.logo}>
          /Runwithfoxes
        </Link>
        <nav className={s.links}>
          <ResourcesMenu counts={counts} />
          <a href="#" className={s.signin}>
            /sign in
          </a>
        </nav>
      </header>

      <div className={s.inner}>
        <div className={s.text}>
          {/* Paul, 25 Sep, on the homepage pill: "Less is more." No pill here either. */}
          <h1 className={s.title}>Ireland and AI</h1>
          <p className={s.sub}>
            Research, trackers, datasets, tools, playbooks and a free course on what AI is doing to
            marketing, measured in Ireland first.
          </p>
          {counts ? (
            <p className={s.stamp}>{counts.reports} reports · {counts.trackers} trackers · {counts.datasets} datasets · {counts.tools} tools · {counts.playbooks} playbooks</p>
          ) : null}
        </div>

        {/* The GEO hero's question paper, holding our research instead of questions. Same
            scroll: 160s for one pass, paused on hover. Links not ready yet go to "#".
            Paul, 26 Sep, on his phone: the card comes off the hero on a phone. Hidden here at
            700px and under; the still copy below the film takes its place. */}
        <div className={`${s.panel} ${s.panelWide}`}>
          <div className={s.head}>
            <span className={s.headLab}>Research</span>
            <span className={s.headSub}>Reports and papers</span>
            <span className={s.headCount}>{lines.length} pieces</span>
          </div>
          <div className={s.scroll}>
            <div className={s.scrollInner}>
              {[...lines, ...lines].map((l, i) => (
                <a key={i} className={s.line} href={l.href ?? "#"} aria-hidden={i >= lines.length ? true : undefined} tabIndex={i >= lines.length ? -1 : undefined}>
                  <span className={s.lineLab}>{l.label}</span>
                  <span className={s.lineT}>{l.title}</span>
                </a>
              ))}
            </div>
          </div>
          {done ? (
            <p className={s.done}>You are on the list.</p>
          ) : (
            <form
              className={s.join}
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <input id="hub-email" type="email" required placeholder="Get new research: you@company.ie" aria-label="Work email" />
              <button type="submit" aria-label="Send me new research">→</button>
            </form>
          )}
        </div>
      </div>
      {/* Phone only: the same research, as a still solid list under the film. No scroll, no glass. */}
      <div className={s.panelPhone}>
        <div className={s.head}>
          <span className={s.headLab}>Research</span>
          <span className={s.headSub}>Reports and papers</span>
          <span className={s.headCount}>{lines.length} pieces</span>
        </div>
        <div className={s.still}>
          {lines.slice(0, 6).map((l, i) => (
            <a key={i} className={s.line} href={l.href ?? "#"}>
              <span className={s.lineLab}>{l.label}</span>
              <span className={s.lineT}>{l.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
