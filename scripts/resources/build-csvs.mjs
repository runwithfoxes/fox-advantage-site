#!/usr/bin/env node
/**
 * WRITES THE DATA FILES the resource centre hands over through the gate:
 *   public/resources/data/<dataset-slug>.csv          one per dataset
 *   public/resources/data/<tracker-slug>-history.csv  one per tracker
 * from src/app/resources/catalogue/catalogue.json. Run it after build-catalogue.mjs.
 *
 * Example datasets (example: true) are grown from their eight sample rows with seeded variation
 * up to the catalogue's row count: numbers, percents and euros jitter within the sample's own
 * range, dates walk back from the sample's, categories and text are drawn from the sample's own
 * values. So nothing new is invented, only more of what the sample already shows.
 * ⛔ Real datasets (example: false) are written as their sample rows ONLY. Growing a real file
 * would be inventing real data; the page says how many rows the real file holds.
 * No file may pass 2 MB; a dataset that would is capped and named in the output.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const cat = JSON.parse(readFileSync(join(root, "src/app/resources/catalogue/catalogue.json"), "utf8"));
const out = join(root, "public/resources/data");
mkdirSync(out, { recursive: true });
const CAP = 2 * 1024 * 1024;

/** mulberry32, seeded from the catalogue seed and the slug so a re-run writes the same file. */
function rng(seedText) {
  let a = cat.seed >>> 0;
  for (const ch of seedText) a = (Math.imul(a ^ ch.charCodeAt(0), 2654435761) + 0x9e3779b9) >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const q = (v) => {
  const s = v === null || v === undefined ? "" : typeof v === "boolean" ? (v ? "yes" : "no") : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const dec = (v) => (String(v).split(".")[1] || "").length;
const isoDay = (t) => new Date(t).toISOString().slice(0, 10);

function grow(ds, target, r) {
  const cols = ds.columns;
  const rows = ds.sample.map((s) => ({ ...s }));
  const pool = Object.fromEntries(cols.map((c) => [c.name, ds.sample.map((s) => s[c.name])]));
  const stats = {};
  for (const c of cols) {
    const vs = pool[c.name];
    if (["number", "percent", "euro"].includes(c.type)) {
      const nums = vs.filter((v) => typeof v === "number");
      const lo = Math.min(...nums), hi = Math.max(...nums);
      stats[c.name] = { lo, hi, span: Math.max(hi - lo, Math.abs(hi) * 0.1, 1), d: Math.max(...nums.map(dec)) };
    }
    if (c.type === "date") {
      const ts = vs.filter((v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v))).map((v) => Date.parse(v));
      stats[c.name] = { lo: Math.min(...ts), hi: Math.max(...ts) };
    }
  }
  let i = 0;
  while (rows.length < target) {
    const base = ds.sample[i % ds.sample.length];
    const row = {};
    for (const c of cols) {
      const v = base[c.name];
      const st = stats[c.name];
      if (["number", "percent", "euro"].includes(c.type) && typeof v === "number") {
        let nv = v + (r() - 0.5) * st.span * 0.6;
        if (c.type === "percent") nv = Math.min(100, Math.max(0, nv));
        if (c.type === "euro" || st.d === 0) nv = Math.round(nv / (st.d === 0 && Math.abs(v) >= 1000 ? 100 : 1)) * (st.d === 0 && Math.abs(v) >= 1000 ? 100 : 1);
        row[c.name] = Number(nv.toFixed(st.d));
      } else if (c.type === "date" && st) {
        const back = Math.floor(r() * 120) * 86400000;
        row[c.name] = isoDay(st.hi - back);
      } else if (c.type === "boolean") {
        row[c.name] = r() < 0.5;
      } else {
        row[c.name] = pool[c.name][Math.floor(r() * pool[c.name].length)];
      }
    }
    rows.push(row);
    i++;
  }
  return rows;
}

const csvText = (header, rows) => [header.map(q).join(","), ...rows.map((rw) => rw.map(q).join(","))].join("\n") + "\n";
/* Sizes go into a manifest the pages import, because reading them off disk at request time made
   Vercel bundle the whole public folder (films included, 480MB) into the page and refuse the build,
   26 Sep 2026. */
const sizes = {};
function write(name, header, rows) {
  const text = csvText(header, rows);
  writeFileSync(join(out, name), text);
  sizes[name] = Buffer.byteLength(text);
  return sizes[name];
}

const capped = [];
let total = 0, count = 0;

for (const ds of cat.datasets) {
  const header = ds.columns.map((c) => c.name);
  let rows;
  if (!ds.example) {
    rows = ds.sample;
  } else {
    // size one row first, then grow to the target or to the cap, whichever is smaller
    const one = Buffer.byteLength(csvText([], ds.sample.map((rw) => header.map((h) => rw[h])))) / ds.sample.length;
    const fit = Math.floor((CAP - 512) / Math.max(one, 8));
    const target = Math.min(ds.rows, fit);
    if (target < ds.rows) capped.push(`${ds.slug}: ${ds.rows.toLocaleString("en-IE")} rows would pass 2 MB, wrote ${target.toLocaleString("en-IE")}`);
    rows = grow(ds, target, rng(ds.slug));
  }
  const bytes = write(`${ds.slug}.csv`, header, rows.map((rw) => header.map((h) => rw[h])));
  total += bytes; count++;
  console.log(`${ds.slug}.csv  ${rows.length.toLocaleString("en-IE")} rows  ${(bytes / 1024).toFixed(0)} KB${ds.example ? "" : "  (real: sample rows only)"}`);
}
for (const t of cat.trackers) {
  const rows = t.history.map((v, i) => [t.historyLabels[i], v]);
  const bytes = write(`${t.slug}-history.csv`, ["read", t.readingLabel.replace(/,/g, " ")], rows);
  total += bytes; count++;
}
writeFileSync(join(process.cwd(), "src/app/resources/catalogue/file-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`\n${count} files, ${(total / 1024).toFixed(0)} KB in ${out}`);
if (capped.length) console.log("capped:\n  " + capped.join("\n  "));
const biggest = Math.max(...cat.datasets.map((d) => { try { return statSync(join(out, `${d.slug}.csv`)).size; } catch { return 0; } }));
if (biggest > CAP) { console.error("a file passed 2 MB"); process.exit(1); }
