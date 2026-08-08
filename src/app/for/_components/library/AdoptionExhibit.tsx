"use client";

// The adoption exhibit: measure, move, show the return, in one window the
// reader drives. Eight roles on the fluency scale, hollow dots where the team
// starts, solid dots where the programme takes them, and a month scrubber the
// reader drags to watch the movement and read what the return looks like at
// each stage. The fox reacts, facepalm early, composed later: the metaphor
// marker, this is a demonstration of what an adoption programme does, not a
// claim about any real team.
//
// Finished state (month 6) is the default; the scrubber hands control to the
// reader. Generic roles, no names, per the two-kinds-of-truth rule.

import { useState } from "react";
import "./adoption-exhibit.css";

type Row = { role: string; start: number; end: number };

const ROWS: Row[] = [
  { role: "Marketing director", start: 4, end: 8 },
  { role: "Brand manager", start: 2, end: 7 },
  { role: "Campaign manager", start: 3, end: 8 },
  { role: "Copywriter", start: 5, end: 9 },
  { role: "Designer", start: 2, end: 6 },
  { role: "Digital manager", start: 4, end: 9 },
  { role: "Insights analyst", start: 6, end: 9 },
  { role: "PR manager", start: 1, end: 6 },
];

const RETURN_LINES = [
  "Kickoff: the map is taken, honestly. Nothing is claimed yet.",
  "Month 1: training aimed at where each person actually is, on real work.",
  "Month 2: the first machines are in daily hands.",
  "Month 3: most of the team uses AI on real work every week.",
  "Month 4: the first campaign ships fully in-house.",
  "Month 5: usage, output and quality reported monthly. The trend is visible.",
  "Month 6: the team works differently, and the return is measured, not claimed.",
];

export default function AdoptionExhibit() {
  const [t, setT] = useState(600); // 0..600 = kickoff..month 6, default finished
  const month = Math.round(t / 100);
  const f = t / 600;

  const pos = (r: Row) => r.start + (r.end - r.start) * f;
  const pct = (level: number) => ((level - 1) / 9) * 100;

  return (
    <div className="ppa-root">
      <div className="ppa-bar">
        <i></i><i></i><i></i>
        <span className="ppa-title">team adoption</span>
        <span className="ppa-live">drag the months</span>
      </div>

      <div className="ppa-body">
        <div className="ppa-rows">
          {ROWS.map((r) => (
            <div className="ppa-row" key={r.role}>
              <span className="ppa-role">{r.role}</span>
              <div className="ppa-track">
                <span
                  className="ppa-trail"
                  style={{
                    left: `${pct(r.start)}%`,
                    width: `${Math.max(0, pct(pos(r)) - pct(r.start))}%`,
                  }}
                />
                <span className="ppa-ghost" style={{ left: `${pct(r.start)}%` }} />
                <span
                  className={`ppa-dot${f > 0.12 ? " ppa-moving" : ""}`}
                  style={{ left: `${pct(pos(r))}%` }}
                />
              </div>
            </div>
          ))}
          <div className="ppa-axis">
            <span>not started</span>
            <span>it&rsquo;s how the team works</span>
          </div>
          <p className="ppa-legend">
            Hollow dots: where each person starts. Solid dots: where the
            programme takes them.
          </p>
        </div>

        <div className="ppa-drive">
          <img
            className="ppa-fox"
            src={month <= 2 ? "/fox/fox-facepalm-nobg.png" : "/fox/fox-sideeye-right-nobg.png"}
            alt=""
          />
          <div className="ppa-scrub">
            <input
              type="range"
              min={0}
              max={600}
              value={t}
              aria-label="Months into the adoption programme"
              onChange={(e) => setT(Number(e.target.value))}
            />
            <div className="ppa-months">
              <span>kickoff</span>
              <span>month 6</span>
            </div>
          </div>
          <div className="ppa-readout">
            <span className="ppa-m">{month === 0 ? "kickoff" : `month ${month}`}</span>
          </div>
        </div>

        <p className="ppa-return">{RETURN_LINES[month]}</p>
      </div>
    </div>
  );
}
