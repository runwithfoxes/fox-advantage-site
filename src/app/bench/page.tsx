import type { Metadata } from "next";
import BenchPage from "@/components/BenchPage";

export const metadata: Metadata = {
  title: "The Bench",
  robots: { index: false, follow: false },
};

export default function Bench() {
  return <BenchPage />;
}
