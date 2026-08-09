"use client";

/**
 * THE ADOPTION EXHIBIT: A MARKETING WEEK, BEFORE AND AFTER.
 *
 * Built 9 Aug from Paul's own sentence on the Fidelity page, which is the whole
 * argument: "Not everybody is going to be a builder. For most of the team a
 * good result is that one part of their week is different from how it was
 * before."
 *
 * ⭐ WHY A WEEK AND NOT A SCALE. `FluencyMap` (parked beside this) already did
 * before-and-after, as fourteen small readings in fourteen rows, and the reader
 * has to do the aggregating. The blueprint slider works because it is ONE scene
 * that changes state and you read the change in a single look. This is that: one
 * grid, 140 blocks of work, and the change arrives across all of them at once.
 *
 * ⭐ AND IT SURVIVES A SMALL TEAM. A five-bucket fluency distribution needs a
 * population to have a shape; Kite is fourteen people, which is three per bucket
 * and nothing visibly moves. Counting BLOCKS OF WORK rather than people gives 140
 * units at n=14, so the shape is legible here and still legible at a hundred and
 * twenty.
 *
 * ⭐ THE NUMBERS ARE DELIBERATELY MODEST. 20 blocks of 140, twelve of fourteen
 * people changing something, two changing nothing. A picture where everyone
 * turns blue would be the adoption-theatre version and no marketer would believe
 * it. The honest shape is uneven, and the unevenness is the teaching.
 *
 * No drag handle: the workflows slider owns that device and it is the page's
 * best-liked thing (Paul, 9 Aug: "it's not just about being a slider").
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./week-grid.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
/** Two blocks a day, so a week is ten units of work per person. */
const PER_DAY = 2;
const COLS = DAYS.length * PER_DAY;

/**
 * One row per person, and the block indices that are done a different way a year
 * in. Hand-set, never random: the file has to render the same on the server, in
 * the browser and in a screenshot, and the SHAPE is the argument rather than a
 * plausible-looking spread. Most people change one thing. One content lead runs
 * ahead. Two people change nothing, which is what a real year looks like.
 */
const TEAM: { role: string; changed: number[] }[] = [
  { role: "Marketing director", changed: [2] },
  { role: "Brand lead", changed: [5] },
  { role: "Campaign manager", changed: [1, 6] },
  { role: "Campaign manager", changed: [] },
  { role: "Content lead", changed: [0, 3, 7, 8] },
  { role: "Copywriter", changed: [4] },
  { role: "Copywriter", changed: [2, 9] },
  { role: "Social manager", changed: [1] },
  { role: "Designer", changed: [] },
  { role: "Designer", changed: [6] },
  { role: "Digital manager", changed: [3, 5] },
  { role: "CRM manager", changed: [8] },
  { role: "Insights analyst", changed: [0, 4, 7] },
  { role: "PR manager", changed: [5] },
];

/** Milliseconds. The wave sweeps left to right and drifts down as it goes. */
const COL_STEP = 55;
const ROW_STEP = 18;
const CELL_MS = 380;
const SWEEP_MS = (COLS - 1) * COL_STEP + (TEAM.length - 1) * ROW_STEP + CELL_MS;

export default function WeekGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [after, setAfter] = useState(false);
  const [reduced, setReduced] = useState(false);

  const totals = useMemo(() => {
    const changed = TEAM.reduce((n, p) => n + p.changed.length, 0);
    return {
      blocks: TEAM.length * COLS,
      changed,
      movers: TEAM.filter((p) => p.changed.length > 0).length,
      still: TEAM.filter((p) => p.changed.length === 0).length,
    };
  }, []);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /**
   * IT TURNS ITSELF ONCE, WHEN IT COMES INTO VIEW, then the control owns it. A
   * reader who scrolls past must not miss the only thing this figure does; a
   * reader who wants it again presses. Both states render fully either way, so
   * nothing here is content hidden behind a scroll reveal.
   */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setAfter(true);
          io.disconnect();
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`ppwk${after ? " ppwk-after" : ""}${reduced ? " ppwk-still" : ""}`}
      ref={rootRef}
      style={{ ["--ppwk-cell" as string]: `${CELL_MS}ms` }}
    >
      <div className="ppwk-bar">
        <i />
        <i />
        <i />
        <span className="ppwk-title">a marketing week</span>
        <div className="ppwk-switch" role="group" aria-label="When">
          <button
            type="button"
            data-on={!after}
            onClick={() => setAfter(false)}
            aria-pressed={!after}
          >
            today
          </button>
          <button
            type="button"
            data-on={after}
            onClick={() => setAfter(true)}
            aria-pressed={after}
          >
            a year in
          </button>
        </div>
      </div>

      <div className="ppwk-panel">
        <div className="ppwk-days">
          <span className="ppwk-corner">
            {/* The fox marks this as OUR demonstration rather than knowledge of
                anyone's insides, per the metaphor-marker rule. Monday fox, at
                the top of the week, on cream. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fox/fox-monday-nobg.png" alt="" className="ppwk-fox" />
          </span>
          <span className="ppwk-daycells">
            {DAYS.map((d) => (
              <span key={d} className="ppwk-day">
                {d}
              </span>
            ))}
          </span>
        </div>

        <div className="ppwk-rows">
          {TEAM.map((person, r) => (
            <div className="ppwk-row" key={`${person.role}-${r}`}>
              <span className="ppwk-role">{person.role}</span>
              <span className="ppwk-cells">
                {Array.from({ length: COLS }, (_, c) => {
                  const on = person.changed.includes(c);
                  return (
                    <span
                      key={c}
                      className={`ppwk-cell${on ? " ppwk-on" : ""}`}
                      style={{
                        ["--d" as string]: `${c * COL_STEP + r * ROW_STEP}ms`,
                      }}
                    />
                  );
                })}
              </span>
            </div>
          ))}
        </div>

        <Readout after={after} reduced={reduced} totals={totals} />
      </div>

      <p className="ppwk-honest">
        <span className="ppwk-slash">/illustrative.</span> Every block is a piece
        of work somebody does in a week. A year in, the ones that changed are the
        ones we drove end to end and then switched the old way off. Nobody
        becomes a different person, and two people here changed nothing, which is
        what a real year looks like.
      </p>
    </div>
  );
}

/**
 * The payoff line, counted rather than asserted. The number climbs across the
 * same window the wave takes, so the sentence finishes as the grid settles.
 */
function Readout({
  after,
  reduced,
  totals,
}: {
  after: boolean;
  reduced: boolean;
  totals: { blocks: number; changed: number; movers: number; still: number };
}) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  useEffect(() => {
    stop();
    const target = after ? totals.changed : 0;
    if (reduced) {
      setN(target);
      return;
    }
    const from = n;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / SWEEP_MS);
      // Matches the sweep's feel: quick to start, settling at the end.
      const eased = 1 - Math.pow(1 - p, 2);
      setN(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return stop;
    // `n` is the starting value only, so it must not retrigger the run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [after, reduced, totals.changed, stop]);

  return (
    <p className="ppwk-readout">
      <span className="ppwk-n">{n}</span>
      <span> of {totals.blocks} blocks done a different way.</span>
      <span className="ppwk-sub">
        {after
          ? `${totals.movers} of the ${totals.movers + totals.still} changed something. ${totals.still} did not.`
          : "The same week, every week."}
      </span>
    </p>
  );
}
