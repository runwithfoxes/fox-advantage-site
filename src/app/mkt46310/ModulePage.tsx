import Link from "next/link";
import Bars from "./Bars";
import Rail from "./Rail";
import { ADS, WORK, TOOLS, QUOTES, PILLARS, BEHAVIOURS, MAKE, GYM_AGENTS, PROJECT_DATES, CLASSES } from "./moduleData";

/* The page behind the door. The same bones as /zorro and a course module: the rail on the
   left, the masthead and the numbered items on the right. Every heading is a full sentence
   and the copy is one size (Paul's rules for anything students read). */

/* Class 1 is taught from this page, so it has parts. The order is the running order in
   class-1-content-draft-5.docx. A class gets its parts when its material is written. */
const PARTS_1 = [
  { rail: "What the module is for", t: "The aim is that you leave as a marketer who is very good at digital." },
  { rail: "What employers want", t: "We read 85 Irish job ads to see what employers ask for." },
  { rail: "Pillars and behaviours", t: "The module is built on three pillars: tools, knowledge and behaviour." },
  { rail: "The team project", t: "Your team creates a digital marketing agency." },
];

const RAIL = CLASSES.map((c, i) => ({ short: c.short, parts: i === 0 ? PARTS_1.map((p) => p.rail) : undefined }));

const FINDINGS: { n: number; of?: number; t: string; text: string }[] = [
  {
    n: 73,
    t: "Nearly every job asks you to report on results.",
    text: "Whatever else the job is, the person has to say what happened and what to do next. In this module we call this analytics, and it is part of every tools class.",
  },
  {
    n: 59,
    t: "Making things is most of the work.",
    text: "Content and copywriting is in 59 of the 85 ads and social media in 54. 25 ask the person to shoot or edit photo and video, and 6 of those ask them to appear on camera.",
  },
  {
    n: 30,
    t: "About 1 in 3 of these jobs ask you to manage an agency.",
    text: "30 of the 85 ask the person to manage agencies or outside suppliers. This matters for the project, because your team creates an agency.",
  },
  {
    n: 5,
    t: "Few of these are first jobs.",
    text: "5 of the 85 are graduate, junior or assistant jobs. 49 ads say how many years they want, and 34 of those 49 ask for three years or more. These ads show you the job you will be doing in two or three years, so they tell you what to learn first.",
  },
  {
    n: 21,
    t: "About 1 in 4 of these ads ask for AI.",
    text: "15 of the 21 say what the person will do with AI or name a tool, and 6 of those 15 are about being found in AI search. Two of the 21 are ads from one company that mention “agent-led growth” and do not say what they mean by it. Without those two it is 19 of 85.",
  },
  {
    n: 0,
    t: "No ad asks for a marketing fundamental.",
    text: "Employers do not ask for the fundamentals of marketing, and this is why many digital marketers never learn them. This module teaches them.",
  },
];

function ClassTop({ i }: { i: number }) {
  const c = CLASSES[i];
  return (
    <header className="mk-ctop">
      <p className="mk-cmeta">
        Class {String(i + 1).padStart(2, "0")} &middot; {c.when}
        {c.where ? ` · ${c.where}` : ""}
      </p>
      <h2 className="mk-cname">{c.name}</h2>
      <span className="mk-ctag">{c.pillar}</span>
    </header>
  );
}

function ClassRows({ i }: { i: number }) {
  return (
    <dl className="mk-crows">
      {CLASSES[i].rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Part({ j }: { j: number }) {
  return (
    <div className="mk-parttop" id={`c1p${j + 1}`}>
      <span className="mod-n">{String(j + 1).padStart(2, "0")}</span>
      <h3 className="mod-h3">{PARTS_1[j].t}</h3>
    </div>
  );
}

export default function ModulePage() {
  return (
    <div className="mod-shell mk">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <span className="chapter-nav-back">UCD Smurfit &middot; MKT46310</span>
      </header>

      {/* Paul, 10 Oct: "a fox looking sharp in a modern agency boardroom for a digital agency. Blue skies out
          the window." Then: "a crisp white shirt and suit. Think Mad Men." Take 3 of three. */}
      <div className="mk-top">
        <img src="/mkt46310/top.jpg" alt="The fox in a dark suit, white shirt and narrow tie, standing at the head of a long table in an agency boardroom, with blue sky and a city through the windows" />
      </div>

      <div className="mod-grid">
        <div className="mod-railcol">
          <Rail classes={RAIL} />
        </div>

        <div className="mod-maincol">
          <header className="mod-masthead">
            <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Autumn 2026</p>
            <h1 className="mod-h1">
              AI and Digital Marketing <span className="mod-hl">Strategy</span>
            </h1>
            <p className="mod-standfirst">
              This is the page for the module, and it stays here for the whole term. It has the
              twelve classes, one after the other, and the files you download. We work through it
              in class.
            </p>
            <p className="mod-standfirst">
              I&rsquo;m Paul Dervan. I run a marketing consultancy that mixes old-school
              fundamentals, marketing rigour, creativity, craft and technology.
            </p>
            <div className="mod-meta">
              <span>
                First class<b>Monday 12 October, 13:30, Room N304</b>
              </span>
              <span>
                Teams<b>Four or five people</b>
              </span>
              <span>
                Laptop<b>From Monday 19 October</b>
              </span>
              <span>
                Marks<b>Portfolio 20%, exam 80%</b>
              </span>
            </div>
          </header>

          <main>
            {/* Class 1, written out in full because it is taught from this page */}
            <article className="mod-item mk-classitem" id="c1">
              <ClassTop i={0} />
              <ClassRows i={0} />

              <Part j={0} />
              <p className="mod-body">
                First, you will learn what digital marketers do today and what employers ask for.
                Every employer expects this.
              </p>
              <p className="mod-body">
                Second, you will get practical experience of where digital marketing is going. This
                is what puts you ahead of other people going for the same job.
              </p>
              <p className="mod-body">
                Third, you will learn the fundamentals of good marketing. Many digital marketers
                never learn them.
              </p>


              <Part j={1} />
              <p className="mod-body">
                In this class we look at what they ask for. The ads were posted between October 2025 and September 2026. We read 108 ads with
                a digital, social media or content job title, and kept the 85 that are digital
                marketing jobs in an employer&rsquo;s marketing, communications or ecommerce team.
              </p>

              <h3 className="mk-sub">A digital marketing job is many jobs in one.</h3>
              <figure className="mk-fig">
                <Bars rows={WORK} total={ADS} label="The kinds of work the 85 job ads ask for, most common first." />
                <figcaption className="mk-cap">
                  / how many of the 85 ads ask for each kind of work. The typical ad asks for 6 kinds of work.
                </figcaption>
              </figure>

              <ul className="mk-finds">
                {FINDINGS.map((f) => (
                  <li key={f.t}>
                    <span className="mk-fnum">
                      <b>{f.n}</b>
                      <i>of 85</i>
                    </span>
                    <span className="mk-ftext">
                      <strong>{f.t}</strong>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="mk-sub">No one tool is named in more than a quarter of the ads.</h3>
              <figure className="mk-fig">
                <Bars rows={TOOLS} total={ADS} lead={2} label="The tools the 85 job ads name, most common first." />
                <figcaption className="mk-cap">
                  / how many of the 85 ads name each tool. 29 ads name no tool at all. 3 name an AI tool,
                  and all three name ChatGPT.
                </figcaption>
              </figure>

              <h3 className="mk-sub">This is what the ads sound like.</h3>
              <div className="mk-quotes">
                {QUOTES.map((q) => (
                  <blockquote key={q}>&ldquo;{q}&rdquo;</blockquote>
                ))}
              </div>
              <p className="mk-cap">
                / word for word from four of the ads. One person read all the ads, most of them came from
                one job site, and ads with a general marketing job title were not included.
              </p>

              <div className="mod-reading mk-links">
                <span className="mod-readinglbl">Read more</span>
                <ul className="mod-frows">
                  <li className="mod-frow">
                    <Link className="mod-fname" href="/mkt46310/job-ads">
                      The job ads
                    </Link>
                    <span className="mod-fwhat">
                      Read twelve of the 85 ads in full, and download all 85 as one file.
                    </span>
                    <Link className="mod-readinglink" href="/mkt46310/job-ads">
                      Open
                    </Link>
                  </li>
                  <li className="mod-frow">
                    <a className="mod-fname" href="/resources/the-ai-ask/2026-q3" target="_blank" rel="noopener">
                      The AI Ask
                    </a>
                    <span className="mod-fwhat">
                      Our report on what Irish job ads for marketing jobs ask for when they ask for AI.
                    </span>
                    <a className="mod-readinglink" href="/resources/the-ai-ask/2026-q3" target="_blank" rel="noopener">
                      Open
                    </a>
                  </li>
                  <li className="mod-frow">
                    <a className="mod-fname" href="/resources/library" target="_blank" rel="noopener">
                      The library
                    </a>
                    <span className="mod-fwhat">
                      Every prompt, link and file from our free AI course for marketers. It is free when you sign up.
                    </span>
                    <a className="mod-readinglink" href="/resources/library" target="_blank" rel="noopener">
                      Open
                    </a>
                  </li>
                </ul>
              </div>

              <Part j={2} />
              <div className="mk-pillars">
                {PILLARS.map((p, i) => (
                  <div className="mk-pillar" key={p.name}>
                    <span className="mk-pk">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mk-pname">{p.name}</span>
                    <p>{p.what}</p>
                    <span className="mk-pads">{p.ads}</span>
                  </div>
                ))}
              </div>

              <h3 className="mk-sub">There are five behaviours of marketers who do well.</h3>
              <ol className="mk-rows">
                {BEHAVIOURS.map(([name, what], i) => (
                  <li key={name}>
                    <span className="mk-rk">{i + 1}</span>
                    <span className="mk-rname">{name}</span>
                    <span className="mk-rtext">{what}</span>
                  </li>
                ))}
              </ol>

              <Part j={3} />
              <p className="mod-body">
                You work in a team of four or five. Your team creates a digital marketing agency and
                builds what an agency needs: a website, a list of clients, emails and a plan to win
                work.
              </p>
              <p className="mod-body">
                The agency is not a real business. It has no real clients, it spends no money, and
                nothing is sent to a real person.
              </p>

              <h3 className="mk-sub">Your team decides what kind of agency it is.</h3>
              <p className="mod-body">
                It can be any kind of agency, as long as it sells digital services. Your team also
                decides who its clients are. Do the research before you decide. Look at who buys
                these services, what they pay for now, and which agencies already sell to them.
              </p>

              <h3 className="mk-sub">Your agency needs nine things.</h3>
              <ol className="mk-rows">
                {MAKE.map(([name, text], i) => (
                  <li key={name}>
                    <span className="mk-rk">{i + 1}</span>
                    <span className="mk-rname">{name}</span>
                    <span className="mk-rtext">{text}</span>
                  </li>
                ))}
              </ol>

              <h3 className="mk-sub">Agents do the work of your agency.</h3>
              <p className="mod-body">
                This is the rule that makes this project different. Your agency does not have to
                sell agents to its clients. But your team must use agents to run the agency.
              </p>
              <p className="mod-body">
                A marketing agent is an AI that does one marketing job for you. Asking Claude a
                question in a chat window is not an agent. An agent has a name and one job, and the
                job is written down: what it reads, what it does, and where it puts its work.
              </p>
              <p className="mod-body">
                Here is an example. We built four agents for a gym that was losing members.
              </p>
              <ol className="mk-rows mk-rows-dates" style={{ marginTop: 18 }}>
                {GYM_AGENTS.map(([name, text]) => (
                  <li key={name}>
                    <span className="mk-rname">{name}</span>
                    <span className="mk-rtext">{text}</span>
                  </li>
                ))}
              </ol>
              <p className="mod-body mk-after">
                Each agent has one job, and one agent checks the others. Your agency&rsquo;s agents
                work the same way. We build the first ones together in class 4.
              </p>

              <h3 className="mk-sub">You use everything you learn twice.</h3>
              <p className="mod-body">
                Each week you learn one part of digital marketing. You use it to market your own
                agency. It is also a service your agency can sell to its clients. For example, you
                learn how to build a website. Your agency needs a website, and your agency can
                build websites for clients.
              </p>

              <h3 className="mk-sub">Every team gets the same made-up data.</h3>
              <p className="mod-body">
                It is a list of made-up companies and people for the CRM tool, Attio, and a list of
                made-up email subscribers for the email tool, Klaviyo. There are no real people in
                it, and nothing is sent to a real person.
              </p>

              <h3 className="mk-sub">The project is your portfolio, and you add to it every week.</h3>
              <div className="mk-marks" role="img" aria-label="The portfolio is 20% of your mark and the exam is 80%.">
                <span className="mk-m20">
                  <b>20%</b>
                </span>
                <span className="mk-m80">
                  <b>80%</b>
                </span>
              </div>
              <div className="mk-markkey">
                <span>
                  <b>20% is the portfolio.</b> Your team builds it each week from the work on your agency.
                </span>
                <span>
                  <b>Your mark is your own.</b> It comes from two things: your team&rsquo;s project, and what your teammates say about the work you did. At the end, each of you fills in a short form about who did what in your team.
                </span>
                <span>
                  <b>80% is the written exam.</b> You sit it on your own, and you must pass the exam to pass the module.
                </span>
              </div>

              <h3 className="mk-sub">These are the dates for the project.</h3>
              <ol className="mk-rows mk-rows-dates">
                {PROJECT_DATES.map(([d, what]) => (
                  <li key={d}>
                    <span className="mk-rname">{d}</span>
                    <span className="mk-rtext">{what}</span>
                  </li>
                ))}
              </ol>
              <p className="mod-body mk-after">
                Before Monday 19 October, read the project brief. Your team comes on 19 October able
                to say in one sentence who its agency would sell to. You need a laptop from that day.
              </p>
            </article>

            {/* Classes 2 to 12. Each gets its parts when its material is written. */}
            {CLASSES.slice(1).map((c, k) => (
              <article className="mod-item mk-classitem" id={`c${k + 2}`} key={c.name}>
                <ClassTop i={k + 1} />
                <ClassRows i={k + 1} />
              </article>
            ))}

            {/* The files */}
            <article className="mod-item" id="files">
              <div className="mod-itemtop">
                <h2 className="mod-h3">You download the files for the module here.</h2>
              </div>
              <p className="mod-body">
                The project brief is here now. The made-up data for Attio and Klaviyo goes here in
                November, before the classes that use it.
              </p>
              <div className="mod-reading">
                <span className="mod-readinglbl">Download</span>
                <ul className="mod-frows">
                  <li className="mod-frow">
                    <a className="mod-fname" href="/mkt46310/team-project-brief.pdf" download>
                      The team project brief
                    </a>
                    <span className="mod-fwhat">One page. What your team makes, the data, the marks and the dates.</span>
                    <a className="mod-readinglink" href="/mkt46310/team-project-brief.pdf" download>
                      Download
                    </a>
                  </li>
                  <li className="mod-frow">
                    <a className="mod-fname" href="/mkt46310/job-ads/download">
                      The 85 job ads
                    </a>
                    <span className="mod-fwhat">Every ad from class 1, word for word, as a CSV file.</span>
                    <a className="mod-readinglink" href="/mkt46310/job-ads/download">
                      Download
                    </a>
                  </li>
                  <li className="mod-frow">
                    <span className="mod-fname">The Attio data</span>
                    <span className="mod-fwhat">A list of made-up companies and people for your agency&rsquo;s CRM.</span>
                    <span className="mk-soon">In November</span>
                  </li>
                  <li className="mod-frow">
                    <span className="mod-fname">The Klaviyo data</span>
                    <span className="mod-fwhat">A list of made-up email subscribers for your agency&rsquo;s emails.</span>
                    <span className="mk-soon">In November</span>
                  </li>
                </ul>
              </div>
              <div className="mod-reading">
                <span className="mod-readinglbl">Reading</span>
                <ul className="mod-frows">
                  <li className="mod-frow">
                    <a className="mod-fname" href="/resources/library" target="_blank" rel="noopener">
                      The library
                    </a>
                    <span className="mod-fwhat">The reading for this module is on this website. Start with the library.</span>
                    <a className="mod-readinglink" href="/resources/library" target="_blank" rel="noopener">
                      Open
                    </a>
                  </li>
                  <li className="mod-frow">
                    <a className="mod-fname" href="/essays" target="_blank" rel="noopener">
                      The essays
                    </a>
                    <span className="mod-fwhat">Then read the essays.</span>
                    <a className="mod-readinglink" href="/essays" target="_blank" rel="noopener">
                      Open
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
