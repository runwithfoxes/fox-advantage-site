import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Answer Engine Optimization: 18 Things Worth Knowing",
  description:
    "Answer engine optimization (AEO) explained in 18 sourced points. What's measured, what's folklore, and what's changed since this was first written.",
};

const introStats = [
  "SparkToro and Similarweb's newer numbers put US zero-click Google searches at 68% across Jan-Apr 2026, up from 58% in 2024. That figure excludes the Google mobile app, so it's probably an undercount.",
  "Pew found that people clicked a link 8% of the time when an AI summary showed, against 15% when it didn't.",
  "Ahrefs has the number-one result losing 58% of its clicks when an AI Overview sits above it.",
  "BCG and Moloco's research suggests 33% of US adults now discover brands through personal AI agents, and 47% already use AI tools to research purchases.",
];

const points: { n: number; head: string; body: string; source?: string }[] = [
  {
    n: 1,
    head: "Ranking still feeds the answer, and it's the best-confirmed thing on this list",
    body: `Google's own guidance says SEO best practices "remain relevant for AI features in Google Search," and that "there are no additional requirements to appear in AI Overviews or AI Mode." AI Overviews are assembled from the normal search index. If you do not rank, you are not in the raw material. This part has not changed, and a meta-analysis across 54 separate AI-citation studies scores classic search rank at 9.4 out of 10 as a factor, the highest of anything measured. There's a newer wrinkle worth knowing too. It's not enough to rank for the one phrase someone types. AI engines fan a question out into a cluster of related sub-queries behind the scenes, and ranking for that whole cluster now scores 9.3, nearly as high. The target isn't one keyword any more. It's the neighbourhood around it.`,
    source: "Google Search Central; Cyrus Shepard, Zyppy Signal",
  },
  {
    n: 2,
    head: "The AI can only quote pages Google already knows about",
    body: `Before a page can turn up in an AI answer, Google has to have it filed in its index. If your page isn't in there, the AI can't see it, so it can't quote it. Google's free Search Console tells you which pages are filed. Fix that first. It's plain old SEO.`,
  },
  {
    n: 3,
    head: "Check you are not blocking the robots",
    body: `Cyrus Shepard went through 54 separate AI-citation studies and ranked the factors. The one at the top was dull: can the page be crawled at all, scoring 9.5 out of 10, the highest mark of anything tested. Sites often block the AI crawlers without realising.`,
    source: "Cyrus Shepard, Zyppy Signal",
  },
  {
    n: 4,
    head: `A lot of the "special GEO files" do nothing, and schema now has evidence against it`,
    body: `Google, in writing: "You don't need to create new machine readable files, AI text files, or markup." So the llms.txt file someone is trying to sell you does nothing for Google, and larger studies since have found it does close to nothing anywhere. Almost none of its traffic is even a search bot. Schema used to sit in the "probably doesn't help, might as well keep it" category. It doesn't sit there any more. Ahrefs ran a matched-control study on pages that added schema markup, and their AI Overview appearances went down, not up. Separately, someone built a test page with a price that existed only inside the schema markup, nowhere in the visible text, and handed it to five different AI engines. None of them found the price. They all read the rendered page a person would see and ignored the markup. Keep schema if you want it for rich results in classic Google search. Stop treating it as something that helps a model cite you, because the evidence now points the other way.`,
    source: "Google Search Central; Ahrefs, 2026; searchVIU, 2026",
  },
  {
    n: 5,
    head: "Human writing still wins the ranking that feeds the answer",
    body: `Semrush looked at 20,000 keywords and found human-written content in the top spot 80% of the time, against 9% for content it flagged as purely AI. Their own caveat: AI detectors are unreliable, and Semrush sells SEO tools. Take it as a lean, not a law.`,
    source: "Semrush, 2026",
  },
  {
    n: 6,
    head: "Move from the page to the sentence",
    body: `Here is a proper change from SEO. A search engine ranked pages. A model lifts a sentence. It does not cite your site, it quotes one clean line and moves on. So the question is not "is this page authoritative" but "can one sentence survive being pulled out and dropped into someone else's answer."`,
  },
  {
    n: 7,
    head: "Be worth quoting, but don't repeat the number like it's a fact",
    body: `The original academic work, a Princeton paper from 2024, built a simulated search engine out of GPT-3.5-turbo and tested it on synthetic content, competing sources fighting over a made-up query in an artificial setup. In that lab world, adding statistics, quotations and cited sources moved the needle by up to 40%. Keyword stuffing made things worse, and that finding holds up better than the headline one. The paper's own authors say real effects in a competitive niche are "likely smaller" than what showed up in the simulation. So take the direction, not the number: say specific, sourced, quotable things, and don't stuff keywords. Just don't repeat "up to 40%" as if it's a measured fact about ChatGPT or Google, because nobody's tested that on a live engine yet.`,
    source: "Aggarwal et al., KDD 2024",
  },
  {
    n: 8,
    head: "Answer early, and stop padding",
    body: `Dan Petrovic's work on how Gemini grounds its answers found about a third of a page gets considered at all, and a tight 800-word page got over half its content used against roughly 13% for a 4,000-word one. Put the answer near the top and let the page be short.`,
    source: "Dan Petrovic, DEJAN",
  },
  {
    n: 9,
    head: "Write headings that match the question, as good practice rather than a measured lever",
    body: `AirOps found pages whose headings closely matched the question got cited more often than pages with a weak match. That study hasn't been independently repeated, and a separate 2026 test found formatting matters far less than topical relevance once you control for it properly. So I wouldn't hang a strategy on an exact number here. The advice underneath it still holds: phrase the heading the way a person would ask it out loud. It's good writing, and it helps classic SEO regardless of whether it moves an AI citation on its own.`,
    source: "AirOps",
  },
  {
    n: 10,
    head: "The bulk of what AI says about you is not on your site",
    body: `AirOps: across the brand mentions they studied, 85% came from third-party sources. Reddit, reviews, comparison posts, YouTube. You can write the best page in the world and the model will still reach for what other people said about you. The public record is the battleground, and barely any of it is yours. Worth flagging: of the recycled GEO claims out there, this is one that held up under a second look. Multiple studies since put Reddit and forum content specifically at somewhere between 27% and 40% of what actually gets cited.`,
    source: "AirOps",
  },
  {
    n: 11,
    head: "Off-site is the actual work, especially in considered categories",
    body: `For a bank or a B2B tool, the answer a model gives is assembled from comparison sites, a forum thread from 2023, a handful of reviews. If that record is light, stale or confused, that is your exposure, and no amount of on-page polish fixes it.`,
  },
  {
    n: 12,
    head: "The engines do not agree with each other",
    body: `Back in early 2025, Seer found 87% of ChatGPT's search citations matched Bing's top results, and only 56% matched Google's (small sample, treat as directional).`,
    source: "Seer Interactive",
  },
  {
    n: 13,
    head: "Citation is a probability, not a position",
    body: `A rank holds still. An AI citation does not. Ask the same question twice and the sources can change. So the measure is "how often do we show up across a basket of the questions our buyers ask, tracked over time?" Anyone promising a fixed spot is selling certainty that does not exist. (More of an opinion than an empirical study.)`,
  },
  {
    n: 14,
    head: "Getting cited is worth real traffic, but keep it in proportion",
    body: `Seer's 2026 data: when cited in an AI Overview you get 120% more organic clicks per impression than when not. The footnote, which Seer make themselves, is that a result with no AI Overview at all still beats both. So a citation is the good outcome in a world with fewer clicks going anywhere, not a windfall.`,
    source: "Seer Interactive, 2026",
  },
  {
    n: 15,
    head: "Do not build a page per question",
    body: `The tempting move is to spin up a page for every variation a model might ask. Google names that as scaled content abuse. Put the answers into the pages you already have.`,
    source: "Google Search, spam policies",
  },
  {
    n: 16,
    head: "Make the boring pages do the work",
    body: `The help centre, the pricing edge cases, the compatibility notes, the FAQ you buried three clicks deep. This is now very good raw material. A plain sentence in a support doc gets quoted where a glossy homepage gets skipped. Your About and credibility pages are the cheapest win.`,
  },
  {
    n: 17,
    head: "Pages that finish a job beat pages that only explain",
    body: `Cyrus Shepard went through hundreds of winning and losing sites and found the survivors do more than inform, they get something done. His strongest performers are pages where the reader actually does the thing: a transaction, a tool or calculator, a forum where real people settle real questions. A model cannot hold the community, or take the booking. Specific, first-hand, useful content gets cited. The commodity stuff anyone could generate does not.`,
    source: "Cyrus Shepard, Zyppy Signal",
  },
  {
    n: 18,
    head: "Where this is heading: loyalty, then agents",
    body: `Two things on the horizon, both early. Google has started feeding the preferred sources a reader picks into AI Overviews, which turns earned loyalty into an input for AI visibility. And agentic search, where an assistant does the buying for you, is on Google's roadmap. It is coming but could be a while. Build for today's reader and you are building for both.`,
    source: "Google, Preferred Sources",
  },
];

export default function AeoHubPage() {
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
        <div className="avc-reading">
          <div className="rwf-label">/ guide</div>
          <h1 className="rwf-h1">
            Answer engine optimization: 18 things worth knowing about GEO
          </h1>
          <p className="rwf-standfirst">
            What has changed in search marketing, and what hasn't. Eighteen
            sourced, hedged points on GEO, also known as answer engine
            optimization, kept current as the evidence moves.
          </p>

          <div className="rwf-body">
            <p>
              For twenty years the job was to rank high and get clicks. But the
              click is no longer the holy grail. Here's 18 things worth knowing
              about GEO.
            </p>
            <p>In fairness, this was changing before the robots settled in:</p>
          </div>

          <ul className="geo-stats rwf-body">
            {introStats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="rwf-meta">
            Sources: SparkToro &amp; Similarweb, 2026 &middot; Pew Research, 2025
            &middot; Ahrefs, 2026 &middot; BCG &times; Moloco, 2026
          </p>

          <div className="rwf-body">
            <p>
              So the category got a name. GEO, generative engine optimisation,
              and a queue of people who updated their LinkedIn bio to match. Some
              of it is genuinely new. A good deal of it is the SEO we should have
              been doing anyway.
            </p>
            <p>
              A quick note on the name, since it's the reason some of you found
              this page. If you searched for "answer engine optimization", you're
              in the right place. AEO and GEO are the same practice wearing two
              different bits of jargon: getting the answer engines, ChatGPT,
              Perplexity, Google's AI Overviews, Copilot, to actually cite you. I
              call it GEO because that's what I was calling it before AEO caught
              on. That naming argument isn't settled, and it doesn't matter much.
              What matters is what's actually measured. So here's the list of 18
              things worth knowing about it, sourced, and refreshed as the
              evidence moves.
            </p>
          </div>

          <div className="geo-points">
            {points.map((p) => (
              <div key={p.n} className="geo-point">
                <h2 className="rwf-h3">
                  {p.n}. {p.head}
                </h2>
                <div className="rwf-body">
                  <p>{p.body}</p>
                </div>
                {p.source && <p className="rwf-meta">Source: {p.source}</p>}
              </div>
            ))}
          </div>

          <div className="rwf-body geo-close">
            <p>
              None of this is a dark art. It is being findable, being worth
              quoting, and being talked about in the places the machine already
              trusts.
            </p>
          </div>
        </div>
      </main>

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
