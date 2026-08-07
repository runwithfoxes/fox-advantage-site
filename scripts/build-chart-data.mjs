#!/usr/bin/env node
/**
 * ⭐ CHART DATA IS GENERATED, NEVER TYPED. Reads campaigns-2025.csv (deduplicated, the
 * same cleaning the recorded analyst does) and emits chartData.generated.ts. The recorded
 * session's chart blocks name a chart id; the points come from here; so a chart cannot
 * carry a number that is not in the file. Same doctrine as personas.generated.ts.
 *
 * Run: node scripts/build-chart-data.mjs   (after any regeneration of the dataset)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const csv = readFileSync(
  path.join(root, "course-files/module-1/data/campaigns-2025.csv"),
  "utf8",
).trim();

/* The csv is written with \r\n line endings (python csv module default). */
const [header, ...lines] = csv.split(/\r?\n/);
if (header !== "week_starting,channel,segment_focus,spend_eur,quotes_started,new_policies")
  throw new Error("csv header changed: " + header);

/* The same dedupe the analyst performs: an identical line counts once. */
const seen = new Set();
const rows = [];
for (const l of lines) {
  if (seen.has(l)) continue;
  seen.add(l);
  const [week, channel, , spend, quotes, policies] = l.split(",");
  rows.push({ week, channel, spend: +spend, quotes: +quotes, policies: +policies });
}

const weekly = (channel, field, from, to) =>
  rows
    .filter((r) => r.channel === channel && r.week >= from && r.week <= to)
    .map((r) => [r.week, r[field]]);

/* Module 3: the customer file. Same doctrine: shares computed here, never typed. */
const csv3 = readFileSync(
  path.join(root, "course-files/module-3/data/customers.csv"),
  "utf8",
).trim();
const [header3, ...lines3] = csv3.split(/\r?\n/);
const COLS = header3.split(",");
if (COLS[0] !== "customer_id" || COLS[1] !== "segment" || COLS[15] !== "works_from_home")
  throw new Error("customers.csv header changed: " + header3);
const customers = lines3.map((l) => {
  const v = l.split(",");
  return Object.fromEntries(COLS.map((c, i) => [c, v[i]]));
});

const pct = (group, f) =>
  Math.round((100 * group.filter(f).length) / group.length);

/* The five behaviours the segments are told apart by. */
const BEHAVIOURS = [
  ["auto-renew", (r) => r.auto_renew === "yes"],
  ["switched in 3y", (r) => +r.switches_last_3_years > 0],
  ["3+ quotes", (r) => +r.comparison_quotes_last_renewal >= 3],
  ["2+ policies", (r) => +r.policies_held >= 2],
  ["acted in 7 days", (r) => +r.days_letter_to_action <= 7],
];

/* The home-worker comparison runs on customers whose field is filled (collected at
   quote), the same population the recorded analyst reports on. */
const known = customers.filter((r) => r.works_from_home !== "");
const wfhYes = known.filter((r) => r.works_from_home === "yes");
const wfhNo = known.filter((r) => r.works_from_home === "no");
const PROFILE = [
  ["25-44", (r) => r.age_band === "25-34" || r.age_band === "35-44"],
  ["apartment", (r) => r.home_type === "apartment"],
  ["Dublin", (r) => r.region === "Dublin"],
  ...BEHAVIOURS.filter(([n]) => n !== "acted in 7 days"),
  ["claim-free", (r) => +r.claims_last_5_years === 0],
];

const charts = {
  /* The March spike: two channels' quotes double in the same weeks on flat spend. */
  march: {
    title: "Quotes started per week, Jan to Jun",
    series: [
      { name: "brand-search", points: weekly("brand-search", "quotes", "2025-01-06", "2025-06-30") },
      { name: "price-comparison", points: weekly("price-comparison", "quotes", "2025-01-06", "2025-06-30") },
    ],
    bands: [{ from: "2025-03-10", to: "2025-03-31", label: "Ardline letter" }],
  },
  /* The radio halo: search quotes over the year with the radio bursts marked. */
  "radio-halo": {
    title: "brand-search quotes per week, full year",
    series: [
      { name: "brand-search", points: weekly("brand-search", "quotes", "2025-01-06", "2025-12-29") },
    ],
    bands: [
      { from: "2025-02-03", to: "2025-03-31", label: "radio burst 1" },
      { from: "2025-09-01", to: "2025-10-27", label: "radio burst 2" },
    ],
  },
  /* Module 3: the two profiles nearly coincide where money moves. The left of the
     x-axis is demographics (real, visible tilts), the right is renewal behaviour. */
  "home-worker-profile": {
    title: "Share of group on each measure, %",
    series: [
      { name: "works from home", points: PROFILE.map(([n, f]) => [n, pct(wfhYes, f)]) },
      { name: "everyone else", points: PROFILE.map(([n, f]) => [n, pct(wfhNo, f)]) },
    ],
  },
  /* Module 3: what a real behavioural difference looks like, for contrast. */
  "segment-behaviour": {
    title: "Share of segment on each behaviour, %",
    series: ["Payer", "Switcher", "Juggler"].map((seg) => ({
      name: seg,
      points: BEHAVIOURS.map(([n, f]) => [
        n,
        pct(customers.filter((r) => r.segment === seg), f),
      ]),
    })),
  },
};

/* ⭐ Module 3, item 01: THE YARDSTICK. One scale, every pair of groups compared on
   every measure in the customer file, so the reader owns "how different is different
   enough" before the recording plays. Method matches build-kite-segment-data.py
   exactly (distribution similarity: 100 minus half the summed absolute deviation,
   averaged across attributes). The segment pairs drop the segment label itself, which
   would be degenerate (each group is 100% its own label); the home-worker pair keeps
   it, matching the 92.1 the dataset generator asserts. */
const distOf = (group, key, bucket) => {
  const c = {};
  for (const r of group) {
    const v = bucket ? bucket(+r[key]) : r[key];
    c[v] = (c[v] || 0) + 1;
  }
  for (const k in c) c[k] = (100 * c[k]) / group.length;
  return c;
};
const similarity = (a, b, attrs) => {
  const sims = attrs.map(([key, bucket]) => {
    const da = distOf(a, key, bucket);
    const db = distOf(b, key, bucket);
    let dev = 0;
    for (const k of new Set([...Object.keys(da), ...Object.keys(db)]))
      dev += Math.abs((da[k] || 0) - (db[k] || 0));
    return 100 - dev / 2;
  });
  return sims.reduce((x, y) => x + y, 0) / sims.length;
};
const daysBucket = (d) => (d <= 5 ? "0-5" : d <= 10 ? "6-10" : d <= 20 ? "11-20" : "21+");
const premBucket = (p) => (p < 350 ? "<350" : p < 450 ? "350-450" : p < 550 ? "450-550" : "550+");
const contBucket = (c) => (c < 30000 ? "<30k" : c < 40000 ? "30-40k" : c < 50000 ? "40-50k" : "50k+");
const SIM_BEHAVIOUR = [
  ["auto_renew", null],
  ["switches_last_3_years", null],
  ["comparison_quotes_last_renewal", null],
  ["policies_held", null],
  ["days_letter_to_action", daysBucket],
];
const SIM_ALL = [
  ...SIM_BEHAVIOUR,
  ["segment", null],
  ["age_band", null],
  ["region", null],
  ["home_type", null],
  ["claims_last_5_years", null],
  ["years_with_kite", null],
  ["premium_annual_eur", premBucket],
  ["contents_sum_insured_eur", contBucket],
];
const SIM_NOSEG = SIM_ALL.filter(([k]) => k !== "segment");
const segOf = (s) => customers.filter((r) => r.segment === s);
const pairSim = (a, b) => similarity(segOf(a), segOf(b), SIM_NOSEG);
const wfhSim = similarity(wfhYes, wfhNo, SIM_ALL);
/* The planted shape, asserted so a dataset change cannot silently bend the chart. */
if (!(wfhSim >= 86 && wfhSim <= 93))
  throw new Error(`home-worker similarity ${wfhSim.toFixed(1)} out of the planted band`);
const yardstick = {
  title: "How similar are the two groups, %",
  line: 90,
  lineLabel: "the same people",
  pairs: [
    { name: "Payer vs Switcher", value: +pairSim("Payer", "Switcher").toFixed(1) },
    { name: "Payer vs Juggler", value: +pairSim("Payer", "Juggler").toFixed(1) },
    { name: "Switcher vs Juggler", value: +pairSim("Switcher", "Juggler").toFixed(1) },
    { name: "home workers vs everyone else", value: +wfhSim.toFixed(1), subject: true },
  ],
};
for (const p of yardstick.pairs.slice(0, 3))
  if (p.value >= 75)
    throw new Error(`${p.name} similarity ${p.value}: segments too alike for the yardstick to teach`);

const out = `/* GENERATED by scripts/build-chart-data.mjs from campaigns-2025.csv.
 * ⛔ Do not edit: every point is read from the file, deduplicated, so a chart cannot
 * carry a number that is not in the data. Regenerate after any dataset change. */

export type ChartSpec = {
  title: string;
  series: { name: string; points: [string, number][] }[];
  bands?: { from: string; to: string; label: string }[];
};

export const CHARTS: Record<string, ChartSpec> = ${JSON.stringify(charts, null, 2)};

export type YardstickSpec = {
  title: string;
  line: number;
  lineLabel: string;
  pairs: { name: string; value: number; subject?: boolean }[];
};

export const YARDSTICK: YardstickSpec = ${JSON.stringify(yardstick, null, 2)};
`;

writeFileSync(path.join(root, "src/app/course/chartData.generated.ts"), out);
console.log(
  "WROTE src/app/course/chartData.generated.ts:",
  Object.entries(charts)
    .map(([k, c]) => `${k} (${c.series.map((s) => s.points.length).join("+")} pts)`)
    .join(", "),
);
