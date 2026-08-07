#!/usr/bin/env node
/**
 * ⭐ THE SESSION GATE. Every `Ref` in src/app/course/writerSession.ts must name a file that
 * really exists in course-files/module-2 and quote a line that is really in it. A recorded
 * session whose hover highlights point at invented sources is the one version that can
 * embarrass us, so an invented source fails here instead of shipping.
 *
 * ⛔ ZERO REFS IS ALSO A FAILURE once any session carries an artefact block. An empty map
 * reads exactly like a clean pass otherwise, and a gate that cannot fail is decoration.
 *
 * Run: node scripts/check-sessions.mjs   (exit 0 = pass)
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sessionSrc = readFileSync(
  path.join(root, "src/app/course/writerSession.ts"),
  "utf8",
);
const packDirs = [
  path.join(root, "course-files/module-2/writer"),
  path.join(root, "course-files/module-2/kite"),
  /* The dataset, 5 Aug 2026, in module 1 on Paul's ruling (Kite runs through the
     course). Its refs quote raw CSV lines, which the substring check handles like any
     other line: a quoted row must really be in the file. */
  path.join(root, "course-files/module-1/data"),
  /* Module 3's customer file and segmentation rules, 7 Aug 2026: the segment session
     quotes raw customer rows and rule lines the same way. */
  path.join(root, "course-files/module-3/data"),
];

/* Tolerant extraction rather than a TS runtime: a ref is written as an object literal
   holding `file:` and `quote:` string literals. Double-quoted with escapes, matching how
   the recordings are written. */
const refPattern = /file:\s*"((?:[^"\\]|\\.)*)"\s*,\s*quote:\s*"((?:[^"\\]|\\.)*)"/g;
const unescape = (s) => s.replace(/\\(["\\nrt])/g, (_, c) =>
  c === "n" ? "\n" : c === "r" ? "\r" : c === "t" ? "\t" : c,
);

const refs = [...sessionSrc.matchAll(refPattern)].map((m) => ({
  file: unescape(m[1]),
  quote: unescape(m[2]),
}));

/* An artefact block with no refs at all means the source map never made it into the
   recording. Only enforced when an email/post block exists in the file. */
const hasArtefact = /kind:\s*"(email|post)"/.test(sessionSrc);

const failures = [];
const docCache = new Map();
const readDoc = (name) => {
  if (docCache.has(name)) return docCache.get(name);
  const hit = packDirs.map((d) => path.join(d, name)).find((p) => existsSync(p));
  const text = hit ? readFileSync(hit, "utf8") : null;
  docCache.set(name, text);
  return text;
};

for (const [i, ref] of refs.entries()) {
  const doc = readDoc(ref.file);
  if (doc === null) {
    failures.push(`ref ${i}: no such file in the module pack: ${ref.file}`);
    continue;
  }
  /* The doc wraps prose at ~100 columns, so a quoted sentence may cross a line break.
     Compare with whitespace collapsed on both sides. */
  const squash = (s) => s.replace(/\s+/g, " ").trim();
  if (!squash(doc).includes(squash(ref.quote))) {
    failures.push(
      `ref ${i}: quote not found in ${ref.file}: "${ref.quote.slice(0, 60)}..."`,
    );
  }
}

if (hasArtefact && refs.length === 0) {
  failures.push(
    "an email/post block exists but the file carries ZERO refs: the source map never made it into the recording",
  );
}

console.log(`CHECKED ${refs.length} refs, ${failures.length} failures`);
for (const f of failures) console.log("  FAIL " + f);
process.exit(failures.length ? 1 : 0);
