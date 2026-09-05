"use client";

// The brand guardian, for the homepage /agents section. The same exhibit the
// proposal pages carry (drag the line to see what the machine sees), on a
// MADE-UP brand. Paul, 5 Sep: "we can't use Sabre, so we're going to have to
// create a fake brand ... one that feels like a Sabre type brand." Tessera is
// an invented travel-technology company; the ad was drawn for this page and
// nothing about it belongs to any real client. The annotation geometry is
// measured off the drawn file (symbol 48px at 16,16; headline ink box;
// artwork frame 494 of 970). Thresholds are invented for the invented book.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "@/app/for/_components/library/AgentWindows";
import "@/app/for/_components/library/brand-guardian.css";

const AD = "/agents/guardian/tessera-970x250.png";

const ANNS: { atPct: number; el: React.ReactNode }[] = [
  {
    atPct: (190 / 970) * 100,
    el: (
      <g key="symbol">
        <rect className="ppbg-box ppbg-ok" x={16} y={16} width={48} height={48} />
        <line className="ppbg-tick" x1={40} y1={64} x2={40} y2={72} />
        <text className="ppbg-lbl" x={48} y={80}>
          symbol, 48px
        </text>
        <text className="ppbg-lbl ppbg-sm" x={48} y={93}>
          book floor: 44px
        </text>
      </g>
    ),
  },
  {
    atPct: (420 / 970) * 100,
    el: (
      <g key="bg">
        <rect className="ppbg-box" x={250} y={22} width={28} height={28} fill="#F1EEE6" />
        <text className="ppbg-lbl" x={288} y={36}>
          background #F1EEE6
        </text>
        <text className="ppbg-lbl ppbg-sm" x={288} y={51}>
          on palette, exact
        </text>
      </g>
    ),
  },
  {
    atPct: (430 / 970) * 100,
    el: (
      <g key="headline">
        <rect className="ppbg-box" x={16} y={98} width={262} height={112} />
        <line className="ppbg-tick" x1={278} y1={150} x2={291} y2={150} />
        <text className="ppbg-lbl" x={297} y={146}>
          headline, measured
        </text>
        <text className="ppbg-lbl ppbg-sm" x={297} y={161}>
          262 x 112px of ink
        </text>
      </g>
    ),
  },
  {
    atPct: (820 / 970) * 100,
    el: (
      <g key="photo">
        <rect className="ppbg-box ppbg-skip" x={478} y={2} width={490} height={246} />
        <rect x={492} y={12} width={286} height={44} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={504} y={32}>
          artwork, 51% of the frame
        </text>
        <text className="ppbg-lbl ppbg-sm" x={504} y={47}>
          book floor: 45%
        </text>
      </g>
    ),
  },
];

export default function GuardianWindow() {
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
                <img className="ppbg-plate" src={AD} alt="A Tessera display ad, 970 by 250. Tessera is a made-up company." />
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
        <span className="ppbg-slash">/illustrative.</span> Tessera is a made-up
        travel technology company and this ad was drawn for this page. The
        guardian measures the file against the brand book: symbol size,
        background colour, headline size, how much of the frame the artwork
        takes. It works out what kind of asset it is looking at, runs the
        checks that apply to that kind, and says which ones ran. One verdict, a
        few seconds per file. A guardian is built for one brand&rsquo;s book at
        a time.
      </p>
    </div>
  );
}
