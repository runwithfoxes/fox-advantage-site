import { getChapterContent, getAdjacentChapters, getAllChapters } from "@/lib/chapters";
import ChapterReader from "@/components/ChapterReader";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = await getChapterContent(slug);
  if (!chapter) return { title: "Chapter not found" };
  return {
    title: `${String(chapter.number).padStart(2, "0")}. ${chapter.title} \\ The Fox Advantage`,
    description: `Chapter ${chapter.number} of The Fox Advantage by Paul Dervan`,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = await getChapterContent(slug);
  if (!chapter) notFound();

  const { prev, next } = getAdjacentChapters(slug);

  return <ChapterReader chapter={chapter} prev={prev} next={next} />;
}
