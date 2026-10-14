"use client";

// The proposal for Shannen O'Reilly, Sean O'Reilly and Kevin O'Regan,
// TrustDish. Built 14 Oct 2026 by Dray 2 from the ICS Medical proposal page
// (IcsMedicalProposalDoc.tsx), which is left alone, on Paul's decisions passed
// on by Jo 2 the same evening.
//
// The prototype is the main showcase (Paul: "I kind of feel that this is the
// main showcase"). It runs full width straight after "01 What I propose": a
// scroll film of the hub plays in a browser window, and the live prototype
// loads behind it so Shannen can try it there or in its own tab. The prototype
// itself is a static site at trustdish-hub-ec718b.vercel.app, built from
// ~/projects/clients/trustdish/hub-prototype.
//
// "04" shows the four agents inside the prototype, photographed from its own
// desk page, plus Shannen's video updates. The video example is Paul's own
// white handwriting test, never a made-up video of Shannen.
//
// One way to start: phase one at EUR 5,000 plus VAT. No hosting offer and no
// EUR 99 a month (Paul: "Don't offer for us to host it"). No days or day
// rates. Running costs are paid by TrustDish directly.
//
// HEADLINE, WHAT I PROPOSE and the monitoring cost are placeholders until Paul
// agrees the words with Jo 2.
import { useEffect, useRef, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css"; // the ppug- styles are shared; nothing in them names the group
import "./trustdish.css";

const HUB = "https://trustdish-hub-ec718b.vercel.app";
const HEADLINE = "[Headline: words still with Paul]";

const SECTIONS = [
  { id: "heard", title: "What I propose" },
  { id: "howiwork", title: "What we do" },
  { id: "pricing", title: "The price" },
  { id: "agents", title: "The agents behind it" },
];

type TeamItem = {
  id: string;
  num: string;
  name: string;
  short: string;
  dek: string;
  fig: () => React.ReactNode;
  note: React.ReactNode;
  k?: string;
};

function Shown({ a }: { a: TeamItem }) {
  return (
    <>
      <p className="pps-standfirst ppug-team-dek">{a.dek}</p>
      <figure className="ag-fig ppug-team-win">{a.fig()}</figure>
      <Note k={a.k}>{a.note}</Note>
    </>
  );
}

// The same panel as the ICS page: names on the left, the window on the right.
function TeamPanel({ items }: { items: TeamItem[] }) {
  const [on, setOn] = useState(0);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1000px)");
    const set = () => setWide(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);
  return (
    <div className="ppug-team">
      <nav className="ppug-team-list" aria-label="The agents">
        {items.map((a, i) => (
          <div key={a.id} id={a.id} className="ppug-team-row">
            <button
              type="button"
              className={`ppug-team-item${on === i ? " on" : ""}`}
              aria-pressed={on === i}
              onMouseEnter={() => wide && setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="ppug-team-n">{a.num}</span>
              <span className="ppug-team-name">{a.name}</span>
              <span className="ppug-team-short">{a.short}</span>
            </button>
            {!wide && on === i ? (
              <div className="ppug-team-under">
                <Shown a={a} />
              </div>
            ) : null}
          </div>
        ))}
      </nav>
      {wide ? (
        <div className="ppug-team-fig">
          <div className="ppug-team-fig-in" key={items[on].id}>
            <Shown a={items[on]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Note({ k = "/from the prototype.", children }: { k?: string; children: React.ReactNode }) {
  return (
    <p className="ppug-note">
      <span className="ppug-slash">{k}</span> {children}
    </p>
  );
}

// One picture of the prototype's own desk page, in a window.
function DeskShot({ src, w, h, title, alt }: { src: string; w: number; h: number; title: string; alt: string }) {
  return (
    <a className="ppug-site ppug-siteshot" href={`${HUB}/desk.html`} target="_blank" rel="noopener noreferrer">
      <span className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-site-url">Shannen&apos;s desk · {title}</span>
        <span className="ppug-site-pill">prototype</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={w} height={h} alt={alt} loading="lazy" />
    </a>
  );
}

// THE SHOWCASE. The film plays first. The live hub loads behind it, and
// "Try it here" swaps the film for the real thing in the same window. On a
// phone the window is too small to use, so the button opens it in a new tab.
function Showcase() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [wide, setWide] = useState(true);
  const [w, setW] = useState<number | undefined>(undefined);
  const box = useRef<HTMLDivElement>(null);
  // The window runs the width of the page with the same margin both sides as
  // the text column has on the left, so it sits centred under the words.
  useEffect(() => {
    const fit = () => {
      const el = box.current;
      if (!el) return;
      const left = el.parentElement ? el.parentElement.getBoundingClientRect().left : 0;
      setW(Math.max(0, Math.min(1320, document.documentElement.clientWidth - 2 * left)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 900px)");
    const set = () => setWide(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);
  return (
    <section className="pptd-show" aria-label="The TrustDish hub prototype">
      <div className="pptd-show-head">
        <p className="pptd-k">/the prototype</p>
        <p className="pptd-show-t">The TrustDish hub, built for you to try.</p>
        <p className="pps-standfirst pptd-show-s">
          Guides, tools, downloads, recipes and every allergen recall in Ireland and the UK. The recalls, the questions
          and the law are real, with sources. Anything marked Example or Planned is made up to show how it would work.
        </p>
      </div>
      <div className="ppug-site pptd-win" ref={box} style={w ? { width: w } : undefined}>
        <div className="ppug-site-bar">
          <span className="ppug-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="ppug-site-url">trustdish-hub-ec718b.vercel.app</span>
          {wide ? (
            <button type="button" className="pptd-try" onClick={() => setLive(!live)}>
              {live ? "Show the film" : ready ? "Try it here" : "Loading the live hub"}
            </button>
          ) : null}
          <a className="pptd-open" href={HUB} target="_blank" rel="noopener noreferrer">
            Open in a new tab ↗
          </a>
        </div>
        <div className="pptd-stage">
          {wide ? (
            <iframe
              src={HUB}
              title="The TrustDish hub prototype, live"
              className={live ? "on" : ""}
              onLoad={() => setReady(true)}
              loading="eager"
            />
          ) : null}
          <video
            className={live ? "off" : ""}
            src="/for/trustdish/hub-scroll.mp4"
            poster="/for/trustdish/hub-scroll-poster.jpg"
            width={1280}
            height={800}
            autoPlay
            muted
            loop
            playsInline
            aria-label="The TrustDish hub prototype scrolled from top to bottom: the hero, what's new, the guides, the tips, the chef card tool, the downloads, the label, the recipes, the forum report, Shannen's story, the app, the weekly email and the members' space."
          />
        </div>
      </div>
      <ul className="pptd-try-list">
        <li><a href={`${HUB}/tools.html`} target="_blank" rel="noopener noreferrer">Make a chef card</a> and print it</li>
        <li><a href={`${HUB}/recalls.html`} target="_blank" rel="noopener noreferrer">Filter the recalls</a> to your allergens</li>
        <li><a href={`${HUB}/downloads/14-allergens.pdf`} target="_blank" rel="noopener noreferrer">Download the 14 allergens</a> for the fridge</li>
        <li><a href={`${HUB}/desk.html`} target="_blank" rel="noopener noreferrer">See Shannen&apos;s desk</a>, where the agents&apos; work waits</li>
      </ul>
    </section>
  );
}

const TEAM: TeamItem[] = [
  {
    id: "ag-listen", num: "01", name: "The Listener", short: "reads the forums and groups every morning",
    dek: "Reads public allergy threads on Reddit, Mumsnet and other forums every morning, and brings back the questions worth answering with a suggested answer and its sources.",
    fig: () => <DeskShot src="/for/trustdish/agent-listener.jpg" w={1916} h={602} title="the listener" alt="A real r/AskIreland question about a café's wrong allergen note, beside a suggested answer with its sources, a Copy and open thread button and a Skip button." />,
    note: "The question is real and paraphrased, with no names kept. The answer is an example draft. Nothing is ever posted as Shannen: she copies it and posts it herself.",
  },
  {
    id: "ag-research", num: "02", name: "The Researcher", short: "recalls, the law and new studies, every day",
    dek: "Checks the FSAI and FSA alert lists, the law in Ireland and the UK, and new studies, every morning at 7.",
    fig: () => <DeskShot src="/for/trustdish/agent-researcher.jpg" w={1916} h={1150} title="the researcher" alt="A real FSA recall for Halo Foods peanut butter bars, a law watch on Owen's Law, and a toddler peanut study held back until the paper is read." />,
    note: "The recall, the law watch and the study are real, read on 14 Oct 2026.",
  },
  {
    id: "ag-writer", num: "03", name: "The Writer", short: "guides and the weekly email",
    dek: "Drafts the guides and the weekly email, and matches each reader to the recalls for their allergens. It writes as the TrustDish team, never as Shannen. Her note is hers.",
    fig: () => <DeskShot src="/for/trustdish/agent-writer.jpg" w={1084} h={1126} title="the writer" alt="Thursday's email from The TrustDish team to readers with peanuts on their profile, with a box at the bottom for a note from Shannen." />,
    note: "An example draft built from a real recall. The box at the bottom is for Shannen's own words, or nothing.",
  },
  {
    id: "ag-red", num: "04", name: "The Red Team", short: "every fact checked before Shannen sees it",
    dek: "Attacks every fact against its source before anything reaches Shannen, because a wrong allergen fact can kill.",
    fig: () => <DeskShot src="/for/trustdish/agent-redteam.jpg" w={1916} h={1272} title="the red team" alt="Six real catches: missing allergens on two recall cards, four missing FSA alerts, an answer that should have said use the pen and call 999 first, a study held back, and quote marks on paraphrases." />,
    k: "/real catches.",
    note: "These are real mistakes it caught while we built the prototype, fixed before anyone saw them.",
  },
  {
    id: "ag-video", num: "05", name: "Video Updates", short: "Shannen talks, the writing appears",
    dek: "Shannen records herself talking on her phone. Claude adds the writing on screen as she speaks, in white, by hand, timed to her words.",
    fig: () => (
      <div className="ppug-site">
        <div className="ppug-site-bar">
          <span className="ppug-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="ppug-site-url">handwriting on video · our own test</span>
          <span className="ppug-site-pill">example</span>
        </div>
        <video
          src="/for/trustdish/handwriting-example.mp4"
          poster="/for/trustdish/handwriting-example-poster.jpg"
          width={1280}
          height={720}
          autoPlay
          muted
          loop
          playsInline
          style={{ display: "block", width: "100%", height: "auto" }}
          aria-label="Paul Dervan talking to camera while white handwriting appears on the wall beside him: work your way through it, questions, an arrow to find me, and practice underlined."
        />
      </div>
    ),
    k: "/our own test.",
    note: "This is Paul in our own test. Shannen's updates would look like this, in her words, recorded by her.",
  },
];

export default function TrustDishDoc() {
  return (
    <ProspectShell
      clientName="TrustDish"
      eyebrow="Prepared for Shannen O'Reilly, Sean O'Reilly and Kevin O'Regan"
      title={HEADLINE}
      standfirst={[]}
      sections={SECTIONS}
      noRail
      topPicture={{
        src: "/for/trustdish/table.jpg",
        alt: "Friends passing plates of food across a restaurant table in the early evening.",
        width: 2400,
        height: 1029,
      }}
    >
      <div className="ppug pptd">
        <PPSection id="heard" k="01" title="What I propose">
          <p className="pps-standfirst pptd-ph">[What I propose: words still with Paul and Jo 2.]</p>
          <p className="pps-standfirst">
            The prototype below is the hub, built in your colours so you can see it and try it. It has the email sign-up
            and the personalised email, and behind it, Shannen&apos;s desk, where the agents&apos; work waits for her.
          </p>
        </PPSection>

        <Showcase />

        {/* WHAT WE DO. Paul's own copy, verbatim, as it ships on the ICS page. */}
        <PPSection id="howiwork" k="02" title="What we do">
          <p className="pps-hiw-line">Quality first, then automate</p>
          <p className="pps-hiw-by">Paul Dervan, Run with Foxes</p>
          <div className="pps-hiw-grid">
            <div className="pps-hiw-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Paul_photo.jpg" alt="Paul Dervan, Run with Foxes" />
            </div>
            <p className="pps-hiw-award">Ireland&rsquo;s Marketer of the Year, 2022</p>
            <p className="pps-standfirst">
              Before I build anything, I ask one question: what does really good look like here? Not what AI can do, but
              what the best version of this marketing would be, and the level of quality and effectiveness I would want
              to stand over.
            </p>
            <p className="pps-standfirst">
              So I start where I always have. If there were no AI at all, what team would I hire to do this properly? I
              map that team first, the one I would build in a world before any of this existed.
            </p>
            <p className="pps-standfirst">
              Then I build exactly that, with agents instead of hires. The quality bar is set by the team I would have
              wanted, not by whatever a tool happens to make easy. Twenty years in brand is what tells me where that bar
              sits: Head of Brand at O2 Ireland, then CMO at the National Lottery, Head of Brand at Indeed and Miro, both
              global roles. Positioning, messaging and tone written first, then built into everything the agents make.
            </p>
            <dl className="ppug-facts">
              <div>
                <dt>Who I work with</dt>
                <dd>
                  {["Moloco", "Heineken", "Norcros", "Alltech", "Smurfit", "Hostelworld", "Eaton Square", "Weatherbys"].map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Essays</dt>
                <dd>
                  {[
                    ["how-i-build-proactive-agents", "How I build proactive agents"],
                    ["how-i-build-an-ai-writer", "How I build an AI writer"],
                    ["build-a-system", "Build a system"],
                  ].map(([slug, title]) => (
                    <a key={slug} href={`/essays/${slug}`} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Free course</dt>
                <dd>
                  <a href="/course" target="_blank" rel="noopener noreferrer">
                    AI Fluency for Ambitious Marketers
                  </a>
                </dd>
              </div>
              <div>
                <dt>The book</dt>
                <dd>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    The Fox Advantage
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="ppug-quotes">
            <figure>
              <blockquote>
                &ldquo;His command of marketing science as well as his instincts for great thinking and ideas are, in my
                opinion, superb.&rdquo;
              </blockquote>
              <figcaption>
                <b>Peter Field</b> The Godfather of Effectiveness, author of The Long and the Short of It
              </figcaption>
            </figure>
            <figure>
              <blockquote>
                &ldquo;Paul reported into me as Head of Brand when I was at Indeed. I have learned more from him than
                anyone else in my career.&rdquo;
              </blockquote>
              <figcaption>
                <b>Paul D&rsquo;Arcy</b> CMO, Moloco. Former CMO at Miro and Indeed
              </figcaption>
            </figure>
          </div>
        </PPSection>

        <PPSection id="pricing" k="03" title="The price">
          <PricingCards
            cards={[
              {
                title: "Phase one: the hub",
                bullets: [
                  "The hub: guides, tools, downloads and recalls",
                  "The email sign-up",
                  "The personalised weekly email",
                  "The agents behind them",
                ],
                price: "€5,000 plus VAT",
                note: "To build. The members' space is phase two, priced later.",
              },
            ]}
          />
          <p className="ppp-covers-label">Running it</p>
          <p className="pps-standfirst">
            You get your own Claude licence. I build it and hand it over to you, and it runs there.
          </p>
          <p className="ppp-covers-label">Running costs you pay directly, not to us</p>
          <ul className="pps-standfirst pptd-costs">
            <li>
              <b>Your Claude licence</b>
            </li>
            <li>
              <b>The tools the listener uses</b> to look for sources all the time{" "}
              <span className="pptd-ph">[cost to come]</span>
            </li>
            <li>
              <b>€50 to €100 a month</b> put aside for image and video generation
            </li>
          </ul>
        </PPSection>

        <PPSection id="agents" k="04" title="The agents behind it">
          <p className="pps-standfirst ppug-lede">
            Four agents run the hub, and the fifth thing is Shannen&apos;s own voice. Move over a name to see it in the
            prototype.
          </p>
        </PPSection>
        <TeamPanel items={TEAM} />
        <div className="ppug-end">
          <CloseBox clientName="TrustDish" />
        </div>
      </div>
    </ProspectShell>
  );
}
