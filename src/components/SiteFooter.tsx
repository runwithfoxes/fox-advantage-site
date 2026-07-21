import Link from "next/link";

/* Lightweight links footer so content pages are not orphans. Sits above the
   sliding bottom-bar, inside the reading register. Links the GEO/agent cluster
   plus the key destinations. */

const links: { href: string; label: string }[] = [
  { href: "/what-is-a-marketing-agent", label: "What is a marketing agent?" },
  { href: "/what-does-a-marketing-agent-cost", label: "What does a marketing agent cost?" },
  { href: "/ai-marketing-agent-vs-agency", label: "AI marketing agent vs a marketing agency" },
  { href: "/answer-engine-optimization", label: "Answer engine optimization: 18 things worth knowing" },
  { href: "/answers", label: "Marketing questions, answered" },
  { href: "/about", label: "About Run with Foxes" },
  { href: "/book", label: "The Fox Advantage (free book)" },
];

export default function SiteFooter({ current }: { current?: string }) {
  return (
    <footer className="site-footer">
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
