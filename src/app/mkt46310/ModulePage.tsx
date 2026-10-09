import Link from "next/link";
import Bars from "./Bars";
import { ADS, WORK, TOOLS, QUOTES, PILLARS, BEHAVIOURS, MAKE, PROJECT_DATES, CLASSES } from "./moduleData";

/* The page behind the door. The same bones as /zorro and a course module: the rail on the
   left, the masthead and the numbered items on the right. Every heading is a full sentence
   and the copy is one size (Paul's rules for anything students read). */

const ITEMS = [
  { rail: "What the module is for", t: "The aim is that you leave as a marketer who is very good at digital." },
  { rail: "Class 1: what employers want", t: "In class 1 we look at what employers ask for in 85 Irish job ads." },
  { rail: "The team project", t: "Your team creates a digital marketing agency." },
  { rail: "The twelve classes", t: "The module has twelve classes." },
  { rail: "Downloads", t: "You download the files for the module here." },
];

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

function Top({ i }: { i: number }) {
  return (
    <div className="mod-itemtop">
      <span className="mod-n">{String(i + 1).padStart(2, "0")}</span>
      <h2 className="mod-h3">{ITEMS[i].t}</h2>
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

      <div className="mod-grid">
        <div className="mod-railcol">
          <nav className="mod-rail">
            <p>/the module</p>
            {ITEMS.map((it, i) => (
              <a key={i} href={`#i${i + 1}`}>
                <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                <span className="mod-dot" />
                <span>{it.rail}</span>
              </a>
            ))}
            <a className="mod-rail-lib" href="#i5">
              /the files
            </a>
          </nav>
        </div>

        <div className="mod-maincol">
          <header className="mod-masthead">
            <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Autumn 2026</p>
            <h1 className="mod-h1">
              AI and Digital Marketing <span className="mod-hl">Strategy</span>
            </h1>
            <div className="chapter-fox-hero">
              <img className="chapter-fox-hero-img" src="/fox/fox-monday-nobg.png" alt="" />
            </div>
            <p className="mod-standfirst">
              This is the page for the module, and it stays here for the whole term. It has what
              the module is for, what we found when we read 85 Irish job ads, the team project,
              the twelve classes and the files you download.
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
            {/* 01 */}
            <article className="mod-item" id="i1">
              <Top i={0} />
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

              <h3 className="mk-sub">The module is built on three pillars: tools, knowledge and behaviour.</h3>
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
            </article>

            {/* 02 */}
            <article className="mod-item" id="i2">
              <Top i={1} />
              <p className="mod-body">
                The ads were posted between October 2025 and September 2026. We read 108 ads with
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
            </article>

            {/* 03 */}
            <article className="mod-item" id="i3">
              <Top i={2} />
              <p className="mod-body">
                You work in a team of four or five. Your agency sells digital marketing services to
                other companies. You do this work using Claude, and we show you how in class.
              </p>

              <h3 className="mk-sub">Your team has to make six things.</h3>
              <ol className="mk-rows mk-rows-plain">
                {MAKE.map((m, i) => (
                  <li key={i}>
                    <span className="mk-rk">{i + 1}</span>
                    <span className="mk-rtext">{m}</span>
                  </li>
                ))}
              </ol>

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

            {/* 04 */}
            <article className="mod-item" id="i4">
              <Top i={3} />
              <p className="mod-body">
                Analytics is part of every tools class. For each tool we cover what you measure and
                what the number tells you.
              </p>
              <div className="mk-classes">
                {CLASSES.map((c, i) => (
                  <section className="mk-class" key={c.name} id={`c${i + 1}`}>
                    <header>
                      <span className="mk-cn">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{c.name}</h3>
                      <span className="mk-ctag">{c.pillar}</span>
                    </header>
                    <p className="mk-cwhen">
                      {c.when}
                      {c.where ? ` · ${c.where}` : ""}
                    </p>
                    <dl>
                      {c.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            </article>

            {/* 05 */}
            <article className="mod-item" id="i5">
              <Top i={4} />
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
