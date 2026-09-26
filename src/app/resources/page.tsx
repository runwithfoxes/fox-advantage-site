import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import HubHero from "./HubHero";
import CentreBands from "./CentreBands";
import { getLibrary, formatDay } from "./library";
import { PUBLISHED, TRACKERS, COUNTS, seriesOf, reportHref, trackerHref } from "./catalogue";
import s from "./hub.module.css";

export const metadata: Metadata = {
  title: "Ireland and AI | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * /resources. The same bands as the homepage (CentreBands.tsx, which carries the craft lines),
 * under the hub's own head. The homepage is the front door (Paul, 25 Sep: "the Resource hub
 * becomes the homepage"); this page is the nav's /resources link, so it stays a whole page.
 */
export default function ResourceHubPage() {
  const library = getLibrary().filter((e) => !e.soon);
  /* ── The hero's research card: the newest of everything, one flow ── */
  const heroLines = [
    ...PUBLISHED.map((r) => ({ label: `${seriesOf(r).name} · ${r.edition}${r.example ? " · example" : ""}`, title: r.title, href: reportHref(r) })),
    ...TRACKERS.filter((t) => t.status !== "planned").map((t) => ({ label: `Tracker · ${t.reading}${t.example ? " · example" : ""}`, title: `${t.name}: ${t.readingLabel}`, href: trackerHref(t) })),
    ...library.filter((e) => e.type === "Essay" || e.type === "Answer").map((e) => ({ label: `${e.type} · ${formatDay(e.date)}`, title: e.title, href: e.href })),
  ];

  return (
    <div className={s.page}>
      <HubHero lines={heroLines} counts={COUNTS} />
      <main>
        <CentreBands />
      </main>

      <SiteFooter current="/resources" wide />
      <div className={s.banner}>
        Mockup, 26 Sep 2026. Anything tagged Example is made up for this mockup. The AI Ask and GEO Ireland are drafts, not signed off. No form sends anything.
      </div>
    </div>
  );
}
