"use client";

/**
 * ⭐ THE YARDSTICK, module 3 item 01. Renders wherever {{CHART_YARDSTICK}} appears in
 * an item's text, so it sits at the point in the argument that earned it: after the
 * set-up, before the recording, teaching "how different is different enough" with one
 * picture. Kite's three real segments land in the 60s against each other; the proposed
 * fourth lands past the 90 line, in the zone marked "the same people".
 *
 * ⛔ Every number comes from YARDSTICK in chartData.generated.ts, computed from
 * customers.csv by scripts/build-chart-data.mjs with the planted band asserted there.
 * No number is typed here, including the benchmark position.
 *
 * ⭐⭐ REBUILT AS ONE SVG, 7 Aug 2026 (late), Paul: "I just want stuff to look sleek,
 * not cheap and amateur." The first version was CSS bars on full-width tracks with an
 * overlay zone, and the overlay stacking made visible seams of mismatched greys, a
 * chunky dashed line, and a floating label. One SVG fixes all three by construction:
 * the zone is a wash DRAWN BEHIND the bars, the rule is a hairline, everything shares
 * one coordinate system. Specs from the dataviz craft rules with the brand's
 * parameters: thin bars, recessive hairline grid, values at the bar tips in text ink,
 * square ends (⛔ the brand bans rounded corners, overriding the generic spec).
 *
 * ⭐ THE ANIMATION TELLS THE STORY IN ORDER, Paul's ask: the three segment bars land
 * first, a beat, then the home-worker bar runs long and crosses the line as its tag
 * appears. Honoured under prefers-reduced-motion by rendering finished.
 */

import { YARDSTICK } from "../chartData.generated";
import styles from "./SimilarityScale.module.css";

const W = 640;
const H = 216;
const L = 216; /* label column */
const R = 34; /* room for a value beyond a full-length bar */
const T = 40;
const B = 26;
const BAR = 12;

export function SimilarityScale() {
  const { title, line, lineLabel, pairs } = YARDSTICK;
  const plotW = W - L - R;
  const x = (v: number) => L + (plotW * v) / 100;
  const rowH = (H - T - B) / pairs.length;
  const yMid = (i: number) => T + rowH * i + rowH / 2;
  const mono = "'JetBrains Mono', ui-monospace, Menlo, monospace";
  const lineX = x(line);

  return (
    <figure className={styles.wrap}>
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
          className={styles.rule}
          x1={lineX}
          y1={T}
          x2={lineX}
          y2={H - B}
          stroke="#1D1B1B"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          className={styles.tag}
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
              className={p.subject ? styles.barSubject : styles.bar}
              x={L}
              y={yMid(i) - BAR / 2}
              width={x(p.value) - L}
              height={BAR}
              fill={p.subject ? "#1D1B1B" : "#3A7CA5"}
              style={{ animationDelay: p.subject ? "1.5s" : `${0.15 + i * 0.2}s` }}
            />
            <text
              className={styles.val}
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
