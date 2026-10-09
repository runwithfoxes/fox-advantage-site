import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { getAllNotes } from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";
import { formatDay } from "../resources/library";
import NextNav from "./NextNav";
import LibraryCard from "./LibraryCard";
import DoorButtons from "./DoorButtons";
import HeroJoin from "./HeroJoin";
import { hasAccess } from "@/lib/access";
import AgentsSection from "@/components/agents/AgentsSection";
import PhoneDemo from "./PhoneDemo";
import Proof from "./Proof";
import DataBand from "./DataBand";
import SectorPicker from "./SectorPicker";
import ResearchBands from "./ResearchBands";
import "@/components/agents/agents-section.css";
import { MODULES } from "../course/courseModules";
import { SERIES, editionsOf, seriesOf, reportHref } from "../resources/catalogue";
import f from "../resources/front.module.css";
import h from "../resources/hero.module.css";
import n from "./next.module.css";

export const metadata: Metadata = {
  title: "Run with Foxes",
  description:
    "Giving marketing teams an edge. Research, essays, a free course and the library, from a new kind of marketing consultancy in Dublin.",
};

/* Live from 29 Sep 2026. GEO Ireland's day-one reading came off the page that day: Paul has not
   signed the numbers off. When he does, the tracker in content.ts takes it back. */
const SHOW_NUMBERS = false;
const SHOW_SECTOR = false;


/**
 * /home-next. The Resource hub turned into the homepage, drawn at the size it is meant to
 * reach: ten trackers, six studies, eight writers, eight tools. Paul, 25 Sep 2026.
 * The headline is "Giving marketing teams an edge" (Paul, 27 Sep: "That's what we'll use for now").
 */
export default async function HomeNext() {
  /* A visitor this browser already knows gets Welcome back in the hero (29 Sep 2026). */
  const known = await hasAccess();
  /* Paul, 29 Sep: "add more essays here because it just looks like blank space". Ten rows. */
  /* The featured essay is drawn big on the left, so it stays out of the list beside it. */
  const FEATURED = "why-i-gave-my-agents-email-addresses";
  const essays = getAllEssays().filter((e) => e.slug !== FEATURED).slice(0, 6);
  /* Paul, 9 Oct 2026: "have your nuggets get captured on home page too, in the card on hero and
     also the what's new section. Currently it is just Lena and me." So Sam's research nuggets come
     in beside the diary: three of each, which leaves four of the ten rows for Paul's essays. */
  const diary = getAllDispatches().slice(0, 3);
  const nuggets = getAllNotes().slice(0, 3);
  const openMod = MODULES.find((m) => m.built);
  /* What's new. Paul, 29 Sep: "all the essays on the right should be a mix of mine and Lena's and
     Sam's. And we want names and circle icon beside each." So three writers, newest first, each row
     carrying who wrote it (the circles came off the same afternoon: too busy). Jeff's tracker row came out: it repeated the report above it. */
  type Who = "Paul Dervan" | "Lena" | "Sam";
  const news: { type: string; who: Who; t: string; href: string; iso: string }[] = [
    { type: "Report", who: "Sam" as Who, t: "The AI Ask, Q3 2026: 1 in 6 marketing jobs in Ireland asks for AI", href: "/resources/the-ai-ask/2026-q3", iso: "2026-09-25" },
    ...essays.slice(0, 5).map((e) => ({ type: "Essay", who: "Paul Dervan" as Who, t: e.title, href: `/essays/${e.slug}`, iso: e.date })),
    ...diary.map((d) => ({ type: "Diary", who: "Lena" as Who, t: d.title, href: `/diary/${d.slug}`, iso: d.date })),
    ...nuggets.map((x) => ({ type: "Research nugget", who: "Sam" as Who, t: x.title, href: `${NOTES.route}/${x.slug}`, iso: x.date })),
    ...(openMod ? [{ type: "Course", who: "Paul Dervan" as Who, t: openMod.title.replace(/^\(\d\)\s*/, ""), href: `/course/${openMod.n}`, iso: openMod.on }] : []),
  ]
    .sort((a, b) => b.iso.localeCompare(a.iso))
    .slice(0, 10);
  /* ⭐ THE HERO CARD'S LINES. Paul, 1 Oct 2026: "let's have like two thirds at least of the essays
     mine, and a third are Lena's and Sam's. Also, are you using all my essays? Because some of the
     good essays are earlier ones about distinctive brand assets, etc. So don't just use the most
     recent ones. Because the most recent ones are underneath the hero anyway."

     Before this the card was everything published, newest first: 60 rows, and the first twenty
     were mostly Lena's diary, with his earlier essays at the very bottom (Distinctive Brand
     Assets was row 57). Now:
      - every essay of his is in it, and they run the OTHER way to the list under the hero: the
        earlier ones first, with the one he named leading, and the newest seven last, because
        those are the ones already shown under the hero;
      - for every two of his there is one from Sam or Lena (Sam's reports first, then Sam's
        research nuggets and Lena's diary pieces turn about, newest first), so his share never
        drops under two thirds however many they write.
     The Answer pages, the module and the trackers are no longer in the card: it is essays,
     reports, research nuggets and the diary. The nuggets came in on 9 Oct 2026. */
  const LEAD = ["distinctive-brand-assets-in-an-ai-world"];
  const allEssays = getAllEssays();
  const underHero = new Set([FEATURED, ...essays.map((e) => e.slug)]);
  const essayLine = (e: (typeof allEssays)[number]) => ({ label: `Essay · Paul Dervan · ${formatDay(e.date)}`, title: e.title, href: `/essays/${e.slug}` });
  const mine = [
    ...LEAD.map((slug) => allEssays.find((e) => e.slug === slug)).filter((e): e is (typeof allEssays)[number] => Boolean(e)),
    ...allEssays.filter((e) => !underHero.has(e.slug) && !LEAD.includes(e.slug)),
    ...allEssays.filter((e) => underHero.has(e.slug) && !LEAD.includes(e.slug)),
  ].map(essayLine);
  const nuggetLines = getAllNotes().map((x) => ({ label: `Research nugget · Sam · ${formatDay(x.date)}`, title: x.title, href: `${NOTES.route}/${x.slug}` }));
  const diaryLines = getAllDispatches().map((d) => ({ label: `Diary · Lena · ${formatDay(d.date)}`, title: d.title, href: `/diary/${d.slug}` }));
  const turnAbout: { label: string; title: string; href: string }[] = [];
  for (let i = 0; i < Math.max(nuggetLines.length, diaryLines.length); i++) {
    if (nuggetLines[i]) turnAbout.push(nuggetLines[i]);
    if (diaryLines[i]) turnAbout.push(diaryLines[i]);
  }
  const theirs = [
    /* Every row is the newest edition of a real series from the catalogue, so every row has a
       page to open (Paul, 27 Sep: "users can click on them"). */
    ...SERIES.map((se) => editionsOf(se).filter((r) => r.status !== "coming")[0])
      .filter((r): r is NonNullable<typeof r> => Boolean(r))
      .sort((a, b) => Number(a.example) - Number(b.example) || b.date.localeCompare(a.date))
      .map((r) => ({ label: `Report · ${seriesOf(r).name}${r.example ? " · example" : ""}`, title: r.title, href: reportHref(r) })),
    /* Paul, 29 Sep: "We should include Lena's essays in the scrolling card on hero." */
    ...turnAbout,
  ].slice(0, Math.floor(mine.length / 2));
  const lines: { label: string; title: string; href: string }[] = [];
  mine.forEach((l, i) => {
    lines.push(l);
    if (i % 2 === 1 && theirs.length) lines.push(theirs.shift()!);
  });

  return (
    <div className={f.page}>
      {/* ── The header: film, headline, and the latest move ── */}
      <section className={`${h.hero} ${n.hero}`} id="top">
        {/* Approved hero film (fox-ads approved/homepage-hero), under its approved file name so a new
            cut from Dray swaps in by copying one file. Plays ONCE and rests on the beach: a walking
            fox cannot loop cleanly. Reduced motion gets the last frame as a still. Slow motion was
            tried and ruled out by Paul, 25 Sep: "the slow mo makes it feel generic ai". */}
        <video className={`${h.film} ${n.film}`} autoPlay muted playsInline preload="auto" poster="/resources/fox-hero-flip-poster-first-frame.jpg" src="/resources/fox-hero-flip-dublin-cliffs-beach-2206x946.mp4" />
        <div className={n.filmStill} aria-hidden />
        <NextNav known={known} />

        <div className={`${h.inner} ${n.heroInner}`}>
          <div className={h.text}>
            {/* Paul, 25 Sep: the headline and its line, no pill ("Less is more"), no "New study" line. */}
            <h1 className={h.title}>Giving marketing teams an edge</h1>
            <p className={h.sub}>
              A new kind of marketing consultancy that mixes old&#8209;school fundamentals, marketing
              rigour, creativity, craft and technology.
            </p>
            {/* Paul, 25 Sep: the sign-up moves here, into the space under his line. The card
                loses its own email box, so the hero asks once. */}
            <HeroJoin known={known} />
          </div>

          {/* The hub's own card: a flow of our research (Paul, 25 Sep). */}
          <div className={n.heroCardSlot}>
            <LibraryCard lines={lines} join={false} />
          </div>
        </div>
      </section>

      <DoorButtons />

      {/* Phone only (Paul, 26 Sep 2026): the card comes off the hero and sits here, still. */}
      <div className={n.phoneLib}>
        <LibraryCard lines={lines.slice(0, 6)} count={lines.length} join={false} still />
      </div>

      {/* The tracker strip came out (Paul, 25 Sep): with the scrolling card in the header, "there's too many things moving". */}
      <main className={f.wrap}>
        {/* ── The front page. Paul, 25 Sep: keep the big left side as the key feature, but "a space
             where I can feature like a figure or demo of agents work"; the right gives "a sense of
             essays, updates on reports, the course". The left slot takes any figure or agent window;
             today it is the Advertising Agent on our own course campaign (real ad, real numbers). ── */}
        <section className={n.front} id="latest">
          {/* Paul, 25 Sep: no "Featured" label, no title. The live hero's instruction, on a phone. */}
          {/* A feature piece that can stay up for weeks (Paul, 25 Sep): the essay's headline and
              opening, with the phone set into the text on the right. Smaller than the essay page,
              no fox. The text is the live essay's own opening, word for word. */}
          <article className={n.feature}>
            <span className={n.kicker}>Essay &middot; 28 Sept 2026</span>
            <h2 className={n.featTitle}>
              <Link href="/essays/why-i-gave-my-agents-email-addresses">Why I gave my agents email addresses</Link>
            </h2>
            <p className={n.featDek}>
              Three of my agents now send email from their own addresses, and why that is more honest
              than me clicking send.
            </p>
            {/* Paul, 25 Sep: a small photo and his name, editorial style. 29 Sep: both go to his bio on About. */}
            <Link href="/about" className={n.byline}>
              <img src="/Paul_photo.jpg" alt="" />
              <span>By <b>Paul Dervan</b></span>
            </Link>
            {/* Paul, 30 Sep: this essay in place of How I build proactive agents, the Klara phone kept. */}
            <div className={n.featBody}>
              <div className={n.featPhone}>
                <PhoneDemo />
              </div>
              <p>
                Three of my agents now have their own email addresses. Jo, my AI agent responsible for
                new business, is jo@runwithfoxes.com. Klara, my project manager, has one too, and so does
                Sam, who does a lot of research for me and with me. These three are autonomous and
                proactive, so they do things on their own.
              </p>
              <p>
                A part of my business, and a part of everybody&rsquo;s business, is sending things to
                people and emailing the things you said you would do. My agents could already write those
                emails. It&rsquo;s usually quite functional stuff, like the information someone wanted,
                something I said I&rsquo;d give them, an agreement to meet or a calendar invite. The last
                step was always me. I&rsquo;d go in, edit and review it to make sure it didn&rsquo;t sound
                crazy and wasn&rsquo;t incorrect, and then I&rsquo;d click send.
              </p>
              <p>
                But part of that feels slightly inauthentic. I&rsquo;d much rather have an agent send a
                client the information from its own address, saying that Paul asked it to. To me,
                that&rsquo;s a much more honest view of what&rsquo;s going on. Sam&rsquo;s signature says
                Sam is an agent.
              </p>
              <Link href="/essays/why-i-gave-my-agents-email-addresses" className={n.featMore}>
                Read the essay &rarr;
              </Link>
            </div>
          </article>

          <div className={n.newsCol}>
            <div className={n.featureHead}>
              <span className={n.recentLab}>/what&rsquo;s new</span>
            </div>
            <ol className={n.news}>
              {news.map((x) => (
                <li key={x.href + x.t} className={n.recentItem}>
                  {/* Paul, 29 Sep: "The circles are making it too busy... just use their name, with a
                      hyperlink on name to about us." */}
                  <Link href={x.href} className={n.recentT}>
                    {x.t}
                  </Link>
                  <span className={n.recentMeta}>
                    <Link href="/about#contributors" className={n.whoLink}>{x.who}</Link> &middot; {x.type} &middot; {formatDay(x.iso)}
                  </span>
                </li>
              ))}
            </ol>
            <div className={n.newsFoot}>
              <Link href="/essays">Essays →</Link>
              <Link href="/diary">Diary →</Link>
              <Link href={NOTES.route}>{NOTES.name} →</Link>
              {/* was /resources, which is this same page at a second address, so the link went nowhere
                  new (Cato, 30 Sep and 1 Oct 2026). The reports band is the research. */}
              <Link href="/#reports">Research →</Link>
              <Link href="/course">The course →</Link>
            </div>
          </div>
        </section>

        {/* The numbers band is HIDDEN, not deleted (Paul, 27 Sep): "is there not an overlap with these
            [Reports and papers]? ... they are reports." and "So these are like insights? ... find a way
            for them to turn up somewhere but less busy, but hide them for now." Flip SHOW_NUMBERS to
            bring the four insight cards back while a quieter home is found for them. */}
        {/* Paul, 27 Sep: "let's move the reports up to just under my first section", the essay. Your
            sector moved down under it; what that band means is still to be settled. */}
        <ResearchBands part="reports" />

        {SHOW_NUMBERS && <DataBand />}
        {/* Paul, 27 Sep: "we need to hide this for the moment, until we discuss it." */}
        {SHOW_SECTOR && <SectorPicker />}

        {/* The live homepage's agents section, whole: its inline reader, and the full-screen
            surface the four buttons under the hero open (Paul, 25 Sep). */}
        <div className={`${n.agentsWrap} ${n.agentsHidden}`}>
          <AgentsSection />
        </div>


        {/* The research and resources bands, under everything Paul settled on 25 Sep. Paul, 26 Sep:
            "the homepage does become the main research page, resources page... this is the place." */}
        <ResearchBands part="rest" tail={<Proof />} known={known} />
      </main>

      <SiteFooter current="/" wide />
    </div>
  );
}
