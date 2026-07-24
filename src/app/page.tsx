import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getAllEssays, formatEssayDateShort } from "@/lib/essays";

export const metadata: Metadata = {
  description:
    "Run with Foxes builds marketing agents for your business. They make the ads, write the outreach, and run the campaigns, around the clock.",
};

export default async function Home() {
  /* ⭐ THE /recent essays BLOCK READS LOCAL FILES, NOT SUBSTACK'S FEED.
     It used to fetch https://runwithfoxes.substack.com/feed at request time and link
     every item out to Substack, so the homepage both depended on Substack being up
     and handed its readers straight to it. The essays now live on this domain, so the
     block points at them. */
  const essays = getAllEssays()
    .slice(0, 4)
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      href: `/essays/${e.slug}`,
      date: formatEssayDateShort(e.date),
      image: e.image ?? null,
    }));

  return <HomePage essays={essays} />;
}
