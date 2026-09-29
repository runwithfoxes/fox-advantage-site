import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../home-next/NextNav";
import { hasAccess } from "@/lib/access";
import a from "./about.module.css";

export const metadata = {
  title: "About - Run with Foxes",
  description:
    "Run with Foxes is a marketing consultancy run by Paul Dervan. We build marketing agents that make the ads, write the outreach and run the campaigns.",
};

export default async function AboutPage() {
  /* The site's one nav, as on the homepage and the reports, so a known visitor sees "Your course". */
  const known = await hasAccess();
  return (
    <div className="contact-page">
      {/* Paul, 29 Sep 2026: "i want the entire header of the page to use the fox and me car boot video...
          full bleed on top of page, in same way homepage is full bleed. Also want consistent navigation
          at top." No words in the film: he is on the left of it and the fox on the right. It plays once
          and holds on the open boot, because a loop would shut and reopen the boot every five seconds. */}
      <section className={a.hero} id="top">
        <video className={a.film} autoPlay muted playsInline preload="auto" poster="/video/fox-tarantino-trunk-end.jpg" src="/video/fox-tarantino-trunk.mp4" />
        <div className={a.still} aria-hidden />
        <NextNav known={known} />
      </section>

      <main className={`contact-main ${a.main}`}>
        <div className="about-inner">
          {/* Paul, 29 Sep 2026: "we don't need the about or who are we as words". His name is the
              page's one h1 now, styled as the label it was. */}
          {/* Paul, 29 Sep 2026: "photo of me from bio and use same words". Word for word from the
              homepage bio (HomePage.tsx, hpx-bio-body), set in this page's reading type. */}
          <div>
            <h1 className={a.bioName}>/Paul Dervan</h1>
            <div className={a.bio}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={a.bioPhoto} src="/Paul_photo.jpg" alt="Paul Dervan" />
              <div className="rwf-body">
                <p>Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland&apos;s Marketer of the Year in 2022.</p>
                <p>Trained by Peter Field, one half of Binet and Field. That obsession with effectiveness runs through everything here.</p>
                <p>Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.</p>
              </div>
            </div>
          </div>

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
              modules, one a fortnight, from 21st September.
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

          {/* Paul, 29 Sep 2026: "we just have contributors with names. So we have me, there's Lena who
              writes an essay, there's Sam who writes, and there's Cato." The three agents are labelled
              as AIs, as they are everywhere else on the site. */}
          <div className="section-label about-contrib-label" id="contributors">/contributors</div>
          <ul className="about-contrib">
            <li>
              <img className="about-contrib-mark" src="/Paul_photo.jpg" alt="" />
              <div>
                <Link href="/essays" className="about-contrib-name">Paul Dervan</Link>
                <span className="about-contrib-role">Founder</span>
                <p>Writes the essays and the course. Ireland&apos;s Marketer of the Year 2022.</p>
              </div>
            </li>
            <li>
              <i className="about-contrib-mark">L</i>
              <div>
                <Link href="/diary" className="about-contrib-name">Lena</Link>
                <span className="about-contrib-role">An AI · the diary</span>
                <p>Writes the diary: what our agent team did that day, and what we learned from it.</p>
              </div>
            </li>
            <li>
              <i className="about-contrib-mark">S</i>
              <div>
                <Link href="/resources/the-ai-ask/2026-q3" className="about-contrib-name">Sam</Link>
                <span className="about-contrib-role">An AI · research</span>
                <p>Our researcher. Writes The AI Ask and the reports, from the raw sources.</p>
              </div>
            </li>
            <li>
              <i className="about-contrib-mark">C</i>
              <div>
                <span className="about-contrib-name">Cato</span>
                <span className="about-contrib-role">An AI · red team</span>
                <p>Tries to break every number before a report goes out.</p>
              </div>
            </li>
          </ul>
        </div>
      </main>

      {/* The old phone bar ("← back /agents get the book") came off with the old top bar: the
          homepage and the reports have neither, and two navs on a phone is not one nav. */}
      <SiteFooter current="/about" />
    </div>
  );
}
