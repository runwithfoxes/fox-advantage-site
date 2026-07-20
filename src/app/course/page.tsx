import type { Metadata } from "next";
import CourseClient from "./CourseClient";
import { COURSE_URL } from "./courseCopy";

/**
 * ⭐ THE SHARE CARD. Added 20 Jul, two days before launch, and it is the single biggest
 * thing standing between this page and being shareable.
 *
 * WHAT WAS THERE BEFORE: a title and a description, and nothing else. Measured on the
 * live page rather than assumed, the whole social surface it emitted was
 *
 *     <meta name="description" content="A free, practical, non-hype AI fluency...">
 *
 * No og:image, no og:title, no og:url, no twitter:card. A link pasted into LinkedIn,
 * Slack or iMessage therefore drew a small text-only stub with no picture, which in a
 * feed is a different and much weaker object than an image card. Share buttons on the
 * page cannot fix that; only these tags can, which is why they landed first.
 *
 * ⚠️ metadataBase IS SET IN src/app/layout.tsx (https://runwithfoxes.com) and these tags
 * depend on it. Without it the image below resolves against a relative path and the card
 * breaks silently, looking correct in local dev and failing in production.
 *
 * ⚠️ THE IMAGE IS A HOLDING CHOICE, NOT A DESIGNED CARD. It is the course video's own
 * poster frame, already in the repo at 1920x1080 and 80KB, which is the right shape and
 * well inside every platform's budget. It carries no words. A card with the course name
 * burned into it would perform better and is the obvious next move (dynamic per-module
 * cards via ImageResponse from next/og), deliberately not attempted in the two days
 * before campaign traffic starts. Paul has not ruled on the image.
 */
const OG_IMAGE = "/course/fox-tarantino-trunk-poster.jpg";

const TITLE = "AI Fluency for Ambitious Marketers";
const DESCRIPTION =
  "A free, practical, non-hype AI fluency course for ambitious marketers. Six modules, one a fortnight, opening Monday 21 September 2026.";

export const metadata: Metadata = {
  title: TITLE + " - Run with Foxes",
  description: DESCRIPTION,

  /* stops the campaign's own tracking params splitting this page into many URLs in the
     eyes of search engines and of LinkedIn's cache */
  alternates: { canonical: "/course" },

  openGraph: {
    type: "website",
    url: COURSE_URL,
    siteName: "Run with Foxes",
    /* og:title carries no " - Run with Foxes" suffix. The card already prints the site
       name underneath it, so repeating it wastes the widest line on the card. */
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1920, height: 1080, alt: TITLE }],
  },

  twitter: {
    /* summary_large_image is what makes it a full-width picture rather than a thumbnail.
       The default, `summary`, draws a small square and is the reason many correctly
       tagged pages still look thin. */
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function CoursePage() {
  return <CourseClient />;
}
