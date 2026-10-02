"use client";

// The proposal for Dearbhla O'Brien, CEO of Drinkaware, and Amy, their Digital
// Officer. Discovery call 7 Sep 2026, transcript in
// paul-hub/clients/drinkaware/meetings/. She agreed on the call to a
// distinctive brand character ("I think that's perfect actually") and named
// training as what they need ("the training on how to make the AI do what we
// wanted to do").
//
// Agreed with Paul in /jo on 21 Sep: Paddy Geraghty creates the character in a
// three to four week piece of work (Paul, 21 Sep: not one week), about EUR 10,000, and bills Drinkaware himself. Run with
// Foxes builds the creative director agent around it and trains Amy, EUR 5,000
// plus VAT, build, train and leave. No podcast. The Advertising Agent is shown
// after the price as what comes next, and is not proposed.
//
// Modules: creative-director, training-teams, advertising-agent (after price).

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow } from "./library/AgentWindows";
import CreativeDirector from "./library/CreativeDirector";
import AdMachine from "./library/AdMachine";
import "./library/four-things.css";
import "./pricing.css";

// Paddy's name links to his own site everywhere it sits in the prose. Paul,
// 21 Sep: a blue link so it reads as one, opening in a new tab so the reader
// keeps this page.
function Paddy({ full = false }: { full?: boolean }) {
  return (
    <a
      href="https://www.kv13.net/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#3A7CA5", textDecoration: "underline" }}
    >
      {full ? "Paddy Geraghty" : "Paddy"}
    </a>
  );
}

const SECTIONS = [
  { id: "heard", title: "What we propose" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "character", title: "The character" },
  { id: "creative", title: "The creative director agent" },
  { id: "training", title: "Training Amy" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
  { id: "later", title: "What else the character can do" },
];

const RAIL_GROUPS = [
  {
    label: "/the work",
    entries: [
      { id: "character", title: "The character", num: "01" },
      { id: "creative", title: "The creative director agent", num: "02" },
      { id: "training", title: "Training Amy", num: "03" },
      { id: "howitworks", title: "How it would work", num: "04" },
      { id: "pricing", title: "The price", num: "05" },
      { id: "later", title: "What else the character can do", num: "06" },
    ],
  },
];

export default function DrinkawareDoc() {
  return (
    <ProspectShell
      clientName="Drinkaware"
      eyebrow="Prepared for Dearbhla O'Brien and Amy, Drinkaware"
      title="A character for Drinkaware, and the tools to use it every day"
      titleHl="character"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      <PPSection id="heard" k="01" title="What we propose">
        <p className="pps-standfirst">
          We propose to create a character for Drinkaware, and to build the
          tools that let your team make new work with it whenever you need it.
        </p>
        <p className="pps-standfirst">
          <Paddy full /> would create the character with you over three to
          four weeks. We would then build a creative director agent around it, so
          that Amy can ask for a piece of work in plain English, such as the
          character at a festival or at a Halloween party, and get back images
          and short clips that are on brand every time. Then we would train Amy
          to use it and hand it over.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim, as it ships on Brosnan. */}
      <PPSection id="howiwork" k="02" title="What we do">
        <p className="pps-hiw-line">Quality first, then automate</p>
        <p className="pps-hiw-by">Paul Dervan, Run with Foxes</p>
        <div className="pps-hiw-grid">
          <div className="pps-hiw-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Paul_photo.jpg" alt="Paul Dervan, Run with Foxes" />
          </div>
          <p className="pps-hiw-award">
            Ireland&rsquo;s Marketer of the Year, 2022
          </p>
          <p className="pps-standfirst">
            Before I build anything, I ask one question: what does really good
            look like here? Not what AI can do, but what the best version of
            this marketing would be, and the level of quality and
            effectiveness I would want to stand over.
          </p>
          <p className="pps-standfirst">
            So I start where I always have. If there were no AI at all, what
            team would I hire to do this properly? I map that team first,
            the one I would build in a world before any of this existed.
          </p>
          <p className="pps-standfirst">
            Then I build exactly that, with agents instead of hires. The
            quality bar is set by the team I would have wanted, not by
            whatever a tool happens to make easy. Twenty years in brand is
            what tells me where that bar sits: Head of Brand at O2 Ireland,
            then CMO at the National Lottery, Head of Brand at Indeed and
            Miro, both global roles. Positioning, messaging and tone written
            first, then built into everything the agents make.
          </p>
          <div className="pps-hiw-cli">
            <p className="pps-hiw-cli-k">Who I work with</p>
            <div className="pps-hiw-cli-l">
              {[
                "Moloco",
                "Heineken",
                "Norcros",
                "Alltech",
                "Smurfit",
                "Hostelworld",
                "Eaton Square",
                "Weatherbys",
              ].map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  [
                    "distinctive-brand-assets-in-an-ai-world",
                    "Distinctive brand assets in an AI world",
                  ],
                  ["build-a-system", "Build a system"],
                ].map(([slug, title]) => (
                  <li key={slug}>
                    <a
                      href={`/essays/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="pps-hiw-cli-k">Free course</p>
              <ul className="pps-hiw-ll">
                <li>
                  <a href="/course" target="_blank" rel="noopener noreferrer">
                    AI Fluency for Ambitious Marketers
                  </a>
                </li>
              </ul>
              <p className="pps-hiw-cli-k" style={{ marginTop: 18 }}>
                The book
              </p>
              <ul className="pps-hiw-ll">
                <li>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    The Fox Advantage
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pps-hiw-quotes">
          <div className="pps-hiw-q">
            <p>
              &ldquo;His command of marketing science as well as his instincts
              for great thinking and ideas are, in my opinion, superb.&rdquo;
            </p>
            <div className="pps-hiw-who">
              <b>Peter Field</b>
              <br />
              The Godfather of Effectiveness, author of The Long and the Short
              of It
            </div>
          </div>
          <div className="pps-hiw-q">
            <p>
              &ldquo;Paul reported into me as Head of Brand when I was at
              Indeed. I have learned more from him than anyone else in my
              career.&rdquo;
            </p>
            <div className="pps-hiw-who">
              <b>Paul D&rsquo;Arcy</b>
              <br />
              CMO, Moloco. Former CMO at Miro and Indeed
            </div>
          </div>
        </div>
      </PPSection>

      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
        <FourThingsFigure />
      </PPSection>

      <PPSection id="character" k="04" title="The character">
        <p className="pps-standfirst">
          <Paddy full /> is the creative director behind the National Lottery
          work I ran, including the waterslides. He is
          independent and he works with AI.
        </p>
        <p className="pps-standfirst">
          Over three to four weeks he would work with you on who the character is
          and the role it plays for Drinkaware, then create it and a first set
          of images and short clips. The aim is a character your team can use in
          ads, organic posts and other communications on an ongoing basis,
          without needing technical skills to recreate it. <Paddy /> would quote
          and invoice you for this part of the work himself.
        </p>
      </PPSection>

      <PPSection id="creative" k="05" title="The creative director agent">
        <p className="pps-standfirst">
          Once the character exists, we would build a creative director agent
          around it. It holds the character, your colours, fonts and tone of
          voice, and it turns a short request into a proper brief before it
          makes anything. Amy could ask for the character on a bank holiday
          weekend, at Electric Picnic or during Dry January, and get back work
          that looks like Drinkaware every time. The example below is one we
          built and run for Sabre.
        </p>
        <div style={{ marginTop: 26 }} />
        <CreativeDirector opening="This creative director agent would be trained on copywriting too." />
      </PPSection>

      <PPSection id="training" k="06" title="Training Amy">
        <div style={{ marginTop: 6 }}>
          <ScaledWindow width={940}>
            <div className="ppw-blueprint">
              <div className="ppw-frame-win">
                <div className="ppw-tl">
                  <i />
                  <i />
                  <i />
                  <span className="ppw-t">the course, module one</span>
                  <span className="ppw-live-pill">free, live now</span>
                </div>
                <video
                  src="/for/training/course-module-1-scroll-web.mp4"
                  poster="/for/training/course-module-1-scroll-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </ScaledWindow>
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          We would train Amy to use the agent and to change it, working on your
          own requests from the calendar of topics you already plan around. The
          aim is that making a new piece with the character becomes a small task
          in her week. Above is the first module of our free course, which shows
          how we teach.
        </p>
      </PPSection>

      <PPSection id="howitworks" k="07" title="How it would work">
        <p className="pps-standfirst">
          <Paddy />&rsquo;s work comes first. Once the character is agreed, we
          build the creative director agent and test it with Amy on real
          requests until the work is right. Then we train her and hand it over.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The agent runs in your own Claude account, so it is yours to keep.
        </p>
      </PPSection>

      <PPSection id="pricing" k="08" title="The price">
        <PricingCards
          cards={[
            {
              title: "The character and the creative director agent",
              bullets: [
                "The character, created with you over three to four weeks",
                "The creative director agent, built around the character and your brand",
                "Training for Amy, then handed over and yours to keep",
              ],
              lines: [
                { label: "Character development, Paddy Geraghty", value: "€10,000" },
                { label: "Creative director agent and training", value: "€5,000" },
              ],
              price: "€15,000 plus VAT",
              note: "Total. Paddy invoices the character development himself.",
            },
          ]}
        />
        <CoversGrid
          covers={[
            "Creating the character and a first set of images and short clips",
            "Building and testing the agent",
            "Setting it up in your own Claude account",
            "Training Amy to run it and change it",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "A Claude subscription, and the image and video tools the agent uses",
          ]}
        />
        <CloseBox clientName="Drinkaware" />
      </PPSection>

      <PPSection id="later" k="09" title="What else the character can do">
        <AdMachine />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Once the character and the agent are in place, the same setup can
          take one approved ad and make every size you need for Instagram,
          TikTok, Facebook and LinkedIn. We would price that separately if you
          want it later.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
