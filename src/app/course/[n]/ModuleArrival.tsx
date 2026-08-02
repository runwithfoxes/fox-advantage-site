"use client";

import { useState } from "react";

/**
 * THE ARRIVAL BLOCK, 2 Aug 2026. EXPERIMENT, NOT A DECISION.
 *
 * Paul, 1 Aug: someone lands here wanting to learn something, know something, be better
 * at something. The first thing they met was a five-cell counter strip and "0 of 21 done",
 * which is an inventory and a zero. This replaces that position with a welcome and a
 * self-rated fluency slider.
 *
 * The slider is his own idea, 18 and 19 Jul: rate perceived fluency at the start of
 * module 1 and again at the end of module 6, and show them what moved. Self-rated, so it
 * clears his standing rule that learners are never tested and never made to fail first.
 *
 * ⚠️ THE COPY IN HERE IS NOT PAUL'S. It is placeholder, written to hold the shape so he
 * can judge the layout at real size. Every line is his to rewrite.
 *
 * ⚠️ NOT BUILT: storing the number anywhere, the matching capture at the end of module 6,
 * and how the change is shown back. This saves to nothing.
 *
 * Styles are inline on purpose so this leaves no trace in globals.css when it goes.
 */
export default function ModuleArrival() {
  const [v, setV] = useState(5);
  const [saved, setSaved] = useState(false);

  const label =
    v <= 1
      ? "Not started yet"
      : v <= 3
        ? "Tried it once or twice"
        : v <= 4
          ? "Use it now and then"
          : v <= 6
            ? "Comfortable with the basics"
            : v <= 8
              ? "Use it most days"
              : "Building things with it";

  return (
    <section className="arr">
      <style>{`
        .arr{margin:44px 0 0;padding:0 0 6px;}
        .arr-video{
          border:1px solid #C9C9C3;background:#fff;aspect-ratio:16/9;
          display:flex;align-items:center;justify-content:center;text-align:center;
          font-family:var(--mono);font-size:.75rem;color:#A8A8A2;line-height:1.9;
          margin:0 0 34px;
        }
        .arr-welcome{
          font-family:'Source Serif 4',Georgia,serif;font-size:1.25rem;line-height:1.55;
          color:#1D1B1B;margin:0 0 18px;
        }
        .arr-rate{border-top:1px solid #C9C9C3;margin-top:40px;padding-top:34px;}
        .arr-q{
          font-family:var(--sans);font-weight:500;font-size:1.25rem;line-height:1.35;
          color:#1D1B1B;margin:0 0 10px;
        }
        .arr-note{
          font-family:var(--mono);font-size:.75rem;line-height:1.7;color:#8A8A85;margin:0 0 34px;
        }
        .arr-row{display:flex;align-items:flex-start;gap:28px;}
        .arr-shell{flex:1;min-width:0;}
        .arr input[type=range]{
          -webkit-appearance:none;appearance:none;width:100%;height:2px;background:#E0E0DC;
          outline:none;cursor:pointer;display:block;
        }
        .arr input[type=range]::-webkit-slider-thumb{
          -webkit-appearance:none;appearance:none;width:14px;height:30px;background:#3A7CA5;border:0;cursor:grab;
        }
        .arr input[type=range]::-moz-range-thumb{width:14px;height:30px;background:#3A7CA5;border:0;border-radius:0;cursor:grab;}
        .arr-ticks{
          display:flex;justify-content:space-between;margin-top:14px;
          font-family:var(--mono);font-size:.625rem;letter-spacing:.06em;
          text-transform:uppercase;color:#A8A8A2;
        }
        .arr-out{
          flex:0 0 180px;border-left:1px solid #C9C9C3;padding-left:22px;
          font-family:var(--mono);font-size:.75rem;color:#1D1B1B;line-height:1.6;
        }
        .arr-out b{
          display:block;font-family:var(--mono);font-size:1.875rem;font-weight:400;
          color:#3A7CA5;line-height:1;margin-bottom:8px;font-variant-numeric:tabular-nums;
        }
        .arr-actions{display:flex;align-items:center;gap:18px;margin-top:38px;}
        .arr-actions button{
          font-family:var(--mono);font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase;
          background:#1A3A4E;color:#FAFAF8;border:0;border-radius:0;padding:13px 26px;cursor:pointer;
        }
        .arr-actions button:hover{background:#3A7CA5;}
        .arr-saved{font-family:var(--mono);font-size:.75rem;color:#8A8A85;}
        .arr-pace{
          font-family:var(--mono);font-size:.75rem;line-height:1.8;color:#8A8A85;
          border-top:1px solid #C9C9C3;margin-top:44px;padding-top:22px;
        }
        @media (max-width:760px){
          .arr-row{flex-direction:column;gap:26px;}
          .arr-out{flex:1 1 auto;border-left:0;border-top:1px solid #C9C9C3;padding-left:0;padding-top:20px;}
        }
      `}</style>

      <div className="arr-video">
        PLACEHOLDER, NOT SHOT
        <br />
        Paul, 60 seconds, why he is glad you are here
      </div>

      {/* STILL MY WORDING, but now carrying the two jobs Paul named on 2 Aug: set the scene
          for how deep the course goes, then be small. His words are in
          module-descriptions.md under "Module 1, what it is FOR". */}
      <p className="arr-welcome">
        This course goes a long way. Later on we build agents, wire whole systems together,
        and take on work that was not possible at all a couple of years ago.
      </p>
      <p className="arr-welcome">
        This first module is not that. It is a run through of small things, each one useful
        on its own, each one something you can use today. Do enough of them and the fluency
        comes quickly.
      </p>

      <div className="arr-rate">
        {/* Paul's words, 2 Aug. Not to be reworded. */}
        <p className="arr-q">How AI fluent do you feel that you are?</p>
        <p className="arr-note">
          Your own read of it, not a test. Nobody else sees it. At the end of module 6 I
          will ask again, and you will see what moved.
        </p>

        <div className="arr-row">
          <div className="arr-shell">
            <input
              type="range"
              min={1}
              max={10}
              value={v}
              onChange={(e) => setV(Number(e.target.value))}
              aria-label="How fluent do you feel with AI right now, 1 to 10"
            />
            <div className="arr-ticks">
              <span>1 just starting</span>
              <span>10 very fluent</span>
            </div>
          </div>
          <div className="arr-out">
            <b>{v}</b>
            {label}
          </div>
        </div>

        <div className="arr-actions">
          <button type="button" onClick={() => setSaved(true)}>
            Save and begin
          </button>
          {saved && (
            <span className="arr-saved">
              Saved. I will ask you again at the end of module 6.
            </span>
          )}
        </div>
      </div>

      <p className="arr-pace">
        No deadline on this. The next module lands whether you finish or not, and nothing
        here expires.
      </p>
    </section>
  );
}
