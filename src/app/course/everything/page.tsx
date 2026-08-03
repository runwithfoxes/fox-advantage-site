import { MODULES } from "../courseModules";
import { MODULES_BY_N } from "../moduleData";
import EverythingClient, { type Row } from "./EverythingClient";

/**
 * /course/everything - THE LIBRARY.
 *
 * ⭐ THE ONE IDEA, agreed with Paul 2 Aug 2026: a module page is a LESSON and this is a
 * REFERENCE. They are different objects and were fighting for one page. The module page
 * is his order, read once. This is flat, searched, and consulted a hundred times.
 * Giving the reference its own home is what lets the module page stop being a catalogue.
 *
 * ⭐ PUBLIC BY DECISION, and it is doing a job. The modules sit behind an email; this
 * does not. Paul, 2 Aug: the course is free, so the only thing a gate would protect is
 * the capture. A page listing named, specific, usable things argues for the course
 * better than any landing copy, and it is what search and the AI engines can reach.
 *
 * ⭐ WHAT IS PUBLIC AND WHAT IS NOT. The artefacts are here: the prompts, the links.
 * The TEACHING is not, and never comes here: his prose, the figures, the video, Isa,
 * the order and the reason. A prompt without the lesson is a line of text you do not
 * know when to reach for. That is the line, and it is the answer to "is this a backdoor".
 *
 * ⭐ NOTHING IN HERE KNOWS HOW MANY ITEMS OR MODULES THERE ARE. Same doctrine as the
 * module page. Module 2 is a new array in moduleData.ts and this page fills itself.
 * A hand-maintained links page rots inside a month and is then worse than nothing.
 */

const DESC =
  "Every prompt and every link from the free AI course for marketers, on one page. Search it, copy what you need, take it with you.";

export const metadata = {
  title: "Everything from the course - Run with Foxes",
  description: DESC,
  openGraph: {
    title: "Everything from the course - Run with Foxes",
    description: DESC,
  },
};

export default function EverythingPage() {
  /* FLATTENED HERE, ON THE SERVER, so the whole list is in the HTML that search and the
     AI engines read. A client-side fetch would leave them an empty page. */
  const rows: Row[] = [];

  MODULES.forEach((m) => {
    const def = MODULES_BY_N[m.n];
    if (!def) return;
    def.items.forEach((item, i) => {
      /* ⛔ PLACEHOLDERS NEVER REACH A PUBLIC PAGE. On the module page Paul can see his
         own unwritten items behind ?build. Here, an item carrying "PAUL TO WRITE" would
         be published to strangers and to search. Hidden, and counted in the build view
         so it is never silently dropped. */
      if (item.placeholder) return;
      /* ⭐⭐ `links` AND `reading`, FLATTENED INTO ONE LIST HERE, 3 Aug 2026. This page was
         built on 2 Aug reading `links` only; `reading` was added to the Item type that same
         evening, hours later, and nothing connected the two. The result was silent and total:
         nine links went onto module 1 across 3 Aug and THE LIBRARY SHOWED NONE OF THEM, on
         the one page built to hold them. A slot added after a consumer is written is invisible
         to it, and no test fails.

         ⭐ THE MODULE PAGE'S DISTINCTION DOES NOT SURVIVE THE TRIP, ON PURPOSE. Over there
         `links` means the whole item IS other people's work (kindOf() reads it for the type
         chip) and `reading` is a footnote on an item about something else. That difference is
         about how a LESSON reads. Here every one of them is the same object: a link you can
         take. Merging them is the point of a reference. */
      const refs = [...(item.links ?? []), ...(item.reading ?? [])];

      rows.push({
        modN: m.n,
        modTitle: def.title,
        i: i + 1,
        t: item.t,
        text: item.text,
        prompt: item.prompt,
        refs: refs.length ? refs : undefined,
      });
    });
  });

  const hidden = MODULES.reduce((n, m) => {
    const def = MODULES_BY_N[m.n];
    return n + (def ? def.items.filter((it) => it.placeholder).length : 0);
  }, 0);

  /* Every module, built or not, so the page is honest that it grows rather than
     pretending six exist. Titles and dates come from courseModules.ts, never retyped. */
  const modules = MODULES.map((m) => ({
    n: m.n,
    /* courseModules titles carry Paul's "(1) " prefix because he put it there. The
       module page drops it, since its eyebrow already says which module it is. Same
       reasoning here: the row states the number. */
    title: m.title.replace(/^\(\d+\)\s*/, ""),
    when: m.when,
    has: Boolean(MODULES_BY_N[m.n]),
  }));

  return <EverythingClient rows={rows} modules={modules} hidden={hidden} />;
}
