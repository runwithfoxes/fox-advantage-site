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
 * ⭐ THE OPENING PARAGRAPHS AND THE FLUENCY QUESTION ARE PAUL'S OWN WORDS (2 Aug 2026).
 * Verbatim. Not to be reworded.
 *
 * ⚠️ STILL PLACEHOLDER AND STILL HIS TO REWRITE: the video slot's caption, the grey note
 * under the fluency question, the slider's own descriptions, and the "no deadline" line at
 * the bottom. Do not describe this whole block as his copy.
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
        /* ⭐ A PANEL, NOT A STRIP BETWEEN TWO HAIRLINES. Paul, 2 Aug: "the ai fluency test
           is really important that they do this, and again it feels like it is disappearing
           into the background." It was loose elements under a border-top, which is the same
           treatment as the pace note below it, so the one thing on the page he actually
           wants people to DO looked like a footnote. Square corners, per brand. */
        .arr-rate{background:#fff;border:1px solid #C9C9C3;margin-top:44px;padding:30px 32px 32px;}
        /* Same size as an item heading (.mod-h3, 24px). This asks for an action, so it should
           not read as smaller than the things that merely ask to be read. */
        .arr-q{
          font-family:var(--sans);font-weight:500;font-size:1.5rem;line-height:1.3;
          color:#1D1B1B;margin:0 0 10px;
        }
        .arr-note{
          font-family:var(--mono);font-size:.75rem;line-height:1.7;color:#8A8A85;margin:0 0 34px;
        }
        .arr-row{display:flex;align-items:flex-start;gap:28px;}
        .arr-shell{flex:1;min-width:0;}
        /* 4px, not 2px. A 2px hairline track reads as a divider rather than a control. */
        .arr input[type=range]{
          -webkit-appearance:none;appearance:none;width:100%;height:4px;background:#E0E0DC;
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

      {/* ⛔ NO WELCOME PARAGRAPHS HERE. Deleted 2 Aug 2026 on Paul's instruction. His
          opening now lives at the TOP of the page, under the h1, as MODULE_1.opening in
          moduleData.ts. Do not reintroduce a second welcome: this block sits below the
          video and its only job is the fluency question. */}

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
