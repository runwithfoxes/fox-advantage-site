import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About - Run with Foxes",
  description:
    "Run with Foxes is a marketing consultancy run by Paul Dervan. We build marketing agents that make the ads, write the outreach and run the campaigns.",
};

export default function AboutPage() {
  return (
    <div className="contact-page">
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/contact">/contact</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      <main className="contact-main">
        <div className="about-inner">
          <div className="section-label">/about</div>
          <h1 className="contact-heading">Who we are</h1>

          <div className="rwf-body">
            <p>
              Run with Foxes is a marketing consultancy run by Paul Dervan. We
              build marketing agents for businesses, software that makes the
              ads, writes the outreach and runs the campaigns.
            </p>
            <p>
              The name does double duty. Run with Foxes is also Paul&apos;s 2020
              book on making better marketing decisions. The Fox Advantage is
              his new one, on doing marketing with AI instead of around it. Same
              person, same idea, three things under one name.
            </p>
            <p>
              If you came for the books,{" "}
              <Link href="/book">they&apos;re here</Link>. If you came for the
              agents, that&apos;s the day job, and{" "}
              <Link href="/">it&apos;s here</Link>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter current="/about" />

      <div className="bottom-bar">
        <Link href="/" className="active">
          ← back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/contact">/contact</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </div>
  );
}
