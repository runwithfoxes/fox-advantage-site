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
 * 26 Sep 2026: the menu reflects the whole centre (reports, trackers, datasets, tools, playbooks,
 * the Library, essays, diary, answers). Counts arrive as a prop from the server page that has the
 * catalogue, so this client file never bundles catalogue.json; without counts the items still show.
 * Featured is The AI Ask, the newest report.
 */
import type { Counts } from "./HubHero";
import { NOTES } from "@/lib/notes-name";

type Glyph = "report" | "tracker" | "data" | "tool" | "playbook" | "essay" | "answer" | "course" | "library" | "figure" | "diary" | "book" | "contact" | "news";

/* Paul, 27 Sep, on this menu: "it needs to link to things that make sense... not a good experience if
   i click on dataset and land on a page telling me i must register." Every item goes to a page that
   shows the thing. Reports, trackers, tools and playbooks now open their own index pages instead of
   anchors on the homepage (four of those bands are hidden since 27 Sep, so the anchors landed on
   nothing). Datasets still points at the homepage until it has an index page of its own. */
/* Paul, 29 Sep 2026: Datasets, Playbooks, Trackers, Short answers and The course figures come off
   the menu until there is enough behind them, and Tools until they are ready. */
const DISCOVER: { g: Glyph; t: string; d: string; href: string; n?: keyof Counts }[] = [
  { g: "report", t: "Reports", d: "The AI Ask, and the two on the way", href: "/#reports" },
  // The library band on the homepage, which carries the sign-up box (Paul, 29 Sep).
  { g: "library", t: "The Library", d: "Every prompt, link and file from the course", href: "/#library" },
];
const READ: { t: string; href: string }[] = [
  { t: "Essays, by Paul", href: "/essays" },
  { t: "Diary of an agent team, by Lena", href: "/diary" },
  { t: NOTES.nav, href: NOTES.route },
  { t: "Who writes here", href: "/about#contributors" },
];
const LEARN: { t: string; href: string }[] = [
  { t: "AI Fluency for Ambitious Marketers", href: "/course" },
  { t: "The Fox Advantage, free book", href: "/book" },
];
const CONNECT: { t: string; href: string }[] = [
  { t: "Get new research by email", href: "/#top" },
  { t: "Talk to us", href: "/about" },
];

function Tile({ g }: { g: Glyph }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" as const };
  return (
    <span className={s.tile} aria-hidden>
      <svg viewBox="0 0 20 20" width="18" height="18">
        {g === "report" && (<><rect x="4" y="3" width="12" height="14" {...p} /><path d="M7 7h6M7 10h6M7 13h3" {...p} /></>)}
        {g === "tracker" && (<><path d="M3 15l4-5 3 3 3-5 4 4" {...p} /><path d="M3 17h14" {...p} /></>)}
        {g === "data" && (<><ellipse cx="10" cy="5.5" rx="6" ry="2.5" {...p} /><path d="M4 5.5v9c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-9M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" {...p} /></>)}
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

export default function ResourcesMenu({ counts }: { counts?: Counts }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // a click on a menu that hover opened keeps it open (see NextNav, 1 Oct 2026)
  const byHover = useRef(false);

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
    if (!open) byHover.current = true;
    setOpen(true);
  };
  const press = () => {
    const keep = !open || byHover.current;
    byHover.current = false;
    setOpen(keep);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 180);
  };

  return (
    <div className={s.wrap} ref={wrap} onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" className={s.trigger} aria-expanded={open} onClick={press}>
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
                  <span className={s.itemT}>{i.t}{counts && i.n ? <em className={s.itemN}>{counts[i.n]}</em> : null}</span>
                  <span className={s.itemD}>{i.d}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className={`${s.col} ${s.rule}`}>
            <span className={s.lab}>Read</span>
            {READ.map((i) => (
              <Link key={i.t} href={i.href} className={s.plain} onClick={() => setOpen(false)}>
                {i.t}
              </Link>
            ))}
            <span className={s.lab} style={{ marginTop: 18 }}>Learn</span>
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
          <Link href="/resources/the-ai-ask/2026-q3" className={s.featured} onClick={() => setOpen(false)}>
            <span className={s.lab}>New report</span>
            <span className={s.featImg}>
              <img src="/resources/fox-hero-flip-last-frame.jpg" alt="" />
              <span className={s.featOver}>The AI Ask</span>
            </span>
            <span className={s.itemT}>1 in 6 marketing jobs in Ireland asks for AI</span>
            <span className={s.itemD}>Q3 2026. 1,773 job ads read; 56 of September&rsquo;s 636 ask for anything real about AI. By Sam.</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
