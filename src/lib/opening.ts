import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * THE OPENING OF A PIECE, for the /read page. Paul, 12 Oct 2026: "a full paragraph or more of lead essay in
 * each. So page does not feel like just a list?" The piece's own words, read from its content file and
 * run through the same remark path the piece pages use, so a link, bold or italics inside it shows
 * properly. Nothing is written or summarised here.
 *
 * Whole paragraphs from the top of the body until there are about 70 words, never more than three,
 * never past about 160 words (unless the first paragraph alone is longer, which then shows whole).
 * Leading non-prose (headings, pictures, embeds, lists, quotes) is skipped; once the opening has
 * started, the first non-paragraph ends it. A paragraph is never cut. Returns "" if no prose is found.
 */
type Node = {
  type: string;
  value?: string;
  children?: Node[];
  position?: { start: { offset?: number }; end: { offset?: number } };
};

const text = (n: Node): string => (n.value ?? "") + (n.children ? n.children.map(text).join("") : "");
const has = (n: Node, types: string[]): boolean =>
  types.includes(n.type) || (n.children ? n.children.some((c) => has(c, types)) : false);
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

export async function getOpening(dir: string, slug: string, maxParas = 3): Promise<string> {
  const file = path.join(process.cwd(), "src/content", dir, `${slug}.md`);
  if (!fs.existsSync(file)) return "";
  const { content } = matter(fs.readFileSync(file, "utf8"));
  const tree = remark().parse(content) as unknown as Node;
  const picked: string[] = [];
  let total = 0;
  for (const node of tree.children ?? []) {
    const prose =
      node.type === "paragraph" &&
      !has(node, ["image", "html", "imageReference", "footnoteReference"]) &&
      words(text(node)) > 0;
    if (!prose) {
      if (picked.length) break;
      continue;
    }
    const n = words(text(node));
    if (picked.length) {
      if (total >= 70 || picked.length >= maxParas || total + n > 160) break;
    }
    const a = node.position?.start.offset;
    const b = node.position?.end.offset;
    if (a === undefined || b === undefined) continue;
    picked.push(content.slice(a, b));
    total += n;
  }
  if (!picked.length) return "";
  return (await remark().use(html, { sanitize: false }).process(picked.join("\n\n"))).toString();
}
