"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./hero.module.css";

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

export default function HubHero({ lines }: { lines: Line[] }) {
  const [done, setDone] = useState(false);

  return (
    <section className={s.hero}>
      <video className={s.film} autoPlay muted loop playsInline poster="/resources/hero-cliff.jpg" src="/resources/hero-cliff.mp4" />
      <header className={s.nav}>
        <Link href="/" className={s.logo}>
          /Runwithfoxes
        </Link>
        <nav className={s.links}>
          <a href="#reports">/reports</a>
          <a href="#trackers">/trackers</a>
          <a href="#tools">/tools</a>
          <Link href="/course">/course</Link>
          <a href="#" className={s.signin}>
            /sign in
          </a>
        </nav>
      </header>

      <div className={s.inner}>
        <div className={s.text}>
          <span className={s.pill}>The Run with Foxes resource hub</span>
          <h1 className={s.title}>Ireland and AI</h1>
          <p className={s.sub}>
            Research, trackers, tools, playbooks and a free course on what AI is doing to
            marketing, measured in Ireland first.
          </p>
          <p className={s.stamp}>New study: who AI names across 41 categories of Irish life</p>
        </div>

        {/* The GEO hero's question paper, holding our research instead of questions. Same
            scroll: 160s for one pass, paused on hover. Links not ready yet go to "#". */}
        <div className={s.panel}>
          <div className={s.head}>
            <span className={s.headLab}>Library</span>
            <span className={s.headSub}>Research and papers</span>
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
    </section>
  );
}
