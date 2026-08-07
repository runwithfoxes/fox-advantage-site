#!/usr/bin/env node
/**
 * ⭐ THE RESEARCH CORPUS GATE, module 3 item 02. The recorded research session states
 * counts (threads, posts, review averages, invited tallies, question groups), and this
 * script recomputes every one from the corpus files, so an edit to the corpus that
 * silently breaks a number the session speaks fails here instead of shipping.
 *
 * ⛔ IT ALSO ENFORCES THE FICTION BORDER. The corpus was calibrated on real Irish home
 * insurance research (see course-build/corpus-real-irish-home-insurance/), and the design
 * principle is that learners only ever touch the generated Kite corpus: no real insurer,
 * forum or review platform may be named in these files or in the recorded session. The
 * ban list below fails the build on a leak.
 *
 * ⛔ AND THE PLANTED FINDING. The claims-time white space only exists if Ardline's claims
 * page carries no number at all while its sales pages carry discount numbers. Both halves
 * are asserted, because the finding is the contrast.
 *
 * Run: node scripts/check-research-corpus.mjs   (exit 0 = pass)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "course-files/module-3/research");
const read = (name) => readFileSync(path.join(dir, name), "utf8");

const failures = [];
const assert = (ok, msg) => {
  if (!ok) failures.push(msg);
};

/* ---- the fiction border ------------------------------------------------------- */
/* Real insurers, platforms and sources from the calibration corpus. None may appear
   in anything a learner touches. Word-ish boundaries so "chill" the adjective would
   not trip it, but none of these words appear in the fiction at all today. */
const BANNED =
  /\b(aviva|axa|allianz|an post|zurich|fbd|chill\.ie|trustpilot|boards\.ie|askaboutmoney|quinn direct|hibernian|eagle star|reviews\.io|fspo|central bank)\b/i;
const corpusFiles = [
  "forum-threads.md",
  "reviews.md",
  "ardline-pages.md",
  "search-questions.md",
  "research-rules.md",
];
for (const f of corpusFiles) {
  const hit = read(f).match(BANNED);
  assert(!hit, `${f}: real-world name leaked into the fiction: "${hit && hit[0]}"`);
  assert(
    f === "research-rules.md" || /fictional/i.test(read(f)),
    `${f}: the fiction warning is missing`,
  );
}
const sessionSrc = readFileSync(
  path.join(root, "src/app/course/writerSession.ts"),
  "utf8",
);
const sessionHit = sessionSrc.match(BANNED);
assert(
  !sessionHit,
  `writerSession.ts: real-world name leaked: "${sessionHit && sessionHit[0]}"`,
);

/* ---- forum-threads.md --------------------------------------------------------- */
const forum = read("forum-threads.md");
const threadTitles = [...forum.matchAll(/^## Thread \d+: (.+)$/gm)].map((m) => m[1]);
assert(
  threadTitles.length === 10,
  `forum-threads: expected 10 threads, found ${threadTitles.length}`,
);
const posts = [...forum.matchAll(/^\*\*[^*]+\*\* \(posts: [\d,]+\)$/gm)];
assert(posts.length === 44, `forum-threads: expected 44 posts, found ${posts.length}`);
/* The session says four threads are about claims, three about renewal prices, two
   about buying and one about renting. That mix is the finding, so it is pinned to the
   titles: adding or retiring a thread means updating this map AND the session. */
const TOPIC = {
  claims: [
    "Burst pipe in January, still drying out in May",
    "Is it worth claiming for a laptop?",
    "Storm damage refused as wear and tear",
    "Flood payout cut because we were underinsured",
  ],
  renewal: [
    "Renewal up €180, same house, same year, no claims",
    "Does loyalty count for anything with insurers?",
    "Auto renewal went out of my account without warning",
  ],
  buying: [
    "Apartment insurance, what am I actually meant to buy?",
    "What insurance do I need before mortgage drawdown?",
  ],
  renting: ["Renting a room in a shared house, can I insure my own stuff?"],
};
for (const [topic, titles] of Object.entries(TOPIC)) {
  for (const t of titles) {
    assert(threadTitles.includes(t), `forum-threads: ${topic} thread missing: "${t}"`);
  }
}
assert(
  Object.values(TOPIC).flat().length === threadTitles.length,
  "forum-threads: topic map and thread list disagree on count",
);

/* ---- reviews.md --------------------------------------------------------------- */
const reviews = read("reviews.md");
const companies = {};
for (const m of reviews.matchAll(
  /^## (\w+) · (\d+) reviews · average ([\d.]+)$/gm,
)) {
  companies[m[1]] = { claimed: { n: +m[2], avg: +m[3] }, stars: [], invited: 0 };
}
let current = null;
for (const line of reviews.split("\n")) {
  const head = line.match(/^## (\w+) · /);
  if (head) current = companies[head[1]];
  const rev = line.match(/^\*\*(\d)\/5 · .+ · Invited: (yes|no)\*\*$/);
  if (rev && current) {
    current.stars.push(+rev[1]);
    if (rev[2] === "yes") current.invited += 1;
  }
}
/* The numbers the session speaks, recomputed. Averages round to 1dp. */
const EXPECT = {
  Ardline: { n: 18, avg: 2.1, invited: 0 },
  Snapcover: { n: 18, avg: 4.7, invited: 16 },
  Everly: { n: 18, avg: 3.2, invited: 8 },
};
for (const [name, want] of Object.entries(EXPECT)) {
  const c = companies[name];
  if (!c) {
    failures.push(`reviews: company section missing: ${name}`);
    continue;
  }
  const avg = Math.round((c.stars.reduce((a, b) => a + b, 0) / c.stars.length) * 10) / 10;
  assert(c.stars.length === want.n, `reviews: ${name} has ${c.stars.length} reviews, expected ${want.n}`);
  assert(avg === want.avg, `reviews: ${name} average computes to ${avg}, expected ${want.avg}`);
  assert(c.invited === want.invited, `reviews: ${name} invited count is ${c.invited}, expected ${want.invited}`);
  assert(
    c.claimed.n === want.n && c.claimed.avg === want.avg,
    `reviews: ${name} header claims ${c.claimed.n}/${c.claimed.avg}, computed ${c.stars.length}/${avg}`,
  );
}

/* ---- ardline-pages.md: the planted contrast ----------------------------------- */
const ardline = read("ardline-pages.md");
const claimsPage = ardline.split(/^## Page: Claims$/m)[1];
assert(claimsPage, "ardline-pages: no Claims page section");
if (claimsPage) {
  const digit = claimsPage.match(/\d/);
  assert(
    !digit,
    "ardline-pages: the Claims page carries a digit; the finding needs it number-free",
  );
}
const salesPages = ardline.split(/^## Page: Claims$/m)[0];
const pct = salesPages.match(/\d+%/g) || [];
assert(
  pct.length >= 2,
  `ardline-pages: sales pages carry ${pct.length} percentage claims, expected at least 2 (the contrast is the finding)`,
);

/* ---- search-questions.md ------------------------------------------------------ */
const sq = read("search-questions.md");
const GROUPS = {
  "Cost and switching": 12,
  "Claims worries": 9,
  "Buying your first home": 8,
  "What is covered": 7,
};
const sections = sq.split(/^## /m).slice(1);
for (const [name, want] of Object.entries(GROUPS)) {
  const sec = sections.find((s) => s.startsWith(name));
  if (!sec) {
    failures.push(`search-questions: group missing: ${name}`);
    continue;
  }
  const count = (sec.match(/^- "/gm) || []).length;
  assert(count === want, `search-questions: ${name} has ${count} questions, expected ${want}`);
  const header = sec.match(/· (\d+) questions/);
  assert(
    header && +header[1] === count,
    `search-questions: ${name} header says ${header && header[1]}, counted ${count}`,
  );
}
const total = (sq.match(/^- "/gm) || []).length;
assert(total === 36, `search-questions: ${total} questions in total, expected 36`);

console.log(`CHECKED research corpus, ${failures.length} failures`);
for (const f of failures) console.log("  FAIL " + f);
process.exit(failures.length ? 1 : 0);
