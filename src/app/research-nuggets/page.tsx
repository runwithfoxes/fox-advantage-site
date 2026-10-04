import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import EssayJoin from "../essays/[slug]/EssayJoin";
import j from "../essays/[slug]/essay-join.module.css";
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

  return (
    <div className="essay-page">
      <NextNav bar />

      <main className="essay-main">
        {/* the same sign-up margin as the diary */}
        <div className={j.layout}>
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
              <div
                className="essay-prose"
                dangerouslySetInnerHTML={{ __html: d.content || "" }}
              />
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
