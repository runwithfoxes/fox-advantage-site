"use client";

// The arrival exhibit, promoted to the top of the page on Paul's verdict
// (8 Aug, via the story-first terminal): the blueprint slider was the best
// thing on the page, so it opens the page, and it is rebuilt HERE in the
// house library language: the ppw window chrome and node cards from
// AgentWindows (agent-windows.css), not bespoke SVG rectangles.
//
// One window, two worlds inside it: the marketing function as it usually
// runs, and the same function with AI. A draggable line wipes between them.
// Generic on purpose: this is the analysis we do, never a claim about the
// client's own function. The AI world's edges light in sequence, the house
// running-workflow behaviour; the today world sits still.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./arrival-blueprint.css";

type BpNode = {
  x: number; // px on the 940x480 canvas, node centre
  y: number;
  icon: string;
  label: string;
  kind: string;
  trig?: boolean;
};

const TODAY_NODES: BpNode[] = [
  { x: 94, y: 67, icon: "◆", label: "Brief", kind: "Trigger", trig: true },
  { x: 94, y: 221, icon: "▦", label: "Media plan", kind: "Step" },
  { x: 432, y: 67, icon: "▤", label: "Comments round", kind: "Approval" },
  { x: 611, y: 144, icon: "▣", label: "Consolidate", kind: "Step" },
  { x: 790, y: 67, icon: "✓", label: "Sign-off", kind: "Approval" },
  { x: 790, y: 221, icon: "➤", label: "Launch", kind: "Step" },
  { x: 132, y: 346, icon: "◔", label: "Queue", kind: "3d waiting" },
  { x: 282, y: 326, icon: "✎", label: "Copy draft", kind: "Step" },
  { x: 282, y: 422, icon: "▩", label: "Design draft", kind: "Step" },
  { x: 470, y: 330, icon: "↺", label: "Revisions", kind: "Return trips" },
];

const TODAY_EDGES: { d: string; dashed?: boolean }[] = [
  { d: "M94,95 L132,318" },
  { d: "M198,346 L216,330" },
  { d: "M198,352 L216,416" },
  { d: "M282,298 C282,160 350,95 366,80" },
  { d: "M348,410 C380,390 390,352 404,340" },
  { d: "M432,95 C440,190 452,260 464,302", dashed: true },
  { d: "M536,324 C566,288 584,220 606,172" },
  { d: "M677,138 C700,120 710,95 724,80" },
  { d: "M790,95 L790,193" },
  { d: "M160,228 C400,262 600,240 724,226" },
];

const AI_NODES: BpNode[] = [
  { x: 94, y: 182, icon: "◆", label: "Brief", kind: "Trigger", trig: true },
  { x: 310, y: 182, icon: "▤", label: "Machines draft", kind: "3 agents" },
  { x: 310, y: 346, icon: "▦", label: "Brand pack", kind: "Read first" },
  { x: 536, y: 182, icon: "▤", label: "Team review", kind: "Approval, kept" },
  { x: 705, y: 182, icon: "✓", label: "Sign-off", kind: "Approval, kept" },
  { x: 856, y: 182, icon: "➤", label: "Launch", kind: "Step" },
  { x: 705, y: 346, icon: "◱", label: "Measurement", kind: "Step" },
];

const AI_EDGES: { d: string; dashed?: boolean; step?: number }[] = [
  { d: "M160,182 L244,182", step: 0 },
  { d: "M310,318 L310,210", dashed: true },
  { d: "M376,182 L470,182", step: 1 },
  { d: "M602,182 L639,182", step: 2 },
  { d: "M771,182 L790,182", step: 3 },
  { d: "M856,210 C856,300 790,340 771,344", step: 3 },
  { d: "M639,352 C480,368 380,330 356,224", dashed: true },
];

function NodeCard({ n, state }: { n: BpNode; state?: string }) {
  return (
    <div
      className={`ppw-bpnode${n.trig ? " ppw-trig" : ""}${state ? ` ${state}` : ""}`}
      style={{ left: n.x, top: n.y }}
    >
      <div className="ppw-nh">
        <span className="ppw-ic">{n.icon}</span>
        <span className="ppw-bpnm">{n.label}</span>
      </div>
      <div className="ppw-st">{n.kind}</div>
    </div>
  );
}

export default function ArrivalBlueprint() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(58);
  const [step, setStep] = useState(3);
  const dragging = useRef(false);
  const hinted = useRef(false);

  // The AI world's edges light in sequence, the house running behaviour.
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 900);
    return () => clearInterval(t);
  }, []);

  // One gentle hint on first sight: the line eases left to show the AI
  // world, then the reader drives. Play-state only, nothing hidden.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting || hinted.current) return;
          hinted.current = true;
          const t0 = performance.now();
          // There and back: dip toward the AI world, then settle where both
          // worlds read. The reader takes the handle from there.
          const tick = (t: number) => {
            if (dragging.current) return;
            const p = Math.min(1, (t - t0) / 1800);
            const dip = Math.sin(p * Math.PI);
            setX(58 - 20 * dip);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const setFromPointer = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="ppab">
      <ScaledWindow width={940}>
        <div className="ppw-blueprint">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the blueprint</span>
              <span className="ppw-live-pill">drag the line</span>
            </div>
            <div
              className="ppab-stage"
              ref={stageRef}
              style={{ ["--x" as string]: `${x}%` }}
              onPointerDown={(e) => {
                dragging.current = true;
                (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                setFromPointer(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              <div className="ppab-layer">
                <span className="ppab-world">Old world marketing</span>
                <div className="ppab-agency">
                  <span>the agency</span>
                </div>
                <svg viewBox="0 0 940 480" preserveAspectRatio="none">
                  {TODAY_EDGES.map((e, i) => (
                    <path
                      key={i}
                      d={e.d}
                      className={`ppw-edge${e.dashed ? " ppab-dashed" : ""}`}
                    />
                  ))}
                </svg>
                {TODAY_NODES.map((n) => (
                  <NodeCard key={n.label + n.x} n={n} />
                ))}
                {/* The site's character, in the site's register: the facepalm
                    fox lives in the tangle. eslint-disable-next-line
                    @next/next/no-img-element */}
                <img
                  src="/fox/fox-facepalm-nobg.png"
                  alt=""
                  className="ppab-fox ppab-fox-today"
                />
              </div>

              <div className="ppab-layer ppab-layer-ai">
                <span className="ppab-world ppab-world-ai">
                  Modern marketing
                </span>
                <svg viewBox="0 0 940 480" preserveAspectRatio="none">
                  {AI_EDGES.map((e, i) => (
                    <path
                      key={i}
                      d={e.d}
                      className={`ppw-edge${e.dashed ? " ppab-dashed" : ""}`}
                    />
                  ))}
                  {AI_EDGES.filter((e) => e.step !== undefined).map((e, i) => (
                    <path
                      key={`f${i}`}
                      d={e.d}
                      className={`ppw-edge ppw-flow${e.step === step ? " ppw-on" : ""}`}
                    />
                  ))}
                </svg>
                {AI_NODES.map((n) => {
                  const nodeStep =
                    n.label === "Brief"
                      ? 0
                      : n.label === "Machines draft" || n.label === "Brand pack"
                        ? 1
                        : n.label === "Team review"
                          ? 2
                          : 3;
                  const state =
                    nodeStep < step ? "ppw-done" : nodeStep === step ? "ppw-run" : "";
                  return <NodeCard key={n.label} n={n} state={state} />;
                })}
              </div>

              <div
                className="ppab-divider"
                role="slider"
                aria-label="Reveal the AI-world blueprint"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(x)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setX((v) => Math.max(0, v - 4));
                  if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 4));
                }}
              >
                <span className="ppab-handle">◂ ▸</span>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
      <p className="ppab-hint">
        <span className="ppab-slash">/drag the line.</span> Left of it, old
        world marketing: the handovers, the queues, the return trips. Right
        of it, modern marketing: machines draft from the brand pack, people
        review and approve, what worked writes back. A metaphor, not a map of
        Kite: yours gets drawn in the first session, with the people who run
        it.
      </p>
    </div>
  );
}
