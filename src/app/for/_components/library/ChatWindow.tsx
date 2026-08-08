"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Block, ChartSpec, Ref, Turn } from "./chatTypes";
import "./chat-window.css";

/**
 * A DEPICTED CHAT WINDOW HOLDING ONE RECORDED SESSION.
 *
 * Ported from
 * ~/projects/.rwf-wt-course-modules/src/app/course/[n]/ChatWindow.tsx. The source
 * pulled its chart data from a course-only generated file (chartData.generated.ts);
 * here charts are an optional prop instead (`charts`), keyed the same way a block's
 * `chart` field names them, so this component carries no course content.
 *
 * IT WRITES ITSELF OUT SLOWLY so a reader follows what the writer does, in order,
 * rather than skimming a finished transcript.
 *
 * NOT A LIVE CHATBOT. One recorded session, identical every time, no API.
 *
 * IT STARTS ON A CLICK, NEVER ON LOAD. A reveal you trigger is a live moment; an
 * autoplay is wallpaper, and it means nobody scrolls past a thing already halfway
 * through talking to itself. This also satisfies the rule that nothing on this site
 * hides content behind a scroll reveal: the session is not gated behind visibility,
 * only behind an explicit click, and once clicked it plays via setTimeout regardless
 * of scroll position.
 */

/**
 * SPEEDS ARE THE DESIGN HERE, so they are named and sit together rather than being
 * scattered as magic numbers.
 *
 * 45 characters a second is about twice comfortable silent reading speed (roughly 250
 * words a minute, call it 20 characters a second). Fast enough not to be a wait, slow
 * enough that the eye follows the line being written rather than arriving after it.
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
 * THE SESSION IS FLATTENED ONCE INTO UNITS, and playback is a single index into that
 * list. The alternative, tracking a turn and a block and a character in three pieces
 * of state, is where a player like this goes wrong: skip-to-end and replay then have
 * three things to agree on, and they eventually will not.
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
          /* THE EMAIL TYPES, line by line, and it is the one long block that earns it.
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
        case "chart":
          /* A chart lands whole, one beat, like a pasted image. Typing a drawing out
             character by character is not a thing. */
          units.push({ turn: t, kind: "rows", block, rows: 1 });
          break;
      }
    });
  });
  return units;
}

export default function ChatWindow({
  session,
  start,
  title = "a writer",
  charts = {},
  preview = false,
}: {
  /** The recorded session this window plays. One window, one recording. */
  session: Turn[];
  /** The start plate's one line of type, in our own voice, saying what will happen. */
  start: string;
  /** The title-bar label, e.g. "a writer" or "an analyst". */
  title?: string;
  /** Chart data for any block of kind "chart", keyed by that block's `chart` name.
   *  Omit if the session has no chart blocks. */
  charts?: Record<string, ChartSpec>;
  /** Show the opening question as a real chat bubble before play is pressed, so
   *  the collapsed window reads as a conversation about to happen rather than
   *  an empty card. (Paul, 8 Aug: the bare start plate made no sense to him.) */
  preview?: boolean;
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
        /* Characters land in small groups rather than one at a time, so the browser is
           not asked for 45 renders a second on a page that may also have an animated
           figure on it. */
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
    <div className="ppchat">
      <div className="ppchat-bar">
        <i className="ppchat-dot ppchat-dot-r" />
        <i className="ppchat-dot ppchat-dot-a" />
        <i className="ppchat-dot ppchat-dot-g" />
        <span className="ppchat-title">{title}</span>
      </div>

      <div className="ppchat-body">
        {!started && preview && units[0]?.kind === "you" && (
          /* The opening question, already asked, so the reader knows what this
             window is before pressing anything. */
          <UnitView unit={units[0]} within={Infinity} charts={charts} />
        )}
        {!started && (
          /* NOT A PLAY TRIANGLE ON A BLACK RECTANGLE. That reads as video, and this is
             not video. It is a line of type in our own voice saying what will happen.
             Everything below still exists in the DOM and renders fully once played;
             nothing here is gated behind scroll, only behind this explicit click. */
          <div className="ppchat-start">
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
                charts={charts}
              />
            );
          })}
      </div>

      {started && (
        /* THE COMPOSER. It is scenery: no input, no focus ring, no cursor. A box that
           invites typing it cannot answer is a worse lie than no box. */
        <div className="ppchat-composer" aria-hidden="true">
          <p className="ppchat-ph">Write a message...</p>
          <div className="ppchat-crow">
            <span className="ppchat-plus">+</span>
            <span className="ppchat-model">
              Opus 5<i>High</i>
            </span>
          </div>
        </div>
      )}

      {started && (
        <div className="ppchat-controls">
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

/** Groups a reply's blocks under one mark, so a reply reads as one reply. */
function UnitView({
  unit,
  prev,
  within,
  charts,
}: {
  unit: Unit;
  prev?: Unit;
  within: number;
  charts: Record<string, ChartSpec>;
}) {
  if (unit.kind === "you") {
    return (
      <div className="ppchat-you">
        <p>{unit.text}</p>
      </div>
    );
  }
  if (unit.kind === "mark") {
    return (
      <div className="ppchat-writer ppchat-writer-head">
        <ClaudeMark />
      </div>
    );
  }
  const openTurn = prev && prev.turn === unit.turn;
  return (
    <div className={`ppchat-writer${openTurn ? " ppchat-writer-cont" : ""}`}>
      <BlockView block={unit.block} within={within} charts={charts} />
    </div>
  );
}

function clip(text: string, within: number) {
  return within === Infinity ? text : text.slice(0, within);
}

function BlockView({
  block,
  within,
  charts,
}: {
  block: Block;
  within: number;
  charts: Record<string, ChartSpec>;
}) {
  switch (block.kind) {
    case "p":
      return <p className="ppchat-p">{clip(block.text, within)}</p>;

    case "flag":
      return <p className="ppchat-flag">{clip(block.text, within)}</p>;

    case "plan": {
      /* A DEFINITION LIST, NOT BULLETS. The plan is label and answer, and its whole
         purpose is that a reader can argue with one line. Bullets hide which line
         that is. */
      const shown = within === Infinity ? block.lines.length : within;
      return (
        <dl className="ppchat-plan">
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
        <div className="ppchat-email">
          {subject !== null && (
            <p className="ppchat-subject">
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
            <p className="ppchat-sign">
              {sign.map((s, i) => (s === null ? null : <span key={i}>{s}</span>))}
            </p>
          )}
          {complete && (block.refs?.some(Boolean) || block.subjectRef) && (
            <p className="ppchat-refhint">The dotted lines are the source map. Hover one.</p>
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
        <div className="ppchat-post">
          {body.map((line, i) =>
            line === null ? null : (
              <p key={i}>
                <Sourced text={line} refx={complete ? block.refs?.[i] : null} />
              </p>
            ),
          )}
          {complete && block.refs?.some(Boolean) && (
            <p className="ppchat-refhint">The dotted lines are the source map. Hover one.</p>
          )}
        </div>
      );
    }

    case "audit": {
      const whole = `${block.label} ${block.text}`;
      const shown = clip(whole, within);
      return (
        <p className="ppchat-audit">
          <b>{shown.slice(0, block.label.length)}</b>
          {shown.slice(block.label.length)}
        </p>
      );
    }

    case "grid": {
      const shown = within === Infinity ? block.rows.length : within;
      return (
        <div className="ppchat-gridwrap">
          <table className="ppchat-grid">
            <caption>{block.title}</caption>
            <tbody>
              {block.rows.slice(0, shown).map(([what, mark, why], i) => (
                <tr key={i}>
                  <th scope="row">{what}</th>
                  {/* The mark is allowed to carry colour because the grid's whole worth
                      is that it sometimes says six. */}
                  <td className="ppchat-mark">{mark}</td>
                  <td className="ppchat-why">{why}</td>
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
        <p className="ppchat-total">
          <b>{shown.slice(0, block.text.length)}</b>
          <span>{shown.slice(block.text.length)}</span>
        </p>
      );
    }

    case "chart": {
      if (within !== Infinity && within < 1) return null;
      const spec = charts[block.chart];
      /* A named chart that is not in the `charts` prop is a caller error, and it must
         be loud rather than a silently empty block. */
      if (!spec) return <p className="ppchat-flag">Unknown chart: {block.chart}</p>;
      return (
        <div className="ppchat-chart">
          <ChartFig spec={spec} />
          {block.caption && <p className="ppchat-chartcap">{block.caption}</p>}
        </div>
      );
    }
  }
}

/**
 * THE DRAWN CHART. Hand-built SVG in the library's own chrome: mono labels, hairline
 * rules, sky blue and ink as the two series colours, square everything. No chart
 * library. Points arrive from the `charts` prop, so every number here is passed in by
 * the caller, never typed.
 */
function ChartFig({ spec }: { spec: ChartSpec }) {
  const W = 640;
  const H = 300;
  const L = 46;
  const R = 10;
  const T = 30;
  const B = 30;
  /* Sky, ink, and a muted grey for a possible third series. */
  const COLORS = ["#3A7CA5", "#1D1B1B", "#8A8A85"];

  const weeks = spec.series[0].points.map(([w]) => w);
  const isDated = /^\d{4}-\d{2}/.test(String(weeks[0]));
  const maxY = Math.max(...spec.series.flatMap((s) => s.points.map(([, v]) => v)));
  /* A round ceiling so the top gridline is a readable number. */
  const step = maxY > 200 ? 100 : 50;
  const top = Math.ceil(maxY / step) * step;

  const x = (i: number) => L + (i / Math.max(1, weeks.length - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - v / top) * (H - T - B);
  const xOfWeek = (w: string) => {
    const i = weeks.indexOf(w);
    return i === -1 ? null : x(i);
  };

  /* Dated series get one tick where each month starts; categorical series get every
     label, anchored so the first and last stay inside the frame. */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ticks: { at: number; label: string; anchor?: "start" | "end" | "middle" }[] = [];
  if (isDated) {
    let lastMonth = "";
    weeks.forEach((w, i) => {
      const m = w.slice(5, 7);
      if (m !== lastMonth) {
        ticks.push({ at: x(i), label: MONTHS[+m - 1] });
        lastMonth = m;
      }
    });
  } else {
    weeks.forEach((w, i) => {
      ticks.push({
        at: x(i),
        label: String(w),
        anchor: i === 0 ? "start" : i === weeks.length - 1 ? "end" : "middle",
      });
    });
  }

  const gridVals = Array.from({ length: top / step }, (_, i) => (i + 1) * step);
  const mono = "'JetBrains Mono', ui-monospace, Menlo, monospace";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={spec.title}>
      <text x={L} y={14} fontFamily={mono} fontSize={11} letterSpacing="0.06em" fill="#8A8A85">
        {spec.title.toUpperCase()}
      </text>

      {/* The shaded weeks, under everything else. */}
      {spec.bands?.map((b, i) => {
        const x1 = xOfWeek(b.from);
        const x2 = xOfWeek(b.to);
        if (x1 === null || x2 === null) return null;
        return (
          <g key={i}>
            <rect x={x1} y={T} width={x2 - x1} height={H - T - B} fill="rgba(58,124,165,0.08)" />
            <text x={x1 + 4} y={T + 12} fontFamily={mono} fontSize={9} letterSpacing="0.05em" fill="#8A8A85">
              {b.label}
            </text>
          </g>
        );
      })}

      {gridVals.map((v) => (
        <g key={v}>
          <line x1={L} y1={y(v)} x2={W - R} y2={y(v)} stroke="#E0E0DC" strokeWidth={1} />
          <text x={L - 6} y={y(v) + 3} textAnchor="end" fontFamily={mono} fontSize={9} fill="#8A8A85">
            {v}
          </text>
        </g>
      ))}
      <line x1={L} y1={y(0)} x2={W - R} y2={y(0)} stroke="#1D1B1B" strokeWidth={1} />
      {ticks.map((t, i) => (
        <text
          key={i}
          x={t.at}
          y={H - 10}
          textAnchor={t.anchor ?? "start"}
          fontFamily={mono}
          fontSize={isDated ? 9 : 8}
          fill="#8A8A85"
        >
          {t.label}
        </text>
      ))}

      {spec.series.map((s, si) => (
        <polyline
          key={s.name}
          fill="none"
          stroke={COLORS[si % COLORS.length]}
          strokeWidth={1.8}
          points={s.points.map(([w, v], i) => `${x(i)},${y(v)}`).join(" ")}
        />
      ))}

      {/* Legend, top right, only when there is something to tell apart. */}
      {spec.series.length > 1 &&
        spec.series.map((s, si) => (
          <text
            key={s.name}
            x={W - R}
            y={14 + si * 13}
            textAnchor="end"
            fontFamily={mono}
            fontSize={10}
            fill={COLORS[si % COLORS.length]}
          >
            {s.name}
          </text>
        ))}
    </svg>
  );
}

/**
 * A LINE THAT KNOWS WHERE IT CAME FROM. The ref data comes from wherever the caller's
 * recorded session put it; this component only renders it.
 *
 * MARKERS APPEAR ONLY WHEN THE BLOCK HAS FINISHED TYPING (never mid-type), so
 * playback stays clean and the map arrives as a single moment. Hover raises the card;
 * `tabIndex` makes tap and keyboard raise it too via :focus-within.
 */
function Sourced({ text, refx }: { text: string; refx?: Ref | null }) {
  if (!refx) return <>{text}</>;
  /* A quote from a .csv is a raw data row, so it renders in mono: the machine
     talking. Prose quotes keep the italic serif. */
  const raw = refx.file.endsWith(".csv");
  return (
    <span className="ppchat-ref" tabIndex={0}>
      {text}
      <span className={`ppchat-refcard${raw ? " ppchat-refcard-raw" : ""}`} role="note">
        <b>{refx.file}</b>
        {refx.quote}
      </span>
    </span>
  );
}

/**
 * Claude's mark, at the head of a reply. With the composer it is the other thing that
 * says whose product this is.
 */
function ClaudeMark() {
  return (
    <svg
      className="ppchat-mark-icon"
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
