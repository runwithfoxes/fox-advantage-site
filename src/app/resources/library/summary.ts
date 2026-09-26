import { buildLibrary } from "../../course/everything/build";
import { SHELF } from "../../course/shelf";
import type { PromptRow } from "./PromptRows";

/**
 * THE LIBRARY, COUNTED. One place that reads the course's own sources (moduleData, shelf.ts,
 * the module list) and hands back the numbers and the prompts, so the homepage band and the
 * library page say the same thing on the same day. Never a second copy of any list.
 */
export function librarySummary() {
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
  let docs = 0;
  lib.fileRows.forEach((r) => {
    if (r.type !== "folder") return;
    docs += r.files.length;
  });
  const shelf = SHELF.filter((s) => s.entries.length > 0);
  const shelfCount = shelf.reduce((n, s) => n + s.entries.length, 0);
  const everything = lib.lessonRows.length + lib.fileRows.length + shelfCount;

  const perModule = lib.modules.map((m) => {
    const rows = folders.filter((r) => r.type === "folder" && r.modN === m.n);
    return { ...m, things: rows.length };
  });
  const maxThings = Math.max(1, ...perModule.map((m) => m.things));
  const built = perModule.filter((m) => m.has).length;

  const ledger = [
    { n: prompts.length, l: "prompts" },
    { n: links, l: "links from the lessons" },
    { n: docs, l: "documents" },
    ...shelf.map((s) => ({ n: s.entries.length, l: s.title })),
  ];

  return { prompts, links, docs, shelfCount, everything, perModule, maxThings, built, ledger };
}
