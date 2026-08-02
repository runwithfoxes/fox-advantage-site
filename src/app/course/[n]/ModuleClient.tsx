"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import ModuleIsa from "./ModuleIsa";
import ModuleArrival from "./ModuleArrival";
import { Figure } from "../figures/Figure";
import figStyles from "../figures/Figure.module.css";
import {
  KIND_LABEL,
  kindOf,
  slugOf,
  type Item,
  type Kind,
  type ModuleDef,
} from "../moduleData";

/**
 * ⚠️ EXPERIMENT, 2 Aug 2026, UNCOMMITTED. The counter strip and the "0 of N done" bar are
 * switched off and the arrival block (welcome, video placeholder, fluency slider) sits in
 * their place. Set this back to true and delete the <ModuleArrival /> line to restore the
 * page exactly as it was.
 */
const SHOW_COUNTERS = false;

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

/**
 * ⭐ A LONG PROMPT IS A BUTTON, NOT A WALL. Paul, 2 Aug 2026, showing Spiral's
 * "COPY PROMPT FOR AGENT": "this is how everyone does it. We don't see the prompt. We
 * just click."
 *
 * The CFO persona is 828 words. Printed in full it buries the item, and it buries the
 * next item too, which is the opposite of what a hack is meant to feel like. Nobody
 * reads a system prompt before pasting it; they take it and use it.
 *
 * ⚠️ SHORT PROMPTS STAY VISIBLE, and that is not an oversight. Item 02's prose says
 * "try a prompt like the one below", so hiding it would break the sentence pointing at
 * it. A five-line prompt is READING material; an 800-word persona is CARGO. The
 * threshold is what separates them.
 *
 * ⛔ THERE IS NO "SHOW IT" TOGGLE. The first attempt had one, plus a word count and the
 * box around it, and Paul cut all three. A long prompt is one button. If someone wants
 * to read 828 words before pasting them, they can paste them and read them there.
 */
const PROMPT_IS_LONG_AT = 120; /* words */

function PromptBlock({
  text,
  label,
  onCopy,
}: {
  text: string;
  label?: string;
  onCopy: () => void;
}) {
  const long = text.trim().split(/\s+/).length > PROMPT_IS_LONG_AT;

  /* ⭐ A LONG PROMPT IS ONE BUTTON AND NOTHING ELSE. First attempt kept the box, a word
     count and a "show it" toggle, and Paul killed all three on sight: "this is ugly, not
     neat and clean... it is confusing. We can just use the copy button." He is right that
     the extra furniture was explaining a control that explains itself. The label names
     WHAT is being copied, so nothing else has to. */
  if (long) {
    return (
      <button type="button" className="mod-promptbtn" onClick={onCopy}>
        {label ?? "Copy prompt"}
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <rect x="0.5" y="0.5" width="7" height="9" fill="none" stroke="currentColor" />
          <path d="M4.5 2.5h7v9h-7" fill="none" stroke="currentColor" />
        </svg>
      </button>
    );
  }

  /* Short prompts stay visible. Item 02's prose says "try a prompt like the one below",
     so hiding five lines would break the sentence pointing at them. A short prompt is
     reading material; an 800-word persona is cargo. */
  return (
    <div className="mod-copybox">
      <div className="mod-copyhead">
        <span>Paste this into Claude or ChatGPT</span>
        <button type="button" onClick={onCopy}>
          Copy
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

/**
 * A figure that lives as its own file under /public rather than in the figures library.
 * See the `figureFile` note in moduleData.ts for why this is an <img> and not inlined:
 * the standalone export carries UNSCOPED css on purpose, so inlining it would repaint
 * every other figure on the page. An <img> gives the SVG its own document.
 *
 * It reuses the figures' own plate, so a library figure and a file figure sit on the
 * same surface and nobody can tell which is which by looking.
 */
function FigureFile({ src, banner }: { src: string; banner?: boolean }) {
  return (
    <div
      className={
        banner ? `${figStyles.plate} ${figStyles.banner}` : figStyles.plate
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- an SVG that animates
          itself; next/image would rasterise it and the animation would be lost. */}
      <img src={src} alt="" />
    </div>
  );
}

/**
 * An item's prose. Splits on a blank line so Paul can dictate more than one paragraph
 * and get more than one paragraph, which he could not before: `text` rendered into a
 * single <p>, so his breaks vanished and three thoughts ran together as a wall.
 * Added 2 Aug 2026 when item 01's text became three paragraphs.
 */
function Body({ text, ph }: { text: string; ph?: boolean }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i} className="mod-body" data-ph={ph ? "" : undefined}>
          {para}
        </p>
      ))}
    </>
  );
}

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
        {/* The headline, with its declared words in Fox blue. Falls back to a plain
            headline when the module names no highlight, or names one that is not actually
            in the title. */}
        <h1 className="mod-h1">
          {(() => {
            const hl = mod.titleHl;
            const at = hl ? mod.title.indexOf(hl) : -1;
            if (!hl || at < 0) return mod.title;
            return (
              <>
                {mod.title.slice(0, at)}
                <span className="mod-hl">{hl}</span>
                {mod.title.slice(at + hl.length)}
              </>
            );
          })()}
        </h1>
        {/* Reuses .chapter-fox-hero verbatim: float right, 180px, negative -60px right
            margin so it sits half out in the gutter and reads as casual rather than as
            a boxed illustration, and a drop-shadow FILTER so the shadow follows the
            fox's outline instead of a rectangle. */}
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src={`/fox/${fox}`} alt="" />
        </div>
        {/* Paul's opening if the module has one, otherwise its blurb. Splits on a blank
            line, same as an item's prose. The fox floats right, so the first paragraph
            wraps beside it and the rest run full width: the magazine wrap the homepage
            uses. */}
        {(mod.opening ?? mod.blurb).split(/\n{2,}/).map((para, i) => (
          <p className="mod-standfirst" key={i}>
            {para}
          </p>
        ))}
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

      {/* THE ARRIVAL BLOCK, 2 Aug 2026, EXPERIMENT. Welcome, video placeholder and the
          fluency slider take the position the counter strip and progress bar held.
          Revert = delete this line and set SHOW_COUNTERS back to true. */}
      <ModuleArrival />

      {SHOW_COUNTERS && (
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
      )}

      {SHOW_COUNTERS && (
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
      )}

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

                {/* ⭐ THE FIGURE SITS ABOVE THE PROSE. Paul, 2 Aug 2026: "put the
                    figures above my writing. They are like a simple banner and then I
                    explain below. For when I have just one figure in an item."
                    It was underneath until now, which made the drawing a footnote to
                    the words rather than the thing the words explain. */}
                {it.figure ? (
                  <Figure name={it.figure} className={figStyles.banner} />
                ) : it.figureFile ? (
                  <FigureFile src={it.figureFile} banner />
                ) : it.grab ? (
                  <div className="mod-win mod-win-banner">
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

                <Body text={it.text} ph={it.placeholder} />

                {/* Further reading, directly under the prose as Paul asked. A labelled row
                    rather than a bare link, so it reads as a deliberate pointer to someone
                    else's work and names who wrote it. */}
                {it.reading && (
                  <div className="mod-reading">
                    <span className="mod-readinglbl">More on this</span>
                    {it.reading.map((R, j) => (
                      <a
                        key={j}
                        className="mod-readinglink"
                        href={R.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {R.title}
                        <i>{R.by}</i>
                      </a>
                    ))}
                  </div>
                )}

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

                {it.prompt && (
                  <PromptBlock
                    text={it.prompt}
                    label={it.promptLabel}
                    onCopy={() => copyPrompt(it, i)}
                  />
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
              <Body
                text={mod.items[open].text}
                ph={mod.items[open].placeholder}
              />

              {/* THE SAME PICTURE, IN THE SECOND PLACE THE ITEM RENDERS. An item that
                  shows a figure inline and then loses it when you open it is the same
                  item telling you two different things. Order copied from the inline
                  item, text then picture then prompt, not invented here. */}
              {mod.items[open].figure && <Figure name={mod.items[open].figure} />}

              {mod.items[open].prompt && (
                <PromptBlock
                  text={mod.items[open].prompt as string}
                  label={mod.items[open].promptLabel}
                  onCopy={() => copyPrompt(mod.items[open], open)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
