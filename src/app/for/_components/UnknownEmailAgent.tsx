"use client";

// The email marketing agent on the Unknown group page, stage two (Paul, 9 Oct
// 2026): "the email marketing agent is set up to trigger campaigns for my
// entire database and pick the five most interesting triggers based on what
// you've seen so far, and then write five different emails with variants for
// each, and show me what a spreadsheet might look like with 10 different
// levels of segmentation." And: "real ones from my course but make up names,
// not real ... What I really want them to see is that they can build rich
// layers of intelligence and can do great targeting easily and hardly any work."
//
// EVERY COUNT HERE is from Kit's read of the course on 9 Oct 2026, 14:41:
// paul-hub/intelligence/course-launch/declan-counts-9oct/counts.md (counts.json
// beside it, counts.py remakes it). The first names in the sheet are invented.
// The five emails are drafts written for this page and have not been sent; the
// eight versions of the 5 Oct email did go, and their figures are Klaviyo's.

import { useState } from "react";

export const LIST_TOTAL = "1,158";

type Version = { label: string; subject: string; body: string[]; button: string };
type Trigger = { n: string; name: string; count: string; fact: string; versions: Version[] };

export const TRIGGERS: Trigger[] = [
  {
    n: "01",
    name: "Worked through module 1 and has not opened module 2",
    count: "102 people",
    fact: "155 people did the real work in module 1. They ticked things done, copied prompts and took files. Four days after module 2 opened, 102 of them had not been into it. These are the keenest people on the list, and they are the ones drifting.",
    versions: [
      {
        label: "Plain",
        subject: "Module 2 is open, and you are ready for it",
        body: [
          "Hi Aoife,",
          "You worked through module 1 properly. You ticked things done and you took the prompts away with you.",
          "Module 2 opened on Monday and you haven't been in yet. It is the one where you build a writer that sounds like your brand.",
          "It picks up where you left off.",
        ],
        button: "Open module 2",
      },
      {
        label: "Wants agents",
        subject: "The writer in module 2 is your first agent",
        body: [
          "Hi Aoife,",
          "You told us you want to learn about AI agents, and you worked through module 1 properly.",
          "Module 2 opened on Monday. In it you build a writer that sounds like your brand, and a writer like that is where most agents start.",
          "You haven't been in yet, so this is your nudge.",
        ],
        button: "Open module 2",
      },
      {
        label: "Wants content",
        subject: "Module 2 is the one about writing",
        body: [
          "Hi Ciara,",
          "You told us you want to get better at content, and you worked through module 1 properly.",
          "Module 2 opened on Monday. It is about getting AI to write the way your brand writes, and not the way AI writes.",
          "You haven't been in yet, so this is your nudge.",
        ],
        button: "Open module 2",
      },
    ],
  },
  {
    n: "02",
    name: "Copied a prompt and has not been back in a week",
    count: "64 people",
    fact: "132 people copied at least one prompt, which means they took it away to use. 64 of them have not been back for seven days or more. So the email asks how that one prompt went.",
    versions: [
      {
        label: "Create a Red Team",
        subject: "How did the Red Team prompt go?",
        body: [
          "Hi Tom,",
          "You copied the Red Team prompt from module 1. Ninety people on the course have taken that one.",
          "Did it find anything? Reply and tell me.",
          "There are more prompts like it in module 2, which opened on Monday.",
        ],
        button: "See module 2",
      },
      {
        label: "Run your plan past a CFO",
        subject: "What did the CFO say about your plan?",
        body: [
          "Hi Emma,",
          "You copied the prompt that runs your plan past a CFO. It is one of the three most copied on the course.",
          "What did it push back on? Reply and tell me.",
          "There are more prompts like it in module 2, which opened on Monday.",
        ],
        button: "See module 2",
      },
      {
        label: "Give AI context",
        subject: "Did giving it more context change the answer?",
        body: [
          "Hi Sean,",
          "You copied the prompt about giving AI context before you ask it for anything.",
          "Did the answers get better? Reply and tell me.",
          "Module 2 builds on it, and it opened on Monday.",
        ],
        button: "See module 2",
      },
    ],
  },
  {
    n: "03",
    name: "Signed up and never came in, while a colleague has",
    count: "94 people",
    fact: "These people signed up and have not opened the course, and someone at the same company is already inside. That is a better reason to write than telling them they have not started.",
    versions: [
      {
        label: "One colleague in",
        subject: "Someone you work with has started the course",
        body: [
          "Hi Niamh,",
          "You signed up for the course in July and you haven't been in yet.",
          "Someone at your company has. I won't say who, but it means there is a person down the corridor you could compare notes with.",
          "Module 1 is open, and you can do it in pieces.",
        ],
        button: "Start module 1",
      },
      {
        label: "A few colleagues in",
        subject: "A few people at your company are doing the course",
        body: [
          "Hi Niamh,",
          "You signed up for the course in July and you haven't been in yet.",
          "A few people at your company have. If you start this week you can work through it together.",
          "Module 1 is open, and you can do it in pieces.",
        ],
        button: "Start module 1",
      },
    ],
  },
  {
    n: "04",
    name: "Opened the page and touched nothing",
    count: "237 people",
    fact: "The module page loaded for these people and they did not click a single thing on it. They were curious enough to come, and we do not know what stopped them. So one version makes it easy and the other asks.",
    versions: [
      {
        label: "Make it easy",
        subject: "Start with one session",
        body: [
          "Hi Conor,",
          "You opened module 1 and didn't get any further. That is normal, because a new course always looks like more work than it is.",
          "Start with the first session only, and leave the rest for another day.",
        ],
        button: "Watch the first session",
      },
      {
        label: "Ask what stopped them",
        subject: "What stopped you?",
        body: [
          "Hi Rory,",
          "You opened module 1 and didn't get any further.",
          "I'd like to know why. Was it the wrong time, the wrong level, or not what you expected? Reply with one line.",
        ],
        button: "Open module 1",
      },
    ],
  },
  {
    n: "05",
    name: "Said they want AI agents, and the agents module is not out yet",
    count: "230 people",
    fact: "278 people have answered the question about what they want to learn. 222 picked AI Agents and 110 picked Email Agents, which is 230 people in all. The module on building marketing agents opens on 16 November, so they are waiting for the thing they came for.",
    versions: [
      {
        label: "Picked AI Agents",
        subject: "The agents module is coming. Here is what to do first",
        body: [
          "Hi Sinéad,",
          "You told us you want to learn about AI agents. So did 221 other people on the course, which makes it the most wanted subject.",
          "Module 5 is the one on building marketing agents, and it opens on Monday 16 November. The modules before it are what an agent is built from, and module 2 is open now.",
        ],
        button: "Open module 2",
      },
      {
        label: "Picked Email Agents",
        subject: "You asked about email agents",
        body: [
          "Hi Sinéad,",
          "You told us you want to learn about email agents. This email was picked for you by one, from what you have done on the course.",
          "Module 5 is the one on building marketing agents, and it opens on Monday 16 November. The modules before it are what an agent is built from, and module 2 is open now.",
        ],
        button: "Open module 2",
      },
    ],
  },
];

export const VERSION_COUNT = TRIGGERS.reduce((n, t) => n + t.versions.length, 0);

export function TriggerList() {
  return (
    <ol className="ppug-trig">
      {TRIGGERS.map((t) => (
        <li key={t.n}>
          <span className="ppug-n">{t.n}</span>
          <span>
            <b>{t.name}</b>
            <span className="ppug-trig-d">{t.fact}</span>
          </span>
          <span className="ppug-trig-c">{t.count}</span>
        </li>
      ))}
    </ol>
  );
}

function EmailCard({ t }: { t: Trigger }) {
  const [i, setI] = useState(0);
  const v = t.versions[i];
  return (
    <div className="ppug-mail">
      <div className="ppug-mail-bar">
        <span className="ppug-mail-n">Email {t.n}</span>
        <span className="ppug-mail-to">
          to {t.count}: {t.name.charAt(0).toLowerCase() + t.name.slice(1)}
        </span>
        <span className="ppug-site-pill">drafted</span>
      </div>
      <div className="ppug-site-tabs" role="tablist" aria-label={`Email ${t.n}, versions`}>
        {t.versions.map((x, n) => (
          <button key={x.label} type="button" role="tab" aria-selected={n === i} data-on={n === i ? "1" : "0"} onClick={() => setI(n)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="ppug-mail-body">
        <p className="ppug-mail-sub">
          <span>Subject</span>
          {v.subject}
        </p>
        {v.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="ppug-mail-btn">
          <span>{v.button}</span>
        </p>
        <p>Paul</p>
      </div>
      <p className="ppug-site-foot">
        <span>
          version {i + 1} of {t.versions.length}, picked by what each person has done
        </span>
        <span>not sent</span>
      </p>
    </div>
  );
}

export function FiveEmails() {
  return (
    <div className="ppug-mails">
      {TRIGGERS.map((t) => (
        <EmailCard key={t.n} t={t} />
      ))}
    </div>
  );
}

// ---------- the sheet: ten columns of segmentation, one row a person ----------

const COLS = [
  "How far they got",
  "Modules been into",
  "Signed up",
  "Address",
  "Signed up from",
  "Last in",
  "Time of day",
  "Days in",
  "Has done",
  "Wants to learn",
];

// Invented first names. Each row is a kind of person the counts say is on the
// list, not a real one.
const ROWS: [string, string[], string][] = [
  ["Aoife", ["Worked through it", "Module 1", "July", "Work", "Main sign-up", "8 to 14 days ago", "Morning", "Three or more", "Ticked one done, copied a prompt", "AI Agents, Strategy"], "Email 01, wants agents"],
  ["Tom", ["Did a little", "Module 1", "August", "Personal", "Main sign-up", "8 to 14 days ago", "Evening", "One", "Copied a prompt", "Not answered"], "Email 02, Red Team"],
  ["Niamh", ["Never came in", "None", "July", "Work", "Main sign-up", "Never", "", "None", "", "Not answered"], "Email 03, one colleague in"],
  ["Conor", ["Opened the page only", "Module 1", "20 Sep to 4 Oct", "Personal", "Module 1 card", "15 days or more", "Afternoon", "One", "", "Not answered"], "Email 04, make it easy"],
  ["Sinéad", ["Did a little", "Modules 1 and 2", "August", "Work, .ie", "Main sign-up", "Last 3 days", "Morning", "Two", "Watched a session", "AI Agents, Email Agents"], "Email 05, picked AI Agents"],
  ["Ciara", ["Worked through it", "Module 1", "1 to 19 Sep", "Personal", "Main sign-up", "4 to 7 days ago", "Afternoon", "Two", "Took a download, ticked one done", "Content, Brand"], "Email 01, wants content"],
  ["Emma", ["Did a little", "Module 1", "July", "Work, .ie", "Main sign-up", "15 days or more", "Evening", "One", "Copied a prompt", "Not answered"], "Email 02, CFO"],
  ["Rory", ["Opened the page only", "Module 2", "5 Oct on", "Work", "Module 2 card", "4 to 7 days ago", "Morning", "One", "", "Not answered"], "Email 04, ask what stopped them"],
  ["Sean", ["Worked through it", "Module 1", "July", "Work", "Main sign-up", "15 days or more", "Night", "Three or more", "Copied a prompt, opened a file", "Prompting, Research"], "Email 02, give AI context"],
  ["Orla", ["Never came in", "None", "August", "Work", "Main sign-up", "Never", "", "None", "", "Not answered"], "Email 03, a few colleagues in"],
  ["Mark", ["Worked through it", "Modules 1 and 2", "July", "Work", "Main sign-up", "Last 3 days", "Night", "Three or more", "Ticked one done, opened a lesson", "Brand, Reporting"], "None. He is up to date"],
  ["Dara", ["Never came in", "None", "August", "Personal", "Main sign-up", "Never", "", "None", "", "Not answered"], "None this round"],
];

export function SegSheet() {
  return (
    <div className="ppug-sheet">
      <div className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-site-url">the course list, {LIST_TOTAL} rows, 10 columns of segmentation</span>
        <span className="ppug-site-pill">kept by the agent</span>
      </div>
      <div className="ppug-sheet-wrap" tabIndex={0} aria-label="The segmentation sheet, scroll sideways">
        <table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              {COLS.map((c, n) => (
                <th key={c}>
                  <i>{String(n + 1).padStart(2, "0")}</i>
                  {c}
                </th>
              ))}
              <th className="ppug-sheet-out">Email it gets</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([name, cells, out], r) => (
              <tr key={name}>
                <td className="ppug-sheet-r">{r + 2}</td>
                <td>{name}</td>
                {cells.map((c, n) => (
                  <td key={n} data-empty={c ? "0" : "1"}>
                    {c || "none"}
                  </td>
                ))}
                <td className="ppug-sheet-out">{out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ppug-site-foot">
        <span>12 of {LIST_TOTAL} rows, scroll sideways</span>
        <span>names made up, counts real</span>
      </p>
    </div>
  );
}

// What is in each column, with the count in every group, 9 Oct 2026.
const SPLITS: [string, string][] = [
  ["How far they got", "Never came in 561. Opened the page only 237. Did a little 205. Worked through it 155."],
  ["Modules they have been into", "None 561. Module 1 only 484. Modules 1 and 2, 101. Module 2 only 12."],
  ["When they signed up", "July 601. August 286. 1 to 19 September 92. 20 September to 4 October 153. From 5 October 26."],
  ["Work address or personal", "Work 606. Personal 552. Of all of them, 252 end in .ie."],
  ["Where on the site they signed up", "The main sign-up 1,029. A module card 129."],
  ["When they were last in", "Last 3 days 152. 4 to 7 days ago 68. 8 to 14 days ago 138. 15 days or more 239. Never 561."],
  ["Time of day they mostly use it", "Morning 185. Afternoon 208. Evening 151. Night 53. Never came in 561."],
  ["How many days they have been in", "None 561. One 333. Two 140. Three or more 124."],
  ["What they have done at least once", "Watched a session 194. Opened a lesson 168. Opened a link 137. Ticked one done 135. Copied a prompt 132. Took a download 120. Opened a file 72. One person can be in several."],
  ["What they want to learn", "278 people have answered. AI Agents 222, Strategy 187, Brand 152, Reporting 150, Prompting 148, and eleven more subjects. The other 880 have not answered yet."],
];

export function SplitList() {
  return (
    <ol className="ppug-trig ppug-splits">
      {SPLITS.map(([name, groups], n) => (
        <li key={name}>
          <span className="ppug-n">{String(n + 1).padStart(2, "0")}</span>
          <span>
            <b>{name}</b>
            <span className="ppug-trig-d">{groups}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// The email that did go, 5 Oct 2026: eight versions picked by behaviour.
const SENT: [string, string, string, string, string][] = [
  ["Never came in", "1", "589", "44%", "3%"],
  ["Opened the page only", "1", "232", "49%", "9%"],
  ["Did a little", "3", "182", "63%", "16%"],
  ["Worked through it", "3", "129", "66%", "21%"],
];

export function SentTable() {
  return (
    <div className="ppug-table-wrap">
      <table className="ppug-table ppug-sent">
        <thead>
          <tr>
            <th>What they had done</th>
            <th>Versions</th>
            <th>Delivered</th>
            <th>Opened</th>
            <th>Clicked</th>
          </tr>
        </thead>
        <tbody>
          {SENT.map((r) => (
            <tr key={r[0]}>
              {r.map((c, n) => (
                <td key={n}>{c}</td>
              ))}
            </tr>
          ))}
          <tr className="ppug-sent-all">
            <td>All eight versions</td>
            <td>8</td>
            <td>1,132</td>
            <td>51%</td>
            <td>9%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ---------- one connected system, drawn beside the usual way ----------

export function ConnectedSystem() {
  return (
    <div className="ppug-cs" role="img" aria-label="Two drawings. On the left, a website, a customer database and an email tool as three separate products with a person carrying lists between them. On the right, the same three joined as one system with an agent working across all of it.">
      <div className="ppug-cs-side">
        <p className="ppug-cs-k">Stacked on top of each other</p>
        <div className="ppug-cs-stack">
          <div className="ppug-cs-box">
            <b>The website</b>
            <span>one product</span>
          </div>
          <div className="ppug-cs-gap">a person exports a list</div>
          <div className="ppug-cs-box">
            <b>The customer database</b>
            <span>a second product</span>
          </div>
          <div className="ppug-cs-gap">a person imports it and builds a segment</div>
          <div className="ppug-cs-box">
            <b>The email tool</b>
            <span>a third product</span>
          </div>
        </div>
        <p className="ppug-cs-foot">Each new idea means somebody doing that work by hand.</p>
      </div>
      <div className="ppug-cs-side ppug-cs-one">
        <p className="ppug-cs-k">One connected system</p>
        <div className="ppug-cs-ask">
          <span>you ask, in plain words</span>
        </div>
        <div className="ppug-cs-join">
          <div className="ppug-cs-box">
            <b>The website</b>
            <span>the pages and the course, built in code</span>
          </div>
          <div className="ppug-cs-box">
            <b>The data</b>
            <span>who came, what they opened, what they clicked</span>
          </div>
          <div className="ppug-cs-box">
            <b>The email tool</b>
            <span>every person gets the email for what they did</span>
          </div>
          <div className="ppug-cs-agent">the agent works inside all three</div>
        </div>
        <p className="ppug-cs-foot">Each new idea is a sentence, and it is done while you talk.</p>
      </div>
    </div>
  );
}
