import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { statSync } from "node:fs";
import { join } from "node:path";
import { AREA_LABEL, DATASETS, TRACKERS, datasetBySlug, datasetHref, day, reportBySlug, reportHref, trackerHref, type ColumnType } from "../../catalogue";
import { Example, Gate, DownloadPdf } from "../../kit";
import { Shell, inst } from "../../instrument/Shell";
import { TYPE_CLASS, Strip } from "../Catalogue";
import d from "../data.module.css";

export function generateStaticParams() {
  return DATASETS.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const x = datasetBySlug((await params).slug);
  return { title: x ? `${x.name}, ${x.rows.toLocaleString("en-IE")} rows | Run with Foxes` : "Dataset", robots: { index: false, follow: false } };
}

const NUMERIC: ColumnType[] = ["number", "percent", "euro"];

function cell(v: string | number | boolean, type: ColumnType) {
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (typeof v === "number") {
    if (type === "percent") return `${v}%`;
    if (type === "euro") return `€${v.toLocaleString("en-IE")}`;
    return v.toLocaleString("en-IE");
  }
  if (type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return day(v);
  return v;
}

function fileSize(p: string) {
  try {
    const b = statSync(join(process.cwd(), "public", p)).size;
    return b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;
  } catch {
    return undefined;
  }
}

/**
 * ONE DATASET: the file, opened. The masthead names it and gives its six facts in a row
 * (rows, columns, updated, cadence, size, desk). Then the schema, one row per column with its
 * type as a coloured block; then the first eight rows as a real table in the report's window
 * chrome, titled with the file's name; how it was collected and its licence; where it is used;
 * and at the end the gate, with the whole CSV through it.
 */
export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = datasetBySlug(slug);
  if (!x) notFound();

  const used = x.usedIn.map((s) => reportBySlug(s)).filter((r): r is NonNullable<typeof r> => !!r);
  const trackers = TRACKERS.filter((y) => y.area === x.area).slice(0, 3);
  const related = DATASETS.filter((y) => y.slug !== x.slug && y.area === x.area).slice(0, 4);
  const size = fileSize(x.csv) ?? x.size;
  const left = x.rows - x.sample.length;

  return (
    <Shell>
      <main className={inst.wrap}>
        <p className={inst.crumb}>
          <Link href="/resources">Resources</Link>
          <span>/</span>
          <Link href="/resources/data">Data</Link>
          <span>/</span>
          {x.name}
        </p>

        <header className={d.mast}>
          <figure className={inst.fox}>
            <img src="/fox/chapter-fox-bored-nobg.png" alt="" />
          </figure>
          <p className={d.eyebrow}>
            Dataset · {AREA_LABEL[x.area]} · {x.cadence}
            <Example on={x.example} />
          </p>
          <h1 className={inst.h1}>{x.name}</h1>
          <p className={inst.stand}>{x.line}</p>
          <div className={d.facts}>
            <span className={d.fact}>Rows<b>{x.rows.toLocaleString("en-IE")}</b></span>
            <span className={d.fact}>Columns<b>{x.columns.length}</b></span>
            <span className={d.fact}>Updated<b>{day(x.updated)}</b></span>
            <span className={d.fact}>Read<b>{x.cadence}</b></span>
            <span className={d.fact}>File<b>{size}<small>csv</small></b></span>
            <span className={d.fact}>Desk<b>{x.owner.name}</b></span>
          </div>
        </header>

        <div className={d.body}>
          <div className={d.main}>
            <section id="schema" className={`${d.sec} ${d.secFirst}`}>
              <p className={inst.lab}>The columns</p>
              <table className={d.schema}>
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Type</th>
                    <th>What it holds</th>
                  </tr>
                </thead>
                <tbody>
                  {x.columns.map((c) => (
                    <tr key={c.name}>
                      <td>{c.name}</td>
                      <td>
                        <span className={d.type}>
                          <i className={TYPE_CLASS[c.type]} />
                          {c.type}
                        </span>
                      </td>
                      <td>{c.about}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className={d.sec} id="sample">
              <p className={inst.lab}>The first {x.sample.length} rows, free</p>
              <figure className="mod-win" style={{ margin: 0 }}>
                <div className="mod-winbar">
                  <span className="mod-lights">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mod-wintitle">{x.slug}.csv</span>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "#8A8A85" }}>
                    {x.sample.length} of {x.rows.toLocaleString("en-IE")} rows
                  </span>
                </div>
                <div style={{ padding: "14px 20px 12px", background: "#fff" }}>
                  <div className={d.sampleWrap}>
                    <table className={d.sample}>
                      <thead>
                        <tr>
                          {x.columns.map((c) => (
                            <th key={c.name}>
                              <i className={TYPE_CLASS[c.type]} />
                              {c.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {x.sample.map((r, i) => (
                          <tr key={i}>
                            {x.columns.map((c) => (
                              <td key={c.name} className={NUMERIC.includes(c.type) ? d.n : ""}>{cell(r[c.name], c.type)}</td>
                            ))}
                          </tr>
                        ))}
                        {left > 0 ? (
                          <tr className={d.rowsLeft}>
                            {x.columns.map((c) => (
                              <td key={c.name}>···</td>
                            ))}
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                  <p className={d.sampleFoot}>
                    {left > 0 ? <><b>{left.toLocaleString("en-IE")} more rows</b> in the file, with a free account.</> : <>That is the whole file.</>}
                  </p>
                </div>
              </figure>
            </section>

            <section className={d.sec} id="method">
              <p className={inst.lab}>How it was collected</p>
              <p className={inst.p}>
                {x.name} is read {x.cadence.toLowerCase()} by {x.owner.name}{x.owner.kind === "agent" ? ", an agent" : ""}. Each read is written to the file with its date; rows are never edited after the fact, and a re-read is a new copy of the file with a new date at the top. Where a row could not be read cleanly it is left out rather than guessed.
              </p>
              <p className={inst.p}>
                {x.example
                  ? "This file is an example. Its rows were generated for the mockup from the eight above, and never met a real market."
                  : "This file is real. Where it is short, it is short: it holds what was read and no more."}
              </p>
              <p className={inst.lab} style={{ marginTop: 22 }}>Licence</p>
              <p className={inst.p}>{x.licence}</p>
            </section>

            <Gate adds={["The whole file, every row, as a CSV", "A fresh copy each time it is re-read", ...(x.sectors.length ? ["Your sector cut out"] : [])]} />
            <div className={d.dl}>
              <DownloadPdf kind="csv" href={x.csv} label="Download the whole file" size={size} />
            </div>
          </div>

          <aside className={d.side}>
            <div className={d.sideBlock}>
              <p className={inst.lab}>Shape</p>
              <p style={{ marginBottom: 10 }}><Strip columns={x.columns} /></p>
              <p>{x.columns.map((c) => c.name).join(" · ")}</p>
            </div>
            {used.length ? (
              <div className={d.sideBlock}>
                <p className={inst.lab}>Used in</p>
                {used.map((r) => (
                  <Link key={r.slug} href={reportHref(r)}>
                    {r.title}
                    <Example on={r.example} />
                  </Link>
                ))}
              </div>
            ) : null}
            {trackers.length ? (
              <div className={d.sideBlock}>
                <p className={inst.lab}>Trackers in {AREA_LABEL[x.area].toLowerCase()}</p>
                {trackers.map((y) => (
                  <Link key={y.slug} href={trackerHref(y)}>
                    {y.name}
                    <Example on={y.example} />
                    <span>{y.status === "planned" ? "planned" : y.reading}</span>
                  </Link>
                ))}
              </div>
            ) : null}
            {related.length ? (
              <div className={d.sideBlock}>
                <p className={inst.lab}>Also in {AREA_LABEL[x.area].toLowerCase()}</p>
                {related.map((y) => (
                  <Link key={y.slug} href={datasetHref(y)}>
                    {y.name}
                    <Example on={y.example} />
                    <span>{y.rows.toLocaleString("en-IE")} rows</span>
                  </Link>
                ))}
              </div>
            ) : null}
            <div className={d.sideBlock}>
              <Link href="/resources/data" className={inst.link}>&larr; Every dataset</Link>
            </div>
          </aside>
        </div>
      </main>
    </Shell>
  );
}
