import { getChaptersByPart, CHAPTER_COUNT } from "@/lib/chapters";
import BookLanding from "@/components/BookLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Fox Advantage - How to thrive in marketing because of AI",
  description:
    `${CHAPTER_COUNT} short chapters on how marketing teams can thrive in an AI era. No jargon. No fluff. By Paul Dervan.`,
};

export default function BookPage() {
  const parts = getChaptersByPart();
  return <BookLanding parts={parts} />;
}
