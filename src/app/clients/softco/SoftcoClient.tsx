"use client";

import { useState, useTransition } from "react";
import { verifyPassword } from "./actions";

const M = "/clients/softco/media";

function Vid({ src, ratio = "1 / 1" }: { src: string; ratio?: string }) {
  return (
    <div className="tile" style={{ aspectRatio: ratio }}>
      <video src={src} autoPlay loop muted playsInline preload="metadata" />
    </div>
  );
}
function Img({ src, ratio = "1 / 1" }: { src: string; ratio?: string }) {
  return (
    <div className="tile" style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
    </div>
  );
}

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
          <div className="sc-logo">/<span>Run</span>withfoxes</div>
          <div className="sc-gate-label">/clients/softco</div>
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
          A live view of the work in progress for SoftCo, in the new brand system.
          Everything here is built and approved. Animated pieces play in place.
        </p>

        {/* deliverables + status summary */}
        <div className="sc-summary">
          <div className="sc-row sc-row-head">
            <span>Deliverable</span><span>Format</span><span>Detail</span><span>Status</span>
          </div>
          <div className="sc-row">
            <span>Product Proof ad</span><span>Animated · square</span><span>2 variants</span>
            <span><i className="b ok" />Approved</span>
          </div>
          <div className="sc-row">
            <span>Chart Ad set</span><span>Animated · display</span><span>11 IAB sizes</span>
            <span><i className="b ok" />Approved</span>
          </div>
          <div className="sc-row">
            <span>Iceberg diagram</span><span>Animated · square</span><span>Explainer</span>
            <span><i className="b ok" />Approved</span>
          </div>
          <div className="sc-row">
            <span>Testimonial cards</span><span>Static + animated · square</span><span>4 layout options</span>
            <span><i className="b ok" />Approved</span>
          </div>
        </div>

        {/* 1. Product Proof */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Product Proof ad</h2>
            <span className="badge ok">Approved</span>
          </div>
          <p className="sc-desc">The product itself, rebuilt as live UI and animated - panels drift in, checks tick, the headline number lands. Two variants.</p>
          <div className="sc-grid two">
            <Vid src={`${M}/proof-v1.mp4`} />
            <Vid src={`${M}/proof-v2.mp4`} />
          </div>
        </section>

        {/* 2. Chart Ad */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Chart Ad set</h2>
            <span className="badge ok">Approved</span>
          </div>
          <p className="sc-desc">Animated display ad, produced across the full IAB size range (11 sizes). Square and leaderboard shown; the set also covers 728×90, 300×250, 160×600, 600×200 and the strip formats.</p>
          <div className="sc-grid">
            <Vid src={`${M}/chart-1080.mp4`} />
            <Vid src={`${M}/chart-970x250.mp4`} ratio="970 / 250" />
          </div>
        </section>

        {/* 3. Iceberg */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Iceberg diagram</h2>
            <span className="badge ok">Approved</span>
          </div>
          <p className="sc-desc">Animated explainer - the visible cost above the line, the hidden cost below.</p>
          <div className="sc-grid two">
            <Vid src={`${M}/iceberg-1080.mp4`} />
            <div />
          </div>
        </section>

        {/* 4. Testimonials */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Testimonial cards</h2>
            <span className="badge ok">Approved</span>
          </div>
          <p className="sc-desc">Four layout options, each with the neuron field gently animating (shown). Static versions are produced for every one. Anton Scott used as the test face; real cards take a customer quote and photo.</p>
          <div className="sc-grid four">
            <figure><Vid src={`${M}/testimonial-v1.mp4`} /><figcaption>v1 · Photo column</figcaption></figure>
            <figure><Vid src={`${M}/testimonial-v2.mp4`} /><figcaption>v2 · Cut-out</figcaption></figure>
            <figure><Vid src={`${M}/testimonial-A.mp4`} /><figcaption>Format A · Quote panel</figcaption></figure>
            <figure><Vid src={`${M}/testimonial-B.mp4`} /><figcaption>Format B · Speaker promo</figcaption></figure>
          </div>
        </section>

        <footer className="sc-foot">Run with Foxes · private workspace for SoftCo</footer>
      </div>
    </div>
  );
}
