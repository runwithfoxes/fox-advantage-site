import BrandGuide from "@/components/BrandGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Guide \\ Run with Foxes",
  description:
    "Comprehensive brand reference for runwithfoxes.com. Colours, typography, components, writing style, and visual rules.",
};

export default function Page() {
  return <BrandGuide />;
}
