import type { Metadata } from "next";
import AiWriterGuide from "./AiWriterGuide";

export const metadata: Metadata = {
  title: "Building an AI writer \\ Students \\ Run with Foxes",
  description:
    "Step-by-step guide to setting up an AI writer. Positioning first, then messaging, voice, and content-type frameworks.",
};

export default function AiWriterPage() {
  return <AiWriterGuide />;
}
