"use client";

// The Creative Director exhibit: real Sabre work, ported from the Brand
// Guardian presentation (~/paul-hub/clients/rwf/builds/brand-guardian/
// presentation), on Paul's direction 10 Aug: "use sabre examples... what
// they did, and what we did by machine. Also include the photo to video
// and range of photos where some are theirs and some are ours."
//
// Three windows: theirs-vs-ours (their agency's live GIF next to our
// machine rebuild, the direct frame-count comparison kept on Paul's yes),
// photo to video (their library photograph, the same frame moving, a
// finished ad), and the photographic world (twelve images, six theirs,
// six ours, click to reveal). A click is allowed, a scroll reveal is not.
// Every number here is measured in the presentation, not judged.

import { useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./creative-director.css";

const A = "/for/creative-director";

// The six generated images, per the presentation's own markup.
const OURS = new Set([2, 4, 5, 7, 10, 12]);

export default function CreativeDirector() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="ppcd">
      <ScaledWindow width={940}>
        <div className="ppcd-win">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the creative director</span>
              <span className="ppw-live-pill">both animating</span>
            </div>
            <div className="ppcd-inner">
              <div className="ppcd-vs">
                <figure>
                  <figcaption className="ppcd-tag">
                    Their agency&rsquo;s original
                  </figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${A}/live-platform-970x250.gif`}
                    alt="Sabre's own animated 970 by 250 display ad"
                  />
                  <figcaption className="ppcd-note">
                    11 frames, hard cuts between scenes.
                  </figcaption>
                </figure>
                <figure>
                  <figcaption className="ppcd-tag ppcd-good">
                    Ours, rebuilt by machine
                  </figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${A}/ours-platform-970x250.gif`}
                    alt="Our machine rebuild of the same 970 by 250 ad"
                  />
                  <figcaption className="ppcd-note">
                    39 frames, 450ms dissolves. Same design, smoother.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>

      {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
          dictation. */}
      <p className="pps-standfirst" style={{ marginTop: 30 }}>
        We may be stretching it a little to call this agent a Creative
        Director, as it is more like an Art Director, but it has been
        trained on advertising copywriting too. We&rsquo;ve found that
        focusing on very narrow use cases produces the best results. The
        agent learns how to do one small set of things consistently well.
        The value here is for brands that do lots of advertising and need
        both craft and consistency.
      </p>

      <div className="ppcd-gap">
        <ScaledWindow width={940}>
          <div className="ppcd-win">
            <div className="ppw-frame-win">
              <div className="ppw-tl">
                <i />
                <i />
                <i />
                <span className="ppw-t">photo to video</span>
                <span className="ppw-live-pill">their photograph, moving</span>
              </div>
              <div className="ppcd-inner">
                <div className="ppcd-three">
                  <figure>
                    <figcaption className="ppcd-tag">
                      1. Their library photograph
                    </figcaption>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${A}/photo-subway-source.jpeg`}
                      alt="Sabre library photograph, a woman on a subway platform"
                    />
                    <figcaption className="ppcd-note">
                      Sabre brand imagery. Green and amber, shallow depth of
                      field.
                    </figcaption>
                  </figure>
                  <figure>
                    <figcaption className="ppcd-tag ppcd-mid">
                      2. The same frame, moving
                    </figcaption>
                    <video
                      src={`${A}/photo-subway-generated.mp4`}
                      poster={`${A}/photo-subway-generated-poster.jpg`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <figcaption className="ppcd-note">
                      Five seconds generated from that exact frame. Their
                      grade held.
                    </figcaption>
                  </figure>
                  <figure>
                    <figcaption className="ppcd-tag ppcd-good">
                      3. A finished Sabre ad
                    </figcaption>
                    <video
                      src={`${A}/photo-subway-final.mp4`}
                      poster={`${A}/photo-subway-final-poster.jpg`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <figcaption className="ppcd-note">
                      8.2 seconds, built on their spec, their sign-off line.
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </ScaledWindow>
      </div>

      {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
          dictation. */}
      <p className="pps-standfirst" style={{ marginTop: 30 }}>
        Creating artwork, photography and images, and now videos, that are
        on-brand is a great use case for AI. I built a library with
        hundreds of on-brand images when I was at Miro, which gave us
        consistency, quality and speed.
      </p>

      <div className="ppcd-gap">
        <ScaledWindow width={940}>
          <div className="ppcd-win">
            <div className="ppw-frame-win">
              <div className="ppw-tl">
                <i />
                <i />
                <i />
                <span className="ppw-t">the photographic world</span>
                <span className="ppw-live-pill">six are theirs, six are ours</span>
              </div>
              <div className="ppcd-inner">
                <div
                  className={`ppcd-mix${revealed ? " ppcd-revealed" : ""}`}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <figure key={n}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${A}/mix-${String(n).padStart(2, "0")}.jpg`}
                        alt="Travel photograph"
                      />
                      {OURS.has(n) && <span className="ppcd-badge">ours</span>}
                    </figure>
                  ))}
                </div>
                <button
                  className="ppcd-reveal"
                  type="button"
                  aria-pressed={revealed}
                  onClick={() => setRevealed((v) => !v)}
                >
                  {revealed ? "Hide the badges" : "Reveal the six we made"}
                </button>
              </div>
            </div>
          </div>
        </ScaledWindow>
      </div>

      {/* ⚠️ DRAFT COPY, Paul's pass owed. */}
      <p className="pps-standfirst" style={{ marginTop: 30 }}>
        Twelve travel photographs. Six are Sabre&rsquo;s, and six we
        generated to match the four subjects their own brand book sets
        out, with three of their photographs given as the style reference.
        None is a stock picture chosen to look similar.
      </p>

      <p className="ppft-honest">
        <span className="ppft-slash">/Sabre&rsquo;s real work,</span> shown
        with their name because we build and run these machines for them. A
        creative director is built for one brand at a time.
        Fidelity&rsquo;s would be built to your brand book.
      </p>
    </div>
  );
}
