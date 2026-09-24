"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import s from "./menu.module.css";

/**
 * THE RESOURCES MENU. Paul, 24 Sep 2026, sharing Ramp's Resources menu: "Ramp is a useful
 * reference for us... let's build a nav bar like that for us for Resources."
 * Ramp's shape: grouped columns, each item a small tile, a name and one line, and a featured
 * panel with a picture. Ours: sharp corners, hairlines, our three faces, sky blue for links.
 * Opens on hover or click, closes on Escape or a click outside.
 * Items marked `ex` do not exist yet (see examples.ts) and go to "#".
 */

type Glyph = "report" | "tracker" | "tool" | "playbook" | "essay" | "answer" | "course" | "library" | "figure" | "diary" | "book" | "contact" | "news";

const DISCOVER: { g: Glyph; t: string; d: string; href: string; ex?: boolean }[] = [
  { g: "report", t: "Reports", d: "Numbered studies on a fixed calendar", href: "/resources#reports" },
  { g: "tracker", t: "Trackers", d: "What our agents read every day", href: "/resources#trackers" },
  { g: "tool", t: "Tools", d: "Free to use, built by us", href: "/resources#tools" },
  { g: "playbook", t: "Playbooks", d: "Prompts, files and templates", href: "/resources#playbooks" },
  { g: "essay", t: "Essays", d: "How we build, written up as we go", href: "/essays" },
  { g: "answer", t: "Short answers", d: "The questions we get asked", href: "/answers" },
];
const LEARN: { t: string; href: string }[] = [
  { t: "AI Fluency for Ambitious Marketers", href: "/course" },
  { t: "Library of everything", href: "/course/everything" },
  { t: "The course figures", href: "/course/figures" },
  { t: "The Fox Advantage, free book", href: "/book" },
];
const CONNECT: { t: string; href: string }[] = [
  { t: "Diary of our agent team", href: "/diary" },
  { t: "Get new research by email", href: "/resources#top" },
  { t: "Talk to us", href: "/contact" },
];

function Tile({ g }: { g: Glyph }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" as const };
  return (
    <span className={s.tile} aria-hidden>
      <svg viewBox="0 0 20 20" width="18" height="18">
        {g === "report" && (<><rect x="4" y="3" width="12" height="14" {...p} /><path d="M7 7h6M7 10h6M7 13h3" {...p} /></>)}
        {g === "tracker" && (<><path d="M3 15l4-5 3 3 3-5 4 4" {...p} /><path d="M3 17h14" {...p} /></>)}
        {g === "tool" && (<><rect x="3" y="4" width="14" height="12" {...p} /><path d="M3 7h14" {...p} /></>)}
        {g === "playbook" && (<><path d="M5 3h7l3 3v11H5z" {...p} /><path d="M12 3v3h3" {...p} /></>)}
        {g === "essay" && (<><path d="M4 5h12M4 8h12M4 11h12M4 14h7" {...p} /></>)}
        {g === "answer" && (<><path d="M4 4h12v9H9l-4 3v-3H4z" {...p} /></>)}
        {g === "course" && (<><path d="M3 7l7-3 7 3-7 3z" {...p} /><path d="M6 9v4c2 2 6 2 8 0V9" {...p} /></>)}
        {g === "library" && (<><path d="M4 4v12M8 4v12M12 5l3 11" {...p} /></>)}
        {g === "figure" && (<><circle cx="10" cy="10" r="6" {...p} /><path d="M10 4v6h6" {...p} /></>)}
        {g === "diary" && (<><rect x="4" y="3" width="12" height="14" {...p} /><path d="M7 3v14" {...p} /></>)}
        {g === "book" && (<><path d="M4 4h5a2 2 0 012 2v10a2 2 0 00-2-2H4zM16 4h-5" {...p} /></>)}
        {g === "contact" && (<><path d="M3 5h14v10H3zM3 5l7 6 7-6" {...p} /></>)}
        {g === "news" && (<><path d="M5 4h10v12H5zM8 8h4" {...p} /></>)}
      </svg>
    </span>
  );
}

export default function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const click = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", click);
    };
  }, []);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 180);
  };

  return (
    <div className={s.wrap} ref={wrap} onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" className={s.trigger} aria-expanded={open} onClick={() => setOpen(!open)}>
        /resources <span className={s.chev} aria-hidden>{open ? "▴" : "▾"}</span>
      </button>

      {open ? (
        <div className={s.panel} role="menu">
          <div className={s.col}>
            <span className={s.lab}>Discover</span>
            {DISCOVER.map((i) => (
              <Link key={i.t} href={i.href} className={s.item} onClick={() => setOpen(false)}>
                <Tile g={i.g} />
                <span>
                  <span className={s.itemT}>{i.t}</span>
                  <span className={s.itemD}>{i.d}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className={`${s.col} ${s.rule}`}>
            <span className={s.lab}>Learn</span>
            {LEARN.map((i) => (
              <Link key={i.t} href={i.href} className={s.plain} onClick={() => setOpen(false)}>
                {i.t}
              </Link>
            ))}
          </div>
          <div className={`${s.col} ${s.rule}`}>
            <span className={s.lab}>Connect</span>
            {CONNECT.map((i) => (
              <Link key={i.t} href={i.href} className={s.plain} onClick={() => setOpen(false)}>
                {i.t}
              </Link>
            ))}
          </div>
          <Link href="/resources/geo-ireland" className={s.featured} onClick={() => setOpen(false)}>
            <span className={s.lab}>Featured</span>
            <span className={s.featImg}>
              <img src="/resources/hero-bridge.jpg" alt="" />
              <span className={s.featOver}>Ireland and AI</span>
            </span>
            <span className={s.itemT}>GEO Ireland No. 01</span>
            <span className={s.itemD}>Who five AI engines name across 41 categories of Irish life.</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
