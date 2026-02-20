"use client";

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

  return (
    <Link
      href={`/chapter/${chapter.slug}`}
      className="chapter-item no-underline"
    >
      <span className="chapter-num">{num}</span>
      <span className="chapter-title">{chapter.title}</span>
      <span className="chapter-arrow">→</span>
    </Link>
  );
}

function DownloadSection() {
  const { isUnlocked } = useGate();

  return (
    <section id="signup" className="gate-section">
      <div className="container">
        <div className="section-label">/ download_full_book</div>
        {isUnlocked ? (
          <>
            <h2 className="section-title">You&apos;re all set.</h2>
            <EmailGateForm variant="dark" />
          </>
        ) : (
          <>
            <h2 className="section-title">Download the full book.<br />For free.</h2>
            <p className="gate-text">All 41 chapters as a single PDF. Drop your email and it&apos;s yours.</p>
            <EmailGateForm variant="dark" />
            <p className="gate-note">Just the book. Unsubscribe whenever.</p>
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
        <a href="#" className="logo">\<span>fox</span>_advantage</a>
        <nav>
          <a href="#about" className="active">#about</a>
          <a href="#chapters">chapters.md</a>
          <a href="#projects">/projects</a>
          <a href="#author">author.txt</a>
          <a href="#signup" className="cta-bar">/download_full_book</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-label">// a book by paul dervan</div>
            <h1>The <span className="accent">Fox</span> Advantage</h1>
            <p className="hero-sub">How to thrive in marketing because of AI, not despite it. 41 short chapters. No jargon. No fluff.</p>
            <div className="hero-meta">
              <div><span>\</span> 41 chapters</div>
              <div><span>\</span> 4 parts</div>
              <div><span>\</span> free to read</div>
              <a href="#signup" className="hero-meta-link"><span>\</span> download_full_book</a>
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
                <div className="stat-number">41</div>
                <div className="stat-label">short chapters</div>
              </div>
              <div className="stat-block">
                <div className="stat-number">4</div>
                <div className="stat-label">parts</div>
              </div>
              <div className="stat-block">
                <div className="stat-number">0</div>
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
              <div key={p.part} className="chapter-group">
                <div className="chapter-group-label">\part_{String(p.part).padStart(2, "0")} — {partLabels[i]}</div>
                {p.chapters.map((ch) => (
                  <ChapterItem key={ch.slug} chapter={ch} />
                ))}
              </div>
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
            <div className="project-card">
              <div className="project-tag">\brand</div>
              <div className="project-name">National Lottery</div>
              <div className="project-desc">Marketer of the Year. Rebuilt the brand, delivered 21:1 ROI.</div>
            </div>
            <div className="project-card">
              <div className="project-tag">\brand</div>
              <div className="project-name">O2 48</div>
              <div className="project-desc">Created a youth brand from scratch inside Telefonica. Grew to 12% market share.</div>
            </div>
            <div className="project-card">
              <div className="project-tag">\brand</div>
              <div className="project-name">Indeed</div>
              <div className="project-desc">Led global brand for the world&apos;s biggest job site. $400M budget across 20+ markets.</div>
            </div>
            <div className="project-card">
              <div className="project-tag">\book</div>
              <div className="project-name">Run with Foxes</div>
              <div className="project-desc">First book, published 2020. Making better decisions in marketing using behavioural science. On Amazon.</div>
            </div>
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
        <a href="#signup" className="cta-bar">download full book</a>
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
