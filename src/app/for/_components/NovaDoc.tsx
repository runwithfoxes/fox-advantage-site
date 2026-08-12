"use client";

// Nova HCM - the website mockup, screen one only (the hero).
// This is NOT a proposal page. It is "here is how your brand could look":
// Nova's messaging and Nova's brand at the tech language's bar. Design and
// rules: ~/projects/fox-meeting-pages/research/tech-language-design.md.
//
// What screen one commits to:
// - The persistent world (the Giga approach, Paul's pick 11 Aug): the made
//   Sligo world carries the page, UI floats calm and straight inside it.
//   Hero world: Benbulben at first light (made image, Dray world_mode run).
// - The living panel: an illustrative Nova people-systems view, labelled on
//   its face, systems connecting one by one. No counters, nothing pulses.
// - The pickup: the panel is grabbable (pointer capture + glide), the
//   AgentsHero idiom.
// - Copy: drafted from the 5 Aug messaging framework (Paul + Cian). The
//   hero line is the framework's own hero message, verbatim.
// - One accent family: the blues measured off Nova's logo. Their primary
//   button colour #274060 runs the CTAs.

import { useEffect, useRef } from "react";
import "./nova-doc.css";

function useGrabbable() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let px = 0;
    let py = 0;
    let dragging = false;
    let raf = 0;

    const apply = () => {
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const glide = () => {
      if (dragging) return;
      vx *= 0.94;
      vy *= 0.94;
      if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) return;
      x += vx;
      y += vy;
      apply();
      raf = requestAnimationFrame(glide);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      cancelAnimationFrame(raf);
      el.setPointerCapture(e.pointerId);
      el.classList.add("nv-grabbed");
      px = e.clientX;
      py = e.clientY;
      vx = 0;
      vy = 0;
    };

    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      x += dx;
      y += dy;
      vx = dx;
      vy = dy;
      apply();
    };

    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("nv-grabbed");
      raf = requestAnimationFrame(glide);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return ref;
}

// The Ken Burns drift, driven by rAF writing style.transform directly.
// CSS keyframes froze in real Chrome twice while headless ran them; the
// direct-write idiom is proven in this page (the grabbable panel).
// Sine cycle, starts mid-motion, respects reduced motion.
function useWorldDrift() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const CYCLE = 12000; // ms for a full in-out
    const AMP = 0.055; // half of the 11% total zoom range
    const PAN = 14; // px of sideways drift, the zoom's travelling companion
    let raf = 0;
    const t0 = performance.now() - CYCLE / 4; // start mid-motion
    const tick = (now: number) => {
      const phase = ((now - t0) % CYCLE) / CYCLE;
      const wave = (1 - Math.cos(2 * Math.PI * phase)) / 2;
      const scale = 1 + AMP * 2 * wave;
      const x = -PAN * wave;
      el.style.transform = `translateX(${x.toFixed(2)}px) scale(${scale.toFixed(5)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return ref;
}

export default function NovaDoc() {
  const panelRef = useGrabbable();
  const worldRef = useWorldDrift();

  return (
    <div className="nv-root">
      <section className="nv-hero">
        <div className="nv-hero-world" aria-hidden="true" ref={worldRef} />

        <nav className="nv-nav" aria-label="Nova HCM">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="nv-nav-logo"
            src="/for/nova/nova-logo.svg"
            alt="Nova HCM"
          />
          <div className="nv-nav-links">
            {/* Draft copy: the three phases from the 5 Aug messaging
                framework. Descriptions are placeholders until Paul passes
                the copy deck. */}
            <div className="nv-nav-item">
              <a href="#platform">What we do</a>
              <div className="nv-dropdown">
                <a href="#diagnose">
                  <b>Diagnose and decide</b>
                  <span>
                    A clear read of your HR systems and what to do next.
                  </span>
                </a>
                <a href="#delivery">
                  <b>Delivery</b>
                  <span>
                    The chosen system implemented, adopted and live.
                  </span>
                </a>
                <a href="#hypercare">
                  <b>Hypercare</b>
                  <span>
                    Support after go-live while the new system beds in.
                  </span>
                </a>
              </div>
            </div>
            <a href="#how">How it works</a>
            <a href="#about">About</a>
          </div>
          <a className="nv-nav-cta" href="#contact">
            Book a call
          </a>
        </nav>

        <div className="nv-hero-copy">
          <p className="nv-eyebrow">Independent HR technology advisory</p>
          {/* Lines broken by phrase, deliberately (rule 15): never let the
              browser rag a serif display block, never one word alone. */}
          <h1 className="nv-h1">
            The right system
            <br />
            for your business,
            <br />
            <em>chosen for you, not sold to you.</em>
          </h1>
          <p className="nv-sub">
            Nova helps people leaders select, implement and optimise the
            right HR technology. Based in Sligo, working with scaling
            companies worldwide.
          </p>
          <div className="nv-hero-actions">
            <a className="nv-btn nv-btn-primary" href="#contact">
              Book a call
            </a>
            <a className="nv-btn nv-btn-ghost" href="#how">
              How we work
            </a>
          </div>
        </div>

        <div className="nv-panel" ref={panelRef}>
          <div className="nv-panel-bar">
            <div className="nv-panel-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="nv-panel-title">People systems, one view</span>
            <span className="nv-panel-tag">Illustrative</span>
          </div>
          <div className="nv-panel-body">
            <div className="nv-metrics">
              <div className="nv-metric">
                <b>1,240</b>
                <span>Headcount</span>
              </div>
              <div className="nv-metric">
                <b>34 days</b>
                <span>Time to hire</span>
              </div>
              <div className="nv-metric">
                <b>8.2%</b>
                <span>Attrition</span>
              </div>
            </div>
            <div className="nv-systems">
              <div className="nv-system">
                <span className="nv-system-mark" />
                Payroll
                <span className="nv-system-state">Connected</span>
              </div>
              <div className="nv-system">
                <span className="nv-system-mark" />
                Time &amp; attendance
                <span className="nv-system-state">Connected</span>
              </div>
              <div className="nv-system">
                <span className="nv-system-mark" />
                Core HR
                <span className="nv-system-state">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
