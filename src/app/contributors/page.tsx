import type { Metadata } from "next";
import NextNav from "@/app/home-next/NextNav";
import SiteFooter from "@/components/SiteFooter";
import Contributors from "@/components/Contributors";
import { hasAccess } from "@/lib/access";
import a from "@/app/about/about.module.css";

/**
 * /contributors - THE HUB. Paul, 12 Oct 2026: "link that essays to a page that has all our contributors...
 * it's like a hub of essays, and they can click into their own one." The list is the same component the
 * About page uses, so the two cannot drift.
 */
export const metadata: Metadata = {
  title: "Contributors \\ Run with Foxes",
  description:
    "Who writes at Run with Foxes: Paul, Lena, Sam, Dean and Dray. Each has their own page, and their newest piece is linked here.",
  alternates: { canonical: "https://runwithfoxes.com/contributors" },
};

export default async function ContributorsPage() {
  const known = await hasAccess();
  return (
    <div className="essay-page">
      <NextNav bar known={known} />
      <main className="essay-main">
        <div className="essay-inner">
          <div className="essay-index-head">
            <div className="essay-index-kick">\contributors</div>
            <h1 className="essay-heading">Contributors</h1>
          </div>
          <div className={a.team}>
            <Contributors label={false} />
          </div>
        </div>
      </main>
      <SiteFooter current="/contributors" />
    </div>
  );
}
