"use client";

// The ad machine moment, from Paul's dictated beat five: one approved master
// ad spawns the entire size set in front of the reader. Ported from the Ad
// Resizer product page's Experience demo (wireframes/module-ad-maker.html)
// into the house window chrome. The ads are REAL files from our own campaign
// (the dayone set), which is the honesty stance: our work, shown as ours.
//
// Base state: the whole set is visible, so nothing is hidden without
// JavaScript. Pressing run replays the spawn.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./ad-machine.css";

const OUT = "/products/assets/dayone";

export default function AdMachine() {
  const [runId, setRunId] = useState(0);
  const [spawning, setSpawning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const run = () => {
    setRunId((n) => n + 1);
    setSpawning(true);
  };

  // Plays once on first sight, then the reader owns the button. Play-state
  // only: without JavaScript the set just sits complete.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            run();
          }
        }),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ad = (dim: string, file: string, style: React.CSSProperties, i: number) => (
    <div
      className={`ppam-ad${spawning ? " ppam-spawn" : ""}`}
      style={{ ...style, ["--i" as string]: i }}
      key={`${file}-${runId}`}
    >
      <span className="ppam-dim">{dim}</span>
      <div className="ppam-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${OUT}/${file}`} alt={`Ad at ${dim}`} />
      </div>
    </div>
  );

  return (
    <div className="ppam" ref={rootRef}>
      <ScaledWindow width={940}>
        <div className="ppw-blueprint">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the ad machine</span>
              <span className="ppw-live-pill">one ad in, every size out</span>
            </div>
            <div className="ppam-stage">
              <div className="ppam-source">
                <p className="ppam-eyebrow">The approved master</p>
                <div className="ppam-master">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${OUT}/dayone-1080x1080.gif`} alt="The approved master ad" />
                </div>
                <div className="ppam-prompt">
                  <span className="ppam-caret">&gt;</span>
                  <span className="ppam-cmd">make every size for the June wave</span>
                  <button type="button" className="ppam-run" onClick={run}>
                    Run
                  </button>
                </div>
              </div>
              <div className="ppam-arrow">→</div>
              <div className="ppam-out">
                <p className="ppam-eyebrow ppam-eyebrow-muted">The set, on brand, minutes later</p>
                <div className="ppam-cluster">
                  <div className="ppam-left">
                    <div className="ppam-row">
                      {ad("970 × 250", "dayone-970x250.gif", { flexGrow: 3.88, ["--ar" as string]: "970/250" }, 0)}
                    </div>
                    <div className="ppam-row">
                      {ad("640 × 480", "dayone-640x480.gif", { flexGrow: 1.58, ["--ar" as string]: "640/480" }, 1)}
                      <div className="ppam-col2">
                        {ad("300 × 250", "dayone-300x250.gif", { ["--ar" as string]: "300/250" }, 2)}
                        {ad("320 × 100", "dayone-320x100.gif", { ["--ar" as string]: "320/100" }, 3)}
                      </div>
                    </div>
                    <div className="ppam-row">
                      {ad("728 × 90", "dayone-728x90.gif", { flexGrow: 8.09, ["--ar" as string]: "728/90" }, 4)}
                    </div>
                  </div>
                  {ad("160 × 600", "dayone-160x600.gif", { ["--ar" as string]: "160/600" }, 5)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
      <p className="ppam-hint">
        <span className="ppam-slash">/real files, our own campaign.</span> The
        master was approved once; the machine laid out every other size, on
        brand, no designer re-drawing each one. Kite&rsquo;s machine gets
        calibrated to Kite&rsquo;s brand, and the full set comes back in
        minutes whenever the team needs it.
      </p>
    </div>
  );
}
