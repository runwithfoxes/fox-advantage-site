"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GateProvider, useGate } from "./EmailGate";
import EmailGateForm from "./EmailGate";
import type { Chapter } from "@/lib/chapters";

function AnimatedNumber({ value, duration = 1200, delay = 0, className = "stat-number", onScroll = true }: { value: number; duration?: number; delay?: number; className?: string; onScroll?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!onScroll) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, onScroll, delay]);

  useEffect(() => {
    if (!started || value === 0) { if (started) setDisplay(0); return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 5); // ease-out quintic — really slows into final number
      setDisplay(Math.round(ease * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
}

interface Props {
  parts: { part: number; partName: string; chapters: Chapter[] }[];
}

function ChapterItem({ chapter }: { chapter: Chapter }) {
  const num = String(chapter.number).padStart(2, "0");
  const gated = chapter.part >= 3;

  return (
    <Link
      href={`/chapter/${chapter.slug}`}
      className={`chapter-item no-underline${gated ? " chapter-item-gated" : ""}`}
    >
      <span className="chapter-num">{num}</span>
      <span className="chapter-title">{chapter.title}</span>
      {gated ? (
        <span className="chapter-tag-soon">coming soon</span>
      ) : (
        <span className="chapter-arrow">→</span>
      )}
    </Link>
  );
}

function ChapterGroup({ part, index, label }: { part: { part: number; partName: string; chapters: Chapter[] }; index: number; label: string }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="chapter-group">
      <div
        className="chapter-group-label"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(!open); }}
        aria-expanded={open}
      >
        <span>\part_{String(part.part).padStart(2, "0")} — {label}</span>
        <span className="chapter-group-indicator">{open ? "−" : "+"}</span>
      </div>
      {open && part.chapters.map((ch) => (
        <div key={ch.slug}>
          {ch.section && (
            <div className="chapter-section-label">{ch.section}</div>
          )}
          <ChapterItem chapter={ch} />
        </div>
      ))}
    </div>
  );
}

function DownloadSection() {
  const { isUnlocked } = useGate();

  return (
    <section id="signup" className="gate-section">
      <div className="container">
        <div className="section-label">/ get_the_book</div>
        {isUnlocked ? (
          <>
            <h2 className="section-title">You&apos;re on the list.</h2>
            <p className="gate-text">We&apos;ll send you the full book when it&apos;s ready.</p>
          </>
        ) : (
          <>
            <h2 className="section-title">Get the full book<br />when it drops.</h2>
            <p className="gate-text">Parts 1 and 2 are live now. Drop your email and we&apos;ll send the rest when it&apos;s ready.</p>
            <EmailGateForm variant="dark" />
            <p className="gate-note">No spam. Just the book when it&apos;s ready.</p>
          </>
        )}
      </div>
    </section>
  );
}

function LandingContent({ parts }: Props) {
  const partLabels = ["what just collapsed", "better together", "behaviours", "marketing for leaders"];
  const partDescs = [
    "The marketing department autopsy. What broke, what's gone, and why average is now invisible.",
    "Humans and AI. Where the friction is the point and why robots don't have skin in the game.",
    "The reps. The poking. The building. The five behaviour shifts that separate foxes from hedgehogs.",
    "Redesign your teams. Hire for curiosity. Stay in the work. A playbook for the people running the show.",
  ];

  return (
    <>
      {/* TOP BAR */}
      <header className="top-bar">
        <a href="#" className="logo">/<span>Run</span>withfoxes</a>
        <nav>
          <a href="#about" className="active">#about</a>
          <a href="#chapters">chapters.md</a>
          <a href="#projects">/projects</a>
          <a href="#author">author.txt</a>
          <a href="#signup" className="cta-bar">/get_the_book</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-label">// a book by paul dervan</div>
            <h1>The <span className="accent">Fox</span> Advantage</h1>
            <p className="hero-sub">How to thrive in marketing because of AI, not despite it. 54 short chapters. No jargon. No fluff.</p>
            <div className="hero-meta">
              <div><span>\</span> <AnimatedNumber value={54} duration={3000} delay={800} className="" onScroll={false} /> chapters</div>
              <div><span>\</span> <AnimatedNumber value={4} duration={1600} delay={1000} className="" onScroll={false} /> parts</div>
              <div><span>\</span> free to read</div>
              <a href="#signup" className="hero-meta-link"><span>\</span> get_the_book</a>
            </div>
          </div>
          <div className="hero-book">
            <Image src="/fox/fox-book.png" alt="Grumpy fox holding The Fox Advantage" width={340} height={480} priority className="hero-fox-img" />
          </div>
        </div>
      </section>

      <div className="container"><hr className="divider" /></div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="section-label">// what_collapsed</div>
          <h2 className="section-title">Fox thinking,<br />not hedgehog thinking</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>The marketing department as we knew it is gone. The stack collapsed. The specialists are being replaced by generalists with tools. And the people who will win aren&apos;t the ones who know one thing deeply.</p>
              <p>They&apos;re the foxes. Adaptive. Curious. Switching between tools and tactics. Building things themselves instead of briefing someone else to do it.</p>
              <p>This book is a practical guide to becoming that person, or building a team of them.</p>
            </div>
            <div className="about-aside">
              <div className="stat-block">
                <AnimatedNumber value={54} duration={3000} />
                <div className="stat-label">short chapters</div>
              </div>
              <div className="stat-block">
                <AnimatedNumber value={4} duration={1600} />
                <div className="stat-label">parts</div>
              </div>
              <div className="stat-block">
                <AnimatedNumber value={0} duration={600} />
                <div className="stat-label">jargon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><hr className="divider" /></div>

      {/* PARTS */}
      <section id="parts">
        <div className="container">
          <div className="section-label">// structure</div>
          <h2 className="section-title">Four parts</h2>
          <div className="parts-grid">
            {parts.map((p, i) => (
              <div key={p.part} className="part-card">
                <div className="part-number">\{String(p.part).padStart(2, "0")}</div>
                <div className="part-name">{p.partName}</div>
                <div className="part-desc">{partDescs[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><hr className="divider" /></div>

      {/* CHAPTERS */}
      <section id="chapters">
        <div className="container">
          <div className="section-label">// chapters.md</div>
          <h2 className="section-title">Table of contents</h2>
          <div className="chapters-list">
            {parts.map((p, i) => (
              <ChapterGroup key={p.part} part={p} index={i} label={partLabels[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* GATE / SIGNUP */}
      <DownloadSection />

      {/* AUTHOR */}
      <section id="author">
        <div className="container">
          <div className="section-label">// author.txt</div>
          <h2 className="section-title">About the author</h2>
          <div className="author-grid">
            <div>
              <Image src="/Paul_photo.jpg" alt="Paul Dervan" width={280} height={373} className="author-photo" />
            </div>
            <div className="author-info">
              <div className="author-name">Paul Dervan</div>
              <div className="author-bio">
                <p>Marketing leader. Currently figuring out what happens when AI collapses the marketing stack, one experiment at a time.</p>
                <p>This book started as notes to myself. Then it became a Substack. Now it&apos;s this.</p>
              </div>
              <div className="author-links">
                <a href="https://runwithfoxes.substack.com" target="_blank" rel="noopener noreferrer">\substack</a>
                <a href="https://www.linkedin.com/in/pauldervan/" target="_blank" rel="noopener noreferrer">\linkedin</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><hr className="divider" /></div>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <div className="section-label">// projects</div>
          <h2 className="section-title">Things I&apos;ve built</h2>
          <div className="projects-grid">
            <Link href="/millionaire-raffle" className="project-card project-card-link no-underline">
              <div className="project-tag">\mental_availability</div>
              <div className="project-name">Mental Availability in action</div>
              <div className="project-sub">Millionaire Raffle Campaign</div>
              <div className="project-desc">How a small change led to 27:1 ROI and sold so many tickets, we had to pull the campaign.</div>
              <div className="project-more">read more →</div>
            </Link>
            <div className="project-card">
              <div className="project-tag">\distinctive_assets</div>
              <div className="project-name">National Lottery</div>
              <div className="project-desc">Rebuilding Distinctive Brand Assets. Dream Inspector, new identity, and Marketer of the Year.</div>
            </div>
            <Link href="/48" className="project-card project-card-link no-underline">
              <div className="project-tag">\fame_strategy</div>
              <div className="project-name">Fame Strategy in action</div>
              <div className="project-sub">48 · Youth brand creation</div>
              <div className="project-desc">Built a mobile brand inside Telefonica that used exclusion as a brand asset. 12% youth market share in year one.</div>
              <div className="project-more">read more →</div>
            </Link>
            <div className="project-card">
              <div className="project-tag">\brand</div>
              <div className="project-name">Indeed</div>
              <div className="project-desc">Led global brand for the world&apos;s biggest job site. $400M budget across 20+ markets.</div>
            </div>
            <Link href="/run-with-foxes" className="project-card project-card-link no-underline">
              <div className="project-tag">\book</div>
              <div className="project-name">Run with Foxes</div>
              <div className="project-desc">First book, published 2020. Making better decisions in marketing. On Amazon.</div>
              <div className="project-more">read more →</div>
            </Link>
            <div className="project-card">
              <div className="project-tag">\teaching</div>
              <div className="project-name">Smurfit UCD</div>
              <div className="project-desc">Teaching marketing strategy to MBA and MSc students at Ireland&apos;s top business school.</div>
            </div>
            <div className="project-card">
              <div className="project-tag">\ai</div>
              <div className="project-name">AI Writers</div>
              <div className="project-desc">Built a team of AI agents. Max writes copy, Alex schedules content, Klara runs the office.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <a href="#" className="active">#top</a>
        <a href="#chapters">chapters.md</a>
        <a href="#projects">/projects</a>
        <a href="#signup" className="cta-bar">get the book</a>
      </div>
    </>
  );
}

export default function Landing({ parts }: Props) {
  return (
    <GateProvider>
      <LandingContent parts={parts} />
    </GateProvider>
  );
}
