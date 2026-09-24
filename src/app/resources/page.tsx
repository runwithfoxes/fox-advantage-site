import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Library from "./Library";
import { AREAS, getLibrary, formatDay } from "./library";
import { CATEGORIES, OWNER_LABEL, type Owner } from "./data";
import s from "./front.module.css";

export const metadata: Metadata = {
  title: "Resources | Run with Foxes",
  robots: { index: false, follow: false },
};

const ORDER: Owner[] = ["state", "middle", "other"];

/**
 * /resources. Structure after Anthropic's research index (Paul, 24 Sep 2026: "it feels
 * comprehensive and has lots of things in it, and just from a format, it is less linear").
 * Four ways in, all near the top: the areas, the featured study, the latest three, and
 * everything in one searchable table. The look is ours: the logo, the three faces, the fox,
 * the dot-grid figure frame, hairlines, no radius.
 */
export default function ResourcesPage() {
  const library = getLibrary().filter((e) => !e.soon);
  const entries = library.map((e) => ({ ...e, day: formatDay(e.date) }));
  const areas = AREAS.map((a) => ({ ...a, count: library.filter((e) => e.area === a.key).length }));
  const latest = library.filter((e) => e.type !== "Study" && e.type !== "Category").slice(0, 3);

  /* The featured figure: one column per category, grouped by who owns the answer, height = rate. */
  const cols = ORDER.flatMap((o) => CATEGORIES.filter((c) => c.owner === o).sort((a, b) => b.rate - a.rate));

  return (
    <div className={s.page}>
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav className={s.navlinks}>
          <Link href="/course">/course</Link>
          <Link href="/essays">/essays</Link>
          <Link href="/contact" className={s.navcta}>
            /contact
          </Link>
        </nav>
      </header>

      <main className={s.wrap}>
        <section className={s.hero}>
          <div className={s.heroLeft}>
            <h1 className={s.h1}>Resources</h1>
            <img className={s.fox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
          </div>
          <div className={s.heroRight}>
            <p className={s.standfirst}>
              What we find out running our own agents, measuring AI search in Ireland and
              reading what employers ask for. Free to read, with the method and the limits
              beside every number.
            </p>
            <p className={s.arealinks}>
              <span>Areas:</span>
              {AREAS.map((a) => (
                <a key={a.key} href="#everything">
                  {a.name}
                </a>
              ))}
            </p>
          </div>
        </section>

        <Library
          areas={areas}
          entries={entries}
          middle={
            <section className={s.featured}>
              <Link href="/resources/geo-ireland" className={s.feature}>
                <div className={s.frame}>
                  <div className={s.cols} role="img" aria-label="Who AI names most in each of 41 Irish categories">
                    {cols.map((c) => (
                      <i key={c.name} className={s[c.owner]} style={{ height: `${c.rate * 100}%` }} title={`${c.name}: ${c.top} ${c.rate.toFixed(2)}`} />
                    ))}
                  </div>
                  <div className={s.key}>
                    {ORDER.map((o) => (
                      <span key={o} className={s[o]}>
                        {OWNER_LABEL[o]}, {CATEGORIES.filter((c) => c.owner === o).length}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={s.featureText}>
                  <div>
                    <span className={s.meta}>Study &middot; AI search &middot; 23 Aug 2026</span>
                    <h2 className={s.featureTitle}>Who AI names when you ask an Irish question</h2>
                  </div>
                  <p className={s.featureDek}>
                    We asked five AI engines the questions people in Ireland ask, across 41
                    categories. In 17 the name that comes back first is a state body. In most of
                    the rest it is a booking site or a marketplace. Repeated every quarter.
                  </p>
                </div>
              </Link>
              <div className={s.latest}>
                {latest.map((e) => (
                  <Link key={e.href} href={e.href} className={s.latestItem}>
                    <span className={s.meta}>
                      {e.type} &middot; {formatDay(e.date)}
                    </span>
                    <span className={s.latestTitle}>{e.title}</span>
                    {e.dek ? <span className={s.latestDek}>{e.dek}</span> : null}
                  </Link>
                ))}
              </div>
            </section>
          }
        />
      </main>

      <SiteFooter current="/resources" wide />
      <div className={s.banner}>
        Mockup, 24 Sep 2026. GEO Ireland numbers are day one (23 Aug) and not signed off. Jobs numbers are the 23 Sep test.
      </div>
    </div>
  );
}
