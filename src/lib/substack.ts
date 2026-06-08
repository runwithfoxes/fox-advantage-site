// Live Substack feed for the homepage thought-leadership carousel.
// Fetched server-side with ISR so the carousel self-updates without a redeploy.

export type SubstackPost = {
  title: string;
  link: string;
  slug: string;
  date: string; // pre-formatted, e.g. "May 28"
  excerpt: string;
  image: string | null;
};

const FEED_URL = "https://runwithfoxes.substack.com/feed";

// Empty = show the latest from the feed. Drop slugs in here later to pick and
// order exactly which posts surface (slug = last path segment, e.g. "a-robot-called-jo").
export const CURATED_SLUGS: string[] = [];

const MAX_POSTS = 6;

function firstMatch(block: string, re: RegExp): string | null {
  const m = block.match(re);
  return m ? m[1] : null;
}

function cleanText(raw: string | null): string {
  if (!raw) return "";
  return raw
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(pubDate: string | null): string {
  if (!pubDate) return "";
  const t = Date.parse(pubDate);
  if (Number.isNaN(t)) return "";
  // month-day to match Paul's live Substack cards, e.g. "May 28" (uppercased in the card)
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function slugFromLink(link: string): string {
  const m = link.match(/\/p\/([^/?#]+)/);
  return m ? m[1] : link;
}

function parseItem(block: string): SubstackPost | null {
  const title = cleanText(firstMatch(block, /<title>([\s\S]*?)<\/title>/));
  const link = (firstMatch(block, /<link>([\s\S]*?)<\/link>/) || "").trim();
  if (!title || !link) return null;

  // Image: prefer the RSS enclosure, fall back to the first <img> in the post body.
  let image = firstMatch(block, /<enclosure[^>]*url="([^"]+)"/);
  if (!image) image = firstMatch(block, /<img[^>]*src="([^"]+)"/);

  const excerptRaw =
    firstMatch(block, /<description>([\s\S]*?)<\/description>/) ||
    firstMatch(block, /<content:encoded>([\s\S]*?)<\/content:encoded>/);
  let excerpt = cleanText(excerptRaw);
  if (excerpt.length > 140) excerpt = excerpt.slice(0, 137).trimEnd() + "…";

  return {
    title,
    link: link.split("?")[0],
    slug: slugFromLink(link),
    date: formatDate(firstMatch(block, /<pubDate>([\s\S]*?)<\/pubDate>/)),
    excerpt,
    image: image ? image.replace(/&amp;/g, "&") : null,
  };
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 600 },
      headers: { "User-Agent": "runwithfoxes-site" },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    let posts = items
      .map((block) => parseItem(block))
      .filter((p): p is SubstackPost => p !== null);

    if (CURATED_SLUGS.length > 0) {
      const order = new Map(CURATED_SLUGS.map((s, i) => [s, i]));
      posts = posts
        .filter((p) => order.has(p.slug))
        .sort((a, b) => (order.get(a.slug)! - order.get(b.slug)!));
    }

    return posts.slice(0, MAX_POSTS);
  } catch {
    return [];
  }
}
