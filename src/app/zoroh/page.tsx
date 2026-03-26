import ZorohPage from "@/components/Zoroh";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoroh Growth Partners — AI-enabled revenue architecture for scaleups",
  description:
    "Zoroh works with founder-led businesses at the growth inflection point. Market alignment, revenue architecture, and talent strategy for B2B scaleups between €5M and €15M ARR.",
};

export default function Page() {
  return <ZorohPage />;
}
