"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Chapter } from "@/lib/chapters";

interface Props {
  chapter: Chapter;
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterReader({ chapter, prev, next }: Props) {
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("fox_access");
    setHasAccess(stored === "true");
    setChecking(false);
  }, []);

  const num = String(chapter.number).padStart(2, "0");

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-muted)]">loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] relative z-[1]">
        <div className="max-w-md text-center px-8">
          <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[3px] text-[var(--text-muted)] uppercase mb-4">// access_required</div>
          <h1 className="font-[family-name:var(--font-sans)] text-3xl font-light tracking-[-1px] mb-6">
            Sign up to read
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-sm font-light leading-[1.8] text-[var(--text-muted)] mb-8">
            The Fox Advantage is free to read. Just drop your email and you&apos;ll get access to all 41 chapters.
          </p>
          <Link
            href="/#signup"
            className="inline-block px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-normal tracking-[2px] uppercase bg-[var(--orange)] text-white no-underline transition-colors hover:bg-[#E06A1A]"
          >
            get access
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] relative z-[1]">
      {/* Chapter nav */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(250,250,248,0.85)] backdrop-blur-[12px] border-b border-[var(--border)] px-12 py-4 flex justify-between items-center">
        <Link href="/#chapters" className="font-[family-name:var(--font-mono)] text-[13px] font-light tracking-[2px] text-[var(--text-muted)] no-underline hover:text-[var(--orange)] transition-colors">
          ← back to chapters
        </Link>
        <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--text-muted)]">
          {num} / 41
        </div>
      </header>

      {/* Chapter content */}
      <main className="pt-32 pb-40 px-8">
        <div className="max-w-[680px] mx-auto">
          <div className="mb-16">
            <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[3px] text-[var(--orange)] uppercase mb-4">
              \part_{String(chapter.part).padStart(2, "0")} — {chapter.partName}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] font-normal tracking-[2px] text-[var(--text-muted)] mb-6">
              chapter {num}
            </div>
            <h1 className="font-[family-name:var(--font-sans)] text-[clamp(32px,5vw,48px)] font-light tracking-[-1px] leading-[1.15]">
              {chapter.title}
            </h1>
          </div>

          <div
            className="chapter-prose"
            dangerouslySetInnerHTML={{ __html: chapter.content || "" }}
          />

          {/* Chapter navigation */}
          <div className="mt-24 pt-12 border-t border-[var(--border)] flex justify-between items-start">
            {prev ? (
              <Link href={`/chapter/${prev.slug}`} className="no-underline group">
                <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-2">← previous</div>
                <div className="font-[family-name:var(--font-sans)] text-lg font-normal tracking-[-0.3px] group-hover:text-[var(--orange)] transition-colors">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/chapter/${next.slug}`} className="no-underline text-right group">
                <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-2">next →</div>
                <div className="font-[family-name:var(--font-sans)] text-lg font-normal tracking-[-0.3px] group-hover:text-[var(--orange)] transition-colors">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] flex bg-[var(--charcoal)] overflow-hidden">
        <Link href="/" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white/50 no-underline py-3.5 px-7 transition-colors hover:text-white">#home</Link>
        <Link href="/#chapters" className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-[var(--orange)] no-underline py-3.5 px-7 transition-colors hover:text-white">chapters.md</Link>
        {prev && (
          <Link href={`/chapter/${prev.slug}`} className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white/50 no-underline py-3.5 px-7 transition-colors hover:text-white">← prev</Link>
        )}
        {next && (
          <Link href={`/chapter/${next.slug}`} className="font-[family-name:var(--font-mono)] text-xs font-normal tracking-[1px] text-white no-underline py-3.5 px-7 bg-[var(--orange)] transition-colors hover:bg-[#E06A1A]">next →</Link>
        )}
      </div>
    </div>
  );
}
