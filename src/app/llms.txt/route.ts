import { CHAPTER_COUNT } from "@/lib/chapters";
import { FEED_SECTIONS, getFeedItems, BASE } from "@/lib/feed";

/**
 * /llms.txt - THE SITE AS A PLAIN LIST FOR AN AGENT: who we are, then every public piece with its
 * one line, its page and its plain text copy. Until 15 Oct 2026 this was a hand-written file in public/
 * (June 2026) that named no pieces at all. Its words are kept below as they were; the lists under them
 * are read from the content folders (src/lib/feed.ts), so the file can never go stale.
 * The book's chapter count is counted from the chapter list, never typed (Cato, 30 Sep).
 */
export const dynamic = "force-static";

export function GET() {
  const chapters = CHAPTER_COUNT;
  const items = getFeedItems();

  const sections = FEED_SECTIONS.map((s) => {
    const mine = items.filter((i) => i.section.key === s.key);
    if (!mine.length) return "";
    const who = s.writer ? ` (by ${s.writer})` : "";
    return [
      `## ${s.name}${who}`,
      s.line,
      "",
      ...mine.map((i) => {
        const copy = i.md ? ` Plain text: ${i.md}` : "";
        const by = s.writer ? "" : ` By ${i.writer}.`;
        return `- [${i.title}](${i.url}) (${i.date}): ${i.dek}${by}${copy}`;
      }),
    ].join("\n");
  }).filter(Boolean);

  const text = `# Run with Foxes

> Run with Foxes is a marketing consultancy that brings twenty years of brand thinking together with AI. We turn the repeated parts of marketing into practical systems and hand them over, so a team of two or three can do work that used to need a department.

Founded by Paul Dervan: twenty years in brand, former Head of Brand at O2 Ireland, CMO at the National Lottery, and Head of Brand at Indeed and Miro (both global roles). Ireland's Marketer of the Year in 2022. Trained by Peter Field, one half of Binet and Field. The approach is evidence-based and the order matters: quality first, then automate. We build the systems rather than just advise on them.

## Where we build AI into marketing
- Marketing effectiveness: measurement training, metrics audits, brand scorecards, and the brand versus activation split, so the organisation sees which metrics matter and how they move each other.
- Segmentation: proper segmentation with the maths run, including similarity analysis, scatter plots, and the four tests a segment has to pass before we act on it.
- Brand strategy: competitor positioning maps, mental availability, messaging frameworks, distinctive brand assets, brand on a page, and brand guidelines, built at high quality and at speed.
- Advertising: custom advertising engines that move a team from brief to useful options faster, quality first, across brand video, brand ads, animated ads, and static ads.
- Studio: twenty years of internal studio craft with AI inside, including marketing calendars, studio measurement, and a brief coach, to lift quality, get work out faster, and show the ROI.
- Business development: AI for sales and outreach handled end to end, from building and enriching the list to researching prospects, writing and sending outreach, and setting up calls.
- Research and insights: an AI interviewer that runs structured phone interviews at scale, company intelligence and change signals, review analysis across platforms, and daily competitive pricing monitors.

## The book
- [The Fox Advantage](${BASE}/book): a free book about how to thrive in marketing because of AI, not despite it. ${chapters} short chapters, 4 parts, no jargon.

## Work with us
- [Contact](${BASE}/about): three ways we work, build it for you, work alongside you, or train your team. Strategy chats are 30 minutes.

## Page summary
- [One-page summary (PDF)](${BASE}/downloads/runwithfoxes-summary.pdf): a two-page branded summary of the homepage.

## Follow what we publish
- [Feed](${BASE}/feed.xml): every new piece from every section below, newest first, in one RSS feed.
- Every piece below also comes as plain markdown: add .md to its address.

${sections.join("\n\n")}
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
