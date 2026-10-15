import { getAllMarkdownParams, getPieceMarkdown } from "@/lib/feed";

/**
 * Every piece as plain markdown, for a reader's agent: /essays/<slug>.md, /diary/<slug>.md and the same
 * in every section. The pretty address is a rewrite in next.config.ts onto this route. The text is the
 * same the Copy this page button copies (Paul, 14 Oct 2026: a signal we are happy for people to take it).
 * Built at deploy time, one file per piece; anything not listed is not found.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMarkdownParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const md = getPieceMarkdown(section, slug);
  if (!md) return new Response("Not found\n", { status: 404 });
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
