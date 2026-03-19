import ExpertsPage from "./ExpertsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Critique \\ Run with Foxes",
  description:
    "Submit your marketing or strategy plan and get it critiqued by eight expert personas. Built for workshops and teaching.",
};

export default function Page() {
  return <ExpertsPage />;
}
