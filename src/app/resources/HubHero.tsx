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
export default function HubHero() {
  const [tab, setTab] = useState<"join" | "signin">("join");
  const [done, setDone] = useState<string | null>(null);

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
          <Link href="/contact">/contact</Link>
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

        <div className={s.panel}>
          <div className={s.tabs} role="tablist">
            <button type="button" role="tab" aria-selected={tab === "join"} onClick={() => { setTab("join"); setDone(null); }}>
              Get new research
            </button>
            <button type="button" role="tab" aria-selected={tab === "signin"} onClick={() => { setTab("signin"); setDone(null); }}>
              Sign in
            </button>
          </div>

          {done ? (
            <p className={s.done}>{done}</p>
          ) : tab === "join" ? (
            <form
              className={s.form}
              onSubmit={(e) => {
                e.preventDefault();
                setDone("You are on the list. New studies and trackers come to you the day they go up.");
              }}
            >
              <p className={s.lead}>Each new study and tracker, the day it goes up. Nothing else.</p>
              <input id="hub-name" type="text" placeholder="First name" aria-label="First name" />
              <input id="hub-email" type="email" required placeholder="you@company.ie" aria-label="Work email" />
              <button type="submit">Send me new research →</button>
              <p className={s.fine}>Free. Unsubscribe from any email.</p>
            </form>
          ) : (
            <form
              className={s.form}
              onSubmit={(e) => {
                e.preventDefault();
                setDone("Check your email. The sign-in link is on its way.");
              }}
            >
              <p className={s.lead}>Your saved reports, your course progress and your brand&rsquo;s own results.</p>
              <input id="hub-signin" type="email" required placeholder="you@company.ie" aria-label="Email" />
              <button type="submit">Email me a sign-in link →</button>
              <p className={s.fine}>No password. Same address you used for the course.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
