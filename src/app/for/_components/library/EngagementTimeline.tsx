"use client";

// Seamus's twelve weeks, drawn to scale. Built 31 Aug 2026 for the Bright page
// after Paul reframed the proposal: it is not a two-day session with work
// after it, it is a twelve week engagement whose first two days happen to be
// in a room.
//
// ⭐ EVERY NUMBER HERE IS SEAMUS'S OWN, off the engagement brief he wrote on
// 28 Aug: weeks 1-2 immersion, weeks 3-8 workflow design and testing with
// champions, weeks 9-12 scale and handoff. Nothing is invented. The widths are
// computed from the week counts, never typed, so the middle phase is visibly
// the big one, which is the whole point of drawing it.
//
// ⛔ NO "WHO IS DOING THE BUILDING" RIBBON. It was built and cut the same hour,
// on Paul's call, 31 Aug: showing the build moving from us to his team "may
// feel like we're asking you to do lots of extra work." The upskilling gets
// said in words elsewhere, never drawn as a workload.
//
// Base state is fully drawn. .ppet-play only adds animation, so with
// JavaScript off the figure is complete rather than blank.

import { useEffect, useRef, useState } from "react";
import "./engagement-timeline.css";

type Phase = {
  weeks: number;
  span: string;
  name: string;
  line: string;
  cls: string;
};

const PHASES: Phase[] = [
  {
    weeks: 2,
    span: "Weeks 1 to 2",
    name: "Immersion",
    line: "Two days in the room with the team, then mapping where the time goes in the work they actually do.",
    cls: "ppet-p1",
  },
  {
    weeks: 6,
    span: "Weeks 3 to 8",
    name: "Design and build",
    line: "The workflows get redesigned and the agents get built and tested against the real work.",
    cls: "ppet-p2",
  },
  {
    weeks: 4,
    span: "Weeks 9 to 12",
    name: "Scale and hand over",
    line: "Your team runs it with us there, until they are running it on their own.",
    cls: "ppet-p3",
  },
];

const TOTAL_WEEKS = PHASES.reduce((n, p) => n + p.weeks, 0);

/* The two days are the opening of week 1, so the mark sits on the very front
   edge of the bar. Two days inside twelve weeks is about two pixels wide at
   this scale, which is why it is a line and a label rather than a segment. */
const DAYS_AT = 0;

export default function EngagementTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPlay(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`ppet${play ? " ppet-play" : ""}`} ref={rootRef}>
      <div className="ppet-head">
        <span className="ppet-label">The twelve weeks, drawn to scale</span>
        <span className="ppet-total">8 September to 1 December</span>
      </div>

      <div className="ppet-scale" aria-hidden>
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
          <span
            key={i}
            className="ppet-tick"
            style={{ ["--i" as string]: i }}
          >
            <span className="ppet-tickn">{i + 1}</span>
          </span>
        ))}
      </div>

      <div className="ppet-bar">
        {PHASES.map((p, i) => (
          <div
            key={p.span}
            className={`ppet-seg ${p.cls}`}
            style={{
              width: `${(p.weeks / TOTAL_WEEKS) * 100}%`,
              ["--i" as string]: i,
            }}
          >
            <span className="ppet-segweeks">{p.weeks} weeks</span>
          </div>
        ))}
        <span className="ppet-days" style={{ left: `${DAYS_AT * 100}%` }} />
        <span className="ppet-daysflag" style={{ left: `${DAYS_AT * 100}%` }}>
          <span className="ppet-daysdot" />
          <span className="ppet-daystext">
            8 and 9 September, two days with the team
          </span>
        </span>
      </div>

      <div className="ppet-phases">
        {PHASES.map((p, i) => (
          <div
            key={p.span}
            className="ppet-phase"
            style={{
              width: `${(p.weeks / TOTAL_WEEKS) * 100}%`,
              ["--i" as string]: i,
            }}
          >
            <p className="ppet-phasek">{p.span}</p>
            <p className="ppet-phasen">{p.name}</p>
            <p className="ppet-phasel">{p.line}</p>
          </div>
        ))}
      </div>

      <p className="ppet-honest">
        <span className="ppet-slash">/</span> The three phases, the twelve weeks
        and the two days are from your own brief. The widths are the week counts
        drawn to scale, so most of the work sits in weeks 3 to 8.
      </p>
    </div>
  );
}
