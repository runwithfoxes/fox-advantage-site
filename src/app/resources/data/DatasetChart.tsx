import fs from "node:fs";
import path from "node:path";
import type { Dataset } from "../catalogue/types";
import { Chart } from "../kit";

/**
 * ONE CHART FROM THE WHOLE FILE, free, on every dataset page (Paul, 27 Sep 2026: "generous
 * always"; the rule in DOCTRINE.md: "a dataset shows its rows AND a chart drawn from the whole
 * file. Give something first"). The eight sample rows are a taste; this is the file itself,
 * summarised, so a reader has already been given something before the CSV is the ask.
 *
 * Server side: reads public/resources/data/<slug>.csv at build time. The shape is picked from the
 * column types in the catalogue, in this order:
 *   1. a date column and a money/number/percent column  -> the average of that column by month
 *   2. a category column and a money/number/percent column -> the average by category, top ten
 *   3. a category column                                  -> how many rows in each, top ten
 * Nothing is invented: every bar is arithmetic on the rows in the file.
 */
const NUMERIC = new Set(["number", "euro", "percent"]);

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else q = false;
      } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(2, 4)}`;

export type DatasetFigure = { title: string; caption: string; data: { kind: "bars"; unit: "%" | "count" | "€"; rows: { label: string; value: number; highlight?: boolean }[] } };

export function datasetFigure(x: Dataset): DatasetFigure | null {
  if (!x.csv) return null;
  const file = path.join(process.cwd(), "public", x.csv);
  if (!fs.existsSync(file)) return null;
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (rows.length < 3) return null;
  const head = rows[0];
  const body = rows.slice(1);
  const col = (name: string) => head.indexOf(name);
  const date = x.columns.find((c) => c.type === "date");
  const num = x.columns.find((c) => NUMERIC.has(c.type));
  const cat = x.columns.find((c) => c.type === "category");
  const unit = num?.type === "euro" ? "€" : num?.type === "percent" ? "%" : "count";
  const n = body.length.toLocaleString("en-IE");

  if (date && num && col(date.name) >= 0 && col(num.name) >= 0) {
    const di = col(date.name), ni = col(num.name);
    const acc = new Map<string, { s: number; k: number }>();
    for (const r of body) {
      const ym = (r[di] ?? "").slice(0, 7);
      const v = Number(r[ni]);
      if (!/^\d{4}-\d{2}$/.test(ym) || !Number.isFinite(v)) continue;
      const a = acc.get(ym) ?? { s: 0, k: 0 };
      a.s += v; a.k += 1; acc.set(ym, a);
    }
    const keys = [...acc.keys()].sort().slice(-12);
    if (keys.length >= 2) {
      const out: { label: string; value: number; highlight?: boolean }[] = keys.map((k) => ({ label: monthLabel(k), value: Math.round((acc.get(k)!.s / acc.get(k)!.k) * 100) / 100 }));
      out[out.length - 1].highlight = true;
      return { title: `Average ${num.name.replace(/_/g, " ")} by month, across every row`, caption: `${n} rows in the file, the last ${keys.length} months shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit, rows: out } };
    }
  }
  if (cat && num && col(cat.name) >= 0 && col(num.name) >= 0) {
    const ci = col(cat.name), ni = col(num.name);
    const acc = new Map<string, { s: number; k: number }>();
    for (const r of body) {
      const v = Number(r[ni]);
      const c = r[ci];
      if (!c || !Number.isFinite(v)) continue;
      const a = acc.get(c) ?? { s: 0, k: 0 };
      a.s += v; a.k += 1; acc.set(c, a);
    }
    const out: { label: string; value: number; highlight?: boolean }[] = [...acc.entries()].map(([label, a]) => ({ label, value: Math.round((a.s / a.k) * 100) / 100 })).sort((a, b) => b.value - a.value).slice(0, 10);
    if (out.length >= 2) {
      out[0].highlight = true;
      return { title: `Average ${num.name.replace(/_/g, " ")} by ${cat.name.replace(/_/g, " ")}`, caption: `${n} rows in the file, ${out.length < 10 ? "every group" : "the ten highest"} shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit, rows: out } };
    }
  }
  if (cat && col(cat.name) >= 0) {
    const ci = col(cat.name);
    const acc = new Map<string, number>();
    for (const r of body) if (r[ci]) acc.set(r[ci], (acc.get(r[ci]) ?? 0) + 1);
    const out: { label: string; value: number; highlight?: boolean }[] = [...acc.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 10);
    if (out.length >= 2) {
      out[0].highlight = true;
      return { title: `Rows by ${cat.name.replace(/_/g, " ")}`, caption: `${n} rows in the file, ${out.length < 10 ? "every group" : "the ten largest groups"} shown. Drawn from the whole file, not the sample.`, data: { kind: "bars", unit: "count", rows: out } };
    }
  }
  return null;
}

export default function DatasetChart({ x }: { x: Dataset }) {
  const fig = datasetFigure(x);
  if (!fig) return null;
  return (
    <figure className="mod-win" style={{ margin: 0 }}>
      <div className="mod-winbar">
        <span className="mod-lights"><i /><i /><i /></span>
        <span className="mod-wintitle">{x.slug} · the whole file</span>
      </div>
      <div style={{ padding: "16px 20px 14px", background: "#fff" }}>
        <p style={{ fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15.5, margin: "0 0 12px", color: "#1D1B1B" }}>{fig.title}</p>
        <Chart data={fig.data} />
        <figcaption style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#8A8A85", marginTop: 12, lineHeight: 1.5 }}>{fig.caption}</figcaption>
      </div>
    </figure>
  );
}
