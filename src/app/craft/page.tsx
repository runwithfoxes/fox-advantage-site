import type { Metadata } from "next";
import SectionListPage from "@/components/SectionListPage";
import { DRAY } from "@/lib/sections-name";

export const metadata: Metadata = {
  title: `${DRAY.name} \\ Run with Foxes`,
  description: DRAY.intro,
  alternates: { canonical: `https://runwithfoxes.com${DRAY.route}` },
};

export default function Page() {
  return <SectionListPage section={DRAY} />;
}
