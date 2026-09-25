"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import N from "./numbers.json";
import r from "./report.module.css";

/**
 * The AI Ask's figures. Every number comes from numbers.json (Sam, paul-hub 18a6b347e), never
 * typed. Drawn in the site's blues, in module windows, and each one does one thing when you
 * touch it: a hover that gives the count, a toggle, a pick. Nothing moves until it is on screen.
 */
const SKY = "#3A7CA5";
const DEEP = "#1A3A4E";
const MID = "#6CAAC8";
const PALE = "#A9CBE4";
const GREY = "#CFCFC9";
const MUTED = "#8A8A85";

const PERIODS = ["2025-Q4", "2026-Q1", "2026-Q2", "2026-Q3"] as const;
const LAB = N.labels as Record<string, string>;
const SHORT: Record<string, string> = { "2025-Q4": "Oct to Dec 25", "2026-Q1": "Jan to Mar 26", "2026-Q2": "Apr 26", "2026-Q3": "24 Sep 26" };

type Kind = "tools" | "sell" | "lead" | "search" | "build";
const KIND: Record<Kind, { label: string; c: string }> = {
  tools: { label: "Use AI tools", c: SKY },
  sell: { label: "Sell an AI product", c: DEEP },
  lead: { label: "Lead or buy AI", c: MID },
  search: { label: "AI search visibility", c: PALE },
  build: { label: "Build AI tools, agents", c: MUTED },
};
const KIND_ORDER: Kind[] = ["tools", "sell", "lead", "search", "build"];

/** Starts drawing when the figure comes on screen, once. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setSeen(true);
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

export function FigWin({ id, n, title, cap, children, tools }: { id: string; n: string; title: string; cap: string; children: ReactNode; tools?: ReactNode }) {
  return (
    <figure className={`mod-win ${r.fig}`} id={id}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">figure_{n.replace(".", "_")}</span>
        {tools ? <span className={r.figTools}>{tools}</span> : null}
      </div>
      <div className={r.figBody}>
        <figcaption className={r.figTitle}>
          <span className={r.figN}>Figure {n}</span>
          {title}
        </figcaption>
        {children}
        <p className={r.figCap}>{cap} Source: The AI Ask, Run with Foxes.</p>
      </div>
    </figure>
  );
}

function Toggle<T extends string>({ opts, on, set }: { opts: { k: T; t: string }[]; on: T; set: (k: T) => void }) {
  return (
    <span className={r.toggle} role="group">
      {opts.map((o) => (
        <button key={o.k} type="button" aria-pressed={on === o.k} className={on === o.k ? r.tOn : ""} onClick={() => set(o.k)}>
          {o.t}
        </button>
      ))}
    </span>
  );
}

/* ── 1.1 Marketing against sales, jobs.ie, four periods ───────────────────────────── */
export function F11() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [show, setShow] = useState<"both" | "marketing" | "sales">("both");
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 260, L = 44, R = 86, T = 18, B = 34, max = 20;
  const x = (i: number) => L + (i * (W - L - R)) / 3;
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const series = (["marketing", "sales"] as const).map((k) => ({ k, c: k === "marketing" ? SKY : MUTED, pts: PERIODS.map((p) => N.jobsie[p][k]) }));
  return (
    <div ref={ref} className={r.chartWrap}>
      <div className={r.chartHead}>
        <Toggle opts={[{ k: "both", t: "Both" }, { k: "marketing", t: "Marketing" }, { k: "sales", t: "Sales" }]} on={show} set={setShow} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={r.svg} onMouseLeave={() => setHover(null)}>
        {/* the middle of the line, held loosely (Sam, 1.2) */}
        <rect x={x(1) - 18} y={T} width={x(2) - x(1) + 36} height={H - T - B} fill="rgba(58,124,165,.06)" />
        <text x={(x(1) + x(2)) / 2} y={T + 12} textAnchor="middle" className={r.svgNote}>small samples, hold loosely</text>
        {[0, 5, 10, 15, 20].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#E0E0DC" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" className={r.svgAx}>{v}%</text>
          </g>
        ))}
        {PERIODS.map((p, i) => (
          <text key={p} x={x(i)} y={H - 10} textAnchor="middle" className={r.svgAx}>{SHORT[p]}</text>
        ))}
        {series.map((s) => {
          const vis = show === "both" || show === s.k;
          const d = s.pts.map((pt, i) => `${i ? "L" : "M"}${x(i)},${y(seen ? pt.pct : 0)}`).join(" ");
          return (
            <g key={s.k} style={{ opacity: vis ? 1 : 0.08, transition: "opacity .3s" }}>
              <path d={d} fill="none" stroke={s.c} strokeWidth={s.k === "marketing" ? 3 : 2} strokeDasharray={s.k === "sales" ? "5 5" : undefined} style={{ transition: "d .9s cubic-bezier(.22,1,.36,1)" }} />
              {s.pts.map((pt, i) => (
                <circle key={i} cx={x(i)} cy={y(seen ? pt.pct : 0)} r={hover === i ? 7 : 5} fill={s.c} stroke="#fff" strokeWidth={2} style={{ transition: "cy .9s cubic-bezier(.22,1,.36,1), r .15s" }} />
              ))}
              <text x={x(3) + 10} y={y(seen ? s.pts[3].pct : 0) + 4} className={r.svgEnd} fill={s.c} style={{ transition: "y .9s" }}>
                {s.k === "marketing" ? "Marketing" : "Sales"}
              </text>
            </g>
          );
        })}
        {PERIODS.map((_, i) => (
          <rect key={i} x={x(i) - 40} y={T} width={80} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      <div className={r.readout} aria-live="polite">
        {hover === null ? (
          <span>Hover a period for the counts.</span>
        ) : (
          <>
            <b>{LAB[PERIODS[hover]]}</b>
            <span><i style={{ background: SKY }} /> Marketing {N.jobsie[PERIODS[hover]].marketing.k} of {N.jobsie[PERIODS[hover]].marketing.n} ({N.jobsie[PERIODS[hover]].marketing.pct}%)</span>
            <span><i style={{ background: MUTED }} /> Sales {N.jobsie[PERIODS[hover]].sales.k} of {N.jobsie[PERIODS[hover]].sales.n} ({N.jobsie[PERIODS[hover]].sales.pct}%)</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ── 2.1 Mentions against asks, by channel (Sam's post-Cato figure: paired bars) ───── */
export function F21() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const t = N.talk_vs_ask;
  const c = N.talk_vs_ask_by_channel;
  const groups = [
    { k: "All ads", m: t.mention_ai, a: t.real_ask },
    { k: "Tech firms' careers pages", m: c.careers_pages.mention_ai, a: c.careers_pages.real_ask },
    { k: "Job boards", m: c.job_boards.mention_ai, a: c.job_boards.real_ask },
  ];
  return (
    <div ref={ref} className={r.funnel}>
      <div className={r.pairKey}>
        <span><i style={{ background: GREY }} /> Mention AI</span>
        <span><i style={{ background: SKY }} /> Ask the person to do something with AI</span>
      </div>
      {groups.map((g, i) => (
        <div key={g.k} className={r.pairGroup}>
          <span className={r.fLab}>{g.k}</span>
          <div className={r.pairBars}>
            {[{ v: g.m, c: GREY }, { v: g.a, c: SKY }].map((b, j) => (
              <div key={j} className={r.pairLine}>
                <span className={r.fTrack}>
                  <i style={{ width: seen ? `${b.v.pct}%` : 0, background: b.c, transitionDelay: `${i * 140 + j * 70}ms` }} />
                </span>
                <span className={r.fVal}>
                  <b>{b.v.pct}%</b> <em>{b.v.k} of {b.v.n}</em>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 3.1 The AI Ask Index by role ─────────────────────────────────────────────────── */
export function F31() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [sort, setSort] = useState<"index" | "n">("index");
  const [hover, setHover] = useState<string | null>(null);
  const groups = (["marketing", "sales"] as const).map((g) => ({
    g,
    rows: N.roles.filter((x) => x.group === g).sort((a, b) => (sort === "index" ? b.index - a.index : b.n - a.n)),
  }));
  const max = 8;
  return (
    <div ref={ref}>
      <div className={r.chartHead}>
        <Toggle opts={[{ k: "index", t: "By index" }, { k: "n", t: "By number of ads" }]} on={sort} set={setSort} />
      </div>
      <div className={r.idx}>
        <div className={r.idxAvg} style={{ left: `calc(210px + (100% - 290px) * ${1 / max})` }}>
          <span>average job = 1</span>
        </div>
        {groups.map(({ g, rows }) => [
          <span key={g} className={r.idxGroup}>{g === "marketing" ? "Marketing" : "Sales"}</span>,
          ...rows.map((row) => (
          <div key={row.role} className={`${r.idxRow} ${hover === row.role ? r.idxHot : ""}`} onMouseEnter={() => setHover(row.role)} onMouseLeave={() => setHover(null)}>
            <span className={r.idxLab}>{row.role}</span>
            <span className={r.idxTrack}>
              <i style={{ width: seen ? `${(row.index / max) * 100}%` : 0, background: row.index >= 1 ? SKY : GREY }} />
            </span>
            <span className={r.idxVal}>
              <b>{row.index.toFixed(1)}</b>
              <em>{hover === row.role ? `${row.k} of ${row.n} ads, ${row.pct}%` : `${row.n} ads`}</em>
            </span>
          </div>
          )),
        ])}
      </div>
    </div>
  );
}

/* ── 3.2 By level, four levels, all ads or job boards only ────────────────────────── */
type Lv = "entry" | "executive" | "manager" | "head";
export function F32() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [on, setOn] = useState<Lv>("head");
  const [src, setSrc] = useState<"all" | "boards">("all");
  const lv = (src === "all" ? N.levels : N.levels_boards) as Record<Lv, { k: number; n: number; pct: number }>;
  const kbl = N.kinds_by_level as Record<string, Partial<Record<Kind, number>>>;
  const cols: { k: Lv; t: string }[] = [
    { k: "entry", t: "Entry level" },
    { k: "executive", t: "Executive" },
    { k: "manager", t: "Manager, senior" },
    { k: "head", t: "Head, director" },
  ];
  const mix = kbl[on] ?? {};
  const tot = Object.values(mix).reduce((a, b) => a + (b ?? 0), 0);
  return (
    <div ref={ref}>
      <div className={r.chartHead}>
        <Toggle opts={[{ k: "all", t: "All ads" }, { k: "boards", t: "Job boards only" }]} on={src} set={setSrc} />
      </div>
      <div className={r.levels}>
        <div className={r.lvCols} style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {cols.map((c) => (
            <button key={c.k} type="button" className={`${r.lvCol} ${on === c.k ? r.lvOn : ""}`} onMouseEnter={() => setOn(c.k)} onFocus={() => setOn(c.k)} onClick={() => setOn(c.k)}>
              <span className={r.lvBarWrap}>
                <i style={{ height: seen ? `${(lv[c.k].pct / 30) * 100}%` : 0 }} />
              </span>
              <b>{lv[c.k].pct}%</b>
              <span className={r.lvT}>{c.t}</span>
              <em>{lv[c.k].k} of {lv[c.k].n}</em>
            </button>
          ))}
        </div>
        <div className={r.lvMix}>
          <span className={r.kick}>What {cols.find((c) => c.k === on)!.t.toLowerCase()} ads asked for, all ads</span>
          <div className={r.mixBar}>
            {KIND_ORDER.filter((k) => mix[k]).map((k) => (
              <i key={k} style={{ flex: mix[k], background: KIND[k].c }} title={`${KIND[k].label}: ${mix[k]}`} />
            ))}
          </div>
          <ul className={r.mixKey}>
            {KIND_ORDER.filter((k) => mix[k]).map((k) => (
              <li key={k}>
                <i style={{ background: KIND[k].c }} /> {KIND[k].label} <b>{mix[k]}</b>
              </li>
            ))}
          </ul>
          <span className={r.mixTot}>{tot} asks</span>
        </div>
      </div>
    </div>
  );
}

/* ── 3.3 Pairs: who asks more, no multiples printed (Sam: "several times", small numbers) ── */
export function F33() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const c = N.talk_vs_ask_by_channel;
  const pairs = [
    { t: "Where the ad was posted, all ads", a: { k: "Tech firms' careers pages", v: c.careers_pages.real_ask }, b: { k: "Job boards", v: c.job_boards.real_ask } },
    { t: "Who posted it, job boards only", a: { k: "Recruiters", v: N.recruiters_boards_only.recruiter }, b: { k: "Direct employers", v: N.recruiters_boards_only.direct } },
    { t: "Where the job is, job boards only", a: { k: "Dublin", v: N.place_boards.dublin }, b: { k: "Outside Dublin", v: N.place_boards.outside } },
  ];
  const max = Math.max(...pairs.flatMap((p) => [p.a.v.pct, p.b.v.pct]));
  return (
    <div ref={ref} className={r.pairs3}>
      {pairs.map((p) => (
        <div key={p.t} className={r.pair}>
          <span className={r.kick}>{p.t}</span>
          {[p.a, p.b].map((s, i) => (
            <div key={s.k} className={r.pRow}>
              <span className={r.pLab}>{s.k}</span>
              <span className={r.fTrack}>
                <i style={{ width: seen ? `${(s.v.pct / max) * 100}%` : 0, background: i ? GREY : SKY }} />
              </span>
              <span className={r.fVal}>
                <b>{s.v.pct}%</b> <em>{s.v.k} of {s.v.n}</em>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── 4.1 Waffle: the 47 asks, one square each ─────────────────────────────────────── */
export function F41() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [pick, setPick] = useState<Kind | null>(null);
  const kinds = N.sep_kinds as Record<Kind, number>;
  const ex = N.examples as Partial<Record<Kind, [string, string][]>>;
  const squares = KIND_ORDER.flatMap((k) => Array.from({ length: kinds[k] }, () => k));
  const nice = (co: string) => co.replace(/\b(Limited|t\/a.*)$/i, "").replace(/^\w/, (c) => c.toUpperCase()).trim();
  return (
    <div ref={ref} className={r.waffleWrap}>
      <div className={r.waffle}>
        {squares.map((k, i) => (
          <i
            key={i}
            style={{
              background: KIND[k].c,
              opacity: pick && pick !== k ? 0.15 : 1,
              transform: seen ? "scale(1)" : "scale(0)",
              transitionDelay: seen ? `${i * 18}ms` : "0ms",
            }}
            onMouseEnter={() => setPick(k)}
          />
        ))}
      </div>
      <div className={r.wKey}>
        {KIND_ORDER.map((k) => (
          <button key={k} type="button" className={pick === k ? r.wOn : ""} onMouseEnter={() => setPick(k)} onFocus={() => setPick(k)} onClick={() => setPick(pick === k ? null : k)}>
            <i style={{ background: KIND[k].c }} />
            <span>{KIND[k].label}</span>
            <b>{kinds[k]}</b>
          </button>
        ))}
        <div className={r.wEx}>
          {pick && ex[pick] ? (
            <>
              <span className={r.kick}>Who asked</span>
              <ul>
                {ex[pick]!.slice(0, 5).map(([co, role], i) => (
                  <li key={i}>
                    <b>{nice(co)}</b> {role}
                  </li>
                ))}
              </ul>
            </>
          ) : pick === "tools" ? (
            <p>Use AI tools is the everyday ask, spread across every level and every kind of employer.</p>
          ) : (
            <p>Pick a kind to see who asked.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 4.2 What the tools asks say AI is for ────────────────────────────────────────── */
export function F42() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const rr = N.tools_asks_reasons as Record<string, number | string>;
  const rows = Object.entries(rr).filter(([k, v]) => typeof v === "number" && !["asks", "sentences"].includes(k)) as [string, number][];
  const max = Math.max(...rows.map(([, v]) => v));
  return (
    <div ref={ref} className={r.hbars}>
      {rows.map(([k, v], i) => (
        <div key={k} className={r.hRow}>
          <span className={r.hLab}>{k.replace(/^\w/, (c) => c.toUpperCase())}</span>
          <span className={r.fTrack}>
            <i style={{ width: seen ? `${(v / max) * 100}%` : 0, background: i < 2 ? SKY : k.startsWith("writing") ? DEEP : PALE, transitionDelay: `${i * 60}ms` }} />
          </span>
          <span className={r.fVal}><b>{v}</b></span>
        </div>
      ))}
    </div>
  );
}

/* ── 5.1 Tool types, pick one to open it ──────────────────────────────────────────── */
export function F51() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const ts = N.tools_sep as Record<string, Record<string, number>>;
  const types = Object.entries(ts).sort((a, b) => b[1].any - a[1].any);
  const [open, setOpen] = useState<string>("AI");
  const max = types[0][1].any;
  return (
    <div ref={ref} className={r.tools}>
      <div className={r.hbars}>
        {types.map(([t, v]) => (
          <button key={t} type="button" className={`${r.hRow} ${r.hBtn} ${open === t ? r.hOn : ""}`} onClick={() => setOpen(t)} onMouseEnter={() => setOpen(t)}>
            <span className={r.hLab}>{t}</span>
            <span className={r.fTrack}>
              <i style={{ width: seen ? `${(v.any / max) * 100}%` : 0, background: t === "AI" ? SKY : DEEP }} />
            </span>
            <span className={r.fVal}><b>{v.any}</b></span>
          </button>
        ))}
      </div>
      <div className={r.toolOpen}>
        <span className={r.kick}>{open}: the tools named</span>
        {Object.entries(ts[open])
          .filter(([k]) => k !== "any")
          .map(([k, v]) => (
            <div key={k} className={r.tRow}>
              <span className={k.includes("no name") ? r.tNoName : ""}>{k}</span>
              <b>{v}</b>
            </div>
          ))}
        {open === "AI" ? <p className={r.tNote}>24 of the 27 ads that mention AI tools don&rsquo;t name one.</p> : null}
      </div>
    </div>
  );
}

/* ── 5.2 Tool share over the year, pick tools to compare ──────────────────────────── */
export function F52() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const share = N.tools_jobsie_share as Record<string, Record<string, { pct: number; k: number; n: number }>>;
  const names = Object.keys(share);
  const COLORS: Record<string, string> = { Canva: SKY, Adobe: DEEP, Excel: MID, "Google Ads": PALE, Salesforce: "#9FB7C6", "Meta Ads Manager": "#7B97A8", HubSpot: "#B8C4CC", "Any AI tool": "#F47521" };
  const [on, setOn] = useState<string[]>(["Canva", "Adobe"]);
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 240, L = 40, R = 110, T = 12, B = 30, max = 15;
  const x = (i: number) => L + (i * (W - L - R)) / 3;
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const toggle = (t: string) => setOn((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div ref={ref}>
      <div className={r.chips}>
        {names.map((t) => (
          <button key={t} type="button" aria-pressed={on.includes(t)} className={on.includes(t) ? r.chipOn : ""} onClick={() => toggle(t)} style={on.includes(t) ? { borderColor: COLORS[t], color: COLORS[t] } : undefined}>
            <i style={{ background: COLORS[t] }} /> {t}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={r.svg} onMouseLeave={() => setHover(null)}>
        {[0, 5, 10, 15].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#E0E0DC" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" className={r.svgAx}>{v}%</text>
          </g>
        ))}
        {PERIODS.map((p, i) => (
          <text key={p} x={x(i)} y={H - 8} textAnchor="middle" className={r.svgAx}>{SHORT[p]}</text>
        ))}
        {on.map((t) => {
          const pts = PERIODS.map((p) => share[t][p].pct);
          return (
            <g key={t}>
              <path d={pts.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(seen ? v : 0)}`).join(" ")} fill="none" stroke={COLORS[t]} strokeWidth={t === "Canva" ? 3 : 2} style={{ transition: "d .8s cubic-bezier(.22,1,.36,1)" }} />
              {pts.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(seen ? v : 0)} r={hover === i ? 6 : 4} fill={COLORS[t]} stroke="#fff" strokeWidth={1.5} style={{ transition: "cy .8s cubic-bezier(.22,1,.36,1)" }} />
              ))}
              <text x={x(3) + 10} y={y(seen ? pts[3] : 0) + 4} className={r.svgEnd} fill={COLORS[t]}>{t} {pts[3]}%</text>
            </g>
          );
        })}
        {PERIODS.map((_, i) => (
          <rect key={i} x={x(i) - 40} y={T} width={80} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      <div className={r.readout}>
        {hover === null ? (
          <span>Hover a period for the counts.</span>
        ) : (
          <>
            <b>{LAB[PERIODS[hover]]}</b>
            {on.map((t) => (
              <span key={t}><i style={{ background: COLORS[t] }} /> {t} {share[t][PERIODS[hover]].k} of {share[t][PERIODS[hover]].n}</span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ── 7.1 Salary shown, by period ──────────────────────────────────────────────────── */
export function F71() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const pay = N.pay_shown_jobsie as Record<string, { pct: number; k: number; n: number }>;
  return (
    <div ref={ref} className={r.payRow}>
      {PERIODS.map((p) => (
        <div key={p} className={r.payCol}>
          <span className={r.payTrack}>
            <i style={{ height: seen ? `${pay[p].pct}%` : 0 }} />
          </span>
          <b>{pay[p].pct}%</b>
          <span>{SHORT[p]}</span>
          <em>{pay[p].k} of {pay[p].n}</em>
        </div>
      ))}
    </div>
  );
}

