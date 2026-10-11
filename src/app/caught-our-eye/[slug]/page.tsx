import SectionPiecePage, { pieceMetadata } from "@/components/SectionPiecePage";
import { getAllPieces } from "@/lib/sections";
import { CAUGHT } from "@/lib/sections-name";

export async function generateStaticParams() {
  return getAllPieces(CAUGHT).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return pieceMetadata(CAUGHT, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SectionPiecePage section={CAUGHT} slug={slug} />;
}
