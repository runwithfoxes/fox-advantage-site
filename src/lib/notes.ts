import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * SAM'S SHORT RESEARCH PIECES. A copy of diary.ts with its own folder, made 4 Oct 2026, so Lena's
 * live section is not touched by anything done here. Drop a markdown file into
 * src/content/research-nuggets and it appears on the list page, its own page and the sitemap.
 *
 * FRONTMATTER: title, date (YYYY-MM-DD), dek (one line under the title, and the meta description),
 * order (optional, for two pieces on one day), hold (optional, see below).
 *
 * A HELD PIECE NEVER REACHES THE LIVE SITE. A piece with a hold line in its frontmatter shows on
 * a preview with that line above it, and is left out of every list, page and sitemap on the
 * production build. Taking the hold line out is the act of publishing.
 *
 * Pieces arrive through ~/paul-hub/scripts/publish_nugget.py (Sam's), which runs the gates and
 * strips the private notes. Never copy a draft in by hand.
 *
 * A CHART INSIDE A PIECE (Paul, 6 Oct 2026: "show an animated chart in your essays where possible,
 * to make it more visual"). Put <slug>.chart.json beside the piece and the chart is drawn inside it,
 * on the list page and on the piece's own page. The shape of that file is NoteChart below. Every
 * word and figure in it is Sam's, checked by Cato, the same as the piece.
 *
 * rail (optional frontmatter): a short title for the rail on the list page, 45 characters or fewer.
 */

/* true only on the live site's own build */
const LIVE = process.env.VERCEL_ENV === "production";

const notesDirectory = path.join(process.cwd(), "src/content/research-nuggets");

/** One chart, drawn by src/app/research-nuggets/NuggetChart.tsx. Bars share one scale and are never stacked.
    A file gives `bars` (with `max`) or `squares`, never both. */
export interface NoteChart {
  /** The chart sits straight after the paragraph that holds these words. */
  after: string;
  title: string;
  /** What is measured, shown small above the title. */
  unit: string;
  /** The right-hand end of the scale. Bars only. */
  max?: number;
  /** Printed around each value: "$" before, " million" or "%" after. */
  prefix?: string;
  suffix?: string;
  /** Faint lines on the scale and the label under each: [[0, "0"], [50, "50%"]]. */
  ticks?: [number, string][];
  bars?: {
    label: string;
    value: number;
    /** Printed small after the value, such as "(80 of 96)". */
    note?: string;
    /** "main" is the solid bar. "other" is the comparison, in grey. "limit" is an estimate that is
        only an upper limit: drawn as a dashed outline, never solid, and it steps back once shown. */
    kind?: "main" | "other" | "limit";
  }[];
  /** A count out of a small total, drawn as one square for each thing counted, with `value` of them
      filled in. Every block uses the same size of square, so a block three times the size is three
      times the total. Counts, never percentages. */
  squares?: {
    label: string;
    value: number;
    out_of: number;
    /** Printed small after the value, such as "of 48 ads". */
    note?: string;
  }[];
  /** A full sentence that appears under the chart once the bars are drawn. Never shortened. */
  closing?: string;
  footnote?: string;
  source?: string;
}

export interface Note {
  slug: string;
  title: string;
  date: string;
  dek: string;
  order: number;
  /** Set while a piece waits on Cato or Paul. Shown on previews, and the piece is left out of the live site. */
  hold: string;
  /** A short title for the rail on the list page. Empty means the title is used. */
  rail: string;
  content?: string;
  chart?: NoteChart | null;
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
    rail: data.rail ? String(data.rail) : "",
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

  const chartPath = path.join(notesDirectory, `${slug}.chart.json`);
  const chart: NoteChart | null = fs.existsSync(chartPath)
    ? JSON.parse(fs.readFileSync(chartPath, "utf8"))
    : null;

  return { ...meta, content: processed.toString(), chart };
}

/** The piece's HTML cut in two at the end of the paragraph that holds the chart's `after` words.
    If the words are not found (the piece was edited), the chart goes at the foot and the build says so. */
export function splitAtChart(html: string, after: string): [string, string] {
  const at = after ? html.indexOf(after) : -1;
  const end = at === -1 ? -1 : html.indexOf("</p>", at);
  if (end === -1) {
    console.warn(`research nuggets: no paragraph holds "${after}", so the chart sits at the foot of the piece`);
    return [html, ""];
  }
  return [html.slice(0, end + 4), html.slice(end + 4)];
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
