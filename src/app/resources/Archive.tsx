"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./front.module.css";
import type { Area, Entry } from "./library";

/**
 * THE ARCHIVE, KEPT SMALL. Paul, 24 Sep 2026: "the everything library doesn't need to be such
 * a big thing." So it is one line at the foot of the page: a count, a search box and a way to
 * open it. It lists nothing until someone searches or asks, and then as a compact index, not
 * a table.
 */
export default function Archive({
  entries,
  areaNames,
}: {
  entries: (Entry & { day: string })[];
  areaNames: Record<Area, string>;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const t = q.trim().toLowerCase();
  const rows = t
    ? entries.filter((e) => `${e.title} ${e.type} ${areaNames[e.area]}`.toLowerCase().includes(t))
    : entries;
  const show = t || open;
  const first = entries[entries.length - 1];

  return (
    <section className={s.archive} id="archive">
      <div className={s.archiveBar}>
        <span className={s.archiveLabel}>
          The archive <em>{entries.length} pieces since {first?.day.replace(/^\d+\s/, "")}</em>
        </span>
        <input
          id="archive-search"
          className={s.archiveSearch}
          type="search"
          placeholder="search essays, studies, answers"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search the archive"
        />
        <button type="button" className={s.archiveOpen} onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close" : "Open the archive"}
        </button>
      </div>
      {show ? (
        <ol className={s.archiveList}>
          {rows.map((e, i) => (
            <li key={`${e.href}-${i}`}>
              <span>{e.day}</span>
              <Link href={e.href}>{e.title}</Link>
              <i>
                {e.type}, {areaNames[e.area]}
              </i>
            </li>
          ))}
          {rows.length === 0 ? <li className={s.archiveNone}>Nothing matches that yet.</li> : null}
        </ol>
      ) : null}
    </section>
  );
}
