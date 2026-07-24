import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COURSE_NOTE,
  getAllEssays,
  getEssayContent,
  getEssayMeta,
  getAdjacentEssays,
  formatEssayDate,
} from "@/lib/essays";

/**
 * /essays/[slug] - THE READER.
 *
 * ⭐ THE PAGE IS THE ORIGINAL. The same piece goes up on Substack afterwards, so the
 * canonical below points at this URL and the Substack copy points back here. Setting
 * one and forgetting the other is how two copies of one essay start competing with
 * each other.
 */

export async function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssayMeta(slug);
  if (!essay) return { title: "Essay not found" };
  return {
    title: `${essay.title} \\ Run with Foxes`,
    description: essay.dek || `${essay.title}, by Paul Dervan.`,
    alternates: { canonical: `https://runwithfoxes.com/essays/${slug}` },
    openGraph: {
      title: essay.title,
      description: essay.dek,
      type: "article",
      publishedTime: essay.date,
      url: `https://runwithfoxes.com/essays/${slug}`,
      images: essay.image ? [essay.image] : undefined,
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssayContent(slug);
  if (!essay) notFound();

  const { newer, older } = getAdjacentEssays(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: essay.title,
    description: essay.dek,
    datePublished: essay.date,
    author: { "@type": "Person", name: "Paul Dervan" },
    mainEntityOfPage: `https://runwithfoxes.com/essays/${slug}`,
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
        <Link href="/essays" className="essay-nav-back">
          &larr; essays
        </Link>
        <div className="essay-nav-count">{formatEssayDate(essay.date)}</div>
      </header>

      <main className="essay-main">
        <div className="essay-inner">
          <div className="essay-header">
            <div className="essay-meta">{formatEssayDate(essay.date)}</div>
            <h1 className="essay-heading">{essay.title}</h1>
            {essay.dek ? <p className="essay-dek">{essay.dek}</p> : null}
          </div>

          <div
            className="essay-prose"
            dangerouslySetInnerHTML={{ __html: essay.content || "" }}
          />

          {/* THE ASK, and it comes FIRST because it is the only one on the page.
              The Substack line under it is a footnote, not a second ask. */}
          {COURSE_NOTE.show ? (
            <div className="essay-course">
              {COURSE_NOTE.lead}{" "}
              <Link href={COURSE_NOTE.href}>{COURSE_NOTE.title}</Link>{" "}
              {COURSE_NOTE.tail}
            </div>
          ) : null}

          {essay.substack ? (
            <div className="essay-substack">
              Also on{" "}
              <a href={essay.substack} target="_blank" rel="noopener noreferrer">
                Substack
              </a>
              , where you can subscribe to get these by email.
            </div>
          ) : null}

          <div className="essay-footer">
            {older ? (
              <Link href={`/essays/${older.slug}`}>
                <div className="essay-footer-label">&larr; older</div>
                <div className="essay-footer-title">{older.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/essays/${newer.slug}`} className="essay-footer-next">
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
