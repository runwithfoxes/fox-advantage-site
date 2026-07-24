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
 * ⭐ THE CARD IS DESIGNED AND APPROVED BY PAUL, 20 Jul. It started as the bare poster
 * frame, which he rejected for the right reason: "it's not obvious from reading them
 * that it's a free course." The headline alone could be a book, a newsletter or a
 * conference, and the word "course" appeared nowhere.
 *
 * WHAT IT CARRIES, each element his ruling:
 *  - a solid cream chip reading FREE TRAINING COURSE, chosen over the same words as
 *    plain white letterspaced type, which half-dissolved into the photo at the size
 *    LinkedIn actually renders. It is the brightest object on the card, so it is read
 *    BEFORE the headline and before the fox;
 *  - the course name;
 *  - "Sign up today." NOT the start date. Paul overruled the terminal here and was
 *    right: the date reads as "come back in September" and gives the reader nothing to
 *    do now, when capturing the email is the whole job. "Six modules" cut in the same
 *    conversation;
 *  - the wordmark as a FULL WHITEOUT, "Run" included, because orange appears only on
 *    cream. That rule was already encoded in .hp-nav-logo and the terminal broke it.
 *    See memory/feedback/feedback_logo_whiteout_on_dark.md.
 *
 * ⚠️ THE SOURCE IS COMMITTED BESIDE IT at public/course/og-course-source.html. EDIT
 * THAT AND RE-RENDER, never touch the jpg. Regenerate with:
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
 *     --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=9000 \
 *     --screenshot=out.png "file://$(pwd)/public/course/og-course-source.html"
 *   sips -s format jpeg -s formatOptions 86 out.png --out public/course/og-course.jpg
 *
 * ⚠️ JPG, NOT PNG. Identical on a photograph and 184KB rather than 634KB, and this file
 * is fetched every single time anybody pastes the link.
 *
 * The next move, deliberately NOT attempted before Wednesday's campaign traffic, is
 * per-module cards generated dynamically with ImageResponse from next/og.
 */
const OG_IMAGE = "/course/og-course.jpg";

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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
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
