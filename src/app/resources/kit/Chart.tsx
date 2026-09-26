import k from "./kit.module.css";
import type { FigureData, FigBars, FigLine, FigStack, FigRange, FigSmall, FigTable, FigWaffle } from "../catalogue/types";

/**
 * Draws any catalogue figure. Static markup and SVG only, no client code, so it renders the same
 * on the page, on a phone, in a PDF and to a crawler. Colours are the page's own tokens (DOCTRINE,
 * 24 Aug: charts wear the page's palette): deep for the one highlighted thing, sky for the rest,
 * sky-light for a second series, muted for context. Never orange.
 * A template that wants motion wraps this; it never replaces it.
 */
export const INK = { deep: "#1A3A4E", sky: "#3A7CA5", light: "#6CAAC8", pale: "#B9D3E2", muted: "#8A8A85", track: "#EDEDE9", border: "#E0E0DC", text: "#1D1B1B" };
const PARTS = [INK.deep, INK.sky, INK.light, INK.pale, "#D8D6CF"];

const num = (v: number, unit: string) =>
  unit === "%" ? `${v}%` : unit === "€" ? (v >= 1000 ? `€${Math.round(v / 1000)}k` : v >= 10 ? `€${Math.round(v)}` : `€${v.toFixed(2)}`) : v.toLocaleString("en-IE");

export default function Chart({ data }: { data: FigureData }) {
  switch (data.kind) {
    case "bars": return <Bars d={data} />;
    case "line": return <Line d={data} />;
    case "stack": return <Stack d={data} />;
    case "range": return <Range d={data} />;
    case "small": return <Small d={data} />;
    case "table": return <Table d={data} />;
    case "waffle": return <Waffle d={data} />;
  }
}

function Bars({ d }: { d: FigBars }) {
  const max = Math.max(...d.rows.map((r) => r.value)) || 1;
  const anyHi = d.rows.some((r) => r.highlight);
  return (
    <div className={k.bars}>
      {d.rows.map((r) => (
        <div key={r.label} className={`${k.bar} ${r.highlight || !anyHi ? k.barHi : ""}`}>
          <span className={k.barLab} title={r.label}>{r.label}</span>
          <span className={k.barTrack}>
            <i style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className={k.barVal}>
            {num(r.value, d.unit)}
            {r.count ? <small>{r.count.k} of {r.count.n}</small> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A round top for an axis: 12.3 -> 15, 47 -> 50, 830 -> 1000. */
function niceTop(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * p).find((t) => t >= v)!;
}

function Line({ d }: { d: FigLine }) {
  const W = 560, H = 200, L = 40, R = 56, T = 10, B = 26;
  const all = d.series.flatMap((s) => s.values);
  const lo = 0, hi = niceTop(Math.max(...all) * 1.08);
  const x = (i: number) => (d.x.length < 2 ? L + (W - L - R) / 2 : L + (i * (W - L - R)) / (d.x.length - 1));
  const y = (v: number) => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
  const ticks = [lo, hi / 2, hi];
  const anyHi = d.series.some((s) => s.highlight);
  const col = (s: FigLine["series"][number], si: number) => (s.highlight || (!anyHi && si === 0) ? INK.deep : si === 1 ? INK.light : INK.pale);
  return (
    <div>
      <svg className={k.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={d.series.map((s) => `${s.name}: ${s.values.join(", ")}`).join("; ")}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={INK.track} />
            <text x={L - 6} y={y(t) + 3} textAnchor="end">{num(t, d.unit)}</text>
          </g>
        ))}
        {d.x.map((l, i) => (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle">{l}</text>
        ))}
        {d.series.map((s, si) => {
          const c = col(s, si);
          const p = s.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
          const last = s.values.length - 1;
          return (
            <g key={s.name}>
              {s.values.length > 1 ? <path d={p} fill="none" stroke={c} strokeWidth={s.highlight ? 2.2 : 1.6} strokeLinejoin="round" /> : null}
              <circle cx={x(last)} cy={y(s.values[last])} r="3" fill={c} />
              <text className={k.lab} x={x(last) + 8} y={y(s.values[last]) + 3.5}>{num(s.values[last], d.unit)}</text>
            </g>
          );
        })}
      </svg>
      <div className={k.key}>
        {d.series.map((s, si) => (
          <span key={s.name}><i style={{ background: col(s, si) }} />{s.name}</span>
        ))}
      </div>
    </div>
  );
}

function Stack({ d }: { d: FigStack }) {
  return (
    <div>
      <div className={k.stack}>
        {d.rows.map((r) => (
          <div key={r.label} className={k.stackRow}>
            <span className={k.barLab}>{r.label}</span>
            <span className={k.stackBar} role="img" aria-label={d.parts.map((p, i) => `${p} ${r.values[i]}%`).join(", ")}>
              {r.values.map((v, i) => (
                <i key={i} style={{ flex: v, background: PARTS[i % PARTS.length] }} title={`${d.parts[i]} ${v}%`} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className={k.key}>
        {d.parts.map((p, i) => (
          <span key={p}><i style={{ background: PARTS[i % PARTS.length] }} />{p}</span>
        ))}
      </div>
    </div>
  );
}

function Range({ d }: { d: FigRange }) {
  const W = 560, rowH = 30, L = 150, R = 50, T = 6;
  const H = T + d.rows.length * rowH + 20;
  const lo = Math.min(...d.rows.map((r) => r.low)), hi = Math.max(...d.rows.map((r) => r.high));
  const x = (v: number) => L + ((v - lo) / (hi - lo || 1)) * (W - L - R);
  return (
    <svg className={k.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={d.rows.map((r) => `${r.label}: ${r.low} to ${r.high}, middle ${r.mid}`).join("; ")}>
      {d.rows.map((r, i) => {
        const cy = T + i * rowH + rowH / 2;
        return (
          <g key={r.label}>
            <text className={k.lab} x={0} y={cy + 3.5}>{r.label}</text>
            <line x1={L} x2={W - R} y1={cy} y2={cy} stroke={INK.track} />
            <line x1={x(r.low)} x2={x(r.high)} y1={cy} y2={cy} stroke={INK.light} strokeWidth="5" strokeLinecap="round" />
            <circle cx={x(r.mid)} cy={cy} r="5" fill={INK.deep} />
            <text x={W - R + 8} y={cy + 3.5}>{num(r.mid, d.unit)}</text>
          </g>
        );
      })}
      <text x={L} y={H - 4}>{num(lo, d.unit)}</text>
      <text x={W - R} y={H - 4} textAnchor="end">{num(hi, d.unit)}</text>
    </svg>
  );
}

function Small({ d }: { d: FigSmall }) {
  const W = 150, H = 64;
  return (
    <div className={k.small}>
      {d.panels.map((p) => {
        const lo = Math.min(...p.values), hi = Math.max(...p.values), span = hi - lo || 1;
        const x = (i: number) => (p.values.length < 2 ? W / 2 : 4 + (i * (W - 8)) / (p.values.length - 1));
        const y = (v: number) => 6 + (H - 24) * (1 - (v - lo) / span);
        const last = p.values.length - 1;
        return (
          <div key={p.label} className={k.smallCell}>
            <div className={k.smallLab}>
              <span>{p.label}</span>
              <b>{p.values[last]}{d.unit === "%" ? "%" : ""}</b>
            </div>
            <svg className={k.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${p.label}: ${p.values.join(", ")}`}>
              {p.values.length > 1 ? <path d={p.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")} fill="none" stroke={INK.sky} strokeWidth="1.6" /> : null}
              <circle cx={x(last)} cy={y(p.values[last])} r="2.8" fill={INK.deep} />
              <text x={0} y={H}>{d.x[0]}</text>
              <text x={W} y={H} textAnchor="end">{d.x[last]}</text>
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function Table({ d }: { d: FigTable }) {
  return (
    <div className={k.tableWrap}>
      <table className={k.table}>
        <thead>
          <tr>{d.columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {d.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "number" ? c.toLocaleString("en-IE") : c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Waffle({ d }: { d: FigWaffle }) {
  const cells: string[] = [];
  d.parts.forEach((p, i) => { for (let j = 0; j < p.n; j++) cells.push(PARTS[i % PARTS.length]); });
  return (
    <div>
      <div className={k.waffle} role="img" aria-label={d.parts.map((p) => `${p.label} ${p.n}`).join(", ")}>
        {cells.map((c, i) => <i key={i} style={{ background: c }} />)}
      </div>
      <div className={k.key}>
        {d.parts.map((p, i) => (
          <span key={p.label}><i style={{ background: PARTS[i % PARTS.length] }} />{p.label} {p.n}</span>
        ))}
      </div>
    </div>
  );
}
