"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Block, Ref, Turn } from "../writerSession";

/**
 * ⭐⭐ THE WRITER, WORKING. Module 2, item 04. A depicted chat window holding one recorded
 * session, so a learner sees the BEHAVIOUR of the files they installed in item 03 rather than
 * another finished artefact. Paul: "this is where we actually see a question being asked in a
 * chatbot, and we see the user experience based on the DNA on how it should work."
 *
 * ⭐ ITS TITLE BAR SAYS `a writer`, THE SAME LABEL AS THE WINDOW IN fig-11 at the top of item
 * 01. The drawing that opens the module and the real thing that closes it are the same object.
 *
 * ⭐⭐ IT WRITES ITSELF OUT SLOWLY. Paul, 4 Aug: "it needs to write it slowly so people can
 * read." That is the whole point of the item: the reader is meant to follow what the writer
 * does, in order, not skim a finished transcript. A dump on the page is the thing this
 * replaces.
 *
 * ⛔ NOT A LIVE CHATBOT. One recorded session, identical every time, no API. Paul ruled out
 * running it live: "I'm not sure there is huge benefit v risk of running it live." But it is
 * recorded from a REAL run rather than written, because we hand people the same files and
 * anyone can compare within minutes.
 *
 * ⛔ IT STARTS ON A CLICK, NEVER ON LOAD. Same call he made on the Norcros image pack: a
 * reveal you trigger is a live moment, an autoplay is wallpaper. It also means nobody scrolls
 * past a thing that is halfway through talking to itself.
 */

/**
 * ⭐ SPEEDS ARE THE DESIGN HERE, so they are named and sit together rather than being
 * scattered as magic numbers.
 *
 * 45 characters a second is about twice comfortable silent reading speed (roughly 250 words a
 * minute, call it 20 characters a second). Fast enough not to be a wait, slow enough that the
 * eye follows the line being written rather than arriving after it. ⚠️ Tune HERE if Paul says
 * it is too quick or too slow. Do not scatter new timings through the component.
 */
const CHARS_PER_SECOND = 45;
/** The beat between one block finishing and the next starting. A person's pause for breath. */
const BLOCK_PAUSE_MS = 420;
/** Structured rows (plan lines, grid rows) land one at a time rather than typing. */
const ROW_MS = 190;
/** The person's message appears whole. They typed it before they sent it. */
const YOU_PAUSE_MS = 700;

type Unit =
  | { turn: number; kind: "you"; text: string }
  | { turn: number; kind: "mark" }
  | { turn: number; kind: "typed"; block: Block; text: string }
  | { turn: number; kind: "rows"; block: Block; rows: number };

/**
 * ⭐ THE SESSION IS FLATTENED ONCE INTO UNITS, and playback is a single index into that list.
 * The alternative, tracking a turn and a block and a character in three pieces of state, is
 * where a player like this goes wrong: skip-to-end and replay then have three things to
 * agree on, and they eventually will not.
 */
function buildUnits(session: Turn[]): Unit[] {
  const units: Unit[] = [];
  session.forEach((turn, t) => {
    if (turn.who === "you") {
      units.push({ turn: t, kind: "you", text: turn.text });
      return;
    }
    units.push({ turn: t, kind: "mark" });
    turn.blocks.forEach((block) => {
      switch (block.kind) {
        case "p":
        case "flag":
          units.push({ turn: t, kind: "typed", block, text: block.text });
          break;
        case "audit":
          units.push({
            turn: t,
            kind: "typed",
            block,
            text: `${block.label} ${block.text}`,
          });
          break;
        case "score":
          units.push({
            turn: t,
            kind: "typed",
            block,
            text: `${block.text} ${block.weakest}`,
          });
          break;
        case "email":
          /* ⭐ THE EMAIL TYPES, line by line, and it is the one long block that earns it.
             It is the thing they came to see produced. */
          units.push({
            turn: t,
            kind: "typed",
            block,
            text: [block.subject, ...block.body, ...block.sign].join(" "),
          });
          break;
        case "post":
          /* The post is an artefact like the email: it types. */
          units.push({
            turn: t,
            kind: "typed",
            block,
            text: block.body.join(" "),
          });
          break;
        case "plan":
          units.push({ turn: t, kind: "rows", block, rows: block.lines.length });
          break;
        case "grid":
          units.push({ turn: t, kind: "rows", block, rows: block.rows.length });
          break;
      }
    });
  });
  return units;
}

export default function ChatWindow({
  session,
  start,
}: {
  /** The recorded session this window plays. One window, one recording. */
  session: Turn[];
  /** The start plate's one line of type, in our own voice, saying what will happen. */
  start: string;
}) {
  const units = useMemo(() => buildUnits(session), [session]);
  const [playing, setPlaying] = useState(false);
  /** How many units are finished. */
  const [done, setDone] = useState(0);
  /** Progress inside the current unit: characters typed, or rows landed. */
  const [within, setWithin] = useState(0);
  const [ended, setEnded] = useState(false);
  const timer = useRef<number | null>(null);

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const skip = useCallback(() => {
    clear();
    setPlaying(false);
    setEnded(true);
    setDone(units.length);
    setWithin(0);
  }, [units.length]);

  const play = () => {
    clear();
    setDone(0);
    setWithin(0);
    setEnded(false);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    if (done >= units.length) {
      setPlaying(false);
      setEnded(true);
      return;
    }
    const unit = units[done];

    const next = (ms: number, fn: () => void) => {
      timer.current = window.setTimeout(fn, ms);
    };

    if (unit.kind === "you" || unit.kind === "mark") {
      next(unit.kind === "you" ? YOU_PAUSE_MS : BLOCK_PAUSE_MS, () => {
        setDone((d) => d + 1);
        setWithin(0);
      });
    } else if (unit.kind === "rows") {
      if (within >= unit.rows) {
        next(BLOCK_PAUSE_MS, () => {
          setDone((d) => d + 1);
          setWithin(0);
        });
      } else {
        next(ROW_MS, () => setWithin((w) => w + 1));
      }
    } else {
      if (within >= unit.text.length) {
        next(BLOCK_PAUSE_MS, () => {
          setDone((d) => d + 1);
          setWithin(0);
        });
      } else {
        /* Characters land in small groups rather than one at a time, so the browser is not
           asked for 45 renders a second on a page that also has an animated figure on it. */
        next(1000 / (CHARS_PER_SECOND / 3), () =>
          setWithin((w) => Math.min(w + 3, unit.text.length)),
        );
      }
    }
    return clear;
  }, [playing, done, within, units]);

  useEffect(() => clear, []);

  const started = playing || ended;

  return (
    <div className="cw">
      <div className="cw-bar">
        <i className="r" />
        <i className="a" />
        <i className="g" />
        <span className="cw-title">a writer</span>
      </div>

      <div className="cw-body">
        {!started && (
          /* ⛔ NOT A PLAY TRIANGLE ON A BLACK RECTANGLE. That reads as video, and this is not
             video. It is a line of type in our own voice saying what will happen. */
          <div className="cw-start">
            <p>{start}</p>
            <button type="button" onClick={play}>
              Watch it work
            </button>
          </div>
        )}

        {started &&
          units.map((unit, i) => {
            if (i > done) return null;
            const complete = ended || i < done;
            return (
              <UnitView
                key={i}
                unit={unit}
                prev={i > 0 ? units[i - 1] : undefined}
                within={complete ? Infinity : within}
              />
            );
          })}
      </div>

      {started && (
        /* ⭐⭐ THE COMPOSER. Paul: "it is not clear that it is a chat screen." This answers
            that before a word is read. ⛔ IT IS SCENERY: no input, no focus ring, no cursor.
            A box that invites typing it cannot answer is a worse lie than no box. */
        <div className="cw-composer" aria-hidden="true">
          <p className="ph">Write a message...</p>
          <div className="cw-crow">
            <span className="plus">+</span>
            <span className="cw-model">
              Opus 5<i>High</i>
            </span>
          </div>
        </div>
      )}

      {started && (
        <div className="cw-controls">
          {playing ? (
            <button type="button" onClick={skip}>
              Skip to the end
            </button>
          ) : (
            <button type="button" onClick={play}>
              Play it again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** ⭐ Groups the writer's blocks under one mark, so a reply reads as one reply. */
function UnitView({
  unit,
  prev,
  within,
}: {
  unit: Unit;
  prev?: Unit;
  within: number;
}) {
  if (unit.kind === "you") {
    return (
      <div className="cw-you">
        <p>{unit.text}</p>
      </div>
    );
  }
  if (unit.kind === "mark") {
    return (
      <div className="cw-writer cw-writer-head">
        <ClaudeMark />
      </div>
    );
  }
  const openTurn = prev && prev.turn === unit.turn;
  return (
    <div className={`cw-writer${openTurn ? " cw-writer-cont" : ""}`}>
      <BlockView block={unit.block} within={within} />
    </div>
  );
}

function clip(text: string, within: number) {
  return within === Infinity ? text : text.slice(0, within);
}

function BlockView({ block, within }: { block: Block; within: number }) {
  switch (block.kind) {
    case "p":
      return <p className="cw-p">{clip(block.text, within)}</p>;

    case "flag":
      return <p className="cw-flag">{clip(block.text, within)}</p>;

    case "plan": {
      /* ⭐ A DEFINITION LIST, NOT BULLETS. The plan is label and answer, and its whole purpose
         is that a reader can argue with ONE line. Bullets hide which line that is. */
      const shown = within === Infinity ? block.lines.length : within;
      return (
        <dl className="cw-plan">
          {block.lines.slice(0, shown).map(([k, v], i) => (
            <div key={i}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      );
    }

    case "email": {
      const whole = [block.subject, ...block.body, ...block.sign].join(" ");
      const complete = within === Infinity;
      const upto = complete ? whole.length : within;
      let used = 0;
      const take = (s: string) => {
        const start = used;
        used += s.length + 1;
        return upto <= start ? null : s.slice(0, Math.max(0, upto - start));
      };
      const subject = take(block.subject);
      const body = block.body.map(take);
      const sign = block.sign.map(take);
      return (
        <div className="cw-email">
          {subject !== null && (
            <p className="cw-subject">
              <span>Subject</span>
              <Sourced text={subject} refx={complete ? block.subjectRef : null} />
            </p>
          )}
          {body.map((line, i) =>
            line === null ? null : (
              <p key={i}>
                <Sourced text={line} refx={complete ? block.refs?.[i] : null} />
              </p>
            ),
          )}
          {sign.some((s) => s !== null) && (
            <p className="cw-sign">
              {sign.map((s, i) =>
                s === null ? null : <span key={i}>{s}</span>,
              )}
            </p>
          )}
          {complete && (block.refs?.some(Boolean) || block.subjectRef) && (
            <p className="cw-refhint">The dotted lines are the source map. Hover one.</p>
          )}
        </div>
      );
    }

    case "post": {
      const complete = within === Infinity;
      const upto = complete ? block.body.join(" ").length : within;
      let used = 0;
      const take = (s: string) => {
        const start = used;
        used += s.length + 1;
        return upto <= start ? null : s.slice(0, Math.max(0, upto - start));
      };
      const body = block.body.map(take);
      return (
        <div className="cw-post">
          {body.map((line, i) =>
            line === null ? null : (
              <p key={i}>
                <Sourced text={line} refx={complete ? block.refs?.[i] : null} />
              </p>
            ),
          )}
          {complete && block.refs?.some(Boolean) && (
            <p className="cw-refhint">The dotted lines are the source map. Hover one.</p>
          )}
        </div>
      );
    }

    case "audit": {
      const whole = `${block.label} ${block.text}`;
      const shown = clip(whole, within);
      return (
        <p className="cw-audit">
          <b>{shown.slice(0, block.label.length)}</b>
          {shown.slice(block.label.length)}
        </p>
      );
    }

    case "grid": {
      const shown = within === Infinity ? block.rows.length : within;
      return (
        <div className="cw-gridwrap">
          <table className="cw-grid">
            <caption>{block.title}</caption>
            <tbody>
              {block.rows.slice(0, shown).map(([what, mark, why], i) => (
                <tr key={i}>
                  <th scope="row">{what}</th>
                  {/* ⭐ The mark is allowed to carry colour because the grid's whole worth is
                      that it sometimes says six. */}
                  <td className="cw-mark">{mark}</td>
                  <td className="cw-why">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "score": {
      const whole = `${block.text} ${block.weakest}`;
      const shown = clip(whole, within);
      return (
        <p className="cw-total">
          <b>{shown.slice(0, block.text.length)}</b>
          <span>{shown.slice(block.text.length)}</span>
        </p>
      );
    }
  }
}

/**
 * ⭐⭐ A LINE THAT KNOWS WHERE IT CAME FROM. Paul, 4 Aug: highlight lines in the artefact
 * "so that if you hover over them you could see that's the positioning, that's the messaging
 * framework... it becomes obvious that everything is being reviewed against those things in a
 * visual way." The ref data comes from the writer's own source map in the run, never from
 * annotation after the fact.
 *
 * ⭐ MARKERS APPEAR ONLY WHEN THE BLOCK HAS FINISHED TYPING (the ruling: never mid-type), so
 * playback stays clean and the map arrives as a single moment: the artefact settles, then
 * shows its sources. Hover raises the card; `tabIndex` makes tap and keyboard raise it too
 * via :focus-within, so it is not a mouse-only feature.
 */
function Sourced({ text, refx }: { text: string; refx?: Ref | null }) {
  if (!refx) return <>{text}</>;
  return (
    <span className="cw-ref" tabIndex={0}>
      {text}
      <span className="cw-refcard" role="note">
        <b>{refx.file}</b>
        {refx.quote}
      </span>
    </span>
  );
}

/**
 * Claude's mark, at the head of a reply. With the composer it is the other thing in Paul's
 * reference screenshot that says whose product this is, which matters because the module
 * teaches this product rather than "an AI".
 */
function ClaudeMark() {
  return (
    <svg
      className="cw-mark-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="12"
          y1="12"
          x2={12 + 9 * Math.cos((i * Math.PI) / 6)}
          y2={12 + 9 * Math.sin((i * Math.PI) / 6)}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
