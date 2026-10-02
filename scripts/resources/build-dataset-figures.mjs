// One chart per dataset, computed from the WHOLE CSV at build time and written to
// src/app/resources/data/figures.generated.json, so the dataset page imports numbers and never
// touches the filesystem at request time. (27 Sep 2026: reading public/ with fs inside the page
// made Next trace the whole public folder, 509MB, into the function, and Vercel refused it.)
// Run after the CSVs change:  node scripts/resources/build-dataset-figures.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cat = JSON.parse(fs.readFileSync(path.join(root, "src/app/resources/catalogue/catalogue.json"), "utf8"));
const NUMERIC = new Set(["number", "euro", "percent"]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (ym) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(2, 4)}`;

function parseCsv(text) {
  const rows = []; let row = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function figure(x) {
  if (!x.csv) return null;
  const file = path.join(root, "public", x.csv);
  if (!fs.existsSync(file)) return null;
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (rows.length < 3) return null;
  const head = rows[0], body = rows.slice(1);
  const col = (n) => head.indexOf(n);
  const date = x.columns.find((c) => c.type === "date");
  const num = x.columns.find((c) => NUMERIC.has(c.type));
  const cat = x.columns.find((c) => c.type === "category");
  const unit = num?.type === "euro" ? "€" : num?.type === "percent" ? "%" : "count";
  const n = body.length.toLocaleString("en-IE");
  const nice = (s) => s.replace(/_/g, " ");
  if (date && num && col(date.name) >= 0 && col(num.name) >= 0) {
    const di = col(date.name), ni = col(num.name); const acc = new Map();
    for (const r of body) { const ym = (r[di] ?? "").slice(0, 7); const v = Number(r[ni]); if (!/^\d{4}-\d{2}$/.test(ym) || !Number.isFinite(v)) continue; const a = acc.get(ym) ?? { s: 0, k: 0 }; a.s += v; a.k += 1; acc.set(ym, a); }
    const keys = [...acc.keys()].sort().slice(-12);
    if (keys.length >= 2) { const out = keys.map((k) => ({ label: monthLabel(k), value: Math.round((acc.get(k).s / acc.get(k).k) * 100) / 100 })); out[out.length - 1].highlight = true;
      return { title: `Average ${nice(num.name)} by month, across every row`, caption: `${n} rows in the file, the last ${keys.length} months shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit, rows: out } }; }
  }
  if (cat && num && col(cat.name) >= 0 && col(num.name) >= 0) {
    const ci = col(cat.name), ni = col(num.name); const acc = new Map();
    for (const r of body) { const v = Number(r[ni]); const c = r[ci]; if (!c || !Number.isFinite(v)) continue; const a = acc.get(c) ?? { s: 0, k: 0 }; a.s += v; a.k += 1; acc.set(c, a); }
    const out = [...acc.entries()].map(([label, a]) => ({ label, value: Math.round((a.s / a.k) * 100) / 100 })).sort((a, b) => b.value - a.value).slice(0, 10);
    if (out.length >= 2) { out[0].highlight = true; return { title: `Average ${nice(num.name)} by ${nice(cat.name)}`, caption: `${n} rows in the file, ${out.length < 10 ? "every group" : "the ten highest"} shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit, rows: out } }; }
  }
  if (cat && col(cat.name) >= 0) {
    const ci = col(cat.name); const acc = new Map();
    for (const r of body) if (r[ci]) acc.set(r[ci], (acc.get(r[ci]) ?? 0) + 1);
    const out = [...acc.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 10);
    if (out.length >= 2) { out[0].highlight = true; return { title: `Rows by ${nice(cat.name)}`, caption: `${n} rows in the file, ${out.length < 10 ? "every group" : "the ten largest groups"} shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit: "count", rows: out } }; }
  }
  return null;
}

const out = {};
for (const x of cat.datasets) { const f = figure(x); if (f) out[x.slug] = f; }
fs.writeFileSync(path.join(root, "src/app/resources/data/figures.generated.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`wrote figures for ${Object.keys(out).length} of ${cat.datasets.length} datasets`);
