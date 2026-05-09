import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import ResearchClient from "./ResearchClient";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "AI Research Study \\ Run with Foxes",
  description:
    "A short research interview about how marketers are approaching AI in research.",
};

export default function ResearchPage() {
  return (
    <Suspense fallback={<div />}>
      <ResearchClient />
    </Suspense>
  );
}
