/**
 * BUILD THE RESOURCE CENTRE CATALOGUE. 26 Sep 2026.
 *
 *   node scripts/resources/build-catalogue.mjs            writes src/app/resources/catalogue/catalogue.json
 *   node scripts/resources/build-catalogue.mjs --check    rebuilds in memory, fails if the file differs or any k of n is off
 *
 * Paul, 26 Sep: "think big and be ambitious... I want to do 10x that amount." So this writes about
 * 44 reports in 12 recurring series, 20 trackers, 20 datasets, 12 tools and 20 playbooks.
 *
 * ⛔ Every dummy number comes from the seeded random below, never typed. Every KofN has
 *    pct = round(100*k/n, 1), and the check at the bottom proves it for every count in the file.
 * ⛔ Real items read their real files: The AI Ask from its numbers.json, GEO Ireland day one from
 *    the counts in resources/data.ts (17 of 41 categories, state body first), Jobs and AI from the
 *    same numbers.json. They are example:false. Everything else is example:true.
 * ⛔ Examples name sectors, roles and counties, never a real Irish firm or person. Example reports
 *    are written by the agent desks (Sam, Jeff, Lena) and checked by Vera or Cato; Paul and Susan
 *    O'Shea are real people and only ever sit on real work.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "src/app/resources/catalogue/catalogue.json");
const ASK = JSON.parse(fs.readFileSync(path.join(ROOT, "src/app/resources/the-ai-ask/2026-q3/numbers.json"), "utf8"));
const SEED = 20260926;

/* ── seeded random ── */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(SEED);
const r = (lo, hi) => lo + (hi - lo) * rnd();
const ri = (lo, hi) => Math.floor(r(lo, hi + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const r1 = (x) => Math.round(x * 10) / 10;
const kofn = (k, n) => ({ k, n, pct: r1((100 * k) / n) });
/** a count out of n near a target share */
const share = (n, p) => kofn(Math.max(0, Math.min(n, Math.round(n * p))), n);
const fmt = (n) => n.toLocaleString("en-IE");
const inN = (c) => { const x = Math.round(c.n / Math.max(1, c.k)); return `1 in ${x}`; };
const euro = (x) => `€${x >= 10 ? fmt(Math.round(x)) : x.toFixed(2)}`;
/** a share said the way a person says it in a headline: "Most", "Half of", "About 1 in 3" */
const say = (c) => (c.pct >= 55 ? "Most" : c.pct >= 45 ? "Half of" : `About ${inN(c)}`);
const pr = (x) => `${Math.round(x)}%`;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ── people ── */
const A = {
  paul: { name: "Paul Dervan", role: "Founder, Run with Foxes", kind: "person" },
  susan: { name: "Susan O'Shea", role: "Head of research, from October 2026", kind: "person" },
  sam: { name: "Sam", role: "AI researcher, an agent", kind: "agent" },
  jeff: { name: "Jeff", role: "Hiring correspondent, an agent", kind: "agent" },
  lena: { name: "Lena", role: "Agent team diarist, an agent", kind: "agent" },
  vera: { name: "Vera", role: "Research checker, an agent", kind: "agent" },
  cato: { name: "Cato", role: "Reviewer, an agent", kind: "agent" },
};

const SECTORS = ["Tourism and hospitality", "Retail and ecommerce", "Financial services", "Tax and accounting", "Technology and SaaS", "Food and drink", "Health", "Property", "Education", "Public sector", "Professional services", "Motor", "Energy", "Media and publishing"];
const COUNTIES = ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kildare", "Meath", "Wicklow", "Kerry", "Donegal", "Sligo", "Clare", "Wexford", "Louth", "Mayo", "Tipperary"];
const ROLES = ["Digital marketing", "Brand", "Content and social", "Performance and paid", "Product marketing", "Marketing operations", "Communications", "Ecommerce", "CRM and email", "SEO", "Events", "Head of marketing"];

/* ── edition calendars ── */
const QUARTERS = [["Q2 2025", "2025-06-24"], ["Q3 2025", "2025-09-23"], ["Q4 2025", "2025-12-16"], ["Q1 2026", "2026-03-24"], ["Q2 2026", "2026-06-23"], ["Q3 2026", "2026-09-22"]];
const HALVES = [["H1 2024", "2024-06-11"], ["H2 2024", "2024-11-26"], ["H1 2025", "2025-05-20"], ["H2 2025", "2025-11-18"], ["H1 2026", "2026-05-19"]];
const YEARS = [["2024", "2024-02-13"], ["2025", "2025-02-11"], ["2026", "2026-02-10"]];

/** a trend that drifts, one value per edition, oldest first */
function trend(n, start, step, noise, lo = 0, hi = 100) {
  const out = []; let v = start;
  for (let i = 0; i < n; i++) { out.push(r1(Math.max(lo, Math.min(hi, v)))); v += step + r(-noise, noise); }
  return out;
}

/* ════════════════════════════ REPORT SERIES ════════════════════════════
   Each series: its calendar, a trend per headline metric (so edition 4 agrees with edition 3's
   chart), and an edition builder that writes findings and figures off those numbers. */

const SERIES = [];
const REPORTS = [];

function addSeries(s, editions) {
  const eds = editions.map((e, i) => ({ ...e, series: s.slug, n: e.n ?? i + 1 }));
  eds.forEach((e) => REPORTS.push(e));
  SERIES.push({ ...s, editions: [...eds].sort((a, b) => b.date.localeCompare(a.date)).map((e) => e.slug) });
}

function baseEdition(s, label, date, extra) {
  const slug = `${s.slug}-${slugify(label)}`;
  return {
    slug, edition: label, date, area: s.area, author: s.lead, checkedBy: s.checker ?? "Vera",
    pdf: `/resources/pdf/${slug}.pdf`, example: true, status: "published", ...extra,
  };
}

/* 1. THE AI ASK - REAL. Issue 01 is the real report; the next one is announced, not invented. */
{
  const s = { slug: "the-ai-ask", name: "The AI Ask", line: "What Irish marketing and sales job ads ask for about AI, every quarter.", cadence: "Quarterly", area: "work", lead: A.sam, method: "Every marketing and sales job ad on seven Irish sources on one day, read by an agent and judged by one rulebook.", mark: "AA", started: "2026-09-25", example: false };
  const all = ASK.sep_all;
  const car = ASK.talk_vs_ask_by_channel.careers_pages.real_ask;
  const bor = ASK.talk_vs_ask_by_channel.job_boards.real_ask;
  const mk = ASK.sep_by_role_boards.marketing, sl = ASK.sep_by_role_boards.sales;
  const kinds = Object.entries(ASK.sep_kinds).sort((a, b) => b[1] - a[1]);
  const LBL = { tools: "Use AI tools", sell: "Sell an AI product", lead: "Lead or buy AI", search: "Be found in AI search", build: "Build AI tools" };
  addSeries(s, [
    {
      ...baseEdition(s, "Q3 2026", "2026-09-25", {}),
      slug: "the-ai-ask-2026-q3", edition: "Q3 2026", n: 1,
      title: "Irish marketing jobs take up AI, sales jobs don't",
      standfirst: `${fmt(ASK.total_ads)} job ads read, ${all.n} of them from one day in September. ${all.k} ask for anything real about AI.`,
      author: A.sam, checkedBy: "Cato and Paul Dervan", sectors: ["Technology and SaaS", "Retail and ecommerce", "Financial services"],
      sample: `${fmt(ASK.total_ads)} job ads`,
      findings: [
        { big: `${all.pct}%`, label: "of September's ads ask for AI", text: `${all.k} of ${all.n} marketing and sales ads ask for anything real about AI.`, count: all },
        { big: `${mk.pct}%`, label: "of marketing ads on the boards", text: `On the job boards marketing asks for AI in ${mk.k} of ${mk.n} ads, sales in ${sl.k} of ${sl.n}.`, count: { k: mk.k, n: mk.n, pct: mk.pct } },
        { big: `${car.pct}%`, label: "of tech careers-page ads", text: `Tech firms' own careers pages ask in ${car.k} of ${car.n} ads, the job boards in ${bor.k} of ${bor.n}.`, count: { k: car.k, n: car.n, pct: car.pct } },
      ],
      figures: [
        { id: "f1", title: "Half the asks are to use AI tools.", caption: `The ${all.k} real AI asks, ${ASK.labels["2026-Q3"]}, by kind. Source: The AI Ask, Run with Foxes.`, data: { kind: "bars", unit: "count", rows: kinds.map(([k, v], i) => ({ label: LBL[k] ?? k, value: v, highlight: i === 0 })) } },
        { id: "f2", title: "Tech careers pages ask about nine times as often as the job boards.", caption: "Share of ads with a real AI ask, by where the ad was posted.", data: { kind: "bars", unit: "%", rows: [{ label: "Tech careers pages", value: car.pct, count: { k: car.k, n: car.n, pct: car.pct }, highlight: true }, { label: "Job boards", value: bor.pct, count: { k: bor.k, n: bor.n, pct: bor.pct } }] } },
      ],
      free: ["The whole report, every chapter and figure", "The method and its limits"],
      withAccount: ["Every ad behind the numbers, by role, level, employer and county", "The report as a PDF", "The next issue by email when it lands"],
      pages: 28, minutes: 16, href: "/resources/the-ai-ask/2026-q3", example: false, status: "draft",
    },
    {
      ...baseEdition(s, "Q4 2026", "2026-12-15", {}), slug: "the-ai-ask-2026-q4", n: 2,
      title: "The AI Ask, Q4 2026", standfirst: "The second reading. Same sources, same rulebook, so the change is the finding.",
      sectors: [], sample: "Every ad on one December day", findings: [], figures: [], free: [], withAccount: ["The issue by email the day it lands"], pages: 0, minutes: 0, example: false, status: "coming",
    },
  ]);
}

/* 2. GEO IRELAND - REAL day one. */
{
  const s = { slug: "geo-ireland", name: "GEO Ireland", line: "Who five AI engines name when people ask Irish questions, category by category.", cadence: "Quarterly", area: "search", lead: A.sam, method: "The same questions, 41 categories of Irish life, put to five AI engines, every name counted.", mark: "GEO", started: "2026-08-23", example: false };
  const state = kofn(17, 41);
  addSeries(s, [
    {
      ...baseEdition(s, "No. 01", "2026-08-23", {}), slug: "geo-ireland-no-01", n: 1,
      title: "Who AI names when you ask an Irish question",
      standfirst: "Five AI engines, 41 categories of Irish life. In 17 of them the first name AI gives is a state body.",
      author: A.sam, checkedBy: "Paul Dervan", sectors: ["Tourism and hospitality", "Financial services", "Public sector", "Health"],
      sample: "41 categories, 5 engines",
      findings: [
        { big: "17 of 41", label: "categories led by a state body", text: "In 17 of 41 categories, the first name AI gives is a state body, so the official source is the one to beat.", count: state },
        { big: "7", label: "categories led by a booking site", text: "In 7 categories a booking site or marketplace comes first, so the brand itself is one step removed.", count: kofn(7, 41) },
      ],
      figures: [
        { id: "f1", title: "In 17 of 41 categories the first name is a state body.", caption: "Who owns the first name AI gives, 41 categories, day one, 23 Aug 2026.", data: { kind: "stack", parts: ["State body", "Booking site", "Brand or other"], rows: [{ label: "41 categories", values: [r1((17 / 41) * 100), r1((7 / 41) * 100), r1(100 - r1((17 / 41) * 100) - r1((7 / 41) * 100))] }] } },
      ],
      free: ["The findings, every category and engine"], withAccount: ["Your own category, engine by engine", "The answers as a CSV", "The next reading by email"],
      pages: 22, minutes: 12, href: "/resources/geo-ireland", example: false, status: "draft",
    },
    { ...baseEdition(s, "No. 02", "2026-11-24", {}), slug: "geo-ireland-no-02", n: 2, title: "GEO Ireland, No. 02", standfirst: "The second reading, and the first with a what-changed line.", sectors: [], sample: "41 categories, 5 engines", findings: [], figures: [], free: [], withAccount: ["The issue by email the day it lands"], pages: 0, minutes: 0, example: false, status: "coming" },
  ]);
}

/* A generic example-series builder. spec.metrics are drifting values; spec.edition(ctx) writes the text. */
function exampleSeries(s, calendar, spec) {
  const cal = calendar.slice(-spec.count);
  const series = {};
  for (const [k, m] of Object.entries(spec.metrics)) series[k] = trend(cal.length, m[0], m[1], m[2], m[3] ?? 0, m[4] ?? 100);
  const eds = cal.map(([label, date], i) => {
    const ctx = { i, label, date, v: Object.fromEntries(Object.entries(series).map(([k, arr]) => [k, arr[i]])), hist: series, labels: cal.slice(0, i + 1).map((c) => c[0]) };
    const body = spec.edition(ctx);
    return { ...baseEdition(s, label, date, {}), n: i + 1, author: s.lead, ...body };
  });
  addSeries({ ...s, example: true }, eds);
}

const sample = (n) => `${fmt(n)} ${""}`.trim();

/* 3. STATE OF AI IN IRISH MARKETING - survey of marketers, twice a year. */
exampleSeries(
  { slug: "state-of-ai-in-irish-marketing", name: "The State of AI in Irish Marketing", line: "What Irish marketing teams do with AI, measured from what they do, not what they say.", cadence: "Twice a year", area: "adoption", lead: A.sam, checker: "Vera", method: "A panel of Irish marketing leads, asked the same questions every six months, with the answers checked against their own job ads and websites.", mark: "SoA", started: "2024-06-11" },
  HALVES,
  {
    count: 5,
    metrics: { weekly: [31, 9, 3], agents: [3, 4, 1.5], policy: [18, 6, 3], trained: [22, 5, 3] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(180, 320);
      const w = share(n, v.weekly / 100), ag = share(n, v.agents / 100), po = share(n, v.policy / 100), tr = share(n, v.trained / 100);
      const gap = r1(w.pct - tr.pct);
      return {
        title: `${say(w)} Irish marketing teams use AI every week, and only ${pr(tr.pct)} have trained anyone to use it`,
        standfirst: `${n} marketing leads, ${label}. Weekly use is at ${w.pct}%. Training sits ${gap} points behind it.`,
        sectors: shuffle(SECTORS).slice(0, 4), sample: `${n} marketing leads`,
        findings: [
          { big: `${w.pct}%`, label: "use AI every week", text: `${w.k} of ${n} teams use AI every week, so the question in most rooms is how well, not whether.`, count: w },
          { big: `${tr.pct}%`, label: "have trained their team", text: `Only ${tr.k} of ${n} have trained anyone, which leaves ${gap} points of use nobody taught.`, count: tr },
          { big: `${po.pct}%`, label: "have a written AI policy", text: `${po.k} teams have a written policy. The rest are making the rules up one prompt at a time.`, count: po },
          { big: `${ag.pct}%`, label: "run an agent on its own", text: `${ag.k} of ${n} have an agent that runs without a person starting it. That is where the next gap opens.`, count: ag },
        ],
        figures: [
          { id: "f1", title: "Weekly use has climbed every six months; training has not kept up.", caption: `Share of marketing leads, ${labels[0]} to ${label}. Example data.`, data: { kind: "line", unit: "%", x: labels, series: [{ name: "Use AI weekly", values: hist.weekly.slice(0, i + 1), highlight: true }, { name: "Trained the team", values: hist.trained.slice(0, i + 1) }, { name: "Written policy", values: hist.policy.slice(0, i + 1) }] } },
          { id: "f2", title: "Bigger teams train more, but not by much.", caption: "Share with any AI training, by team size. Example data.", data: { kind: "range", unit: "%", rows: ["1 to 3", "4 to 10", "11 to 30", "31+"].map((l, j) => { const mid = r1(tr.pct * (0.7 + j * 0.2)); return { label: `${l} people`, low: r1(mid - r(4, 9)), mid, high: r1(mid + r(4, 9)) }; }) } },
        ],
        free: ["Every finding and figure", "The questions we asked"], withAccount: ["Your sector and team size against the rest", "The full answer table as a CSV", "The report as a PDF"],
        pages: ri(24, 36), minutes: ri(9, 14),
      };
    },
  },
);

/* 4. AGENT ECONOMICS - what agents cost to run against people. */
exampleSeries(
  { slug: "agent-economics", name: "Agent Economics", line: "What a marketing agent costs to build and run, from the agents we run ourselves.", cadence: "Twice a year", area: "agents", lead: A.lena, checker: "Cato", method: "Our own agent team's bills, run logs and hours saved, every task counted, six months at a time.", mark: "AE", started: "2024-11-26" },
  HALVES,
  {
    count: 4,
    metrics: { costPerTask: [0.42, -0.06, 0.02, 0.05, 2], tasks: [1800, 1400, 300, 100, 99999], handback: [22, -3, 1.5, 2, 60] },
    edition({ i, label, v, hist, labels }) {
      const tasks = Math.round(v.tasks);
      const hb = share(tasks, v.handback / 100);
      const monthly = Math.round(v.costPerTask * tasks / 6);
      return {
        title: `A marketing task now costs ${euro(v.costPerTask)} to hand to an agent, and ${inN(hb)} still comes back to a person`,
        standfirst: `${fmt(tasks)} tasks over six months, ${label}. About ${euro(monthly)} a month in model costs.`,
        sectors: ["Professional services", "Technology and SaaS"], sample: `${fmt(tasks)} agent tasks`,
        findings: [
          { big: euro(v.costPerTask), label: "model cost per task", text: `The average task cost ${euro(v.costPerTask)} in model fees, so the price of an agent is the setup, not the running.` },
          { big: `${hb.pct}%`, label: "handed back to a person", text: `${fmt(hb.k)} of ${fmt(tasks)} tasks came back to a person, and those are the ones worth designing for.`, count: hb },
          { big: euro(monthly), label: "a month, the whole team", text: `The whole team ran for about ${euro(monthly)} a month, less than one freelancer's day.` },
        ],
        figures: [
          { id: "f1", title: "The cost per task keeps falling; the share handed back falls slower.", caption: `Six-month periods, ${labels[0]} to ${label}. Example data.`, data: { kind: "small", unit: "index", x: labels, panels: [{ label: "Cost per task (€)", values: hist.costPerTask.slice(0, i + 1) }, { label: "Handed back (%)", values: hist.handback.slice(0, i + 1) }, { label: "Tasks (00s)", values: hist.tasks.slice(0, i + 1).map((x) => r1(x / 100)) }] } },
          { id: "f2", title: "Checking and writing are cheap. Research is where the bill goes.", caption: "Model cost per task by kind of job, euro. Example data.", data: { kind: "table", columns: ["Kind of task", "Tasks", "Cost per task", "Handed back"], rows: ["Research", "Writing", "Checking", "Scheduling", "Reporting"].map((k) => { const n = ri(80, 600); return [k, n, euro(r(0.05, 1.4)), `${share(n, r(0.05, 0.35)).pct}%`]; }) } },
        ],
        free: ["Every finding and figure", "How we count a task"], withAccount: ["The cost model as a spreadsheet you can change", "The run logs behind it", "The report as a PDF"],
        pages: ri(18, 26), minutes: ri(8, 12),
      };
    },
  },
);

/* 5. IRISH ADS BY SECTOR - what each sector runs on Meta and Google. */
exampleSeries(
  { slug: "irish-ads-by-sector", name: "Irish Ads by Sector", line: "What each Irish sector ran on Meta and Google this quarter, and what changed.", cadence: "Quarterly", area: "media", lead: A.sam, checker: "Vera", method: "Every active ad from Irish advertisers in the Meta and Google ad libraries, pulled on one day per quarter and sorted by sector and format.", mark: "IA", started: "2025-06-24" },
  QUARTERS,
  {
    count: 5,
    metrics: { video: [34, 3, 2], aiLook: [4, 2.5, 1], ads: [8400, 700, 400, 1000, 99999] },
    edition({ i, label, v, hist, labels }) {
      const n = Math.round(v.ads); const vid = share(n, v.video / 100); const ai = share(n, v.aiLook / 100);
      const secs = shuffle(SECTORS).slice(0, 7);
      const rows = secs.map((s) => ({ label: s, value: ri(120, 1400) })).sort((a, b) => b.value - a.value);
      rows[0].highlight = true;
      return {
        title: `${rows[0].label} ran the most ads this quarter, and ${pr(ai.pct)} of all Irish ads now carry the look of AI imagery`,
        standfirst: `${fmt(n)} active ads, ${label}. Video is ${vid.pct}% of them.`,
        sectors: secs.slice(0, 5), sample: `${fmt(n)} active ads`,
        findings: [
          { big: fmt(n), label: "active Irish ads", text: `${fmt(n)} ads were live on the day we read, so a sector's share of voice can be counted, not guessed.` },
          { big: `${vid.pct}%`, label: "are video", text: `${fmt(vid.k)} of ${fmt(n)} ads are video. Statics still carry most of the weight.`, count: vid },
          { big: `${ai.pct}%`, label: "look AI-made", text: `${fmt(ai.k)} ads carry the tells of AI imagery, and the number grows every quarter.`, count: ai },
        ],
        figures: [
          { id: "f1", title: `${rows[0].label} ran the most ads on the day we read.`, caption: `Active ads by sector, ${label}. Example data.`, data: { kind: "bars", unit: "count", rows } },
          { id: "f2", title: "Video's share creeps up; AI-looking imagery climbs faster.", caption: `${labels[0]} to ${label}. Example data.`, data: { kind: "line", unit: "%", x: labels, series: [{ name: "Video", values: hist.video.slice(0, i + 1) }, { name: "AI-looking imagery", values: hist.aiLook.slice(0, i + 1), highlight: true }] } },
          { id: "f3", title: "Every sector's format mix, side by side.", caption: "Share of each sector's ads by format. Example data.", data: { kind: "stack", parts: ["Static", "Video", "Carousel"], rows: secs.slice(0, 6).map((s) => { const a = ri(35, 65), b = ri(15, 45); return { label: s, values: [a, Math.min(b, 100 - a), Math.max(0, 100 - a - Math.min(b, 100 - a))] }; }) } },
        ],
        free: ["Every sector's count and format mix"], withAccount: ["Your sector's ads, advertiser by advertiser", "Every ad as a CSV with its link", "The report as a PDF"],
        pages: ri(20, 32), minutes: ri(7, 11),
      };
    },
  },
);

/* 6. THE IRISH MARKETING TEAM - shape, roles, pay, yearly. */
exampleSeries(
  { slug: "the-irish-marketing-team", name: "The Irish Marketing Team", line: "How Irish marketing teams are built: size, roles, pay, and what AI has changed.", cadence: "Yearly", area: "work", lead: A.jeff, checker: "Vera", method: "Job ads, public team pages and a panel of heads of marketing, read once a year.", mark: "MT", started: "2024-02-13" },
  YEARS,
  {
    count: 3,
    metrics: { size: [7.4, -0.3, 0.3, 1, 30], salary: [68000, 2600, 800, 20000, 200000], ops: [9, 3, 1] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(260, 420);
      const ops = share(n, v.ops / 100);
      return {
        title: `The median Irish marketing team is ${Math.round(v.size)} people, and the role growing fastest is marketing operations`,
        standfirst: `${n} teams, ${label}. The median head of marketing earns ${euro(v.salary)}.`,
        sectors: shuffle(SECTORS).slice(0, 5), sample: `${n} marketing teams`,
        findings: [
          { big: `${r1(v.size)}`, label: "people, median team", text: `The median team is ${r1(v.size)} people, a little smaller than last year, doing more.` },
          { big: euro(v.salary), label: "median head of marketing", text: `A head of marketing's median pay is ${euro(v.salary)}, and Dublin pays the top of the range.` },
          { big: `${ops.pct}%`, label: "of teams have a marketing ops role", text: `${ops.k} of ${n} teams now have someone whose job is the systems, the role AI made necessary.`, count: ops },
        ],
        figures: [
          { id: "f1", title: "Pay ranges by role: the spread inside a role is wider than between roles.", caption: `Salary ranges, ${label}, euro. Example data.`, data: { kind: "range", unit: "€", rows: shuffle(ROLES).slice(0, 7).map((role) => { const mid = Math.round(r(42000, 95000) / 500) * 500; return { label: role, low: mid - Math.round(r(8000, 16000) / 500) * 500, mid, high: mid + Math.round(r(9000, 22000) / 500) * 500 }; }) } },
          { id: "f2", title: "Most teams are small. A few big ones pull the average up.", caption: "Teams by headcount, one square each. Example data.", data: { kind: "waffle", total: 100, parts: (() => { const a = ri(38, 48), b = ri(25, 32), c = ri(12, 18); return [{ label: "1 to 3", n: a }, { label: "4 to 10", n: b }, { label: "11 to 30", n: c }, { label: "31+", n: 100 - a - b - c }]; })() } },
        ],
        free: ["Every finding and figure"], withAccount: ["Your role and county against the range", "The salary table as a CSV", "The report as a PDF"],
        pages: ri(26, 34), minutes: ri(10, 14),
      };
    },
  },
);

/* 7. AI OVERVIEWS IN IRELAND - share of Irish searches with an AI answer, by sector. */
exampleSeries(
  { slug: "ai-overviews-in-ireland", name: "AI Overviews in Ireland", line: "How often Google answers an Irish search with AI before anyone clicks, sector by sector.", cadence: "Quarterly", area: "search", lead: A.sam, checker: "Vera", method: "A fixed set of Irish searches per sector, run from an Irish address, the AI answer and its sources recorded.", mark: "AO", started: "2025-09-23" },
  QUARTERS,
  {
    count: 4,
    metrics: { aio: [21, 6, 2.5], ie: [34, -2, 1.5] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(1800, 2600); const a = share(n, v.aio / 100);
      const secs = shuffle(SECTORS).slice(0, 8);
      return {
        title: `Google answers ${pr(a.pct)} of Irish searches with AI first, and only ${pr(v.ie)} of its sources are Irish sites`,
        standfirst: `${fmt(n)} searches across ${secs.length} sectors, ${label}.`,
        sectors: secs.slice(0, 5), sample: `${fmt(n)} searches`,
        findings: [
          { big: `${a.pct}%`, label: "of searches get an AI answer", text: `${fmt(a.k)} of ${fmt(n)} searches opened with an AI answer, so the first click now goes to whoever it cites.`, count: a },
          { big: `${r1(v.ie)}%`, label: "of cited sources are .ie", text: `Only ${r1(v.ie)}% of the sources it cites are Irish sites. A UK page is answering Irish questions.` },
        ],
        figures: [
          { id: "f1", title: "The share of searches answered by AI, sector by sector.", caption: `Share of searches with an AI answer, ${label}. Example data.`, data: { kind: "bars", unit: "%", rows: secs.map((s) => ({ label: s, value: r1(Math.max(2, v.aio + r(-14, 18))) })).sort((x, y) => y.value - x.value) } },
          { id: "f2", title: "Each sector's line over time.", caption: `${labels[0]} to ${label}. Example data.`, data: { kind: "small", unit: "%", x: labels, panels: secs.slice(0, 6).map((s) => ({ label: s, values: hist.aio.slice(0, i + 1).map((x) => r1(Math.max(1, x + r(-10, 12)))) })) } },
        ],
        free: ["Every sector's share and sources"], withAccount: ["Your own searches, run each quarter", "Every answer and source as a CSV", "The report as a PDF"],
        pages: ri(16, 24), minutes: ri(6, 10),
      };
    },
  },
);

/* 8. THE BOARDROOM PULSE - CEOs and CMOs on AI budgets. */
exampleSeries(
  { slug: "the-boardroom-pulse", name: "The Boardroom Pulse", line: "What Irish chief executives and marketing directors plan to spend on AI, and what they fear.", cadence: "Twice a year", area: "adoption", lead: A.sam, checker: "Cato", method: "A panel of Irish CEOs, CFOs and marketing directors, the same eight questions every six months.", mark: "BP", started: "2024-11-26" },
  HALVES,
  {
    count: 4,
    metrics: { raise: [38, 5, 3], cut: [22, -2, 2], fear: [44, -1, 3] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(110, 190); const up = share(n, v.raise / 100), down = share(n, v.cut / 100), f = share(n, v.fear / 100);
      return {
        title: `${say(up)} Irish boards will spend more on AI next year, and the marketing budget is where most of it comes from`,
        standfirst: `${n} chief executives, finance and marketing directors, ${label}.`,
        sectors: shuffle(SECTORS).slice(0, 5), sample: `${n} board members`,
        findings: [
          { big: `${up.pct}%`, label: "will raise AI spend", text: `${up.k} of ${n} plan to spend more on AI, and most expect marketing to fund it.`, count: up },
          { big: `${down.pct}%`, label: "expect to cut agency fees", text: `${down.k} expect to cut agency fees to pay for it, the first time that line has moved.`, count: down },
          { big: `${f.pct}%`, label: "worry about quality", text: `${f.k} of ${n} name quality as the fear, ahead of cost or jobs.`, count: f },
        ],
        figures: [
          { id: "f1", title: "More boards plan to raise AI spend each round.", caption: `${labels[0]} to ${label}. Example data.`, data: { kind: "line", unit: "%", x: labels, series: [{ name: "Raise AI spend", values: hist.raise.slice(0, i + 1), highlight: true }, { name: "Cut agency fees", values: hist.cut.slice(0, i + 1) }] } },
          { id: "f2", title: "Where the money comes from.", caption: "Share of boards naming each budget as the source. Example data.", data: { kind: "stack", parts: ["Marketing", "IT", "Operations", "New money"], rows: ["CEOs", "CFOs", "Marketing directors"].map((l) => { const a = ri(30, 50), b = ri(15, 30), c = ri(10, 25); return { label: l, values: [a, b, c, 100 - a - b - c] }; }) } },
        ],
        free: ["Every finding and figure"], withAccount: ["Answers split by role and company size", "The full answer table as a CSV", "The report as a PDF"],
        pages: ri(14, 20), minutes: ri(6, 9),
      };
    },
  },
);

/* 9. THE CREATIVE AUDIT - AI-made against people-made ads. */
exampleSeries(
  { slug: "the-creative-audit", name: "The Creative Audit", line: "AI-made ads against people-made ads, scored the same way, every quarter.", cadence: "Quarterly", area: "brand", lead: A.sam, checker: "Vera", method: "A sample of Irish ads scored for distinctive assets, branding in the first two seconds and one clear message, blind to who made them.", mark: "CA", started: "2025-09-23" },
  QUARTERS,
  {
    count: 4,
    metrics: { branded2s: [41, 2, 3], aiBranded: [29, 4, 3], distinctive: [36, 1, 2] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(300, 520); const b = share(n, v.branded2s / 100), d = share(n, v.distinctive / 100);
      return {
        title: `Only ${pr(b.pct)} of Irish ads show the brand in the first two seconds, and AI-made ads do it ${v.aiBranded < v.branded2s ? "less" : "more"} often`,
        standfirst: `${n} ads scored blind, ${label}.`,
        sectors: shuffle(SECTORS).slice(0, 5), sample: `${n} ads`,
        findings: [
          { big: `${b.pct}%`, label: "branded in the first two seconds", text: `${b.k} of ${n} ads show the brand in the first two seconds, so most of the money buys attention for nobody in particular.`, count: b },
          { big: `${r1(v.aiBranded)}%`, label: "of AI-made ads do", text: `AI-made ads manage it ${r1(v.aiBranded)}% of the time. The tool is not the problem; the brief is.` },
          { big: `${d.pct}%`, label: "use a distinctive asset", text: `${d.k} ads use a distinctive asset at all, which is where the cheapest gains are.`, count: d },
        ],
        figures: [
          { id: "f1", title: "People-made and AI-made ads, scored the same way.", caption: `Share scoring well on each test, ${label}. Example data.`, data: { kind: "range", unit: "%", rows: ["Brand in 2 seconds", "Distinctive asset", "One message", "Readable at size"].map((l) => { const mid = r1(r(25, 60)); return { label: l, low: r1(mid - r(5, 14)), mid, high: r1(mid + r(5, 14)) }; }) } },
          { id: "f2", title: "AI-made ads are closing the gap on branding.", caption: `${labels[0]} to ${label}. Example data.`, data: { kind: "line", unit: "%", x: labels, series: [{ name: "All ads", values: hist.branded2s.slice(0, i + 1) }, { name: "AI-made", values: hist.aiBranded.slice(0, i + 1), highlight: true }] } },
        ],
        free: ["Every finding and figure", "The scoring rules"], withAccount: ["Send us your ad and get it scored", "Every ad's score as a CSV", "The report as a PDF"],
        pages: ri(18, 26), minutes: ri(7, 10),
      };
    },
  },
);

/* 10. SMALL FIRMS AND AI - SME adoption. */
exampleSeries(
  { slug: "small-firms-and-ai", name: "Small Firms and AI", line: "How Irish firms with under 50 people use AI in sales and marketing.", cadence: "Twice a year", area: "adoption", lead: A.sam, checker: "Vera", method: "A panel of Irish firms with under 50 staff, by county and sector, asked what they use and what they pay.", mark: "SF", started: "2024-06-11" },
  HALVES,
  {
    count: 4,
    metrics: { use: [26, 8, 3], paid: [11, 4, 2], spend: [38, 7, 4, 5, 500] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(400, 700); const u = share(n, v.use / 100), p = share(n, v.paid / 100);
      const counties = shuffle(COUNTIES).slice(0, 8);
      return {
        title: `${say(u)} small Irish firms use AI in their marketing, and the median one spends ${euro(v.spend)} a month on it`,
        standfirst: `${n} firms under 50 people, ${label}.`,
        sectors: shuffle(SECTORS).slice(0, 5), sample: `${n} small firms`,
        findings: [
          { big: `${u.pct}%`, label: "use AI in marketing", text: `${u.k} of ${n} small firms use AI in their marketing, mostly for writing.`, count: u },
          { big: `${p.pct}%`, label: "pay for a tool", text: `Only ${p.k} pay for any AI tool; the rest run on free tiers and goodwill.`, count: p },
          { big: euro(v.spend), label: "median monthly spend", text: `The median paying firm spends ${euro(v.spend)} a month, less than a single ad.` },
        ],
        figures: [
          { id: "f1", title: "Use by county: the gap is sector, not geography.", caption: `Share using AI in marketing, ${label}. Example data.`, data: { kind: "bars", unit: "%", rows: counties.map((c) => ({ label: c, value: r1(Math.max(4, u.pct + r(-9, 9))) })).sort((a, b) => b.value - a.value) } },
          { id: "f2", title: "What small firms use it for.", caption: "Each firm counted once per use. Example data.", data: { kind: "table", columns: ["Use", "Firms", "Share"], rows: ["Writing posts and emails", "Images", "Research", "Customer replies", "Ads", "Reporting"].map((l) => { const c = share(u.k, r(0.08, 0.8)); return [l, c.k, `${c.pct}%`]; }).sort((a, b) => b[1] - a[1]) } },
        ],
        free: ["Every finding and figure"], withAccount: ["Your county and sector against the rest", "The panel's answers as a CSV", "The report as a PDF"],
        pages: ri(16, 22), minutes: ri(6, 9),
      };
    },
  },
);

/* 11. THE MYSTERY SHOP - agents test how fast Irish firms answer. */
exampleSeries(
  { slug: "the-mystery-shop", name: "The Mystery Shop", line: "The same question put to the chat, email and phone of Irish firms, and how fast and how well they answer.", cadence: "Quarterly", area: "agents", lead: A.lena, checker: "Cato", method: "An agent sends the same customer question to each firm's website chat, email and phone, and scores the reply for speed and for whether it answered.", mark: "MS", started: "2025-12-16" },
  QUARTERS,
  {
    count: 3,
    metrics: { hours: [19, -2.5, 1.5, 1, 200], answered: [58, 3, 2], chat: [24, 5, 2] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(120, 200); const a = share(n, v.answered / 100), c = share(n, v.chat / 100);
      return {
        title: `Irish firms take ${Math.round(v.hours)} hours to answer an email, and only ${pr(a.pct)} of replies answer the question`,
        standfirst: `${n} firms, three channels each, ${label}.`,
        sectors: shuffle(SECTORS).slice(0, 6), sample: `${n} firms, ${n * 3} questions`,
        findings: [
          { big: `${r1(v.hours)}h`, label: "median email reply", text: `The median reply took ${r1(v.hours)} hours, long enough for a buyer to have asked a competitor.` },
          { big: `${a.pct}%`, label: "answered the question", text: `${a.k} of ${n} replies answered what was asked; the rest sent a link or a form.`, count: a },
          { big: `${c.pct}%`, label: "have a chat that replies", text: `${c.k} firms have a website chat that replies at all.`, count: c },
        ],
        figures: [
          { id: "f1", title: "Speed and quality by sector: fast is not the same as good.", caption: `Median hours to reply and share that answered, ${label}. Example data.`, data: { kind: "table", columns: ["Sector", "Median hours", "Answered", "Chat replies"], rows: shuffle(SECTORS).slice(0, 7).map((s) => [s, r1(Math.max(0.5, v.hours + r(-12, 20))), `${share(ri(12, 30), r(0.3, 0.85)).pct}%`, `${share(ri(12, 30), r(0.05, 0.5)).pct}%`]) } },
          { id: "f2", title: "One square per firm: who answered, who sent a form, who stayed silent.", caption: "Each firm's email reply. Example data.", data: { kind: "waffle", total: n, parts: (() => { const f = Math.round(n * r(0.12, 0.22)); const s = n - a.k - f; return [{ label: "Answered", n: a.k }, { label: "Sent a link or form", n: f }, { label: "No reply", n: Math.max(0, s) }]; })() } },
        ],
        free: ["Every finding and figure"], withAccount: ["Your own firm tested, all three channels", "Every reply scored, as a CSV", "The report as a PDF"],
        pages: ri(14, 20), minutes: ri(6, 9),
      };
    },
  },
);

/* 12. THE IRISH MARTECH INDEX - which tools Irish firms name. */
exampleSeries(
  { slug: "the-irish-martech-index", name: "The Irish Martech Index", line: "Which marketing tools Irish firms run, read from their websites and job ads.", cadence: "Twice a year", area: "media", lead: A.jeff, checker: "Vera", method: "The tools found on Irish firms' websites and named in their job ads, counted by category.", mark: "MX", started: "2025-05-20" },
  HALVES,
  {
    count: 3,
    metrics: { crm: [41, 3, 2], aiTool: [8, 6, 2], stack: [6.2, 0.5, 0.3, 1, 30] },
    edition({ i, label, v, hist, labels }) {
      const n = ri(1500, 2400); const c = share(n, v.crm / 100), ai = share(n, v.aiTool / 100);
      return {
        title: `The average Irish firm runs ${Math.round(v.stack)} marketing tools, and ${inN(ai)} now names an AI tool`,
        standfirst: `${fmt(n)} Irish firms' websites and job ads, ${label}.`,
        sectors: shuffle(SECTORS).slice(0, 5), sample: `${fmt(n)} firms`,
        findings: [
          { big: `${r1(v.stack)}`, label: "tools, median firm", text: `The median firm runs ${r1(v.stack)} tools, and most of them do not talk to each other.` },
          { big: `${c.pct}%`, label: "run a CRM", text: `${fmt(c.k)} of ${fmt(n)} run a CRM, the tool every AI agent needs to read first.`, count: c },
          { big: `${ai.pct}%`, label: "name an AI tool", text: `${fmt(ai.k)} name an AI tool on their site or in a job ad, up every half.`, count: ai },
        ],
        figures: [
          { id: "f1", title: "Share of firms with each kind of tool.", caption: `${label}. Example data.`, data: { kind: "bars", unit: "%", rows: ["CRM", "Email platform", "Analytics", "Ecommerce", "Chat widget", "AI tool", "Ad platform pixel"].map((l) => ({ label: l, value: l === "CRM" ? c.pct : l === "AI tool" ? ai.pct : r1(r(12, 78)), highlight: l === "AI tool" })).sort((a, b) => b.value - a.value) } },
          { id: "f2", title: "AI tools are the only category growing every half.", caption: `${labels[0]} to ${label}. Example data.`, data: { kind: "line", unit: "%", x: labels, series: [{ name: "CRM", values: hist.crm.slice(0, i + 1) }, { name: "AI tool", values: hist.aiTool.slice(0, i + 1), highlight: true }] } },
        ],
        free: ["Every finding and figure"], withAccount: ["Your sector's stack against the rest", "The tool table as a CSV", "The report as a PDF"],
        pages: ri(12, 18), minutes: ri(5, 8),
      };
    },
  },
);

/* ════════════════════════════ TRACKERS ════════════════════════════ */

function walk(n, start, step, noise, lo, hi) {
  const out = []; let v = start;
  for (let i = 0; i < n; i++) { out.push(r1(Math.max(lo, Math.min(hi, v)))); v += step + r(-noise, noise); }
  return out;
}
function weeksBack(n, end = "2026-09-21") {
  const e = new Date(end + "T12:00:00Z");
  return Array.from({ length: n }, (_, i) => { const d = new Date(e); d.setUTCDate(e.getUTCDate() - 7 * (n - 1 - i)); return d.toISOString().slice(0, 10); });
}
function monthsBack(n, end = "2026-09-01") {
  const e = new Date(end + "T12:00:00Z");
  return Array.from({ length: n }, (_, i) => { const d = new Date(e); d.setUTCMonth(e.getUTCMonth() - (n - 1 - i)); return d.toISOString().slice(0, 7); });
}

const TRACKERS = [];
{
  const js = ["2025-Q4", "2026-Q1", "2026-Q2", "2026-Q3"];
  TRACKERS.push({
    slug: "jobs-and-ai", name: "Jobs and AI", line: "The AI asks in Irish marketing and sales job ads.", area: "work", sectors: ["Technology and SaaS", "Retail and ecommerce"], cadence: "Weekly", owner: A.jeff, status: "testing", lastRead: "2026-09-24",
    reading: `${ASK.sep_all.pct}%`, readingLabel: "of marketing and sales ads ask for AI", count: ASK.sep_all,
    delta: `+${r1(ASK.jobsie["2026-Q3"].all.pct - ASK.jobsie["2026-Q2"].all.pct)} pts on jobs.ie`, direction: "up", unit: "%",
    // the history is jobs.ie alone, the one source read back a year; the reading is all seven sources on 24 Sep
    history: js.map((q) => ASK.jobsie[q].all.pct), historyLabels: js.map((q) => `jobs.ie, ${ASK.labels[q]}`),
    withAccount: ["Every ad behind the reading", "A note when it moves", "Your sector and role filtered out"], href: "/resources/jobs-ai", example: false,
  });
  TRACKERS.push({
    slug: "ai-answers-in-ireland", name: "AI answers in Ireland", line: "Who five AI engines name for Irish questions, read every morning.", area: "search", sectors: ["Public sector", "Tourism and hospitality", "Financial services"], cadence: "Daily", owner: A.sam, status: "testing", lastRead: "2026-08-23",
    reading: "17 of 41", readingLabel: "categories where a state body is named first", count: kofn(17, 41), delta: "first reading", direction: "flat", unit: "count",
    history: [17], historyLabels: ["2026-08-23"], withAccount: ["Your own category every morning", "The answers as a CSV"], href: "/resources/geo-ireland", example: false,
  });
}
const TRK = [
  ["irish-ads-by-sector", "Irish ads by sector", "New ads from Irish advertisers in the Meta and Google libraries.", "media", "Weekly", A.sam, "live", "count", 26, 7800, 40, 260, 4000, 14000, "active ads"],
  ["ai-overviews-coverage", "AI Overviews coverage", "The share of Irish searches where Google answers with AI first.", "search", "Weekly", A.sam, "live", "%", 26, 16, 0.3, 1.2, 2, 60, "of Irish searches"],
  ["ai-tools-in-job-specs", "AI tools in job specs", "Claude, ChatGPT, Copilot and the rest, counted where Irish employers name them.", "work", "Weekly", A.jeff, "live", "%", 20, 2.1, 0.08, 0.35, 0, 40, "of ads name an AI tool"],
  ["chat-on-the-homepage", "Chat on the homepage", "Irish firms' homepages with a chat that replies.", "agents", "Monthly", A.lena, "live", "%", 18, 14, 0.6, 1, 2, 80, "of 500 homepages"],
  ["reply-time", "Reply time", "Median hours for an Irish firm to answer a customer email.", "agents", "Monthly", A.lena, "testing", "count", 14, 22, -0.4, 1.6, 1, 72, "hours, median"],
  ["irish-cpc-index", "Irish cost per click", "Median Google cost per click on Irish commercial searches.", "media", "Weekly", A.sam, "live", "€", 26, 1.42, 0.01, 0.06, 0.4, 6, "per click, median"],
  ["meta-cpm-ireland", "Meta CPM, Ireland", "What a thousand impressions cost on Meta for Irish audiences.", "media", "Weekly", A.sam, "live", "€", 26, 6.8, 0.03, 0.35, 2, 20, "per 1,000 impressions"],
  ["linkedin-cpm-ireland", "LinkedIn CPM, Ireland", "What a thousand impressions cost on LinkedIn for Irish audiences.", "media", "Weekly", A.sam, "testing", "€", 20, 31, 0.1, 1.2, 10, 80, "per 1,000 impressions"],
  ["marketing-job-volume", "Marketing job volume", "New marketing job ads in Ireland each week.", "work", "Weekly", A.jeff, "live", "count", 26, 410, 1, 28, 150, 900, "new ads this week"],
  ["ai-looking-ads", "AI-looking ads", "The share of new Irish ads that carry the tells of AI imagery.", "brand", "Weekly", A.sam, "testing", "%", 20, 3.8, 0.25, 0.5, 0, 50, "of new ads"],
  ["sme-ai-use", "Small firms using AI", "The panel of small Irish firms that used AI in marketing this month.", "adoption", "Monthly", A.sam, "live", "%", 18, 24, 1, 1.4, 5, 90, "of small firms"],
  ["irish-sources-in-ai-answers", "Irish sources in AI answers", "The share of sources AI engines cite for Irish questions that are .ie sites.", "search", "Weekly", A.sam, "live", "%", 24, 36, -0.15, 1.1, 5, 80, "of cited sources"],
  ["forum-share-of-citations", "Forum share of citations", "How much of what AI cites for Irish questions comes from forums.", "search", "Weekly", A.sam, "testing", "%", 22, 11, 0.2, 0.8, 1, 50, "of citations"],
  ["ai-seat-price", "Price of an AI seat", "The median monthly price of a business seat on the main AI tools.", "adoption", "Monthly", A.sam, "live", "€", 16, 24, -0.1, 0.7, 5, 80, "a month, median"],
  ["head-of-marketing-pay", "Head of marketing pay", "Median advertised pay for a head of marketing in Ireland.", "work", "Monthly", A.jeff, "live", "€", 18, 84000, 180, 1400, 50000, 150000, "advertised, median"],
  ["public-tenders", "Public tenders for marketing", "New Irish public tenders for marketing, training and AI.", "work", "Weekly", A.jeff, "testing", "count", 20, 9, 0.05, 2.5, 0, 40, "new tenders this week"],
  ["newsletter-sends", "Newsletter sends", "Emails Irish brands sent to a seeded inbox each week.", "media", "Weekly", A.lena, "planned", "count", 12, 640, 3, 40, 200, 2000, "emails this week"],
  ["agent-job-titles", "Agent job titles", "Irish job ads with 'agent' or 'agentic' in the title or duties.", "work", "Weekly", A.jeff, "planned", "count", 12, 3, 0.2, 1, 0, 60, "ads this week"],
];
for (const [slug, name, line, area, cadence, owner, status, unit, len, start, step, noise, lo, hi, label] of TRK) {
  const h = walk(len, start, step, noise, lo, hi).map((x) => (unit === "count" ? Math.round(x) : unit === "€" && x > 1000 ? Math.round(x / 100) * 100 : unit === "€" ? Math.round(x * 100) / 100 : r1(x)));
  const labels = cadence === "Monthly" ? monthsBack(len) : weeksBack(len);
  const cur = h[h.length - 1], prev = h[h.length - 2];
  const d = unit === "%" ? r1(cur - prev) : unit === "€" ? Math.round((cur - prev) * 100) / 100 : Math.round(cur - prev);
  const reading = unit === "%" ? `${cur}%` : unit === "€" ? euro(cur) : fmt(cur);
  const delta = d === 0 ? "no change" : unit === "%" ? `${d > 0 ? "+" : ""}${d} pts` : unit === "€" ? `${d > 0 ? "+" : "-"}${euro(Math.abs(d))}` : `${d > 0 ? "+" : ""}${fmt(d)}`;
  const n = unit === "%" ? ri(300, 2400) : 0;
  TRACKERS.push({
    slug, name, line, area, sectors: shuffle(SECTORS).slice(0, 3), cadence, owner, status, lastRead: labels[labels.length - 1].length === 7 ? labels[labels.length - 1] + "-01" : labels[labels.length - 1],
    reading, readingLabel: label, ...(unit === "%" ? { count: kofn(Math.round((n * cur) / 100), n) } : {}),
    delta, direction: d > 0 ? "up" : d < 0 ? "down" : "flat", unit, history: h, historyLabels: labels,
    withAccount: ["The full history as a CSV", "A note when it moves", "Your sector filtered out"], example: true,
  });
}
// a % tracker's count must agree with its printed reading to one decimal; fix the reading off the count
for (const t of TRACKERS) if (t.example && t.count) { t.reading = `${t.count.pct}%`; t.history[t.history.length - 1] = t.count.pct; }

/* ════════════════════════════ DATASETS ════════════════════════════ */

const DATASETS = [];
{
  // REAL: GEO Ireland day one, from resources/data.ts (read by regex so the numbers are the file's).
  const src = fs.readFileSync(path.join(ROOT, "src/app/resources/data.ts"), "utf8");
  const cats = [...src.matchAll(/\{ name: "([^"]+)", top: "([^"]+)", rate: ([0-9.]+), owner: "(\w+)"/g)].map((m) => ({ category: m[1], first_name: m[2], rate: r1(Number(m[3]) * 100), owner: m[4] }));
  DATASETS.push({
    slug: "geo-ireland-day-one", name: "GEO Ireland, day one", line: "The first name five AI engines give for 41 categories of Irish life, and who owns it.", area: "search", sectors: ["Public sector", "Tourism and hospitality", "Health"],
    columns: [{ name: "category", type: "category", about: "The category of question" }, { name: "first_name", type: "text", about: "The name AI gives first, most often" }, { name: "rate", type: "percent", about: "Highest share of answers naming it, any engine" }, { name: "owner", type: "category", about: "State body, booking site or brand" }],
    rows: cats.length, updated: "2026-08-23", cadence: "Quarterly", owner: A.sam, licence: "Free to use with credit to Run with Foxes. Day one, not signed off.",
    sample: cats.slice(0, 8), size: "4 KB", csv: "/resources/data/geo-ireland-day-one.csv", usedIn: ["geo-ireland-no-01"], example: false,
  });
  DATASETS.push({
    slug: "the-ai-ask-roles-2026-q3", name: "The AI Ask, roles, Q3 2026", line: "Every marketing and sales role group, how many ads, and how many asked for AI.", area: "work", sectors: ["Technology and SaaS", "Retail and ecommerce"],
    columns: [{ name: "role", type: "category", about: "Role group" }, { name: "group", type: "category", about: "Marketing or sales" }, { name: "asks", type: "number", about: "Ads with a real AI ask" }, { name: "ads", type: "number", about: "Ads read" }, { name: "pct", type: "percent", about: "Share that asked" }],
    rows: ASK.roles.length, updated: "2026-09-25", cadence: "Quarterly", owner: A.sam, licence: "Free to use with credit to Run with Foxes. Draft, not yet approved.",
    sample: ASK.roles.slice(0, 8).map((x) => ({ role: x.role, group: x.group, asks: x.k, ads: x.n, pct: x.pct })), size: "2 KB", csv: "/resources/data/the-ai-ask-roles-2026-q3.csv", usedIn: ["the-ai-ask-2026-q3"], example: false,
  });
}
const DS = [
  ["irish-ad-library", "Irish ad library", "Every active ad from Irish advertisers on Meta and Google, one row per ad.", "media", "Weekly", [["advertiser", "text", "Advertiser, coded"], ["sector", "category", "Sector"], ["platform", "category", "Meta or Google"], ["format", "category", "Static, video or carousel"], ["first_seen", "date", "First day live"], ["ai_look", "boolean", "Carries AI imagery tells"]], 8000, 40000, ["irish-ads-by-sector"]],
  ["marketing-job-ads", "Marketing job ads", "Irish marketing and sales job ads, one row per ad, with the AI ask judged.", "work", "Weekly", [["title", "text", "Job title"], ["role", "category", "Role group"], ["county", "category", "County"], ["level", "category", "Seniority"], ["posted", "date", "Date posted"], ["ai_ask", "category", "Kind of AI ask, if any"]], 6000, 24000, ["the-ai-ask-2026-q3", "the-irish-marketing-team"]],
  ["ai-overview-answers", "AI Overview answers", "Irish searches, whether Google answered with AI, and every source it cited.", "search", "Weekly", [["query", "text", "The search"], ["sector", "category", "Sector"], ["has_aio", "boolean", "AI answer shown"], ["sources", "number", "Sources cited"], ["ie_sources", "number", ".ie sources cited"], ["read", "date", "Date run"]], 9000, 30000, ["ai-overviews-in-ireland"]],
  ["marketing-salaries", "Marketing salaries", "Advertised pay for Irish marketing roles, by role, level and county.", "work", "Monthly", [["role", "category", "Role"], ["level", "category", "Seniority"], ["county", "category", "County"], ["low", "euro", "Bottom of range"], ["high", "euro", "Top of range"], ["posted", "date", "Date posted"]], 3000, 9000, ["the-irish-marketing-team"]],
  ["homepage-chat-audit", "Homepage chat audit", "500 Irish homepages: is there a chat, does it reply, and how well.", "agents", "Monthly", [["sector", "category", "Sector"], ["has_chat", "boolean", "Chat on the page"], ["replies", "boolean", "It replied"], ["seconds", "number", "Seconds to reply"], ["answered", "boolean", "Answered the question"], ["read", "date", "Date tested"]], 500, 500, ["the-mystery-shop"]],
  ["reply-times", "Reply times", "The same customer question sent to Irish firms by email, chat and phone.", "agents", "Quarterly", [["sector", "category", "Sector"], ["channel", "category", "Email, chat or phone"], ["hours", "number", "Hours to reply"], ["answered", "boolean", "Answered the question"], ["sent", "date", "Date sent"]], 400, 600, ["the-mystery-shop"]],
  ["martech-stacks", "Martech stacks", "The marketing tools found on Irish firms' websites, one row per firm.", "media", "Twice a year", [["sector", "category", "Sector"], ["county", "category", "County"], ["tools", "number", "Tools found"], ["crm", "boolean", "Runs a CRM"], ["ai_tool", "boolean", "Names an AI tool"], ["read", "date", "Date read"]], 1500, 2400, ["the-irish-martech-index"]],
  ["sme-panel-answers", "Small firm panel", "Answers from the panel of Irish firms under 50 people, one row per firm per round.", "adoption", "Twice a year", [["sector", "category", "Sector"], ["county", "category", "County"], ["staff", "number", "Headcount"], ["uses_ai", "boolean", "Uses AI in marketing"], ["monthly_spend", "euro", "AI spend a month"], ["round", "category", "Survey round"]], 1600, 2800, ["small-firms-and-ai"]],
  ["boardroom-panel", "Boardroom panel", "The eight questions put to Irish CEOs, CFOs and marketing directors each round.", "adoption", "Twice a year", [["role", "category", "CEO, CFO or marketing director"], ["size", "category", "Company size"], ["raise_ai", "boolean", "Will raise AI spend"], ["source", "category", "Where the money comes from"], ["fear", "category", "Biggest worry"], ["round", "category", "Survey round"]], 400, 700, ["the-boardroom-pulse"]],
  ["creative-scores", "Creative scores", "Irish ads scored blind on four tests, one row per ad.", "brand", "Quarterly", [["sector", "category", "Sector"], ["made_with_ai", "boolean", "AI-made"], ["brand_2s", "boolean", "Brand in first 2 seconds"], ["distinctive", "boolean", "Uses a distinctive asset"], ["one_message", "boolean", "One clear message"], ["scored", "date", "Date scored"]], 1200, 2000, ["the-creative-audit"]],
  ["cpc-by-sector", "Cost per click by sector", "Median Google cost per click on Irish commercial searches, weekly, by sector.", "media", "Weekly", [["week", "date", "Week"], ["sector", "category", "Sector"], ["cpc", "euro", "Median cost per click"], ["searches", "number", "Searches in the sample"]], 1400, 1400, ["irish-ads-by-sector"]],
  ["cpm-by-platform", "CPM by platform", "What 1,000 impressions cost on Meta, LinkedIn and Google for Irish audiences.", "media", "Weekly", [["week", "date", "Week"], ["platform", "category", "Platform"], ["audience", "category", "Audience"], ["cpm", "euro", "Cost per 1,000"]], 900, 900, [] ],
  ["agent-run-log", "Agent run log", "Our own agent team's tasks: what each did, what it cost, whether it came back.", "agents", "Monthly", [["agent", "category", "Agent"], ["task", "category", "Kind of task"], ["cost", "euro", "Model cost"], ["seconds", "number", "Run time"], ["handed_back", "boolean", "Came back to a person"], ["run", "date", "Date run"]], 6000, 9000, ["agent-economics"]],
  ["public-tenders-marketing", "Public tenders, marketing", "Irish public tenders for marketing, training and AI, one row per tender.", "work", "Weekly", [["buyer_type", "category", "Kind of public body"], ["category", "category", "Marketing, training or AI"], ["value_band", "category", "Estimated value"], ["closes", "date", "Closing date"], ["county", "category", "County"]], 300, 600, []],
  ["ai-citation-sources", "AI citation sources", "Every source AI engines cited for Irish questions, with its domain and kind.", "search", "Weekly", [["engine", "category", "AI engine"], ["category", "category", "Question category"], ["domain_kind", "category", "State, forum, brand, media or other"], ["is_ie", "boolean", ".ie domain"], ["read", "date", "Date read"]], 12000, 40000, ["ai-overviews-in-ireland"]],
  ["newsletter-inbox", "Newsletter inbox", "Emails from Irish brands to a seeded inbox: sender sector, send day and subject length.", "media", "Weekly", [["sector", "category", "Sender sector"], ["sent", "date", "Date sent"], ["weekday", "category", "Day of the week"], ["subject_words", "number", "Words in the subject"], ["has_offer", "boolean", "Carries an offer"]], 4000, 9000, []],
  ["ai-seat-prices", "AI seat prices", "The monthly price of a business seat on the main AI tools, tracked over time.", "adoption", "Monthly", [["tool_kind", "category", "Kind of tool"], ["plan", "category", "Plan"], ["price", "euro", "Price a month"], ["month", "date", "Month"]], 200, 400, []],
  ["team-pages", "Marketing team pages", "The marketing teams Irish firms show on their websites: size and roles.", "work", "Yearly", [["sector", "category", "Sector"], ["team_size", "number", "People listed"], ["has_ops", "boolean", "Marketing ops role"], ["has_content", "boolean", "Content role"], ["read", "date", "Date read"]], 400, 800, ["the-irish-marketing-team"]],
];
const BOOL = () => rnd() < 0.4;
function sampleValue(name, type, i) {
  if (type === "boolean") return BOOL();
  if (type === "date") { const d = new Date("2026-09-20T12:00:00Z"); d.setUTCDate(d.getUTCDate() - ri(0, 60)); return d.toISOString().slice(0, 10); }
  if (type === "euro") return name.includes("cpc") ? Math.round(r(0.4, 4) * 100) / 100 : name.includes("cpm") ? Math.round(r(3, 40) * 100) / 100 : name.includes("low") ? Math.round(r(35000, 70000) / 500) * 500 : name.includes("high") ? Math.round(r(60000, 120000) / 500) * 500 : Math.round(r(10, 400));
  if (type === "percent") return r1(r(1, 60));
  if (type === "number") return name.includes("seconds") ? ri(2, 400) : name.includes("hours") ? r1(r(0.2, 48)) : name.includes("staff") || name.includes("size") ? ri(2, 48) : ri(1, 30);
  if (type === "text") return name === "advertiser" ? `ADV-${String(ri(100, 999))}` : name === "title" ? `${pick(["Senior ", "", "Junior ", "Head of "])}${pick(ROLES)} ${pick(["Manager", "Executive", "Lead", "Specialist"])}` : name === "query" ? pick(["best hotel in", "accountant in", "car insurance", "gym near", "solicitor in", "mortgage advice", "wedding venue in", "dentist in"]) + " " + pick(COUNTIES).toLowerCase() : `row ${i + 1}`;
  // category
  const m = { sector: SECTORS, county: COUNTIES, role: ROLES, level: ["Entry", "Executive", "Manager", "Head"], platform: ["Meta", "Google"], format: ["Static", "Video", "Carousel"], channel: ["Email", "Chat", "Phone"], engine: ["Claude", "ChatGPT", "Perplexity", "Google AI", "Copilot"], ai_ask: ["None", "Use AI tools", "Sell an AI product", "Lead or buy AI", "Be found in AI search"], domain_kind: ["State", "Forum", "Brand", "Media", "Other"], category: ["Marketing", "Training", "AI"], buyer_type: ["Local authority", "State agency", "University", "Health body"], value_band: ["Under €25k", "€25k to €50k", "€50k to €150k"], agent: ["Sam", "Jeff", "Lena", "Vera", "Cato"], task: ["Research", "Writing", "Checking", "Reporting"], tool_kind: ["Chat assistant", "Writing", "Images", "Meetings"], plan: ["Team", "Business", "Pro"], weekday: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], source: ["Marketing", "IT", "Operations", "New money"], fear: ["Quality", "Cost", "Jobs", "Data"], size: ["Under 50", "50 to 250", "250+"], round: ["H1 2026", "H2 2025"], audience: ["Broad", "B2B", "Lookalike"], group: ["Marketing", "Sales"] };
  return pick(m[name] ?? SECTORS);
}
for (const [slug, name, line, area, cadence, cols, lo, hi, usedIn] of DS) {
  const rows = ri(lo, hi);
  const columns = cols.map(([n, t, about]) => ({ name: n, type: t, about }));
  const sample = Array.from({ length: 8 }, (_, i) => Object.fromEntries(columns.map((c) => [c.name, sampleValue(c.name, c.type, i)])));
  // rows must make sense on their own: a part never exceeds its whole, a range's top sits above its bottom
  for (const row of sample) {
    if ("ie_sources" in row && "sources" in row) { row.sources = ri(2, 9); row.ie_sources = ri(0, row.sources); }
    if ("low" in row && "high" in row && row.high <= row.low) row.high = row.low + Math.round(r(6000, 18000) / 500) * 500;
    if ("has_chat" in row && !row.has_chat) { row.replies = false; row.answered = false; row.seconds = 0; }
    if ("replies" in row && !row.replies) { row.answered = false; row.seconds = 0; }
  }
  const kb = Math.max(1, Math.round((rows * columns.length * 11) / 1024));
  DATASETS.push({
    slug, name, line, area, sectors: shuffle(SECTORS).slice(0, 3), columns, rows, updated: weeksBack(1, `2026-09-${String(ri(8, 24)).padStart(2, "0")}`)[0], cadence, owner: pick([A.sam, A.jeff, A.lena]),
    licence: "Free to use with credit to Run with Foxes. Example data.", sample, size: kb >= 1024 ? `${r1(kb / 1024)} MB` : `${kb} KB`, csv: `/resources/data/${slug}.csv`, usedIn, example: true,
  });
}

/* ════════════════════════════ TOOLS ════════════════════════════ */

const TOOLS = [
  { slug: "brief-diagnostician", name: "Brief Diagnostician", line: "Paste a brief. It tells you which way it wants the ad to work, and the choice it avoids.", area: "brand", input: "A creative brief", free: "The diagnosis on screen", full: "A marked-up brief and three questions to send back", minutes: 3, status: "live", href: "/tools/brief-diagnostician", example: false },
  { slug: "metrics-pyramid", name: "The Metrics Pyramid", line: "Paste what you track and see where each metric sits, from activity to commercial outcome.", area: "work", input: "The metrics you report on", free: "Your pyramid on screen", full: "The pyramid as a slide and a gap list", minutes: 4, status: "live", href: "/tools/metrics-pyramid", example: false },
  { slug: "ai-writer", name: "AI Writer", line: "How we build a writer trained on a brand, step by step, and a working one to try.", area: "agents", input: "Your website address", free: "Three posts in your brand's voice", full: "The writer's instructions to run in your own Claude", minutes: 5, status: "live", href: "/tools/ai-writer", example: false },
  { slug: "brand-in-the-answer", name: "Your brand in the answer", line: "Put in your brand and category. See what five AI engines say about you.", area: "search", input: "Brand name and category", free: "Whether each engine names you", full: "Every answer, every source, and what to change", minutes: 2, status: "beta", example: true },
  { slug: "message-grader", name: "Message grader", line: "Paste your homepage. It grades whether a buyer can tell what you do in five seconds.", area: "brand", input: "A web address", free: "The grade and the one line that costs you most", full: "Line-by-line notes and a rewrite", minutes: 3, status: "coming", example: true },
  { slug: "ai-policy-builder", name: "AI policy builder", line: "Answer twelve questions and get a one-page AI policy your team will actually read.", area: "adoption", input: "Twelve answers about your team", free: "The policy on screen", full: "The policy as a Word file you can edit", minutes: 6, status: "beta", example: true },
  { slug: "agent-cost-calculator", name: "Agent cost calculator", line: "Describe a task. See what an agent would cost to run it for a year, against a person.", area: "agents", input: "The task and how often", free: "The yearly cost on screen", full: "The cost model as a spreadsheet", minutes: 2, status: "live", example: true },
  { slug: "job-ad-checker", name: "Job ad checker", line: "Paste a marketing job ad. See how its AI ask compares with the rest of Ireland.", area: "work", input: "A job ad", free: "How its ask compares", full: "A rewrite of the AI lines", minutes: 2, status: "beta", example: true },
  { slug: "ad-scorer", name: "Ad scorer", line: "Upload an ad. It scores it on the four tests from The Creative Audit.", area: "brand", input: "An image or video ad", free: "The four scores", full: "Notes on each test and how the sector did", minutes: 2, status: "coming", example: true },
  { slug: "reply-test", name: "Reply test", line: "We send your firm the same question as the Mystery Shop and tell you how you did.", area: "agents", input: "Your website and email", free: "Your reply time against your sector", full: "The replies scored, channel by channel", minutes: 1, status: "beta", example: true },
  { slug: "benchmark-finder", name: "Benchmark finder", line: "Is my number normal? Put in a cost per lead or open rate and see it against your sector.", area: "media", input: "One number and your sector", free: "Where it sits in the range", full: "The full sector table and the trend", minutes: 1, status: "live", example: true },
  { slug: "prompt-library-search", name: "Prompt finder", line: "Describe a job. It finds the prompt in The Library that does it.", area: "agents", input: "A job in one line", free: "The best prompt, ready to copy", full: "The prompt's lesson and the files that go with it", minutes: 1, status: "beta", example: true },
];

/* ════════════════════════════ PLAYBOOKS ════════════════════════════ */

const PB = [
  ["the-cfo-brief-prompt", "The CFO brief prompt", "Prompt", "Turn a marketing plan into the page a finance director reads.", "work", ["Paste the plan", "Name the decision you need", "Let it write the one page", "Check every number against the plan"], [["cfo-brief-prompt.md", "Markdown"]], "Course, module 1", false],
  ["kite-campaign-results", "Kite campaign results", "Spreadsheet", "The real results of a 2025 campaign, laid out so you can copy the structure.", "media", ["Open the sheet", "Read the three tabs in order", "Copy the layout for your own"], [["kite-campaign-2025.xlsx", "Excel"]], "Course, module 2", false],
  ["the-agent-brief", "The agent brief", "Agent brief", "How we brief an agent: its one job, what it reads, where it writes, and when it stops.", "agents", ["Name the one job", "List what it reads", "Say where it writes", "Say when it hands back", "Test it on last week"], [["agent-brief-template.md", "Markdown"], ["agent-brief-example.md", "Markdown"]], null, true],
  ["geo-audit-checklist", "GEO audit checklist", "Checklist", "Twenty checks to see whether AI engines can find and trust your site.", "search", ["Run your category questions", "Check who is named", "Check your sources", "Fix the three biggest gaps"], [["geo-audit.xlsx", "Excel"]], "GEO Ireland", true],
  ["messaging-framework", "Messaging framework", "Framework", "How we start a brand: the buyer, the pain, the proof, the line.", "brand", ["Write the buyer in one line", "Name the pain in their words", "Line up the proof", "Write the line last"], [["messaging-framework.docx", "Word"]], null, true],
  ["weekly-report-agent", "The weekly report agent", "Agent brief", "An agent that reads your ad accounts every Monday and writes the note you would have.", "agents", ["Connect the accounts", "Give it last month's note as the example", "Set it to Monday 7am", "Read its first three before trusting it"], [["weekly-report-agent.md", "Markdown"]], null, true],
  ["ai-policy-one-page", "The one-page AI policy", "Template", "A policy short enough that people read it.", "adoption", ["What we use", "What never goes in", "Who checks", "What to do when it goes wrong"], [["ai-policy.docx", "Word"]], null, true],
  ["distinctive-asset-audit", "Distinctive asset audit", "Checklist", "List your brand's assets and score how often each one turns up.", "brand", ["List every asset", "Count where each appears", "Score recognition", "Pick two to keep and use everywhere"], [["asset-audit.xlsx", "Excel"]], null, true],
  ["job-ad-rewrite-prompt", "Job ad rewrite prompt", "Prompt", "Rewrite a marketing job ad so its AI ask is specific.", "work", ["Paste the ad", "Name the three jobs AI will do", "Let it rewrite the AI lines", "Cut anything vague"], [["job-ad-prompt.md", "Markdown"]], "The AI Ask", true],
  ["ad-versioning-kit", "Ad versioning kit", "Template", "One master ad, cut to every size, without losing the brand.", "brand", ["Start from the master", "Lock the brand zones", "Cut the sizes", "Check each at real size"], [["versioning-sizes.pdf", "PDF"], ["versioning-checklist.md", "Markdown"]], "Essay, ad versioning in six seconds", true],
  ["customer-reply-agent", "The customer reply agent", "Agent brief", "An agent that drafts every customer reply for a person to send.", "agents", ["Give it your ten best replies", "Set the rules for what it never says", "It drafts, a person sends", "Review the unsure pile daily"], [["reply-agent.md", "Markdown"]], "Essay, how I build proactive agents", true],
  ["board-ai-paper", "The board AI paper", "Template", "A four-page paper to take AI spend to a board.", "adoption", ["The decision", "The cost", "The risk", "The first ninety days"], [["board-paper.docx", "Word"]], "The Boardroom Pulse", true],
  ["cep-questionnaire", "Category entry point questionnaire", "Template", "The questions to find the moments people think of your category.", "brand", ["Screen the buyer", "Ask the moments", "Prompt the brands", "Score the answers"], [["cep-questionnaire.docx", "Word"]], null, true],
  ["reddit-research-prompt", "Reddit research prompt", "Prompt", "Pull real customer language out of forums before writing a word.", "search", ["Name the subreddits", "Pull the threads", "Group the pains", "Quote, don't paraphrase"], [["reddit-research.md", "Markdown"]], null, true],
  ["newsletter-teardown", "Newsletter teardown", "Checklist", "Twelve checks on a marketing email before it goes.", "media", ["Subject in six words", "One job per email", "Link above the fold", "Plain text version"], [["newsletter-checks.md", "Markdown"]], null, true],
  ["budget-split-sheet", "Brand and activation split", "Spreadsheet", "Put in your budget and see the brand-to-activation split against the benchmark.", "media", ["List the lines", "Tag each brand or activation", "Read the split", "Move one line"], [["budget-split.xlsx", "Excel"]], null, true],
  ["tender-response-kit", "Tender response kit", "Template", "The structure of a public tender response for a marketing contract.", "work", ["Read the scoring grid", "Answer in its order", "Prove each claim", "Price last"], [["tender-response.docx", "Word"]], null, true],
  ["meeting-notes-agent", "The meeting notes agent", "Agent brief", "An agent that turns a call recording into actions in your CRM.", "agents", ["Point it at the recordings", "Tell it your CRM fields", "It writes, you approve", "Check the first week"], [["meeting-agent.md", "Markdown"]], null, true],
  ["ai-search-content-plan", "AI search content plan", "Framework", "Plan the pages that get your brand named in AI answers.", "search", ["Find the questions", "See who is named", "Write the answer page", "Get cited elsewhere"], [["ai-search-plan.xlsx", "Excel"]], "GEO Ireland", true],
  ["95-5-model", "The 95:5 model", "Spreadsheet", "How many of your buyers are in the market today, and what that means for spend.", "media", ["Set the buying cycle", "Set the market size", "Read the in-market share", "Split the budget"], [["95-5-model.xlsx", "Excel"]], "Essay, the 95:5 rule", true],
];
const PLAYBOOKS = PB.map(([slug, name, kind, line, area, steps, files, from, example]) => ({ slug, name, kind, line, area, steps, files: files.map(([n, f]) => ({ name: n, format: f })), ...(from ? { from } : {}), example }));

/* ════════════════════════════ WRITE AND CHECK ════════════════════════════ */

/* PDF page counts, read back by scripts/resources/build-pdfs.mjs (it writes pdf-pages.json beside itself).
   When a slug is there, its real page count replaces the seeded guess, so the catalogue never promises
   a page count the file does not have. */
const PAGES_FILE = path.join(__dirname, "pdf-pages.json");
const PDF_PAGES = fs.existsSync(PAGES_FILE) ? JSON.parse(fs.readFileSync(PAGES_FILE, "utf8")) : {};
for (const rp of REPORTS) if (PDF_PAGES[rp.slug]) rp.pages = PDF_PAGES[rp.slug];

const cat = { built: "2026-09-26", seed: SEED, authors: Object.values(A), series: SERIES, reports: REPORTS.sort((a, b) => b.date.localeCompare(a.date)), trackers: TRACKERS, datasets: DATASETS, tools: TOOLS, playbooks: PLAYBOOKS };

// every KofN anywhere in the file must agree with itself
let bad = 0, counts = 0;
(function walkObj(o, where) {
  if (Array.isArray(o)) return o.forEach((x, i) => walkObj(x, `${where}[${i}]`));
  if (o && typeof o === "object") {
    if ("k" in o && "n" in o && "pct" in o) { counts++; if (r1((100 * o.k) / o.n) !== o.pct || o.k > o.n) { bad++; console.error("BAD COUNT", where, o); } }
    for (const [k, v] of Object.entries(o)) walkObj(v, `${where}.${k}`);
  }
})(cat, "catalogue");
// every stack row sums to 100, every waffle to its total
for (const rp of cat.reports) for (const f of rp.figures) {
  if (f.data.kind === "stack") for (const row of f.data.rows) { const s = r1(row.values.reduce((a, b) => a + b, 0)); if (Math.abs(s - 100) > 0.2) { bad++; console.error("STACK", rp.slug, f.id, row.label, s); } }
  if (f.data.kind === "waffle") { const s = f.data.parts.reduce((a, b) => a + b.n, 0); if (s !== f.data.total) { bad++; console.error("WAFFLE", rp.slug, f.id, s, f.data.total); } }
}
const slugs = new Set(); for (const x of [...cat.reports, ...cat.trackers, ...cat.datasets, ...cat.tools, ...cat.playbooks]) { if (slugs.has(x.slug)) { bad++; console.error("DUP SLUG", x.slug); } slugs.add(x.slug); }
if (bad) { console.error(`${bad} problems`); process.exit(1); }

const json = JSON.stringify(cat, null, 1) + "\n";
if (process.argv.includes("--check")) {
  const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (now !== json) { console.error("catalogue.json is not what the generator writes. Run it without --check."); process.exit(1); }
  console.log(`ok, ${counts} counts agree`);
} else {
  fs.writeFileSync(OUT, json);
  const pub = cat.reports.filter((x) => x.status !== "coming");
  console.log(`wrote ${path.relative(ROOT, OUT)}: ${cat.series.length} series, ${cat.reports.length} reports (${pub.length} published or draft), ${cat.trackers.length} trackers, ${cat.datasets.length} datasets, ${cat.tools.length} tools, ${cat.playbooks.length} playbooks; ${counts} counts checked`);
}
