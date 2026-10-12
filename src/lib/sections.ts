import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Section } from "./sections-name";

/**
 * THE PIECES OF DEAN'S AND DRAY'S SECTIONS. The same loader as notes.ts (Sam's), written once for
 * both, so Lena's and Sam's live sections are not touched by anything done here. Drop a markdown
 * file into the section's folder under src/content and it appears on the list page, its own page,
 * the homepage's what's new list and the sitemap.
 *
 * FRONTMATTER: title, date (YYYY-MM-DD), dek, order (optional, for two pieces on one day), rail
 * (optional, a short title for the rail, 45 characters or fewer), hold (optional).
 *
 * A HELD PIECE NEVER REACHES THE LIVE SITE: it shows on a preview with its hold line above it and
 * is left out of every list, page and sitemap on the production build.
 */

/* true only on the live site's own build */
const LIVE = process.env.VERCEL_ENV === "production";

export interface Piece {
  slug: string;
  title: string;
  date: string;
  dek: string;
  order: number;
  hold: string;
  rail: string;
  /** the piece's own picture for a card on /read, optional: a path under /public */
  image: string | null;
  content?: string;
}

const dirOf = (s: Section) => path.join(process.cwd(), "src/content", s.dir);

function readPiece(s: Section, file: string): Piece | null {
  const fullPath = path.join(dirOf(s), file);
  if (!fs.existsSync(fullPath)) return null;

  const { data } = matter(fs.readFileSync(fullPath, "utf8"));
  if (!data.title || !data.date) return null;
  if (LIVE && data.hold) return null;

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    /* gray-matter turns an unquoted YYYY-MM-DD into a Date, so normalise back */
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    dek: data.dek ? String(data.dek) : "",
    order: Number(data.order) || 0,
    hold: data.hold ? String(data.hold) : "",
    rail: data.rail ? String(data.rail) : "",
    image: data.image ? String(data.image) : null,
  };
}

/** Every piece, newest first. */
export function getAllPieces(s: Section): Piece[] {
  if (!fs.existsSync(dirOf(s))) return [];
  return fs
    .readdirSync(dirOf(s))
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPiece(s, f))
    .filter((d): d is Piece => d !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || b.order - a.order);
}

export function getPieceMeta(s: Section, slug: string): Piece | null {
  return readPiece(s, `${slug}.md`);
}

export async function getPieceContent(s: Section, slug: string): Promise<Piece | null> {
  const meta = getPieceMeta(s, slug);
  if (!meta) return null;
  const { content } = matter(fs.readFileSync(path.join(dirOf(s), `${slug}.md`), "utf8"));
  const processed = await remark().use(html, { sanitize: false }).process(content);
  return { ...meta, content: processed.toString() };
}

/** Newer and older neighbours, for the foot of a piece. */
export function getAdjacentPieces(s: Section, slug: string): { newer: Piece | null; older: Piece | null } {
  const all = getAllPieces(s);
  const i = all.findIndex((d) => d.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return { newer: i > 0 ? all[i - 1] : null, older: i < all.length - 1 ? all[i + 1] : null };
}
