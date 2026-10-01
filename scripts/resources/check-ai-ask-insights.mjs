/**
 * THE AI ASK, Q3 2026: READ THE INSIGHTS' NUMBERS BACK AGAINST numbers.json. 1 Oct 2026.
 *
 *   node scripts/resources/check-ai-ask-insights.mjs
 *
 * The opening page, the three insights and the chapter story lines (copy.ts: OPEN, INSIGHTS, thread)
 * are prose typed by hand, and nothing ties a typed number to the numbers file. This does. Each row
 * is a phrase that must appear in copy.ts word for word, and the value in numbers.json it rests on.
 * It fails if the phrase is gone (someone reworded it, so re-check by hand and update the row) or if
 * the number behind it has moved. It exits 1 on any failure and prints what it checked on a pass.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "src/app/resources/the-ai-ask/2026-q3");
const N = JSON.parse(fs.readFileSync(path.join(dir, "numbers.json"), "utf8"));
const copy = fs.readFileSync(path.join(dir, "copy.ts"), "utf8");

const role = (list, name) => list.find((x) => x.role === name);
const share = (tool, q) => N.tools_jobsie_share[tool][q].pct;
const careers = N.fine_roles_careers_sep;

const rows = [
  ["1,773 Irish marketing and sales job ads", N.total_ads, 1773],
  ["27 of the 82 sentences", [N.tools_asks_reasons["speed, efficiency, productivity"], N.tools_asks_reasons.sentences], [27, 82]],
  ["Four ask for someone to get the company found in AI search", N.sep_kinds.search, 4],
  ["one asks for someone to build agents", N.agents_in_duties.filter((x) => x[0] === "2026-Q3").length >= 1, true],
  ["Five of the 23 ads for heads and directors ask for AI", [N.levels.head.k, N.levels.head.n], [5, 23]],
  ["two of those ask the person to lead it", N.kinds_by_level.head.lead, 2],
  ["Of the 20 that ask for \"AI tools\", ==17 name no tool==", [N.ai_tools_named.ads_generic_ai_tools, N.ai_tools_named.generic_without_any_name], [20, 17]],
  ["Canva went from 2.2% to 6.4% of jobs.ie ads", [share("Canva", "2025-Q4"), share("Canva", "2026-Q3")], [2.2, 6.4]],
  ["==10 of 454 sales ads==", [N.sep_by_role_boards.sales.k, N.sep_by_role_boards.sales.n], [10, 454]],
  ["10 of 33 ads for account executives", [role(careers, "Account executive").k, role(careers, "Account executive").n], [10, 33]],
  ["8 of 19 for SDRs and BDRs", [role(careers, "SDR and BDR").k, role(careers, "SDR and BDR").n], [8, 19]],
  ["21% of September's ads mention AI, and 9% ask the person to do anything with it", [Math.round(N.talk_vs_ask.mention_ai.pct), Math.round(N.talk_vs_ask.real_ask.pct)], [21, 9]],
  ["three LinkedIn postings came in through Google Jobs", N.sep_sources_detail ? N.sep_sources_detail["google:LinkedIn Ireland"] : "not in numbers.json", 3],
];

let bad = 0;
for (const [phrase, got, want] of rows) {
  const inCopy = copy.includes(phrase);
  const same = JSON.stringify(got) === JSON.stringify(want);
  if (!inCopy || !same) bad++;
  console.log(`${inCopy && same ? "ok  " : "FAIL"}  ${phrase}${inCopy ? "" : "   <- phrase not found in copy.ts"}${same ? "" : `   <- numbers.json says ${JSON.stringify(got)}, the words say ${JSON.stringify(want)}`}`);
}
console.log(`\n${rows.length - bad} of ${rows.length} phrases match the numbers file.`);
process.exit(bad ? 1 : 0);
