"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LinkEntry } from "../moduleData";
import { slugOf } from "../moduleData";
import s from "./Everything.module.css";

/**
 * ⭐ ONE SHAPE FOR EVERY LINK ON THIS PAGE, whichever slot it came out of. page.tsx merges
 * an item's `links` and `reading` into this; the note there says why the module page's
 * distinction between them stops at the door.
 *
 * ⛔ `why` IS OPTIONAL HERE AND THAT IS NOT A LOOSENING. LinkEntry requires one and marks it
 * PAUL'S TO WRITE; `reading` deliberately has no such field, because the alternative is a
 * one-line reason invented on his behalf on a public page. So a reading row shows what it is
 * and who made it, and stays silent about why, until he writes one.
 */
export type Ref = Omit<LinkEntry, "why"> & { why?: string };

export type Row = {
  modN: number;
  modTitle: string;
  /** 1-based position in its module. The module page numbers items, so this matches. */
  i: number;
  t: string;
  text: string;
  prompt?: string;
  refs?: Ref[];
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
  rows,
  modules,
  hidden,
}: {
  rows: Row[];
  modules: ModuleRow[];
  hidden: number;
}) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [build, setBuild] = useState(false);
  const isMember = useIsMember();

  useEffect(() => {
    setBuild(new URLSearchParams(window.location.search).has(BUILD_PARAM));
  }, []);

  const say = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(null), 1600);
  };

  /* ⭐ SEARCH COVERS THE BODY, NOT JUST TITLES. Somebody looking for this months later
     remembers "the one about the spreadsheet", and the word spreadsheet may only appear
     in the prose. Titles-only search would fail exactly the person this page is for. */
  const haystack = useMemo(() => {
    const m = new Map<Row, string>();
    rows.forEach((r) => {
      const parts = [r.t, r.text, r.prompt ?? "", r.modTitle];
      r.refs?.forEach((L) => parts.push(L.title, L.why ?? "", L.by));
      m.set(r, parts.join(" ").toLowerCase());
    });
    return m;
  }, [rows]);

  const shown = useMemo(() => {
    /* Every word must match, in any order and anywhere. "spreadsheet chart" finds the
       item that mentions both, which is how people actually half-remember things. */
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return rows.filter((r) => {
      if (mod !== null && r.modN !== mod) return false;
      if (!terms.length) return true;
      const h = haystack.get(r) ?? "";
      return terms.every((t) => h.includes(t));
    });
  }, [rows, q, mod, haystack]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      say(label);
    } catch {
      say("Copy failed");
    }
  };

  /* ⭐ THE LINK BACK IS FOR CONTEXT, NEVER FOR THE ARTEFACT. If someone has to click
     into the module to get the prompt, this page is a second place to hunt and we have
     made things worse. You leave with the thing from here. */
  const moduleHref = (r: Row) => `/course/${r.modN}#i${r.i}`;

  const built = modules.filter((m) => m.has).length;

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

      {build && (
        <div className="mod-build">
          <b>BUILD VIEW. A member never sees this.</b> {rows.length}{" "}
          {rows.length === 1 ? "thing" : "things"} published
          {" · "}
          {hidden} {hidden === 1 ? "item is" : "items are"} hidden as placeholder
          {" · "}
          {built} of {modules.length} modules have content
        </div>
      )}

      <header className="mod-masthead">
        <p className="mod-eyebrow">Free · nothing to sign up for</p>
        <h1 className="mod-h1">Everything from the course</h1>
        <p className="mod-standfirst">
          Every prompt and every link, from all six modules, on one page. It is here so
          you can find the thing you half-remember without going back through a lesson to
          look for it. Take whatever is useful.
        </p>
        <div className="mod-meta">
          <span>
            On this page<b>{rows.length} things</b>
          </span>
          <span>
            From<b>
              {built} of {modules.length} modules
            </b>
          </span>
          <span>
            Cost<b>Free, and no email needed</b>
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
            placeholder="Search everything. Try spreadsheet, or critic, or voice."
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
            Everything
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

      <div className={s.count}>
        <span>
          {shown.length} {shown.length === 1 ? "thing" : "things"}
          {q || mod !== null ? " found" : ""}
        </span>
        {flash && <span className={s.flash}>{flash}</span>}
      </div>

      <main>
        {shown.map((r) => (
          <article key={`${r.modN}-${r.i}`} className={s.row}>
            <div className={s.rowtop}>
              <span className="mod-type">Module {r.modN}</span>
              <h2 className={s.h2}>{r.t}</h2>
              <Link className={s.open} href={moduleHref(r)}>
                Open in module {r.modN}
              </Link>
            </div>

            {/* THE DESCRIPTION, NOT THE LESSON. One line of what it is so a scanner
                knows whether this is the one. The teaching stays in the module. */}
            <p className={s.desc}>{firstSentence(r.text)}</p>

            {r.prompt && (
              <div className="mod-copybox">
                <div className="mod-copyhead">
                  <span>Paste this into Claude or ChatGPT</span>
                  <button
                    type="button"
                    onClick={() => copy(r.prompt as string, "Prompt copied")}
                  >
                    Copy
                  </button>
                </div>
                <pre>{r.prompt}</pre>
              </div>
            )}

            {r.refs && (
              <div className={s.links}>
                {r.refs.map((L, j) => (
                  <a
                    key={j}
                    href={L.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.link}
                  >
                    <span className={s.ltitle}>{L.title}</span>
                    {/* Rendered only when it exists. See the note on Ref. */}
                    {L.why && <span className={s.lwhy}>{L.why}</span>}
                    <span className={s.lmeta}>{L.by}</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}

        {shown.length === 0 && (
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
            Every one of these is lifted out of a lesson that says when to reach for it
            and what good looks like when it comes back. That is the course. It is free,
            it runs from 21 September, and it is six modules a fortnight apart.
          </p>
          <Link href="/course" className={s.signupcta}>
            See the course
          </Link>
        </section>
      )}
    </div>
  );
}

/**
 * The first sentence of Paul's prose, as the row's description.
 * ⛔ NEVER REWRITE HIS WORDS TO FIT. Taking his opening sentence is a cut, which is
 * reversible and honest. Summarising would put words in his mouth on a public page.
 */
function firstSentence(text: string): string {
  const m = text.match(/^[\s\S]*?[.?!](?=\s|$)/);
  const out = (m ? m[0] : text).trim();
  return out.length > 200 ? out.slice(0, 197).trimEnd() + "..." : out;
}
