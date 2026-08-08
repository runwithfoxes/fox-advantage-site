"use client";

/**
 * THE YARDSTICK. An SVG bar chart teaching "how different is different enough": a set
 * of ordinary pairs land against a line marked as the point past which two things read
 * as the same, and one "subject" pair is drawn to cross it.
 *
 * Ported from ~/projects/.rwf-wt-course-modules/src/app/course/[n]/SimilarityScale.tsx.
 * The source pulled its numbers from a generated file specific to the course
 * (chartData.generated.ts, built from a CSV). Here the same shape is a prop instead,
 * so this component carries no course content and any caller can pass its own data.
 *
 * Rebuilt as one SVG rather than CSS bars on tracks, so the "same people" zone is a
 * wash drawn behind the bars, the rule is a hairline, and everything shares one
 * coordinate system. Square ends throughout: this repo bans rounded corners on its own
 * chrome.
 *
 * The animation tells the story in order: the ordinary bars land first, a beat, then
 * the subject bar runs long and crosses the line as its tag appears. Honoured under
 * prefers-reduced-motion by rendering finished (see the .module.css).
 */

import styles from "./SimilarityScale.module.css";

export type SimilarityScaleData = {
  /** The chart's own title, printed top-left. */
  title: string;
  /** Where the "same as each other" line sits, 0-100. */
  line: number;
  /** The label printed beside the line, e.g. "the same people". */
  lineLabel: string;
  /** Each row: a name, a value 0-100, and whether it is the one bar meant to cross the line. */
  pairs: { name: string; value: number; subject?: boolean }[];
};

const W = 640;
const H = 216;
const L = 216; /* label column */
const R = 34; /* room for a value beyond a full-length bar */
const T = 40;
const B = 26;
const BAR = 12;

export function SimilarityScale({ data }: { data: SimilarityScaleData }) {
  const { title, line, lineLabel, pairs } = data;
  const plotW = W - L - R;
  const x = (v: number) => L + (plotW * v) / 100;
  const rowH = (H - T - B) / pairs.length;
  const yMid = (i: number) => T + rowH * i + rowH / 2;
  const mono = "'JetBrains Mono', ui-monospace, Menlo, monospace";
  const lineX = x(line);

  return (
    <figure className={styles.ppscaleWrap}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        <text x={L} y={16} fontFamily={mono} fontSize={11} letterSpacing="0.06em" fill="#8A8A85">
          {title.toUpperCase()}
        </text>

        {/* The zone and its rule, behind everything: past the line, same people. */}
        <rect x={lineX} y={T} width={x(100) - lineX} height={H - T - B} fill="rgba(58,124,165,0.07)" />
        {[50, 100].map((v) => (
          <line key={v} x1={x(v)} y1={T} x2={x(v)} y2={H - B} stroke="#E0E0DC" strokeWidth={1} />
        ))}
        <line
          className={styles.ppscaleRule}
          x1={lineX}
          y1={T}
          x2={lineX}
          y2={H - B}
          stroke="#1D1B1B"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          className={styles.ppscaleTag}
          x={lineX - 6}
          y={T - 8}
          textAnchor="end"
          fontFamily={mono}
          fontSize={9}
          letterSpacing="0.08em"
          fill="#8A8A85"
        >
          {line}: {lineLabel.toUpperCase()}
        </text>

        {pairs.map((p, i) => (
          <g key={p.name}>
            <text
              x={L - 12}
              y={yMid(i) + 3.5}
              textAnchor="end"
              fontFamily={mono}
              fontSize={10.5}
              fill="#1D1B1B"
            >
              {p.name}
            </text>
            <rect
              className={p.subject ? styles.ppscaleBarSubject : styles.ppscaleBar}
              x={L}
              y={yMid(i) - BAR / 2}
              width={x(p.value) - L}
              height={BAR}
              fill={p.subject ? "#1D1B1B" : "#3A7CA5"}
              style={{ animationDelay: p.subject ? "1.5s" : `${0.15 + i * 0.2}s` }}
            />
            <text
              className={styles.ppscaleVal}
              x={x(p.value) + 8}
              y={yMid(i) + 4}
              fontFamily={mono}
              fontSize={12}
              fill="#1D1B1B"
              style={{ animationDelay: p.subject ? "2.5s" : `${1.1 + i * 0.2}s` }}
            >
              {Math.round(p.value)}
            </text>
          </g>
        ))}

        <line x1={L} y1={T} x2={L} y2={H - B} stroke="#1D1B1B" strokeWidth={1} />
        {[0, 50, 100].map((v) => (
          <text
            key={v}
            x={x(v)}
            y={H - 8}
            textAnchor={v === 0 ? "start" : v === 100 ? "end" : "middle"}
            fontFamily={mono}
            fontSize={9}
            fill="#8A8A85"
          >
            {v}
          </text>
        ))}
      </svg>
    </figure>
  );
}
