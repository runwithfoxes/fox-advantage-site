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
import { WRITERS } from "@/lib/contributors-data";
import ReadList, { type Card } from "./ReadList";
import SHAPES from "@/lib/picture-shapes.json";
import h from "../resources/hero.module.css";
import f from "../resources/front.module.css";
import r from "./read.module.css";

/**
 * /read - THE FRONT OF THE MAGAZINE, in the shape of a Substack home page. Paul, 12 Oct 2026: "if I click,
 * i'm brought down the page to read some stuff, and then have to click again. It is confusing... My best
 * example to learn from is the substack structure." And on the first two tries: "They don't even look like
 * the same website", "where's the art direction?", "I need for people to know when they arrive here that
 * there's contributors and there's different things they write about", "You haven't even got images taken
 * over the full page."
 *
 * So it is built from the homepage's own parts. The newest piece's picture fills the page edge to edge
 * with the menu on it and its title on the dark veil (no words go into a picture). Along the foot of the
 * picture, on the first screen, is who writes here: five sections, each with its writer. A click on one
 * filters the list under it. The list is a few pictures at their own shape, then type on hairlines, and
 * every piece opens in one click.
 *
 * Nothing is typed in by hand; it reads the content folders. A piece's own picture is an essay's first
 * picture, or `image:` in the frontmatter of any other piece. Two pieces on one day: the section listed
 * first below wins the top.
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

  const who = (s: Series) => Object.values(WRITERS).find((x) => x.key === s.key);
  const on = series.find((s) => s.key === asked) ?? null;

  /* A picture is only shown where it can sit at its own shape: wide, about 16 by 9. A square or a tall
     one would be cut by the frame, and a section's picture has handwritten words a crop slices through.
     The shapes are measured before the build by scripts/picture-shapes.mjs, never here. */
  const wide = (src: string | null) => {
    const k = src ? (SHAPES as Record<string, number>)[src] : undefined;
    return k !== undefined && k >= 1.6 && k <= 2.4;
  };

  const all = series
    .flatMap((s) => s.items.map((i) => ({ s, i })))
    .sort((a, b) => b.i.date.localeCompare(a.i.date));
  /* the piece in the hero is left out of Latest, and kept in its own section's list */
  const shown = on ? all.filter((x) => x.s.key === on.key) : all.filter((x) => x.i.href !== newest?.i.href);
  const cards: Card[] = shown.map(({ s, i }) => ({
    label: `${s.name} · ${who(s)?.name ?? s.who}`,
    title: i.title, dek: i.dek, day: formatDay(i.date), href: i.href,
    img: wide(i.img) ? i.img : null,
  }));
  const heroImg = newest ? (wide(newest.i.img) ? newest.i.img : newest.s.hero) : null;

  return (
    <div className={f.page}>
      <section className={`${h.hero} ${r.hero}`}>
        {heroImg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={h.film} src={heroImg} alt="" />
        ) : null}
        <NextNav known={known} />
        {newest ? (
          <div className={r.heroBody}>
            <div className={r.heroText}>
              <p className={r.heroMeta}>The latest · {newest.s.name} · {who(newest.s)?.name ?? newest.s.who} · {formatDay(newest.i.date)}</p>
              <h2 className={`${h.title} ${r.heroTitle}`}><Link href={newest.i.href}>{newest.i.title}</Link></h2>
              {newest.i.dek ? <p className={h.sub}>{newest.i.dek}</p> : null}
              <Link href={newest.i.href} className={r.heroGo}>Read the latest →</Link>
            </div>
          </div>
        ) : null}

        {/* Who writes here and what each covers, on the first screen. Names and role tags come from the one
            shared list the About page also reads. A click filters the list under it. */}
        <nav className={r.who} id="who" aria-label="Who writes here">
          <div className={r.whoInner}>
            <Link href="/read#who" className={`${r.whoItem} ${on ? "" : r.whoOn}`} aria-current={on ? undefined : "true"}>
              <span className={r.whoName}>Latest</span>
              <span className={r.whoBy}>{all.length} pieces</span>
            </Link>
            {series.map((s) => (
              <Link key={s.key} href={`/read?s=${s.key}#who`} className={`${r.whoItem} ${on?.key === s.key ? r.whoOn : ""}`} aria-current={on?.key === s.key ? "true" : undefined}>
                <span className={r.whoName}>{s.name}</span>
                <span className={r.whoBy}>{who(s)?.name ?? s.who} · {s.items.length}</span>
                {who(s) ? <span className={r.whoRole}>{who(s)!.role}</span> : null}
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <main className={r.wrap}>
        <h1 className={r.h1}>Read</h1>
        {on ? (
          <p className={r.about}>
            {on.line} <Link href={on.route}>The {on.name} page →</Link>
          </p>
        ) : null}
        <ReadList key={on?.key ?? "all"} cards={cards} total={on ? on.items.length : all.length} />
      </main>
      <SiteFooter current="/read" />
    </div>
  );
}
