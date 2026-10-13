import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import SiteFooter from "@/components/SiteFooter";
import EssayJoin from "@/app/essays/[slug]/EssayJoin";
import j from "@/app/essays/[slug]/essay-join.module.css";
import dp from "@/app/diary/diary-page.module.css";
import OverHero from "@/app/diary/OverHero";
import { formatNoteDate } from "@/lib/notes";
import { getAllPieces, getPieceContent, type Piece } from "@/lib/sections";
import type { Section } from "@/lib/sections-name";

/**
 * THE LIST PAGE FOR DEAN'S AND DRAY'S SECTIONS. The same page as /research-nuggets and /diary (every
 * piece in full, newest first, the date line is the permalink, the rail and the sign-up margin), and
 * it uses the diary's own stylesheet so the four pages cannot drift apart. The picture across the top
 * shows once the section's hero is set in src/lib/sections-name.ts.
 */

const FULL_COUNT = 15;

export default async function SectionListPage({ section }: { section: Section }) {
  const all = getAllPieces(section);
  const recent = await Promise.all(all.slice(0, FULL_COUNT).map((d) => getPieceContent(section, d.slug)));
  const full = recent.filter((d): d is Piece => d !== null);
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
        <a key={d.slug} href={onPage.has(d.slug) ? `#${d.slug}` : `${section.route}/${d.slug}`}>
          <span>{String(Number(d.date.slice(8, 10)))}</span>
          {d.rail || d.title}
        </a>
      ))}
    </div>
  ));
  const hero = section.hero;

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
        <div className={j.layout}>
        {all.length > 1 ? (
          <nav className={dp.rail} aria-label="Every piece">
            <div className={dp.railLab}>Every piece</div>
            {railList}
          </nav>
        ) : null}
        <div className="essay-inner">
          <div className="essay-index-head">
            <div className="essay-index-kick">{section.kick}</div>
            <h1 className="essay-heading">{section.name}</h1>
            <p className="essay-index-intro">{section.intro}</p>
          </div>

          {/* nothing published yet: say so, so the nav never lands on a bare page */}
          {all.length === 0 ? <p className="essay-index-intro">The first piece is on its way.</p> : null}

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
                  <Link href={`${section.route}/${d.slug}`} className="diary-permalink">
                    {formatNoteDate(d.date)}
                  </Link>{" "}
                  \ {section.byline}
                </div>
                <h2 className="essay-heading">{d.title}</h2>
                {d.dek ? <p className="essay-dek">{d.dek}</p> : null}
              </div>
              {d.hold ? <p className="note-hold">{d.hold}</p> : null}
              <div className="essay-prose" dangerouslySetInnerHTML={{ __html: d.content || "" }} />
            </article>
          ))}

          {older.length > 0 ? (
            <div className="essay-list diary-older">
              {older.map((d) => (
                <Link key={d.slug} href={`${section.route}/${d.slug}`} className="essay-list-item">
                  <div>
                    <div className="essay-list-title">{d.title}</div>
                    {d.dek ? <div className="essay-list-dek">{d.dek}</div> : null}
                    <div className="essay-list-date">{formatNoteDate(d.date)}</div>
                  </div>
                  {/* its own small picture, at the end so the titles stay in one line down the page (Paul, 13 Oct 2026: "a thumbnail image for all essays") */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {d.image ? <img className="essay-list-thumb essay-list-thumb-end" src={d.image} alt="" loading="lazy" /> : null}
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

      <SiteFooter current={section.route} />
    </div>
  );
}
