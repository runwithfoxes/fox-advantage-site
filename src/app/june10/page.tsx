import June10Page from "@/components/June10";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing research briefs for Claude \\ Run with Foxes",
  description:
    "Three prompts, one example. The bad prompt, the good prompt, and the follow-up that turns a research report into a visual document without inventing data. From the Alltech workshop.",
};

export default function Page() {
  return <June10Page />;
}
