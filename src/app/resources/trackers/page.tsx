import type { Metadata } from "next";
import Link from "next/link";
import { TRACKERS, day } from "../catalogue";
import { Gate } from "../kit";
import { Shell, inst } from "../instrument/Shell";
import Board from "./Board";
import t from "./trackers.module.css";

export const metadata: Metadata = {
  title: "The board: every tracker | Run with Foxes",
  description: "Every measure our agents read on a schedule, on one board: the reading, the trend, the change, and when it was read.",
  robots: { index: false, follow: false },
};

/**
 * /resources/trackers, THE BOARD. Paul, 25 Sep 2026: "I have ambition to do lots of trackers
 * and lots of reports. So think big." And his reference for trackers is the dataintelligence
 * board, where a price change is a story and the board is the screen.
 *
 * The shape: a table, not cards. Twenty measures read as a column of numbers with a sparkline
 * beside each, live first. The head carries the stamp (how many, last read) because on a board
 * the date of the reading is half the information. Under it, three lines on how a tracker is
 * read, then the gate: the finding is free, the history and the note when it moves need an
 * email (the gate rule, 26 Sep).
 */
export default function TrackersPage() {
  const live = TRACKERS.filter((x) => x.status === "live");
  const testing = TRACKERS.filter((x) => x.status === "testing");
  const planned = TRACKERS.filter((x) => x.status === "planned");
  const latest = [...live, ...testing].map((x) => x.lastRead).sort().at(-1)!;
  const desks = new Set(TRACKERS.map((x) => x.owner.name)).size;
  const reads = TRACKERS.reduce((a, x) => a + x.history.length, 0);
  const adds = Array.from(new Set(TRACKERS.flatMap((x) => x.withAccount))).slice(0, 4);

  return (
    <Shell>
      <main className={inst.wrap}>
        <p className={inst.crumb}>
          <Link href="/resources">Resources</Link>
          <span>/</span>
          Trackers
        </p>
        <header className={t.head}>
          <div>
            <figure className={inst.fox}>
              <img src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            </figure>
            <h1 className={inst.h1}>The board</h1>
            <p className={inst.stand}>
              Every measure our agents read on a schedule, on one screen. A reading is a number and the day it was read. When one moves, the tracker&rsquo;s page says what moved and why.
            </p>
          </div>
          <p className={t.stamp}>
            <b>{TRACKERS.length}</b> trackers · <b>{live.length}</b> live · <b>{testing.length}</b> testing · <b>{planned.length}</b> planned
            <br />
            <b>{reads.toLocaleString("en-IE")}</b> readings so far, by <b>{desks}</b> desks
            <br />
            <i>last read {day(latest)}</i>
          </p>
        </header>

        <Board trackers={TRACKERS} />

        <hr className={inst.rule} />
        <section className={t.how} aria-label="How a tracker is read">
          {[
            ["01", "A tracker is one measure", "One number, one method, read the same way every time. If the method changes, the tracker starts a new run and says so."],
            ["02", "An agent reads it on a clock", "Each desk has a day. The run writes the reading, the count behind it and the date. Nothing is typed in by hand, and a reading is never revised after the fact."],
            ["03", "Testing before live", "A new tracker is read by hand for a few weeks first. It goes on the board as testing, and to live once two reads in a row agree with a person's count."],
          ].map(([n, h, p]) => (
            <div key={n}>
              <span className={t.howN}>{n}</span>
              <h2 className={t.howT}>{h}</h2>
              <p className={t.howP}>{p}</p>
            </div>
          ))}
        </section>

        <Gate adds={adds} head="With a free account, on every tracker" />
      </main>
    </Shell>
  );
}
