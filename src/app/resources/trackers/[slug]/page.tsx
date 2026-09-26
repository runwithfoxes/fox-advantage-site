import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { statSync } from "node:fs";
import { join } from "node:path";
import { AREA_LABEL, TRACKERS, day, trackerBySlug, trackerHref, type Tracker } from "../../catalogue";
import { Chart, Example, FigureWindow, Gate, DownloadPdf } from "../../kit";
import { Shell, Dot, Dir, inst } from "../../instrument/Shell";
import t from "../trackers.module.css";

export function generateStaticParams() {
  return TRACKERS.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const x = trackerBySlug((await params).slug);
  return { title: x ? `${x.name}, ${x.reading} ${x.readingLabel} | Run with Foxes` : "Tracker", robots: { index: false, follow: false } };
}

const fmt = (v: number, unit: Tracker["unit"]) =>
  unit === "%" ? `${v}%` : unit === "€" ? `€${v % 1 ? v.toFixed(2) : v.toLocaleString("en-IE")}` : v.toLocaleString("en-IE");
const diff = (a: number, b: number, unit: Tracker["unit"]) => {
  const d = Math.round((a - b) * 100) / 100;
  if (d === 0) return "no change";
  const s = d > 0 ? "+" : "";
  return unit === "%" ? `${s}${d} pts` : unit === "€" ? `${s}€${Math.abs(d) < 1 ? d.toFixed(2) : d}` : `${s}${d}`;
};

/** Every x label would overprint on a 26-week run, so print the first, the last and every fifth. */
const thin = (labels: string[]) => labels.map((l, i, a) => (i === 0 || i === a.length - 1 || i % 5 === 0 ? shortLabel(l) : ""));
const shortLabel = (l: string) => (/^\d{4}-\d{2}-\d{2}$/.test(l) ? day(l).replace(/ \d{4}$/, "") : l.replace(/^jobs\.ie, /, ""));

function fileSize(p: string) {
  try {
    const b = statSync(join(process.cwd(), "public", p)).size;
    return b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;
  } catch {
    return undefined;
  }
}

/**
 * ONE TRACKER. The page belongs to one measure. The reading is drawn at 72px, a size nothing
 * else on the page reaches, because the reading is the page. Then the one figure, the history,
 * in the report's window chrome; what it counts and how; the log of reads with the change and
 * a note the page works out from the run itself (the high, the low, the biggest move), never
 * typed in; the owner desk; and at the end the gate and the history as a CSV through it.
 */
export default async function TrackerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = trackerBySlug(slug);
  if (!x) notFound();

  const h = x.history;
  const labels = x.historyLabels;
  const n = h.length;
  const prev = n > 1 ? h[n - 2] : undefined;
  const hi = Math.max(...h), lo = Math.min(...h);
  const moves = h
    .map((v, i) => (i ? { i, d: v - h[i - 1] } : null))
    .filter((m): m is { i: number; d: number } => !!m)
    .sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
  const biggest = moves[0];
  const note = (i: number) => {
    const v = h[i];
    const parts: string[] = [];
    if (v === hi && n > 1) parts.push("the high of the run");
    if (v === lo && n > 1) parts.push("the low of the run");
    if (biggest && biggest.i === i) parts.push("the biggest move of the run");
    if (i > 0 && !parts.length) parts.push(Math.abs(v - h[i - 1]) < 1e-9 ? "held" : v > h[i - 1] ? "up" : "down");
    if (i === 0) parts.push("first read");
    return parts.join(", ");
  };
  const log = h.map((v, i) => ({ i, v, l: labels[i] })).reverse().slice(0, 8);
  const related = TRACKERS.filter((y) => y.slug !== x.slug && y.area === x.area).slice(0, 4);
  const sameDesk = TRACKERS.filter((y) => y.owner.name === x.owner.name).length;
  const csv = `/resources/data/${x.slug}-history.csv`;
  const planned = x.status === "planned";

  return (
    <Shell>
      <main className={inst.wrap}>
        <p className={inst.crumb}>
          <Link href="/resources">Resources</Link>
          <span>/</span>
          <Link href="/resources/trackers">Trackers</Link>
          <span>/</span>
          {x.name}
        </p>

        <header className={t.mast}>
          <div>
            <figure className={inst.fox}>
              <img src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            </figure>
            <p className={t.eyebrow}>
              <Dot status={x.status} /> Tracker · {x.cadence} · {AREA_LABEL[x.area]} <em>{x.status}</em>
              <Example on={x.example} />
            </p>
            <h1 className={inst.h1}>{x.name}</h1>
            <p className={inst.stand}>{x.line}</p>
            <p className={t.byline}>
              <i className={t.mark}>{x.owner.name[0]}</i>
              <span>Read by {x.owner.name}, {x.owner.role.toLowerCase()}</span>
              <span className={t.dotSep}>·</span>
              <span>{x.sectors.join(", ")}</span>
              {x.href ? (
                <>
                  <span className={t.dotSep}>·</span>
                  <Link href={x.href} className={inst.link}>The full weekly page &rarr;</Link>
                </>
              ) : null}
            </p>
          </div>

          <div className={t.read} aria-label="The latest reading">
            {planned ? (
              <>
                <span className={t.readV}>&mdash;</span>
                <span className={t.readL}>{x.readingLabel}</span>
                <p className={t.readNo}>No reads yet. The first goes on the board when the desk is on the clock.</p>
              </>
            ) : (
              <>
                <span className={t.readV}>{x.reading}</span>
                <span className={t.readL}>{x.readingLabel}{x.count ? `, ${x.count.k.toLocaleString("en-IE")} of ${x.count.n.toLocaleString("en-IE")}` : ""}</span>
                <p className={t.readD}>
                  <Dir direction={x.direction}><b>{x.delta}</b></Dir>
                  {prev !== undefined ? <span>from {fmt(prev, x.unit)}, {shortLabel(labels[n - 2])}</span> : null}
                  <span>read <b>{day(x.lastRead)}</b></span>
                </p>
              </>
            )}
          </div>
        </header>

        <div className={t.body}>
          <div className={t.main}>
            {!planned ? (
              <FigureWindow id="history" n="1" title={`${x.name}: ${n} reads, ${fmt(lo, x.unit)} to ${fmt(hi, x.unit)}.`} caption={`Every read of this tracker, oldest first. Read ${x.cadence.toLowerCase()} by ${x.owner.name}. The last point is the reading above.`} tools={<span>{x.cadence} · {n} reads</span>}>
                <Chart data={{ kind: "line", unit: x.unit, x: thin(labels), series: [{ name: x.readingLabel, values: h, highlight: true }] }} />
              </FigureWindow>
            ) : null}

            <section className={t.sec} id="method">
              <p className={inst.lab}>What it counts, and how</p>
              <p className={inst.p}>
                {x.name} counts {x.readingLabel.replace(/^of /, "the share of ")}{x.count ? `: on the last read, ${x.count.k.toLocaleString("en-IE")} of ${x.count.n.toLocaleString("en-IE")}` : ""}. It is read {x.cadence.toLowerCase()} by {x.owner.name}
                {x.owner.kind === "agent" ? ", an agent," : ""} the same way each time, and a read is never revised after the fact. If the method changes, the tracker starts a new run and this page says so.
              </p>
              <p className={inst.p}>
                {x.example
                  ? "This tracker is an example. Its readings were generated for the mockup and never met a real market; the shape of the page is what is being shown."
                  : "The numbers are real reads. Where a run is short, the page says so rather than smoothing it."}
              </p>
            </section>

            {!planned ? (
              <section className={t.sec} id="log">
                <p className={inst.lab}>The log, newest first</p>
                <table className={t.log}>
                  <thead>
                    <tr>
                      <th>Read</th>
                      <th>Reading</th>
                      <th>Change</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.map((r) => (
                      <tr key={r.i} className={r.i === n - 1 ? t.logNow : ""}>
                        <td>{shortLabel(r.l)}</td>
                        <td>{fmt(r.v, x.unit)}</td>
                        <td>{r.i ? diff(r.v, h[r.i - 1], x.unit) : ""}</td>
                        <td>{note(r.i)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {n > 8 ? <p className={inst.small} style={{ marginTop: 10 }}>{n - 8} earlier reads are in the history file.</p> : null}
              </section>
            ) : null}

            {moves.length > 1 ? (
              <section className={t.sec} id="moves">
                <p className={inst.lab}>What moved</p>
                <ol className={t.moves}>
                  {moves.slice(0, 3).map((m) => (
                    <li key={m.i}>
                      <span>{shortLabel(labels[m.i])}</span>
                      <span>
                        {m.d > 0 ? "Up" : "Down"} to <b>{fmt(h[m.i], x.unit)}</b> from {fmt(h[m.i - 1], x.unit)}, {diff(h[m.i], h[m.i - 1], x.unit)}
                        {m.i === biggest.i ? ", the biggest move of the run" : ""}.
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <Gate adds={x.withAccount} />
            {!planned ? (
              <div className={t.dl}>
                <DownloadPdf kind="csv" href={csv} label="Download the history" size={fileSize(csv)} />
              </div>
            ) : null}
          </div>

          <aside className={t.side}>
            <div className={t.sideBlock}>
              <p className={inst.lab}>The desk</p>
              <div className={t.desk}>
                <i className={t.mark} style={{ width: 32, height: 32, fontSize: 13 }}>{x.owner.name[0]}</i>
                <div>
                  <b>{x.owner.name}</b>
                  <span>{x.owner.role}</span>
                </div>
              </div>
              <p style={{ marginTop: 12 }}>Reads {sameDesk} tracker{sameDesk === 1 ? "" : "s"} on the board.</p>
            </div>
            <div className={t.sideBlock}>
              <p className={inst.lab}>Reading</p>
              <p>Cadence <span style={{ float: "right", color: "#1D1B1B" }}>{x.cadence}</span></p>
              <p>Reads so far <span style={{ float: "right", color: "#1D1B1B" }}>{n}</span></p>
              <p>Last read <span style={{ float: "right", color: "#1D1B1B" }}>{planned ? "none" : day(x.lastRead)}</span></p>
              <p style={{ clear: "both" }}>Sectors<br /><span style={{ color: "#1D1B1B" }}>{x.sectors.join(", ")}</span></p>
            </div>
            {related.length ? (
              <div className={t.sideBlock}>
                <p className={inst.lab}>Also in {AREA_LABEL[x.area].toLowerCase()}</p>
                {related.map((y) => (
                  <Link key={y.slug} href={trackerHref(y)}>
                    {y.name}
                    <Example on={y.example} />
                    <span>{y.status === "planned" ? "planned" : y.reading}</span>
                  </Link>
                ))}
              </div>
            ) : null}
            <div className={t.sideBlock}>
              <Link href="/resources/trackers" className={inst.link}>&larr; The whole board</Link>
            </div>
          </aside>
        </div>
      </main>
    </Shell>
  );
}
