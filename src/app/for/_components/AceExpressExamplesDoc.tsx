"use client";

// Tony McGuinness and Eamon Galavan, Ace Express Freight. The second page,
// built 1 Sep 2026, answering Tony's reply to the proposal.
//
// HIS EMAIL, 1 Sep 10:41, is the whole brief and it asks two things:
// "Can you please let us have some examples of what you have produced for some
// other companies so that we can see what this may look like ? Can you also
// advise how we can measure the outcome from this so that we can quantify what
// success look like ?"
//
// ⭐ THE WHY-NOW IS HIS OWN LINE: "Myself and Eamon are actively discussing how
// we move forward." Two people building a case between themselves, so the page
// has to answer both halves. The measurement half reads like Eamon's question.
//
// ⛔ THE PROPOSAL PAGE ALREADY HAS WRITTEN-UP CASE STUDIES ON IT (Miro, Moloco,
// Sabre, in prose) and he read it and still asked for examples. So prose is not
// what he is asking for. Every block here ends in a real thing on screen.
//
// ⛔ EVERY EXAMPLE IS REAL, NAMED AND PUBLISHED. Paul's call, 1 Sep, and it is
// the point: "Tony's asking me for a case of other examples. So this is an
// example from another brand. If I change it, then it's not an example." An
// invented freight version was proposed and killed for exactly that reason.
//
// ⛔ FOUR SENTENCES A BLOCK. Paul, 1 Sep: "We need about 4 sentences on each.
// Not a novel." The copy below was agreed in chat before any of it was built.
//
// ⚠️ THE SABRE WEBSITE LINE IS PAUL'S ACCOUNT of what they told him and exists
// in no email we hold. It is written as reported speech and must never be put
// in quote marks unless he produces the words.
//
// ⛔ NO TARGET NUMBERS ON THE MEASUREMENT SECTION. Every figure in the table is
// either Paul's own price or arithmetic off it: 8 posts x 3 people = 24 a
// month, EUR 99/month once built, and EUR 3,797 over three months = about
// EUR 1,266 a month. Nothing about followers, impressions or accounts is
// promised, and the honest line about what the writer will not do stays in.

import ProspectShell, { PPSection } from "./ProspectShell";
import { ScaledWindow } from "./library/AgentWindows";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import "./fidelity-cases.css";
import "./ace-examples.css";

const SARAH_POST =
  "https://www.linkedin.com/posts/sarahmcdonoughblossom_paytransparency-" +
  "changemanagement-hrleadership-activity-7471244435587166208-1E4U";
const DAVE_POST =
  "https://www.linkedin.com/posts/davehac_the-cloud-and-ai-invoice-grows-" +
  "every-month-activity-7495018163915493376-bib8";

const SECTIONS = [
  { id: "sabre", title: "Sabre" },
  { id: "di", title: "data intelligence" },
  { id: "eaton", title: "Eaton Square" },
  { id: "moloco", title: "Moloco" },
  { id: "measure", title: "How you would measure it" },
];

// ⛔ The rail must run in the same order as the page. A rail that disagrees
// with the page reads as a broken link rather than a different order.
const RAIL_GROUPS = [
  {
    label: "/the work",
    entries: [
      { id: "sabre", title: "Sabre", num: "01" },
      { id: "di", title: "data intelligence", num: "02" },
      { id: "eaton", title: "Eaton Square", num: "03" },
      { id: "moloco", title: "Moloco", num: "04" },
    ],
  },
  {
    label: "/and",
    compact: true,
    entries: [
      { id: "measure", title: "How you would measure it" },
        ],
  },
];

export default function AceExpressExamplesDoc() {
  return (
    <ProspectShell
      clientName="Ace Express Freight"
      eyebrow="Run with Foxes for Ace Express"
      title="Client examples"
      // Paul cut the standfirst and the "What this is" section on 1 Sep. The
      // page opens straight on Sabre.
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      railNote="Four real clients, then the numbers you would judge this on."
      bio={{ href: "/about", label: "About Paul" }}
    >
      <PPSection id="sabre" k="01" title="Sabre">
        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Sabre</div>
            <div className="pfd-meta">
              Travel technology &middot; writers, advertising, brand guardian
            </div>
          </div>
          <div className="pfd-cbody">
            <p>
              Sabre is a travel technology company. We built them three writers
              on one shared core, email first, then blog, then social, all
              carrying their positioning, their voice and a step that makes
              every checkable claim show its source. They used the first one
              through their rebrand and told us the website would not have been
              possible without it. We built their advertising too, where one
              approved ad becomes the whole set of sizes, and a brand guardian
              that checks a finished ad against their own guidelines before it
              goes out.
            </p>
          </div>
        </div>
        {/* ⛔ AdMachine is deliberately NOT here. Its files are our own dayone
            campaign, and under a heading that says Sabre that reads as their
            work. The two below are genuinely theirs: the guardian x-rays one of
            Sabre's real ads, and the creative director shows their agency's
            live ad beside our machine's rebuild of it. */}
        <CreativeDirector notes={false} />
        <BrandGuardian />
      </PPSection>

      <PPSection id="di" k="02" title="data intelligence">
        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">data intelligence</div>
            <div className="pfd-meta">
              Dave Hackett, Managing Director &middot; his own LinkedIn
            </div>
          </div>
          <div className="pfd-cbody">
            <p>
              Dave Hackett is the MD of dataintelligence.com. His ghostwriter
              reads his sources every week, works out what is worth writing
              about and who it is for, and writes the post in his own voice, and
              he reads it and publishes it himself. Here is one he published,
              which we came up with, wrote and made the video for. Ninety six
              reactions, sixteen comments, eleven reposts, and below it the
              sheet the writing arrives in every week.
            </p>
          </div>
        </div>

        {/* ⛔ His post as he published it, verbatim from LinkedIn. The video in
            it lives on LinkedIn and we do not hold the file, so the link below
            is how anyone sees it. Never trim or tidy the words. */}
        <div className="pae-post">
          <div className="pae-li">
            <div className="pae-li-hd">
              <div>
                <div className="pae-li-name">Dave Hackett</div>
                <div className="pae-li-role">
                  MD of dataintelligence.com and The Information Lab Ireland
                </div>
              </div>
            </div>
            <p>
              The Cloud and AI invoice grows every month, and nobody can quite
              explain why.
              <br />
              If you run a business with a five-figure cloud bill, you&rsquo;ll
              know that feeling already.
            </p>
            <p>
              For the past year, alongside The Information Lab Ireland,
              I&rsquo;ve been building something for it.
              <br />
              Today I&rsquo;m announcing dataintelligence.com, to help you and
              your colleagues see, understand and control your ever-growing
              Cloud and AI spend.
            </p>
            <p>Here&rsquo;s the problem we&rsquo;re solving.</p>
            <p>
              Industry research puts cloud waste at roughly 29% of
              infrastructure spend (Flexera, 2026), against a public cloud
              market Gartner sizes at $723bn. That is an enormous amount of
              money being spent on an area that is not understood.
            </p>
            <p>
              For the first time in five years the trend is moving the wrong
              way, and AI workloads are only accelerating it.
            </p>
            <p>
              It tends to be the thing nobody quite owns. Finance approves the
              bill, IT runs the data and AI estate, and between them the number
              keeps climbing.
            </p>
            <p>
              dataintelligence works in three steps. Connect, Diagnose,
              Optimise.
            </p>
            <p>
              We connect to your billing data, read-only and revocable,
              diagnose exactly where the spend is leaking, then take the waste
              out.
            </p>
            <p>The commercial model is the trust statement.</p>
            <p>
              The first 30 days are a free diagnostic. The two months after
              that are a free subscription.
              <br />
              We only start charging for the subscription once we&rsquo;ve
              found you savings. If we don&rsquo;t find any, you don&rsquo;t
              pay.
            </p>
            <p>
              Available today for Microsoft Azure and Microsoft Fabric, with
              Claude landing in 2026 and AWS, GCP and OpenAI in 2027.
            </p>
            <p>
              If your cloud or AI bill has become a number you can&rsquo;t
              explain, please contact me.
              <br />
              Book your free 30-day diagnostic here: https://lnkd.in/etVR48BH
            </p>
          </div>
          <div className="pae-li-stats">
            <span>96 reactions</span>
            <span>16 comments</span>
            <span>11 reposts</span>
          </div>
        </div>
        <p className="pae-cap">
          <a href={DAVE_POST} target="_blank" rel="noopener noreferrer">
            See the post, with the video, on LinkedIn
          </a>
        </p>

        <p className="pps-standfirst" style={{ marginTop: 34 }}>
          Dave simply goes into a Google sheet, which has the posts, who they
          are targeting, and the key messages.
        </p>
        <div style={{ marginTop: 20 }}>
          <ScaledWindow width={940}>
            <div className="ppw-blueprint">
              <div className="ppw-frame-win">
                <div className="ppw-tl">
                  <i />
                  <i />
                  <i />
                  <span className="ppw-t">this week&rsquo;s drafts</span>
                </div>
                <video
                  src="/for/ace-examples/di-sheet-scroll.mp4"
                  poster="/for/ace-examples/di-sheet-poster.jpg"
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
      </PPSection>

      <PPSection id="eaton" k="03" title="Eaton Square">
        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Eaton Square</div>
            <div className="pfd-meta">
              Sarah McDonough, Director &middot; her own LinkedIn
            </div>
          </div>
          <div className="pfd-cbody">
            <p>
              Sarah McDonough is a director at Eaton Square. Her LinkedIn posts
              are written by a writer built for her voice, and the artwork on
              them is ours as well. Here is one of them. The link is there if
              you want to see it where it sits.
            </p>
          </div>
        </div>
        <div className="pae-post">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/for/ace-examples/sarah-post.png"
            alt="A LinkedIn post published by Sarah McDonough of Eaton Square, on the EU Pay Transparency Directive, with the artwork underneath it."
          />
        </div>
        <p className="pae-cap">
          <a href={SARAH_POST} target="_blank" rel="noopener noreferrer">
            See the post on LinkedIn
          </a>
        </p>
        {/* ⛔ Verbatim from Sarah's own comment, Aug 2026. Her photo is her real
            LinkedIn picture. Never trimmed. */}
        <div className="pae-quote">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/for/ace-examples/sarah.jpg" alt="Sarah McDonough" />
          <div>
            <p>
              &ldquo;I&rsquo;m working with Paul at the moment and can honestly
              say he&rsquo;s one of the best in the business!&rdquo;
            </p>
            <div className="pae-who">
              Sarah McDonough, Business and People Consulting Leader, Eaton
              Square.
            </div>
          </div>
        </div>
      </PPSection>

      <PPSection id="moloco" k="04" title="Moloco">
        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Moloco</div>
            <div className="pfd-meta">
              Advertising technology, United States &middot; writers, fact
              checker, legal checker
            </div>
          </div>
          <div className="pfd-cbody">
            <p>
              Moloco is an advertising technology company in the United States,
              much larger than the others here. They were about to hire a
              copywriter and we built them writers instead, which are in use
              across their marketing now, with a fact checker and a legal
              checker alongside them. What decides whether a writer is any good
              is what goes into it, which is the positioning, the messaging
              framework, the pain points and the proof points. That is what
              makes what comes out usable rather than generic.
            </p>
          </div>
        </div>
        {/* ⛔ Verbatim as Paul pasted it from D'Arcy's LinkedIn recommendation,
            Aug 2026. Never tidied, never extended. The photo is the real
            person, from his own profile. */}
        <div className="pae-quote">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/for/ace-examples/darcy.jpg" alt="Paul D&rsquo;Arcy" />
          <div>
            <p>
              &ldquo;Paul Dervan is the person that I go to with questions on
              how best to use AI to do incredible things in marketing.&rdquo;
            </p>
            <div className="pae-who">
              Paul D&rsquo;Arcy, CMO at Moloco. Former CMO at Miro and Indeed.
            </div>
          </div>
        </div>
      </PPSection>

      <PPSection id="measure" k="05" title="How you would measure it">
        <table className="pae-tbl">
          <thead>
            <tr>
              <th>What you measure</th>
              <th>Previous 3 months without an AI writer</th>
              <th>With the writer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Time spent on content, across the three of you</td>
              <td className="pae-blank">&nbsp;</td>
              <td>About 3 hours a month, an hour each</td>
            </tr>
            <tr>
              <td>Content published</td>
              <td className="pae-blank">&nbsp;</td>
              <td>24 posts a month, 8 each</td>
            </tr>
            <tr>
              <td>What that content costs</td>
              <td className="pae-blank">&nbsp;</td>
              <td>&euro;99 a month once it is built</td>
            </tr>
          </tbody>
        </table>

        <p className="pps-standfirst" style={{ marginTop: 26 }}>
          As discussed on the call, writing on LinkedIn is good for thought
          leadership and signalling authority, and brands often need this for
          the moment somebody arrives at your profile and looks at what you have
          been saying. But it will not get them there in the first place on its
          own. For traffic, visitors and prospects you need outreach or other
          marketing efforts going out to people, such as a Growth Agent
          alongside this one.
        </p>
      </PPSection>

    </ProspectShell>
  );
}
