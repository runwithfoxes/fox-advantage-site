import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import EssayJoin from "../essays/[slug]/EssayJoin";
import j from "../essays/[slug]/essay-join.module.css";
import dp from "../diary/diary-page.module.css";
import OverHero from "../diary/OverHero";
import NuggetBody from "./NuggetBody";
import {
  getAllNotes,
  getNoteContent,
  formatNoteDate,
  type Note,
} from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";

/**
 * THE LIST PAGE FOR SAM'S SHORT RESEARCH PIECES. The same page as /diary (every piece in full,
 * newest first, the date line is the permalink), because Paul asked for "a page like Lena's".
 * The working name and every label come from src/lib/notes-name.ts.
 *
 * Paul, 6 Oct 2026: "get Dray to create the top of the page like it did for lena", and "We'll need a
 * rail on its page too." So the rail, the jump list on a phone and the picture at the very top are the
 * diary's own (its stylesheet and its OverHero are used here, so the two pages cannot drift apart).
 * The picture shows once NOTES.hero is set in notes-name.ts.
 */

const FULL_COUNT = 15;

export const metadata: Metadata = {
  title: `${NOTES.name} \\ Run with Foxes`,
  description: NOTES.intro,
  alternates: { canonical: `https://runwithfoxes.com${NOTES.route}` },
};

export default async function NotesPage() {
  const all = getAllNotes();
  const recent = await Promise.all(
    all.slice(0, FULL_COUNT).map((d) => getNoteContent(d.slug))
  );
  const full = recent.filter((d): d is Note => d !== null);
  const older = all.slice(FULL_COUNT);

  // The rail: every piece, newest first, grouped by month. A piece printed in full on this page is a
  // jump down the page; an older one goes to its own page.
  const onPage = new Set(full.map((d) => d.slug));
  const months: { label: string; items: typeof all }[] = [];
  for (const d of all) {
    const label = new Date(d.date + "T12:00:00Z").toLocaleDateString("en-IE", { month: "long", year: "numeric", timeZone: "UTC" });
    const last = months[months.length - 1];
    if (last && last.label === label) last.items.push(d);
    else months.push({ label, items: [d] });
  }
  const railList = months.map((m) => (
    <div key={m.label}>
      <div className={dp.month}>{m.label}</div>
      {m.items.map((d) => (
        <a key={d.slug} href={onPage.has(d.slug) ? `#${d.slug}` : `${NOTES.route}/${d.slug}`}>
          <span>{String(Number(d.date.slice(8, 10)))}</span>
          {d.rail || d.title}
        </a>
      ))}
    </div>
  ));
  const hero = NOTES.hero;

  return (
    <div className={`essay-page ${hero ? dp.page : ""}`} {...(hero ? { "data-diary-root": true, "data-over": "1" } : {})}>
      {hero ? <OverHero /> : null}
      <NextNav bar />

      {hero ? (
        <section className={dp.hero} data-diary-hero>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt={hero.alt} />
        </section>
      ) : null}

      <main className={`essay-main ${hero ? dp.main : ""}`}>
        {/* the same sign-up margin as the diary */}
        <div className={j.layout}>
        {all.length > 1 ? (
          <nav className={dp.rail} aria-label="Every piece">
            <div className={dp.railLab}>Every piece</div>
            {railList}
          </nav>
        ) : null}
        <div className="essay-inner">
          <div className="essay-index-head">
            <div className="essay-index-kick">{NOTES.kick}</div>
            <h1 className="essay-heading">{NOTES.name}</h1>
            <p className="essay-index-intro">{NOTES.intro}</p>
          </div>

          {/* nothing published yet: say so, so the nav never lands on a bare page */}
          {all.length === 0 ? (
            <p className="essay-index-intro">The first piece is on its way.</p>
          ) : null}

          {all.length > 1 ? (
            <details className={dp.jump}>
              <summary>Jump to a piece</summary>
              <div>{railList}</div>
            </details>
          ) : null}

          {full.map((d) => (
            <article key={d.slug} id={d.slug} className="diary-entry">
              <div className="essay-header">
                <div className="essay-meta">
                  <Link href={`${NOTES.route}/${d.slug}`} className="diary-permalink">
                    {formatNoteDate(d.date)}
                  </Link>{" "}
                  \ {NOTES.byline}
                </div>
                <h2 className="essay-heading">{d.title}</h2>
                {d.dek ? <p className="essay-dek">{d.dek}</p> : null}
              </div>
              {d.hold ? <p className="note-hold">{d.hold}</p> : null}
              <NuggetBody note={d} />
            </article>
          ))}

          {older.length > 0 ? (
            <div className="essay-list diary-older">
              {older.map((d) => (
                <Link
                  key={d.slug}
                  href={`${NOTES.route}/${d.slug}`}
                  className="essay-list-item"
                >
                  <div>
                    <div className="essay-list-title">{d.title}</div>
                    {d.dek ? <div className="essay-list-dek">{d.dek}</div> : null}
                    <div className="essay-list-date">{formatNoteDate(d.date)}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <aside className={j.side}>
          <EssayJoin />
        </aside>
        </div>
      </main>

      <SiteFooter current={NOTES.route} />
    </div>
  );
}
