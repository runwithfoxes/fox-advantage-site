"use client";

// Standalone branded page: runwithfoxes.com/june10
// "Writing research briefs for Claude" - workshop handout from the Alltech session.
// Built to the /branded-page brand spec (cream, JetBrains Mono body, Space Grotesk headings,
// sky-blue accents, deep-sky prompt blocks, sharp corners, no em dashes).
// The three prompts are reproduced verbatim and are copy-to-clipboard so the room can paste them.

import { useEffect, useState } from "react";

const WEAK_PROMPT = `Research methane-reducing feed additives for dairy cows.`;

const EXPERT_PROMPT = `ROLE.
Act as a senior market and regulatory analyst covering ruminant animal nutrition, briefing a commercial strategy team at a global animal-health and nutrition company. You are numerate, sceptical of vendor claims, and you separate peer-reviewed evidence from marketing.

THE DECISION THIS FEEDS.
We are deciding where to place R&D and commercial effort in enteric methane reduction for dairy cattle over the next three to five years. I need a clear-eyed map of the landscape, not a cheerleading piece. Assume the reader knows the basics of rumen biology.

CORE QUESTION.
What is the realistic commercial, scientific and regulatory outlook for methane-reducing feed additives in dairy cattle across the EU, UK, US and Ireland through 2030, and where are the genuine gaps a new entrant could win?

SPECIFICALLY, COVER:
1. The main product classes (3-NOP / Bovaer, red seaweed / Asparagopsis, nitrate-based, essential oils, novel live strains such as Rumin8), with the measured methane reduction range for each and the strength of the evidence behind those numbers.
2. Regulatory status in each market: approved, pending, or blocked, plus any consumer or political backlash (note the Bovaer reaction in the UK and what drove it).
3. Commercial model: how each is sold, who pays (farmer, processor, retailer, carbon-credit buyer), and whether the economics work without a subsidy or premium.
4. Open scientific questions: effect persistence, milk-yield and palatability impacts, grazing vs housed systems (this matters for Ireland's grass-based herds), and measurement methods.
5. White space: unmet needs or under-served systems where current products fail.

SOURCE STANDARDS.
Prioritise peer-reviewed studies, regulator publications (EFSA, FDA, FSAI), and named industry data. Treat company press releases and "up to X%" marketing figures as claims to be checked, not facts. When a number comes from a vendor, say so.

OUTPUT FORMAT.
Open with a 150-word executive summary giving me your actual read. Then a comparison table of the product classes (efficacy range, evidence strength, regulatory status, cost model). Then a section per question above. End with a short "what I'd watch" list of the three developments most likely to reshape this market by 2030.

HONESTY.
Where the evidence is thin or conflicting, say so and show both sides rather than averaging them. Flag your confidence on each major claim. If a widely repeated figure traces back to a single unreplicated study, call that out. Note anything you could not verify.`;

const FOLLOWUP_PROMPT = `Now turn that research into a visual briefing document.

Build the charts only from figures that appear in your research above. Do not invent, estimate, or round-fill any data point. If a chart would need numbers you don't have, say so and leave it out rather than guessing.

For every chart, do three things: match the chart type to what the data actually is, label the axes and units, and put the source under each one.

SPECIFICALLY, I'D LIKE:
1. A comparison chart of methane-reduction efficacy by product class (show the range, not a single number, where studies disagree).
2. A status table styled as a visual showing regulatory position by market (approved / pending / blocked).
3. A simple 2x2 or scatter plotting efficacy against strength-of-evidence, so the strong-but-unproven vs proven-but-modest tradeoff is visible at a glance.
4. Anywhere the data is too thin to chart, a one-line note saying what is missing.

FORMAT.
Build it as a single clean document I can read top to bottom: short intro, the executive summary, then each section with its chart placed inline. Keep the styling minimal and professional. Flag your confidence under any chart built on a single study.`;

function PromptBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, no-op */
    }
  };
  return (
    <div className="j10-prompt">
      <div className="j10-prompt-bar">
        <span className="j10-prompt-label">{label}</span>
        <button className="j10-copy" onClick={copy} aria-label="Copy prompt">
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="j10-prompt-body">{text}</pre>
    </div>
  );
}

export default function June10Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="j10">
      <style>{CSS}</style>

      <nav className={`j10-nav${scrolled ? " j10-nav-scrolled" : ""}`}>
        <a className="j10-brand" href="/">
          /<span>Run</span>withfoxes
        </a>
        <a className="j10-back" href="/">
          back to site
        </a>
      </nav>

      {/* Hero */}
      <header className="j10-hero">
        <div className="j10-dots" aria-hidden />
        <div className="j10-wrap">
          <p className="j10-kicker">Alltech workshop</p>
          <h1 className="j10-title">
            Writing research briefs for <span>Claude</span>
          </h1>
          <p className="j10-sub">Three prompts, one example</p>
          <p className="j10-meta">
            the bad prompt <i>·</i> the good prompt <i>·</i> the follow-up
          </p>
        </div>
      </header>

      {/* Intro */}
      <section className="j10-section">
        <div className="j10-wrap j10-prose">
          <p>
            The quality of a research report is set by the quality of the brief. Ethan Mollick
            (Wharton, the author of <em>One Useful Thing</em>) puts it simply: stop hunting for magic
            words, and instead add context, give examples, and assign a role, an audience and an
            output format. Brief the model like a sharp junior analyst, not a search box.
          </p>
          <p>
            Below is the same request at three levels, using one running example: methane-reducing
            feed additives for dairy cattle. Read the three blocks in order. The jump from the first
            to the second is the whole skill.
          </p>
        </div>
      </section>

      {/* 1. Weak prompt */}
      <section className="j10-section">
        <div className="j10-wrap">
          <div className="j10-step">
            <span className="j10-num">1</span>
            <h2 className="j10-h2">The weak prompt</h2>
          </div>
          <p className="j10-lead">
            What most people type. It returns a competent encyclopedia entry, but nothing anyone can
            act on.
          </p>
          <PromptBlock label="the weak prompt" text={WEAK_PROMPT} />
        </div>
      </section>

      {/* 2. Expert prompt */}
      <section className="j10-section">
        <div className="j10-wrap">
          <div className="j10-step">
            <span className="j10-num">2</span>
            <h2 className="j10-h2">The expert prompt</h2>
          </div>
          <p className="j10-lead">
            A commission, not a question. It sets the role, the real decision, the scope, the source
            standards, the output shape, and an honesty instruction. Ninety seconds longer to write,
            and a strategy director can act on the result.
          </p>
          <PromptBlock label="the expert prompt" text={EXPERT_PROMPT} />
        </div>
      </section>

      {/* 3. Follow-up prompt */}
      <section className="j10-section">
        <div className="j10-wrap">
          <div className="j10-step">
            <span className="j10-num">3</span>
            <h2 className="j10-h2">The follow-up prompt</h2>
          </div>
          <p className="j10-lead">
            Turn the report into a visual document. Run this once the report comes back. The key move
            is constraining the charts to data already gathered, so the model cannot quietly invent
            numbers to fill a pretty graph.
          </p>
          <PromptBlock label="the follow-up prompt" text={FOLLOWUP_PROMPT} />
        </div>
      </section>

      {/* Why it works */}
      <section className="j10-section j10-why">
        <div className="j10-wrap">
          <h2 className="j10-h2 j10-why-title">Why the follow-up works</h2>
          <p className="j10-lead">Say this part out loud.</p>
          <div className="j10-cards">
            <div className="j10-card">
              <p className="j10-card-lead">Only from data already gathered.</p>
              <p>
                The guardrail. AI will happily draw a beautiful, fictional chart. You forbid it, and
                give it permission to leave gaps.
              </p>
            </div>
            <div className="j10-card">
              <p className="j10-card-lead">Match the chart to the data.</p>
              <p>
                Ranges want bars with error bands. Two competing variables want a scatter. A status
                list wants a styled table, not a pie chart.
              </p>
            </div>
            <div className="j10-card">
              <p className="j10-card-lead">Source under every chart.</p>
              <p>
                If it cannot cite the number, it should not draw it. That one rule kills most
                fabricated visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="j10-footer">
        <a className="j10-brand" href="/">
          /<span>Run</span>withfoxes
        </a>
        <span className="j10-foot-note">© 2026 Run with Foxes Limited</span>
      </footer>
    </main>
  );
}

const CSS = `
.j10 {
  --bg: #FAFAF8;
  --text: #1D1B1B;
  --muted: #8A8A85;
  --sky: #3A7CA5;
  --deep: #1A3A4E;
  --border: #E0E0DC;
  --cream: #F7EAD9;
  --orange: #F47521;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-mono), monospace;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
.j10 *, .j10 *::before, .j10 *::after { box-sizing: border-box; }

.j10-wrap { max-width: 860px; margin: 0 auto; padding: 0 48px; }

/* Nav */
.j10-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 48px;
  background: transparent;
  transition: background 0.3s ease-out, backdrop-filter 0.3s ease-out;
}
.j10-nav-scrolled {
  background: rgba(250,250,248,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.j10-brand {
  font-family: var(--font-mono), monospace;
  font-size: 13px; font-weight: 300; letter-spacing: 2px;
  color: var(--muted); text-decoration: none;
}
.j10-brand span { color: var(--orange); }
.j10-back {
  font-family: var(--font-mono), monospace;
  font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
  color: var(--muted); text-decoration: none; transition: color 0.3s ease-out;
}
.j10-back:hover { color: var(--sky); }

/* Hero */
.j10-hero { position: relative; padding: 170px 0 90px; overflow: hidden; }
.j10-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, #d0d0cc 0.8px, transparent 0.8px);
  background-size: 28px 28px; opacity: 0.4; pointer-events: none;
}
.j10-hero .j10-wrap { position: relative; }
.j10-kicker {
  font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
  color: var(--sky); margin: 0 0 22px;
}
.j10-title {
  font-family: var(--font-sans), sans-serif; font-weight: 300;
  font-size: clamp(40px, 7vw, 78px); line-height: 1.04; letter-spacing: -2px;
  margin: 0 0 20px; color: var(--text);
}
.j10-title span { color: var(--sky); }
.j10-sub {
  font-family: var(--font-sans), sans-serif; font-weight: 300;
  font-size: clamp(20px, 3vw, 28px); letter-spacing: -0.5px;
  color: var(--text); margin: 0 0 26px;
}
.j10-meta {
  font-size: 12px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--muted); margin: 0;
}
.j10-meta i { color: var(--sky); font-style: normal; padding: 0 6px; }

/* Sections */
.j10-section { padding: 56px 0; }
.j10-prose p {
  font-size: 1.0625rem; line-height: 1.75; color: var(--text);
  margin: 0 0 20px; font-weight: 300;
}
.j10-prose p:last-child { margin-bottom: 0; }
.j10-prose em { font-style: italic; color: var(--text); }

.j10-step { display: flex; align-items: baseline; gap: 18px; margin: 0 0 16px; }
.j10-num {
  font-family: var(--font-sans), sans-serif; font-weight: 300;
  font-size: clamp(40px, 6vw, 60px); line-height: 1; color: var(--sky);
  letter-spacing: -2px;
}
.j10-h2 {
  font-family: var(--font-sans), sans-serif; font-weight: 300;
  font-size: clamp(26px, 4vw, 40px); letter-spacing: -1px; line-height: 1.1;
  color: var(--text); margin: 0;
}
.j10-lead {
  font-size: 1rem; line-height: 1.7; color: var(--text);
  max-width: 680px; margin: 0 0 26px; font-weight: 300;
}

/* Prompt block */
.j10-prompt { border: 1px solid var(--deep); background: var(--deep); }
.j10-prompt-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px; background: #15303f; border-bottom: 1px solid rgba(247,234,217,0.12);
}
.j10-prompt-label {
  font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
  color: rgba(247,234,217,0.65);
}
.j10-copy {
  font-family: var(--font-mono), monospace;
  font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
  color: var(--cream); background: transparent;
  border: 1px solid rgba(247,234,217,0.35);
  padding: 6px 14px; cursor: pointer; transition: all 0.3s ease-out;
}
.j10-copy:hover { border-color: var(--cream); color: #fff; }
.j10-prompt-body {
  margin: 0; padding: 24px 22px; color: rgba(247,234,217,0.82);
  font-family: var(--font-mono), monospace; font-size: 13.5px; font-weight: 300;
  line-height: 1.7; white-space: pre-wrap; word-break: break-word;
  overflow-x: auto;
}

/* Why it works */
.j10-why { padding-top: 40px; }
.j10-why-title { margin-bottom: 14px; }
.j10-cards { display: grid; gap: 0; margin-top: 14px; border-top: 1px solid var(--border); }
.j10-card {
  padding: 26px 0; border-bottom: 1px solid var(--border);
}
.j10-card-lead {
  font-weight: 500; color: var(--sky); margin: 0 0 8px;
  font-size: 1.0625rem; letter-spacing: -0.2px;
}
.j10-card p:last-child {
  margin: 0; font-size: 0.95rem; line-height: 1.7; color: var(--text); font-weight: 300;
}

/* Footer */
.j10-footer {
  display: flex; align-items: center; justify-content: space-between;
  max-width: 860px; margin: 60px auto 0; padding: 28px 48px 44px;
  border-top: 1px solid var(--border);
}
.j10-foot-note { font-size: 11px; letter-spacing: 1px; color: var(--muted); }

/* Mobile */
@media (max-width: 768px) {
  .j10-wrap { padding: 0 24px; }
  .j10-nav { padding: 16px 24px; }
  .j10-hero { padding: 130px 0 60px; }
  .j10-section { padding: 44px 0; }
  .j10-step { gap: 12px; }
  .j10-prompt-body { font-size: 12.5px; padding: 20px 16px; }
  .j10-footer { padding: 24px 24px 40px; flex-direction: column; gap: 14px; align-items: flex-start; }
}
@media (max-width: 380px) {
  .j10-wrap { padding: 0 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .j10 *, .j10 *::before, .j10 *::after { transition: none !important; animation: none !important; }
}
`;
