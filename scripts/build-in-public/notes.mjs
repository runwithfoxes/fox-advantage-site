/**
 * Pull the week's ADDED lines from the notes files (CLAUDE.md, CONTEXT.md ...).
 *
 * The commit subjects say what changed. The notes say why it mattered, and that
 * is the raw material for a teaching post. We read only added lines (git's `+`
 * side), strip the diff furniture, and cap the volume so the writer prompt
 * stays tight.
 */

import { execFileSync } from "node:child_process";

const WINDOW_DAYS = 7;
const MAX_LINES_PER_FILE = 60;

export function gatherNotes(cwd, files, days = WINDOW_DAYS) {
  const out = [];
  for (const file of files) {
    let raw = "";
    try {
      raw = execFileSync(
        "git",
        [
          "log",
          `--since=${days} days ago`,
          "-p",
          "--unified=0",
          "--",
          file,
        ],
        { cwd, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
      );
    } catch {
      continue; // file may not exist in this repo
    }
    if (!raw.trim()) continue;

    const added = [];
    for (const line of raw.split("\n")) {
      // added content lines start with a single "+", not "+++" (file header)
      if (line.startsWith("+") && !line.startsWith("+++")) {
        const text = line.slice(1).trim();
        if (text) added.push(text);
      }
    }
    if (!added.length) continue;
    out.push({
      file,
      added: added.slice(0, MAX_LINES_PER_FILE),
      truncated: added.length > MAX_LINES_PER_FILE,
    });
  }
  return out;
}
