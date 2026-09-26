"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Example } from "../kit";
import { day, type Report, type ReportSeries } from "../catalogue";
import s from "./reports.module.css";

type Row = { r: Report; series: ReportSeries; href: string };

/**
 * The publications table. Anthropic's research index is a plain table (Date, Category, Title)
 * with a search box and "See more", and that is the shape here: the weight is in the featured
 * figure above, so the list stays quiet. Filters change the rows in place; nothing navigates
 * until a title is clicked. Fifteen rows at a time.
 */
export default function ReportsTable({ rows, sectors, years }: { rows: Row[]; sectors: string[]; years: string[] }) {
  const [series, setSeries] = useState("");
  const [sector, setSector] = useState("");
  const [year, setYear] = useState("");
  const [q, setQ] = useState("");
  const [n, setN] = useState(15);
  const seriesNames = useMemo(() => Array.from(new Map(rows.map((x) => [x.series.slug, x.series.name])).entries()), [rows]);
  const shown = useMemo(
    () =>
      rows.filter(
        (x) =>
          (!series || x.series.slug === series) &&
          (!sector || x.r.sectors.includes(sector as Report["sectors"][number])) &&
          (!year || x.r.date.startsWith(year)) &&
          (!q || `${x.r.title} ${x.series.name} ${x.r.author.name} ${x.r.standfirst}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [rows, series, sector, year, q],
  );
  return (
    <div>
      <div className={s.filters}>
        <select aria-label="Series" value={series} onChange={(e) => (setSeries(e.target.value), setN(15))}>
          <option value="">Every series</option>
          {seriesNames.map(([slug, name]) => (
            <option key={slug} value={slug}>{name}</option>
          ))}
        </select>
        <select aria-label="Sector" value={sector} onChange={(e) => (setSector(e.target.value), setN(15))}>
          <option value="">Every sector</option>
          {sectors.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
        <select aria-label="Year" value={year} onChange={(e) => (setYear(e.target.value), setN(15))}>
          <option value="">Every year</option>
          {years.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
        <input type="search" placeholder="Search the reports" aria-label="Search the reports" value={q} onChange={(e) => (setQ(e.target.value), setN(15))} />
        <span className={s.filtN}>{shown.length} of {rows.length}</span>
      </div>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Series</th>
            <th>Title</th>
            <th>By</th>
            <th style={{ textAlign: "right" }}>PDF</th>
          </tr>
        </thead>
        <tbody>
          {shown.slice(0, n).map(({ r, series: se, href }) => (
            <tr key={r.slug}>
              <td className={s.tDate}>{day(r.date)}</td>
              <td className={s.tSeries}>
                <Link href={`/resources/reports/${se.slug}`}>{se.name}</Link>
                <br />
                <span style={{ color: "#8A8A85", fontSize: 10.5 }}>{r.edition}</span>
              </td>
              <td className={s.tTitle}>
                <Link href={href}>{r.title}</Link>
                <Example on={r.example} />
                {r.status === "draft" ? <span className={s.badge} style={{ marginLeft: 8, fontSize: 9.5 }}>Draft</span> : null}
              </td>
              <td className={s.tBy}>{r.author.name}</td>
              <td className={s.tPdf}>
                <a href={href + "#download"}>{r.pages} pp</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shown.length > n ? (
        <button type="button" className={s.seeMore} onClick={() => setN(n + 15)}>
          See more, {shown.length - n} left
        </button>
      ) : null}
    </div>
  );
}
