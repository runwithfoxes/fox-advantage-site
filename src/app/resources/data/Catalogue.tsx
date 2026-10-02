"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AREA_LABEL, datasetHref, day, type Area, type ColumnType, type Dataset, type Sector } from "../catalogue";
import { Example } from "../kit";
import { inst } from "../instrument/Shell";
import d from "./data.module.css";

export const TYPE_CLASS: Record<ColumnType, string> = {
  text: d.tText,
  category: d.tCategory,
  number: d.tNumber,
  percent: d.tPercent,
  euro: d.tEuro,
  date: d.tDate,
  url: d.tUrl,
  boolean: d.tBoolean,
};

/** The schema strip: one block per column, coloured by type. The shape of the file at a glance. */
export function Strip({ columns }: { columns: Dataset["columns"] }) {
  return (
    <span className={d.strip} role="img" aria-label={columns.map((c) => `${c.name} (${c.type})`).join(", ")}>
      {columns.map((c) => (
        <i key={c.name} className={TYPE_CLASS[c.type]} title={`${c.name}: ${c.type}`} />
      ))}
    </span>
  );
}

/**
 * THE CATALOGUE. One row per dataset: name and what it is, the schema strip, rows, columns,
 * updated, cadence, size. Real files first, then the examples, newest updated first within
 * each. The same chips and sector picker as the board, filtering in place.
 */
export default function Catalogue({ datasets }: { datasets: Dataset[] }) {
  const [area, setArea] = useState<Area | "all">("all");
  const [sector, setSector] = useState<Sector | "all">("all");
  const areas = useMemo(() => Array.from(new Set(datasets.map((x) => x.area))) as Area[], [datasets]);
  const sectors = useMemo(() => Array.from(new Set(datasets.flatMap((x) => x.sectors))).sort() as Sector[], [datasets]);
  const rows = datasets.filter((x) => (area === "all" || x.area === area) && (sector === "all" || x.sectors.includes(sector)));
  const real = rows.filter((x) => !x.example).sort((a, b) => b.updated.localeCompare(a.updated));
  const ex = rows.filter((x) => x.example).sort((a, b) => b.updated.localeCompare(a.updated));

  const list = (xs: Dataset[]) => (
    <ol className={d.list}>
      {xs.map((x) => (
        <li key={x.slug}>
          <Link href={datasetHref(x)} className={d.row}>
            <span className={d.name}>
              <span className={d.nameT}>
                {x.name}
                <Example on={x.example} />
              </span>
              <span className={d.nameL}>{x.line}</span>
            </span>
            <Strip columns={x.columns} />
            <span className={d.num}>{x.rows.toLocaleString("en-IE")}</span>
            <span className={`${d.num} ${d.hideMid}`}>{x.columns.length}</span>
            <span className={d.meta}>{day(x.updated)}</span>
            <span className={`${d.meta} ${d.hideMid}`}>{x.cadence}</span>
            <span className={`${d.meta} ${d.hideMid} ${d.right}`}>{x.size}</span>
            <span className={d.metaRow}>
              <span>{x.columns.length} columns</span>
              <span>{x.cadence}</span>
              <span>{x.size}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div className={inst.filters} role="group" aria-label="Filter the datasets">
        <button type="button" className={`${inst.chip} ${area === "all" ? inst.chipOn : ""}`} onClick={() => setArea("all")}>All</button>
        {areas.map((a) => (
          <button key={a} type="button" className={`${inst.chip} ${area === a ? inst.chipOn : ""}`} onClick={() => setArea(a)}>
            {AREA_LABEL[a]}
          </button>
        ))}
        <label className={inst.pick}>
          Sector
          <select value={sector} onChange={(e) => setSector(e.target.value as Sector | "all")}>
            <option value="all">Every sector</option>
            {sectors.map((sc) => (
              <option key={sc} value={sc}>{sc}</option>
            ))}
          </select>
        </label>
        <span className={inst.count}>{rows.length} of {datasets.length}</span>
      </div>

      <div className={d.cols} aria-hidden>
        <span>Dataset</span>
        <span>Columns</span>
        <span className={d.right}>Rows</span>
        <span className={`${d.right} ${d.hideMid}`}>Cols</span>
        <span>Updated</span>
        <span className={d.hideMid}>Read</span>
        <span className={`${d.right} ${d.hideMid}`}>Size</span>
      </div>

      {rows.length === 0 ? <p className={d.empty}>No dataset for that pair yet. Try another sector.</p> : null}
      {real.length ? (
        <>
          <p className={d.group}>Read for real</p>
          {list(real)}
        </>
      ) : null}
      {ex.length ? (
        <>
          <p className={d.group}>Examples, generated for the mockup</p>
          {list(ex)}
        </>
      ) : null}
    </>
  );
}
