import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import ResearchClient from "./ResearchClient";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/* Not a page to promote. It is a client-rendered interview form: it serves zero
   words to a crawler and there is nothing here for anyone to find in search.
   It was in sitemap.ts, which advertised an empty URL and diluted the pages we
   do want indexed, so it has come out of the sitemap and is noindexed. Nothing
   about reachability changes: anyone sent the link still gets the form. */
export const metadata: Metadata = {
  title: "AI Research Study \\ Run with Foxes",
  description:
    "A short research interview about how marketers are approaching AI in research.",
  robots: { index: false, follow: false },
};

export default function ResearchPage() {
  return (
    <Suspense fallback={<div />}>
      <ResearchClient />
    </Suspense>
  );
}
