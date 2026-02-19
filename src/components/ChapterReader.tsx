"use client";

import Link from "next/link";
import type { Chapter } from "@/lib/chapters";

interface Props {
  chapter: Chapter;
  prev: Chapter | null;
  next: Chapter | null;
}

function stripFirstHeading(html: string): string {
  return html.replace(/<h1[^>]*>.*?<\/h1>\s*/i, "");
}

function stripPartLine(html: string): string {
  return html.replace(/<p><em>Part\s*\d+<\/em><\/p>\s*/i, "");
}

export default function ChapterReader({ chapter, prev, next }: Props) {
  const num = String(chapter.number).padStart(2, "0");
  const cleanContent = stripPartLine(stripFirstHeading(chapter.content || ""));

  return (
    <div className="chapter-page">
      {/* Chapter nav */}
      <header className="chapter-nav">
        <Link href="/#chapters" className="chapter-nav-back">
          ← back to chapters
        </Link>
        <div className="chapter-nav-count">
          {num} / 41
        </div>
      </header>

      {/* Chapter content */}
      <main className="chapter-main">
        <div className="chapter-inner">
          <div className="chapter-header">
            <div className="chapter-part-label">
              \part_{String(chapter.part).padStart(2, "0")} — {chapter.partName}
            </div>
            <div className="chapter-number">
              chapter {num}
            </div>
            <h1 className="chapter-heading">
              {chapter.title}
            </h1>
          </div>

          <div
            className="chapter-prose"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* Chapter navigation */}
          <div className="chapter-footer">
            {prev ? (
              <Link href={`/chapter/${prev.slug}`}>
                <div className="chapter-footer-label">← previous</div>
                <div className="chapter-footer-title">{prev.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/chapter/${next.slug}`} className="chapter-footer-next">
                <div className="chapter-footer-label">next →</div>
                <div className="chapter-footer-title">{next.title}</div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      {/* Bottom bar */}
      <div className="chapter-bottom-bar">
        <Link href="/">#home</Link>
        <Link href="/#chapters" className="active">chapters.md</Link>
        <Link href="/#signup">/download_full_book</Link>
        {prev && (
          <Link href={`/chapter/${prev.slug}`}>← prev</Link>
        )}
        {next && (
          <Link href={`/chapter/${next.slug}`} className="cta-bar">next →</Link>
        )}
      </div>
    </div>
  );
}
