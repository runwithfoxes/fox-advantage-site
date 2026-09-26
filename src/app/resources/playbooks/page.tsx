import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { MODULES_BY_N } from "@/app/course/moduleData";
import { PLAYBOOKS, AREA_LABEL, type Playbook, type PlaybookKind } from "../catalogue";
import { Example, Gate, Lock } from "../kit";
import Band from "../library/Band";
import CopyButton from "./CopyButton";
import f from "../front.module.css";
import P from "./playbooks.module.css";

export const metadata: Metadata = {
  title: "Playbooks | Run with Foxes",
  description: "The prompts, templates, checklists and agent briefs we use ourselves. The short version is on the page; the files come with a free account.",
  robots: { index: false, follow: false },
};

/* The kinds in the order a marketer meets them: words first, then documents, then the rest. */
const KINDS: { kind: PlaybookKind; line: string }[] = [
  { kind: "Prompt", line: "The exact words to paste. Each one was written for a job we do ourselves, and kept because it worked twice." },
  { kind: "Template", line: "A document with the structure done. You fill in the parts only you know." },
  { kind: "Checklist", line: "The checks we run before something goes out, in the order we run them." },
  { kind: "Agent brief", line: "How we tell an agent its one job: what it reads, where it writes, and when it stops and hands back." },
  { kind: "Spreadsheet", line: "A working model. Put your numbers in and the sums are done." },
  { kind: "Framework", line: "The questions we ask before any work starts, and the order we ask them in." },
];

/**
 * A real prompt's words live in the course (moduleData), never in the catalogue, so a
 * Prompt playbook that says it comes from a module goes and finds its item there: the item in
 * that module whose title or copy-button label shares the most words with the playbook's name.
 * Example prompts have no body, so their copy button copies the short version on the page.
 */
function promptBody(p: Playbook): string | null {
  const m = p.from?.match(/module (\d)/i);
  if (p.kind !== "Prompt" || !m) return null;
  const def = MODULES_BY_N[Number(m[1])];
  if (!def) return null;
  const stop = new Set(["the", "a", "an", "prompt", "of", "for", "and"]);
  const words = p.name.toLowerCase().split(/\W+/).filter((w) => w && !stop.has(w));
  let best: { score: number; body: string } | null = null;
  def.items.forEach((it) => {
    if (!it.prompt) return;
    const hay = `${it.t} ${it.promptLabel ?? ""}`.toLowerCase();
    const score = words.filter((w) => hay.includes(w)).length;
    if (score > 0 && (!best || score > best.score)) best = { score, body: it.prompt };
  });
  return best ? (best as { body: string }).body : null;
}

function shortVersion(p: Playbook): string {
  return `${p.name}\n${p.line}\n\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nrunwithfoxes.com/resources/playbooks`;
}

/**
 * /resources/playbooks - the playbooks, grouped by kind.
 *
 * CRAFT LEDGER (DOCTRINE 7 Sep):
 * - Head band: the shared deep band, the side-eye fox, and a ledger of the six kinds as
 *   anchors, counted off the catalogue.
 * - Each kind: a heading, one plain line saying what that kind of thing is, then its
 *   playbooks as sheets. No boxes: hairlines and a three-column grid, so it is not the
 *   library's file tree wearing new words.
 * - The steps: drawn as a numbered procedure line, 01 to 0N left to right on one track,
 *   because a playbook is a thing you DO in order, and the number strip says so before the
 *   words do.
 * - The files: named with their format and a lock, because the file is the part an account
 *   adds; the short version is free above it.
 * - The gate, last.
 */
export default function PlaybooksPage() {
  const groups = KINDS.map((k) => ({ ...k, items: PLAYBOOKS.filter((p) => p.kind === k.kind) })).filter((g) => g.items.length);
  const files = PLAYBOOKS.reduce((n, p) => n + p.files.length, 0);

  return (
    <div className={f.page}>
      <Band
        kicker="playbooks"
        title={
          <>
            The prompts, templates and checklists <em>we use ourselves</em>
          </>
        }
        standfirst="Each one is on the page as the short version: what it is for and the steps, free to read and copy. The file itself, in Word, Excel or Markdown, comes with a free account. Nothing here is theory; every playbook was used on a real job before it was written down."
        fox="fox-sideeye-right-nobg.png"
        aside={
          <ol className={P.kinds}>
            {groups.map((g) => (
              <li key={g.kind}>
                <a href={`#${g.kind.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className={P.kindName}>{g.kind}</span>
                  <span className={P.kindTrack} aria-hidden />
                  <b className={P.kindN}>{g.items.length}</b>
                </a>
              </li>
            ))}
            <li className={P.kindsFoot}>
              {PLAYBOOKS.length} playbooks · {files} files
            </li>
          </ol>
        }
      />

      <main className={`${f.wrap} ${P.wrap}`}>
        {groups.map((g) => (
          <section key={g.kind} className={P.kind} id={g.kind.toLowerCase().replace(/\s+/g, "-")}>
            <div className={P.kindHead}>
              <h2 className={P.h2}>{g.kind}s</h2>
              <p className={P.kindLine}>{g.line}</p>
            </div>
            <ol className={P.sheets}>
              {g.items.map((p) => {
                const body = promptBody(p);
                return (
                  <li key={p.slug} className={P.sheet}>
                    <div className={P.sheetName}>
                      <h3 className={P.h3}>
                        {p.name}
                        <Example on={p.example} />
                      </h3>
                      <p className={P.sheetLine}>{p.line}</p>
                      <span className={P.sheetMeta}>
                        {AREA_LABEL[p.area]}
                        {p.from ? ` · from ${p.from}` : ""}
                      </span>
                    </div>
                    <div className={P.sheetSteps}>
                      <ol className={P.steps}>
                        {p.steps.map((s, i) => (
                          <li key={i}>
                            <span className={P.stepN}>{String(i + 1).padStart(2, "0")}</span>
                            <span className={P.stepT}>{s}</span>
                          </li>
                        ))}
                      </ol>
                      {p.kind === "Prompt" ? (
                        <div className={P.sheetActions}>
                          <CopyButton text={body ?? shortVersion(p)} label={body ? "copy the prompt" : "copy the steps"} />
                          {body ? (
                            <a className={P.sheetLink} href={`/resources/library#prompts`}>
                              read it in the library →
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <ul className={P.files}>
                      {p.files.map((fl) => (
                        <li key={fl.name}>
                          <Lock />
                          <span className={P.fileName}>{fl.name}</span>
                          <span className={P.fileFmt}>{fl.format}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <section className={P.kind} id="account">
          <Gate adds={["Every file, in its own format: Word, Excel, Markdown", "The prompts as files, to drop straight into your own Claude", "New playbooks by email, as we write them down"]} />
        </section>
      </main>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
