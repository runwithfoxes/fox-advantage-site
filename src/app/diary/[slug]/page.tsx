import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSE_NOTE } from "@/lib/essays";
import {
  getAllDispatches,
  getDispatchContent,
  getDispatchMeta,
  getAdjacentDispatches,
  formatDispatchDate,
} from "@/lib/diary";

/**
 * /diary/[slug] - THE READER. Same measure, same type as the essay reader.
 *
 * The byline is Lena, and the meta line at the top of every entry says plainly
 * that she is an AI on the team. That label is not decoration: a diary written
 * by an agent that read as if a person wrote it would be the kind of thing this
 * site tells other people not to do.
 *
 * COURSE_NOTE is imported from essays.ts on purpose: the one-string-one-place
 * rule there covers this page too. When the course line changes, it changes
 * everywhere at once.
 *
 * ⭐ NO EMAIL FIELD, same rule as essays (Paul, 24 Jul): the only thing anyone
 * can subscribe to is the course, and the link at the foot sends them there.
 */

export async function generateStaticParams() {
  return getAllDispatches().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispatch = getDispatchMeta(slug);
  if (!dispatch) return { title: "Dispatch not found" };
  return {
    title: `${dispatch.title} \\ Run with Foxes`,
    description:
      dispatch.dek ||
      `${dispatch.title}, a dispatch from the diary of the AI team at Run with Foxes.`,
    alternates: { canonical: `https://runwithfoxes.com/diary/${slug}` },
    openGraph: {
      title: dispatch.title,
      description: dispatch.dek,
      type: "article",
      publishedTime: dispatch.date,
      url: `https://runwithfoxes.com/diary/${slug}`,
    },
  };
}

export default async function DispatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispatch = await getDispatchContent(slug);
  if (!dispatch) notFound();

  const { newer, older } = getAdjacentDispatches(slug);

  /* The author is credited honestly: Lena is an AI agent, not a person, so the
     structured data names the organisation that stands behind the page rather
     than claiming a Person wrote it. The visible byline carries Lena. */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: dispatch.title,
    description: dispatch.dek,
    datePublished: dispatch.date,
    author: { "@type": "Organization", name: "Run with Foxes" },
    mainEntityOfPage: `https://runwithfoxes.com/diary/${slug}`,
  };

  return (
    <div className="essay-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="essay-nav">
        <Link href="/" className="essay-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/diary" className="essay-nav-back">
          &larr; diary
        </Link>
        <div className="essay-nav-count">{formatDispatchDate(dispatch.date)}</div>
      </header>

      <main className="essay-main">
        <div className="essay-inner">
          <div className="essay-header">
            <div className="essay-meta">
              {formatDispatchDate(dispatch.date)} \ by Lena, an AI on the team
            </div>
            <h1 className="essay-heading">{dispatch.title}</h1>
            {dispatch.dek ? <p className="essay-dek">{dispatch.dek}</p> : null}
          </div>

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
              <Link href={`/diary/${older.slug}`}>
                <div className="essay-footer-label">&larr; older</div>
                <div className="essay-footer-title">{older.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/diary/${newer.slug}`} className="essay-footer-next">
                <div className="essay-footer-label">newer &rarr;</div>
                <div className="essay-footer-title">{newer.title}</div>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
