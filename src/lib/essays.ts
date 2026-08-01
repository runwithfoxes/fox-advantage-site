import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * ESSAYS. Paul's own writing, published here first and on Substack after.
 *
 * ⭐ DELIBERATELY NOT BUILT LIKE chapters.ts. That file keeps every chapter's title,
 * order and description in a hardcoded array, and the markdown files carry no
 * frontmatter at all. That is right for a book, where the table of contents is fixed
 * and set once. It is wrong here: Paul adds essays one at a time, and having to edit a
 * TypeScript file to publish one is the thing that stops it happening.
 *
 * SO: drop a markdown file into src/content/essays and it appears. The index, the
 * reader and the sitemap all read from this loader, so none of them can drift out of
 * sync with what actually exists on disk.
 *
 * FRONTMATTER, all required except substack:
 *   title:    the essay's title, quoted
 *   date:     ISO, YYYY-MM-DD. Sort order and the displayed date both come from this.
 *   dek:      one line under the title, and the meta description
 *   substack: the URL of the same piece on Substack, if it is up there
 */

const essaysDirectory = path.join(process.cwd(), "src/content/essays");

/**
 * THE ONE ASK AT THE FOOT OF AN ESSAY, AND IT IS A LINK, NOT A FORM.
 *
 * ⭐ NO EMAIL FIELD ON AN ESSAY PAGE, EVER. Paul, 24 Jul: the only thing anyone can
 * subscribe to is the training course, and they are told that is what it is. A box on
 * an essay would collect people who typed their address expecting more essays and put
 * them on the course list, which is both a bait and switch and a corruption of the
 * intent properties /api/course-signup deliberately records. The link sends them to
 * /course, which does the explaining in his own words.
 *
 * ⚠️ THIS IS ONE STRING IN ONE PLACE ON PURPOSE. The course will not be "starting"
 * forever. When the date passes or the offer changes, this is the only edit, rather
 * than ten markdown files. If the course ends, set `show: false`.
 *
 * Wording tracks courseCopy.ts. Paul's own date form is "21st September".
 */
/* ⭐ `lead` widened from "Free course:" to name the category, 1 Aug 2026. It is the
   anchor line on ten essay pages, so it is the site's largest single block of internal
   linking to /course, and it was describing the course without saying what kind of
   course it is. Same reasoning as the title tag in src/app/course/page.tsx. */
export const COURSE_NOTE = {
  show: true,
  lead: "Free AI marketing course:",
  title: "AI Fluency for Ambitious Marketers",
  href: "/course",
  tail: "starts 21st September.",
};

export interface Essay {
  slug: string;
  title: string;
  date: string;
  dek: string;
  substack?: string;
  content?: string;
  /* first image in the body, used as the thumbnail on the index and homepage */
  image?: string | null;
}

/* "2026-06-12" -> "12 June 2026". Written out rather than pulled from a formatter so
   the output does not change with the server's locale. */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatEssayDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/* the short form the homepage block uses, e.g. "12 Jun" */
export function formatEssayDateShort(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  if (!m || !d) return iso;
  return `${d} ${MONTHS[m - 1].slice(0, 3)}`;
}

function firstImage(body: string): string | null {
  const m = body.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return m ? m[1] : null;
}

function readEssayFile(file: string): Essay | null {
  const fullPath = path.join(essaysDirectory, file);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  if (!data.title || !data.date) return null;

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    /* gray-matter turns an unquoted YYYY-MM-DD into a Date, so normalise back */
    date: data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date),
    dek: data.dek ? String(data.dek) : "",
    substack: data.substack ? String(data.substack) : undefined,
    image: firstImage(content),
  };
}

/** Every essay, newest first. */
export function getAllEssays(): Essay[] {
  if (!fs.existsSync(essaysDirectory)) return [];
  return fs
    .readdirSync(essaysDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(readEssayFile)
    .filter((e): e is Essay => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEssayMeta(slug: string): Essay | null {
  return readEssayFile(`${slug}.md`);
}

export async function getEssayContent(slug: string): Promise<Essay | null> {
  const meta = getEssayMeta(slug);
  if (!meta) return null;

  const { content } = matter(
    fs.readFileSync(path.join(essaysDirectory, `${slug}.md`), "utf8")
  );
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return { ...meta, content: processed.toString() };
}

/** Newer and older neighbours, for the foot of an essay. */
export function getAdjacentEssays(slug: string): {
  newer: Essay | null;
  older: Essay | null;
} {
  const all = getAllEssays();
  const i = all.findIndex((e) => e.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i < all.length - 1 ? all[i + 1] : null,
  };
}
