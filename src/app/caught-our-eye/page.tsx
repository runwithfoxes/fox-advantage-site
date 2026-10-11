import type { Metadata } from "next";
import SectionListPage from "@/components/SectionListPage";
import { CAUGHT } from "@/lib/sections-name";

export const metadata: Metadata = {
  title: `${CAUGHT.name} \\ Run with Foxes`,
  description: CAUGHT.intro,
  alternates: { canonical: `https://runwithfoxes.com${CAUGHT.route}` },
};

export default function Page() {
  return <SectionListPage section={CAUGHT} />;
}
