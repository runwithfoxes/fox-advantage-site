import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { getAllEssays, formatEssayDate } from "@/lib/essays";

/**
 * /essays - THE INDEX.
 *
 * Everything on this page comes from the markdown files in src/content/essays. There
 * is no list to maintain here: drop a file in, it appears at the top.
 */

export const metadata: Metadata = {
  title: "Essays \\ Run with Foxes",
  description:
    "Paul Dervan on marketing and AI. Published here first, and on Substack after.",
  alternates: { canonical: "https://runwithfoxes.com/essays" },
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <div className="essay-page">
      <header className="essay-nav">
        <Link href="/" className="essay-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <div className="essay-nav-count">
          {essays.length} {essays.length === 1 ? "essay" : "essays"}
        </div>
      </header>

      <main className="essay-main">
        <div className="essay-inner">
          <div className="essay-index-head">
            <div className="essay-index-kick">\essays</div>
            <h1 className="essay-heading">Essays</h1>
            <p className="essay-index-intro">
              Marketing and AI, written up as I go. Published here first, and on
              Substack after.
            </p>
          </div>

          <div className="essay-list">
            {essays.map((e) => (
              <Link key={e.slug} href={`/essays/${e.slug}`} className="essay-list-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {e.image ? (
                  <img className="essay-list-thumb" src={e.image} alt="" />
                ) : (
                  <span className="essay-list-thumb" />
                )}
                <div>
                  <div className="essay-list-title">{e.title}</div>
                  {e.dek ? <div className="essay-list-dek">{e.dek}</div> : null}
                  <div className="essay-list-date">{formatEssayDate(e.date)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter current="/essays" />
    </div>
  );
}
