import MillionaireRafflePage from "@/components/MillionaireRaffle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Millionaire Raffle — Mental Availability in Action \\ Run with Foxes",
  description:
    "How a small change to mental availability led to 27:1 ROI and sold so many tickets, we had to pull the campaign.",
};

export default function Page() {
  return <MillionaireRafflePage />;
}
