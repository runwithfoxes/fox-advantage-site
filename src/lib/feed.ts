import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllEssays, getEssayMeta } from "@/lib/essays";
import { getAllDispatches, getDispatchMeta } from "@/lib/diary";
import { getAllNotes, getNoteMeta } from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";
import { getAllPieces, getPieceMeta } from "@/lib/sections";
import { CAUGHT, DRAY } from "@/lib/sections-name";
import { REPORTS, reportHref } from "@/app/resources/catalogue";

/**
 * EVERY PUBLIC PIECE ON THE SITE, IN ONE LIST, for the feed (/feed.xml), the list for agents (/llms.txt)
 * and the plain text copy of each piece (/essays/<slug>.md and the same in every section).
 *
 * Why it exists. Sam, 15 Oct 2026, from Dan Shipper's "the newsletter is dead" on X: readers' own agents
 * now filter their inbox, so an email address no longer guarantees a reader. Paul said yes to three
 * things that day ("Okay, let's do those first three things"): a feed, pages an agent can read, and a
 * page telling a marketer how to have their own Claude follow the site. Email stays; these go beside it.
 *
 * Nothing here is typed in by hand. It reads the same loaders the pages render from, the way sitemap.ts
 * does, so a held piece (hold: in its frontmatter) stays out on the live site, and a report is only here
 * once REPORTS lets it through, which drops every made-up example and the held series. Never read
 * catalogue.json directly: most of what is in it is example data.
 */

/* the first sentence of a section's own intro, the same as /read uses */
const first = (t: string) => t.split(/(?<=\.)\s/)[0];

export const BASE = "https://runwithfoxes.com";

export type FeedSection = { key: string; name: string; writer: string; route: string; line: string };

export const FEED_SECTIONS: FeedSection[] = [
  { key: "essays", name: "Essays", writer: "Paul Dervan", route: "/essays", line: "Marketing and AI, written up as I go." },
  { key: "diary", name: "Diary of an agent team", writer: "Lena", route: "/diary", line: "The diary of the AI team at Run with Foxes, written by Lena, one of the agents." },
  { key: "notes", name: NOTES.name, writer: "Sam", route: NOTES.route, line: first(NOTES.intro) },
  { key: CAUGHT.key, name: CAUGHT.name, writer: CAUGHT.who, route: CAUGHT.route, line: CAUGHT.intro },
  { key: DRAY.key, name: DRAY.name, writer: DRAY.who, route: DRAY.route, line: DRAY.intro },
  { key: "reports", name: "Research reports", writer: "", route: "/resources", line: "Quarterly research reports from the Run with Foxes research desk." },
];

export type FeedItem = {
  section: FeedSection;
  slug: string;
  title: string;
  /** the line under the title; the piece's first sentence when it has none */
  dek: string;
  date: string;
  writer: string;
  /** the page, absolute */
  url: string;
  /** the plain text copy, absolute, or null where there is none (reports) */
  md: string | null;
};

const sec = (key: string) => FEED_SECTIONS.find((s) => s.key === key)!;

/** The diary has no dek lines, and a nugget may have none: then the piece's own first sentence, which
    on this site is the lesson (Paul, 9 Oct: lesson for the reader first). Never a sentence made up here. */
function firstSentence(file: string): string {
  if (!fs.existsSync(file)) return "";
  const { content } = matter(fs.readFileSync(file, "utf8"));
  const para = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^[#<!>|\-*]/.test(p) && !p.startsWith("```"));
  if (!para) return "";
  const plain = para.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "").replace(/\s+/g, " ");
  return plain.split(/(?<=[.!?])\s/)[0];
}

const DIR: Record<string, string> = {
  essays: "src/content/essays",
  diary: "src/content/diary",
  notes: "src/content/research-nuggets",
  [CAUGHT.key]: `src/content/${CAUGHT.dir}`,
  [DRAY.key]: `src/content/${DRAY.dir}`,
};
const fileOf = (key: string, slug: string) => path.join(process.cwd(), DIR[key], `${slug}.md`);

function item(key: string, p: { slug: string; title: string; dek: string; date: string }, writer?: string): FeedItem {
  const s = sec(key);
  return {
    section: s,
    slug: p.slug,
    title: p.title,
    dek: p.dek || firstSentence(fileOf(key, p.slug)),
    date: p.date,
    writer: writer ?? s.writer,
    url: `${BASE}${s.route}/${p.slug}`,
    md: `${BASE}${s.route}/${p.slug}.md`,
  };
}

/** Every public piece, newest first. */
export function getFeedItems(): FeedItem[] {
  const reports: FeedItem[] = REPORTS.filter((r) => r.status === "published").map((r) => ({
    section: sec("reports"),
    slug: r.slug,
    title: r.title,
    dek: r.standfirst,
    date: r.date,
    writer: r.author.name,
    url: `${BASE}${reportHref(r)}`,
    md: null,
  }));
  return [
    ...getAllEssays().map((e) => item("essays", e)),
    ...getAllDispatches().map((d) => item("diary", d)),
    ...getAllNotes().map((n) => item("notes", n)),
    ...getAllPieces(CAUGHT).map((p) => item(CAUGHT.key, p)),
    ...getAllPieces(DRAY).map((p) => item(DRAY.key, p)),
    ...reports,
  ].sort((a, b) => b.date.localeCompare(a.date));
}

/** Which section a route folder belongs to, for the .md copies. */
export const MD_SECTIONS: Record<string, string> = {
  essays: "essays",
  diary: "diary",
  [NOTES.route.slice(1)]: "notes",
  [CAUGHT.route.slice(1)]: CAUGHT.key,
  [DRAY.route.slice(1)]: DRAY.key,
};

/** A note's chart, as lines of text, so an agent reading the copy still gets the numbers. */
function chartText(slug: string): string {
  const f = path.join(process.cwd(), DIR.notes, `${slug}.chart.json`);
  if (!fs.existsSync(f)) return "";
  const c = JSON.parse(fs.readFileSync(f, "utf8"));
  const v = (n: number) => `${c.prefix ?? ""}${n}${c.suffix ?? ""}`;
  const lines: string[] = [`Chart: ${c.title}${c.unit ? ` (${c.unit})` : ""}`];
  for (const b of c.bars ?? []) lines.push(`- ${b.label}: ${v(b.value)}${b.note ? ` ${b.note}` : ""}`);
  for (const q of c.squares ?? []) lines.push(`- ${q.label}: ${q.value} of ${q.out_of}${q.note ? ` ${q.note}` : ""}`);
  for (const p of c.pairs ?? []) lines.push(`- ${p.label}: ${p.value}${c.pairs_unit ? ` ${c.pairs_unit}` : ""}`);
  for (const r of c.rings ?? []) lines.push(`- ${r.label}: ${r.value}%${r.note ? ` ${r.note}` : ""}`);
  if (c.split) {
    lines.push(`- ${c.split.label}: ${c.split.count}`);
    for (const p of c.split.parts) lines.push(`  - ${p.label}: ${p.on_bar}`);
  }
  if (c.closing) lines.push("", c.closing);
  if (c.footnote) lines.push("", c.footnote);
  if (c.source) lines.push("", `Source: ${c.source}`);
  return lines.join("\n");
}

/** One piece as plain markdown: title, line, writer and date, the body with the site's own paths made
    absolute (the same as the Copy this page button), and a link back. Null for anything not public. */
export function getPieceMarkdown(route: string, slug: string): string | null {
  const key = MD_SECTIONS[route];
  if (!key || !/^[a-z0-9-]+$/.test(slug)) return null;
  const meta =
    key === "essays" ? getEssayMeta(slug)
    : key === "diary" ? getDispatchMeta(slug)
    : key === "notes" ? getNoteMeta(slug)
    : key === CAUGHT.key ? getPieceMeta(CAUGHT, slug)
    : key === DRAY.key ? getPieceMeta(DRAY, slug)
    : null;
  if (!meta) return null;
  const it = item(key, meta);
  const { content } = matter(fs.readFileSync(fileOf(key, slug), "utf8"));
  const body = content.trim().replace(/(\]\(|src=["'])\//g, `$1${BASE}/`);
  const chart = key === "notes" ? chartText(slug) : "";
  return [
    `# ${it.title}`,
    it.dek,
    `${it.writer}, Run with Foxes, ${it.date}. ${it.section.name}.`,
    body,
    chart,
    `Read it on the site: ${it.url}`,
  ].filter(Boolean).join("\n\n") + "\n";
}

/** Every piece that has a plain text copy, for building them all at deploy time. */
export function getAllMarkdownParams(): { section: string; slug: string }[] {
  const route = Object.fromEntries(Object.entries(MD_SECTIONS).map(([r, k]) => [k, r]));
  return getFeedItems()
    .filter((i) => i.md)
    .map((i) => ({ section: route[i.section.key], slug: i.slug }));
}
