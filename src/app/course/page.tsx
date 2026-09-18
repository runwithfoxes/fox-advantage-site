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

/**
 * ⭐ THE SEARCH TITLE AND DESCRIPTION ARE DELIBERATELY NOT THE SHARE-CARD ONES.
 * Added 1 Aug 2026. The title tag has a different job from the H1 and from og:title,
 * and this is the only place on the page where that job gets done.
 *
 * THE PROBLEM, measured on the live page on 1 Aug: the string "AI marketing course"
 * appeared nowhere on /course. The page communicates the idea (AI fluency) clearly
 * and the category (an AI marketing course) not at all, so it turns up for the course
 * name and for "Run with Foxes", and not for the words a marketer who has never heard
 * of it would actually type.
 *
 * WHY THIS AND NOT SCHEMA. The obvious-looking fix is Course JSON-LD. It was
 * considered and rejected on evidence: Ahrefs' matched-control study (11 May 2026,
 * 1,885 pages adding JSON-LD against ~4,000 controls) measured AI Overview presence
 * DOWN 4.6%, statistically significant, and searchVIU built a page whose price existed
 * only in JSON-LD which none of ChatGPT, Claude, Perplexity, Gemini or Google AI Mode
 * retrieved. They read rendered HTML. Schema is classic-SERP hygiene on a shrinking
 * surface, never an AI-citation lever. See ~/paul-hub/methodology/search-doctrine.md §6.
 *
 * ⚠️ THE H1 AND THE SHARE CARD ARE UNCHANGED AND MUST STAY THAT WAY. The course name
 * is settled (Paul, 19 Jul: no rename) and it is more ownable than the category. The
 * category is attached to it here, it does not replace it anywhere.
 *
 * ⚠️ KEEP THIS UNDER ABOUT 60 CHARACTERS or Google rewrites it. The brand suffix is
 * dropped on purpose: the site name is emitted separately via og:siteName and the
 * suffix would push the searched words off the end.
 */
const SEARCH_TITLE = "Free AI marketing course: AI Fluency for Ambitious Marketers";
const SEARCH_DESCRIPTION =
  "A free, practical, non-hype AI marketing course for ambitious marketers. Six modules, one a fortnight, opening Monday 21 September 2026.";

export const metadata: Metadata = {
  title: SEARCH_TITLE,
  description: SEARCH_DESCRIPTION,

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
