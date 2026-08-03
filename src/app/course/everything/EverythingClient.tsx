"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import s from "./Everything.module.css";
import { HERO } from "../courseCopy";

/**
 * ⭐⭐ THE PAGE IS A FILE TREE, 3 Aug 2026. Paul named GitHub as the reference and named what
 * he liked about it: "it's got little folders and links and things like this". So the borrow
 * is mechanical, from a real repo page screenshotted the same afternoon rather than from
 * memory of one: a bordered container with a header strip, one-line rows about 41px tall, a
 * 1px divider between every row, an icon column, the name on the left, and the metadata
 * right-aligned in machine type. Folders sort above files.
 *
 * ⛔ WHAT DELIBERATELY DOES NOT COME ACROSS: GitHub's rounded corners (a site rule), its
 * greys (ours are the cream palette), and its density of chrome. It is a reference for
 * DISCIPLINE, which was the actual complaint, not a skin.
 */

export type FileRow = {
  kind: "prompt" | "link";
  name: string;
  /** Right-aligned machine text. The source for a link, the size for a prompt. */
  meta?: string;
  /** Links only. */
  url?: string;
  /** Prompts only. The text the copy button puts on the clipboard. */
  body?: string;
};

export type Row =
  | {
      type: "folder";
      key: string;
      name: string;
      modN: number;
      desc: string;
      href: string;
      files: FileRow[];
      search: string;
    }
  | {
      type: "file";
      key: string;
      name: string;
      meta?: string;
      url: string;
      note?: string;
      search: string;
    };

export type Section = {
  slug: string;
  title: string;
  blurb?: string;
  kind: "lessons" | "shelf";
  rows: Row[];
};

type ModuleRow = { n: number; title: string; when: string; has: boolean };

const BUILD_PARAM = "build";

/**
 * ⚠️ THE EMAIL GATE DOES NOT EXIST YET. Paul ruled on 19 Jul that email is how someone
 * gets into a module, and confirmed it again on 2 Aug. The capture chain to Klaviyo is
 * built and proven; what was never built is a page recognising somebody who already
 * signed up.
 *
 * ⭐ THIS IS THE ONE PLACE THIS PAGE ASKS. Wired to nothing on purpose, so when the gate
 * lands it is one line here rather than a pass back through the page. A member must
 * never be asked for an email they already gave.
 */
function useIsMember(): boolean {
  return false;
}

export default function EverythingClient({
  sections,
  modules,
  hidden,
  shelfCount,
}: {
  sections: Section[];
  modules: ModuleRow[];
  hidden: number;
  shelfCount: number;
}) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [build, setBuild] = useState(false);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const isMember = useIsMember();

  useEffect(() => {
    setBuild(new URLSearchParams(window.location.search).has(BUILD_PARAM));
  }, []);

  const say = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(null), 1600);
  };

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  /* ⭐ SEARCH COVERS THE BODY, NOT JUST TITLES. Somebody looking for this months later
     remembers "the one about the spreadsheet", and the word spreadsheet may only appear
     in the prose. Titles-only search would fail exactly the person this page is for.
     The haystack is built on the server now, so a slot added to an item cannot silently
     fall out of search the way `reading` and `beats` both did. */
  const shown = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return sections
      .map((sec) => ({
        ...sec,
        rows: sec.rows.filter((r) => {
          if (mod !== null && (r.type !== "folder" || r.modN !== mod)) return false;
          if (!terms.length) return true;
          return terms.every((t) => r.search.includes(t));
        }),
      }))
      /* An empty shelf section is hidden from the public page, kept in the build view.
         A heading over nothing reads as a broken page rather than an honest one. */
      .filter((sec) => sec.rows.length > 0 || (build && sec.kind === "shelf"));
  }, [sections, q, mod, build]);

  const total = shown.reduce((n, sec) => n + sec.rows.length, 0);
  const filtering = Boolean(q) || mod !== null;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      say(label);
    } catch {
      say("Copy failed");
    }
  };

  const built = modules.filter((m) => m.has).length;
  const lessonCount =
    sections.find((sec) => sec.kind === "lessons")?.rows.length ?? 0;

  return (
    <div className="mod-shell">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/course" className="chapter-nav-back">
          ← course
        </Link>
      </header>

      {/* ⛔ NO BUILD BANNER ON THIS PAGE, Paul 3 Aug 2026: "Can you take off the build view
          blue thing at the top?" The module page keeps its own. Here the banner sat above the
          masthead and pushed the whole page down, so the one page whose top is supposed to
          match a module page's top did not, which was his next sentence. ?build still works
          and is still the only way to see the empty shelf sections; those sections ARE the
          cue that you are in it. */}
      {/* ⭐ THE SAME TWO-COLUMN GRID AS A MODULE PAGE, and the reason is measured rather than
          felt. Paul, 3 Aug: "the fonts are too big". They were not. The h1 and the prose use
          the identical classes on both pages; the module page indents them into a 748px
          column and this page ran them across the full 1124px, so a 52px headline over a
          50% wider measure read as shouting and the standfirst ran to about 120 characters
          a line. Porting the grid fixes the type by fixing the column. */}
      <div className="mod-grid">
        <div className="mod-railcol">
          <nav className="mod-rail">
            <p>/the library</p>
            {/* ⭐ NUMBERED OVER WHAT IS VISIBLE, NEVER OVER THE SOURCE ARRAY. Filtering first
                and numbering second is the whole fix: numbering the source array printed
                01 then 03 on the live page, because People I follow is empty and hidden but
                still held position two. A rail that skips a number reads as a page with
                something missing. */}
            {sections
              .filter(
                (sec) =>
                  sec.rows.length > 0 || (build && sec.kind === "shelf"),
              )
              .map((sec, i) => (
                <a key={sec.slug} href={`#s-${sec.slug}`}>
                  <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-dot" />
                  <span>
                    {sec.title}
                    <em className={s.railn}>{sec.rows.length}</em>
                  </span>
                </a>
              ))}
          </nav>
        </div>

        <div className="mod-maincol">
          <header className="mod-masthead">
            {/* ⚠️ THE SLOT STAYS EVEN THOUGH THE WORDS CHANGED, and the two instructions are
                connected. Paul, 3 Aug: "I don't want to say free nothing to sign up for. You
                can take that off", and in the same breath, "I want to make sure that the
                navigation of the page starts at the same place as my other ones." A module
                page's eyebrow reads MODULE 1 OF 6 · OPENS MON 21 SEP and it is what sets the
                height of everything under it. Deleting the element rather than its text lifts
                this headline 29px above every module headline and breaks the second
                instruction while obeying the first.
                ⛔ SO THESE THREE WORDS ARE A PLACEHOLDER FOR HIS, not a decision. */}
            <p className="mod-eyebrow">The library</p>
            <h1 className="mod-h1">Everything from the course</h1>
            {/* ⭐⭐ MODULE 1'S FOX, AT MODULE 1'S SIZE, Paul 3 Aug 2026: "The fox is too big
                and it's pushing the page down. Look at the format for Module 1, the size of
                the fox and how it indents into the text, and copy that."

                ⭐ THE CAUSE WAS THE PICTURE, NOT THE CSS, and globals.css had already written
                it down beside .mod-meta: the fox FLOATS and the metadata row CLEARS it, so
                whenever the fox is taller than the prose beside it, the clear turns the
                overhang into dead space. fox-book.png is portrait and stands about 235px at
                180px wide; this page's standfirst is three lines. Every pixel of fox below
                the last line of prose became a hole above the metadata.

                ⛔ SO DO NOT SWAP THIS FOR A PORTRAIT ONE. chapter-fox-sitting-nobg.png is
                module 1's own and is roughly square, which is what lets the same 180px width
                and the same -60px gutter indent read identically on both pages. */}
            <div className="chapter-fox-hero">
              <img
                className="chapter-fox-hero-img"
                src="/fox/chapter-fox-sitting-nobg.png"
                alt=""
              />
            </div>
            <p className="mod-standfirst">
              Every prompt and every link, from all six modules, on one page. It is here
              so you can find the thing you half-remember without going back through a
              lesson to look for it. Take whatever is useful.
            </p>
            <div className="mod-meta">
              <span>
                From the lessons<b>{lessonCount} things</b>
              </span>
              <span>
                Modules<b>
                  {built} of {modules.length} built
                </b>
              </span>
              {/* ⭐⭐ "NO EMAIL NEEDED" IS GONE, PAUL 3 Aug 2026: "i want to remove 'no email
                  needed' everywhere", and in the same breath the reason, "I want everybody
                  that does the course must sign up through email."

                  ⛔ IT WAS NOT A WORDING PREFERENCE. The line promised the opposite of how the
                  course works, on the page holding the course's most useful material. It had
                  been true of this page in isolation and was never true of the course.

                  ⭐ THE REPLACEMENT IS HIS OWN APPROVED NOTE, IMPORTED NOT RETYPED.
                  courseCopy.freeNote carries a standing rule with it: say free, never "free
                  forever", because it must not bind his future pricing. Writing those words
                  again here would have put a second copy of a pricing claim in the codebase. */}
              <span>
                Cost<b>{HERO.freeNote}</b>
              </span>
              <span>
                Sharing<b>Copy anything. Send it on.</b>
              </span>
            </div>
          </header>

          <div className={s.tools}>
            <div className={s.searchwrap}>
              <input
                className={s.search}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search everything. Try transcript, or critic, or voice."
                aria-label="Search everything from the course"
              />
              {q && (
                <button type="button" className={s.clear} onClick={() => setQ("")}>
                  Clear
                </button>
              )}
            </div>

            {/* FILTERS ARE ONE AT A TIME. Paul's rule from the module page: multi-select
                confused him. Search is the primary move here and these are for browsing. */}
            <div className={s.mods}>
              <button
                type="button"
                aria-pressed={mod === null}
                onClick={() => setMod(null)}
              >
                All
              </button>
              {modules.map((m) => (
                <button
                  key={m.n}
                  type="button"
                  aria-pressed={mod === m.n}
                  disabled={!m.has}
                  title={m.has ? m.title : `${m.title} · opens ${m.when}`}
                  onClick={() => setMod(mod === m.n ? null : m.n)}
                >
                  {m.n}
                </button>
              ))}
            </div>
          </div>

          {filtering && (
            <p className={s.count}>
              <span>
                {total} {total === 1 ? "thing" : "things"} found
              </span>
              <button
                type="button"
                className={s.linkbtn}
                onClick={() => {
                  setQ("");
                  setMod(null);
                }}
              >
                show everything
              </button>
            </p>
          )}
          {flash && <p className={s.flashline}>{flash}</p>}

          {/* ⭐⭐ THE HIDDEN COUNT, WIRED 3 Aug 2026. `hidden` has been computed on the
              server and passed into this component since the page was built, and NOTHING
              EVER RENDERED IT. page.tsx says in as many words that what it hides is
              "counted in the build view so it is never silently dropped", and the count
              arrived here and was dropped. A prop that is destructured but never used
              raises no TypeScript error and fails no test, which is why it survived.

              ⛔ BUILD VIEW ONLY. It reports what a member is deliberately not being
              shown: Paul's unwritten placeholder items, and the file sets belonging to
              modules that have not shipped. A member never sees this line. */}
          {build && hidden > 0 && (
            <p className={s.flashline}>
              BUILD VIEW. {hidden} {hidden === 1 ? "thing is" : "things are"} hidden
              from the public page: unwritten items, and files from modules that are not
              built yet.
            </p>
          )}

          <main>
            {shown.map((sec) => (
              <section key={sec.slug} id={`s-${sec.slug}`} className={s.box}>
                <div className={s.boxhead}>
                  <span className={s.boxtitle}>{sec.title}</span>
                  <span className={s.boxcount}>
                    {sec.rows.length} {sec.rows.length === 1 ? "thing" : "things"}
                  </span>
                </div>

                {sec.rows.length === 0 && (
                  <p className={s.boxempty}>
                    Nothing here yet. Paul writes this one.
                  </p>
                )}

                {sec.rows.map((r) =>
                  /* ⭐ AN ITEM WITH NO ARTEFACT IS NOT A FOLDER, 3 Aug 2026. "Use a Voice
                     App" carries a figure and Paul's prose and nothing you can take, so the
                     first build drew it as a folder reading "0 files", which is a container
                     advertising its own emptiness. It still belongs on the page, because
                     leaving it out would make the library disagree with the module about how
                     many things are in it. It just isn't a folder: it is a row that points
                     back at the lesson. */
                  r.type === "folder" && r.files.length === 0 ? (
                    <Link key={r.key} className={s.rw} href={r.href}>
                      <span className={s.rwmain}>
                        <FileIcon />
                        <span className={s.rwname}>{r.name}</span>
                        <span className={s.rwdesc}>{r.desc}</span>
                      </span>
                      <span className={s.rwmeta}>in the lesson</span>
                      <span className={s.rwopen}>module {r.modN}</span>
                    </Link>
                  ) : r.type === "folder" ? (
                    <div key={r.key}>
                      <div className={s.rw}>
                        <button
                          type="button"
                          className={s.rwmain}
                          aria-expanded={open.has(r.key)}
                          onClick={() => toggle(r.key)}
                        >
                          <FolderIcon on={open.has(r.key)} />
                          <span className={s.rwname}>{r.name}</span>
                          <span className={s.rwdesc}>{r.desc}</span>
                        </button>
                        <span className={s.rwmeta}>
                          {r.files.length}{" "}
                          {r.files.length === 1 ? "file" : "files"}
                        </span>
                        <Link className={s.rwopen} href={r.href}>
                          module {r.modN}
                        </Link>
                      </div>

                      {/* ⛔⛔ RENDERED ALWAYS, HIDDEN WITH `hidden`, NEVER CONDITIONALLY
                          MOUNTED. A first pass returned `open && files.map(...)` and it
                          emptied the page of every external link: nine links were in the
                          HTML before the folders existed and zero after. This page is public
                          and ungated for one stated reason, that search and the AI engines
                          can read the list, and a link that only exists after a click is a
                          link they never see. The collapse is a reading affordance for a
                          human, so it belongs in the DOM and not in the render. */}
                      <div hidden={!open.has(r.key)}>
                        {r.files.map((f, j) =>
                          f.kind === "link" ? (
                            <a
                              key={j}
                              className={`${s.rw} ${s.child}`}
                              href={f.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className={s.rwmain}>
                                <LinkIcon />
                                <span className={s.rwname}>{f.name}</span>
                              </span>
                              <span className={s.rwmeta}>{f.meta}</span>
                            </a>
                          ) : (
                            <div key={j} className={`${s.rw} ${s.child}`}>
                              <button
                                type="button"
                                className={s.rwmain}
                                onClick={() => toggle(`${r.key}-p`)}
                                aria-expanded={open.has(`${r.key}-p`)}
                              >
                                <FileIcon />
                                <span className={s.rwname}>{f.name}</span>
                              </button>
                              <span className={s.rwmeta}>{f.meta}</span>
                              <button
                                type="button"
                                className={s.rwcopy}
                                onClick={() => copy(f.body as string, "Prompt copied")}
                              >
                                copy
                              </button>
                            </div>
                          ),
                        )}

                        {/* The prompt itself, opened from its own file row. Same rule as
                            above: in the DOM always, so it is copyable by a machine that
                            never clicks. */}
                        {r.files
                          .filter((f) => f.kind === "prompt")
                          .map((f, j) => (
                            <div
                              key={j}
                              className={s.promptwrap}
                              hidden={!open.has(`${r.key}-p`)}
                            >
                              <pre className={s.prompt}>{f.body}</pre>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      key={r.key}
                      className={s.rw}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={s.rwmain}>
                        <LinkIcon />
                        <span className={s.rwname}>{r.name}</span>
                        {r.note && <span className={s.rwdesc}>{r.note}</span>}
                      </span>
                      <span className={s.rwmeta}>{r.meta}</span>
                    </a>
                  ),
                )}
              </section>
            ))}

            {total === 0 && !build && (
              <p className={s.empty}>
                Nothing here matches <b>{q}</b>
                {mod !== null && " in that module"}. Try a plainer word, or{" "}
                <button
                  type="button"
                  className={s.linkbtn}
                  onClick={() => {
                    setQ("");
                    setMod(null);
                  }}
                >
                  show everything
                </button>
                .
              </p>
            )}
          </main>

          {/* WHAT IS STILL COMING. The page says plainly that it grows, rather than
              implying six modules of material already sit here. */}
          {modules.some((m) => !m.has) && (
            <section className={s.coming}>
              <p className={s.comingtitle}>Still to come</p>
              {modules
                .filter((m) => !m.has)
                .map((m) => (
                  <p key={m.n} className={s.comingrow}>
                    <span>Module {m.n}</span>
                    <span>{m.title}</span>
                    <span>{m.when}</span>
                  </p>
                ))}
            </section>
          )}

          {/* ⭐ THE ASK, AND ONLY FOR A STRANGER. A member has already given the email and
              must never be asked again. Everything above this line is theirs either way. */}
          {!isMember && (
            <section className={s.signup}>
              <h2 className={s.signuph}>These came from somewhere</h2>
              <p className={s.signupp}>
                Every one of these is lifted out of a lesson that says when to reach for
                it and what good looks like when it comes back. That is the course. It is
                free, it runs from 21 September, and it is six modules a fortnight apart.
              </p>
              <Link href="/course" className={s.signupcta}>
                See the course
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* ICONS. 16px, currentColor, square. Drawn rather than imported: a  */
/* three-line path costs nothing and an icon font would be a network */
/* request for four glyphs.                                          */
/* ---------------------------------------------------------------- */

function FolderIcon({ on }: { on: boolean }) {
  return (
    <svg className={`${s.ico} ${s.folder}`} viewBox="0 0 16 16" aria-hidden="true">
      {on ? (
        <path d="M1.5 13.5V4.5h4l1.5 2h7.5v7z" />
      ) : (
        <path d="M1.5 13.5v-11h5l1.5 2h7v9z" />
      )}
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className={s.ico} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 1.5h6l4 4v9H3z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className={s.ico} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6.5 9.5l3-3M7 4.5l1.5-1.5a2.5 2.5 0 013.5 3.5L10.5 8M9 11.5L7.5 13a2.5 2.5 0 01-3.5-3.5L5.5 8" />
    </svg>
  );
}
