/**
 * /resources IS the homepage. Paul, 26 Sep 2026: "the homepage does become the main research
 * page, resources page... this is the place." So the nav's /resources link lands on the same
 * page as the front door, built once in home-next/page.tsx, never a second copy. The older
 * grey hub (CentreBands.tsx) is kept in the tree for its parts and is not rendered anywhere.
 */
import type { Metadata } from "next";
import { metadata as home } from "../home-next/page";

export { default } from "../home-next/page";

/* The same page at a second address needs to name the first as the original, or a search engine
   sees two homepages (Cato's link check, 30 Sep and 1 Oct 2026). */
export const metadata: Metadata = { ...home, alternates: { canonical: "/" } };
