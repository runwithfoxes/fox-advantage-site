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

          {/**
            * ⭐ THE ENTITY PAGE. Expanded 1 Aug 2026 from 162 words, which the search
            * agent's own site_gaps.py flagged as thin. It is the page that has to
            * resolve who Run with Foxes is, what it does, who is behind it and where
            * it works, because that is the resolution both a buyer and a model come
            * here for and none of it was on the page.
            *
            * ⛔ EVERY FACT BELOW IS SOURCED. NOTHING HERE WAS WRITTEN FROM MEMORY.
            *  - the credibility line, verbatim in substance from
            *    ~/paul-hub/clients/rwf/POSITIONING.md, "the credibility line" section,
            *    approved by Paul 21 Jul, including the /lottery-case-study link, which
            *    is his own chosen destination for that credential;
            *  - the roles, from his approved homepage bio (HomePage.tsx, hpx-bio-body,
            *    the same lines courseCopy.ts BIO_LINES trims). Writing a second career
            *    history would be inventing one;
            *  - the geography sentence is HIS WORDING, verbatim, recorded in
            *    clients/rwf/CONTEXT.md on 21 Jul. ⚠️ Do NOT re-argue it from "the award
            *    is Irish, the flagship brand is Irish" - that framing was rejected;
            *  - the method sentence is his own line, POSITIONING.md "the method".
            *
            * ⛔ DELIBERATELY LEFT OFF, and these are rulings not omissions: Paul
            * Feldwick and Phil Barden (Paul, 21 Jul: will not trade on their names),
            * and "over 100 ads in a day" (unconfirmed). The €2.68 return and the 19%
            * figure are cleared but live on the case study, not here.
            */}
          <div className="rwf-body">
            <p>
              Run with Foxes is a marketing consultancy run by Paul Dervan. We
              build marketing agents for businesses, software that makes the
              ads, writes the outreach and runs the campaigns.
            </p>
            <p>
              Paul is Ireland&apos;s Marketer of the Year 2022, awarded as CMO of
              the National Lottery, which passed one billion euro in revenue for
              the first time under his marketing team. That work is written up
              in full <Link href="/lottery-case-study">here</Link>. Before it he
              was head of brand at O2 Ireland, and after it head of brand at
              Indeed and Miro, both global roles. Twenty years in brand.
            </p>
            <p>
              We are based in Ireland and we work with companies in Ireland, the
              UK and the US.
            </p>
            <p>
              The way we build is the same every time. Write the craft down as
              rules once, let the machine execute it exactly every time, keep the
              human on judgment. That is how you get quality and speed rather
              than choosing between them.
            </p>
            <p>
              There is also a free AI marketing course,{" "}
              <Link href="/course">AI Fluency for Ambitious Marketers</Link>. Six
              modules, one a fortnight, starting 21st September.
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
