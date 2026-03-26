"use client";

import { useEffect, useRef, useState } from "react";

/* ── scroll reveal hook ── */

function useScrollVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── colour swatches ── */

const colours = [
  { token: "--navy", hex: "#0D1B2A", label: "Navy", usage: "Hero, footer, headings, dark sections", dark: true },
  { token: "--green", hex: "#1A6B3C", label: "Green", usage: "Accent only. Labels, buttons, links, accent rules", dark: true },
  { token: "--green-hover", hex: "#155730", label: "Green hover", usage: "Button hover state", dark: true },
  { token: "--stone", hex: "#F5F4F0", label: "Stone", usage: "Warm alternating section background", dark: false },
  { token: "--white", hex: "#FFFFFF", label: "White", usage: "Alternating section background", dark: false },
  { token: "--muted", hex: "#6B7280", label: "Muted", usage: "Secondary text, metadata, dates", dark: true },
  { token: "--border", hex: "#E5E7EB", label: "Border", usage: "Dividers, section separators", dark: false },
  { token: "--orange", hex: "#FF5722", label: "Orange", usage: "Signal dots, chart accents. Sparingly.", dark: true },
];

const typeScale = [
  { element: "Hero headline", font: "Playfair Display", size: "clamp(2.5rem, 6vw, 4.5rem)", weight: "400", spacing: "-0.01em" },
  { element: "Section heading", font: "Playfair Display", size: "clamp(1.75rem, 3.5vw, 2.5rem)", weight: "400", spacing: "-0.01em" },
  { element: "Sub-heading", font: "Playfair Display", size: "clamp(1.5rem, 3vw, 2.25rem)", weight: "400", spacing: "—" },
  { element: "Body text", font: "DM Sans", size: "15px / 17px", weight: "400", spacing: "normal" },
  { element: "Labels", font: "DM Sans", size: "11px / 13px", weight: "500", spacing: "0.1em" },
  { element: "Nav links", font: "DM Sans", size: "14px", weight: "500", spacing: "normal" },
  { element: "Buttons", font: "DM Sans", size: "15px", weight: "600", spacing: "normal" },
  { element: "Stats", font: "DM Mono", size: "clamp(2.5rem, 5vw, 3.5rem)", weight: "500", spacing: "normal" },
];

/* ── main page ── */

export default function ZorohPage() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        :root {
          --navy: #0D1B2A;
          --green: #1A6B3C;
          --green-hover: #155730;
          --stone: #F5F4F0;
          --white: #FFFFFF;
          --muted: #6B7280;
          --border: #E5E7EB;
          --orange: #FF5722;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          color: var(--navy);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* ── nav ── */

        .zb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          z-index: 100;
          background: var(--white);
          transition: box-shadow 150ms ease, border-color 150ms ease;
        }

        .zb-nav.scrolled {
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 12px rgba(13, 27, 42, 0.06);
        }

        .zb-nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--navy);
        }

        .zb-nav-mark {
          width: 36px; height: 36px;
          background: var(--navy);
          display: flex; align-items: center; justify-content: center;
          border-radius: 2px;
        }

        .zb-nav-mark span {
          font-family: 'Playfair Display', serif;
          color: var(--white);
          font-size: 20px;
          font-weight: 500;
        }

        .zb-nav-wordmark {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .zb-nav-badge {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-left: 8px;
        }

        .zb-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .zb-nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .zb-nav-links a:hover { color: var(--green); }

        /* ── hero ── */

        .zb-hero {
          background: var(--navy);
          padding: calc(72px + 6rem) 3rem 6rem;
          position: relative;
        }

        .zb-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .zb-hero-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 2rem;
        }

        .zb-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          line-height: 1.15;
          color: var(--white);
          max-width: 800px;
          letter-spacing: -0.01em;
          margin-bottom: 2rem;
        }

        .zb-hero-sub {
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          max-width: 600px;
        }

        .zb-hero-meta {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 48px;
        }

        .zb-hero-meta-item {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .zb-hero-meta-item strong {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        /* ── sections ── */

        .zb-section {
          padding: 6rem 3rem;
        }

        .zb-section-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .zb-section.stone { background: var(--stone); }
        .zb-section.white { background: var(--white); }
        .zb-section.navy {
          background: var(--navy);
          color: rgba(255, 255, 255, 0.65);
        }

        .zb-accent-rule {
          width: 2.5rem;
          height: 2px;
          background: var(--green);
          margin-bottom: 1.5rem;
        }

        .zb-section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 1rem;
        }

        .zb-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--navy);
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
          max-width: 640px;
        }

        .zb-section.navy h2 { color: var(--white); }

        .zb-section-text {
          font-size: 17px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 2rem;
        }

        .zb-section.navy .zb-section-text {
          color: rgba(255, 255, 255, 0.55);
        }

        /* ── colour swatches ── */

        .zb-swatches {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 3rem;
        }

        .zb-swatch {
          cursor: pointer;
          transition: transform 150ms ease;
          position: relative;
        }

        .zb-swatch:hover { transform: translateY(-2px); }

        .zb-swatch-block {
          height: 100px;
          display: flex;
          align-items: flex-end;
          padding: 12px;
          border: 1px solid var(--border);
        }

        .zb-swatch-hex {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
        }

        .zb-swatch-info {
          padding: 12px 0;
        }

        .zb-swatch-token {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: var(--navy);
          font-weight: 500;
          margin-bottom: 4px;
        }

        .zb-swatch-usage {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }

        .zb-copied {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 8px;
          background: var(--green);
          color: var(--white);
        }

        /* ── type specimens ── */

        .zb-type-specimens {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .zb-type-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border);
          align-items: baseline;
        }

        .zb-type-row:first-child {
          border-top: 1px solid var(--border);
        }

        .zb-type-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .zb-type-meta-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--green);
        }

        .zb-type-meta-detail {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ── type scale table ── */

        .zb-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 3rem;
        }

        .zb-table th {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: left;
          padding: 12px 16px;
          border-bottom: 2px solid var(--navy);
        }

        .zb-table td {
          font-size: 13px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--navy);
        }

        .zb-table td:first-child { font-weight: 500; }

        .zb-table .mono {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: var(--muted);
        }

        /* ── layout spec ── */

        .zb-spec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 3rem;
        }

        .zb-spec-card {
          padding: 2rem;
          border: 1px solid var(--border);
          background: var(--white);
        }

        .zb-spec-card-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 8px;
        }

        .zb-spec-card-value {
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          font-weight: 500;
          color: var(--navy);
          margin-bottom: 8px;
        }

        .zb-spec-card-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }

        /* ── component demos ── */

        .zb-demo-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .zb-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--green);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 32px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .zb-btn-primary:hover { background: var(--green-hover); }

        .zb-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 32px;
          border: 1px solid var(--navy);
          border-radius: 2px;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
        }

        .zb-btn-outline:hover {
          background: var(--navy);
          color: var(--white);
        }

        .zb-btn-outline-light {
          border-color: rgba(255,255,255,0.2);
          color: var(--white);
        }

        .zb-btn-outline-light:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.05);
          color: var(--white);
        }

        /* ── card demo ── */

        .zb-demo-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 2rem;
        }

        .zb-demo-card {
          padding: 2rem;
          border: 1px solid var(--border);
          background: var(--white);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .zb-demo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(13, 27, 42, 0.1);
        }

        .zb-demo-card-num {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--green);
          margin-bottom: 1rem;
        }

        .zb-demo-card h4 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--navy);
          margin-bottom: 8px;
        }

        .zb-demo-card p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
        }

        /* ── section demo (dark) ── */

        .zb-demo-dark {
          background: var(--navy);
          padding: 3rem;
          margin-top: 2rem;
        }

        .zb-demo-dark h3 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 400;
          color: var(--white);
          margin-bottom: 1rem;
        }

        .zb-demo-dark p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          max-width: 480px;
          margin-bottom: 1.5rem;
        }

        /* ── rules list ── */

        .zb-rules {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 3rem;
          max-width: 720px;
        }

        .zb-rule {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-size: 15px;
        }

        .zb-rule:first-child { border-top: 1px solid rgba(255,255,255,0.08); }

        .zb-rule-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .zb-rule-do .zb-rule-icon { color: var(--green); }
        .zb-rule-dont .zb-rule-icon { color: var(--orange); }

        /* ── nav section anchors ── */

        .zb-nav-anchor {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 2rem;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .zb-nav-anchor-num {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: var(--green);
          font-weight: 500;
        }

        /* ── footer ── */

        .zb-footer {
          background: var(--navy);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3rem;
        }

        .zb-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .zb-footer-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .zb-footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .zb-footer-mark {
          width: 28px; height: 28px;
          background: var(--green);
          display: flex; align-items: center; justify-content: center;
          border-radius: 2px;
        }

        .zb-footer-mark span {
          font-family: 'Playfair Display', serif;
          color: var(--white);
          font-size: 15px;
          font-weight: 500;
        }

        .zb-footer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .zb-footer-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.1);
        }

        /* ── responsive ── */

        @media (max-width: 1024px) {
          .zb-swatches { grid-template-columns: repeat(2, 1fr); }
          .zb-spec-grid { grid-template-columns: 1fr; }
          .zb-demo-cards { grid-template-columns: 1fr; }
          .zb-type-row { grid-template-columns: 1fr; gap: 12px; }
        }

        @media (max-width: 768px) {
          .zb-nav { padding: 0 1.5rem; }
          .zb-nav-links { display: none; }
          .zb-nav-badge { display: none; }
          .zb-hero { padding: calc(72px + 4rem) 1.5rem 4rem; }
          .zb-hero-meta { flex-direction: column; gap: 12px; }
          .zb-section { padding: 4rem 1.5rem; }
          .zb-swatches { grid-template-columns: 1fr 1fr; }
          .zb-footer { padding: 2rem 1.5rem; }
          .zb-footer-inner { flex-direction: column; gap: 16px; }
          .zb-footer-left { flex-direction: column; gap: 12px; }
          .zb-demo-dark { padding: 2rem; }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className={`zb-nav ${scrolled ? "scrolled" : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="#" className="zb-nav-logo">
            <div className="zb-nav-mark"><span>Z</span></div>
            <span className="zb-nav-wordmark">ZOROH</span>
          </a>
          <span className="zb-nav-badge">Brand guidelines</span>
        </div>
        <ul className="zb-nav-links">
          <li><a href="#colours">Colours</a></li>
          <li><a href="#typography">Typography</a></li>
          <li><a href="#layout">Layout</a></li>
          <li><a href="#components">Components</a></li>
          <li><a href="#rules">Rules</a></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="zb-hero">
        <div className="zb-hero-inner">
          <FadeIn>
            <div className="zb-hero-label">Brand guidelines v1</div>
          </FadeIn>
          <FadeIn delay={80}>
            <h1>Zoroh Growth Partners</h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="zb-hero-sub">
              Visual identity and design system for Zoroh. Built from Dave&apos;s preferred site,
              informed by General Catalyst, a16z, and McKinsey. The principle is restrained
              confidence: simple, sophisticated, and sharp.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="zb-hero-meta">
              <div className="zb-hero-meta-item"><strong>Client</strong>&ensp;Dave Soraghan</div>
              <div className="zb-hero-meta-item"><strong>Date</strong>&ensp;March 2026</div>
              <div className="zb-hero-meta-item"><strong>By</strong>&ensp;Run with Foxes</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Design philosophy ── */}
      <section className="zb-section stone">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">Philosophy</div>
            <h2>Simple yet sophisticated. Restrained confidence.</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              Zoroh is a growth advisory firm for founder-led scaleups. The brand should signal:
              we&apos;ve done this before, we think clearly, we don&apos;t need to shout. The design takes
              its cues from premium VC and consulting firms: editorial authority, generous whitespace,
              two or three colours doing all the work.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="zb-section-text" style={{ marginTop: 0 }}>
              The test: if you removed the logo, could you tell this was Zoroh? If not, the design
              isn&apos;t distinctive enough.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Colours ── */}
      <section id="colours" className="zb-section white">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">Colour palette</div>
            <h2>Three colours. No exceptions.</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              Navy, green, and warm stone do everything. Orange appears only in data visualisation
              and signal elements. Click any swatch to copy its hex value.
            </p>
          </FadeIn>
          <div className="zb-swatches">
            {colours.map((c, i) => (
              <FadeIn key={c.hex} delay={i * 70}>
                <div className="zb-swatch" onClick={() => copyHex(c.hex)}>
                  <div
                    className="zb-swatch-block"
                    style={{
                      background: c.hex,
                      borderColor: c.dark ? "transparent" : "var(--border)",
                    }}
                  >
                    <span className="zb-swatch-hex" style={{ color: c.dark ? "rgba(255,255,255,0.7)" : "var(--navy)" }}>
                      {c.hex}
                    </span>
                    {copied === c.hex && <span className="zb-copied">Copied</span>}
                  </div>
                  <div className="zb-swatch-info">
                    <div className="zb-swatch-token">{c.token}</div>
                    <div className="zb-swatch-usage">{c.usage}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Typography ── */}
      <section id="typography" className="zb-section stone">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">Typography</div>
            <h2>Three fonts, each with a clear job</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              Playfair Display carries authority on headlines. DM Sans handles everything functional.
              DM Mono gives stats and numbers a sense of precision. All loaded from Google Fonts.
            </p>
          </FadeIn>

          {/* specimens */}
          <div className="zb-type-specimens">
            <FadeIn>
              <div className="zb-type-row">
                <div className="zb-type-meta">
                  <div className="zb-type-meta-label">Display</div>
                  <div className="zb-type-meta-detail">
                    Playfair Display<br />
                    Weight 400<br />
                    Letter-spacing -0.01em
                  </div>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: "var(--navy)",
                  }}>
                    Revenue scales through architecture, not heroics
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="zb-type-row">
                <div className="zb-type-meta">
                  <div className="zb-type-meta-label">Body</div>
                  <div className="zb-type-meta-detail">
                    DM Sans<br />
                    Weight 400<br />
                    15px / line-height 1.6
                  </div>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}>
                    Most B2B scaleups hit a predictable wall between €5M and €15M ARR. Revenue growth
                    stalls, sales hires underperform, and the pipeline becomes unpredictable. The root
                    cause is almost always the same.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="zb-type-row">
                <div className="zb-type-meta">
                  <div className="zb-type-meta-label">Data</div>
                  <div className="zb-type-meta-detail">
                    DM Mono<br />
                    Weight 500<br />
                    clamp(2.5rem, 5vw, 3.5rem)
                  </div>
                </div>
                <div style={{ display: "flex", gap: "48px", alignItems: "baseline" }}>
                  <div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 500,
                      color: "var(--navy)",
                    }}>15+</span>
                    <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>Years</p>
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 500,
                      color: "var(--navy)",
                    }}>2.4×</span>
                    <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>Revenue growth</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* type scale table */}
          <FadeIn delay={240}>
            <table className="zb-table">
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Font</th>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>Spacing</th>
                </tr>
              </thead>
              <tbody>
                {typeScale.map((row, i) => (
                  <tr key={i}>
                    <td>{row.element}</td>
                    <td>{row.font}</td>
                    <td className="mono">{row.size}</td>
                    <td className="mono">{row.weight}</td>
                    <td className="mono">{row.spacing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>
        </div>
      </section>

      {/* ── Layout ── */}
      <section id="layout" className="zb-section white">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">Layout</div>
            <h2>Generous whitespace, sharp geometry</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              Content breathes. Sections use 96px vertical padding on desktop. The container is
              centred at 1280px with 48px side padding. Everything is square, no rounded corners.
            </p>
          </FadeIn>

          <div className="zb-spec-grid">
            <FadeIn>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Container</div>
                <div className="zb-spec-card-value">max-width: 1280px</div>
                <div className="zb-spec-card-desc">Padding: 3rem desktop, 2rem tablet, 1.25rem mobile</div>
              </div>
            </FadeIn>
            <FadeIn delay={70}>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Section padding</div>
                <div className="zb-spec-card-value">6rem 0</div>
                <div className="zb-spec-card-desc">96px top and bottom. Reduced to 4rem on mobile.</div>
              </div>
            </FadeIn>
            <FadeIn delay={140}>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Navigation</div>
                <div className="zb-spec-card-value">72px fixed</div>
                <div className="zb-spec-card-desc">White background. Border-bottom and shadow appear on scroll.</div>
              </div>
            </FadeIn>
            <FadeIn delay={210}>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Border radius</div>
                <div className="zb-spec-card-value">2px (buttons only)</div>
                <div className="zb-spec-card-desc">Everything else is sharp. No rounded cards, no pill shapes.</div>
              </div>
            </FadeIn>
            <FadeIn delay={280}>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Shadows</div>
                <div className="zb-spec-card-value">Hover only</div>
                <div className="zb-spec-card-desc">0 8px 32px rgba(13,27,42,0.1) on card hover. Nothing else.</div>
              </div>
            </FadeIn>
            <FadeIn delay={350}>
              <div className="zb-spec-card">
                <div className="zb-spec-card-label">Section rhythm</div>
                <div className="zb-spec-card-value">Navy / Stone / White</div>
                <div className="zb-spec-card-desc">Alternating backgrounds. Dark sections for hero, CTA, footer.</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Components ── */}
      <section id="components" className="zb-section stone">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">Components</div>
            <h2>Buttons, cards, and dark sections</h2>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={80}>
            <p className="zb-section-text">Buttons</p>
            <div className="zb-demo-row">
              <button className="zb-btn-primary">Primary button <span>&rarr;</span></button>
              <button className="zb-btn-outline">Outline button</button>
            </div>
          </FadeIn>

          {/* Cards */}
          <FadeIn delay={160}>
            <p className="zb-section-text" style={{ marginTop: "3rem" }}>Cards (hover to see lift)</p>
          </FadeIn>
          <div className="zb-demo-cards">
            {[
              { num: "01", title: "Market alignment", desc: "ICP definition, positioning, market entry strategy" },
              { num: "02", title: "Revenue alignment", desc: "Pipeline generation, sales execution, revenue operations" },
              { num: "03", title: "Talent and brand", desc: "GTM hiring, sales enablement, brand positioning" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 70 + 230}>
                <div className="zb-demo-card">
                  <div className="zb-demo-card-num">{c.num}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Dark section demo */}
          <FadeIn delay={300}>
            <p className="zb-section-text" style={{ marginTop: "3rem" }}>Dark section</p>
            <div className="zb-demo-dark">
              <div className="zb-accent-rule" />
              <div className="zb-section-label" style={{ color: "var(--green)" }}>Our approach</div>
              <h3>Diagnose. Align. Execute.</h3>
              <p>
                Three phases. No twelve-month discovery process. We move at the speed your business
                needs, not the speed a consultancy prefers.
              </p>
              <div className="zb-demo-row">
                <button className="zb-btn-primary">Get in touch <span>&rarr;</span></button>
                <button className="zb-btn-outline zb-btn-outline-light">Learn more</button>
              </div>
            </div>
          </FadeIn>

          {/* Accent rule demo */}
          <FadeIn delay={370}>
            <p className="zb-section-text" style={{ marginTop: "3rem" }}>Accent rule</p>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "1rem" }}>
              <div className="zb-accent-rule" style={{ marginBottom: 0 }} />
              <span className="zb-type-meta-detail">
                2.5rem wide, 2px tall, var(--green). Used above section headings.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Rules ── */}
      <section id="rules" className="zb-section navy">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label" style={{ color: "var(--green)" }}>Design rules</div>
            <h2>Do this. Never that.</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              These rules keep the brand consistent. Every element should pass the test: does this
              feel like Zoroh, or could it be any consultancy?
            </p>
          </FadeIn>

          <div className="zb-rules">
            {[
              { do: true, text: "Use navy (#0D1B2A) for dark sections and text" },
              { do: false, text: "Never use pure black (#000) as a background" },
              { do: true, text: "Use warm stone (#F5F4F0) for alternating backgrounds" },
              { do: false, text: "Never use cool greys (#F5F5F5, #FAFAFA)" },
              { do: true, text: "Use green as accent only: buttons, links, labels, accent rules" },
              { do: false, text: "Never use green as a section background" },
              { do: true, text: "Sharp corners on everything. 2px radius on buttons only." },
              { do: false, text: "Never use rounded cards, pill shapes, or large border-radius" },
              { do: true, text: "Sentence case headings. First word capitalised, rest lowercase." },
              { do: false, text: "Never use Title Case or ALL CAPS on headings" },
              { do: true, text: "Subtle scroll fade-ins: translateY(20px), 150ms ease" },
              { do: false, text: "Never use animated counters, typewriter effects, or parallax" },
              { do: true, text: "Playfair Display for headings, DM Sans for body, DM Mono for stats" },
              { do: false, text: "Never mix in other typefaces" },
              { do: true, text: "One hover shadow: 0 8px 32px rgba(13,27,42,0.1)" },
              { do: false, text: "Never use decorative shadows, gradients, or heavy effects" },
            ].map((rule, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className={`zb-rule ${rule.do ? "zb-rule-do" : "zb-rule-dont"}`}>
                  <div className="zb-rule-icon">
                    {rule.do ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    )}
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{rule.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reference sites ── */}
      <section className="zb-section stone">
        <div className="zb-section-inner">
          <FadeIn>
            <div className="zb-accent-rule" />
            <div className="zb-section-label">References</div>
            <h2>Informed by these three sites</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="zb-section-text">
              Dave identified these as sites he admires. We extracted the shared DNA: colour restraint,
              editorial typography, generous whitespace, sharp geometry, and content-first hierarchy.
            </p>
          </FadeIn>
          <div className="zb-demo-cards">
            {[
              {
                num: "GC",
                title: "General Catalyst",
                desc: "Warm editorial feel. Serif + sans pairing. Deep purple and beige. Two-colour restraint.",
              },
              {
                num: "a16z",
                title: "Andreessen Horowitz",
                desc: "Monochrome confidence. Content-as-publication. System fonts. Zero decoration.",
              },
              {
                num: "McK",
                title: "McKinsey",
                desc: "Deep navy palette. Custom serif for authority. Sharp geometry. Whitespace as status.",
              },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="zb-demo-card">
                  <div className="zb-demo-card-num">{c.num}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="zb-footer">
        <div className="zb-footer-inner">
          <div className="zb-footer-left">
            <div className="zb-footer-logo">
              <div className="zb-footer-mark"><span>Z</span></div>
              <span className="zb-footer-text">Zoroh Growth Partners</span>
            </div>
            <div className="zb-footer-divider" />
            <span className="zb-footer-text">Brand guidelines v1</span>
          </div>
          <span className="zb-footer-text">Prepared by Run with Foxes, March 2026</span>
        </div>
      </footer>
    </>
  );
}
