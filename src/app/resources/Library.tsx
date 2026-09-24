"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import s from "./front.module.css";
import type { Area, Entry } from "./library";

const SHOW = 12;

/**
 * The areas row and the everything table share one filter, so choosing an area narrows the
 * table and takes you to it. `middle` is whatever sits between them (the featured block).
 */
export default function Library({
  areas,
  entries,
  middle,
}: {
  areas: { key: Area; name: string; line: string; count: number }[];
  entries: (Entry & { day: string })[];
  middle: ReactNode;
}) {
  const [area, setArea] = useState<Area | null>(null);
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const name = (k: Area) => areas.find((a) => a.key === k)?.name ?? k;

  const t = q.trim().toLowerCase();
  const rows = entries.filter(
    (e) =>
      (!area || e.area === area) &&
      (!t || `${e.title} ${e.type} ${name(e.area)}`.toLowerCase().includes(t)),
  );
  const shown = all || t || area ? rows : rows.slice(0, SHOW);

  const pick = (k: Area) => {
    setArea(area === k ? null : k);
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className={s.areas} aria-label="Areas">
        {areas.map((a) => (
          <button key={a.key} type="button" className={s.area} onClick={() => pick(a.key)}>
            <span className={s.areaName}>{a.name}</span>
            <span className={s.areaLine}>{a.line}</span>
            <span className={s.areaCount}>
              {a.count} {a.count === 1 ? "piece" : "pieces"} →
            </span>
          </button>
        ))}
      </section>

      {middle}

      <section className={s.pubs} ref={tableRef} id="everything">
        <div className={s.pubsHead}>
          <h2 className={s.h2}>Everything</h2>
          <input
            id="library-search"
            className={s.search}
            type="search"
            placeholder="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search everything"
          />
        </div>
        <div className={s.chips}>
          <button type="button" aria-pressed={area === null} onClick={() => setArea(null)}>
            All {entries.length}
          </button>
          {areas.map((a) => (
            <button key={a.key} type="button" aria-pressed={area === a.key} onClick={() => setArea(area === a.key ? null : a.key)}>
              {a.name}
            </button>
          ))}
        </div>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Area</th>
                <th>Type</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e, i) => (
                <tr key={`${e.href}-${i}`}>
                  <td className={s.num}>{e.day}</td>
                  <td>{name(e.area)}</td>
                  <td>{e.type}</td>
                  <td>
                    <Link href={e.href}>{e.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 ? <p className={s.empty}>Nothing matches that yet.</p> : null}
        </div>
        {!all && !t && !area && rows.length > SHOW ? (
          <button type="button" className={s.more} onClick={() => setAll(true)}>
            See all {rows.length} ↓
          </button>
        ) : null}
      </section>
    </>
  );
}
