import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import { notFound } from "next/navigation";
import EssayJoin from "@/app/essays/[slug]/EssayJoin";
import j from "@/app/essays/[slug]/essay-join.module.css";
import { COURSE_NOTE } from "@/lib/essays";
import { formatNoteDate } from "@/lib/notes";
import { getPieceContent, getPieceMeta, getAdjacentPieces } from "@/lib/sections";
import type { Section } from "@/lib/sections-name";

/**
 * ONE PIECE FROM DEAN'S OR DRAY'S SECTION. Sam's reader, written once for both. The byline says
 * plainly that the writer is an AI on the team, and the structured data names the organisation,
 * never a Person, for the same reason as Lena's and Sam's pages.
 */

const describe = (section: Section, piece: { title: string; dek: string }) =>
  piece.dek || `${piece.title}, ${section.fallback}`;

export function pieceMetadata(section: Section, slug: string) {
  const piece = getPieceMeta(section, slug);
  if (!piece) return { title: "Piece not found" };
  return {
    title: `${piece.title} \\ Run with Foxes`,
    description: describe(section, piece),
    alternates: { canonical: `https://runwithfoxes.com${section.route}/${slug}` },
    openGraph: {
      title: piece.title,
      description: describe(section, piece),
      type: "article",
      publishedTime: piece.date,
      url: `https://runwithfoxes.com${section.route}/${slug}`,
    },
  };
}

export default async function SectionPiecePage({ section, slug }: { section: Section; slug: string }) {
  const piece = await getPieceContent(section, slug);
  if (!piece) notFound();

  const { newer, older } = getAdjacentPieces(section, slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: piece.title,
    description: describe(section, piece),
    datePublished: piece.date,
    author: { "@type": "Organization", name: "Run with Foxes" },
    mainEntityOfPage: `https://runwithfoxes.com${section.route}/${slug}`,
  };

  return (
    <div className="essay-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <NextNav bar />

      <main className="essay-main">
        <div className={j.layout}>
        <div className="essay-inner">
          <div className="essay-header">
            <Link href={section.route} className="essay-nav-back essay-back">&larr; {section.back}</Link>
            <div className="essay-meta">
              {formatNoteDate(piece.date)} \ {section.byline}
            </div>
            <h1 className="essay-heading">{piece.title}</h1>
            {piece.dek ? <p className="essay-dek">{piece.dek}</p> : null}
          </div>

          {piece.hold ? <p className="note-hold">{piece.hold}</p> : null}
          <div className="essay-prose" dangerouslySetInnerHTML={{ __html: piece.content || "" }} />

          {/* THE ONE ASK at the foot, same as an essay. A link, never a form. */}
          {COURSE_NOTE.show ? (
            <div className="essay-course">
              {COURSE_NOTE.lead}{" "}
              <Link href={COURSE_NOTE.href}>{COURSE_NOTE.title}</Link>{" "}
              {COURSE_NOTE.tail}
            </div>
          ) : null}

          <div className="essay-footer">
            {older ? (
              <Link href={`${section.route}/${older.slug}`}>
                <div className="essay-footer-label">&larr; older</div>
                <div className="essay-footer-title">{older.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`${section.route}/${newer.slug}`} className="essay-footer-next">
                <div className="essay-footer-label">newer &rarr;</div>
                <div className="essay-footer-title">{newer.title}</div>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
        <aside className={j.side}>
          <EssayJoin />
        </aside>
        </div>
      </main>
    </div>
  );
}
