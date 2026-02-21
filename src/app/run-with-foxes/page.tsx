import RunWithFoxesPage from "@/components/RunWithFoxes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Run with Foxes — Paul Dervan",
  description:
    "Make better marketing decisions. A collection of real-life stories revealing the messy reality of decision-making in marketing.",
};

export default function Page() {
  return <RunWithFoxesPage />;
}
