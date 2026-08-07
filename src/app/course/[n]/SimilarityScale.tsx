"use client";

/**
 * ⭐ THE YARDSTICK, module 3 item 01. Renders wherever {{CHART_YARDSTICK}} appears in
 * an item's text, so it sits at the point in the argument that earned it: after the
 * set-up, before the recording, teaching "how different is different enough" with one
 * picture. Kite's three real segments land in the 60s against each other; the proposed
 * fourth lands above the 90 line, in the zone marked "the same people".
 *
 * ⛔ Every number comes from YARDSTICK in chartData.generated.ts, computed from
 * customers.csv by scripts/build-chart-data.mjs with the planted band asserted there.
 * No number is typed here, including the benchmark position.
 *
 * The form is Paul's own ops-estate similarity chart; see the CSS module note for the
 * two deliberate departures (mono labels, no orange).
 */

import { YARDSTICK } from "../chartData.generated";
import styles from "./SimilarityScale.module.css";

/* The grid: 210px label, flexible track, 44px value, 10px gaps, inside 22px padding.
   The zone/line overlay spans the track column only, so its left edge is
   22px + 210px + 10px and its right inset is 22px + 44px + 10px. */
const TRACK_LEFT = 22 + 210 + 10;
const TRACK_RIGHT = 22 + 44 + 10;

export function SimilarityScale() {
  const { title, line, lineLabel, pairs } = YARDSTICK;
  const overlayTop = 20 + 16 + 11 + 5;
  return (
    <figure className={styles.wrap} role="img" aria-label={title}>
      <div className={styles.title}>{title}</div>
      {pairs.map((p, i) => (
        <div className={styles.row} key={p.name}>
          <span className={styles.label}>{p.name}</span>
          <span className={styles.track}>
            <span
              className={`${styles.bar} ${p.subject ? styles.subject : ""}`}
              style={{ "--w": `${p.value}%`, animationDelay: `${0.1 + i * 0.15}s` } as React.CSSProperties}
            />
          </span>
          <span className={styles.val} style={{ animationDelay: `${1.1 + i * 0.15}s` }}>
            {Math.round(p.value)}
          </span>
        </div>
      ))}
      <div className={styles.axis}>
        <span className={styles.axisTrack}>
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </span>
      </div>
      <div
        className={styles.zone}
        style={{
          top: overlayTop,
          bottom: 34,
          left: `calc(${TRACK_LEFT}px + (100% - ${TRACK_LEFT + TRACK_RIGHT}px) * ${line / 100})`,
          right: TRACK_RIGHT,
        }}
      />
      <div
        className={styles.line}
        style={{
          top: overlayTop,
          bottom: 34,
          left: `calc(${TRACK_LEFT}px + (100% - ${TRACK_LEFT + TRACK_RIGHT}px) * ${line / 100})`,
        }}
      >
        <span className={styles.tag}>
          {line}: {lineLabel}
        </span>
      </div>
    </figure>
  );
}
