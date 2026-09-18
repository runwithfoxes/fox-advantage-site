"use client";

// The workflow-redesign demonstration. One campaign workflow drawn to scale in
// DAYS: working days as solid marks, waiting as hatched neutral. Then the same
// campaign redesigned, on the same scale, so the contraction is the picture.
//
// This is a GENERIC marketing-team workflow, and the caption says so. It is a
// demonstration of the analysis we run, never a claim about the client's own
// workflow. Totals are computed from the stage data, not typed.

import { useEffect, useRef, useState } from "react";
import "./workflow-days.css";

type Stage = { name: string; days: number; kind: "work" | "wait"; gate?: boolean };

const BEFORE: Stage[] = [
  { name: "Brief", days: 2, kind: "work" },
  { name: "Agency queue", days: 3, kind: "wait" },
  { name: "First draft", days: 3, kind: "work" },
  { name: "Review round one", days: 2, kind: "wait", gate: true },
  { name: "Return trips", days: 3, kind: "wait" },
  { name: "Sign-off", days: 1, kind: "work", gate: true },
];

const AFTER: Stage[] = [
  { name: "Brief", days: 0.5, kind: "work" },
  { name: "Drafts, all formats", days: 0.5, kind: "work" },
  { name: "Team review", days: 0.5, kind: "work", gate: true },
  { name: "Sign-off", days: 0.5, kind: "work", gate: true },
];

const total = (stages: Stage[]) => stages.reduce((n, s) => n + s.days, 0);

function DayBar({
  stages,
  scaleDays,
  label,
  totalLabel,
  ghost,
  caption,
}: {
  stages: Stage[];
  scaleDays: number;
  label: string;
  totalLabel: string;
  ghost?: boolean;
  caption?: string; // caption mode: one line under the bar instead of per-segment labels
}) {
  return (
    <div className="ppwd-block">
      <div className="ppwd-blockhead">
        <span className="ppwd-blocklabel">{label}</span>
        <span className="ppwd-total">{totalLabel}</span>
      </div>
      <div className="ppwd-bar">
        {stages.map((s, i) => (
          <div
            key={i}
            className={`ppwd-seg ppwd-${s.kind}`}
            style={{ width: `${(s.days / scaleDays) * 100}%`, ["--i" as string]: i }}
          >
            {s.gate && (
              <span className="ppwd-gatein" title="Approval gate, kept">
                ◆
              </span>
            )}
          </div>
        ))}
        {ghost && (
          <div
            className="ppwd-ghost"
            style={{ width: `${((scaleDays - total(stages)) / scaleDays) * 100}%` }}
            aria-hidden
          />
        )}
      </div>
      {caption ? (
        <p className="ppwd-caption">{caption}</p>
      ) : (
        <div className="ppwd-labels">
          {stages.map((s, i) => (
            <div
              key={i}
              className={`ppwd-lab${i % 2 ? " ppwd-lab-alt" : ""}`}
              style={{
                left: `${(stages.slice(0, i).reduce((n, x) => n + x.days, 0) / scaleDays) * 100}%`,
              }}
            >
              <span className="ppwd-labname">
                {s.name}
                {s.gate ? " ◆" : ""}
              </span>
              <span className="ppwd-labdays">
                {s.days}d{s.kind === "wait" ? " waiting" : ""}
                {s.gate ? ", gate" : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkflowDays() {
  const beforeTotal = total(BEFORE);
  const afterTotal = total(AFTER);
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  // The redesigned bar draws in when it scrolls into view. Play-state only:
  // without JavaScript nothing is hidden, the bar just sits complete.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPlay(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`ppwd${play ? " ppwd-play" : ""}`} ref={rootRef}>
      <DayBar
        stages={BEFORE}
        scaleDays={beforeTotal}
        label="A campaign workflow as it usually runs"
        totalLabel={`${beforeTotal} working days`}
      />
      <p className="ppwd-finding">
        Of the {beforeTotal} days, {total(BEFORE.filter((s) => s.kind === "work"))}{" "}
        are work and {total(BEFORE.filter((s) => s.kind === "wait"))} are queues,
        waiting and return trips. The redesign removes the waiting and shortens
        the drafting. Both approval gates <span className="ppwd-gateword">◆</span>{" "}
        stay, held by the same people.
      </p>
      <DayBar
        stages={AFTER}
        scaleDays={beforeTotal}
        label="The same campaign, redesigned"
        totalLabel={`${afterTotal} days`}
        ghost
        caption="Brief, drafts in all formats, team review, sign-off. Half a day each, both gates kept."
      />
      <p className="ppwd-honest">
        <span className="ppwd-slash">/shown to scale.</span> A typical mid-size
        campaign, drawn as a demonstration of the analysis. This is not a claim
        about Kite&rsquo;s workflow: yours gets mapped in the first session,
        with the people who run it.
      </p>
    </div>
  );
}
