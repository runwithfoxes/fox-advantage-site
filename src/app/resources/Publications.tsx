"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import s from "./hub.module.css";
import { Example } from "./kit";

/**
 * PUBLICATIONS, AS A TABLE. Anthropic's research index is a plain table (date, category, title)
 * with a search box and "See more", and nothing is a card. Ours adds who wrote it and the sector,
 * because a marketer scans for their own sector first. Every row that is made up carries the
 * Example tag beside its title (BUILD-NOTES, the Example rule).
 *
 * The rows come flattened from the server so the whole list is in the HTML for search and the AI
 * engines; this file only filters what is already there.
 */
export type Pub = {
  date: string; // ISO
  day: string; // printed
  type: "Report" | "Tracker" | "Dataset" | "Essay" | "Diary" | "Answer" | "Module";
  title: string;
  href: string;
  author: string;
  sector: string;
  example: boolean;
};

const TYPES: Pub["type"][] = ["Report", "Tracker", "Dataset", "Essay", "Diary", "Answer", "Module"];
const LABEL: Record<Pub["type"], string> = {
  Report: "Reports",
  Tracker: "Trackers",
  Dataset: "Datasets",
  Essay: "Essays",
  Diary: "Diary",
  Answer: "Answers",
  Module: "Course",
};
const PAGE = 12;

export default function Publications({ rows }: { rows: Pub[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<Pub["type"] | "all">("all");
  const [shown, setShown] = useState(PAGE);

  const t = q.trim().toLowerCase();
  const hits = useMemo(
    () => rows.filter((r) => (type === "all" || r.type === type) && (!t || `${r.title} ${r.author} ${r.sector} ${r.type}`.toLowerCase().includes(t))),
    [rows, t, type],
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    rows.forEach((r) => (c[r.type] = (c[r.type] ?? 0) + 1));
    return c;
  }, [rows]);
  const list = hits.slice(0, shown);

  return (
    <div className={s.pubs}>
      <div className={s.pubBar}>
        <div className={s.chips} role="tablist" aria-label="Kind of publication">
          {/* a kind with nothing in it gets no chip, so a reports-only list shows only Reports */}
          {(["all", ...TYPES] as const).filter((k) => k === "all" || (counts[k] ?? 0) > 0).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={type === k}
              aria-pressed={type === k}
              onClick={() => {
                setType(k);
                setShown(PAGE);
              }}
            >
              {k === "all" ? "All" : LABEL[k]} <i>{counts[k] ?? 0}</i>
            </button>
          ))}
        </div>
        <input
          className={s.search}
          type="search"
          placeholder="Search titles, authors, sectors"
          aria-label="Search publications"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShown(PAGE);
          }}
        />
      </div>

      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Kind</th>
              <th>Title</th>
              <th>By</th>
              <th>Sector</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.href + r.title}>
                <td className={s.num}>{r.day}</td>
                <td>{r.type}</td>
                <td className={s.titleCell}>
                  <Link href={r.href}>{r.title}</Link>
                  <Example on={r.example} />
                </td>
                <td>{r.author}</td>
                <td>{r.sector}</td>
              </tr>
            ))}
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className={s.empty}>
                  Nothing matches that yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className={s.pubFoot}>
        <span className={s.meta}>
          {list.length} of {hits.length}
        </span>
        {hits.length > shown ? (
          <button type="button" className={s.more} onClick={() => setShown(shown + 24)}>
            See more
          </button>
        ) : null}
      </div>
    </div>
  );
}
