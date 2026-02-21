"use client";

import Link from "next/link";
import type { Chapter } from "@/lib/chapters";

interface Props {
  chapter: Chapter;
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterGate({ chapter }: Props) {
  const num = String(chapter.number).padStart(2, "0");

  return (
    <div className="chapter-page">
      {/* Same nav as ChapterReader */}
      <header className="chapter-nav">
        <Link href="/#chapters" className="chapter-nav-back">
          ← back to chapters
        </Link>
        <div className="chapter-nav-count">
          {num} / 54
        </div>
      </header>

      {/* Gate content */}
      <div className="chapter-gate">
        <div className="chapter-gate-inner">
          <div className="chapter-gate-label">
            \part_{String(chapter.part).padStart(2, "0")} — {chapter.partName}
          </div>
          <h1 className="chapter-gate-title">
            {chapter.title}
          </h1>
          <p className="chapter-gate-text">
            This chapter isn&apos;t published yet. Parts 1 and 2 are free to read now. Sign up and we&apos;ll let you know when the rest lands.
          </p>
          <Link href="/#signup" className="chapter-gate-btn">
            get notified
          </Link>
        </div>
      </div>

      {/* Same bottom bar as ChapterReader */}
      <div className="chapter-bottom-bar">
        <Link href="/">#home</Link>
        <Link href="/#chapters" className="active">chapters.md</Link>
        <Link href="/#signup">/get_the_book</Link>
      </div>
    </div>
  );
}
