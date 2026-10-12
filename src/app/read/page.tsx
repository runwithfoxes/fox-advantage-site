import Link from "next/link";
import type { Metadata } from "next";
import NextNav from "@/app/home-next/NextNav";
import SiteFooter from "@/components/SiteFooter";
import { hasAccess } from "@/lib/access";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { getAllNotes } from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";
import { getAllPieces } from "@/lib/sections";
import { CAUGHT, DRAY } from "@/lib/sections-name";
import { formatDay } from "../resources/library";
import { getOpening } from "@/lib/opening";
import { WRITERS } from "@/lib/contributors-data";
import ReadRail from "./ReadRail";
import r from "./read.module.css";

/**
 * /read - THE FRONT OF THE MAGAZINE. Paul, 12 Oct 2026: "The page somebody lands on must get them excited
 * or interested. I'd like it to feel like a hub of article groups with lead articles and other ones, with
 * links to each contributor." The newest piece across the five series on top, then one group per series:
 * a lead, the next few, and the way into the whole series. Nothing is typed in by hand; it reads the
 * content folders, so it stays current by itself. A piece with no picture of its own takes its series'
 * picture; if neither has one it shows without.
 */
export const metadata: Metadata = {
  title: "Read \\ Run with Foxes",
  description:
    "The newest from Paul, Lena, Sam, Dean and Dray: essays, the diary of an agent team, research nuggets, Caught our eye and How we made it.",
  alternates: { canonical: "https://runwithfoxes.com/read" },
};

type Item = { title: string; dek: string; date: string; href: string; img: string | null };
type Series = { key: string; dir: string; name: string; who: string; route: string; line: string; hero: string | null; items: Item[] };

/* the first sentence of a series' own intro, so the line is the site's wording and not a new one */
const first = (t: string) => t.split(/(?<=\.)\s/)[0];
const byNewest = <T extends { date: string; order?: number }>(a: T[]) =>
  [...a].sort((p, q) => q.date.localeCompare(p.date) || (q.order ?? 0) - (p.order ?? 0));

export default async function ReadPage() {
  const known = await hasAccess();
  const series: Series[] = [
    {
      key: "essays", dir: "essays", name: "Essays", who: "Paul", route: "/essays", hero: null,
      line: "Marketing and AI, written up as I go.",
      items: byNewest(getAllEssays()).map((e) => ({ title: e.title, dek: e.dek, date: e.date, href: `/essays/${e.slug}`, img: e.image ?? null })),
    },
    {
      key: "diary", dir: "diary", name: "Diary of an agent team", who: "Lena", route: "/diary", hero: "/diary/hero.jpg",
      line: "This is the diary of the AI team at Run with Foxes, written by Lena, one of the agents.",
      items: byNewest(getAllDispatches()).map((d) => ({ title: d.title, dek: d.dek, date: d.date, href: `/diary/${d.slug}`, img: null })),
    },
    {
      key: "notes", dir: "research-nuggets", name: NOTES.name, who: "Sam", route: NOTES.route, hero: NOTES.hero?.src ?? null,
      line: first(NOTES.intro),
      items: byNewest(getAllNotes()).map((n) => ({ title: n.title, dek: n.dek, date: n.date, href: `${NOTES.route}/${n.slug}`, img: null })),
    },
    ...[CAUGHT, DRAY].map((s) => ({
      key: s.key, dir: s.dir, name: s.name, who: s.who, route: s.route, hero: s.hero?.src ?? null,
      line: first(s.intro),
      items: byNewest(getAllPieces(s)).map((p) => ({ title: p.title, dek: p.dek, date: p.date, href: `${s.route}/${p.slug}`, img: null })),
    })),
  ].filter((s) => s.items.length > 0);

  const pic = (s: Series, i: Item) => i.img ?? s.hero;
  const newest = series
    .map((s) => ({ s, i: s.items[0] }))
    .sort((a, b) => b.i.date.localeCompare(a.i.date))[0];

  /* The real opening of each lead piece, read from its content file. The top piece may take three paragraphs. */
  const slugOf = (i: Item) => i.href.split("/").pop() ?? "";
  const leadOf = (s: Series) => s.items.filter((i) => i.href !== newest?.i.href)[0];
  const opening = new Map<string, string>();
  if (newest) opening.set(newest.i.href, await getOpening(newest.s.dir, slugOf(newest.i), 3));
  for (const s of series) {
    const l = leadOf(s);
    if (l) opening.set(l.href, await getOpening(s.dir, slugOf(l), 3));
  }
  const Opening = ({ i }: { i: Item }) => {
    const h = opening.get(i.href);
    return h ? (
      <>
        <div className={`essay-prose ${r.opening}`} dangerouslySetInnerHTML={{ __html: h }} />
        <div className={r.gFoot}><Link href={i.href}>Keep reading →</Link></div>
      </>
    ) : null;
  };

  return (
    <div className="essay-page">
      <NextNav bar known={known} />
      <main className={r.main}>
        <div className={r.inner}>
          <header className={r.head}>
            <div className={r.kick}>\read</div>
            <h1 className={r.h1}>Read</h1>
          </header>

          {/* Who writes here and what each covers, like the section bar on a magazine's front. Names and
              role tags come from the one shared list the About page also reads. */}
          <nav className={r.band} aria-label="Who writes here">
            {series.map((s) => {
              const w = Object.values(WRITERS).find((x) => x.key === s.key);
              return (
                <a key={s.key} href={`#s-${s.key}`} className={r.bandItem}>
                  <span className={r.bandName}>{s.name}</span>
                  <span className={r.bandWho}>{w?.name ?? s.who}</span>
                  {w ? <span className={r.bandRole}>{w.role}</span> : null}
                  <span className={r.bandLine}>{s.line}</span>
                </a>
              );
            })}
          </nav>

          <div className={r.layout}>
            <ReadRail items={[{ id: "newest", label: "Newest" }, ...series.map((s) => ({ id: `s-${s.key}`, label: s.name }))]} />
            <div className={r.col}>
          {newest ? (
            <div className={r.top} id="newest">
              {pic(newest.s, newest.i) ? (
                <Link href={newest.i.href} tabIndex={-1} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={r.topImg} src={pic(newest.s, newest.i)!} alt="" />
                </Link>
              ) : null}
              <div className={r.topText}>
                <span className={r.meta}>{newest.s.name} · {newest.s.who} · {formatDay(newest.i.date)}</span>
                <Link href={newest.i.href} className={r.topTitle}>{newest.i.title}</Link>
                {newest.i.dek ? <span className={r.dek}>{newest.i.dek}</span> : null}
                <Opening i={newest.i} />
              </div>
            </div>
          ) : null}

          {series.map((s) => {
            /* the piece shown big at the top is not shown again as its group's lead */
            const items = s.items.filter((i) => i.href !== newest?.i.href);
            if (!items.length) return null;
            const [lead, ...rest] = items;
            const more = rest.slice(0, 4);
            const img = pic(s, lead);
            const head = (
              <div className={r.gHead}>
                <h2 id={`g-${s.key}`} className={r.gName}>{s.name} <span>by {s.who}</span></h2>
                <p className={r.gLine}>{s.line}</p>
              </div>
            );
            const foot = (
              <div className={r.gFoot}>
                <Link href={s.route}>All of {s.name} →</Link>
                <Link href="/about#contributors">{s.who} on the contributors list →</Link>
              </div>
            );
            /* A group with one piece fills the row: picture one side, words and links the other. When a
               second piece is published it goes back to the normal layout by itself. */
            if (!more.length) {
              return (
                <section key={s.key} id={`s-${s.key}`} className={r.group} aria-labelledby={`g-${s.key}`}>
                  <div className={`${r.gBody} ${img ? "" : r.soloNoImg}`}>
                    {img ? (
                      <Link href={lead.href} tabIndex={-1} aria-hidden>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={r.leadImg} style={{ marginBottom: 0 }} src={img} alt="" />
                      </Link>
                    ) : null}
                    <div className={r.soloText}>
                      {head}
                      <div className={r.lead}>
                        <Link href={lead.href} className={r.leadTitle}>{lead.title}</Link>
                        {lead.dek ? <span className={r.dek}>{lead.dek}</span> : null}
                        <span className={r.date}>{formatDay(lead.date)}</span>
                        <Opening i={lead} />
                      </div>
                      {foot}
                    </div>
                  </div>
                </section>
              );
            }
            return (
              <section key={s.key} id={`s-${s.key}`} className={r.group} aria-labelledby={`g-${s.key}`}>
                {head}
                <div className={r.gBody}>
                  <div className={r.lead}>
                    {img ? (
                      <Link href={lead.href} tabIndex={-1} aria-hidden>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={r.leadImg} src={img} alt="" />
                      </Link>
                    ) : null}
                    <Link href={lead.href} className={r.leadTitle}>{lead.title}</Link>
                    {lead.dek ? <span className={r.dek}>{lead.dek}</span> : null}
                    <span className={r.date}>{formatDay(lead.date)}</span>
                    <Opening i={lead} />
                  </div>
                  <ul className={r.more}>
                    {more.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href}>{i.title}</Link>
                        <span className={r.date}>{formatDay(i.date)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {foot}
              </section>
            );
          })}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter current="/read" />
    </div>
  );
}
