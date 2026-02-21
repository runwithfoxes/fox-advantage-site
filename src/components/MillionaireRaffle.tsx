"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "27:1", label: "Short term ROI", sub: "Up from 18.6:1 in 2019" },
  { value: "15%", label: "Digital sales", sub: "Up from 9% in 2019" },
  { value: "500k", label: "Tickets sold out", sub: "By 24th December" },
];

/* ── chart data (€ thousands, approximated from internal results) ── */
const salesData: Record<string, number[]> = {
  "2016": [10, 15, 40, 60, 100, 130, 150, 140, 160, 170, 190, 210, 270, 350, 160, 430, 520, 580, 720, 850, 980, 1080, 50, 80, 110, 230, 370, 640, 880, 960],
  "2017": [8, 12, 30, 50, 80, 100, 120, 130, 145, 160, 175, 200, 240, 210, 150, 370, 500, 440, 650, 740, 870, 940, 40, 65, 95, 190, 310, 550, 740, 840],
  "2018": [12, 18, 45, 70, 120, 150, 165, 155, 175, 185, 210, 230, 310, 400, 190, 470, 560, 620, 780, 910, 1020, 1130, 60, 95, 130, 260, 420, 700, 960, 1000],
  "2019": [15, 22, 55, 85, 140, 180, 200, 185, 210, 220, 240, 260, 290, 320, 210, 520, 680, 720, 720, 680, 1350, 1520, 65, 110, 360, 400, 470, 720, 1150, 1420],
  "2020": [20, 35, 65, 110, 180, 240, 270, 250, 280, 310, 330, 340, 380, 480, 320, 640, 780, 850, 950, 1060, 1380, 2500, 75, 130, 320, 370, 420, 670, 920, 970],
};

const lineStyles: { color: string; width: number; opacity: number }[] = [
  { color: "#D0D0CC", width: 1.2, opacity: 0.55 },
  { color: "#D0D0CC", width: 1.2, opacity: 0.55 },
  { color: "#C8C8C4", width: 1.2, opacity: 0.65 },
  { color: "#8A8A85", width: 1.5, opacity: 0.75 },
  { color: "#F47521", width: 3, opacity: 1 },
];

function SalesChart() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 880, H = 360;
  const pad = { top: 20, right: 20, bottom: 44, left: 52 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const maxY = 2800;

  const x = (day: number) => pad.left + ((day - 1) / 29) * plotW;
  const y = (val: number) => pad.top + plotH * (1 - val / maxY);

  const toPath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i + 1).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  const yTicks = [0, 500, 1000, 1500, 2000, 2500];
  const xTicks = [1, 5, 10, 15, 20, 25, 30];

  const fmtY = (v: number) => {
    if (v === 0) return "€0";
    if (v < 1000) return `€${v}k`;
    if (v % 1000 === 0) return `€${v / 1000}m`;
    return `€${(v / 1000).toFixed(1)}m`;
  };

  const years = ["2016", "2017", "2018", "2019", "2020"];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={`proj-chart${visible ? " proj-chart-visible" : ""}`}
      role="img"
      aria-label="Daily ticket sales by year, showing 2020 dramatically outperforming all previous years"
    >
      {/* grid */}
      {yTicks.map((t) => (
        <line
          key={t}
          x1={pad.left} y1={y(t)} x2={W - pad.right} y2={y(t)}
          stroke="#E0E0DC"
          strokeWidth={t === 0 ? 1 : 0.5}
          strokeDasharray={t === 0 ? "none" : "3 3"}
        />
      ))}

      {/* y labels */}
      {yTicks.map((t) => (
        <text key={`yl${t}`} x={pad.left - 10} y={y(t) + 3.5} textAnchor="end" className="proj-chart-axis">
          {fmtY(t)}
        </text>
      ))}

      {/* x labels */}
      {xTicks.map((d) => (
        <text key={`xl${d}`} x={x(d)} y={H - pad.bottom + 20} textAnchor="middle" className="proj-chart-axis">
          {d}
        </text>
      ))}

      {/* lines */}
      {years.map((yr, i) => {
        const s = lineStyles[i];
        return (
          <path
            key={yr}
            d={toPath(salesData[yr])}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width}
            opacity={s.opacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className={`proj-chart-line proj-chart-line-${i}`}
          />
        );
      })}

      {/* 2020 peak marker */}
      <circle cx={x(22)} cy={y(2500)} r={3.5} fill="#F47521" className="proj-chart-dot" />
      <text x={x(22) + 12} y={y(2500) + 4} className="proj-chart-peak">€2.5m</text>

      {/* legend */}
      <g transform={`translate(${pad.left}, ${H - 8})`}>
        <line x1={0} y1={-4} x2={18} y2={-4} stroke="#C8C8C4" strokeWidth={1.2} />
        <text x={24} y={0} className="proj-chart-axis">2016–18</text>

        <line x1={84} y1={-4} x2={102} y2={-4} stroke="#8A8A85" strokeWidth={1.5} />
        <text x={108} y={0} className="proj-chart-axis">2019</text>

        <line x1={150} y1={-4} x2={168} y2={-4} stroke="#F47521" strokeWidth={2.5} />
        <text x={174} y={0} className="proj-chart-axis proj-chart-accent">2020</text>
      </g>
    </svg>
  );
}


export default function MillionaireRafflePage() {
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
            <div className="section-label">/project \national_lottery</div>
            <h1 className="proj-title">
              Mental <span className="accent">Availability</span> in action
            </h1>
            <p className="proj-subtitle">
              Millionaire Raffle Campaign
            </p>
            <p className="proj-lede">
              How a small change led to 27:1 ROI and sold so many tickets, we
              had to pull the campaign.
            </p>
            <div className="proj-hero-meta">
              <div><span className="proj-meta-accent">\</span> National Lottery Ireland</div>
              <div><span className="proj-meta-accent">\</span> 2019&ndash;2021</div>
            </div>
            <div className="proj-hero-image-stacked">
              <Image
                src="/projects/millionaire-raffle/raffle-tv.jpeg"
                alt="Millionaire Raffle TV campaign - gifting scene"
                width={720}
                height={405}
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

      {/* THE STORY */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/the_problem</div>
            <h2 className="proj-section-title">Using Mental Availability to find growth</h2>
            <div className="proj-prose">
              <p>
                When I was in The National Lottery in Ireland, we had huge market
                penetration and very high buying frequency. Like many FMCG brands,
                we had a mix of heavy and light buyers.
              </p>
              <p>
                But there were growth opportunities. There were buying situations
                where we could win more. Gifting was one. Our research showed that
                we turn up for a certain type of gift. Specifically, when people
                have already decided to get a card, they think: &ldquo;What would
                be a nice gift to put into the card?&rdquo;
              </p>
              <p>
                That&apos;s a Category Entry Point. A CEP.
              </p>
            </div>
            <div className="proj-callout">
              <div className="proj-callout-number">52%</div>
              <div className="proj-callout-label">
                of adults thought of a lottery product as a gift in a card
              </div>
              <div className="proj-callout-note">
                That&apos;s a decent number, but we&apos;re a big brand and half
                our audience didn&apos;t think of us.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* CEPs */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/category_entry_points</div>
            <h2 className="proj-section-title">What are Category Entry Points?</h2>
            <div className="proj-prose">
              <p>
                Category Entry Points are the specific cues that trigger people to
                think about your category, and hopefully your brand. Not the broad
                category. They are more precise. More directional. Which is why I
                like them.
              </p>
              <p>
                We worked with RedC, a top research agency, to identify our CEPs
                and focus our marketing efforts to grow them.
              </p>
            </div>
            <div className="proj-cep-image">
              <Image
                src="/projects/millionaire-raffle/ceps.webp"
                alt="Category Entry Points: Why, When, Where, Who, What, How"
                width={1000}
                height={170}
                className="proj-cep-img"
              />
            </div>
            <blockquote className="proj-pullquote">
              <p>
                &ldquo;Gift to put in a card&rdquo; was a useful CEP.
                Specific enough to win. But broad enough to generate decent sales.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE CHANGE */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/the_campaign</div>
            <h2 className="proj-section-title">So we made a new campaign</h2>
            <div className="proj-prose">
              <p>
                The previous ads were good. Funny, typical Lottery, everyday charm,
                good acting. But they weren&apos;t about gifting. They were
                awareness plays. Good, but not linked to the gifting CEP we&apos;d
                uncovered in our research.
              </p>
            </div>
          </div>
          <div className="proj-video-stack">
            <div className="proj-video-wrapper">
              <div className="proj-video-label">Before: awareness play</div>
              <div className="proj-video-embed">
                <iframe
                  src="https://www.youtube.com/embed/bd82TKGPMfk"
                  title="Millionaire Raffle - previous campaign"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="proj-body">
            <div className="proj-prose" style={{ marginTop: 32 }}>
              <p>
                In the new campaign, every frame links the brand to the gifting
                occasion. Full credit to the wonderful Damien O&apos;Donnell,
                the most talented film director I know. He even manages to get
                &ldquo;tickets are limited&rdquo; into the script without it
                feeling forced.
              </p>
            </div>
          </div>
          <div className="proj-video-stack">
            <div className="proj-video-wrapper">
              <div className="proj-video-label">After: linked to gifting CEP</div>
              <div className="proj-video-embed">
                <iframe
                  src="https://www.youtube.com/embed/r7xd7Z8NWvk"
                  title="Millionaire Raffle - new gifting campaign"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* RESULTS */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/the_results</div>
            <h2 className="proj-section-title">The results</h2>
            <div className="proj-prose">
              <p>
                The results were both immediate and long lasting. For the first
                year in many, we sold out all tickets. So much so, we had to pull
                the advertising.
              </p>
            </div>
          </div>
          <div className="proj-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="proj-stat">
                <div className="proj-stat-value">{s.value}</div>
                <div className="proj-stat-label">{s.label}</div>
                <div className="proj-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="proj-body">
            <div className="proj-results-chart">
              <SalesChart />
              <div className="proj-image-caption">Daily ticket sales by year, December.</div>
            </div>
            <div className="proj-prose" style={{ marginTop: 40 }}>
              <p>
                It wasn&apos;t a fluke. It continued to sell out every year. The
                campaign also won a bunch of effectiveness awards. When I left,
                my only parting advice was not to change this campaign until
                there&apos;s evidence it is no longer working.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <Link href="/" className="active">
          ← back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </>
  );
}
