import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBuckets } from "../../toolData";
import ToolPageContent from "./ToolPageContent";

export function generateStaticParams() {
  return toolBuckets.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bucket = toolBuckets.find((b) => b.slug === slug);
  if (!bucket) return { title: "Not found" };
  return {
    title: `${bucket.title} \\ Students \\ Run with Foxes`,
    description: bucket.intro,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bucket = toolBuckets.find((b) => b.slug === slug);
  if (!bucket) notFound();
  return <ToolPageContent bucket={bucket} />;
}
