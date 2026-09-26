import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import EverythingClient from "@/app/course/everything/EverythingClient";
import { buildLibrary } from "@/app/course/everything/build";
import { SHELF } from "@/app/course/shelf";
import { Gate } from "../kit";
import Band from "./Band";
import PromptRows, { type PromptRow } from "./PromptRows";
import DownloadText from "./DownloadText";
import f from "../front.module.css";
import L from "./library.module.css";

/* Rebuilt every five minutes, same as /course/everything, so a module's things appear on its
   launch morning without a deploy. */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "The Library | Run with Foxes",
  description: "Every prompt, link and file from the free AI course for marketers, in one place. Search it, copy what you need, take it with you.",
  robots: { index: false, follow: false },
};

/**
 * /resources/library - THE LIBRARY, as its own section of the resource centre.
 *
 * Paul, 26 Sep 2026: "need to make a big section about the library of everything that is
 * currently in the training course but should have its own section." So this is the same
 * library as /course/everything (one builder, build.ts, no second copy of any list; the rules
 * in that page's header still hold: the prompts and links are public, the teaching is not),
 * given the front door of a research section rather than the appendix of a course.
 *
 * CRAFT LEDGER (DOCTRINE 7 Sep, one line per band):
 * - Head band: deep navy, the four-door nav, title full column, the module-page fox.
 * - The shelf figure: six module spines, height = how many things each module has put in the
 *   library, live modules in sky, the rest ghosted with their opening date. Drawn from the
 *   counts, so it is the honest size of the library today and grows on each launch morning.
 * - The ledger: what is in here by kind, counted off the rows, mono numerals.
 * - Start here: the prompts, because they are the only thing you can use in the next minute.
 * - The browser: the GitHub-discipline file tree Paul approved on 3 Aug, embedded whole.
 * - Where it comes from: six doors, one per module, with the count each has contributed.
 * - The gate, last: the file of every prompt and new items by email, for an account.
 */
export default function LibraryPage() {
  const lib = buildLibrary();
  const folders = [...lib.lessonRows, ...lib.fileRows].filter((r) => r.type === "folder");

  const prompts: PromptRow[] = [];
  let links = 0;
  lib.lessonRows.forEach((r) => {
    if (r.type !== "folder") return;
    r.files.forEach((fl, i) => {
      if (fl.kind === "link") links += 1;
      if (fl.kind === "prompt" && fl.body) prompts.push({ key: `${r.key}-${i}`, name: fl.name, from: r.name, modN: r.modN, lines: fl.body.split("\n").length, body: fl.body, href: r.href });
    });
  });
  let docsOpen = 0;
  let docsNamed = 0;
  lib.fileRows.forEach((r) => {
    if (r.type !== "folder") return;
    r.files.forEach((fl) => (fl.kind === "pending" ? (docsNamed += 1) : (docsOpen += 1)));
  });
  const shelf = SHELF.filter((s) => s.entries.length > 0);
  const shelfCount = shelf.reduce((n, s) => n + s.entries.length, 0);
  const everything = lib.lessonRows.length + lib.fileRows.length + shelfCount;

  const ledger = [
    { n: prompts.length, l: "prompts" },
    { n: links, l: "links from the lessons" },
    { n: docsOpen + docsNamed, l: "documents from the modules" },
    ...shelf.map((s) => ({ n: s.entries.length, l: s.title.toLowerCase() })),
  ];

  const perModule = lib.modules.map((m) => {
    const rows = folders.filter((r) => r.type === "folder" && r.modN === m.n);
    return { ...m, things: rows.length, files: rows.reduce((n, r) => n + (r.type === "folder" ? r.files.length : 0), 0) };
  });
  const maxThings = Math.max(1, ...perModule.map((m) => m.things));
  const built = perModule.filter((m) => m.has).length;

  return (
    <div className={f.page}>
      <Band
        kicker="the library"
        title={
          <>
            Every prompt, link and file from the course, <em>in one place</em>
          </>
        }
        standfirst="It is here so you can find the thing you half-remember without going back through a lesson to look for it. Search it, copy what you need, take it with you. The lessons stay in the course; this is what they hand you."
        fox="chapter-fox-sitting-nobg.png"
        below={
          <div className={L.shelfWrap}>
            <div className={L.shelfHead}>
              <span className={L.shelfLab}>The library by module</span>
              <span className={L.shelfSub}>
                {everything} things · {built} of {perModule.length} modules open
              </span>
            </div>
            <div className={L.shelf} role="img" aria-label={`Things in the library by module: ${perModule.map((m) => `module ${m.n} ${m.things}`).join(", ")}`}>
              {perModule.map((m) => (
                <div key={m.n} className={`${L.spine} ${m.has ? L.spineOn : ""}`}>
                  <span className={L.spineN}>{m.things}</span>
                  <span className={L.spineBar} style={{ height: `${18 + Math.round((m.things / maxThings) * 96)}px` }} />
                  <span className={L.spineMod}>{String(m.n).padStart(2, "0")}</span>
                  <span className={L.spineT}>{m.title}</span>
                  <span className={L.spineWhen}>{m.has ? "open" : `opens ${m.when}`}</span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ul className={L.ledger}>
          {ledger.map((x) => (
            <li key={x.l}>
              <b>{x.n}</b>
              <span>{x.l}</span>
            </li>
          ))}
        </ul>
      </Band>

      <main className={`${f.wrap} ${L.wrap}`}>
        {/* ── Start here: the prompts ── */}
        <section className={L.sec} id="prompts">
          <div className={L.secHead}>
            <h2 className={L.h2}>Start here: the prompts</h2>
            <p className={L.secLine}>
              The exact words to paste, lifted out of the lessons. Open one to read it, copy it, and the lesson it came from is one click away.
            </p>
          </div>
          <PromptRows rows={prompts} />
        </section>

        {/* ── The browser: the whole library as folders and files ── */}
        <section className={L.sec} id="browse">
          <div className={L.secHead}>
            <h2 className={L.h2}>Everything, as folders and files</h2>
            <p className={L.secLine}>
              A lesson is a folder and what it hands you is inside it. Paul&rsquo;s own lists, the people, companies, articles and tools he keeps going back to, sit beside them as their own folders. Search covers the words in the lessons too, so the one about the spreadsheet is findable by &ldquo;spreadsheet&rdquo;.
            </p>
          </div>
          <EverythingClient embed sections={lib.sections} modules={lib.modules} hidden={lib.hidden} shelfCount={lib.shelfCount} />
        </section>

        {/* ── Where it comes from: six doors ── */}
        <section className={L.sec} id="modules">
          <div className={L.secHead}>
            <h2 className={L.h2}>Where these come from</h2>
            <p className={L.secLine}>
              Every item was lifted out of a lesson that says when to reach for it and what good looks like when it comes back. That is the course, and it is free.
            </p>
          </div>
          <ol className={L.doors}>
            {perModule.map((m) => (
              <li key={m.n}>
                <Link href={m.has ? `/course/${m.n}` : `/course#m${m.n}`} className={`${L.door} ${m.has ? "" : L.doorSoon}`}>
                  <span className={L.doorN}>{String(m.n).padStart(2, "0")}</span>
                  <span className={L.doorT}>{m.title}</span>
                  <span className={L.doorMeta}>{m.has ? `${m.things} things · ${m.files} files` : m.things ? `${m.things} named · opens ${m.when}` : `opens ${m.when}`}</span>
                  <span className={L.doorGo}>{m.has ? "Open the module →" : "See the course →"}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ── The gate, last ── */}
        <section className={L.sec} id="account">
          <div className={L.dlRow}>
            <DownloadText href="/resources/library/all-prompts.txt" label="Download every prompt" meta={`${prompts.length} prompts, one text file`} />
            <span className={L.dlNote}>Built from the library itself when you ask for it, so it is never out of date.</span>
          </div>
          <Gate adds={["Every prompt as one file, to keep", "New prompts, links and files by email the day a module opens", "The documents from the modules, in their own formats", "Everything else in the resource centre: every report, tracker and dataset"]} />
        </section>
      </main>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
