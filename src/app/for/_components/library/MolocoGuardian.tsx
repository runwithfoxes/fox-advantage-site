"use client";

// The Moloco brand guardian, laid out the way the proposal pages showed the
// Sabre one (BrandGuardian.tsx): drag the line to see what the guardian
// measured. Paul, 8 Oct 2026: "I want to take the same level of how we show
// it for Moloco, but in the way that we used to do it for Sabre in our
// proposals."
//
// The file is one of the six test ads the guardian was built to be tested on
// (moloco/brand-machine/out/near-miss/00-good-as-jpeg), an ad we made in
// Moloco's identity, cropped to its top 440px. Every number on it is from the
// guardian's own run of 9 September 2026 on that file: five things measured
// and passed, two it could not measure and asked a person about. The symbol
// size is as measured in the full-size 1080px file.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import ad from "../unknown-group/moloco-test-ad.jpg";
import "./brand-guardian.css";

const AD = ad.src;

const ANNS: { atPct: number; el: React.ReactNode }[] = [
  {
    atPct: (470 / 700) * 100,
    el: (
      <g key="symbol">
        <rect className="ppbg-box ppbg-ok" x={25} y={271} width={54} height={50} />
        <rect x={244} y={262} width={222} height={66} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={254} y={282}>
          symbol, 74 x 67px
        </text>
        <text className="ppbg-lbl ppbg-sm" x={254} y={298}>
          rule: never under 30px high
        </text>
        <text className="ppbg-lbl ppbg-sm" x={254} y={314}>
          shape within 0.5% of the real logo
        </text>
      </g>
    ),
  },
  {
    atPct: (490 / 700) * 100,
    el: (
      <g key="bg">
        <rect className="ppbg-box" x={254} y={218} width={26} height={26} fill="#E9FFD1" />
        <rect x={288} y={212} width={200} height={40} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={296} y={229}>
          #E9FFD1, Light Green
        </text>
        <text className="ppbg-lbl ppbg-sm" x={296} y={245}>
          34.9% of the file, on palette
        </text>
      </g>
    ),
  },
  {
    atPct: (655 / 700) * 100,
    el: (
      <g key="grid">
        <line className="ppbg-tick" x1={404} y1={35} x2={404} y2={58} />
        <rect x={404} y={58} width={246} height={40} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={412} y={75}>
          grid lines, three found
        </text>
        <text className="ppbg-lbl ppbg-sm" x={412} y={91}>
          all hairlines, at or under 3.2px
        </text>
      </g>
    ),
  },
  {
    atPct: (372 / 700) * 100,
    el: (
      <g key="photo">
        <rect className="ppbg-box ppbg-skip" x={2} y={352} width={661} height={86} />
        <rect x={14} y={372} width={346} height={44} fill="#FAFAF8" opacity={0.94} />
        <text className="ppbg-lbl" x={24} y={391}>
          photograph, not judged by the guardian
        </text>
        <text className="ppbg-lbl ppbg-sm" x={24} y={407}>
          it quotes the rule and asks a person
        </text>
      </g>
    ),
  },
];

export default function MolocoGuardian() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(72);
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
            [72, 96, 1500, 700],
            [96, 4, 2200, 700],
            [4, 72, 1600, 0],
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
              <span className="ppw-t">the Moloco brand guardian</span>
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
                <img className="ppbg-plate" src={AD} alt="A test ad in Moloco's identity" />
                <div className="ppbg-layer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={AD} alt="" />
                  <svg viewBox="0 0 700 440" preserveAspectRatio="none" aria-hidden>
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
                  <p className="ppbg-v ppbg-good">Pass, on what it can measure</p>
                </div>
                <div>
                  <p className="ppbg-k">measured and passed</p>
                  <p className="ppbg-v">5 checks</p>
                </div>
                <div>
                  <p className="ppbg-k">asked a person</p>
                  <p className="ppbg-v">2 checks</p>
                </div>
                <div>
                  <p className="ppbg-k">every line</p>
                  <p className="ppbg-v">names the rule it used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
      <p className="ppbg-hint">
        <span className="ppbg-slash">/a test ad we made in Moloco&rsquo;s identity,</span>{" "}
        one of six files the guardian was tested on. It reads a finished image
        and measures it against Moloco&rsquo;s brand rules: the size and shape
        of the symbol, the colours, the grid lines. Anything it cannot measure
        from the file, such as how a photograph is used, it hands to a person
        with the rule quoted. Four of the other five had one small fault built in, such as a colour
        three steps off or a logo stretched by four per cent, and the guardian
        failed all four. On the fifth, a logo too small to measure accurately,
        it asked a person.
      </p>
    </div>
  );
}
