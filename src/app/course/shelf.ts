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
      /* ⭐ ADDED 3 Aug 2026, his second batch: "Dan Shipper, https://x.com/danshipper, GREG
         ISENBERG https://x.com/gregisenberg, claire vo 🖤 @clairevo". He gave two URLs and
         one handle; the handle is read straight across to the same address rather than
         inferred from a name.

         ⭐ ALL THREE WERE VERIFIED AGAINST A CONTROL, which is the only way a check on X
         means anything: x.com serves a JavaScript shell, so a 200 alone proves nothing. A
         deliberately fake handle returns 404 and these three return 200, so the 200 is
         evidence rather than noise.

         ⚠️ Dan Shipper runs Every, which sits in "Companies I watch". Not a duplicate: it is
         his own filing rule working, the person under People and the publisher under
         Companies. */
      { name: "Dan Shipper", by: "x.com", url: "https://x.com/danshipper" },
      { name: "Greg Isenberg", by: "x.com", url: "https://x.com/gregisenberg" },
      { name: "Claire Vo", by: "x.com", url: "https://x.com/clairevo" },
      /* ⭐ ADDED 3 Aug 2026, his third batch: "I follow: https://substack.com/@neilperkin
         https://www.aibyaakash.com/ https://substack.com/@letstalkbranding
         https://substack.com/@kylepoyar", then "https://substack.com/@dotmartin" a moment
         later. In his order, his second message appended.

         ⭐⭐ A HANDLE IS NOT A NAME, AND TWO OF THESE WOULD HAVE BEEN WRITTEN WRONG FROM THE
         URL ALONE. `@letstalkbranding` is STEF HAMERLINCK, whose publication is what the
         handle is named after; `aibyaakash.com` is written by AAKASH GUPTA, which the site
         states itself ("by Aakash Gupta") rather than being inferred from the first name in
         the domain. Every row below was read off the page's own og:title.

         ⭐ AND THE SUBSTACK 200 IS WORTHLESS WITHOUT A CONTROL, exactly as x.com's is above.
         A deliberately fake handle also returns 200, because substack.com/@anything falls
         back to a SEARCH page: its og:title reads `Search "..." on Substack` while a real
         profile returns the person's name. The name in og:title is the evidence, never the
         status code.

         ⭐⭐ `@dotmartin` PUBLISHES NO SURNAME ANYWHERE, AND PAUL SUPPLIED IT: Martin O'Leary,
         3 Aug 2026. Nothing online could have given it. The profile page is JavaScript-
         rendered so its HTML says nothing, and the public profile API
         (`substack.com/api/v1/user/dotmartin/public_profile`) answers with the display name
         "Martin 🏹" and one publication, `uncharted` at thisisuncharted.substack.com, and no
         surname at all.

         ⭐ SO THE ROW SAT AS "Martin" AND WAS FLAGGED TO HIM RATHER THAN QUIETLY SETTLED,
         which is the only reason the right name is here now. ⛔ A plausible surname invented
         to finish the row would have looked exactly as complete as this one does. */
      { name: "Neil Perkin", by: "substack.com", url: "https://substack.com/@neilperkin" },
      { name: "Aakash Gupta", by: "aibyaakash.com", url: "https://www.aibyaakash.com" },
      {
        name: "Stef Hamerlinck",
        by: "substack.com",
        url: "https://substack.com/@letstalkbranding",
      },
      { name: "Kyle Poyar", by: "substack.com", url: "https://substack.com/@kylepoyar" },
      { name: "Martin O'Leary", by: "uncharted", url: "https://substack.com/@dotmartin" },
      /* ⭐ ADDED 3 Aug 2026, Paul: "i follow Thariq Thariq @trq212 https://x.com/trq212".
         The handle is real on the same control test as the rows above, a made-up handle
         returns 404 where this returns 200.

         ⭐⭐ HE DICTATED "Thariq Thariq" AND THE NAME IS ONE WORD. Nothing server-side could
         settle it: x.com serves a JavaScript shell with no og:title on profiles, the
         syndication timeline endpoint returns zero bytes, and a reader proxy came back
         without it. What settled it was RENDERING the profile in a browser, where the page's
         own title reads "Thariq (@trq212) / X". So the row says Thariq.

         ⭐ THE LESSON IS THE ORDER, not the answer. The row was written as he said it and
         flagged, and only corrected once the profile itself was seen. ⛔ A doubled word is
         the commonest artefact of dictation, but "probably a repetition" is not evidence,
         and a plausible surname invented to fill the gap would have been worse than both. */
      { name: "Thariq", by: "x.com", url: "https://x.com/trq212" },
      /* ⭐ ADDED 3 Aug 2026, his fourth batch: "Boris Cherny https://x.com/bcherny", then
         "Peter Steinberger 🦞 @steipete https://x.com/steipete", then "https://x.com/karpathy
         Andrej Karpathy". In his order.

         ⭐ ALL THREE HANDLES PASS THE CONTROL and all three names were read off X's own page
         title, which is the method that finally settled Thariq: a rendered profile titles
         itself "Boris Cherny (@bcherny) / X", where the raw HTML says nothing at all.

         ⚠️ THE LOBSTER IS DROPPED, same as Martin's 🏹 above. An emoji is decoration on a
         display name rather than part of a person's name, and the two rows should not
         disagree about that. Paul pasted it, so it is FLAGGED not assumed: if he wants the
         lobster it goes straight back.

         ⛔ AND KARPATHY WAS NOT ADDED WHEN HE APPEARED IN A BROWSER TAB. A profile open on
         Paul's screen mid-session is something seen, not something asked for; the row was
         written only once he typed the name. The distinction matters more here than anywhere
         else in this file, because a list of people is published under his name. */
      { name: "Boris Cherny", by: "x.com", url: "https://x.com/bcherny" },
      { name: "Peter Steinberger", by: "x.com", url: "https://x.com/steipete" },
      { name: "Andrej Karpathy", by: "x.com", url: "https://x.com/karpathy" },
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
    /* ⭐ PAUL'S OWN LIST, 3 Aug 2026, verbatim: "articles for library:
       https://runwithfoxes.com/chapter/ch12-critical-thinking-has-never-been-more-critical
       https://runwithfoxes.com/chapter/ch16-fox-behaviours
       https://substack.com/home/post/p-208545548". In his order. The first entries this
       section has ever held.

       ⭐ THE THIRD URL IS NOT WHERE THE PIECE LIVES. `substack.com/home/post/p-208545548`
       is Substack's reader wrapper and 302s to `ruben.substack.com/p/1800-hours-of-claude`.
       The canonical URL is written here instead, because the wrapper is a logged-in reading
       surface rather than the post's address. Same read-through as "appify" -> Apify in
       Tools: follow what he pointed at, then write down what it actually is.

       ⭐ THE CHAPTER TITLES CARRY A NUMBER AND IT IS STRIPPED. Both pages return their
       position in the book ("09. Critical thinking...", "13. Fox behaviours"), which is a
       reading order that moves when the book is reordered, not part of the title. The
       library's own module rows already drop `courseModules`' "(1) " prefix for the same
       reason. Every title below was read off the page's own <title>; the Substack author
       and publication were read off the post itself, not inferred from the subdomain.

       ⭐⭐ THE TWO CHAPTERS ARE RELATIVE AND THE REST ARE ABSOLUTE, AND THAT IS THE POINT.
       He sent them as `https://runwithfoxes.com/chapter/...`, but this page IS
       runwithfoxes.com, so an absolute link jumps a reader on localhost or on a Vercel
       preview straight to production, and nothing about the page looks wrong when it does.
       `/chapter/...` is what the rest of the site uses for internal links (see
       `StudentsContent.tsx`) and the row still opens in a new tab, because the anchor sets
       `target="_blank"` regardless. ⛔ Never "tidy" these back to absolute for consistency
       with the rows around them: the other entries are genuinely somewhere else.

       ⭐ HIS NAME GOES ON HIS OWN CHAPTERS, his call 3 Aug when asked: "yes put my name on my
       articles". So every row here reads author-then-publication in one shape, and a student
       can tell at a glance which two are Paul's. ⛔ Not redundancy to be tidied away on a site
       that is already his.

       ⛔ NO `note` ON ANY OF THEM. His to write, and the section is correct without one. */
    entries: [
      {
        name: "Critical thinking has never been more critical",
        by: "Paul Dervan, The Fox Advantage",
        url: "/chapter/ch12-critical-thinking-has-never-been-more-critical",
      },
      {
        name: "Fox behaviours",
        by: "Paul Dervan, The Fox Advantage",
        url: "/chapter/ch16-fox-behaviours",
      },
      {
        /* The trailing full stop is the publisher's, kept rather than tidied. */
        name: "27 Claude tips after 1,800 hours.",
        by: "Ruben Hassid, How to AI",
        url: "https://ruben.substack.com/p/1800-hours-of-claude",
      },
      /* ⭐⭐ HE SENT THIS ONE IN THE "I FOLLOW" MESSAGE AND IT IS FILED HERE ANYWAY, because
         it is a POST rather than a person: `substack.com/home/post/p-209120273`, which 302s
         to `knowledge.gtmstrategist.com/p/5-gtm-skills-ai-agent-should-run`. That is his own
         rule from earlier the same day doing its job unprompted, a shelf entry is filed by
         WHAT IT IS and not by the message it arrived in. Maja Voje is not in People and this
         does not put her there. */
      {
        name: "5 GTM Skills Your AI Agent Should Be Running by Now",
        by: "Maja Voje, GTM Strategist",
        url: "https://knowledge.gtmstrategist.com/p/5-gtm-skills-ai-agent-should-run",
      },
      /* ⭐ ADDED 3 Aug 2026, Paul: "x article showing video game built through claude". It is
         a post carrying a VIDEO rather than an article, which is why this section is named
         for both. Posted 25 Jul 2026.

         ⭐⭐ A POST HAS NO TITLE, SO THE NAME IS HIS FIRST LINE VERBATIM. That is the only
         honest option here: a headline written by us to summarise someone else's post is the
         same fabrication as writing a `note`, and it would sit on the page unattributed.
         Quoting him means the row makes MATT SHUMER'S claim in Matt Shumer's words, which is
         what a link list does. ⚠️ Note that it IS a claim ("one-shotted"), not a finding, and
         Paul has not endorsed it. If he ever wants distance from it, the fix is his own
         `note`, never a rewritten name.

         ⭐ VERIFIED AGAINST A CONTROL, the same discipline as the x.com rows in People: a
         made-up status id under the same handle returns 404 while this returns 200. The text,
         the author's display name and the date were read from Twitter's own syndication
         endpoint (`cdn.syndication.twimg.com/tweet-result?id=...`), because x.com itself
         serves a JavaScript shell that tells you nothing. */
      {
        name: "Claude Opus 5 one-shotted this game.",
        by: "Matt Shumer, x.com",
        url: "https://x.com/mattshumer_/status/2081054356405731740",
      },
      /* ⭐ ADDED 3 Aug 2026, Paul: "article https://x.com/trq212/status/2052809885763747935".
         Posted 8 May 2026.

         ⭐⭐ THIS ONE HAS A REAL TITLE AND THE POST IS NOT WHERE IT LIVES. The post carries NO
         text, just a t.co link, which expands to `x.com/i/article/2052796100608974848`, one of
         X's own long-form Articles. So unlike the Matt Shumer row above, this is not a post
         being quoted, it is an article with a headline: "Using Claude Code: The Unreasonable
         Effectiveness of HTML".

         ⭐ THE STATUS URL IS KEPT ANYWAY, and that is the opposite call to the Substack
         wrappers earlier in this section, for a reason. Those wrappers were a generic reader
         surface that any post could sit behind; this status is Thariq's own post of his own
         article, and it is the form that opens for a reader. The bare `/i/article/` URL 403s
         to anything that is not a logged-in browser.

         ⭐ HE IS ALSO IN "People I follow" and this is not a duplicate, by Paul's own filing
         rule: the person is a person, the piece is a piece. Same as Dan Shipper and Every. */
      {
        name: "Using Claude Code: The Unreasonable Effectiveness of HTML",
        by: "Thariq, x.com",
        url: "https://x.com/trq212/status/2052809885763747935",
      },
    ],
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
      /* ⭐ THE TOOL'S OWN HOME, like every other row here. seedance.ai resolves and is not
         it; the model is ByteDance's and this is ByteDance's page for it. Paul reaches it
         through Replicate (replicate.com/bytedance/seedance-1-pro, also live) in the
         /fox-video skill, and that link would have been the odd one out in a list where
         everything else points at the product rather than at a reseller. */
      { name: "Seedance", by: "seed.bytedance.com", url: "https://seed.bytedance.com/en/seedance" },
      /* ⭐⭐ HEYGEN'S, AND PAUL'S "HGN" IS WHAT FOUND IT. Both of the addresses guessed from
         the name alone were wrong and both were live, which is the worst version of wrong:
         hyperframes.com is an unrelated domain in maintenance mode, and hyperframe.ai
         (singular) is a different business-video product by different people. HyperFrames
         plural is HeyGen's open-source framework for rendering video from HTML, source at
         github.com/heygen-com/hyperframes.
         ⛔ THE LESSON, NOT THE FACT: a name is not an address. Two live sites one letter
         apart, and nothing about either would have announced the mistake once published. */
      { name: "HyperFrames", by: "heygen.com", url: "https://hyperframes.heygen.com" },
      /* ⭐ ADDED 3 Aug 2026, Paul: "tool: https://www.monologue.to/". Its own title reads
         "Monologue - Dictation, voice notes, and bot-free meeting notes", Mac and iOS.
         The row carries the product name only, same as every tool above it: the strapline
         is the vendor's copy, not a `note` from Paul. */
      { name: "Monologue", by: "monologue.to", url: "https://www.monologue.to" },
    ],
  },
];

/** How many shelf entries exist across every section. Drives the build view's honesty. */
export const SHELF_COUNT = SHELF.reduce((n, s) => n + s.entries.length, 0);
