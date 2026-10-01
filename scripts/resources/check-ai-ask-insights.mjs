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
  ["1 in 6 marketing jobs", [N.sep_by_role_all_sources.marketing.k, N.sep_by_role_all_sources.marketing.n, Math.round(N.sep_by_role_all_sources.marketing.n / N.sep_by_role_all_sources.marketing.k)], [17, 100, 6]],
  ["about one ad in six now asks across every source", Math.round(N.sep_by_role_all_sources.marketing.n / N.sep_by_role_all_sources.marketing.k), 6],
  ["43 of the 100 marketing ads name at least one tool", [N.marketing_ads_naming_a_tool.sep_all_sources.k, N.marketing_ads_naming_a_tool.sep_all_sources.n], [43, 100]],
  ["five of the 23 ads for heads and directors ask for AI", [N.levels.head.k, N.levels.head.n], [5, 23]],
  ["four of the five are sales jobs", [N.head_asks.by_role.sales, N.levels.head.k], [4, 5]],
  ["Four of those five asks are in sales jobs", [N.head_asks.by_role.sales, N.levels.head.k], [4, 5]],
  ["and two ask the person to lead it", N.head_asks.by_kind.lead, 2],
  ["Of the 18 that ask for \"AI tools\", \"AI fluency\" or \"AI platforms\", ==15 name no tool==", [N.ai_tools_named.ads_generic_ai_tools, N.ai_tools_named.generic_without_any_name], [18, 15]],
  ["==15 of the 18 ads that ask for \"AI tools\", \"AI fluency\" or \"AI platforms\" name no tool at all==", [N.ai_tools_named.generic_without_any_name, N.ai_tools_named.ads_generic_ai_tools], [15, 18]],
  ["The AI bar is 21 ads: 15 ask for AI tools and name none, and 6 name one.", [N.tools_sep.AI.any, N.tools_sep.AI['"AI tools", no name'], N.tools_sep.AI["Names an AI tool"]], [21, 15, 6]],
  ["Canva went from 2.2% to 6.4% of jobs.ie ads", [share("Canva", "2025-Q4"), share("Canva", "2026-Q3")], [2.2, 6.4]],
  ["==10 of 454 sales ads==", [N.sep_by_role_boards.sales.k, N.sep_by_role_boards.sales.n], [10, 454]],
  ["Of the 29 sales asks on their careers pages, 16 are to use AI in the job and 10 are to sell it", [N.sep_sales_asks_by_kind.careers.all, N.sep_sales_asks_by_kind.careers.tools, N.sep_sales_asks_by_kind.careers.sell], [29, 16, 10]],
  ["Of the 29 sales asks on their careers pages, ==16 are to use AI in the job== and 10 are to sell it. The other three are to build it or lead it.", [N.sep_sales_asks_by_kind.careers.all, N.sep_sales_asks_by_kind.careers.tools, N.sep_sales_asks_by_kind.careers.sell, N.sep_sales_asks_by_kind.careers.build + N.sep_sales_asks_by_kind.careers.lead], [29, 16, 10, 3]],
  ["account executives asked for AI in 10 of 33 ads, SDRs and BDRs in 8 of 19", [role(careers, "Account executive").k, role(careers, "Account executive").n, role(careers, "SDR and BDR").k, role(careers, "SDR and BDR").n], [10, 33, 8, 19]],
  ["Six of the ten account executive asks are to sell AI, and four are to use it", [N.sep_careers_sales_asks_by_job["Account executive"].sell, N.sep_careers_sales_asks_by_job["Account executive"].tools], [6, 4]],
  ["Six of the recruiters' nine asks are for marketing roles", [N.recruiter_asks_by_role.marketing, N.recruiter_asks_by_role.all], [6, 9]],
  ["27 of the 82 sentences", [N.tools_asks_reasons["speed, efficiency, productivity"], N.tools_asks_reasons.sentences], [27, 82]],
  ["Of September's 56 asks, four are for someone to get the company found in AI search, and one is for someone to build agents", [N.sep_all.k, N.sep_kinds.search, N.agents_in_duties.filter((x) => x[0] === "2026-Q3").length], [56, 4, 1]],
  ["None appear in our late 2025 ads", N.search_asks_by_quarter["2025-Q4"] ?? 0, 0],
  ["More than half of it isn't asking you for anything", N.talk_vs_ask.real_ask.k * 2 < N.talk_vs_ask.mention_ai.k, true],
  ["remove more than half of what looks like AI in job ads", N.talk_vs_ask.real_ask.k * 2 < N.talk_vs_ask.mention_ai.k, true],
  ["three LinkedIn postings came in through Google Jobs", N.sep_sources_detail["google:LinkedIn Ireland"], 3],
];

let bad = 0;
for (const [phrase, got, want] of rows) {
  const inCopy = copy.includes(phrase);
  const same = JSON.stringify(got) === JSON.stringify(want);
  if (!inCopy || !same) bad++;
  console.log(`${inCopy && same ? "ok  " : "FAIL"}  ${phrase}${inCopy ? "" : "   <- phrase not found in copy.ts"}${same ? "" : `   <- numbers.json says ${JSON.stringify(got)}, the words say ${JSON.stringify(want)}`}`);
}
console.log(`\n${rows.length - bad} of ${rows.length} phrases match the numbers file.`);

/* CROSS-REFERENCES. The chapters were regrouped on 1 Oct 2026, so every "Figure 3.2", "Chapter 5"
   and section number typed into the prose could now point at the wrong thing, or at nothing. The
   figure a reader sees is numbered by the chapter it sits in and its place there, exactly as
   page.tsx does it. This fails on a reference to a figure, chapter or section that does not exist,
   and it prints each figure reference beside the title of the figure it now lands on, so a wrong
   but existing target can be seen by eye. */
const chapters = [...copy.matchAll(/^ {2}\{\n {4}id: "ch(\d)",[\s\S]*?\n {2}\},\n/gm)].map((m) => ({ n: +m[1], src: m[0] }));
const figs = {}, sections = new Set();
for (const c of chapters) {
  let k = 0;
  for (const m of c.src.matchAll(/\{ fig: "(f\d\d)", title: "([^"]*)"/g)) figs[`${c.n}.${++k}`] = m[2];
  for (const m of c.src.matchAll(/\n {8}n: "(\d\.\d)"/g)) sections.add(m[1]);
}
const prose = copy.split("\n").filter((l) => !/^\s*(\*|\/\*|\/\/)/.test(l)).join("\n");
let badRefs = 0;
for (const m of prose.matchAll(/Figure (\d\.\d)([^.`]{0,60})/g)) {
  const ok = m[1] in figs;
  if (!ok) badRefs++;
  console.log(`${ok ? "ok  " : "FAIL"}  "Figure ${m[1]}${m[2].slice(0, 40)}..." -> ${ok ? figs[m[1]].slice(0, 70) : "NO SUCH FIGURE"}`);
}
for (const m of prose.matchAll(/Chapter (\d)(?!\d)/g)) if (!chapters.some((c) => c.n === +m[1])) { badRefs++; console.log(`FAIL  "Chapter ${m[1]}" does not exist`); }
for (const m of prose.matchAll(/\b(?:in|section) (\d\.\d)\b/g)) if (!sections.has(m[1])) { badRefs++; console.log(`FAIL  section ${m[1]} does not exist`); }
console.log(`${chapters.length} chapters, ${sections.size} sections, ${Object.keys(figs).length} figures; ${badRefs} broken cross-references.`);
if (chapters.length !== 7 || sections.size !== 23 || Object.keys(figs).length !== 11) { console.log("FAIL  expected 7 chapters, 23 sections and 11 figures"); badRefs++; }
bad += badRefs;
process.exit(bad ? 1 : 0);
