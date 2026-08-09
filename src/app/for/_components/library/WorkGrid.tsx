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

/** Ten pieces of work per area. The blocks have no order and are not time: what
 *  carries meaning is how many of the ten are filled. */
const COLS = 10;

const STOPS = [
  { label: "today", line: "Where teams usually start. A few people, on their own, nothing repeated." },
  { label: "Q1", line: "Champions named across the areas, with hours genuinely set aside." },
  { label: "Q2", line: "First jobs of work taken end to end, and the old route closed on a date." },
  { label: "Q3", line: "Leaders doing it themselves, in public. It stops being a project." },
  { label: "Q4", line: "13 of the 14 areas changed something. Events did not." },
];

/**
 * One row per area of work, and how many of its ten pieces are done a different
 * way at each stop: today, Q1, Q2, Q3, Q4.
 *
 * ⛔ A ROW FILLS FROM THE LEFT AND ONLY EVER GROWS. The first cut scattered the
 * turned blocks along the row, which put blue, grey, blue next to each other.
 * Paul read it exactly as it looks: "it is blue but then not blue. then blue
 * again. i'd have thought once we crack it, we don't go back to old way?" He is
 * right, and the cause was mine: a quarter timeline sitting directly above ten
 * columns teaches the eye that across means time, so any gap reads as a relapse.
 * The columns are ten unrelated pieces of work and have no order, so ordering
 * them by state costs nothing true and makes the one thing that matters legible
 * at a glance: the filled length of a row never shortens.
 *
 * Hand-set, never random: the file has to render identically on the server, in
 * the browser and in a screenshot, and the SHAPE is the argument. It lands first
 * and hardest where the work is repetitive and written, never touches events,
 * and gets nowhere near everything. 36 pieces of 140 after a full year.
 */
const AREAS: { area: string; by: [number, number, number, number, number] }[] = [
  { area: "Go-to-market launches", by: [0, 1, 1, 2, 2] },
  { area: "Campaign planning", by: [0, 0, 1, 1, 2] },
  { area: "Brand and messaging", by: [1, 1, 2, 3, 3] },
  { area: "Content and articles", by: [1, 2, 3, 4, 5] },
  { area: "Studio and design", by: [1, 2, 3, 4, 5] },
  { area: "Website", by: [0, 0, 1, 1, 2] },
  { area: "Email and CRM", by: [0, 1, 1, 2, 2] },
  { area: "Paid media", by: [1, 1, 2, 2, 3] },
  { area: "Social", by: [1, 1, 2, 3, 3] },
  { area: "Events", by: [0, 0, 0, 0, 0] },
  { area: "Research and insight", by: [1, 2, 2, 3, 3] },
  { area: "Sales enablement", by: [0, 1, 1, 1, 2] },
  { area: "PR and comms", by: [0, 0, 0, 1, 1] },
  { area: "Reporting", by: [1, 1, 2, 2, 3] },
];

/**
 * WHAT THE CHANGED WORK BOUGHT. Three measures, moved by the same four quarters.
 *
 * ⭐ THEY ARE NUMBERS, NOT DIRECTIONS (Paul, 9 Aug): "if we're faster, we need
 * to measure by how much faster, same with cost. it is not a yes or no answer.
 * These are measurable things." A chart that only says "faster" is the version
 * a client cannot hold anyone to.
 *
 * ⭐ NOTHING MOVES IN Q1, and that is the honest part. Q1 is champions, protected
 * hours and picking the first jobs. A curve that starts paying in month one is
 * the version nobody believes.
 *
 * ⭐ AND THE GRID ABOVE IS THE CEILING ON ALL THREE. Only work that changed can
 * move these numbers, so 26% of the work changing is what caps the gain. That is
 * why the two halves are one exhibit and one run rather than two charts.
 *
 * `ghost` is where the measure started, so the bar is read against its own
 * baseline. Two of them shrink and one grows, which is the picture.
 */
const MEASURES: {
  q: string;
  unit: string;
  by: [number, number, number, number, number];
  scale: number;
  grows?: boolean;
  note: (v: number, base: number) => string;
}[] = [
  {
    q: "Are we getting it done faster?",
    unit: "days from brief to done",
    by: [12, 12, 10, 8, 7],
    scale: 12,
    note: (v, base) =>
      v === base
        ? `${base} days, the number we took before starting`
        : `${base} days before, ${v} now`,
  },
  {
    q: "Are we doing it more cost-effectively?",
    unit: "cost of a piece of work",
    by: [1850, 1850, 1640, 1420, 1290],
    scale: 1850,
    note: (v, base) =>
      v === base
        ? `EUR ${base.toLocaleString("en-IE")} a piece, agency and freelance in`
        : `EUR ${base.toLocaleString("en-IE")} before, EUR ${v.toLocaleString("en-IE")} now`,
  },
  {
    q: "Are we doing things we could not get to before?",
    unit: "pieces a quarter that used to not happen",
    by: [0, 0, 3, 7, 11],
    scale: 12,
    grows: true,
    note: (v) =>
      v === 0
        ? "the work permanently at the bottom of the list"
        : "work that would not have happened at all",
  },
];

/**
 * Milliseconds. A quarter's blocks arrive as a wave, not a slab.
 *
 * ⭐ THE WAVE HAS TO FINISH WELL BEFORE THE NEXT QUARTER STARTS. The first cut
 * ran a ~900ms wave on a 1150ms hold, so the grid never came to rest and Paul
 * read continuous movement as blocks not staying turned. They always did stay,
 * nothing is ever un-turned mid-run, but a picture that never settles cannot
 * say so. Now: ~660ms of movement, then ~840ms of stillness before the next.
 */
const COL_STEP = 22;
const ROW_STEP = 8;
const CELL_MS = 360;
const WAVE_MS = (COLS - 1) * COL_STEP + (AREAS.length - 1) * ROW_STEP + CELL_MS;
/** Long enough to watch a quarter land, and then to see it sit there. */
const HOLD_MS = 1500;

export default function WorkGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  /** Running total of blocks turned at each stop, computed rather than typed. */
  const totals = useMemo(() => {
    const perStop = STOPS.map((_, s) => AREAS.reduce((n, a) => n + a.by[s], 0));
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
        {/* ⛔ THE TIMELINE SPANS THE WHOLE WINDOW, NOT THE CELL COLUMNS. Sat
            over the cells it reads as their axis, and now that rows fill from
            the left a five-block row looks like it "reached Q2". Starting it
            left of the area names breaks that mapping: it is the run's clock,
            not the grid's scale. */}
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

        <div className="ppwg-rows">
          {AREAS.map((a, r) => (
            <div className="ppwg-row" key={a.area}>
              <span className="ppwg-area">{a.area}</span>
              <span className="ppwg-cells">
                {Array.from({ length: COLS }, (_, c) => (
                  <span
                    key={c}
                    className={`ppwg-cell${c < a.by[step] ? " ppwg-on" : ""}`}
                    style={{ ["--d" as string]: `${c * COL_STEP + r * ROW_STEP}ms` }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="ppwg-foot">
          <Readout
            target={totals.perStop[step]}
            blocks={totals.blocks}
            line={STOPS[step].line}
            reduced={reduced}
          />
          {/* The fox marks this as OUR demonstration rather than knowledge of
              anyone's insides, per the metaphor-marker rule. On cream. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fox/fox-pm-nobg.png" alt="" className="ppwg-fox" />
        </div>

        <div className="ppwg-gains">
          <p className="ppwg-gains-h">and what that bought</p>
          {MEASURES.map((m) => {
            const v = m.by[step];
            const base = m.by[0];
            const pct = base === 0 ? 0 : Math.round(((base - v) / base) * 100);
            return (
              <div className="ppwg-gain" key={m.q}>
                <span className="ppwg-gain-q">
                  {m.q}
                  <span className="ppwg-gain-u">{m.unit}</span>
                </span>
                <span className="ppwg-gain-track">
                  {/* Where it started, kept in view so the bar is read against
                      its own baseline rather than against the other two. */}
                  <span
                    className="ppwg-gain-ghost"
                    style={{ ["--w" as string]: `${(base / m.scale) * 100}%` }}
                  />
                  <span
                    className="ppwg-gain-fill"
                    style={{ ["--w" as string]: `${(v / m.scale) * 100}%` }}
                  />
                </span>
                <span className="ppwg-gain-n">
                  <b>
                    {m.grows
                      ? v === 0
                        ? "none yet"
                        : `${v} a quarter`
                      : pct === 0
                        ? "no change yet"
                        : `${pct}% ${m.by[0] > m.by[4] && m.unit.startsWith("days") ? "faster" : "cheaper"}`}
                  </b>
                  <span>{m.note(v, base)}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="ppwg-honest">
        <span className="ppwg-slash">/illustrative.</span> Every block is a piece
        of work a marketing team does, ten to an area, and the blue length is how
        much of that area is done a different way. It is by area rather than by
        person because roles change and the work does not. Nothing ever goes
        back: we drive a job end to end and then switch the old way off. After a
        full year most of the work is still done the way it always was, which is
        also the ceiling on the three numbers underneath: only work that changed
        can move them. Every one is measured against a baseline taken before
        anything starts, and nothing moves in the first quarter.
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

  const pct = Math.round((n / blocks) * 100);

  return (
    <p className="ppwg-readout">
      <span className="ppwg-n">{pct}%</span>
      <span> of the work done a different way, {n} pieces of {blocks}.</span>
      <span className="ppwg-sub">{line}</span>
    </p>
  );
}
