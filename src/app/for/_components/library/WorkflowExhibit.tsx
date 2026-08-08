"use client";

// The workflow exhibit. Shows a client's real workflow as it runs today, then
// analyses it in front of the reader (the waiting time lights up, the finding
// is stated), then draws the redesigned flow underneath with the human
// approval gates visibly kept.
//
// Plays in stages when scrolled into view: (1) today's flow draws left to
// right, (2) the waiting lights up and the finding appears, (3) the
// redesigned flow draws. Reduced motion shows everything at once.
//
// Fully parameterised so a real client's workflow from their call drops in.

import { useEffect, useRef, useState } from "react";
import "./workflow-exhibit.css";

export type WorkflowStep = {
  name: string;
  note: string;
  days?: string;
  /** the step the analysis flags as the bottleneck */
  flagged?: boolean;
  /** a human approval gate deliberately kept in the redesigned flow */
  kept?: boolean;
  /** a step now done by a machine */
  machine?: boolean;
  /** waiting time on the connector AFTER this step, e.g. "4 days waiting" */
  waitAfter?: string;
};

export default function WorkflowExhibit({
  beforeLabel,
  beforeTotal,
  before,
  finding,
  afterLabel,
  afterTotal,
  after,
}: {
  beforeLabel: string;
  beforeTotal: string;
  before: WorkflowStep[];
  finding: React.ReactNode;
  afterLabel: string;
  afterTotal: string;
  after: WorkflowStep[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(3);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          obs.disconnect();
          setStage(1);
          window.setTimeout(() => setStage(2), 1600);
          window.setTimeout(() => setStage(3), 3400);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const row = (steps: WorkflowStep[], hot: boolean) => (
    <div className="ppw-flow">
      {steps.map((s, i) => (
        <StepAndGap key={s.name} step={s} last={i === steps.length - 1} hot={hot} index={i} />
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="ppw-root">
      <div className={stage >= 1 ? "ppw-on" : ""}>
        <div className="ppw-rowhead">
          <span className="ppw-rowlabel">{beforeLabel}</span>
          <span className="ppw-rowtotal">{beforeTotal}</span>
        </div>
        <div className={stage >= 2 ? "ppw-hotwrap" : ""}>{row(before, stage >= 2)}</div>
      </div>

      <div className={`ppw-finding ${stage >= 2 ? "ppw-on2" : ""}`}>{finding}</div>

      <div className={`ppw-after ${stage >= 3 ? "ppw-on" : ""}`}>
        <div className="ppw-rowhead">
          <span className="ppw-rowlabel">{afterLabel}</span>
          <span className="ppw-rowtotal">
            <em>{afterTotal}</em>
          </span>
        </div>
        {row(after, false)}
      </div>
    </div>
  );
}

function StepAndGap({
  step,
  last,
  hot,
  index,
}: {
  step: WorkflowStep;
  last: boolean;
  hot: boolean;
  index: number;
}) {
  const flag = hot && step.flagged;
  return (
    <>
      <div
        className={`ppw-step${flag ? " ppw-flagged" : ""}${step.kept ? " ppw-kept" : ""}`}
        style={{ transitionDelay: `${index * 0.18}s` }}
      >
        <p className="ppw-step-name">{step.name}</p>
        <p className="ppw-step-note">{step.note}</p>
        {step.days && <span className="ppw-step-days">{step.days}</span>}
        {step.kept && <span className="ppw-kept-tag">gate kept · your team</span>}
        {step.machine && <span className="ppw-machine-tag">machine · minutes</span>}
      </div>
      {!last && (
        <>
          <div className="ppw-gap">
            <div
              className="ppw-gap-line"
              style={{ transitionDelay: `${index * 0.18 + 0.08}s` }}
            />
          </div>
          {step.waitAfter && (
            <>
              <div
                className={`ppw-wait${hot ? " ppw-hot" : ""}`}
                style={{ transitionDelay: `${index * 0.18 + 0.12}s` }}
              >
                <span>{step.waitAfter}</span>
              </div>
              <div className="ppw-gap">
                <div
                  className="ppw-gap-line"
                  style={{ transitionDelay: `${index * 0.18 + 0.16}s` }}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
