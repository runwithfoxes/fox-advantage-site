"use client";

// The adoption demonstration: fluency measured per person, twice. A hollow
// mark where each person started, a solid mark where they are now, one row
// per person. Illustrative positions, and the caption says so plainly.

import { useEffect, useRef, useState } from "react";
import "./fluency-map.css";

// Generic roles for a fourteen-person marketing team. Positions are percent
// along the scale, start and current, tuned to look like a real cohort:
// uneven start, uneven progress, one or two who barely moved.
const PEOPLE: { role: string; a: number; b: number }[] = [
  { role: "Marketing director", a: 30, b: 64 },
  { role: "Brand lead", a: 22, b: 58 },
  { role: "Campaign manager", a: 34, b: 76 },
  { role: "Campaign manager", a: 18, b: 52 },
  { role: "Content lead", a: 42, b: 84 },
  { role: "Copywriter", a: 38, b: 80 },
  { role: "Copywriter", a: 12, b: 44 },
  { role: "Social manager", a: 46, b: 82 },
  { role: "Designer", a: 20, b: 46 },
  { role: "Designer", a: 16, b: 40 },
  { role: "Digital manager", a: 40, b: 74 },
  { role: "CRM manager", a: 26, b: 60 },
  { role: "Insights analyst", a: 36, b: 78 },
  { role: "PR manager", a: 10, b: 34 },
];

export default function FluencyMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  // Play-state only. The base state is the finished chart, so nothing is
  // hidden without JavaScript; the observer just starts the slide.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPlay(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`ppfm${play ? " ppfm-play" : ""}`} ref={rootRef}>
      <div className="ppfm-head">
        <span className="ppfm-title">The fluency map, reported monthly</span>
        <span className="ppfm-legend">
          <span className="ppfm-leg-a" /> at kickoff
          <span className="ppfm-leg-b" /> month four
        </span>
      </div>
      <div className="ppfm-grid">
        {PEOPLE.map((p, i) => (
          <div className="ppfm-row" key={i} style={{ ["--i" as string]: i }}>
            <span className="ppfm-role">{p.role}</span>
            <span className="ppfm-track">
              <span
                className="ppfm-run"
                style={{ left: `${p.a}%`, width: `${p.b - p.a}%` }}
              />
              <span className="ppfm-a" style={{ left: `${p.a}%` }} />
              <span className="ppfm-b" style={{ left: `${p.b}%` }} />
            </span>
          </div>
        ))}
        <div className="ppfm-axis">
          <span>getting started</span>
          <span>fluent</span>
        </div>
      </div>
      <p className="ppfm-honest">
        <span className="ppfm-slash">/illustrative.</span> Kite&rsquo;s real map
        comes from the week-one assessment, person by person. This chart is how
        progress gets reported every month after it, so the return is something
        you point at, not something you assert.
      </p>
    </div>
  );
}
