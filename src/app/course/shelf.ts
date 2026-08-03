/**
 * THE SHELF. Paul's own recommendations, which are NOT lessons.
 *
 * ⭐ WHY THIS FILE EXISTS, PAUL 3 Aug 2026, verbatim: "it's not just the content that I want
 * from the pages. For example, I want to show lists of companies I think are interesting,
 * articles that I think are interesting, people to follow. There's a whole bunch of things
 * that I just want to give to people. Things that are not in the lessons."
 *
 * ⭐⭐ A SECTION HERE IS A SIBLING OF A LESSON, NOT A CHILD OF ONE. Everything else on the
 * library is DERIVED from `moduleData.ts`: an item's prompt and its links, flattened. Nothing
 * in here comes from a module and nothing in here should ever be back-filled into one. That is
 * the whole distinction, and it is why this is its own file rather than a seventh module.
 *
 * ⛔⛔ EVERY ENTRY IS PAUL'S TO WRITE, AND AN EMPTY SECTION IS THE CORRECT STATE UNTIL HE
 * WRITES ONE. Do not seed these with plausible examples to "show the shape". A page of
 * companies Paul is supposed to find interesting, invented on his behalf, is exactly the
 * failure the rest of the course code is built to prevent, and this one would be PUBLIC and
 * attributed to him. The layout is proven with module 1's real material; these render with a
 * real header and a zero count, and only in the build view, until they have content.
 *
 * ⛔ NO `note` INVENTED EITHER. Same rule as `reading` in moduleData.ts, which deliberately
 * has no `why` field: a one-line reason written for him reads exactly like one written by him.
 * A section can ship with names and sources and no commentary at all.
 *
 * ⚠️ THE TITLES BELOW ARE CLOSE TO HIS WORDS BUT ARE NOT YET HIS. He described the four
 * lists; he has not named them. Treat every `title` and `blurb` here as a first draft
 * awaiting his wording.
 */

export type ShelfEntry = {
  /** The person, company, article or tool. */
  name: string;
  /** Who made it or who they are. Publication, company, role. */
  by?: string;
  url: string;
  /** ⛔ PAUL'S TO WRITE. Never invent a reason something is worth a marketer's time. */
  note?: string;
};

export type ShelfSection = {
  slug: string;
  title: string;
  /** One line under the section header. ⛔ Paul's to write. */
  blurb?: string;
  entries: ShelfEntry[];
};

export const SHELF: ShelfSection[] = [
  {
    /* ⭐ PAUL'S OWN LIST, 3 Aug 2026, verbatim: "people i follow: Ethan Mollick, Lenny's
       podcast, Peter Yang https://www.youtube.com/@PeterYangYT". In his order.

       ⭐ HE GAVE ONE URL AND TWO NAMES. The other two were resolved and each page's own
       <title> confirmed the identity before it was written here: oneusefulthing.org returns
       "One Useful Thing | Ethan Mollick", lennyspodcast.com returns "Lenny's Podcast".
       ⛔ He said PODCAST, so it is lennyspodcast.com and not lennysnewsletter.com. They are
       different products by the same person and both resolve, which is exactly the kind of
       near-miss that would never announce itself.

       ⚠️ Lenny's Podcast is a show rather than a person and it is under People because that
       is where he put it. Not a filing error to be tidied. */
    slug: "people",
    title: "People I follow",
    entries: [
      {
        name: "Ethan Mollick",
        by: "oneusefulthing.org",
        url: "https://www.oneusefulthing.org",
      },
      {
        name: "Lenny's Podcast",
        by: "lennyspodcast.com",
        url: "https://www.lennyspodcast.com",
      },
      {
        name: "Peter Yang",
        by: "youtube.com",
        url: "https://www.youtube.com/@PeterYangYT",
      },
    ],
  },
  {
    /* ⭐ PAUL'S OWN LIST, 3 Aug 2026, verbatim: "Companies I watch include Ramp, Every,
       Mercury, anthropic, Vercel." IN HIS ORDER, which is why it is not alphabetical.
       ⭐ Every domain was requested and returned 200 before being written here rather than
       typed from memory, and the page titles confirmed the identity of four of the five.
       ⛔ NO `note` ON ANY OF THEM. He gave five names and no reasons, and a sentence about
       why Ramp is worth watching, written on his behalf and published under his name, is the
       fabrication this file exists to prevent. The row is complete without one. */
    slug: "companies",
    /* His own words for it, 3 Aug: "Companies I watch include...". Pairs with "People I
       follow", so the four titles read in one voice instead of two. */
    title: "Companies I watch",
    entries: [
      { name: "Ramp", by: "ramp.com", url: "https://ramp.com" },
      { name: "Every", by: "every.to", url: "https://every.to" },
      { name: "Mercury", by: "mercury.com", url: "https://mercury.com" },
      { name: "Anthropic", by: "anthropic.com", url: "https://anthropic.com" },
      { name: "Vercel", by: "vercel.com", url: "https://vercel.com" },
    ],
  },
  {
    /* ⭐ VIDEOS LIVE HERE TOO, Paul 3 Aug: "If I send you an Every article, it goes under
       Articles. I'll also send YouTube links so that can go under articles. That may have to
       be articles/videos."

       ⭐⭐ AND THAT SETTLES THE ONE AMBIGUITY IN THE SHELF. Every is both a company and a
       publication, so an Every article could sit in either folder. His ruling is that the
       PUBLISHER goes in Companies and the PIECE goes here, which generalises: a shelf entry
       is filed by WHAT IT IS, not by who made it. A named individual therefore has a row
       under People and their articles have rows here, and neither is a duplicate of the
       other. */
    slug: "articles",
    title: "Articles and videos",
    entries: [],
  },
  {
    /* "They might not be tools I use, maybe just tools" (3 Aug). A tool is worth listing
       whether or not he has personally adopted it, and the shorter title does not quietly
       claim he has. */
    slug: "tools",
    title: "Tools",
    /* ⭐ PAUL'S OWN LIST, 3 Aug 2026, verbatim: "Tools: Clay.com, appify, vercel, Claude,
       Chatgpt, Gemini, Seedance, GetImg, Smartlead, Klavyio, attio, Supabase, elevenlabs,
       hyperframes". In his order. Every domain below was resolved and its own <title>
       confirmed the product before it was written here.

       ⭐ TWO OF HIS SPELLINGS WERE READ THROUGH, NOT COPIED: "appify" is Apify and "Klavyio"
       is Klaviyo. Both are tools he already uses and both were confirmed by their page
       titles, so this is reading a dictation slip rather than second-guessing him.

       ⭐ claude.ai AND chatgpt.com RETURN 403 to a script. That is a bot challenge, not a
       dead domain, and neither address is in any doubt.

       ⛔⛔ TWO OF THE FOURTEEN ARE DELIBERATELY MISSING AND MUST NOT BE FILLED IN BY GUESS:
       SEEDANCE. seedance.ai resolves but reads as a third-party aggregator rather than the
       model's home, and Paul reaches Seedance through Replicate in the /fox-video skill. The
       right URL depends on what he wants a reader to arrive at.
       HYPERFRAMES. hyperframes.com returns 503 "Maintenance mode"; hyperframe.ai is a live
       product called Hyperframe. Two plausible targets, one letter apart, and picking the
       wrong one publishes a broken recommendation under his name.
       Both are queued with him. */
    entries: [
      { name: "Clay", by: "clay.com", url: "https://clay.com" },
      { name: "Apify", by: "apify.com", url: "https://apify.com" },
      /* ⚠️ Also in "Companies I watch". He named it in both lists and both are true, so it
         is listed twice on purpose rather than silently deduplicated. Flagged to him. */
      { name: "Vercel", by: "vercel.com", url: "https://vercel.com" },
      { name: "Claude", by: "claude.ai", url: "https://claude.ai" },
      { name: "ChatGPT", by: "chatgpt.com", url: "https://chatgpt.com" },
      { name: "Gemini", by: "gemini.google.com", url: "https://gemini.google.com" },
      { name: "GetImg", by: "getimg.ai", url: "https://getimg.ai" },
      { name: "Smartlead", by: "smartlead.ai", url: "https://smartlead.ai" },
      { name: "Klaviyo", by: "klaviyo.com", url: "https://klaviyo.com" },
      { name: "Attio", by: "attio.com", url: "https://attio.com" },
      { name: "Supabase", by: "supabase.com", url: "https://supabase.com" },
      { name: "ElevenLabs", by: "elevenlabs.io", url: "https://elevenlabs.io" },
    ],
  },
];

/** How many shelf entries exist across every section. Drives the build view's honesty. */
export const SHELF_COUNT = SHELF.reduce((n, s) => n + s.entries.length, 0);
