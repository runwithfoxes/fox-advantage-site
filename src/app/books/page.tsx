import type { Metadata } from "next";
import BooksContent from "./BooksContent";

export const metadata: Metadata = {
  title: "Books \\ Run with Foxes",
  description:
    "Recommended reading for marketers. Evidence-based marketing books from Sharp, Romaniuk, Binet & Field, Feldwick, and Morgan.",
};

export default function BooksPage() {
  return <BooksContent />;
}
