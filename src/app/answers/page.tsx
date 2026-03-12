import type { Metadata } from "next";
import AnswersPage from "@/components/Answers";

export const metadata: Metadata = {
  title: "Answers \\ Run with Foxes",
  description:
    "74 answers to the questions marketers are actually asking about AI, brand building, creativity, and strategy. By Paul Dervan, author of The Fox Advantage.",
};

export default function Answers() {
  return <AnswersPage />;
}
