"use client";

/**
 * ONE FINISHED PIECE OF WRITING, IN THE WRITER'S WINDOW.
 *
 * Replaces the two recorded ChatWindow sessions in the Writer section
 * (Paul, 9 Aug): "we are taking away lots of stuff that is too complex when
 * reading cold, and they are seeing a writer and seeing it is using brand docs
 * because of the hover."
 *
 * So everything the writer DID around the writing is gone: the plan, the slop
 * audit, the score, the claims ledger, the composer. What is left is the
 * finished email or post and the dotted lines.
 *
 * THE EMAIL TYPES ITSELF OUT on scroll-in (Paul, 9 Aug: "it used to be typing
 * and now I'm just seeing it as a pure image. Can we still see the words
 * typing?"). The base state is the finished email, so nothing needs
 * JavaScript to exist; the scroll-in restarts it as a performance. Reduced
 * motion keeps the finished piece still. A line's dotted underline appears
 * once that line has finished typing.
 *
 * ⛔ AND THE HOVER NAMES NO FILES. The source map quoted `positioning-statement.md`
 * back at the reader, which reads as our filing system rather than their brand.
 * The note says what the line is made of instead: their positioning, their
 * messaging framework, their approved proof point, their approved voice. Four
 * notes, no more, because a fifth would be a new idea to hold.
 *
 * The frame, the dots and the dotted-line hover are the same CSS the chat window
 * uses, so this window is that window with the machinery taken out.
 */

import { useEffect, useRef, useState } from "react";
import "./chat-window.css";

/** The four things a line can be made of. Prospect-facing wording, no filenames. */
export const NOTE = {
  positioning: "Your brand positioning, reflected here.",
  messaging: "Comes from your messaging framework.",
  proof: "Your approved proof point.",
  voice: "Written in your approved voice.",
} as const;

export type NoteKey = keyof typeof NOTE;

/** A line of the piece. `note` absent means no dotted underline on that line. */
export type Line = { text: string; note?: NoteKey };

function Noted({ line }: { line: Line }) {
  if (!line.note) return <>{line.text}</>;
  return (
    <span className="ppchat-ref" tabIndex={0}>
      {line.text}
      <span className="ppchat-refcard ppchat-refcard-note" role="note">
        {NOTE[line.note]}
      </span>
    </span>
  );
}

const HINT = "Hover a dotted line to see what it is made of.";

/** Same pace as the chat window: fast enough not to be a wait, slow enough
    that the eye follows the line being written. */
const CHARS_PER_SECOND = 45;
const LINE_PAUSE_MS = 320;

/** Drives the typing: returns how many lines are fully shown, and how much
    of the current line. `done` starts true (whole piece shown) and the
    scroll-in restarts it once. */
function useTyping(lineTexts: string[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<number>(lineTexts.length);
  const [chars, setChars] = useState(0);
  const [playing, setPlaying] = useState(false);
  /** ⛔ RESERVE THE FULL HEIGHT BEFORE THE TYPING RESETS IT TO EMPTY.
   *  The piece renders whole on first paint so it reads with JavaScript off,
   *  then the scroll-in sets `shown` to 0 and types it back. Without a floor
   *  that collapse takes about 600px out of the middle of the page, and every
   *  anchor BELOW the writer overshoots by that much: clicking Brand Guardian
   *  in the rail landed 599px past it (Paul, 11 Aug). Measured, not guessed,
   *  because the height depends on the copy and the column width. */
  const [minH, setMinH] = useState<number>();

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
          // Measured while the piece is still whole, which is the only moment
          // the real finished height is on the page.
          setMinH(el.getBoundingClientRect().height);
          setShown(0);
          setChars(0);
          setPlaying(true);
        }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || shown >= lineTexts.length) return;
    const text = lineTexts[shown];
    if (chars < text.length) {
      const t = setTimeout(
        () => setChars((c) => Math.min(text.length, c + 3)),
        (1000 / CHARS_PER_SECOND) * 3
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1);
      setChars(0);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [playing, shown, chars, lineTexts]);

  return { rootRef, shown, chars, playing, minH };
}

export function WriterEmail({
  title = "the writer",
  subject,
  body,
  sign,
}: {
  title?: string;
  subject: Line;
  body: Line[];
  sign: string[];
}) {
  const lines = [subject, ...body];
  const { rootRef, shown, chars, playing, minH } = useTyping(
    lines.map((l) => l.text)
  );
  const done = shown >= lines.length;

  const renderLine = (line: Line, i: number) => {
    if (i < shown) return <Noted line={line} />;
    if (i === shown && playing && !done)
      return (
        <>
          {line.text.slice(0, chars)}
          <span className="ppchat-caret" />
        </>
      );
    return null;
  };

  return (
    <div className="ppchat" ref={rootRef} style={minH ? { minHeight: minH } : undefined}>
      <div className="ppchat-bar">
        <i className="ppchat-dot ppchat-dot-r" />
        <i className="ppchat-dot ppchat-dot-a" />
        <i className="ppchat-dot ppchat-dot-g" />
        <span className="ppchat-title">{title}</span>
      </div>
      <div className="ppchat-body">
        <div className="ppchat-email ppchat-piece">
          <p className="ppchat-subject">
            <span>Subject</span>
            {renderLine(subject, 0)}
          </p>
          {body.map((line, i) =>
            renderLine(line, i + 1) === null ? null : (
              <p key={i}>{renderLine(line, i + 1)}</p>
            )
          )}
          {done && (
            <>
              <p className="ppchat-sign">
                {sign.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </p>
              <p className="ppchat-refhint">{HINT}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function WriterPost({
  title = "the writer",
  body,
}: {
  title?: string;
  body: Line[];
}) {
  return (
    <div className="ppchat">
      <div className="ppchat-bar">
        <i className="ppchat-dot ppchat-dot-r" />
        <i className="ppchat-dot ppchat-dot-a" />
        <i className="ppchat-dot ppchat-dot-g" />
        <span className="ppchat-title">{title}</span>
      </div>
      <div className="ppchat-body">
        <div className="ppchat-post ppchat-piece">
          {body.map((line, i) => (
            <p key={i}>
              <Noted line={line} />
            </p>
          ))}
          <p className="ppchat-refhint">{HINT}</p>
        </div>
      </div>
    </div>
  );
}
