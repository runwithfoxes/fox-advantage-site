import MarketerOfYearPage from "@/components/MarketerOfYear";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketer of the Year — Marketing Effectiveness in Action \\ Run with Foxes",
  description:
    "How evidence-based marketing decisions took the National Lottery to €1B revenue for the first time. Ireland's Marketer of the Year 2022.",
};

export default function Page() {
  return <MarketerOfYearPage />;
}
