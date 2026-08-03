import { MODULES } from "../courseModules";
import { MODULES_BY_N } from "../moduleData";
import { SHELF, SHELF_COUNT } from "../shelf";
import EverythingClient, {
  type FileRow,
  type Row,
  type Section,
} from "./EverythingClient";

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
  /* FLATTENED HERE, ON THE SERVER, so the whole list is in the HTML that search and the
     AI engines read. A client-side fetch would leave them an empty page. */
  const lessonRows: Row[] = [];

  MODULES.forEach((m) => {
    const def = MODULES_BY_N[m.n];
    if (!def) return;
    def.items.forEach((item, i) => {
      /* ⛔ PLACEHOLDERS NEVER REACH A PUBLIC PAGE. On the module page Paul can see his
         own unwritten items behind ?build. Here, an item carrying "PAUL TO WRITE" would
         be published to strangers and to search. Hidden, and counted in the build view
         so it is never silently dropped. */
      if (item.placeholder) return;

      const files: FileRow[] = [];

      if (item.prompt) {
        files.push({
          kind: "prompt",
          /* Paul, 2 Aug, on the module page's copy buttons: name WHAT is being copied so
             no surrounding label has to. The same label works as a filename here. */
          name: item.promptLabel ?? "The prompt",
          meta: `${item.prompt.split("\n").length} lines`,
          body: item.prompt,
        });
      }

      /* ⭐⭐ `links` AND `reading`, FLATTENED INTO ONE LIST, 3 Aug 2026. This page was built
         on 2 Aug reading `links` only; `reading` was added to the Item type that same evening,
         hours later, and nothing connected them. The result was silent and total: nine links
         went onto module 1 across 3 Aug and THE LIBRARY SHOWED NONE OF THEM, on the one page
         built to hold them. A slot added after a consumer is written is invisible to it, and
         no test fails.

         ⭐ THE MODULE PAGE'S DISTINCTION DOES NOT SURVIVE THE TRIP, ON PURPOSE. Over there
         `links` means the whole item IS other people's work (kindOf() reads it for the type
         chip) and `reading` is a footnote on an item about something else. That difference is
         about how a LESSON reads. Here every one of them is the same object: a file you can
         take. Merging them is the point of a reference. */
      [...(item.links ?? []), ...(item.reading ?? [])].forEach((L) => {
        files.push({ kind: "link", name: L.title, meta: L.by, url: L.url });
      });

      /* ⭐⭐ THE BEATS GO INTO THE SEARCH TEXT, 3 Aug 2026, and they are the reason to check
         rather than assume. `beats` was added the same afternoon as `reading` and hit the
         same wall: this page searched `text` only, so the four passages of item 07 (the
         YouTube transcript, GetImg, copyright, the wireframe) were invisible. Searching
         "transcript" on the library returned nothing while the word sat in Paul's own copy on
         the module page. Third slot in one file to be added behind its consumer, so the
         lesson is the pattern, not the field: ANYTHING THAT HOLDS HIS PROSE MUST BE ADDED
         HERE THE DAY IT IS ADDED THERE. */
      const prose = [item.text, ...(item.beats ?? []).map((b) => b.text ?? "")];

      lessonRows.push({
        type: "folder",
        key: `m${m.n}-i${i + 1}`,
        modN: m.n,
        name: item.t,
        desc: firstSentence(item.text),
        href: `/course/${m.n}#i${i + 1}`,
        files,
        search: [item.t, ...prose, def.title, item.prompt ?? "", ...files.map((f) => `${f.name} ${f.meta ?? ""}`)]
          .join(" ")
          .toLowerCase(),
      });
    });
  });

  const hidden = MODULES.reduce((n, m) => {
    const def = MODULES_BY_N[m.n];
    return n + (def ? def.items.filter((it) => it.placeholder).length : 0);
  }, 0);

  const sections: Section[] = [
    {
      slug: "lessons",
      title: "From the lessons",
      kind: "lessons",
      rows: lessonRows,
    },
    /* ⛔ EVERY SHELF SECTION IS EMPTY UNTIL PAUL WRITES IT, and an empty one is HIDDEN from
       the public page rather than published as a heading over nothing. It stays visible under
       ?build so he can see its shape and so it is never quietly forgotten. See shelf.ts. */
    ...SHELF.map<Section>((s) => ({
      slug: s.slug,
      title: s.title,
      blurb: s.blurb,
      kind: "shelf",
      rows: s.entries.map<Row>((e, j) => ({
        type: "file",
        key: `${s.slug}-${j}`,
        name: e.name,
        meta: e.by,
        url: e.url,
        note: e.note,
        search: [e.name, e.by ?? "", e.note ?? "", s.title].join(" ").toLowerCase(),
      })),
    })),
  ];

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

  return (
    <EverythingClient
      sections={sections}
      modules={modules}
      hidden={hidden}
      shelfCount={SHELF_COUNT}
    />
  );
}

/**
 * The first sentence of Paul's prose, as a folder's one-line description.
 * ⛔ NEVER REWRITE HIS WORDS TO FIT. Taking his opening sentence is a cut, which is
 * reversible and honest. Summarising would put words in his mouth on a public page.
 */
function firstSentence(text: string): string {
  const m = text.match(/^[\s\S]*?[.?!](?=\s|$)/);
  const out = (m ? m[0] : text).trim();
  return out.length > 150 ? out.slice(0, 147).trimEnd() + "..." : out;
}
