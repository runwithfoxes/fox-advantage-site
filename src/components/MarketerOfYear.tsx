"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── data ── */

const stats = [
  { value: "€1B", label: "Revenue", sub: "First time in company history" },
  { value: "803K", label: "Frequent players", sub: "9% year-on-year growth" },
  {
    value: "€2.68",
    label: "Return per €1 spent",
    sub: "Measured by econometrics",
  },
];

const revenueData = [
  { year: "2017", value: 550 },
  { year: "2018", value: 680 },
  { year: "2019", value: 840 },
  { year: "2020", value: 870 },
  { year: "2021", value: 1000 },
];

const brandEquityData = [
  { label: "Brand I trust", before: 33, after: 38 },
  { label: "Admire & respect", before: 22, after: 30 },
  { label: "Good reputation", before: 36, after: 42 },
  { label: "For people like me", before: 23, after: 36 },
  { label: "Feel close to", before: 16, after: 26 },
  { label: "Rooted in community", before: 24, after: 37 },
  { label: "Hear good things", before: 24, after: 36 },
  { label: "Gives back to causes", before: 15, after: 55 },
  { label: "Fair value", before: 25, after: 38 },
  { label: "Acts responsibly", before: 26, after: 37 },
];

const assetsData = [
  { label: "Logo", value: 96 },
  { label: "Slogan", value: 87 },
  { label: "Waterslide", value: 82 },
  { label: "Yellow ring", value: 71 },
  { label: "Green", value: 64 },
  { label: "Song", value: 62 },
];

/* ── hooks ── */

function useScrollVisible(threshold = 0.3) {
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

/* ── charts ── */

function RevenueChart() {
  const { ref, visible } = useScrollVisible(0.3);
  const maxVal = 1100;
  const barW = 56;
  const gap = 28;
  const total = revenueData.length * barW + (revenueData.length - 1) * gap;
  const startX = (500 - total) / 2;
  const chartH = 260;

  return (
    <div ref={ref} className="moty-chart-wrap">
      <div className="moty-chart-heading">Year-on-year revenue (€M)</div>
      <svg viewBox="0 0 500 310" className="moty-chart-svg">
        {revenueData.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const x = startX + i * (barW + gap);
          const y = chartH - barH;
          const isHero = d.year === "2021";
          return (
            <g key={d.year}>
              <rect
                x={x}
                y={visible ? y : chartH}
                width={barW}
                height={visible ? barH : 0}
                fill={isHero ? "var(--orange)" : "#E0E0DC"}
                rx={3}
                style={{
                  transition: `all 2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s`,
                }}
              />
              <text
                x={x + barW / 2}
                y={visible ? y - 8 : chartH - 8}
                textAnchor="middle"
                fill={isHero ? "var(--orange)" : "var(--text-muted)"}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  fontWeight: isHero ? 500 : 300,
                  opacity: visible ? 1 : 0,
                  transition: `all 1.5s ease ${0.8 + i * 0.15}s`,
                }}
              >
                €{d.value}M
              </text>
              <text
                x={x + barW / 2}
                y={chartH + 20}
                textAnchor="middle"
                fill="var(--text-muted)"
                style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300 }}
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BrandEquityChart() {
  const { ref, visible } = useScrollVisible(0.15);
  const maxVal = 60;

  return (
    <div ref={ref} className="moty-chart-wrap">
      <div className="moty-chart-heading">
        Brand equity jumped on every measure
      </div>
      <div className="moty-legend">
        <span className="moty-legend-item">
          <span
            className="moty-legend-swatch"
            style={{ background: "#E0E0DC" }}
          />
          Apr 2020
        </span>
        <span className="moty-legend-item">
          <span
            className="moty-legend-swatch"
            style={{ background: "var(--orange)" }}
          />
          Sep 2021
        </span>
      </div>
      <div className="moty-equity-chart">
        {brandEquityData.map((d, i) => (
          <div key={d.label} className="moty-equity-row">
            <div className="moty-equity-label">{d.label}</div>
            <div className="moty-equity-bars">
              <div className="moty-equity-bar-wrap">
                <div
                  className="moty-equity-bar"
                  style={{
                    width: visible ? `${(d.before / maxVal) * 100}%` : "0%",
                    background: "#E0E0DC",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                />
                <span
                  className="moty-equity-val"
                  style={{
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${0.8 + i * 0.08}s`,
                  }}
                >
                  {d.before}%
                </span>
              </div>
              <div className="moty-equity-bar-wrap">
                <div
                  className="moty-equity-bar"
                  style={{
                    width: visible ? `${(d.after / maxVal) * 100}%` : "0%",
                    background: "var(--orange)",
                    transitionDelay: `${0.3 + i * 0.08}s`,
                  }}
                />
                <span
                  className="moty-equity-val"
                  style={{
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${1 + i * 0.08}s`,
                  }}
                >
                  {d.after}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistinctiveAssetsChart() {
  const { ref, visible } = useScrollVisible(0.3);
  const maxVal = 100;
  const barW = 52;
  const gap = 22;
  const total = assetsData.length * barW + (assetsData.length - 1) * gap;
  const startX = (500 - total) / 2;
  const chartH = 250;

  return (
    <div ref={ref} className="moty-chart-wrap">
      <div className="moty-chart-heading">
        Distinctive brand assets (spontaneous linkage %)
      </div>
      <svg viewBox="0 0 500 310" className="moty-chart-svg">
        {assetsData.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const x = startX + i * (barW + gap);
          const y = chartH - barH;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={visible ? y : chartH}
                width={barW}
                height={visible ? barH : 0}
                fill="var(--orange)"
                rx={3}
                style={{
                  transition: `all 2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`,
                }}
              />
              <text
                x={x + barW / 2}
                y={visible ? y - 8 : chartH - 8}
                textAnchor="middle"
                fill="var(--text)"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  fontWeight: 300,
                  opacity: visible ? 1 : 0,
                  transition: `all 1.5s ease ${0.8 + i * 0.12}s`,
                }}
              >
                {d.value}%
              </text>
              <text
                x={x + barW / 2}
                y={chartH + 18}
                textAnchor="middle"
                fill="var(--text-muted)"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  fontWeight: 300,
                }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── page ── */

export default function MarketerOfYearPage() {
  return (
    <>
      {/* TOP BAR */}
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/#chapters">chapters.md</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="proj-hero">
        <div className="container">
          <div className="proj-body proj-hero-center">
            <div className="section-label">
              // project \marketer_of_the_year
            </div>
            <h1 className="proj-title">
              <span className="accent">Marketing Effectiveness</span> in action
            </h1>
            <p className="proj-subtitle">
              Ireland&apos;s Marketer of the Year &middot; 2022
            </p>
            <p className="proj-lede">
              In January 2020, the National Lottery brand was in decline. Three
              years later, revenue hit €1 billion for the first time, and brand
              equity had jumped on every single measure.
            </p>
            <div className="proj-hero-meta">
              <div>
                <span className="proj-meta-accent">\</span> The National Lottery
              </div>
              <div>
                <span className="proj-meta-accent">\</span> 2020&ndash;2022
              </div>
            </div>
            <div className="proj-hero-image-stacked">
              <Image
                src="/projects/marketer-of-the-year/cover.jpg"
                alt="Marketing.ie magazine cover — Paul Dervan voted Marketer of the Year"
                width={600}
                height={800}
                priority
                className="proj-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE CHALLENGE */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_challenge</div>
            <h2 className="proj-section-title">A brand in decline</h2>
            <div className="proj-prose">
              <p>
                The previous few years had been difficult for the business.
                People weren&apos;t excited about playing the lottery. They felt
                less connected to the brand. And they were simply forgetting to
                play. Internally, the marketing team had been running each
                product brand separately, competing against themselves with
                different colours, taglines and personalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE STRATEGY */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_strategy</div>
            <h2 className="proj-section-title">
              Three pillars, everything else followed
            </h2>
            <div className="proj-prose">
              <p>
                The strategy was straightforward. Get noticed more: increase
                brand salience, fame and mental availability. Be liked more:
                build a stronger emotional connection with the brand. Be easier
                to buy: simplify the journey online and in retail. Every decision
                for the next three years traced back to one of these three.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* WHAT WE DID */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// what_we_did</div>
            <h2 className="proj-section-title">Evidence-based decisions</h2>
            <div className="proj-prose">
              <p>
                We focused the entire company on one masterbrand instead of
                competing sub-brands. We brought back &ldquo;It Could Be
                You&rdquo;, a tagline dropped in 2013, because our research
                showed it was our second strongest distinctive brand asset. We
                kicked off econometric modelling in week one to understand
                exactly how profitable our advertising was. For every €1
                invested, we were delivering €2.68 back. We used System1 to
                benchmark our creative against the best advertisers in the
                world, and our advertising beat nearly every UK brand. We
                measured and grew mental availability through Category Entry
                Points. And we reinvested in Good Causes communications, which
                our research showed played a critical role in keeping people
                open to playing again.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE RESULTS */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_results</div>
            <h2 className="proj-section-title">The results</h2>
            <div className="proj-prose">
              <p>
                Revenue hit €1 billion for the first time in company history, a
                19% increase on 2019. Frequent players grew 9% year on year.
                And brand equity jumped on every single measure we tracked.
              </p>
            </div>
          </div>
          <RevenueChart />
          <BrandEquityChart />
          <DistinctiveAssetsChart />
          <div className="proj-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="proj-stat">
                <div className="proj-stat-value">{s.value}</div>
                <div className="proj-stat-label">{s.label}</div>
                <div className="proj-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <Link href="/" className="active">
          &larr; back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </>
  );
}
