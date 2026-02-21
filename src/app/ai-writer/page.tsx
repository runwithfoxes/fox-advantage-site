import AiWriterPage from "@/components/AiWriter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Writer — Brand-Trained Writing System \\ Run with Foxes",
  description:
    "AI writing system that checks brand DNA, voice, and positioning before writing a word. Six specialized frameworks for case studies, ads, email, and thought leadership.",
};

export default function Page() {
  return <AiWriterPage />;
}
