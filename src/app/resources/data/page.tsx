import type { Metadata } from "next";
import Link from "next/link";
import { COUNTS, DATASETS, day } from "../catalogue";
import { Gate } from "../kit";
import { Shell, inst } from "../instrument/Shell";
import Catalogue, { TYPE_CLASS } from "./Catalogue";
import d from "./data.module.css";

export const metadata: Metadata = {
  title: "Data: every dataset | Run with Foxes",
  description: "Every dataset behind our research, with its columns, its row count and when it was last read. The first rows are free; the whole file comes with a free account.",
  robots: { index: false, follow: false },
};

const TYPES = ["text", "category", "number", "percent", "euro", "date", "url", "boolean"] as const;

/**
 * /resources/data, THE DATASETS. A catalogue table, not cards, because a file is chosen by its
 * shape and its size, and those are columns. The thing drawn for this page is the schema
 * strip: one block per column, coloured by type, so a reader sees a file's shape before its
 * name. The gate rule: the first eight rows of every file are free on its page; the whole CSV
 * comes with a free account.
 */
export default function DataPage() {
  const latest = DATASETS.map((x) => x.updated).sort().at(-1)!;
  const real = DATASETS.filter((x) => !x.example).length;
  const cols = DATASETS.reduce((a, x) => a + x.columns.length, 0);
  const adds = ["The whole file, every row, as a CSV", "A fresh copy each time it is re-read", "Your sector cut out, where the file has one"];

  return (
    <Shell>
      <main className={inst.wrap}>
        <p className={inst.crumb}>
          <Link href="/resources">Resources</Link>
          <span>/</span>
          Data
        </p>
        <header className={d.head}>
          <div>
            <figure className={inst.fox}>
              <img src="/fox/chapter-fox-bored-nobg.png" alt="" />
            </figure>
            <h1 className={inst.h1}>The data</h1>
            <p className={inst.stand}>
              Every file behind our reports and trackers, with its columns, its row count and the day it was last read. Open one to see its first rows. The whole file is yours with a free account.
            </p>
          </div>
          <div>
            <p className={d.stamp}>
              <b>{COUNTS.datasets}</b> datasets · <b>{COUNTS.rows.toLocaleString("en-IE")}</b> rows · <b>{cols}</b> columns
              <br />
              <b>{real}</b> read for real, the rest examples
              <br />
              last updated {day(latest)}
            </p>
            <p className={d.key} aria-label="Column types">
              {TYPES.map((tp) => (
                <span key={tp}>
                  <i className={TYPE_CLASS[tp]} />
                  {tp}
                </span>
              ))}
            </p>
          </div>
        </header>

        <Catalogue datasets={DATASETS} />

        <hr className={inst.rule} />
        <section className={d.terms} aria-label="How the data is licensed">
          {[
            ["01", "Free to use, with credit", "Every file is free to use with a line crediting Run with Foxes. Quote it, chart it, put it in a deck. If a file has stricter terms, its own page says so."],
            ["02", "A file says when it was read", "Every row carries a date, and the file carries the day of the last read. We never quietly re-cut a file; a re-read is a new copy with a new date."],
            ["03", "Examples are marked", "A file tagged Example was generated for the mockup and never met a real market. It shows the shape of the thing. Real files say who read them and how."],
          ].map(([n, h, p]) => (
            <div key={n}>
              <span className={d.termN}>{n}</span>
              <h2 className={d.termT}>{h}</h2>
              <p className={d.termP}>{p}</p>
            </div>
          ))}
        </section>

        <Gate adds={adds} head="With a free account, on every dataset" />
      </main>
    </Shell>
  );
}
