import type { Dataset } from "../catalogue/types";
import { Chart } from "../kit";
import FIGURES from "./figures.generated.json";

/**
 * ONE CHART FROM THE WHOLE FILE, free, on every dataset page (Paul, 27 Sep 2026: "generous
 * always"; DOCTRINE.md: "a dataset shows its rows AND a chart drawn from the whole file. Give
 * something first"). The eight sample rows are a taste; this is the file itself, summarised.
 *
 * The numbers come from figures.generated.json, written by scripts/resources/build-dataset-figures.mjs
 * from the CSVs in public/resources/data. Not read at request time on purpose: an fs read of public/
 * inside this page made Next trace the whole folder (509MB) into the function and Vercel refused
 * the build (27 Sep). Re-run the script when a CSV changes.
 */
type Fig = { title: string; caption: string; data: { kind: "bars"; unit: "%" | "count" | "€"; rows: { label: string; value: number; highlight?: boolean }[] } };
const FIGS = FIGURES as Record<string, Fig>;

export default function DatasetChart({ x }: { x: Dataset }) {
  const fig = FIGS[x.slug];
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
