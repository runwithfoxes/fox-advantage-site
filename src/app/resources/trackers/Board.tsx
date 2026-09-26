"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AREA_LABEL, day, trackerHref, type Area, type Sector, type Tracker } from "../catalogue";
import { Example, Sparkline } from "../kit";
import { Dot, Dir, inst } from "../instrument/Shell";
import t from "./trackers.module.css";

/**
 * THE BOARD. Every tracker as one row: the dot, the name and what it reads, the sparkline,
 * the reading, the change, cadence, last read, owner. Live first, then testing, then planned.
 * Filters are a row of area chips and a sector picker (the homepage's "Your sector" control),
 * changing the rows in place; the page never navigates to filter.
 */
export default function Board({ trackers }: { trackers: Tracker[] }) {
  const [area, setArea] = useState<Area | "all">("all");
  const [sector, setSector] = useState<Sector | "all">("all");
  const areas = useMemo(() => Array.from(new Set(trackers.map((x) => x.area))) as Area[], [trackers]);
  const sectors = useMemo(() => Array.from(new Set(trackers.flatMap((x) => x.sectors))).sort() as Sector[], [trackers]);
  const rows = trackers.filter((x) => (area === "all" || x.area === area) && (sector === "all" || x.sectors.includes(sector)));
  const groups: { key: Tracker["status"]; label: string }[] = [
    { key: "live", label: "Live, read on schedule" },
    { key: "testing", label: "Testing, read by hand before it goes on the clock" },
    { key: "planned", label: "Planned, first read to come" },
  ];

  return (
    <>
      <div className={inst.filters} role="group" aria-label="Filter the board">
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
        <span className={inst.count}>{rows.length} of {trackers.length}</span>
      </div>

      <div className={t.cols} aria-hidden>
        <span />
        <span>Tracker</span>
        <span>Trend</span>
        <span className={t.right}>Reading</span>
        <span className={t.right}>Change</span>
        <span className={t.hideMid}>Read</span>
        <span className={t.hideMid}>Last</span>
        <span>Desk</span>
      </div>

      {rows.length === 0 ? <p className={t.empty}>Nothing on the board for that pair yet. Try another sector.</p> : null}

      {groups.map((g) => {
        const rs = rows.filter((x) => x.status === g.key);
        if (!rs.length) return null;
        return (
          <div key={g.key}>
            <p className={t.group}>{g.label}</p>
            <ol className={t.board}>
              {rs.map((x) => (
                <li key={x.slug}>
                  <Link href={trackerHref(x)} className={`${t.row} ${x.status === "planned" ? t.rowPlan : ""}`}>
                    <span className={t.rowDot}><Dot status={x.status} /></span>
                    <span className={t.name}>
                      <span className={t.nameT}>
                        {x.name}
                        <Example on={x.example} />
                      </span>
                      <span className={t.nameL}>{x.line}</span>
                    </span>
                    <span className={t.spark}>
                      {x.status === "planned" ? <span className={inst.count}>no reads yet</span> : <Sparkline values={x.history} width={120} height={30} color={x.status === "testing" ? "#6CAAC8" : "#3A7CA5"} label={`${x.name}, ${x.history.length} readings`} />}
                    </span>
                    <span className={t.reading}>
                      {x.status === "planned" ? <span className={inst.count}>{x.cadence}</span> : x.reading}
                      {x.status !== "planned" ? <span className={t.readingL}>{x.readingLabel}</span> : null}
                    </span>
                    <span className={t.delta}>{x.status === "planned" ? "" : <Dir direction={x.direction}>{x.delta}</Dir>}</span>
                    <span className={`${t.meta} ${t.hideMid}`}>{x.cadence}</span>
                    <span className={`${t.meta} ${t.hideMid}`}>{x.status === "planned" ? "" : day(x.lastRead)}</span>
                    <span className={`${t.owner} ${t.hideSmall}`}>
                      {x.owner.name} <em>{x.owner.kind === "agent" ? "an agent" : ""}</em>
                    </span>
                    <span className={t.metaRow}>
                      <span>{x.cadence}</span>
                      {x.status !== "planned" ? <span>read {day(x.lastRead)}</span> : null}
                      <span>{x.owner.name}{x.owner.kind === "agent" ? ", an agent" : ""}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </>
  );
}
