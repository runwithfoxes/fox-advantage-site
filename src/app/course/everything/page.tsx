import EverythingClient from "./EverythingClient";
import { buildLibrary } from "./build";

/* ⭐ REBUILT EVERY 5 MINUTES, same as /course, so a module's files turn clickable on its
   launch morning without a deploy. Without this the page is frozen at build time. */
export const revalidate = 300;

/**
 * /course/everything - THE LIBRARY.
 *
 * ⭐ THE ONE IDEA, agreed with Paul 2 Aug 2026: a module page is a LESSON and this is a
 * REFERENCE. They are different objects and were fighting for one page. The module page
 * is his order, read once. This is flat, searched, and consulted a hundred times.
 * Giving the reference its own home is what lets the module page stop being a catalogue.
 *
 * ⭐⭐ AN ITEM IS A FOLDER AND ITS ARTEFACTS ARE THE FILES INSIDE IT, 3 Aug 2026. Paul, on
 * the first version: "It doesn't look like a spreadsheet. It doesn't have the discipline and
 * neatness of a spreadsheet. I quite like how GitHub looks. I feel like it's got little
 * folders and links and things like this. This feels just vague and bloated."
 *
 * The folder framing is not decoration over the old list, it is the shape the data was
 * already in and the page was hiding: an item HAS a prompt and HAS links, so it is a
 * container, and the artefacts are its contents. It also settles where Paul's own
 * recommendations go, which was the open question of the same afternoon. Companies, people
 * and articles are SIBLING FOLDERS, not children of a lesson. No second page, and no second
 * axis in the filter bar.
 *
 * ⭐ PUBLIC BY DECISION, and it is doing a job. The modules sit behind an email; this
 * does not. Paul, 2 Aug: the course is free, so the only thing a gate would protect is
 * the capture. A page listing named, specific, usable things argues for the course
 * better than any landing copy, and it is what search and the AI engines can reach.
 * ⚠️ STILL NOT TRUE AS OF 3 Aug: nothing on the site links here and it is absent from
 * sitemap.ts, so neither search nor a learner can reach it. Paul has the fix queued.
 *
 * ⭐ WHAT IS PUBLIC AND WHAT IS NOT. The artefacts are here: the prompts, the links.
 * The TEACHING is not, and never comes here: his prose, the figures, the video, Isa,
 * the order and the reason. A prompt without the lesson is a line of text you do not
 * know when to reach for. That is the line, and it is the answer to "is this a backdoor".
 *
 * ⭐ NOTHING IN HERE KNOWS HOW MANY ITEMS OR MODULES THERE ARE. Same doctrine as the
 * module page. Module 2 is a new array in moduleData.ts and this page fills itself.
 * A hand-maintained links page rots inside a month and is then worse than nothing.
 * ⚠️ THE SHELF IS HAND-AUTHORED AND THAT DOES NOT BREAK THE RULE. The rule was never
 * "nothing typed by hand", it was "no SECOND COPY of a list that already exists". Nothing
 * derives Paul's recommendations, so `shelf.ts` is their only copy, the same way
 * `moduleData.ts` is the only copy of a module.
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
  /* FLATTENED ON THE SERVER, so the whole list is in the HTML that search and the AI engines
     read. The builder is build.ts, shared with /resources/library since 26 Sep 2026. */
  const { sections, modules, hidden, shelfCount } = buildLibrary();
  return (
    <EverythingClient
      sections={sections}
      modules={modules}
      hidden={hidden}
      shelfCount={shelfCount}
    />
  );
}
