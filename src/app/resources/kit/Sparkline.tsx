import k from "./kit.module.css";

/** A tracker's history, oldest first. The last point is marked; one point draws as a dot. */
export default function Sparkline({ values, width = 120, height = 32, color = "#3A7CA5", label }: { values: number[]; width?: number; height?: number; color?: string; label?: string }) {
  const pad = 3;
  const lo = Math.min(...values), hi = Math.max(...values);
  const span = hi - lo || 1;
  const x = (i: number) => (values.length < 2 ? width / 2 : pad + (i * (width - pad * 2)) / (values.length - 1));
  const y = (v: number) => (hi === lo ? height / 2 : pad + (height - pad * 2) * (1 - (v - lo) / span));
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const last = values.length - 1;
  return (
    <svg className={k.spark} width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label ?? `Trend, ${values.length} readings`}>
      {values.length > 1 ? <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /> : null}
      <circle cx={x(last)} cy={y(values[last])} r="2.6" fill={color} />
    </svg>
  );
}
