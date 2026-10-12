import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * THE DIARY. Dispatches from the AI team, written by Lena, one of the agents.
 * Paul reads every dispatch before it goes out.
 *
 * Built the same way as essays.ts, for the same reason: drop a markdown file
 * into src/content/diary and it appears. The index, the reader and the sitemap
 * all read this loader, so none of them can drift out of sync with what is on
 * disk. Publishing a dispatch is a drop-in-a-file job, and the file arrives
 * through ~/paul-hub/scripts/publish_dispatch.py, which runs the gates and
 * strips the private source notes. Never copy a draft in by hand.
 *
 * FRONTMATTER, all required except dek:
 *   title: the dispatch's title, quoted
 *   date:  ISO, YYYY-MM-DD. Sort order and the displayed date both come from this.
 *   dek:   one line under the title, and the meta description
 *   order: the dispatch number, optional. Two dispatches on the same day fall
 *          back to it, so the later one shows first. Without it they landed
 *          in filename order and the newest sat second (1 Oct 2026).
 *   label: the subject, optional, one of LABELS below, spelled as there
 *          (Paul, 10 Oct 2026: "so they can say, oh, I want to find information
 *          about X or Y from Lena"). One label a dispatch. A dispatch with no
 *          label, or one that is not in the list, shows none and breaks nothing.
 *
 * No substack field: the diary lives here and nowhere else.
 */

const diaryDirectory = path.join(process.cwd(), "src/content/diary");

/* Paul settled these six names on 10 Oct 2026. Do not rename them. */
export const LABELS = [
  { name: "Agents' work", slug: "agents-work" },
  { name: "Agents' tools", slug: "agents-tools" },
  { name: "Stopping errors", slug: "stopping-errors" },
  { name: "Teamwork", slug: "teamwork" },
  { name: "Meta ads", slug: "meta-ads" },
  { name: "Marketing", slug: "marketing" },
] as const;

export type Label = (typeof LABELS)[number];

const plain = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

function readLabel(raw: unknown): Label | null {
  if (!raw) return null;
  return LABELS.find((l) => plain(l.name) === plain(String(raw))) ?? null;
}

export function getLabel(slug: string): Label | null {
  return LABELS.find((l) => l.slug === slug) ?? null;
}

export interface Dispatch {
  slug: string;
  title: string;
  date: string;
  dek: string;
  order: number;
  label: Label | null;
  content?: string;
}

/* Same hand-written month table as essays.ts, so the output does not change
   with the server's locale. */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDispatchDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function readDispatchFile(file: string): Dispatch | null {
  const fullPath = path.join(diaryDirectory, file);
  if (!fs.existsSync(fullPath)) return null;

  const { data } = matter(fs.readFileSync(fullPath, "utf8"));
  if (!data.title || !data.date) return null;

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    /* gray-matter turns an unquoted YYYY-MM-DD into a Date, so normalise back */
    date: data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date),
    dek: data.dek ? String(data.dek) : "",
    order: Number(data.order) || 0,
    label: readLabel(data.label),
  };
}

/** Every dispatch, newest first. */
export function getAllDispatches(): Dispatch[] {
  if (!fs.existsSync(diaryDirectory)) return [];
  return fs
    .readdirSync(diaryDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(readDispatchFile)
    .filter((d): d is Dispatch => d !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || b.order - a.order);
}

export function getDispatchMeta(slug: string): Dispatch | null {
  return readDispatchFile(`${slug}.md`);
}

export async function getDispatchContent(slug: string): Promise<Dispatch | null> {
  const meta = getDispatchMeta(slug);
  if (!meta) return null;

  const { content } = matter(
    fs.readFileSync(path.join(diaryDirectory, `${slug}.md`), "utf8")
  );
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return { ...meta, content: processed.toString() };
}

/** Newer and older neighbours, for the foot of a dispatch. */
export function getAdjacentDispatches(slug: string): {
  newer: Dispatch | null;
  older: Dispatch | null;
} {
  const all = getAllDispatches();
  const i = all.findIndex((d) => d.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i < all.length - 1 ? all[i + 1] : null,
  };
}
