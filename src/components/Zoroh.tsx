"use client";

import { useEffect, useRef, useState } from "react";

/* ── scroll reveal hook ── */

function useScrollVisible(threshold = 0.2) {
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

/* ── data ── */

const stats = [
  { value: "15+", label: "Years", sub: "Commercial growth experience" },
  { value: "40+", label: "Founders", sub: "Businesses scaled at inflection point" },
  { value: "2.4×", label: "Revenue", sub: "Average growth within 18 months" },
];

const pillars = [
  {
    number: "01",
    title: "Market alignment",
    items: ["ICP definition", "Positioning and messaging", "Market entry strategy"],
    description:
      "Most scaleups are selling to everyone. We narrow the focus to the customers who actually drive growth, then build positioning that earns attention in that market.",
  },
  {
    number: "02",
    title: "Revenue alignment",
    items: ["Pipeline generation", "Sales execution", "Revenue operations"],
    description:
      "Pipeline is not the problem. The problem is pipeline that converts. We build the commercial engine — process, tooling, metrics — so revenue becomes predictable.",
  },
  {
    number: "03",
    title: "Talent and brand alignment",
    items: ["GTM hiring", "Sales enablement", "Brand positioning"],
    description:
      "You cannot scale what you cannot staff. We help you hire the right commercial talent and build a brand that makes hiring (and selling) easier.",
  },
];

const signals = [
  "Revenue growing, forecast confidence falling",
  "Founder central to too many decisions",
  "Too many initiatives, unclear priorities",
  "Sales hires underperforming expectations",
  "Pipeline unpredictable quarter to quarter",
];

const approach = [
  {
    phase: "Diagnose",
    description: "Four-week commercial audit. We map your revenue architecture, identify the structural gaps, and quantify the cost of inaction.",
  },
  {
    phase: "Align",
    description: "Build the blueprint. Market, revenue, and talent strategies designed to work together, not in silos. AI-enabled where it accelerates outcomes.",
  },
  {
    phase: "Execute",
    description: "Hands-on implementation alongside your team. We build the systems, hire the people, and stay until the architecture holds without us.",
  },
];

/* ── components ── */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollVisible(0.15);
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

/* ── main page ── */

export default function ZorohPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        .z-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          z-index: 100;
          background: var(--white);
          transition: box-shadow 150ms ease, border-color 150ms ease;
        }

        .z-nav.scrolled {
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 12px rgba(13, 27, 42, 0.06);
        }

        .z-nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--navy);
        }

        .z-nav-mark {
          width: 36px;
          height: 36px;
          background: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }

        .z-nav-mark span {
          font-family: 'Playfair Display', serif;
          color: var(--white);
          font-size: 20px;
          font-weight: 500;
        }

        .z-nav-wordmark {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--navy);
        }

        .z-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .z-nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .z-nav-links a:hover {
          color: var(--green);
        }

        /* ── hero ── */

        .z-hero {
          background: var(--navy);
          padding: calc(72px + 6rem) 3rem 6rem;
          position: relative;
          overflow: hidden;
        }

        .z-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(13,27,42,0.95) 40%, rgba(13,27,42,0.7) 100%);
          z-index: 1;
        }

        .z-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .z-hero-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 2rem;
        }

        .z-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          line-height: 1.15;
          color: var(--white);
          max-width: 800px;
          letter-spacing: -0.01em;
          margin-bottom: 2rem;
        }

        .z-hero-sub {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          max-width: 560px;
          margin-bottom: 3rem;
        }

        .z-hero-cta {
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
          text-decoration: none;
          transition: background 150ms ease;
        }

        .z-hero-cta:hover {
          background: var(--green-hover);
        }

        .z-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .z-stat-value {
          font-family: 'DM Mono', monospace;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 500;
          color: var(--white);
          line-height: 1;
          margin-bottom: 4px;
        }

        .z-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .z-stat-sub {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        /* ── sections ── */

        .z-section {
          padding: 6rem 3rem;
        }

        .z-section-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .z-section.stone { background: var(--stone); }
        .z-section.white { background: var(--white); }
        .z-section.navy {
          background: var(--navy);
          color: rgba(255, 255, 255, 0.65);
        }

        .z-accent-rule {
          width: 2.5rem;
          height: 2px;
          background: var(--green);
          margin-bottom: 1.5rem;
        }

        .z-section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 1rem;
        }

        .z-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--navy);
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
          max-width: 640px;
        }

        .z-section.navy h2 {
          color: var(--white);
        }

        .z-section-text {
          font-size: 17px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 2rem;
        }

        .z-section.navy .z-section-text {
          color: rgba(255, 255, 255, 0.65);
        }

        /* ── signals ── */

        .z-signals {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 3rem;
          max-width: 640px;
        }

        .z-signal {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
          font-size: 15px;
          color: var(--navy);
        }

        .z-signal:first-child {
          border-top: 1px solid var(--border);
        }

        .z-signal-dot {
          width: 6px;
          height: 6px;
          background: var(--orange);
          flex-shrink: 0;
        }

        /* ── pillars ── */

        .z-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 3rem;
        }

        .z-pillar {
          padding: 2.5rem;
          border: 1px solid var(--border);
          background: var(--white);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .z-pillar:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(13, 27, 42, 0.1);
        }

        .z-pillar-number {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--green);
          margin-bottom: 1rem;
        }

        .z-pillar h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: var(--navy);
          margin-bottom: 1rem;
        }

        .z-pillar-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .z-pillar-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .z-pillar-items li {
          font-size: 13px;
          font-weight: 500;
          color: var(--navy);
          padding-left: 16px;
          position: relative;
        }

        .z-pillar-items li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 4px;
          background: var(--green);
          transform: translateY(-50%);
        }

        /* ── approach ── */

        .z-approach {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .z-approach-step {
          padding: 2.5rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .z-approach-step:last-child {
          border-right: none;
        }

        .z-approach-phase {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 1rem;
        }

        .z-approach-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 400;
          color: var(--white);
          margin-bottom: 1rem;
        }

        .z-approach-desc {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }

        /* ── quote ── */

        .z-quote {
          padding: 5rem 3rem;
          background: var(--stone);
          text-align: center;
        }

        .z-quote-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        .z-quote blockquote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.4;
          color: var(--navy);
          margin-bottom: 1.5rem;
        }

        .z-quote cite {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          font-style: normal;
          letter-spacing: 0.04em;
        }

        /* ── CTA section ── */

        .z-cta-section {
          background: var(--navy);
          padding: 6rem 3rem;
          text-align: center;
        }

        .z-cta-inner {
          max-width: 640px;
          margin: 0 auto;
        }

        .z-cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 400;
          color: var(--white);
          margin-bottom: 1.5rem;
          max-width: none;
        }

        .z-cta-section p {
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 2.5rem;
        }

        .z-cta-btn {
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
          text-decoration: none;
          transition: background 150ms ease;
        }

        .z-cta-btn:hover {
          background: var(--green-hover);
        }

        .z-cta-outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--white);
          margin-left: 16px;
        }

        .z-cta-outline:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        /* ── footer ── */

        .z-footer {
          background: var(--navy);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3rem;
        }

        .z-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .z-footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .z-footer-mark {
          width: 32px;
          height: 32px;
          background: var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }

        .z-footer-mark span {
          font-family: 'Playfair Display', serif;
          color: var(--white);
          font-size: 17px;
          font-weight: 500;
        }

        .z-footer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .z-footer-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .z-footer-link {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .z-footer-link:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        /* ── AI section ── */

        .z-ai-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-top: 3rem;
          align-items: start;
        }

        .z-ai-text {
          font-size: 17px;
          line-height: 1.7;
          color: var(--muted);
        }

        .z-ai-text p + p {
          margin-top: 1.5rem;
        }

        .z-ai-layers {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .z-ai-layer {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          font-size: 15px;
          color: var(--navy);
          font-weight: 500;
        }

        .z-ai-layer:first-child {
          border-top: 1px solid var(--border);
        }

        .z-ai-layer-num {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--green);
          font-weight: 500;
          flex-shrink: 0;
        }

        /* ── responsive ── */

        @media (max-width: 1024px) {
          .z-pillars { grid-template-columns: 1fr; }
          .z-approach { grid-template-columns: 1fr; }
          .z-approach-step { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
          .z-approach-step:last-child { border-bottom: none; }
          .z-ai-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .z-nav { padding: 0 1.5rem; }
          .z-nav-links { display: none; }
          .z-hero { padding: calc(72px + 4rem) 1.5rem 4rem; }
          .z-hero-stats { grid-template-columns: 1fr; gap: 24px; }
          .z-section { padding: 4rem 1.5rem; }
          .z-quote { padding: 4rem 1.5rem; }
          .z-cta-section { padding: 4rem 1.5rem; }
          .z-footer { padding: 2rem 1.5rem; }
          .z-footer-inner { flex-direction: column; gap: 16px; text-align: center; }
          .z-footer-right { flex-direction: column; gap: 12px; }
          .z-cta-outline { margin-left: 0; margin-top: 12px; }
        }

        @media (max-width: 480px) {
          .z-nav { padding: 0 1rem; }
          .z-hero { padding: calc(72px + 3rem) 1rem 3rem; }
          .z-section { padding: 3rem 1rem; }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className={`z-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="z-nav-logo">
          <div className="z-nav-mark">
            <span>Z</span>
          </div>
          <span className="z-nav-wordmark">ZOROH</span>
        </a>
        <ul className="z-nav-links">
          <li><a href="#problem">The problem</a></li>
          <li><a href="#system">The system</a></li>
          <li><a href="#ai">AI stack</a></li>
          <li><a href="#approach">Approach</a></li>
          <li><a href="#contact">Partner with us</a></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="z-hero">
        <div className="z-hero-inner">
          <FadeIn>
            <div className="z-hero-label">Growth partners for founder-led scaleups</div>
          </FadeIn>
          <FadeIn delay={80}>
            <h1>Build a business that scales with clarity, not chaos</h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="z-hero-sub">
              Zoroh works with founder-led businesses at the growth inflection point, where ambition
              has outpaced structure. We build the commercial architecture so revenue becomes
              predictable.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <a href="#system" className="z-hero-cta">
              Explore the system
              <span style={{ fontSize: "18px" }}>&rarr;</span>
            </a>
          </FadeIn>
          <FadeIn delay={320}>
            <div className="z-hero-stats">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="z-stat-value">{s.value}</div>
                  <div className="z-stat-label">{s.label}</div>
                  <div className="z-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="z-section stone">
        <div className="z-section-inner">
          <FadeIn>
            <div className="z-accent-rule" />
            <div className="z-section-label">The pattern</div>
            <h2>Growth gets noisy before it gets fragile</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="z-section-text">
              Most B2B scaleups hit a predictable wall between €5M and €15M ARR. Revenue growth
              stalls, sales hires underperform, and the pipeline becomes unpredictable. The root
              cause is almost always the same: the business has outgrown founder-led selling but
              hasn't built the commercial architecture to replace it.
            </p>
          </FadeIn>
          <div className="z-signals">
            {signals.map((s, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="z-signal">
                  <div className="z-signal-dot" />
                  {s}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <div className="z-quote">
        <div className="z-quote-inner">
          <FadeIn>
            <blockquote>
              &ldquo;If nothing changed in 12 months, would that be acceptable?&rdquo;
            </blockquote>
            <cite>The question we start with</cite>
          </FadeIn>
        </div>
      </div>

      {/* ── System / Pillars ── */}
      <section id="system" className="z-section white">
        <div className="z-section-inner">
          <FadeIn>
            <div className="z-accent-rule" />
            <div className="z-section-label">The system</div>
            <h2>Revenue scales through architecture, not heroics</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="z-section-text">
              Ambition isn't the issue. Structure is. We align three pillars of your commercial
              engine so they work together instead of pulling apart.
            </p>
          </FadeIn>
          <div className="z-pillars">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="z-pillar">
                  <div className="z-pillar-number">{p.number}</div>
                  <h3>{p.title}</h3>
                  <p className="z-pillar-desc">{p.description}</p>
                  <ul className="z-pillar-items">
                    {p.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ── */}
      <section id="ai" className="z-section stone">
        <div className="z-section-inner">
          <FadeIn>
            <div className="z-accent-rule" />
            <div className="z-section-label">AI-enabled</div>
            <h2>AI embedded across the revenue architecture</h2>
          </FadeIn>
          <div className="z-ai-grid">
            <FadeIn delay={80}>
              <div className="z-ai-text">
                <p>
                  We don't bolt AI onto broken processes. We build the right commercial architecture
                  first, then accelerate it with AI where it creates genuine leverage: faster
                  pipeline qualification, sharper forecasting, better enablement.
                </p>
                <p>
                  Every layer is practical, not theoretical. We implement alongside your team using
                  tools that exist today, not a vision deck about what might work in 2028.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="z-ai-layers">
                {[
                  "Market intelligence and ICP scoring",
                  "Pipeline generation and qualification",
                  "Sales enablement and coaching",
                  "Revenue forecasting and analytics",
                  "Content and brand positioning",
                ].map((layer, i) => (
                  <div key={i} className="z-ai-layer">
                    <span className="z-ai-layer-num">{String(i + 1).padStart(2, "0")}</span>
                    {layer}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section id="approach" className="z-section navy">
        <div className="z-section-inner">
          <FadeIn>
            <div className="z-accent-rule" />
            <div className="z-section-label" style={{ color: "var(--green)" }}>Our approach</div>
            <h2>Diagnose. Align. Execute.</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="z-section-text">
              Three phases. No twelve-month discovery process. We move at the speed your business
              needs, not the speed a consultancy prefers.
            </p>
          </FadeIn>
          <div className="z-approach">
            {approach.map((a, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="z-approach-step">
                  <div className="z-approach-phase">Phase {String(i + 1).padStart(2, "0")}</div>
                  <div className="z-approach-title">{a.phase}</div>
                  <p className="z-approach-desc">{a.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="z-cta-section">
        <div className="z-cta-inner">
          <FadeIn>
            <h2>Ready to build the architecture?</h2>
            <p>
              We work with a small number of scaleups at any one time. If you're between €5M and
              €15M ARR and the growth has started to feel harder than it should, let's talk.
            </p>
            <div>
              <a href="mailto:hello@zoroh.com" className="z-cta-btn">
                Get in touch
                <span style={{ fontSize: "18px" }}>&rarr;</span>
              </a>
              <a href="#system" className="z-cta-btn z-cta-outline">
                Explore the system
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="z-footer">
        <div className="z-footer-inner">
          <div className="z-footer-logo">
            <div className="z-footer-mark">
              <span>Z</span>
            </div>
            <span className="z-footer-text">Zoroh Growth Partners</span>
          </div>
          <div className="z-footer-right">
            <span className="z-footer-text">&copy; 2026 Zoroh Growth Partners</span>
            <a href="mailto:hello@zoroh.com" className="z-footer-link">hello@zoroh.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
