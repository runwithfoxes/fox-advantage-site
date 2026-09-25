import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { formatDay, getLibrary } from "../resources/library";
import { CATEGORIES } from "../resources/data";
import NextNav from "./NextNav";
import LibraryCard from "./LibraryCard";
import DoorButtons from "./DoorButtons";
import HeroJoin from "./HeroJoin";
import HeroFilm from "./HeroFilm";
import AgentsSection from "@/components/agents/AgentsSection";
import PhoneDemo from "./PhoneDemo";
import DataBand from "./DataBand";
import SectorPicker from "./SectorPicker";
import "@/components/agents/agents-section.css";
import { MODULES } from "../course/courseModules";
import { DESKS, TRACKERS, STUDIES, TOOL_CARDS, AREAS_NEXT, type Study } from "./content";
import f from "../resources/front.module.css";
import h from "../resources/hero.module.css";
import n from "./next.module.css";

export const metadata: Metadata = {
  title: "Run with Foxes",
  robots: { index: false, follow: false },
};

/* GEO Ireland day one (23 Aug 2026), NOT signed off by Paul: categories whose most-named
   answer is a state body. Counted off data.ts, never typed. */
const STATE_LED = CATEGORIES.filter((c) => c.owner === "state").length;
const GEO_READING = { value: String(STATE_LED), of: `of ${CATEGORIES.length} categories led by a state body`, last: "23 Aug" };

function Ex({ on = true }: { on?: boolean }) {
  return on ? <span className={f.ex}>Example</span> : null;
}

const SHADES = ["#E3EEF5", "#C4DCEA", "#6CAAC8", "#3A7CA5", "#2B5E80", "#1A3A4E"];

/** Each study gets its own drawing in the blues, and one subtle fox. No drawing carries a number. */
function Cover({ st }: { st: Study }) {
  return (
    <div className={n.cover}>
      <div className={n.coverTop}>
        <span>{st.no}</span>
        <span>Quarterly</span>
      </div>
      <div className={n.coverArt} aria-hidden>
        <svg viewBox="0 0 200 150" className={n.coverSvg}>
          {st.cover === "bars" &&
            CATEGORIES.map((c, i) => (
              <rect key={c.name} x={6 + i * 4.6} y={146 - c.rate * 130} width="3.4" height={c.rate * 130} fill={c.owner === "state" ? "#1A3A4E" : c.owner === "middle" ? "#6CAAC8" : "#CFCFC9"} />
            ))}
          {st.cover === "rings" && [70, 55, 40, 25, 10].map((r, i) => <circle key={r} cx="100" cy="76" r={r} fill={SHADES[i + 1]} />)}
          {st.cover === "blocks" && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 28} y={146 - (i + 1) * 21} width="20" height={(i + 1) * 21} fill={SHADES[i]} />)}
          {st.cover === "grid" &&
            Array.from({ length: 40 }).map((_, i) => <rect key={i} x={10 + (i % 8) * 23} y={8 + Math.floor(i / 8) * 28} width="19" height="24" fill={SHADES[(i * 7 + Math.floor(i / 8)) % 6]} />)}
          {st.cover === "dots" &&
            Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={14 + (i % 10) * 19} cy={14 + Math.floor(i / 10) * 24} r={3 + ((i * 13) % 7)} fill={SHADES[(i * 5) % 6]} />)}
          {st.cover === "steps" &&
            [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${10 + i * 36} 140 V${120 - i * 22} H${40 + i * 36}`} stroke={SHADES[i + 1]} strokeWidth="6" fill="none" />)}
        </svg>
        <img className={n.coverFox} src={`/fox/${st.fox}`} alt="" />
      </div>
      <div className={n.coverFoot}>{st.title}</div>
    </div>
  );
}

/**
 * /home-next. The Resource hub turned into the homepage, drawn at the size it is meant to
 * reach: ten trackers, six studies, eight writers, eight tools. Paul, 25 Sep 2026.
 * The headline is a placeholder on purpose: "Don't worry about the headline for the moment."
 */
export default function HomeNext() {
  const essays = getAllEssays().slice(0, 3);
  const diary = getAllDispatches().slice(0, 3);
  const openMod = MODULES.find((m) => m.built);
  const nextMod = MODULES.find((m) => !m.built);
  /* What's new: one list across every kind of thing we publish, newest first. Only real
     items, except where tagged. */
  const news: { type: string; who: string; t: string; href: string; day: string; ex?: boolean }[] = [
    { type: "Report", who: "Sam", t: "The AI Ask, Q3 2026: Irish marketing jobs take up AI, sales jobs don't", href: "/resources/the-ai-ask/2026-q3", day: "25 Sept 2026" },
    ...(essays[0] ? [{ type: "Essay", who: "Paul Dervan", t: essays[0].title, href: `/essays/${essays[0].slug}`, day: formatDay(essays[0].date) }] : []),
    { type: "Tracker", who: "Jeff", t: "About 1 in 14 new marketing and sales ads asks anything real about AI", href: "/resources/jobs-ai", day: "Read 24 Sept 2026" },
    ...(openMod ? [{ type: "Course", who: "Paul Dervan", t: openMod.title.replace(/^\(\d\)\s*/, ""), href: `/course/${openMod.n}`, day: nextMod ? `Module ${nextMod.n} opens ${nextMod.when}` : "" }] : []),
    ...(diary[0] ? [{ type: "Diary", who: "Lena", t: diary[0].title, href: `/diary/${diary[0].slug}`, day: formatDay(diary[0].date) }] : []),
    ...(essays[1] ? [{ type: "Essay", who: "Paul Dervan", t: essays[1].title, href: `/essays/${essays[1].slug}`, day: formatDay(essays[1].date) }] : []),
    { type: "Study", who: "Jess", t: "GEO Ireland: who five AI engines name across 41 categories of Irish life", href: "/resources/geo-ireland", day: "Day one, 23 Aug 2026" },
    { type: "Research", who: "Sam", t: "How other firms run free research, and what we took from it", href: "/resources", day: "Coming", ex: true },
  ];
  const trackers = TRACKERS.map((t) => (t.name === "AI answers in Ireland" ? { ...t, reading: GEO_READING } : t));
  const flagship = STUDIES[0];
  /* The card's lines, built the way the hub builds them: studies, trackers, then every
     published piece. Invented studies and trackers say "example" in their label. */
  const lines = [
    { label: "Report · The AI Ask · Q3 2026", title: "Irish marketing jobs take up AI, sales jobs don't", href: "/resources/the-ai-ask/2026-q3" },
    ...STUDIES.map((st) => ({ label: `Study ${st.no}${st.example ? " · example" : ""}`, title: st.title, href: st.href })),
    ...trackers.map((t) => ({ label: `Tracker${t.example ? " · example" : ""}`, title: t.what, href: t.href })),
    ...getLibrary()
      .filter((e) => !e.soon && e.type !== "Study")
      .map((e) => ({ label: `${e.type} · ${formatDay(e.date)}`, title: e.title, href: e.href })),
  ];

  return (
    <div className={f.page}>
      {/* ── The header: film, headline, and the latest move ── */}
      <section className={`${h.hero} ${n.hero}`} id="top">
        {/* Approved hero film (fox-ads approved/homepage-hero), under its approved file name so a new
            cut from Dray swaps in by copying one file. Plays ONCE and rests on the beach: a walking
            fox cannot loop cleanly. Reduced motion gets the last frame as a still. Slow motion was
            tried and ruled out by Paul, 25 Sep: "the slow mo makes it feel generic ai". */}
        <HeroFilm className={`${h.film} ${n.film}`} poster="/resources/fox-hero-flip-poster-first-frame.jpg" src="/resources/fox-hero-flip-dublin-cliffs-beach-2206x946.mp4" />
        <div className={n.filmStill} aria-hidden />
        <NextNav />

        <div className={`${h.inner} ${n.heroInner}`}>
          <div className={h.text}>
            {/* Paul, 25 Sep: the headline and its line, no pill ("Less is more"), no "New study" line. */}
            <h1 className={h.title}>Designing marketing teams</h1>
            <p className={h.sub}>
              A new kind of marketing consultancy that mixes old&#8209;school marketing fundamentals, marketing
              rigour, creativity, craft and technology.
            </p>
            {/* Paul, 25 Sep: the sign-up moves here, into the space under his line. The card
                loses its own email box, so the hero asks once. */}
            <HeroJoin />
          </div>

          {/* The hub's own card: a flow of our research (Paul, 25 Sep). */}
          <LibraryCard lines={lines} join={false} />
        </div>
      </section>

      <DoorButtons />

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
            <span className={n.kicker}>Essay &middot; 25 Sept 2026</span>
            <h2 className={n.featTitle}>
              <Link href="/essays/how-i-build-proactive-agents">How I build proactive agents</Link>
            </h2>
            <p className={n.featDek}>
              The rules I give my inbox agent so it follows things through, instead of telling me once
              and moving on.
            </p>
            {/* Paul, 25 Sep: a small photo and his name, editorial style */}
            <div className={n.byline}>
              <img src="/Paul_photo.jpg" alt="" />
              <span>By <b>Paul Dervan</b></span>
            </div>
            <div className={n.featBody}>
              <div className={n.featPhone}>
                <PhoneDemo />
              </div>
              <p>
                I have an agent that owns my inbox. It has two jobs. My inbox gets to zero every day,
                and nobody who wrote to me gets forgotten.
              </p>
              <p>
                It never sends an email. Every reply it writes is a draft, and I review, edit and press
                send. It never deletes anything either. Every email gets a label, so I can still search
                for it.
              </p>
              <p>
                It used to be reactive. It would tell me about an email and then do nothing about it.
                If I didn&rsquo;t answer, it was forgotten. So I gave it a few rules, and now it follows
                things through. These are the rules.
              </p>
              <p>
                If a person wrote to me and I haven&rsquo;t replied, it matters. The only emails it can
                ignore are the ones a machine sent, like newsletters. If you let the agent decide
                what&rsquo;s important, anything it doesn&rsquo;t recognise goes in a pile marked
                &ldquo;unsure&rdquo;. Then you have to go through that pile yourself, which is the job
                you gave it.
              </p>
              <Link href="/essays/how-i-build-proactive-agents" className={n.featMore}>
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
                  {/* Paul, 25 Sep: like the live homepage's /recent essays list. Mono title, no
                      bold, no pictures, one quiet meta line. */}
                  <Link href={x.href} className={n.recentT}>
                    {x.t}
                  </Link>
                  <span className={n.recentMeta}>
                    {x.type} &middot; {x.day} &middot; {x.who} {x.ex ? <Ex /> : null}
                  </span>
                </li>
              ))}
            </ol>
            <div className={n.newsFoot}>
              <Link href="/essays">Essays →</Link>
              <Link href="/diary">Diary →</Link>
              <Link href="/resources">Research →</Link>
              <Link href="/course">The course →</Link>
            </div>
          </div>
        </section>

        <DataBand />
        <SectorPicker />

        {/* The live homepage's agents section, whole: its inline reader, and the full-screen
            surface the four buttons under the hero open (Paul, 25 Sep). */}
        <div className={`${n.agentsWrap} ${n.agentsHidden}`}>
          <AgentsSection />
        </div>

        {/* Everything below here moved to /home-next/more (Paul, 25 Sep). */}
        <div className={n.moreLink}>
          <Link href="/home-next/more">Trackers, studies, tools and the ten agents &rarr;</Link>
        </div>
      </main>

      <SiteFooter current="/" wide />
      <div className={f.banner}>
        Mockup, 25 Sep 2026. The homepage at full scale. Anything tagged Example is made up. GEO Ireland numbers are day one and not signed off. The headline is a placeholder.
      </div>
    </div>
  );
}
