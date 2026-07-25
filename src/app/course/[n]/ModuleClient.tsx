"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import ModuleIsa from "./ModuleIsa";
import { Figure } from "../figures/Figure";
import {
  KIND_LABEL,
  kindOf,
  slugOf,
  type Item,
  type Kind,
  type ModuleDef,
} from "../moduleData";

/**
 * A MODULE PAGE. Renders whatever is in the module's item array.
 *
 * ⭐ NOTHING IN HERE KNOWS HOW MANY ITEMS THERE ARE, or what module it is drawing.
 * That is the whole design. Module 2 is a new data file, not a new component.
 * Spec: ~/paul-hub/intelligence/course-build/module-format-spec.md
 *
 * Ported 19 Jul 2026 from prototype v7, which Paul reacted to across seven rounds.
 * The rules he set on the way, all enforced here:
 *  - SOLID BLUE MEANS "YOU CAN CLICK THIS" AND NOTHING ELSE. Type labels are quiet
 *    outlines. He caught them looking like buttons when they were solid.
 *  - FILTERS ARE ONE AT A TIME. Multi-select confused him.
 *  - EVERY ITEM OPENS. He tried to open a read-only item and nothing happened.
 *  - NAME THE MECHANISM. "Copy link" and "Copy text", never "Link to this". Same
 *    discipline as "we'll email you" beating "we'll tell you" on the course home.
 *  - THE BUILD LAYER NEVER LEAKS. What is missing, how many grabs are outstanding and
 *    what is placeholder is for Paul while building. A member sees none of it.
 */

const BUILD_PARAM = "build";

export default function ModuleClient({ mod }: { mod: ModuleDef }) {
  const [filter, setFilter] = useState<Kind | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [build, setBuild] = useState(false);

  const key = `rwf-course-m${mod.n}-done`;

  /* Build layer is opt-in via ?build, so it can never reach a member by accident. */
  useEffect(() => {
    setBuild(new URLSearchParams(window.location.search).has(BUILD_PARAM));
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* a blocked or full localStorage must never break the page */
    }
  }, [key]);

  const persist = useCallback(
    (next: Set<number>) => {
      setDone(next);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* progress is a convenience, not a requirement */
      }
    },
    [key],
  );

  const toggleDone = (i: number) => {
    const next = new Set(done);
    next.has(i) ? next.delete(i) : next.add(i);
    persist(next);
  };

  const markDone = (i: number) => {
    if (done.has(i)) return;
    const next = new Set(done);
    next.add(i);
    persist(next);
  };

  const counts = useMemo(() => {
    const c: Partial<Record<Kind, number>> = {};
    mod.items.forEach((it) => {
      const k = kindOf(it);
      c[k] = (c[k] ?? 0) + 1;
    });
    return c;
  }, [mod.items]);

  /* An item whose picture slot is already filled by a drawn figure is not still owed.
     Counting it would keep telling Paul he owes a screenshot he can already see. */
  const grabsOutstanding = mod.items.filter((it) => it.grab && !it.figure).length;
  const wordsOutstanding = mod.items.filter((it) => it.placeholder).length;

  const visible = (it: Item) => filter === null || kindOf(it) === filter;
  const shown = mod.items.filter(visible).length;

  const say = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(null), 2000);
  };

  const urlFor = (it: Item) =>
    `https://runwithfoxes.com/course/${mod.n}/${slugOf(it.t)}`;

  const copyLink = async (it: Item) => {
    try {
      await navigator.clipboard.writeText(urlFor(it));
      say("Link copied");
    } catch {
      say("Copy failed");
    }
  };

  /* Copy text is the one that actually travels: it survives outside the site. */
  const copyText = async (it: Item) => {
    let out = `${it.t}\n\n${it.text}`;
    if (it.prompt) out += `\n\n${it.prompt}`;
    out += `\n\nFrom Paul Dervan's free AI course for marketers.\n${urlFor(it)}`;
    try {
      await navigator.clipboard.writeText(out);
      say("Text copied");
    } catch {
      say("Copy failed");
    }
  };

  const copyPrompt = async (it: Item, i: number) => {
    if (!it.prompt) return;
    try {
      await navigator.clipboard.writeText(it.prompt);
      say("Prompt copied");
      markDone(i); /* taking the prompt IS doing the thing */
    } catch {
      say("Copy failed");
    }
  };

  const cells: { k: Kind; label: string }[] = [
    { k: "take", label: "To copy and keep" },
    { k: "steps", label: "Shown with a picture" },
    { k: "read", label: "To read" },
    { k: "links", label: "Worth saving" },
  ];

  /* ⭐ THE FOX ROTATES BY MODULE NUMBER, exactly as the book chapters rotate by
     chapter number, so no two of the six modules feel identical. */
  const FOXES = [
    "chapter-fox-sitting-nobg.png",
    "fox-sideeye-right-nobg.png",
    "chapter-fox-bored-nobg.png",
    "fox-facepalm-nobg.png",
    "fox-pm-nobg.png",
    "fox-monday-nobg.png",
  ];
  const fox = FOXES[(mod.n - 1) % FOXES.length];

  return (
    <div className="mod-shell">
      {/* Reuses the book chapter nav verbatim (.chapter-nav). The chapters' numeric
          count is dropped: the eyebrow already says "Module N of 6". */}
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/course" className="chapter-nav-back">
          ← course
        </Link>
      </header>
      {build && (
        <div className="mod-build">
          <b>BUILD VIEW. A member never sees this.</b> {grabsOutstanding}{" "}
          {grabsOutstanding === 1 ? "screen grab" : "screen grabs"} still needed
          {" · "}
          {wordsOutstanding} {wordsOutstanding === 1 ? "item" : "items"} still
          {wordsOutstanding === 1 ? " needs" : " need"} Paul&rsquo;s words
        </div>
      )}

      {/* ⭐ v8's TWO-COLUMN PAGE. Left is ONE sticky block: Isa on top at her natural
          height, the contents taking what is left and scrolling inside it. They both
          want to stay visible and they cannot each pin, so the COLUMN pins as one.
          Right holds everything that used to run full width, masthead included. */}
      <div className="mod-grid">
        <div className="mod-railcol">
          {/* The REAL Isa, scoped to this module. v8 drew this panel; it is wired now. */}
          <ModuleIsa mod={mod} />

          <nav className="mod-rail">
            <p>/in this module</p>
            {mod.items.map((it, i) =>
              visible(it) ? (
                <a key={i} href={`#i${i + 1}`} data-done={done.has(i) ? "1" : "0"}>
                  <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-dot" />
                  <span>{it.t}</span>
                </a>
              ) : null,
            )}
          </nav>
        </div>

        <div className="mod-maincol">
      <header className="mod-masthead">
        <p className="mod-eyebrow">
          Module {mod.n} of 6 &middot; opens {mod.when}
        </p>
        <h1 className="mod-h1">{mod.title}</h1>
        {/* Reuses .chapter-fox-hero verbatim: float right, 180px, negative -60px right
            margin so it sits half out in the gutter and reads as casual rather than as
            a boxed illustration, and a drop-shadow FILTER so the shadow follows the
            fox's outline instead of a rectangle. */}
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src={`/fox/${fox}`} alt="" />
        </div>
        <p className="mod-standfirst">{mod.blurb}</p>
        <div className="mod-meta">
          <span>
            Opens<b>{mod.when}</b>
          </span>
          <span>
            In this module<b>{mod.items.length} things</b>
          </span>
          {mod.source && (
            <span>
              Source<b>{mod.source}</b>
            </span>
          )}
          <span>
            Sharing<b>Copy anything. Send it on.</b>
          </span>
        </div>
      </header>

      <div className="mod-comp">
        <button
          type="button"
          aria-pressed={filter === null}
          onClick={() => setFilter(null)}
        >
          <span className="mod-num">{mod.items.length}</span>
          <span className="mod-lbl">All</span>
        </button>
        {cells.map((c) => (
          <button
            key={c.k}
            type="button"
            aria-pressed={filter === c.k}
            onClick={() => setFilter(filter === c.k ? null : c.k)}
          >
            <span className="mod-num">{counts[c.k] ?? 0}</span>
            <span className="mod-lbl">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="mod-progress">
        <span>
          {done.size} of {mod.items.length} done
        </span>
        <span className="mod-bar">
          <i style={{ width: `${(done.size / mod.items.length) * 100}%` }} />
        </span>
        {done.size > 0 && (
          <button type="button" onClick={() => persist(new Set())}>
            Clear
          </button>
        )}
        {flash && <span className="mod-flash">{flash}</span>}
      </div>

      {filter !== null && (
        <div className="mod-filterstate">
          <span>
            {shown} {shown === 1 ? "item" : "items"} shown
          </span>
          <button type="button" onClick={() => setFilter(null)}>
            Show everything
          </button>
        </div>
      )}

        <main>
          {mod.items.map((it, i) => {
            if (!visible(it)) return null;
            const k = kindOf(it);
            return (
              <article
                key={i}
                className="mod-item"
                id={`i${i + 1}`}
                data-done={done.has(i) ? "1" : "0"}
              >
                <div className="mod-itemtop">
                  <span className="mod-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-type">{KIND_LABEL[k]}</span>
                  <h2 className="mod-h3">
                    <button type="button" onClick={() => setOpen(i)}>
                      {it.t}
                    </button>
                  </h2>
                  <span className="mod-openhint">Open</span>
                </div>

                <p className="mod-body" data-ph={it.placeholder ? "" : undefined}>
                  {it.text}
                </p>

                {it.links && (
                  <div className="mod-linklist">
                    {it.links.map((L, j) => (
                      /* ⭐ A PLAIN ROW IS THE DEFAULT. Paul, 19 Jul: "most links are
                         going to be just links, not thumbnails." Only draw the picture
                         column when a link actually has one. */
                      <a
                        key={j}
                        className="mod-lcard"
                        data-thumb={L.thumb ? "1" : "0"}
                        href={L.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {L.thumb && (
                          <span
                            className="mod-lthumb"
                            style={{ backgroundImage: `url(${L.thumb})` }}
                          />
                        )}
                        <span>
                          <span className="mod-ltitle">{L.title}</span>
                          <span
                            className="mod-lwhy"
                            data-ph={L.why.startsWith("PAUL TO WRITE") ? "" : undefined}
                          >
                            {L.why}
                          </span>
                          <span className="mod-lmeta">{L.by}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {/* THE PICTURE SLOT. A drawn figure fills it when there is one, and the
                    orange unbuilt marker stands there when there is not. The figure knows
                    nothing about items: it takes a name and a width, so this whole block
                    can be moved or rebuilt without touching the figures. */}
                {it.figure ? (
                  <Figure name={it.figure} />
                ) : it.grab ? (
                  <div className="mod-win">
                    <div className="mod-winbar">
                      <span className="mod-lights">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="mod-wintitle">{it.grab}</span>
                      {build && <span className="mod-winright">grab needed</span>}
                    </div>
                    <div className="mod-shot" data-ph="" />
                  </div>
                ) : null}

                {it.prompt && (
                  <div className="mod-copybox">
                    <div className="mod-copyhead">
                      <span>Paste this into Claude or ChatGPT</span>
                      <button type="button" onClick={() => copyPrompt(it, i)}>
                        Copy
                      </button>
                    </div>
                    <pre>{it.prompt}</pre>
                  </div>
                )}

                <div className="mod-share">
                  <button
                    type="button"
                    className="mod-tick"
                    aria-pressed={done.has(i)}
                    onClick={() => toggleDone(i)}
                  >
                    <span className="mod-box" />
                    Done
                  </button>
                  <button type="button" className="mod-act" onClick={() => copyLink(it)}>
                    Copy link
                  </button>
                  <button type="button" className="mod-act" onClick={() => copyText(it)}>
                    Copy text
                  </button>
                </div>
              </article>
            );
          })}
        </main>
        </div>
      </div>

      {open !== null && (
        <div
          className="mod-readerwrap"
          role="dialog"
          aria-modal="true"
          aria-label={mod.items[open].t}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="mod-reader">
            <div className="mod-readerbar">
              <span className="mod-t">
                Module {mod.n} &middot; {String(open + 1).padStart(2, "0")}
              </span>
              <span className="mod-u">
                runwithfoxes.com/course/{mod.n}/{slugOf(mod.items[open].t)}
              </span>
              <button type="button" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
            <div className="mod-readerbody">
              <h2>{mod.items[open].t}</h2>
              <p
                className="mod-body"
                data-ph={mod.items[open].placeholder ? "" : undefined}
              >
                {mod.items[open].text}
              </p>

              {/* THE SAME PICTURE, IN THE SECOND PLACE THE ITEM RENDERS. An item that
                  shows a figure inline and then loses it when you open it is the same
                  item telling you two different things. Order copied from the inline
                  item, text then picture then prompt, not invented here. */}
              {mod.items[open].figure && <Figure name={mod.items[open].figure} />}

              {mod.items[open].prompt && (
                <div className="mod-copybox">
                  <div className="mod-copyhead">
                    <span>Paste this into Claude or ChatGPT</span>
                    <button
                      type="button"
                      onClick={() => copyPrompt(mod.items[open], open)}
                    >
                      Copy
                    </button>
                  </div>
                  <pre>{mod.items[open].prompt}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
