"use client";

import Link from "next/link";

/* ── data ── */

const stats = [
  { value: "4", label: "Verification checks", sub: "Before any copy ships" },
  {
    value: "6",
    label: "Specialized frameworks",
    sub: "Each with its own playbook",
  },
  {
    value: "0",
    label: "Fabricated claims",
    sub: "Every stat traced to source",
  },
];

const steps = [
  {
    num: "01",
    title: "Strategic foundation",
    desc: "Every piece of writing starts with three questions, and the system won\u2019t skip any of them. Who\u2019s the audience, what\u2019s the core message, and where will this thing actually live.",
  },
  {
    num: "02",
    title: "Raw materials",
    desc: "It doesn\u2019t invent. It works from what we give it, whether that\u2019s data, customer quotes, product specs or last quarter\u2019s results. No input, no output.",
  },
  {
    num: "03",
    title: "Gap analysis",
    desc: "Before writing begins, it flags what\u2019s missing. If there\u2019s a case study with no customer quote, or an ad with no proof point, it asks for one rather than making something up.",
  },
  {
    num: "04",
    title: "Verification",
    desc: "Every stat gets checked against the source materials. Every claim traced back. An audit report ships with the final copy, so we know nothing was fabricated.",
  },
];

const contentTypes = [
  {
    name: "Case Studies",
    desc: "Builds from raw inputs and structures the narrative. Every result cited, nothing invented.",
  },
  {
    name: "Advertising",
    desc: "Balances brand building and sales activation, grounded in attention science and creative strategy.",
  },
  {
    name: "Email Marketing",
    desc: "Subject line formulas, psychological triggers, sequence architecture. Every send has a reason behind it.",
  },
  {
    name: "Thought Leadership",
    desc: "Data-led positioning for B2B audiences who can smell fluff a mile away.",
  },
  {
    name: "Compliance Review",
    desc: "Cross-checks copy against regulatory and brand guidelines before anything goes live.",
  },
  {
    name: "Data Verification",
    desc: "Audit report on every piece. Every stat traced to source, zero fabrication.",
  },
];

/* ── page ── */

export default function AiWriterPage() {
  return (
    <div className="ai-writer-page">
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
            <div className="section-label">/project \ai_writer</div>
            <h1 className="proj-title">
              AI that writes like a{" "}
              <span className="accent">professional</span>
            </h1>
            <p className="proj-subtitle">Brand-trained writing system</p>
            <p className="proj-lede">
              I&apos;ve built AI writers that write better than I can. It
              needs knowledge of good writing, brand positioning, messaging
              and some discipline.
            </p>
            <div className="proj-hero-meta">
              <div>
                <span className="proj-meta-accent">\</span> Fox Advantage
              </div>
              <div>
                <span className="proj-meta-accent">\</span> 2024&ndash;present
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE PROCESS */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/the_process</div>
            <h2 className="proj-section-title">Before it writes a word</h2>
            <div className="ai-process-steps">
              {steps.map((s) => (
                <div key={s.num} className="ai-process-step">
                  <div className="ai-step-number">{s.num}</div>
                  <div className="ai-step-title">{s.title}</div>
                  <div className="ai-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* CONTENT TYPES */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/content_types</div>
            <h2 className="proj-section-title">Six specialized frameworks</h2>
          </div>
          <div className="proj-framework-grid" style={{ maxWidth: 720, margin: "40px auto 0" }}>
            {contentTypes.map((ct) => (
              <div key={ct.name} className="proj-framework-item">
                <div className="proj-framework-name">{ct.name}</div>
                <div className="proj-framework-desc">{ct.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE DIFFERENCE */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">/the_difference</div>
            <h2 className="proj-section-title">
              Rigor first, creation second
            </h2>
            <div className="proj-prose">
              <p>
                The gap between AI writing and professional writing isn&apos;t
                creativity. It&apos;s credibility. Every framework in this
                system teaches the model why something works, not just what to
                write. The advertising framework understands attention decay.
                The email framework knows why curiosity gaps outperform benefit
                statements. The case study framework knows that a reader&apos;s
                objection matters more than the client&apos;s achievement.
              </p>
            </div>
            <blockquote className="proj-pullquote">
              <p>
                &ldquo;Professional copywriters don&apos;t start with a blank
                page. They start with a brief, a brand guide, and a stack of
                source material. That&apos;s exactly what this system
                does.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* STATS */}
      <section className="proj-section">
        <div className="container">
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
    </div>
  );
}
