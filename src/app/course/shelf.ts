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
    slug: "people",
    title: "People I follow",
    entries: [],
  },
  {
    slug: "companies",
    title: "Companies worth watching",
    entries: [],
  },
  {
    slug: "articles",
    title: "Articles worth your time",
    entries: [],
  },
  {
    slug: "tools",
    title: "Tools I use",
    entries: [],
  },
];

/** How many shelf entries exist across every section. Drives the build view's honesty. */
export const SHELF_COUNT = SHELF.reduce((n, s) => n + s.entries.length, 0);
