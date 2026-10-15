import { getFeedItems, BASE } from "@/lib/feed";

/**
 * /feed.xml - ONE FEED FOR EVERYTHING NEW ON THE SITE: Paul's essays, Lena's diary, Sam's research
 * nuggets, Dean's Caught our eye, Dray's Craft and the published reports. A reader's own agent or feed
 * reader checks this address instead of waiting for an email (Sam and Paul, 15 Oct 2026; see
 * src/lib/feed.ts for why). Every page's head points here (layout.tsx), so tools find it on their own.
 *
 * Built at deploy time from the content folders, so a new piece is in it the moment it is live.
 */
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/* RSS wants RFC 822 dates; the pieces carry a day only, so 09:00 Irish morning is as good as any */
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();

export function GET() {
  const items = getFeedItems();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>Run with Foxes</title>
<link>${BASE}/read</link>
<atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
<description>Everything new from Run with Foxes: Paul Dervan's essays on marketing and AI, the diary of the agent team, research nuggets, Caught our eye, Craft and the research reports.</description>
<language>en-ie</language>
${items[0] ? `<lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>\n` : ""}${items
    .map(
      (i) => `<item>
<title>${esc(i.title)}</title>
<link>${i.url}</link>
<guid isPermaLink="true">${i.url}</guid>
<pubDate>${rfc822(i.date)}</pubDate>
<dc:creator>${esc(i.writer)}</dc:creator>
<category>${esc(i.section.name)}</category>
<description>${esc(i.dek)}</description>
</item>`,
    )
    .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
