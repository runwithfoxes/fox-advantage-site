import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * SAM'S SHORT RESEARCH PIECES. A copy of diary.ts with its own folder, made 4 Oct 2026, so Lena's
 * live section is not touched by anything done here. Drop a markdown file into
 * src/content/research-notes and it appears on the list page, its own page and the sitemap.
 *
 * FRONTMATTER: title, date (YYYY-MM-DD), dek (one line under the title, and the meta description),
 * order (optional, for two pieces on one day), hold (optional, see below).
 *
 * A HELD PIECE NEVER REACHES THE LIVE SITE. A piece with a hold line in its frontmatter shows on
 * a preview with that line above it, and is left out of every list, page and sitemap on the
 * production build. Taking the hold line out is the act of publishing.
 *
 * OWED BEFORE ANYTHING HERE GOES LIVE: a publish script like publish_dispatch.py that runs the
 * gates and strips private notes. The first piece was copied in by hand for a preview only.
 */

/* true only on the live site's own build */
const LIVE = process.env.VERCEL_ENV === "production";

const notesDirectory = path.join(process.cwd(), "src/content/research-notes");

export interface Note {
  slug: string;
  title: string;
  date: string;
  dek: string;
  order: number;
  /** Set while a piece waits on Cato or Paul. Shown on previews, and the piece is left out of the live site. */
  hold: string;
  content?: string;
}

/* Same hand-written month table as essays.ts, so the output does not change
   with the server's locale. */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatNoteDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function readNoteFile(file: string): Note | null {
  const fullPath = path.join(notesDirectory, file);
  if (!fs.existsSync(fullPath)) return null;

  const { data } = matter(fs.readFileSync(fullPath, "utf8"));
  if (!data.title || !data.date) return null;
  if (LIVE && data.hold) return null;

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    /* gray-matter turns an unquoted YYYY-MM-DD into a Date, so normalise back */
    date: data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date),
    dek: data.dek ? String(data.dek) : "",
    order: Number(data.order) || 0,
    hold: data.hold ? String(data.hold) : "",
  };
}

/** Every piece, newest first. */
export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) return [];
  return fs
    .readdirSync(notesDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(readNoteFile)
    .filter((d): d is Note => d !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || b.order - a.order);
}

export function getNoteMeta(slug: string): Note | null {
  return readNoteFile(`${slug}.md`);
}

export async function getNoteContent(slug: string): Promise<Note | null> {
  const meta = getNoteMeta(slug);
  if (!meta) return null;

  const { content } = matter(
    fs.readFileSync(path.join(notesDirectory, `${slug}.md`), "utf8")
  );
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return { ...meta, content: processed.toString() };
}

/** Newer and older neighbours, for the foot of a piece. */
export function getAdjacentNotes(slug: string): {
  newer: Note | null;
  older: Note | null;
} {
  const all = getAllNotes();
  const i = all.findIndex((d) => d.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i < all.length - 1 ? all[i + 1] : null,
  };
}
