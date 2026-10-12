import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../home-next/NextNav";
import { hasAccess } from "@/lib/access";
import Contributors from "@/components/Contributors";
import a from "./about.module.css";

export const metadata = {
  title: "About - Run with Foxes",
  description:
    "Paul Dervan and the team at Run with Foxes, and how to get in touch. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.",
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
            {/* Paul, 29 Sep: "we dont' need my name here as have it just below". Kept for search engines and
                screen readers as the page's one heading, not shown. */}
            <h1 className={a.srOnly}>Paul Dervan</h1>
            <div className={a.bio} id="contact">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={a.bioPhoto} src="/Paul_photo.jpg" alt="Paul Dervan" />
              <div className={a.prose}>
                <p>Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland&apos;s Marketer of the Year in 2022.</p>
                <p>Trained by Peter Field, one half of Binet and Field. That obsession with effectiveness runs through everything here.</p>
                <p>Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paul, 30 Sep 2026: contact had nothing about us and About had no way to reach us, so they are
            one page. The contact page's own words, straight under the bio, so /about#contact (where "Talk to
            us" and /contact land) shows who he is and how to reach him on one screen. */}
        <div className={a.team}>
          <div className={a.lab}>/get in touch</div>
          <div className={a.touch}>
            <div />
            <div>
              <a className={a.book} href="https://cal.com/paul-dervan-mjfd50" target="_blank" rel="noopener noreferrer">
                Book a 30-minute strategy chat &rarr;
              </a>
            </div>
          </div>
          <ul className={a.people}>
            <li>
              <span className={a.role}>Email</span>
              <a className={a.name} href="mailto:paul@runwithfoxes.com">paul@runwithfoxes.com</a>
            </li>
            <li>
              <span className={a.role}>LinkedIn</span>
              <a className={a.name} href="https://www.linkedin.com/in/pauldervan/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pauldervan</a>
            </li>
            <li>
              <span className={a.role}>Substack</span>
              <a className={a.name} href="https://runwithfoxes.substack.com" target="_blank" rel="noopener noreferrer">runwithfoxes.substack.com</a>
            </li>
            <li>
              <span className={a.role}>Chat</span>
              <span className={a.name}>Talk to Isa, bottom right of any page</span>
            </li>
          </ul>
        </div>

        {/* Paul, 29 Sep 2026, later: the page text went ("detlete this from About us and make the page
            neater"), so the contributors sit under the bio on the same two edges: name and role under
            the photo, the description in line with the bio's words. */}
        <div className={a.team}>
          <Contributors />
        </div>

      </main>

      {/* The old phone bar ("← back /agents get the book") came off with the old top bar: the
          homepage and the reports have neither, and two navs on a phone is not one nav. */}
      <SiteFooter current="/about" />
    </div>
  );
}
