"use client";

// Paul's worked example for the workflow demonstration (8 Aug, evening):
// a blueprint of a marketing function as it really runs, handovers and all,
// and the same function in an AI world, revealed by a slider. Generic on
// purpose: this is the analysis we do, not a claim about any client.
//
// The right layer is clipped by --x; dragging moves the line. Without
// JavaScript the split sits at its default and both worlds are labelled,
// so nothing is hidden.

import { useEffect, useRef, useState } from "react";
import "./blueprint-slider.css";

const W = 1000;
const H = 440;

function Node({
  x,
  y,
  w = 128,
  label,
  gate,
  tone,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  gate?: boolean;
  tone?: "sky";
}) {
  return (
    <g className={`ppbs-node${tone ? " ppbs-node-sky" : ""}`}>
      <rect x={x} y={y} width={w} height={36} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle">
        {label}
      </text>
      {gate && (
        <text x={x + w - 12} y={y - 8} textAnchor="middle" className="ppbs-gate">
          ◆
        </text>
      )}
    </g>
  );
}

function Arrow({ d, dashed }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      className={`ppbs-arrow${dashed ? " ppbs-arrow-dashed" : ""}`}
      markerEnd="url(#ppbs-head)"
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="ppbs-head"
        markerWidth="7"
        markerHeight="7"
        refX="6"
        refY="3.5"
        orient="auto"
      >
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#a8a8a2" />
      </marker>
    </defs>
  );
}

function TodayBlueprint() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppbs-svg" aria-hidden>
      <Defs />
      {/* the agency, outside the building */}
      <rect x={44} y={244} width={600} height={166} className="ppbs-boundary" />
      <text x={58} y={266} className="ppbs-boundary-label">
        the agency
      </text>

      <Node x={60} y={62} label="Brief" />
      <Node x={60} y={140} label="Media plan" />
      <Node x={420} y={62} label="Comments round" gate />
      <Node x={620} y={62} label="Consolidate" />
      <Node x={810} y={62} label="Sign-off" gate />
      <Node x={810} y={140} label="Launch" />

      <Node x={80} y={290} label="Queue" />
      <Node x={270} y={290} label="Copy draft" />
      <Node x={270} y={352} label="Design draft" />
      <Node x={470} y={320} label="Revisions" />

      {/* handovers, crossing the boundary and each other */}
      <Arrow d="M124,98 L134,290" />
      <Arrow d="M208,308 L270,308" />
      <Arrow d="M208,318 L270,366" />
      <Arrow d="M398,300 L470,330" />
      <Arrow d="M398,366 L484,356" />
      <Arrow d="M340,290 C360,180 400,120 420,96" />
      <Arrow d="M534,320 C560,220 590,130 620,98" />
      <Arrow d="M484,98 L500,320" dashed />
      <Arrow d="M748,80 L810,80" />
      <Arrow d="M874,98 L874,140" />
      <Arrow d="M188,158 C420,180 700,170 810,158" />

      <text x={250} y={210} className="ppbs-note">
        waits here
      </text>
    </svg>
  );
}

function AiBlueprint() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppbs-svg" aria-hidden>
      <Defs />
      <Node x={50} y={162} label="Brief" />
      <g className="ppbs-machines">
        <rect x={240} y={132} width={210} height={96} />
        <text x={345} y={166} textAnchor="middle" className="ppbs-machines-title">
          the machines draft
        </text>
        <text x={345} y={192} textAnchor="middle" className="ppbs-machines-list">
          writer · ads · research
        </text>
      </g>
      <Node x={250} y={300} w={190} label="Brand pack, read first" tone="sky" />
      <Node x={520} y={162} label="Team review" gate />
      <Node x={700} y={162} label="Sign-off" gate />
      <Node x={860} y={162} w={110} label="Launch" />
      <Node x={700} y={330} w={160} label="Measurement" />

      <Arrow d="M178,180 L240,180" />
      <Arrow d="M345,300 L345,228" />
      <Arrow d="M450,180 L520,180" />
      <Arrow d="M648,180 L700,180" />
      <Arrow d="M828,180 L860,180" />
      <Arrow d="M915,198 C915,300 860,348 860,348" />
      <Arrow d="M700,348 C480,348 345,300 345,228" dashed />

      <text x={600} y={396} className="ppbs-note">
        what worked writes back
      </text>
    </svg>
  );
}

export default function BlueprintSlider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(58);
  const dragging = useRef(false);
  const hinted = useRef(false);

  // One gentle hint when the figure first appears: the line eases left,
  // showing the AI world, then settles. After that the reader drives.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting || hinted.current) return;
          hinted.current = true;
          const t0 = performance.now();
          const from = 58;
          const to = 40;
          const tick = (t: number) => {
            if (dragging.current) return;
            const p = Math.min(1, (t - t0) / 1100);
            const ease = 1 - Math.pow(1 - p, 3);
            setX(from + (to - from) * ease);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const setFromPointer = (clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="ppbs">
      <div className="ppbs-worlds">
        <span className="ppbs-world">the function today</span>
        <span className="ppbs-world ppbs-world-ai">the same function, with AI</span>
      </div>
      <div
        className="ppbs-stage"
        ref={rootRef}
        style={{ ["--x" as string]: `${x}%` }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).closest(".ppbs-stage")?.setPointerCapture?.(e.pointerId);
          setFromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="ppbs-layer">
          <TodayBlueprint />
        </div>
        <div className="ppbs-layer ppbs-layer-ai">
          <AiBlueprint />
        </div>
        <div
          className="ppbs-divider"
          role="slider"
          aria-label="Reveal the AI-world blueprint"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(x)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setX((v) => Math.max(8, v - 4));
            if (e.key === "ArrowRight") setX((v) => Math.min(92, v + 4));
          }}
        >
          <span className="ppbs-handle">◂ ▸</span>
        </div>
      </div>
      <p className="ppbs-hint">
        <span className="ppbs-slash">/drag the line.</span> Left of it, a
        marketing function as it usually runs: the handovers, the queues, the
        return trips. Right of it, the same function redesigned: machines
        draft from the brand pack, people review and approve, and what worked
        writes back.
      </p>
    </div>
  );
}
