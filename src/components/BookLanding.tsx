"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GateProvider, useGate } from "./EmailGate";
import EmailGateForm from "./EmailGate";
import type { Chapter } from "@/lib/chapters";

interface Props {
  parts: { part: number; partName: string; chapters: Chapter[] }[];
}

function ChapterItem({ chapter }: { chapter: Chapter }) {
  const num = String(chapter.number).padStart(2, "0");
  const gated = !chapter.released && chapter.part >= 3;

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
        <span className="chapter-arrow">&rarr;</span>
      )}
    </Link>
  );
}

const PDF_URL = "/downloads/the-fox-advantage-parts-1-and-2.pdf";

function ChapterGroup({ part, index, label }: { part: { part: number; partName: string; chapters: Chapter[] }; index: number; label: string }) {
  const [open, setOpen] = useState(index === 0);
  const showPdfLink = part.part <= 2;

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
        <span>\part_{String(part.part).padStart(2, "0")} &mdash; {label}</span>
        <span className="chapter-group-right">
          {showPdfLink && part.part === 1 && (
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="chapter-group-pdf"
              onClick={(e) => e.stopPropagation()}
              title="Download Parts 1 &amp; 2 as PDF"
            >
              &darr; pdf
            </a>
          )}
          <span className="chapter-group-count">{part.chapters.length} chapters</span>
          <span className="chapter-group-indicator">{open ? "−" : "+"}</span>
        </span>
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
        <div className="section-label">/get_the_book</div>
        {isUnlocked ? (
          <>
            <h2 className="section-title">You&apos;re on the list.</h2>
            <p className="gate-text">We&apos;ll send you the full book when it&apos;s ready. In the meantime, <a href={PDF_URL} target="_blank" rel="noopener noreferrer">download Parts 1 &amp; 2 as PDF</a>.</p>
          </>
        ) : (
          <>
            <h2 className="section-title">Get the full book<br />when it drops.</h2>
            <p className="gate-text">Parts 1 and 2 are available now &mdash; <a href={PDF_URL} target="_blank" rel="noopener noreferrer">download the PDF here</a>. Drop your email and we&apos;ll send the rest when it&apos;s ready.</p>
            <EmailGateForm variant="dark" />
            <p className="gate-note">Subscribes you to the Substack. Chapters as they drop, full book when it&apos;s done.</p>
          </>
        )}
      </div>
    </section>
  );
}

function BookLandingContent({ parts }: Props) {
  const partLabels = ["what just collapsed", "better together", "behaviours", "marketing for leaders"];
  const partDescs = [
    "The marketing department autopsy. What broke, what’s gone, and why average is now invisible.",
    "Humans and AI. Where the friction is the point and why robots don’t have skin in the game.",
    "The reps. The poking. The building. The five behaviour shifts that separate foxes from hedgehogs.",
    "Redesign your teams. Hire for curiosity. Stay in the work. A playbook for the people running the show.",
  ];

  return (
    <>
      {/* NAV — same as homepage, always in scrolled state */}
      <nav className="hp-nav hp-nav-scrolled" style={{ position: "fixed" }}>
        <Link href="/" className="hp-nav-logo">/<span>Run</span>withfoxes</Link>
        <div className="hp-nav-links">
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">#unfair_advantage &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">HUMAN LEADS</div>
                  <Link href="/#mod-strategy">Strategy</Link>
                  <Link href="/#mod-positioning">Positioning</Link>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI + HUMAN</div>
                  <Link href="/#mod-messaging">Messaging</Link>
                  <Link href="/#mod-research">Research</Link>
                  <Link href="/#mod-advertising">Advertising</Link>
                  <Link href="/#mod-effectiveness">Effectiveness</Link>
                  <Link href="/#mod-brand-guardian">Brand guardian</Link>
                  <Link href="/#mod-events">Events</Link>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI DOES IT</div>
                  <Link href="/#mod-ad-engine">Ad engine</Link>
                  <Link href="/#mod-growth">Growth team</Link>
                  <Link href="/#mod-pm">Project manager</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/projects &#9662;</span>
            <div className="hp-mega">
              <div className="hp-projects-dropdown">
                <div className="hp-pd-label">CASE STUDIES</div>
                <Link href="/millionaire-raffle">Millionaire Raffle</Link>
                <Link href="/marketer-of-the-year">Marketer of the Year</Link>
                <Link href="/48">48</Link>
                <Link href="/run-with-foxes">Run with Foxes (book 1)</Link>
                <div className="hp-pd-label">AI TOOLS</div>
                <Link href="/experts">Expert Panel</Link>
                <Link href="/brief-diagnostician">Brief Diagnostician</Link>
                <Link href="/coach">Effectiveness Coach</Link>
                <Link href="/ai-writer">AI Writer</Link>
                <Link href="/brand">Brand System</Link>
                <Link href="/chief">Chief of Staff</Link>
              </div>
            </div>
          </div>
          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-nav-cta">/contact</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-label">// a book by paul dervan</div>
            <h1>The <span className="accent">Fox</span> Advantage</h1>
            <p className="hero-sub">How to thrive in marketing because of AI, not despite it. 54 short chapters. No jargon. No fluff.</p>
            <div className="hero-meta">
              <div><span>\</span> 54 chapters</div>
              <div><span>\</span> 4 parts</div>
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
          <div className="section-label">/what_collapsed</div>
          <h2 className="section-title">Fox thinking,<br />not hedgehog thinking</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>The marketing department as we knew it is gone. The stack collapsed. The specialists are being replaced by generalists with tools. And the people who will win aren&apos;t the ones who know one thing deeply.</p>
              <p>They&apos;re the foxes. Adaptive. Curious. Switching between tools and tactics. Building things themselves instead of briefing someone else to do it.</p>
              <p>This book is a practical guide to becoming that person, or building a team of them.</p>
            </div>
            <div className="about-aside">
              <div className="stat-block">
                <span className="stat-number">54</span>
                <div className="stat-label">short chapters</div>
              </div>
              <div className="stat-block">
                <span className="stat-number">4</span>
                <div className="stat-label">parts</div>
              </div>
              <div className="stat-block">
                <span className="stat-number">0</span>
                <div className="stat-label">jargon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GATE / SIGNUP */}
      <DownloadSection />

      <div className="container"><hr className="divider" /></div>

      {/* PARTS */}
      <section id="parts">
        <div className="container">
          <div className="section-label">/structure</div>
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
          <div className="section-label">/chapters.md</div>
          <h2 className="section-title">Table of contents</h2>
          <div className="chapters-list">
            {parts.map((p, i) => (
              <ChapterGroup key={p.part} part={p} index={i} label={partLabels[i]} />
            ))}
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="hp-bottom-bar hp-bb-visible">
        <a href="#">#top</a>
        <Link href="/#about">#about</Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/book">/book</Link>
        <Link href="/contact" className="hp-cta-bar">get in touch</Link>
      </div>
    </>
  );
}

export default function BookLanding({ parts }: Props) {
  return (
    <GateProvider>
      <BookLandingContent parts={parts} />
    </GateProvider>
  );
}
