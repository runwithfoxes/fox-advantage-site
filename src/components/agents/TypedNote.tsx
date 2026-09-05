"use client";

/*
  A NOTE FROM AN AGENT TO PAUL, TYPED.

  The hero's Research Agent card (subject, the avatar and from/to line, the
  "by AI" tag, "Hi Paul," paragraphs, arrow bullets, an attachment chip), at
  reading size, with the words typed out rather than arriving. Paul, 5 Sep:
  "I think we have the writing being typed. Not just arriving like that."

  Typing runs at the same pace as Jo's morning note on the proposal pages
  (45 characters a second, a short pause between paragraphs). It starts when
  the card comes into view, holds when finished, then clears and goes again.
  Reduced motion shows the whole note at once. Without JavaScript the whole
  note is there too: the base state is finished, and only the effect winds it
  back to type.

  Text uses **double stars** for bold, nothing else.
*/

import { useEffect, useMemo, useRef, useState } from "react";

export type NoteItem = { kind: "lead" | "p" | "li" | "att"; text: string };

const CPS = 45;
const STEP = 3;
const PARA_PAUSE_MS = 420;
const HOLD_MS = 7000;

function plain(text: string) {
  return text.replace(/\*\*/g, "");
}

/* Renders the first `n` visible characters of a **bold**-marked string. */
function Partial({ text, n }: { text: string; n: number }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  let left = n;
  return (
    <>
      {parts.map((part, i) => {
        if (left <= 0) return null;
        const take = part.slice(0, left);
        left -= take.length;
        return i % 2 === 1 ? <b key={i}>{take}</b> : <span key={i}>{take}</span>;
      })}
    </>
  );
}

export default function TypedNote({
  title,
  pill = "ready",
  subject,
  from,
  to = "Paul",
  avatar,
  items,
  variant = "note",
  role,
}: {
  title: string;
  pill?: string;
  subject: string;
  from: string;
  to?: string;
  avatar: string;
  items: NoteItem[];
  /** "note" is the email card from the hero; "post" is a LinkedIn post with the author on top. */
  variant?: "note" | "post";
  /** the post variant's second line under the author */
  role?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lengths = useMemo(() => items.map((it) => plain(it.text).length), [items]);
  const total = useMemo(() => lengths.reduce((a, b) => a + b, 0), [lengths]);
  const starts = useMemo(() => {
    const out: number[] = [];
    let acc = 0;
    for (const l of lengths) {
      out.push(acc);
      acc += l;
    }
    return out;
  }, [lengths]);

  // finished by default, so the note is whole without JavaScript
  const [count, setCount] = useState<number>(total);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let started = false;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting || started) return;
          started = true;
          setCount(0);
          setPlaying(true);
        }),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (count >= total) {
      const t = setTimeout(() => setCount(0), HOLD_MS);
      return () => clearTimeout(t);
    }
    // pause a beat at the end of each item
    const atBoundary = starts.some((s, i) => i > 0 && s === count);
    const t = setTimeout(
      () => setCount((c) => Math.min(total, c + STEP)),
      atBoundary ? PARA_PAUSE_MS : (1000 / CPS) * STEP
    );
    return () => clearTimeout(t);
  }, [playing, count, total, starts]);

  // which item is being typed right now (for the caret)
  const current = starts.findIndex((s, i) => count >= s && count < s + lengths[i]);

  const rendered: React.ReactNode[] = [];
  let i = 0;
  while (i < items.length) {
    const it = items[i];
    const shown = Math.max(0, Math.min(lengths[i], count - starts[i]));
    if (shown <= 0) break;
    const caret = i === current ? <span className="agw-caret" /> : null;
    if (it.kind === "li") {
      const lis: React.ReactNode[] = [];
      while (i < items.length && items[i].kind === "li") {
        const s = Math.max(0, Math.min(lengths[i], count - starts[i]));
        if (s <= 0) break;
        lis.push(
          <li key={i}>
            <Partial text={items[i].text} n={s} />
            {i === current ? <span className="agw-caret" /> : null}
          </li>
        );
        i += 1;
      }
      rendered.push(<ul key={`ul${i}`}>{lis}</ul>);
      continue;
    }
    if (it.kind === "att") {
      rendered.push(
        <div key={i} className="agw-att">
          <span className="agw-ic">&#9636;</span>
          <Partial text={it.text} n={shown} />
        </div>
      );
    } else {
      rendered.push(
        <p key={i} className={it.kind === "lead" ? "agw-lead" : undefined}>
          <Partial text={it.text} n={shown} />
          {caret}
        </p>
      );
    }
    i += 1;
  }

  return (
    <div className="agw" ref={rootRef}>
      <div className="agw-tl">
        <i />
        <i />
        <i />
        <span className="agw-t">{title}</span>
        <span className="agw-pill">{playing && count < total ? "writing" : pill}</span>
      </div>
      <div className="agw-panel">
        <div className="agw-eml">
          {variant === "post" ? (
            <div className="agw-post-head">
              <span className="agw-post-av">{avatar}</span>
              <span className="agw-post-who">
                <b>{from}</b>
                <span>{role}</span>
              </span>
              <span className="agw-tag" style={{ marginLeft: "auto" }}>&#10022; by AI</span>
            </div>
          ) : (
            <div className="agw-ehd">
              <div className="agw-subj">{subject}</div>
              <div className="agw-addr">
                <span className="agw-av">{avatar}</span>
                <span>
                  from <b>{from}</b> &middot; to <b>{to}</b>
                </span>
                <span className="agw-tag">&#10022; by AI</span>
              </div>
            </div>
          )}
          <div className="agw-ebody">{rendered}</div>
        </div>
      </div>
    </div>
  );
}
