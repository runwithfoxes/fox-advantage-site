import Link from "next/link";

/* Lightweight links footer so content pages are not orphans. Sits above the
   sliding bottom-bar, inside the reading register. Links the GEO/agent cluster
   plus the key destinations. */

/* ⭐ THE LABELS ARE THE ANCHOR TEXT, so they are written as the words a reader would
   search rather than as menu items. /course was missing from this list entirely until
   1 Aug 2026: the page ranked for its own name and for the brand, and had almost no
   internal link describing it as what it is. This is the cheapest available fix and it
   adds no page to the index. */
const links: { href: string; label: string }[] = [
  { href: "/course", label: "Free AI marketing course for marketers" },
  { href: "/what-is-a-marketing-agent", label: "What is a marketing agent?" },
  { href: "/what-does-a-marketing-agent-cost", label: "What does a marketing agent cost?" },
  { href: "/ai-marketing-agent-vs-agency", label: "AI marketing agent vs a marketing agency" },
  { href: "/ai-marketing-ireland", label: "AI marketing for Irish businesses" },
  { href: "/when-an-ai-agent-needs-a-human", label: "What should an AI agent never do on its own?" },
  { href: "/answer-engine-optimization", label: "Answer engine optimization: 18 things worth knowing" },
  { href: "/answers", label: "Marketing questions, answered" },
  { href: "/about", label: "About Run with Foxes" },
  { href: "/essays", label: "Essays" },
  { href: "/book", label: "The Fox Advantage (free book)" },
];

/* `wide` is for the homepage, whose container is 1200px rather than the 820px
   reading measure. Layout only: same links, same component, one primitive. */
export default function SiteFooter({
  current,
  wide,
}: {
  current?: string;
  wide?: boolean;
}) {
  return (
    <footer className={wide ? "site-footer site-footer-wide" : "site-footer"}>
      <div className="site-footer-inner">
        <div className="rwf-label">Explore</div>
        <nav className="site-footer-links">
          {links
            .filter((l) => l.href !== current)
            .map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
        </nav>
      </div>
    </footer>
  );
}
