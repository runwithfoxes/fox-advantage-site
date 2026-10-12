import Link from "next/link";
import type { Metadata } from "next";
import NextNav from "@/app/home-next/NextNav";
import SiteFooter from "@/components/SiteFooter";
import { hasAccess } from "@/lib/access";
import { getAllEssays, getEssayContent } from "@/lib/essays";
import { getAllDispatches, getDispatchContent } from "@/lib/diary";
import { getAllNotes, getNoteContent } from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";
import { getAllPieces, getPieceContent } from "@/lib/sections";
import { CAUGHT, DRAY } from "@/lib/sections-name";
import { formatDay } from "../resources/library";
import { WRITERS } from "@/lib/contributors-data";
import NuggetBody from "../research-nuggets/NuggetBody";
import ReadList, { type Card, type Sec } from "./ReadList";
import r from "./read.module.css";

/**
 * /read - THE FRONT OF THE MAGAZINE, in the shape of a Substack home page. Paul, 12 Oct 2026: "if I click,
 * i'm brought down the page to read some stuff, and then have to click again. It is confusing... My best
 * example to learn from is the substack structure." So: the newest piece from anyone, printed whole at the
 * top, nothing to click. Under it one small row of the five sections that FILTERS the cards where they sit
 * (it never jumps down the page), and every card opens its piece in one click.
 *
 * Nothing is typed in by hand; it reads the content folders. A piece's card shows its own picture (an
 * essay's first picture, or `image:` in the frontmatter of any other piece) and takes its section's
 * picture when it has none. Two pieces on one day: the section listed first below wins the top.
 */
export const metadata: Metadata = {
  title: "Read \\ Run with Foxes",
  description:
    "The newest from Paul, Lena, Sam, Dean and Dray: essays, the diary of an agent team, research nuggets, Caught our eye and How we made it.",
  alternates: { canonical: "https://runwithfoxes.com/read" },
};

type Item = { slug: string; title: string; dek: string; date: string; href: string; img: string | null };
type Series = { key: string; name: string; who: string; route: string; line: string; hero: string | null; items: Item[] };

/* the first sentence of a series' own intro, so the line is the site's wording and not a new one */
const first = (t: string) => t.split(/(?<=\.)\s/)[0];
const byNewest = <T extends { date: string; order?: number }>(a: T[]) =>
  [...a].sort((p, q) => q.date.localeCompare(p.date) || (q.order ?? 0) - (p.order ?? 0));

export default async function ReadPage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const known = await hasAccess();
  const { s: asked } = await searchParams;
  const series: Series[] = [
    {
      key: "essays", name: "Essays", who: "Paul", route: "/essays", hero: null,
      line: "Marketing and AI, written up as I go.",
      items: byNewest(getAllEssays()).map((e) => ({ slug: e.slug, title: e.title, dek: e.dek, date: e.date, href: `/essays/${e.slug}`, img: e.image ?? null })),
    },
    {
      key: "diary", name: "Diary of an agent team", who: "Lena", route: "/diary", hero: "/diary/hero.jpg",
      line: "This is the diary of the AI team at Run with Foxes, written by Lena, one of the agents.",
      items: byNewest(getAllDispatches()).map((d) => ({ slug: d.slug, title: d.title, dek: d.dek, date: d.date, href: `/diary/${d.slug}`, img: d.image })),
    },
    {
      key: "notes", name: NOTES.name, who: "Sam", route: NOTES.route, hero: NOTES.hero?.src ?? null,
      line: first(NOTES.intro),
      items: byNewest(getAllNotes()).map((n) => ({ slug: n.slug, title: n.title, dek: n.dek, date: n.date, href: `${NOTES.route}/${n.slug}`, img: n.image })),
    },
    ...[CAUGHT, DRAY].map((s) => ({
      key: s.key, name: s.name, who: s.who, route: s.route, hero: s.hero?.src ?? null,
      line: first(s.intro),
      items: byNewest(getAllPieces(s)).map((p) => ({ slug: p.slug, title: p.title, dek: p.dek, date: p.date, href: `${s.route}/${p.slug}`, img: p.image })),
    })),
  ].filter((s) => s.items.length > 0);

  /* the newest piece from anyone; on a tie the sort is stable, so the section listed first wins */
  const newest = series
    .map((s) => ({ s, i: s.items[0] }))
    .sort((a, b) => b.i.date.localeCompare(a.i.date))[0];

  /* The whole piece, through its own section's reader, so a nugget keeps its chart and an essay its pictures. */
  let body: React.ReactNode = null;
  if (newest) {
    const { s, i } = newest;
    if (s.key === "notes") {
      const n = await getNoteContent(i.slug);
      body = n ? <NuggetBody note={n} /> : null;
    } else {
      const html =
        s.key === "essays" ? (await getEssayContent(i.slug))?.content
        : s.key === "diary" ? (await getDispatchContent(i.slug))?.content
        : (await getPieceContent(s.key === "caught" ? CAUGHT : DRAY, i.slug))?.content;
      body = html ? <div className="essay-prose" dangerouslySetInnerHTML={{ __html: html }} /> : null;
    }
  }

  const secs: Sec[] = series.map((s) => {
    const w = Object.values(WRITERS).find((x) => x.key === s.key);
    return { key: s.key, name: s.name, who: w?.name ?? s.who, role: w?.role ?? "", line: s.line, route: s.route };
  });
  const cards: Card[] = series
    .flatMap((s) => s.items.map((i) => ({ key: s.key, title: i.title, dek: i.dek, date: i.date, day: formatDay(i.date), href: i.href, img: i.img ?? s.hero })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((c) => ({ key: c.key, title: c.title, dek: c.dek, day: c.day, href: c.href, img: c.img }));

  return (
    <div className="essay-page">
      <NextNav bar known={known} />
      <main className={r.main}>
        <div className={r.inner}>
          <h1 className={r.h1}>Read</h1>

          {newest ? (
            <article className={r.top}>
              <header className={r.topHead}>
                <div className={r.kick}>\read \ the newest</div>
                <div className="essay-meta">
                  {newest.s.name} \ {secs.find((x) => x.key === newest.s.key)?.who} \ {formatDay(newest.i.date)}
                </div>
                <h2 className="essay-heading">
                  <Link href={newest.i.href} className={r.topTitle}>{newest.i.title}</Link>
                </h2>
                {newest.i.dek ? <p className="essay-dek">{newest.i.dek}</p> : null}
              </header>
              {/* an essay carries its picture inside its own words; any other piece takes its own or its section's here */}
              {newest.s.key !== "essays" && (newest.i.img ?? newest.s.hero) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className={r.topImg} src={(newest.i.img ?? newest.s.hero)!} alt="" />
              ) : null}
              {body}
              <div className={r.topFoot}>
                <Link href={newest.i.href}>This piece on its own page, to share →</Link>
              </div>
            </article>
          ) : null}

          <ReadList secs={secs} cards={cards} topHref={newest?.i.href ?? ""} start={secs.some((x) => x.key === asked) ? asked! : "all"} />
        </div>
      </main>
      <SiteFooter current="/read" />
    </div>
  );
}
