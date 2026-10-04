import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import { notFound } from "next/navigation";
import EssayJoin from "../../essays/[slug]/EssayJoin";
import j from "../../essays/[slug]/essay-join.module.css";
import { COURSE_NOTE } from "@/lib/essays";
import {
  getAllNotes,
  getNoteContent,
  getNoteMeta,
  getAdjacentNotes,
  formatNoteDate,
} from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";

/**
 * ONE OF SAM'S PIECES. The diary's reader, copied. The byline says plainly that Sam is an AI on
 * the team, and the structured data names the organisation, never a Person, for the same reason
 * as Lena's pages. COURSE_NOTE is the one shared ask at the foot.
 */

export async function generateStaticParams() {
  return getAllNotes().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispatch = getNoteMeta(slug);
  if (!dispatch) return { title: "Piece not found" };
  return {
    title: `${dispatch.title} \\ Run with Foxes`,
    description:
      dispatch.dek ||
      `${dispatch.title}, a short research piece from Run with Foxes.`,
    alternates: { canonical: `https://runwithfoxes.com${NOTES.route}/${slug}` },
    openGraph: {
      title: dispatch.title,
      description: dispatch.dek,
      type: "article",
      publishedTime: dispatch.date,
      url: `https://runwithfoxes.com${NOTES.route}/${slug}`,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispatch = await getNoteContent(slug);
  if (!dispatch) notFound();

  const { newer, older } = getAdjacentNotes(slug);

  /* The author is credited honestly: Sam is an AI agent, not a person, so the
     structured data names the organisation that stands behind the page rather
     than claiming a Person wrote it. The visible byline carries Sam. */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: dispatch.title,
    description: dispatch.dek,
    datePublished: dispatch.date,
    author: { "@type": "Organization", name: "Run with Foxes" },
    mainEntityOfPage: `https://runwithfoxes.com${NOTES.route}/${slug}`,
  };

  return (
    <div className="essay-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <NextNav bar />

      <main className="essay-main">
        {/* the same sign-up margin as the diary */}
        <div className={j.layout}>
        <div className="essay-inner">
          <div className="essay-header">
            <Link href={NOTES.route} className="essay-nav-back essay-back">&larr; {NOTES.back}</Link>
            <div className="essay-meta">
              {formatNoteDate(dispatch.date)} \ {NOTES.byline}
            </div>
            <h1 className="essay-heading">{dispatch.title}</h1>
            {dispatch.dek ? <p className="essay-dek">{dispatch.dek}</p> : null}
          </div>

          {dispatch.hold ? <p className="note-hold">{dispatch.hold}</p> : null}
          <div
            className="essay-prose"
            dangerouslySetInnerHTML={{ __html: dispatch.content || "" }}
          />

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
              <Link href={`${NOTES.route}/${older.slug}`}>
                <div className="essay-footer-label">&larr; older</div>
                <div className="essay-footer-title">{older.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`${NOTES.route}/${newer.slug}`} className="essay-footer-next">
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
