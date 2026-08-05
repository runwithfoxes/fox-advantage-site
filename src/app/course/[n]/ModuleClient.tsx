"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import ModuleIsa from "./ModuleIsa";
import ModuleArrival from "./ModuleArrival";
import FolderWindow from "./FolderWindow";
import ChatWindow from "./ChatWindow";
import {
  KITE_SESSION,
  KITE_POST_SESSION,
  KITE_DATA_SESSION,
} from "../writerSession";
import { Figure } from "../figures/Figure";
import figStyles from "../figures/Figure.module.css";
import {
  kindOf,
  slugOf,
  type Item,
  type Kind,
  type ModuleDef,
} from "../moduleData";

/**
 * ⚠️ EXPERIMENT, 2 Aug 2026, UNCOMMITTED. The counter strip and the "0 of N done" bar are
 * switched off and the arrival block (welcome, video placeholder, fluency slider) sits in
 * their place. Set this back to true and delete the <ModuleArrival /> line to restore the
 * page exactly as it was.
 */
const SHOW_COUNTERS = false;

/**
 * ⭐⭐ THE /files SECTION IS HIDDEN, 4 Aug 2026. Paul: "I don't think any of this stuff
 * should be on the page, do you?... can you hide them to take them out of my way so I can't
 * see them?"
 *
 * ⛔ NOTHING IS DELETED. Set this to true and the two file sets return exactly as they were.
 * The same discipline as the prototype's FOCUS flag and SHOW_COUNTERS above: a page being
 * worked on gets things taken out of the way, not out of the repo.
 *
 * ⚠️⚠️ IT IS NOT A CLEAN CUT AND THIS IS WHAT IS CURRENTLY UNREACHABLE BECAUSE OF IT:
 *   `segment-emails`, `brand-interviewer`, `format-email`, `format-blog`, `format-web-page`.
 * Items 02 and 03 carry nine of the fourteen between them; those five appear nowhere else,
 * and the library lists but cannot SERVE them while module 2 is `built: false`. Kite's six
 * also lose Download and Copy, because item 02's window reads and does not take.
 *
 * ⭐ THE SECTION IS A SYMPTOM RATHER THAN A MISTAKE. It holds the files that have no lesson
 * yet: the interviewer belongs wherever someone is told what to do without positioning work,
 * the three `format-*` files belong to a lesson about writing an email or a blog, and
 * `segment-emails` is the output and belongs at the end. When the walkthrough is written
 * they each go to their own item, this section empties itself, and the flag can be deleted
 * along with what it hides. ⛔ Do not ship with it hidden and those five still homeless.
 */
const SHOW_FILES = false;

/**
 * A MODULE PAGE. Renders whatever is in the module's item array.
 *
 * ⭐ NOTHING IN HERE KNOWS HOW MANY ITEMS THERE ARE, or what module it is drawing.
 * That is the whole design. Module 2 is a new data file, not a new component.
 * Spec: ~/paul-hub/intelligence/course-build/module-format-spec.md
 *
 * Ported 19 Jul 2026 from prototype v7, which Paul reacted to across seven rounds.
 * The rules he set on the way, all enforced here:
 *  - SOLID BLUE MEANS "YOU CAN CLICK THIS" AND NOTHING ELSE. Type labels are quiet
 *    outlines. He caught them looking like buttons when they were solid.
 *  - FILTERS ARE ONE AT A TIME. Multi-select confused him.
 *  - EVERY ITEM OPENS. He tried to open a read-only item and nothing happened.
 *  - NAME THE MECHANISM. "Copy link" and "Copy text", never "Link to this". Same
 *    discipline as "we'll email you" beating "we'll tell you" on the course home.
 *  - THE BUILD LAYER NEVER LEAKS. What is missing, how many grabs are outstanding and
 *    what is placeholder is for Paul while building. A member sees none of it.
 */

/**
 * ⭐ AN ITEM'S PICTURE, ABOVE ITS PROSE. Paul, 2 Aug 2026: "put the figures above my
 * writing. They are like a simple banner and then I explain below."
 *
 * ⭐⭐ ONE COMPONENT FOR BOTH RENDERS, and that is not tidiness. The opened window used to
 * draw `figure` and NOT `figureFile`, so the CFO showed its drawing in the list and lost it
 * on open, and the same file lost `reading` the same way. Two fields, one mistake, twice.
 * Anything an item CARRIES is drawn here now, so the list and the reader cannot disagree.
 *
 * ⛔ ONE FIGURE HERE, ALWAYS, even for an item that carries four. Paul, 3 Aug, correcting a
 * first attempt that stacked them all in the list: "We show one figure only. And then we show
 * them all in the longer article with my copy after each one." The rest live in `beats` and
 * are drawn only inside the opened window.
 *
 * ⚠️ THE GRAB PLACEHOLDER IS LIST-ONLY, on purpose. It is a window drawn where a screenshot
 * Paul has not taken yet will go, so it is build scaffolding rather than something a learner
 * is meant to study. Pass `build` to label it.
 */
function ItemPicture({
  item,
  build,
  showGrab = true,
}: {
  item: Item;
  build?: boolean;
  showGrab?: boolean;
}) {
  if (item.figure) {
    return <Figure name={item.figure} className={figStyles.banner} />;
  }
  if (item.figureFile) {
    return <FigureFile src={item.figureFile} banner />;
  }
  if (item.grab && showGrab) {
    return (
      <div className="mod-win mod-win-banner">
        <div className="mod-winbar">
          <span className="mod-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="mod-wintitle">{item.grab}</span>
          {build && <span className="mod-winright">grab needed</span>}
        </div>
        <div className="mod-shot" data-ph="" />
      </div>
    );
  }
  return null;
}

/**
 * ⭐ THE ITEM'S FILES, AS LINKS AT ITS FOOT. Paul, 4 Aug 2026: "just put them as links like
 * we do links for extended reading."
 *
 * ⭐⭐ IT REUSES `.mod-reading` VERBATIM RATHER THAN GETTING ITS OWN LOOK, and that is the
 * instruction rather than laziness: he named the existing treatment. Two blocks that do the
 * same job at the foot of an item should not look like two different inventions.
 *
 * ⭐ THE HREF IS THE `.md`, NOT THE `.html`. The route sends markdown with a download
 * disposition, and markdown is the thing that goes into a Claude project. These three are
 * TAKEAWAYS, so the link has to hand over the file, not show a reading copy of it.
 */
function DocLinks({
  docs,
  onCopy,
}: {
  docs?: Item["docs"];
  onCopy: (msg: string) => void;
}) {
  /* ⛔ STATE BEFORE THE EARLY RETURN. Hooks cannot sit behind a conditional. */
  const [open, setOpen] = useState<string | null>(null);
  if (!docs || docs.as !== "links") return null;

  /* ⭐ A FILE MAY CARRY ITS OWN EXTENSION, 5 Aug 2026, for the dataset's csv. A bare name
     still means `.md`, so every existing list reads exactly as before. The shown name stays
     the bare name either way: the name is a name, the actions are named. */
  const fileOf = (f: string) => (f.includes(".") ? f : `${f}.md`);
  const baseOf = (f: string) => (f.includes(".") ? f.slice(0, f.lastIndexOf(".")) : f);
  const isMd = (f: string) => fileOf(f).endsWith(".md");
  /* The folder window reads markdown. Non-md files stay out of it and open their own
     reading page instead, so the window component needs no new knowledge. */
  const mdFiles = docs.files.filter(isMd);

  /* ⭐ COPY AS WELL AS OPEN, 4 Aug 2026. Paul: "as well of them being links that they can
     click on and open, they should be able to just click and copy in the same way we did
     for module 1... We had a copy CFO prompt."

     ⭐⭐ AND COPY IS THE REAL AFFORDANCE HERE. These files exist to be pasted into a Claude
     project. Opening one shows a person a page they then have to select and copy by hand,
     which is the long way round to the only thing they came for. The link stays because
     somebody will want to read before they take.

     ⚠️ IT FETCHES THE MARKDOWN RATHER THAN HOLDING IT. The `.md` is the file that goes into
     the project, it is served behind the same door as the page, and bundling ~600 words x
     three into the client would ship them to anyone who views source, which is the hole
     `course-files/` was moved out of `public/` to close. */
  const copy = async (f: string) => {
    try {
      const r = await fetch(`/api/course-file/${docs.dir}/${fileOf(f)}`);
      if (!r.ok) throw new Error(String(r.status));
      await navigator.clipboard.writeText(await r.text());
      onCopy(`${fileOf(f)} copied`);
    } catch {
      /* ⛔ Say so. A silent failure here looks exactly like a successful copy, and the
         person only finds out when they paste nothing into their project. */
      onCopy("Copy failed");
    }
  };

  return (
    <div className="mod-reading">
      <span className="mod-readinglbl">The files</span>
      {docs.files.map((f) => (
        <span key={f} className="mod-filerow">
          {/* ⛔⛔ THE NAME IS A NAME. THE ACTIONS ARE NAMED. Paul, 4 Aug: "the UX is not
              entirely clear. I think we need to have a link that says open, a link that says
              download, and a link that says copy."

              ⭐ TWO EARLIER VERSIONS BOTH ASKED THE READER TO INFER, and that is the lesson.
              First the filename downloaded, then the filename opened and `.MD` downloaded.
              Either way the reader has to guess what clicking a word will do, and guess again
              at what an extension means. A verb cannot be misread. */}
          <span className="mod-filename">{baseOf(f)}</span>
          <span className="mod-fileacts">
            {isMd(f) ? (
              <button
                type="button"
                className="mod-fileact"
                aria-expanded={open === f}
                onClick={() => setOpen(open === f ? null : f)}
              >
                {open === f ? "Close" : "Open"}
              </button>
            ) : (
              /* A non-md has no place in the folder window, so Open shows its reading
                 page: the same .html twin every markdown file has, in a new tab. */
              <a
                className="mod-fileact"
                href={`/api/course-file/${docs.dir}/${baseOf(f)}.html`}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            )}
            <a
              className="mod-fileact"
              href={`/api/course-file/${docs.dir}/${fileOf(f)}`}
              download
            >
              Download
            </a>
            <button
              type="button"
              className="mod-fileact"
              onClick={() => copy(f)}
            >
              Copy
            </button>
          </span>
        </span>
      ))}
      {open && (
        <div className="mod-slot">
          <FolderWindow
            name={docs.folder}
            dir={docs.dir}
            files={mdFiles.map((x) => ({ file: x, label: `${x}.md` }))}
            start={mdFiles.indexOf(open)}
          />
        </div>
      )}
    </div>
  );
}

/**
 * ⭐⭐ THE SLOTS AN ITEM'S PROSE CAN STAND OPEN, built in ONE place, 5 Aug 2026. Both
 * renders call this, for the same reason both call ItemPicture: the opened window used to
 * render `Body` with no slots at all, so item 04's two recordings and item 02's folder
 * silently VANISHED on open, and the marker line was swallowed without a trace. That is the
 * exact drift the 3 Aug unification note warns about, one field later.
 */
function slotsFor(it: Item): Record<string, React.ReactNode> {
  return {
    FOLDER:
      it.docs && it.docs.as !== "links" ? (
        <FolderWindow
          name={it.docs.folder}
          dir={it.docs.dir}
          files={it.docs.files.map((f) => ({
            file: f,
            label: `${f}.md`,
          }))}
        />
      ) : undefined,
    SESSION: it.session ? (
      <ChatWindow
        session={KITE_SESSION}
        start={"A real session with Kite’s writer, start to finish."}
      />
    ) : undefined,
    SESSION_POST: it.session ? (
      <ChatWindow
        session={KITE_POST_SESSION}
        start={"A second ask: a social post, and a gap in the pack."}
      />
    ) : undefined,
    /* ⭐ The dataset recording. A different job, so a different title bar: the window
       says "an analyst", and the refs quote raw CSV rows. */
    SESSION_DATA: it.session ? (
      <ChatWindow
        session={KITE_DATA_SESSION}
        start={"Kite’s own numbers, checked before they are believed."}
        title="an analyst"
      />
    ) : undefined,
  };
}

/**
 * ⭐ ADDITIONAL READING. A subhead and a stacked list, at the END of an item.
 * Paul, 3 Aug 2026: "in the same way I write any article, I'd have a little subhead at the
 * very end that says additional reading, and then just a whole bunch of links."
 *
 * ⭐⭐ IT IS ONE COMPONENT BECAUSE AN ITEM RENDERS TWICE, and this file has now lost a field
 * on the second render twice over. The opened window never drew `figureFile`, so the CFO
 * silently lost its drawing on open, and it never drew `reading` at all, so Paul clicked
 * Create Projects and found his three links gone. Both were the same mistake: the inline
 * item was edited and the reader was not. Anything an item CARRIES goes in a shared
 * component from here on, so the two renders cannot drift again.
 *
 * ⚠️ SIZED FOR EIGHT. Paul expects "five, six, seven, eight, even more links for each
 * section... That's part of the value", so nothing here is written per link and adding a
 * ninth costs nothing.
 */
function ReadingList({ reading }: { reading?: Item["reading"] }) {
  if (!reading || reading.length === 0) return null;
  return (
    <div className="mod-reading">
      <span className="mod-readinglbl">Additional reading</span>
      {reading.map((R, j) => (
        <a
          key={j}
          className="mod-readinglink"
          href={R.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {R.title}
          <i>{R.by}</i>
        </a>
      ))}
    </div>
  );
}


/* ⭐ "/api/course-file/module-2/kite/audience.md" -> "module-2/kite". The served root is
   everything between the route prefix and the filename. Derived so a renamed heading or a
   moved folder cannot put the window on the wrong directory while nothing fails. */
function dirOf(take: string) {
  return take
    .replace(/^\/api\/course-file\//, "")
    .split("/")
    .slice(0, -1)
    .join("/");
}

const BUILD_PARAM = "build";

/**
 * ⭐ A LONG PROMPT IS A BUTTON, NOT A WALL. Paul, 2 Aug 2026, showing Spiral's
 * "COPY PROMPT FOR AGENT": "this is how everyone does it. We don't see the prompt. We
 * just click."
 *
 * The CFO persona is 828 words. Printed in full it buries the item, and it buries the
 * next item too, which is the opposite of what a hack is meant to feel like. Nobody
 * reads a system prompt before pasting it; they take it and use it.
 *
 * ⚠️ SHORT PROMPTS STAY VISIBLE, and that is not an oversight. Item 02's prose says
 * "try a prompt like the one below", so hiding it would break the sentence pointing at
 * it. A five-line prompt is READING material; an 800-word persona is CARGO. The
 * threshold is what separates them.
 *
 * ⛔ THERE IS NO "SHOW IT" TOGGLE. The first attempt had one, plus a word count and the
 * box around it, and Paul cut all three. A long prompt is one button. If someone wants
 * to read 828 words before pasting them, they can paste them and read them there.
 */
const PROMPT_IS_LONG_AT = 120; /* words */

function PromptBlock({
  text,
  label,
  onCopy,
}: {
  text: string;
  label?: string;
  onCopy: () => void;
}) {
  const long = text.trim().split(/\s+/).length > PROMPT_IS_LONG_AT;

  /* ⭐ A LONG PROMPT IS ONE BUTTON AND NOTHING ELSE. First attempt kept the box, a word
     count and a "show it" toggle, and Paul killed all three on sight: "this is ugly, not
     neat and clean... it is confusing. We can just use the copy button." He is right that
     the extra furniture was explaining a control that explains itself. The label names
     WHAT is being copied, so nothing else has to. */
  if (long) {
    return (
      <button type="button" className="mod-promptbtn" onClick={onCopy}>
        {label ?? "Copy prompt"}
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <rect x="0.5" y="0.5" width="7" height="9" fill="none" stroke="currentColor" />
          <path d="M4.5 2.5h7v9h-7" fill="none" stroke="currentColor" />
        </svg>
      </button>
    );
  }

  /* Short prompts stay visible. Item 02's prose says "try a prompt like the one below",
     so hiding five lines would break the sentence pointing at them. A short prompt is
     reading material; an 800-word persona is cargo. */
  return (
    <div className="mod-copybox">
      <div className="mod-copyhead">
        <span>Paste this into Claude or ChatGPT</span>
        <button type="button" onClick={onCopy}>
          Copy
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

/**
 * A figure that lives as its own file under /public rather than in the figures library.
 * See the `figureFile` note in moduleData.ts for why this is an <img> and not inlined:
 * the standalone export carries UNSCOPED css on purpose, so inlining it would repaint
 * every other figure on the page. An <img> gives the SVG its own document.
 *
 * It reuses the figures' own plate, so a library figure and a file figure sit on the
 * same surface and nobody can tell which is which by looking.
 */
function FigureFile({ src, banner }: { src: string; banner?: boolean }) {
  return (
    <div
      className={
        banner ? `${figStyles.plate} ${figStyles.banner}` : figStyles.plate
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- an SVG that animates
          itself; next/image would rasterise it and the animation would be lost. */}
      <img src={src} alt="" />
    </div>
  );
}

/**
 * An item's prose. Splits on a blank line so Paul can dictate more than one paragraph
 * and get more than one paragraph, which he could not before: `text` rendered into a
 * single <p>, so his breaks vanished and three thoughts ran together as a wall.
 * Added 2 Aug 2026 when item 01's text became three paragraphs.
 */
/**
 * ⭐ A NUMBERED LIST, added 3 Aug 2026 because Paul wrote one. His research copy runs "A few
 * things." and then three lines beginning "1 - ", "2 - ", "3 - ".
 *
 * ⛔ WITHOUT THIS THEY COLLAPSE ONTO ONE LINE. Body splits on BLANK lines only, and HTML
 * collapses a single newline to a space, so his three points would have run together as one
 * sentence. The other way out was a blank line between each, which puts a 30px paragraph gap
 * between three things that belong together and stops reading as a list at all.
 *
 * ⚠️ IT IS DETECTED, NOT DECLARED, and that is a deliberate exception to the rule this page
 * follows elsewhere. A wrong guess here is NOT silent: the numbers are visible in his own
 * copy, so a list that failed to render as a list is on screen in front of him. Compare the
 * type badges, cut the same day, where a wrong guess looked exactly like a right one.
 * The test is strict: EVERY line in the block must be numbered, or it stays prose.
 */
const NUMBERED = /^\s*\d+\s*[-.)]\s+/;

/* ⭐⭐ A BULLETED LIST, added 4 Aug 2026 because Paul dictated one and the page could only
   make a list out of NUMBERED lines. His five things for item 02 are "your brand
   positioning / your target audiences or segments / insights about them or their pain
   points / your key messages / your tone of voice".

   ⛔ THEY ARE A SET, NOT A SEQUENCE, so they must not be numbered. This is the same ruling
   as the three boxes on 26 Jul: "they're not part one, part two, and part three. They don't
   go in that order." Numbering them would assert an order he did not give.

   ⚠️ Without this, a multi-line block that is not numbered falls through to the <p> branch
   below and the newlines collapse, so five things render as one run-on sentence. It fails
   silently and reads as sloppy writing rather than a missing feature. */
const BULLET = /^\s*[-•]\s+/;

/* ⭐ A SLOT IN THE MIDDLE OF THE PROSE. `{{FOLDER}}` on its own line is replaced by whatever
   node is passed in, so an artifact can sit at the point in the argument that earned it
   rather than being stuck after every paragraph. Paul, 4 Aug: "Let's put the figure after
   the word following things". */
const SLOT_RE = /^\{\{([A-Z_]+)\}\}$/;

function Body({
  text,
  ph,
  slots,
}: {
  text: string;
  ph?: boolean;
  /** ⭐ `{{NAME}}` alone on a line renders slots[NAME]. Generic on purpose: item 02 wanted a
      folder and item 04 wanted a session, and a second hard-coded marker would have been the
      third copy of the same idea. */
  slots?: Record<string, React.ReactNode>;
}) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => {
        const m = para.trim().match(SLOT_RE);
        if (m) {
          /* ⛔ Renders nothing if the item has no such slot, rather than printing the marker.
             A visible {{FOLDER}} on a live page is worse than a missing artifact. */
          const node = slots?.[m[1]];
          return node ? (
            <div key={i} className="mod-slot">
              {node}
            </div>
          ) : null;
        }
        const lines = para.split("\n").filter((l) => l.trim());
        if (lines.length > 1 && lines.every((l) => NUMBERED.test(l))) {
          return (
            <ol key={i} className="mod-list" data-ph={ph ? "" : undefined}>
              {lines.map((l, j) => (
                <li key={j}>{l.replace(NUMBERED, "")}</li>
              ))}
            </ol>
          );
        }
        if (lines.length > 1 && lines.every((l) => BULLET.test(l))) {
          return (
            <ul
              key={i}
              className="mod-list mod-list-bullet"
              data-ph={ph ? "" : undefined}
            >
              {lines.map((l, j) => (
                <li key={j}>{l.replace(BULLET, "")}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mod-body" data-ph={ph ? "" : undefined}>
            {para}
          </p>
        );
      })}
    </>
  );
}

export default function ModuleClient({ mod }: { mod: ModuleDef }) {
  const [filter, setFilter] = useState<Kind | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  /* Which file in the /files section is open, and in which set. One at a time. */
  const [setFile, setSetFile] = useState<{ set: string; file: string } | null>(null);
  const [build, setBuild] = useState(false);

  const key = `rwf-course-m${mod.n}-done`;

  /* Build layer is opt-in via ?build, so it can never reach a member by accident. */
  useEffect(() => {
    setBuild(new URLSearchParams(window.location.search).has(BUILD_PARAM));
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* a blocked or full localStorage must never break the page */
    }
  }, [key]);

  const persist = useCallback(
    (next: Set<number>) => {
      setDone(next);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* progress is a convenience, not a requirement */
      }
    },
    [key],
  );

  const toggleDone = (i: number) => {
    const next = new Set(done);
    next.has(i) ? next.delete(i) : next.add(i);
    persist(next);
  };

  const markDone = (i: number) => {
    if (done.has(i)) return;
    const next = new Set(done);
    next.add(i);
    persist(next);
  };

  const counts = useMemo(() => {
    const c: Partial<Record<Kind, number>> = {};
    mod.items.forEach((it) => {
      const k = kindOf(it);
      c[k] = (c[k] ?? 0) + 1;
    });
    return c;
  }, [mod.items]);

  /* An item whose picture slot is already filled by a drawn figure is not still owed.
     Counting it would keep telling Paul he owes a screenshot he can already see. */
  const grabsOutstanding = mod.items.filter((it) => it.grab && !it.figure).length;
  const wordsOutstanding = mod.items.filter((it) => it.placeholder).length;

  const visible = (it: Item) => filter === null || kindOf(it) === filter;
  const shown = mod.items.filter(visible).length;

  const say = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(null), 2000);
  };

  /* ⛔ `urlFor`, `copyLink` and `copyText` DELETED 3 Aug 2026 with the buttons that called
     them. They are in git, in the commit that removed the row, if sharing comes back.
     ⚠️ When it does, build the per-item ROUTE first. All three composed a URL of the shape
     /course/1/create-projects, and no such route exists. */
  const copyPrompt = async (it: Item, i: number) => {
    if (!it.prompt) return;
    try {
      await navigator.clipboard.writeText(it.prompt);
      say("Prompt copied");
      markDone(i); /* taking the prompt IS doing the thing */
    } catch {
      say("Copy failed");
    }
  };

  const cells: { k: Kind; label: string }[] = [
    { k: "take", label: "To copy and keep" },
    { k: "steps", label: "Shown with a picture" },
    { k: "read", label: "To read" },
    { k: "links", label: "Worth saving" },
  ];

  /* ⭐ THE FOX ROTATES BY MODULE NUMBER, exactly as the book chapters rotate by
     chapter number, so no two of the six modules feel identical. */
  const FOXES = [
    "chapter-fox-sitting-nobg.png",
    "fox-sideeye-right-nobg.png",
    "chapter-fox-bored-nobg.png",
    "fox-facepalm-nobg.png",
    "fox-pm-nobg.png",
    "fox-monday-nobg.png",
  ];
  const fox = FOXES[(mod.n - 1) % FOXES.length];

  return (
    <div className="mod-shell">
      {/* Reuses the book chapter nav verbatim (.chapter-nav). The chapters' numeric
          count is dropped: the eyebrow already says "Module N of 6". */}
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/course" className="chapter-nav-back">
          ← course
        </Link>
      </header>
      {build && (
        <div className="mod-build">
          <b>BUILD VIEW. A member never sees this.</b> {grabsOutstanding}{" "}
          {grabsOutstanding === 1 ? "screen grab" : "screen grabs"} still needed
          {" · "}
          {wordsOutstanding} {wordsOutstanding === 1 ? "item" : "items"} still
          {wordsOutstanding === 1 ? " needs" : " need"} Paul&rsquo;s words
        </div>
      )}

      {/* ⭐ v8's TWO-COLUMN PAGE. Left is ONE sticky block: Isa on top at her natural
          height, the contents taking what is left and scrolling inside it. They both
          want to stay visible and they cannot each pin, so the COLUMN pins as one.
          Right holds everything that used to run full width, masthead included. */}
      <div className="mod-grid">
        <div className="mod-railcol">
          {/* The REAL Isa, scoped to this module. v8 drew this panel; it is wired now. */}
          <ModuleIsa mod={mod} />

          <nav className="mod-rail">
            <p>/in this module</p>
            {mod.items.map((it, i) =>
              visible(it) ? (
                <a key={i} href={`#i${i + 1}`} data-done={done.has(i) ? "1" : "0"}>
                  <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-dot" />
                  <span>{it.t}</span>
                </a>
              ) : null,
            )}

            {/* ⭐⭐ THE LIBRARY, AT THE FOOT OF EVERY MODULE'S RAIL, Paul 3 Aug 2026: "can we
                link this from the rail in all modules? So call it the /library at the bottom
                of the topics".

                ⭐ IT IS THE PAGE'S ONLY WAY IN. /course/everything was built 2 Aug and until
                this line existed NOTHING on the site linked to it and it was absent from
                sitemap.ts, while its own header claimed it was public so that search and the
                AI engines could reach it. Neither could. A public page linked from nowhere is
                not published, it is deployed.

                ⛔ BELOW THE RULE AND WITHOUT A NUMBER, on purpose. The numbered rows above are
                this module's contents, in Paul's order. This is a different page. Giving it an
                item number would make module 1 read as ten things when he wrote nine. */}
            {/* ⛔ "/files in this module" DELETED FROM THE RAIL, 4 Aug 2026. Paul: "I don't
                want files in this module on the left-hand side. I feel like they can just
                find them in the library."

                ⭐ THE RAIL IS FOR THE LESSON, and this is the second thing taken out of it
                for that reason. It carries Isa, then Paul's numbered contents, then one way
                out. A second destination made the column a menu of places rather than a map
                of the module.

                ⚠️ THE `#files` SECTION ITSELF IS UNTOUCHED and still sits at the foot of the
                page. Only the rail shortcut is gone. */}
            <Link className="mod-rail-lib" href="/course/everything">
              /library of everything
            </Link>
          </nav>
        </div>

        <div className="mod-maincol">
      <header className="mod-masthead">
        <p className="mod-eyebrow">
          Module {mod.n} of 6 &middot; opens {mod.when}
        </p>
        {/* The headline, with its declared words in Fox blue. Falls back to a plain
            headline when the module names no highlight, or names one that is not actually
            in the title. */}
        <h1 className="mod-h1">
          {(() => {
            const hl = mod.titleHl;
            const at = hl ? mod.title.indexOf(hl) : -1;
            if (!hl || at < 0) return mod.title;
            return (
              <>
                {mod.title.slice(0, at)}
                <span className="mod-hl">{hl}</span>
                {mod.title.slice(at + hl.length)}
              </>
            );
          })()}
        </h1>
        {/* Reuses .chapter-fox-hero verbatim: float right, 180px, negative -60px right
            margin so it sits half out in the gutter and reads as casual rather than as
            a boxed illustration, and a drop-shadow FILTER so the shadow follows the
            fox's outline instead of a rectangle. */}
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src={`/fox/${fox}`} alt="" />
        </div>
        {/* Paul's opening if the module has one, otherwise its blurb. Splits on a blank
            line, same as an item's prose. The fox floats right, so the first paragraph
            wraps beside it and the rest run full width: the magazine wrap the homepage
            uses. */}
        {(mod.opening ?? mod.blurb).split(/\n{2,}/).map((para, i) => (
          <p className="mod-standfirst" key={i}>
            {para}
          </p>
        ))}
        <div className="mod-meta">
          <span>
            Opens<b>{mod.when}</b>
          </span>
          <span>
            {/* ⚠️ PLURALISATION FIXED 4 Aug 2026 under Paul's standing rule, "you can fix
                grammar problems when you see them". It read "1 things" on module 2 for as
                long as that module had one item. */}
            In this module
            <b>
              {mod.items.length} {mod.items.length === 1 ? "thing" : "things"}
            </b>
          </span>
          {mod.source && (
            <span>
              Source<b>{mod.source}</b>
            </span>
          )}
          <span>
            Sharing<b>Copy anything. Send it on.</b>
          </span>
        </div>
      </header>

      {/* THE ARRIVAL BLOCK, 2 Aug 2026, EXPERIMENT. Welcome, video placeholder and the
          fluency slider take the position the counter strip and progress bar held.
          Revert = delete this line and set SHOW_COUNTERS back to true. */}
      <ModuleArrival n={mod.n} />

      {SHOW_COUNTERS && (
      <div className="mod-comp">
        <button
          type="button"
          aria-pressed={filter === null}
          onClick={() => setFilter(null)}
        >
          <span className="mod-num">{mod.items.length}</span>
          <span className="mod-lbl">All</span>
        </button>
        {cells.map((c) => (
          <button
            key={c.k}
            type="button"
            aria-pressed={filter === c.k}
            onClick={() => setFilter(filter === c.k ? null : c.k)}
          >
            <span className="mod-num">{counts[c.k] ?? 0}</span>
            <span className="mod-lbl">{c.label}</span>
          </button>
        ))}
      </div>
      )}

      {SHOW_COUNTERS && (
      <div className="mod-progress">
        <span>
          {done.size} of {mod.items.length} done
        </span>
        <span className="mod-bar">
          <i style={{ width: `${(done.size / mod.items.length) * 100}%` }} />
        </span>
        {done.size > 0 && (
          <button type="button" onClick={() => persist(new Set())}>
            Clear
          </button>
        )}
        {flash && <span className="mod-flash">{flash}</span>}
      </div>
      )}

      {filter !== null && (
        <div className="mod-filterstate">
          <span>
            {shown} {shown === 1 ? "item" : "items"} shown
          </span>
          <button type="button" onClick={() => setFilter(null)}>
            Show everything
          </button>
        </div>
      )}

        <main>
          {mod.items.map((it, i) => {
            if (!visible(it)) return null;
            return (
              <article
                key={i}
                className="mod-item"
                id={`i${i + 1}`}
                data-done={done.has(i) ? "1" : "0"}
              >
                <div className="mod-itemtop">
                  <span className="mod-n">{String(i + 1).padStart(2, "0")}</span>
                  {/* ⛔ THE TYPE BADGE IS GONE, 3 Aug 2026. Paul asked what it meant twice
                      ("I'm not sure what the show and copy badges are doing... do they make
                      any sense at the moment?") and then ruled: "cut them."

                      ⭐ THE AUDIT BEHIND THAT, so nobody rebuilds it from the same mistake.
                      Across the 23 items it drew on: 14 of 23 carried the SAME label, so it
                      sorted nothing; and all six "Show and copy" badges were FALSE, two on
                      items with nothing to copy and four pointing at screenshots that had
                      never been taken, which put Paul's own build to-do list in front of a
                      learner. Two items that looked identical on screen carried different
                      badges because one had a leftover `grab` field.

                      ⛔ THE ROOT CAUSE, and it is the thing to avoid rather than the badge:
                      kindOf() derives a label from WHICH FIELDS AN ITEM HAS, and then prints
                      it as what the READER DOES. Assets and verbs are two axes and they were
                      collapsed into one, which `specimen/artefacts.ts` diagnosed back in July.
                      Any future signal must be DECLARED per item in his words, the way the
                      blue headline word is, never inferred.

                      ⚠️ kindOf AND THE FILTER STAY. The counter strip behind SHOW_COUNTERS
                      counts with kindOf and is one flag away from returning, so the machinery
                      is untouched. KIND_LABEL is no longer imported here, because the badge
                      was its only reader.

                      ⭐ AND THAT EXPOSED THE OTHER HALF OF THE JULY DEFECT. The counter strip
                      never used KIND_LABEL at all: it carries its OWN labels in `cells`, so
                      the same `steps` kind read "Show and copy" on the badge and "Shown with
                      a picture" in the strip, both visible at once. One category, two names.
                      Cutting the badge removed one of them by accident. If the strip ever
                      comes back, its four labels are the only ones left and they should be
                      read cold before anyone trusts them. */}
                  <h2 className="mod-h3">
                    <button type="button" onClick={() => setOpen(i)}>
                      {it.t}
                    </button>
                  </h2>
                  <span className="mod-openhint">Open</span>
                </div>

                <ItemPicture item={it} build={build} />

                <Body text={it.text} ph={it.placeholder} slots={slotsFor(it)} />

                {/* ⭐ "Read full essay." Paul's own line, 3 Aug 2026, sent as the last line
                    of his teaser copy for "Break down and rebuild".

                    ⛔ IT IS A REAL CONTROL, NOT A SENTENCE. Left in the prose it would be a
                    line telling a reader to do something with nothing to click, which is the
                    same fault as the "OPEN" hint he misread on 25 Jul, running the other way.
                    It opens the same window the headline does.

                    ⭐ DERIVED FROM `beats`, NOT DECLARED. An item HAS a full essay exactly
                    when it has beats, so this cannot appear on an item with nothing behind
                    it. That is a mechanical fact about the data, not a guess about intent,
                    which is the line this file draws elsewhere between the two. */}
                {it.beats && it.beats.length > 0 && (
                  <button
                    type="button"
                    className="mod-essaylink"
                    onClick={() => setOpen(i)}
                  >
                    Read full essay
                  </button>
                )}

                <DocLinks docs={it.docs} onCopy={say} />
                <ReadingList reading={it.reading} />

                {it.links && (
                  <div className="mod-linklist">
                    {it.links.map((L, j) => (
                      /* ⭐ A PLAIN ROW IS THE DEFAULT. Paul, 19 Jul: "most links are
                         going to be just links, not thumbnails." Only draw the picture
                         column when a link actually has one. */
                      <a
                        key={j}
                        className="mod-lcard"
                        data-thumb={L.thumb ? "1" : "0"}
                        href={L.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {L.thumb && (
                          <span
                            className="mod-lthumb"
                            style={{ backgroundImage: `url(${L.thumb})` }}
                          />
                        )}
                        <span>
                          <span className="mod-ltitle">{L.title}</span>
                          <span
                            className="mod-lwhy"
                            data-ph={L.why.startsWith("PAUL TO WRITE") ? "" : undefined}
                          >
                            {L.why}
                          </span>
                          <span className="mod-lmeta">{L.by}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {it.prompt && (
                  <PromptBlock
                    text={it.prompt}
                    label={it.promptLabel}
                    onCopy={() => copyPrompt(it, i)}
                  />
                )}

                {/* ⛔ COPY LINK AND COPY TEXT REMOVED 3 Aug 2026. Paul: "I don't actually
                    know what we're meant to do with copy link and copy text. What link? What
                    text? It's confusing. We should take it away for now."

                    ⭐ HE WAS RIGHT ON THE MECHANICS AS WELL AS THE MEANING. Copy link put
                    runwithfoxes.com/course/1/create-projects on the clipboard, and THAT
                    ROUTE DOES NOT EXIST: there is only /course/[n]. It copied a link to a
                    404. Copy text carried the same dead URL at the foot of the prose.

                    ⚠️ NOTHING IS LOST YET, because nobody can share this page anyway: it is
                    linked from nowhere and has no email door. Sharing becomes real when the
                    course is public, and it needs the per-item ROUTE first, not a button.
                    The three functions behind these buttons are deleted rather than left to
                    rot as lint warnings; git holds them. ⚠️ The same dead URL is still
                    PRINTED in the reader bar when an item is open. Display only, and Paul
                    has not called it, so it stands. */}
                <div className="mod-share">
                  <button
                    type="button"
                    className="mod-tick"
                    aria-pressed={done.has(i)}
                    onClick={() => toggleDone(i)}
                  >
                    <span className="mod-box" />
                    Done
                  </button>
                </div>
              </article>
            );
          })}
        </main>

        {/* ⭐⭐ THE MODULE'S FILES, 3 Aug 2026. Paul: "Just have them all listed connected
            to module 2."

            ⛔ BELOW THE LESSONS AND OUTSIDE <main>, on purpose and for the same reason the
            library link sits below the rule in the rail. The numbered articles above are
            what Paul wrote, in his order. This is the module's filing cabinet. Putting it
            inside the list would make module 2 read as one lesson and fourteen documents,
            which is the catalogue failure this page was rebuilt to end.

            ⚠️ RENDERS ONLY WHEN A MODULE HAS FILES, so modules 1 and 3 to 6 are untouched
            and the pixels Paul signed off on module 1 do not move. */}
        {SHOW_FILES && mod.files && mod.files.length > 0 && (
          <section className="mod-files" id="files">
            <p className="mod-fkicker">/files</p>
            {mod.files.map((set) => (
              <div className="mod-fset" key={set.title}>
                <h2 className="mod-fsettitle">{set.title}</h2>
                <p className="mod-fsetblurb">{set.blurb}</p>
                {/* ⛔ ABOVE THE FILES, NEVER BELOW THEM. A learner who has already opened
                    Kite's positioning statement and read its market shares has taken it for
                    research, and a warning underneath arrives too late to stop that. */}
                {set.warn && <p className="mod-fwarn">{set.warn}</p>}
                {/* ⭐⭐ THREE THINGS PER ROW, 4 Aug 2026, and Paul's reason is the teaching
                    rather than the convenience: "I think we should be able to open them as
                    a window, download them as an MD file, and copy them... I think people
                    might want to look at them and see what's actually in them so they're
                    learning."

                    ⭐ SO OPENING IS THE PRIMARY ACT AND IT HAPPENS IN PLACE. The name used
                    to open the readable page in a NEW TAB, which takes a learner off the
                    module to read a document about the module. It now opens the same folder
                    window used by items 02 and 03, under this set, at this file.
                    ⛔ Three affordances, three distinct controls: NAME reads, .MD takes,
                    COPY pastes. None of them is a fallback for another. */}
                <ul className="mod-frows">
                  {set.files.map((f) => (
                    <li className="mod-frow" key={f.name}>
                      {/* ⛔⛔ NAMED VERBS, NOT INFERRED ONES. Same ruling as item 03's rows,
                          4 Aug: "a link that says open, a link that says download, and a link
                          that says copy." The filename is a name again. */}
                      <span className="mod-fname">{f.name}</span>
                      <span className="mod-fwhat">{f.what}</span>
                      <span className="mod-fileacts">
                        <button
                          type="button"
                          className="mod-fileact"
                          aria-expanded={
                            setFile?.set === set.title && setFile.file === f.name
                          }
                          onClick={() =>
                            setSetFile(
                              setFile?.set === set.title &&
                                setFile.file === f.name
                                ? null
                                : { set: set.title, file: f.name },
                            )
                          }
                        >
                          {setFile?.set === set.title && setFile.file === f.name
                            ? "Close"
                            : "Open"}
                        </button>
                        {/* The markdown, which is the thing that goes into a Claude
                            project. */}
                        <a className="mod-fileact" href={f.take} download>
                          Download
                        </a>
                        <button
                          type="button"
                          className="mod-fileact"
                          onClick={async () => {
                            try {
                              const r = await fetch(f.take);
                              if (!r.ok) throw new Error(String(r.status));
                              await navigator.clipboard.writeText(await r.text());
                              say(`${f.name}.md copied`);
                            } catch {
                              say("Copy failed");
                            }
                          }}
                        >
                          Copy
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                {/* ⭐ THE FOLDER IS DERIVED FROM THE FILE'S OWN PATH, never from the set's
                    title. A first pass read the title for the word "kite", which is a
                    coupling between a HUMAN-EDITABLE HEADING and a directory name: rename
                    the heading and the window silently opens the wrong folder, with nothing
                    failing. `take` already carries the truth. */}
                {setFile?.set === set.title && (
                  <div className="mod-slot">
                    <FolderWindow
                      name={`${dirOf(set.files[0].take).split("/").pop()}/`}
                      dir={dirOf(set.files[0].take)}
                      files={set.files.map((x) => ({
                        file: x.name,
                        label: `${x.name}.md`,
                      }))}
                      start={set.files.findIndex((x) => x.name === setFile.file)}
                    />
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
        </div>
      </div>

      {open !== null && (
        <div
          className="mod-readerwrap"
          role="dialog"
          aria-modal="true"
          aria-label={mod.items[open].t}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="mod-reader">
            <div className="mod-readerbar">
              <span className="mod-t">
                Module {mod.n} &middot; {String(open + 1).padStart(2, "0")}
              </span>
              <span className="mod-u">
                runwithfoxes.com/course/{mod.n}/{slugOf(mod.items[open].t)}
              </span>
              <button type="button" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
            <div className="mod-readerbody">
              <h2>{mod.items[open].t}</h2>

              {/* ⭐ THE FIGURE SITS ABOVE THE PROSE HERE TOO. Paul, 3 Aug 2026, looking at
                  an opened item: "the figure is below the copy. I want it above it... This
                  is what I want generally." The inline item was fixed on 2 Aug ("put the
                  figures above my writing. They are like a simple banner and then I explain
                  below") and this second render was left behind, so opening an item flipped
                  the reading order under you.

                  ⛔ AND `figureFile` WAS MISSING ENTIRELY, which is worse than the order.
                  The inline item draws `figure` OR `figureFile`; this one only ever drew
                  `figure`. So the CFO item, whose picture is a standalone file, showed its
                  drawing in the list and then LOST IT on open. That is the exact failure the
                  old comment here claimed to prevent.

                  ⭐ FIXED PROPERLY 3 Aug: both renders now call the SAME component, so a
                  field added to an item cannot appear in one and not the other again.
                  `showGrab={false}` is the one deliberate difference: the grab placeholder
                  is build scaffolding for Paul, not something a learner opens an item to
                  study. */}
              {/* ⛔ THE TEASER FIGURE IS NOT REDRAWN WHEN THE ITEM HAS BEATS, because it is
                  one OF the beats and would otherwise appear twice in the same window. */}
              {!mod.items[open].beats && (
                <ItemPicture item={mod.items[open]} showGrab={false} />
              )}

              {/* ⭐ SAME SLOTS AS THE INLINE RENDER, via slotsFor. Before 5 Aug this Body
                  had no slots, so the recordings and the folder vanished on open. */}
              <Body
                text={mod.items[open].text}
                ph={mod.items[open].placeholder}
                slots={slotsFor(mod.items[open])}
              />

              {/* ⭐⭐ THE LONG ARTICLE: a passage, then the picture of what you just read,
                  repeated. ⛔ ORDER REVERSED 3 Aug 2026 once Paul WROTE the article: every
                  passage in it is followed by "[figure here]". He had described it the other
                  way round ("my copy after each one"), and the thing he wrote wins over the
                  sentence about it. His "figures above my writing" rule is untouched: he
                  scoped it himself to "when I have just one figure in an item".
                  ⭐ This is the second item type the 2 Aug note said would be needed the
                  moment one item carried several moves. It is not a gallery: the figures
                  share a move, and the repetition IS the lesson. */}
              {mod.items[open].beats?.map((b, j) => (
                <div className="mod-beat" key={j}>
                  {b.text && <Body text={b.text} ph={b.placeholder} />}
                  {/* ⛔ A FIGURE AND A REAL ARTEFACT ARE DIFFERENT THINGS AND THE PAGE SAYS SO.
                      A figure is a drawing of the move, reusable, naming nothing. An image is
                      evidence that Paul actually did it. His copy leans on that difference:
                      "here is the wireframe I got back". A beat can also be prose alone,
                      which is how this article closes. */}
                  {b.figure ? (
                    <Figure name={b.figure} className={figStyles.banner} />
                  ) : b.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="mod-beatimg"
                      src={b.image.src}
                      alt={b.image.alt}
                    />
                  ) : null}
                </div>
              ))}

              {mod.items[open].prompt && (
                <PromptBlock
                  text={mod.items[open].prompt as string}
                  label={mod.items[open].promptLabel}
                  onCopy={() => copyPrompt(mod.items[open], open)}
                />
              )}

              {/* ⭐ LAST THING IN THE WINDOW, which is Paul's instruction and also where it
                  belongs: you finish the piece, then you are handed where to go next.
                  ⛔ It was MISSING here entirely until 3 Aug. He opened Create Projects and
                  his three links were not in it. */}
              <DocLinks docs={mod.items[open].docs} onCopy={say} />
              <ReadingList reading={mod.items[open].reading} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
