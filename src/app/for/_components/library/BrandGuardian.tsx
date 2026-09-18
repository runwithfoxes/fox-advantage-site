"use client";

// The brand guardian component, a slip-in/slip-out exhibit per Paul's ask
// (8 Aug, evening): ported from the Brand Guardian presentation's x-ray
// slider (~/paul-hub/clients/rwf/builds/brand-guardian/presentation), which
// is the real Sabre material. One of Sabre's actual ads; drag the line to
// see what the machine sees: greyscale, with the measurements drawn on.
//
// The annotation geometry, thresholds and verdict strip are carried over
// faithfully from the presentation (every number there is measured, not
// judged). Each annotation reveals only once the line has passed its right
// edge, so a label is never shown half-cut. This is OUR work shown as ours:
// the honesty stance needs no metaphor fox here, because nothing is claimed
// about the client.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./brand-guardian.css";

const AD = "/for/guardian/sabre-970x250.png";

const ANNS: { atPct: number; el: React.ReactNode }[] = [
  {
    atPct: (195 / 970) * 100,
    el: (
      <g key="symbol">
        <rect className="ppbg-box ppbg-ok" x={15} y={15} width={51} height={51} />
        <line className="ppbg-tick" x1={66} y1={40} x2={76} y2={40} />
        <text className="ppbg-lbl" x={82} y={36}>
          symbol, 51px
        </text>
        <text className="ppbg-lbl ppbg-sm" x={82} y={51}>
          book floor: 50px
        </text>
      </g>
    ),
  },
  {
    atPct: (360 / 970) * 100,
    el: (
      <g key="bg">
        <rect className="ppbg-box" x={200} y={22} width={28} height={28} fill="#F3EFE4" />
        <text className="ppbg-lbl" x={238} y={36}>
          background #F3EFE4
        </text>
        <text className="ppbg-lbl ppbg-sm" x={238} y={51}>
          98.3% on palette
        </text>
      </g>
    ),
  },
  {
    atPct: (370 / 970) * 100,
    el: (
      <g key="headline">
        <rect className="ppbg-box" x={15} y={116} width={210} height={122} />
        <line className="ppbg-tick" x1={225} y1={164} x2={238} y2={164} />
        <text className="ppbg-lbl" x={244} y={160}>
          headline, measured
        </text>
        <text className="ppbg-lbl ppbg-sm" x={244} y={175}>
          210 x 122px of ink
        </text>
      </g>
    ),
  },
  {
    atPct: (812 / 970) * 100,
    el: (
      <g key="photo">
        <rect className="ppbg-box ppbg-skip" x={459} y={2} width={494} height={246} />
        <rect x={472} y={12} width={286} height={44} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={484} y={32}>
          photograph, 51% of the frame
        </text>
        <text className="ppbg-lbl ppbg-sm" x={484} y={47}>
          colour rules skipped here
        </text>
      </g>
    ),
  },
];

export default function BrandGuardian() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(56);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);
  const hinted = useRef(false);

  // On first sight the exhibit plays itself: a full sweep each way so the
  // reader sees both worlds without knowing the line drags (same device
  // as the workflows blueprint, Paul's ask 10 Aug). A drag cancels it.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting || hinted.current) return;
          hinted.current = true;
          const legs: [number, number, number, number][] = [
            [56, 96, 1800, 700],
            [96, 4, 2200, 700],
            [4, 56, 1400, 0],
          ];
          let leg = 0;
          let t0 = performance.now();
          const ease = (p: number) => 0.5 - 0.5 * Math.cos(p * Math.PI);
          const tick = (t: number) => {
            if (dragging.current) return;
            const [from, to, dur, hold] = legs[leg];
            const p = Math.min(1, (t - t0) / dur);
            setX(from + (to - from) * ease(p));
            if (p < 1) {
              requestAnimationFrame(tick);
            } else if (t - t0 >= dur + hold) {
              leg += 1;
              if (leg < legs.length) {
                t0 = t;
                requestAnimationFrame(tick);
              }
            } else {
              requestAnimationFrame(tick);
            }
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
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="ppbg">
      <ScaledWindow width={940}>
        <div className="ppw-blueprint">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the brand guardian</span>
              <span className="ppw-live-pill">drag to see what it sees</span>
            </div>
            <div className="ppbg-inner">
              <div className="ppbg-worlds">
                <span>What the guardian sees</span>
                <span className="ppbg-right">What you see</span>
              </div>
              <div
                className="ppbg-stage"
                ref={stageRef}
                style={{ ["--x" as string]: `${x}%` }}
                onPointerDown={(e) => {
                  dragging.current = true;
                  setTouched(true);
                  (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                  setFromPointer(e.clientX);
                }}
                onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ppbg-plate" src={AD} alt="A Sabre display ad, 970 by 250" />
                <div className="ppbg-layer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={AD} alt="" />
                  <svg viewBox="0 0 970 250" preserveAspectRatio="none" aria-hidden>
                    {ANNS.map((a, i) => (
                      <g key={i} className={`ppbg-ann${x >= a.atPct ? " ppbg-on" : ""}`}>
                        {a.el}
                      </g>
                    ))}
                  </svg>
                </div>
                <div
                  className="ppbg-divider"
                  role="slider"
                  aria-label="Reveal what the guardian sees"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(x)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") setX((v) => Math.max(0, v - 4));
                    if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 4));
                  }}
                >
                  <span
                    className={`ppbg-handle${touched ? "" : " ppbg-pulse"}`}
                  >
                    ◂ ▸
                  </span>
                </div>
              </div>
              <div className="ppbg-verdict">
                <div>
                  <p className="ppbg-k">verdict</p>
                  <p className="ppbg-v ppbg-good">Clean</p>
                </div>
                <div>
                  <p className="ppbg-k">gates that ran</p>
                  <p className="ppbg-v">4 of 4 applicable</p>
                </div>
                <div>
                  <p className="ppbg-k">measured, not judged</p>
                  <p className="ppbg-v">every line above</p>
                </div>
                <div>
                  <p className="ppbg-k">receipt</p>
                  <p className="ppbg-v">written, pinned to the file</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
      <p className="ppbg-hint">
        <span className="ppbg-slash">/one of Sabre&rsquo;s real ads,</span>{" "}
        guarded by the machine we run for them. The guardian measures the
        file against the brand book: symbol size, background colour,
        headline size, how much of the frame the photograph takes. It works
        out what kind of asset it is looking at, runs the checks that apply
        to that kind, and says which ones ran. One verdict, a few seconds
        per file. A guardian is built for one brand&rsquo;s book at a time.
      </p>
    </div>
  );
}
