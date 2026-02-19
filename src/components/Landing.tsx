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
  const { isUnlocked } = useGate();
  const num = String(chapter.number).padStart(2, "0");

  if (isUnlocked) {
    return (
      <Link
        href={`/chapter/${chapter.slug}`}
        className="flex items-baseline gap-6 py-5 border-b border-[var(--border)] transition-all duration-300 hover:pl-3 group no-underline"
      >
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-normal text-[var(--text-muted)] min-w-[32px]">
          {num}
        </span>
        <span className="font-[family-name:var(--font-sans)] text-lg font-normal tracking-[-0.3px] transition-colors duration-300 group-hover:text-[var(--orange)] flex-1 text-[var(--text)]">
          {chapter.title}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-[var(--orange)]">
          →
        </span>
      </Link>
    );
  }

  return (
    <a
      href="#signup"
      className="flex items-baseline gap-6 py-5 border-b border-[var(--border)] transition-all duration-300 hover:pl-3 group no-underline"
    >
      <span className="font-[family-name:var(--font-mono)] text-[11px] font-normal text-[var(--text-muted)] min-w-[32px]">
        {num}
      </span>
      <span className="font-[family-name:var(--font-sans)] text-lg font-normal tracking-[-0.3px] transition-colors duration-300 group-hover:text-[var(--orange)] flex-1 text-[var(--text)]">
        {chapter.title}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        sign up to read
      </span>
    </a>
  );
}

function LandingContent({ parts }: Props) {
  const partLabels = ["what just collapsed", "better together", "behaviours", "marketing for leaders"];

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(250,250,248,0.85)] backdrop-blur-[12px] border-b border-[var(--border)] px-12 py-4 flex justify-between items-center">
        <div className="font-[family-name:var(--font-mono)] text-[13px] font-light tracking-[2px] text-[var(--text-muted)]">
          \<span className="text-[var(--orange)]">fox</span>_advantage
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--orange)] no-underline transition-colors hover:text-[var(--orange)]">#about</a>
          <a href="#parts" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--orange)]">/parts</a>
          <a href="#chapters" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--orange)]">chapters.md</a>
          <a href="#author" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--orange)]">author.txt</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-30 min-h-[90vh]">
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1] grid grid-cols-1 md:grid-cols-[1fr_380px] gap-20 items-center">
          <div className="flex flex-col justify-center">
            <div className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[3px] text-[var(--text-muted)] uppercase mb-8">
              // a book by paul dervan
            </div>
            <h1 className="font-[family-name:var(--font-sans)] text-[clamp(48px,8vw,96px)] font-light leading-[1.05] tracking-[-2px] text-[var(--text)] mb-10 max-w-[800px]">
              The <span className="text-[var(--orange)]">Fox</span> Advantage
            </h1>
            <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-[1.8] text-[var(--text-muted)] max-w-[520px] mb-12">
              How to thrive in marketing because of AI, not despite it. 41 short chapters. No jargon. No fluff. Written for marketers who actually make things.
            </p>
            <div className="flex flex-wrap gap-12 font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[1px] text-[var(--text-muted)]">
              <div><span className="text-[var(--orange)]">\</span> 41 chapters</div>
              <div><span className="text-[var(--orange)]">\</span> 4 parts</div>
              <div><span className="text-[var(--orange)]">\</span> free to read</div>
              <div><span className="text-[var(--orange)]">\</span> 2026</div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Image src="/book_cover.JPG" alt="The Fox Advantage book cover" width={320} height={427} className="w-[320px] md:w-[320px] w-[240px] h-auto" priority />
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-12 relative z-[1]"><hr className="border-t border-[var(--border)] border-b-0" /></div>

      {/* ABOUT */}
      <section id="about" className="py-30">
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--text-muted)] uppercase mb-4">// what_collapsed</div>
          <h2 className="font-[family-name:var(--font-sans)] text-[clamp(36px,5vw,64px)] font-light tracking-[-1px] leading-[1.1] mb-12">
            Fox thinking,<br />not hedgehog thinking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="font-[family-name:var(--font-mono)] text-sm font-light leading-[1.9] text-[var(--text)]">
              <p className="mb-6">The marketing department as we knew it is gone. The stack collapsed. The specialists are being replaced by generalists with tools. And the people who will win aren&apos;t the ones who know one thing deeply.</p>
              <p className="mb-6">They&apos;re the foxes. Adaptive. Curious. Switching between tools and tactics. Building things themselves instead of briefing someone else to do it.</p>
              <p>This book is a practical guide to becoming that person, or building a team of them.</p>
            </div>
            <div className="border-l border-[var(--border)] pl-10">
              <div className="mb-10">
                <div className="font-[family-name:var(--font-sans)] text-5xl font-light text-[var(--orange)] leading-none mb-2">41</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--text-muted)] uppercase">short chapters</div>
              </div>
              <div className="mb-10">
                <div className="font-[family-name:var(--font-sans)] text-5xl font-light text-[var(--orange)] leading-none mb-2">4</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--text-muted)] uppercase">parts</div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-sans)] text-5xl font-light text-[var(--orange)] leading-none mb-2">0</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--text-muted)] uppercase">jargon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-12 relative z-[1]"><hr className="border-t border-[var(--border)] border-b-0" /></div>

      {/* PARTS */}
      <section id="parts" className="py-30">
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--text-muted)] uppercase mb-4">// structure</div>
          <h2 className="font-[family-name:var(--font-sans)] text-[clamp(36px,5vw,64px)] font-light tracking-[-1px] leading-[1.1] mb-12">Four parts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[var(--border)] mt-12">
            {parts.map((p) => (
              <div key={p.part} className="bg-[var(--bg)] p-12 transition-colors hover:bg-[#F5F5F0]">
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--orange)] mb-4">
                  \{String(p.part).padStart(2, "0")}
                </div>
                <div className="font-[family-name:var(--font-sans)] text-2xl font-normal tracking-[-0.5px] mb-4 leading-[1.3]">
                  {p.partName}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-xs font-light leading-[1.8] text-[var(--text-muted)]">
                  {p.chapters.length} chapters
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-12 relative z-[1]"><hr className="border-t border-[var(--border)] border-b-0" /></div>

      {/* CHAPTERS */}
      <section id="chapters" className="py-30">
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--text-muted)] uppercase mb-4">// chapters.md</div>
          <h2 className="font-[family-name:var(--font-sans)] text-[clamp(36px,5vw,64px)] font-light tracking-[-1px] leading-[1.1] mb-12">Table of contents</h2>
          <div className="mt-12">
            {parts.map((p, i) => (
              <div key={p.part} className={i < parts.length - 1 ? "mb-16" : ""}>
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--orange)] uppercase pb-4 border-b border-[var(--border)]">
                  \part_{String(p.part).padStart(2, "0")} — {partLabels[i]}
                </div>
                {p.chapters.map((ch) => (
                  <ChapterItem key={ch.slug} chapter={ch} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GATE / SIGNUP */}
      <section id="signup" className="bg-[var(--charcoal)] py-30 relative z-[1]">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(244, 117, 33, 0.08) 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-white/30 uppercase mb-4">// get_access</div>
          <h2 className="font-[family-name:var(--font-sans)] text-[clamp(36px,5vw,64px)] font-light tracking-[-1px] leading-[1.1] mb-12 text-white">
            Read the full book.<br />For free.
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-sm font-light leading-[1.9] text-white/50 max-w-[480px] mb-12">
            41 chapters on marketing in the age of AI. No fluff, no frameworks nobody uses, no corporate speak. Just what&apos;s actually working, told by someone in the trenches.
          </p>
          <EmailGateForm variant="dark" />
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-white/20 mt-4">
            No spam. Just the book. Unsubscribe whenever.
          </p>
        </div>
      </section>

      {/* AUTHOR */}
      <section id="author" className="py-30">
        <div className="max-w-[1200px] mx-auto px-12 relative z-[1]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--text-muted)] uppercase mb-4">// author.txt</div>
          <h2 className="font-[family-name:var(--font-sans)] text-[clamp(36px,5vw,64px)] font-light tracking-[-1px] leading-[1.1] mb-12">About the author</h2>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20 items-start">
            <div>
              <Image src="/Paul_photo.jpg" alt="Paul Dervan" width={280} height={373} className="w-full aspect-[3/4] object-cover object-[center_top]" />
            </div>
            <div className="border-l border-[var(--border)] pl-10">
              <div className="font-[family-name:var(--font-sans)] text-[32px] font-normal tracking-[-0.5px] mb-6">Paul Dervan</div>
              <div className="font-[family-name:var(--font-mono)] text-[13px] font-light leading-[1.9] text-[var(--text-muted)]">
                <p className="mb-5">Marketing leader. Currently figuring out what happens when AI collapses the marketing stack, one experiment at a time.</p>
                <p>This book started as notes to myself. Then it became a Substack. Now it&apos;s this. Every chapter was written the same way: start with something that actually happened, pull the thread, see where it goes.</p>
              </div>
              <div className="mt-8 flex gap-6">
                <a href="https://runwithfoxes.substack.com" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] uppercase text-[var(--orange)] no-underline transition-opacity hover:opacity-70">\substack</a>
                <a href="#" className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] uppercase text-[var(--orange)] no-underline transition-opacity hover:opacity-70">\linkedin</a>
                <a href="#" className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] uppercase text-[var(--orange)] no-underline transition-opacity hover:opacity-70">\twitter</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] flex bg-[var(--charcoal)] overflow-hidden">
        <a href="#" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--orange)] no-underline py-3.5 px-7 transition-colors hover:text-white">#top</a>
        <a href="#chapters" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white/50 no-underline py-3.5 px-7 transition-colors hover:text-white">chapters.md</a>
        <a href="#author" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white/50 no-underline py-3.5 px-7 transition-colors hover:text-white">author.txt</a>
        <a href="#signup" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white no-underline py-3.5 px-7 bg-[var(--orange)] transition-colors hover:bg-[#E06A1A]">get_access:</a>
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
