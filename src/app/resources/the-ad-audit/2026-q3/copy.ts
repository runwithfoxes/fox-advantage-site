/**
 * THE AD AUDIT, Q3 2026. Sam's words, from paul-hub commit 024d205ce (the final version, after
 * Cato's third check; intelligence/research/irish-ad-audit/reports/2026-q3/index.html).
 *
 * copy.json is WRITTEN by a script from that HTML, never typed, so every sentence is Sam's. Two
 * things follow the AI Ask's precedent: each finding's "(Chapter N)" moves onto the card's link,
 * and a few phrases get the module highlight. A highlight wraps words that are already there, and
 * mark() throws at build time if the phrase is missing, so a highlight can never change the text.
 * NOT APPROVED FOR THE LIVE SITE until Paul approves Sam's text.
 */
import C from "./copy.json";

export type FigId = "f11" | "f12" | "f21" | "f31" | "f32" | "f41" | "f42" | "t51" | "f52" | "t71";
export type Block =
  | { p: string }
  | { fig: FigId; no: string; title: string; cap: string; head?: string[]; rows?: string[][] }
  | { gallery: true };
export type Sub = { n: string; title: string; blocks: Block[] };
export type Chapter = { id: string; n: number; title: string; lede: Block[]; subs: Sub[] };

/** Phrases Sam wrote, picked out in sky. Each must appear word for word in its paragraph. */
const HL: string[] = [
  "1,814 ads",
  "Mostly one film.",
  "Revolut's share rises to 7% and bunq's to 6%",
  "That's more than PTSB, AIB and EBS together.",
  "82% of their reach on ads about the credit union itself",
  "tell people not to be robbed",
  "In mortgages the offer is nearly always cashback",
  "54% of the people the challengers reached were under 35",
  "Bank of Ireland started new ads in all 13 weeks",
  "Bank of Ireland runs its pension ads in short bursts, over and over.",
  "nothing in the library tells us which it is",
  "they carry 95% of AIB's brand reach",
  "Anyone who tells you otherwise from the Ad Library alone is guessing.",
];
const used = new Set<string>();
function mark(s: string) {
  let out = s;
  for (const h of HL) {
    if (!used.has(h) && out.includes(h)) {
      out = out.replace(h, `==${h}==`);
      used.add(h);
    }
  }
  return out;
}
const blk = (b: Record<string, unknown>): Block => ("p" in b ? { p: mark(b.p as string) } : (b as Block));

export const META = {
  kicker: C.meta.kicker,
  /** the full title, for the tab and the catalogue */
  title: C.meta.h1,
  // The kicker already names the report and the issue, so the hero carries the headline alone,
  // the way the AI Ask does (Paul, 27 Sep): the part after the colon, split where the sky starts.
  heroTitle: "Irish banks sell on social,",
  titleHl: "and the newcomers reach the young",
  date: "27 September 2026",
  byline: "Sam · AI researcher, Run with Foxes",
  checked: "Checked by Cato and Paul Dervan",
};
if (`${META.heroTitle} ${META.titleHl}` !== C.meta.h1.split(": ")[1]) throw new Error("hero title drifted from Sam's h1");
if (!C.meta.byline.startsWith(META.date)) throw new Error("date drifted from Sam's byline");

export const INTRO: string[] = C.intro.map(mark);
export const FINDINGS: { text: string; ch: number }[] = C.findings;
export const CHAPTERS: Chapter[] = C.chapters.map((c) => ({
  id: `ch${c.n}`,
  n: c.n,
  title: c.title,
  lede: c.lede.map(blk),
  subs: c.subs.map((s) => ({ n: s.n, title: s.title, blocks: s.blocks.map(blk) })),
}));
export const METHOD: { k: string; t: string }[] = C.method;
export const GALLERY: { img: string; adv: string; tags: string; quote: string; reach: string }[] = C.gallery;

const missing = HL.filter((h) => !used.has(h));
if (missing.length) throw new Error(`highlight not found in Sam's text: ${missing.join(" | ")}`);
