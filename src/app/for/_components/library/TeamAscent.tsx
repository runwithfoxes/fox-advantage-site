"use client";

// The arrival figure for a large-marketing-organisation page: the whole team
// moving up a scale. Abstract on purpose. No axis labels, no fake precision,
// no product in shot. Fourteen risers because the standfirst says fourteen
// people; the count is the only fact in it.
//
// Motion: pure CSS keyframes on load, no scroll gating, so the figure renders
// and plays with JavaScript disabled and settles at its final state. Reduced
// motion gets the final state directly.

import "./team-ascent.css";

// Deterministic positions, tuned by eye. y0 = where each dot starts (low),
// y1 = where it settles (high). The spread stays organic: people start in
// different places and end in different places, nobody teleports to the top.
const RISERS: { y0: number; y1: number }[] = [
  { y0: 300, y1: 118 },
  { y0: 268, y1: 84 },
  { y0: 312, y1: 176 },
  { y0: 286, y1: 106 },
  { y0: 322, y1: 208 },
  { y0: 258, y1: 66 },
  { y0: 296, y1: 148 },
  { y0: 316, y1: 128 },
  { y0: 276, y1: 94 },
  { y0: 306, y1: 188 },
  { y0: 290, y1: 76 },
  { y0: 318, y1: 158 },
  { y0: 270, y1: 112 },
  { y0: 300, y1: 138 },
];

const W = 1000;
const H = 380;
const X0 = 52;
const X1 = 948;
const TOP = 44;
const BASE = 336;

export default function TeamAscent() {
  const step = (X1 - X0) / (RISERS.length - 1);
  return (
    <figure className="ppta" aria-label="Fourteen team members moving up a scale">
      <svg viewBox={`0 0 ${W} ${H}`} className="ppta-svg" role="img">
        {/* level hairlines, recessive */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = TOP + (i * (BASE - TOP)) / 4;
          return (
            <line
              key={i}
              x1={X0 - 18}
              x2={X1 + 18}
              y1={y}
              y2={y}
              className={i === 4 ? "ppta-base" : "ppta-level"}
            />
          );
        })}
        {RISERS.map((r, i) => {
          const x = X0 + i * step;
          const rise = r.y1 - r.y0; // negative: upward
          const len = r.y0 - r.y1;
          return (
            <g key={i} className="ppta-riser" style={{ ["--d" as string]: `${i * 0.11}s` }}>
              {/* the track each dot rides */}
              <line x1={x} x2={x} y1={TOP} y2={BASE} className="ppta-track" />
              {/* the climb, drawn upward in step with the dot */}
              <line
                x1={x}
                x2={x}
                y1={r.y0}
                y2={r.y1}
                className="ppta-climb"
                style={{ strokeDasharray: len, ["--len" as string]: len }}
              />
              {/* where they started: a hollow mark left behind */}
              <circle cx={x} cy={r.y0} r={5} className="ppta-origin" />
              {/* the traveller. transform animates from 0 to the rise. */}
              <g className="ppta-mover" style={{ ["--rise" as string]: `${rise}px` }}>
                <circle cx={x} cy={r.y0} r={8.5} className="ppta-dot" />
              </g>
            </g>
          );
        })}
      </svg>
      <figcaption className="ppta-caption">
        <span className="ppta-caption-label">/the work in one picture</span>
        <span>
          Fourteen people, measured, trained, and moved up. Held there while the
          volume of work goes up too.
        </span>
      </figcaption>
    </figure>
  );
}
