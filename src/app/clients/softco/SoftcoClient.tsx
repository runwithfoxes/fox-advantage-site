"use client";

import { useState, useTransition } from "react";
import { verifyPassword } from "./actions";

const M = "/clients/softco/media";
const STATUS = "Ready for feedback";

function Vid({
  src,
  poster,
  ratio = "1 / 1",
}: {
  src: string;
  poster?: string;
  ratio?: string;
}) {
  return (
    <div className="tile" style={{ aspectRatio: ratio }}>
      <video src={src} poster={poster} autoPlay loop muted playsInline preload="metadata" />
    </div>
  );
}

// Chart Ad set, grouped by shape. [size, displayWidthPx]
const CHART_GROUPS: [string, [string, number][]][] = [
  ["Square and rectangle", [["1080x1080", 280], ["640x480", 300], ["300x250", 240], ["160x600", 150]]],
  ["Leaderboard and billboard", [["970x250", 560], ["1029x210", 560], ["728x90", 440], ["600x200", 340]]],
  ["Strips and mobile", [["320x100", 320], ["600x100", 460], ["300x50", 320]]],
];

const TESTI: [string, string][] = [
  ["v1", "Photo column"],
  ["v2", "Cut-out"],
  ["A", "Quote panel"],
  ["B", "Speaker promo"],
];

export default function SoftcoClient({ initialAuth }: { initialAuth: boolean }) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await verifyPassword(password);
      if (ok) setAuthed(true);
      else {
        setError("Wrong password.");
        setPassword("");
      }
    });
  }

  if (!authed) {
    return (
      <div className="sc-gate">
        <div className="sc-gate-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-fox" src="/fox/chapter-fox-sitting-nobg.png" alt="" />
          <div className="sc-logo">/<span>Run</span>withfoxes</div>
          <div className="sc-gate-label">clients / softco</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoFocus
              disabled={isPending}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "checking…" : "enter"}
            </button>
          </form>
          {error && <div className="sc-gate-error">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="sc-page">
      <header className="sc-top">
        <a href="/" className="sc-logo">/<span>Run</span>withfoxes</a>
        <div className="sc-top-right">private workspace</div>
      </header>

      <div className="sc-wrap">
        <div className="sc-eyebrow">Run with Foxes &times; SoftCo</div>
        <h1 className="sc-title">Creative deliverables</h1>
        <p className="sc-intro">
          A live view of the work for SoftCo in the new brand system. Every size
          and version is here, static and animated. Have a look and send back
          your thoughts.
        </p>

        <div className="sc-summary">
          <div className="sc-row sc-row-head">
            <span>Deliverable</span>
            <span>Format</span>
            <span>Detail</span>
            <span>Status</span>
          </div>
          <div className="sc-row">
            <span>Chart Ad set</span><span>Animated, display</span><span>11 IAB sizes</span>
            <span><i className="b" />{STATUS}</span>
          </div>
          <div className="sc-row">
            <span>Iceberg diagram</span><span>Animated, square</span><span>Explainer</span>
            <span><i className="b" />{STATUS}</span>
          </div>
          <div className="sc-row">
            <span>Testimonial cards</span><span>Static and animated, square</span><span>4 layouts</span>
            <span><i className="b" />{STATUS}</span>
          </div>
          <div className="sc-row">
            <span>Product Proof ad</span><span>Animated, square</span><span>Extra, beyond brief</span>
            <span><i className="b" />{STATUS}</span>
          </div>
        </div>

        {/* Chart Ad - every size */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Chart Ad set</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            The animated display ad across the full IAB range, eleven sizes from
            the square down to the mobile strips. Every size is here at true
            proportion.
          </p>
          {CHART_GROUPS.map(([label, items]) => (
            <div className="sc-chart-group" key={label}>
              <div className="sc-chart-label">{label}</div>
              <div className="sc-chart-row">
                {items.map(([size, w]) => {
                  const [cw, ch] = size.split("x");
                  return (
                    <div className="sc-chart-item" key={size} style={{ width: w }}>
                      <Vid
                        src={`${M}/chart-${size}.mp4`}
                        poster={`${M}/chart-${size}-poster.png`}
                        ratio={`${cw} / ${ch}`}
                      />
                      <div className="cap">{size}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Iceberg */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Iceberg diagram</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            Animated explainer. The visible cost above the line, the hidden cost
            below.
          </p>
          <div className="sc-grid">
            <figure><Vid src={`${M}/iceberg-1080.mp4`} poster={`${M}/iceberg-poster.png`} /></figure>
            <div />
          </div>
        </section>

        {/* Testimonials - static + animated */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Testimonial cards</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            Four layout options, each produced static and with the neuron field
            gently animating. Anton Scott is the test face. Real cards take a
            customer quote and photo.
          </p>
          <div className="sc-testi-grid">
            {TESTI.map(([key, name]) => (
              <figure key={key}>
                <div className="sc-testi-name">{name}</div>
                <Vid src={`${M}/testimonial-${key}.mp4`} poster={`${M}/testimonial-${key}.png`} />
                <div className="submark">Animated</div>
                <div className="tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${M}/testimonial-${key}.png`} alt="" />
                </div>
                <div className="submark">Static</div>
              </figure>
            ))}
          </div>
        </section>

        {/* Product Proof - an extra, beyond the brief, sits at the bottom */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Product Proof ad</h2>
            <span className="badge">{STATUS}</span>
            <span className="badge sc-extra">Extra</span>
          </div>
          <p className="sc-desc">
            An extra we explored beyond the brief. The product itself, rebuilt as
            live UI and animated. Shown square for now, it still needs to be set
            into the standard ad sizes like the others.
          </p>
          <div className="sc-grid">
            <figure><Vid src={`${M}/proof-v1.mp4`} poster={`${M}/proof-v1-poster.png`} /><figcaption>Invoice checks</figcaption></figure>
            <figure><Vid src={`${M}/proof-v2.mp4`} poster={`${M}/proof-v2-poster.png`} /><figcaption>AI matching</figcaption></figure>
          </div>
        </section>

        <footer className="sc-foot">Run with Foxes · private workspace for SoftCo</footer>
      </div>
    </div>
  );
}
