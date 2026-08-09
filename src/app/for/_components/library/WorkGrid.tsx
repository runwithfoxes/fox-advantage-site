"use client";

/**
 * THE ADOPTION EXHIBIT: THE WORK A MARKETING TEAM DOES, CHANGING OVER FOUR QUARTERS.
 *
 * One scene that changes state, which is the property that makes the blueprint
 * slider work and the one `FluencyMap` lacked: fourteen separate readings made
 * the reader do the aggregating.
 *
 * ⭐ ROWS ARE AREAS OF WORK, NOT PEOPLE (Paul, 9 Aug): "roles are going to
 * change, so it has to be by task or use case... in reality some of those roles
 * are going to change and disappear." A grid of job titles dates itself and
 * invites the reader to argue with the org chart instead of reading the point.
 * Go-to-market, studio, events and research are still there in three years.
 *
 * ⭐ TODAY IS NOT ZERO (Paul, same turn). Seven blocks are already done a
 * different way before anyone is hired, because every marketing team has a few
 * people quietly doing it. Starting at zero would be flattering to us and wrong,
 * and the prospect knows their own team better than we do. They are scattered
 * across the columns rather than lined up in the first one: a tidy opening
 * stripe reads as a designed chart, and this is meant to read as a team.
 *
 * ⭐ THE QUARTERS ARE THE MECHANISM, NOT A PROGRESS BAR. Each stop's line names
 * what was actually done that quarter, so the animation teaches the four levers
 * out of the Sabre research (champions with real hours, one job of work end to
 * end with the old route closed on a date, leaders doing it in public, the
 * behaviours written down) instead of a paragraph listing them.
 *
 * ⭐ AND IT SURVIVES A SMALL TEAM. Counting BLOCKS OF WORK rather than people
 * gives 140 units whether the team is fourteen or a hundred and twenty. A
 * five-bucket fluency distribution needs a population to have a shape.
 *
 * No drag handle: the workflows slider owns that device and it is the page's
 * best-liked thing (Paul, 9 Aug: "it's not just about being a slider").
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./work-grid.css";

/** Ten pieces of work per area. Deliberately not days: an area of work does not
 *  run Monday to Friday, and a false week would be precision we do not have. */
const COLS = 10;

const STOPS = [
  { label: "today", line: "Where teams usually start. A few people, on their own, nothing repeated." },
  { label: "Q1", line: "Champions named across the areas, with hours genuinely set aside." },
  { label: "Q2", line: "First jobs of work taken end to end, and the old route closed on a date." },
  { label: "Q3", line: "Leaders doing it themselves, in public. It stops being a project." },
  { label: "Q4", line: "13 of the 14 areas changed something. Events did not." },
];

/**
 * One row per area of work. Each of the ten blocks carries the quarter it starts
 * being done a different way: 0 is already true today, 1 to 4 is the quarter it
 * turns, null is never.
 *
 * Hand-set, never random. The file has to render identically on the server, in
 * the browser and in a screenshot, and the SHAPE is the argument: it lands first
 * and hardest where the work is repetitive and written, barely touches events,
 * and never gets near everything. 36 blocks of 140 after a full year.
 */
const N = null;
const AREAS: { area: string; q: (number | null)[] }[] = [
  { area: "Go-to-market launches", q: [N, N, 1, N, N, 3, N, N, N, N] },
  { area: "Campaign planning", q: [N, 2, N, N, N, N, 4, N, N, N] },
  { area: "Brand and messaging", q: [N, N, N, 2, N, N, 0, 3, N, N] },
  { area: "Content and articles", q: [0, N, 1, N, 2, N, N, 3, N, 4] },
  { area: "Studio and design", q: [N, N, 1, N, 0, 2, N, 3, 4, N] },
  { area: "Website", q: [N, N, N, 2, N, N, N, N, 4, N] },
  { area: "Email and CRM", q: [N, 1, N, N, 3, N, N, N, N, N] },
  { area: "Paid media", q: [N, N, 0, N, N, 2, N, N, N, 4] },
  { area: "Social", q: [N, N, 2, N, N, N, 3, 0, N, N] },
  { area: "Events", q: [N, N, N, N, N, N, N, N, N, N] },
  { area: "Research and insight", q: [N, N, N, 1, N, 0, N, 3, N, N] },
  { area: "Sales enablement", q: [N, N, 1, N, N, N, N, N, 4, N] },
  { area: "PR and comms", q: [N, N, N, N, 3, N, N, N, N, N] },
  { area: "Reporting", q: [N, N, N, 2, N, N, 4, N, 0, N] },
];

/** Milliseconds. A quarter's blocks arrive as a wave, not a slab. */
const COL_STEP = 40;
const ROW_STEP = 14;
const CELL_MS = 360;
const WAVE_MS = (COLS - 1) * COL_STEP + (AREAS.length - 1) * ROW_STEP + CELL_MS;
/** Long enough to watch a quarter land before the next one starts. */
const HOLD_MS = 1150;

export default function WorkGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  /** Running total of blocks turned at each stop, computed rather than typed. */
  const totals = useMemo(() => {
    const perStop = STOPS.map((_, s) =>
      AREAS.reduce(
        (n, a) => n + a.q.filter((q) => q !== null && q <= s).length,
        0
      )
    );
    return { perStop, blocks: AREAS.length * COLS };
  }, []);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /** Plays itself once when it comes into view, so a reader who scrolls past
   *  cannot miss the only thing this figure does. The stops stay clickable. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setPlaying(true);
          io.disconnect();
        }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (reduced) {
      setStep(STOPS.length - 1);
      setPlaying(false);
      return;
    }
    if (step >= STOPS.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 550 : HOLD_MS);
    return () => clearTimeout(t);
  }, [playing, step, reduced]);

  const replay = useCallback(() => {
    setStep(0);
    // A tick, so the grid clears before the run starts again.
    setTimeout(() => setPlaying(true), 60);
  }, []);

  const atEnd = step === STOPS.length - 1;

  return (
    <div
      className={`ppwg${reduced ? " ppwg-still" : ""}`}
      ref={rootRef}
      style={{ ["--ppwg-cell" as string]: `${CELL_MS}ms` }}
    >
      <div className="ppwg-bar">
        <i />
        <i />
        <i />
        <span className="ppwg-title">the work, quarter by quarter</span>
        <button
          type="button"
          className="ppwg-replay"
          onClick={replay}
          disabled={playing}
        >
          {playing ? "running" : atEnd ? "play it again" : "play"}
        </button>
      </div>

      <div className="ppwg-panel">
        {/* The timeline sits where a chart would put its axis, because the
            quarters ARE the argument: the change is paced, not switched on.
            The fox takes the label column beside it, which is dead space. */}
        <div className="ppwg-head">
          <span className="ppwg-corner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fox/fox-pm-nobg.png" alt="" className="ppwg-fox" />
          </span>
          <div className="ppwg-time" role="group" aria-label="Quarter">
          <span
            className="ppwg-progress"
            style={{ ["--p" as string]: `${(step / (STOPS.length - 1)) * 100}%` }}
          />
          {STOPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className="ppwg-stop"
              data-on={i <= step}
              data-now={i === step}
              aria-pressed={i === step}
              onClick={() => {
                setPlaying(false);
                setStep(i);
              }}
            >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ppwg-rows">
          {AREAS.map((a, r) => (
            <div className="ppwg-row" key={a.area}>
              <span className="ppwg-area">{a.area}</span>
              <span className="ppwg-cells">
                {a.q.map((q, c) => (
                  <span
                    key={c}
                    className={`ppwg-cell${q !== null && q <= step ? " ppwg-on" : ""}`}
                    style={{ ["--d" as string]: `${c * COL_STEP + r * ROW_STEP}ms` }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>

        <Readout
          target={totals.perStop[step]}
          blocks={totals.blocks}
          line={STOPS[step].line}
          reduced={reduced}
        />
      </div>

      <p className="ppwg-honest">
        <span className="ppwg-slash">/illustrative.</span> Every block is a piece
        of work a marketing team does. It is by area rather than by person
        because roles change and the work does not. The ones that turn are the
        jobs we drove end to end and then switched the old way off, and after a
        full year most of the work is still done the way it always was.
      </p>
    </div>
  );
}

/**
 * The payoff, counted rather than asserted. The number climbs across the same
 * window the wave takes, so the sentence settles as the quarter lands.
 */
function Readout({
  target,
  blocks,
  line,
  reduced,
}: {
  target: number;
  blocks: number;
  line: string;
  reduced: boolean;
}) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const stop = () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
    stop();
    if (reduced) {
      setN(target);
      return;
    }
    let from = 0;
    setN((cur) => {
      from = cur;
      return cur;
    });
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / WAVE_MS);
      const eased = 1 - Math.pow(1 - p, 2);
      setN(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return stop;
  }, [target, reduced]);

  return (
    <p className="ppwg-readout">
      <span className="ppwg-n">{n}</span>
      <span> of {blocks} pieces of work done a different way.</span>
      <span className="ppwg-sub">{line}</span>
    </p>
  );
}
