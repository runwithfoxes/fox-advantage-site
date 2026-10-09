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

//
// ROUND 4 (Paul, 9 Oct): "It's just a wall of text... You need to figure out
// how to do this visually." And: "shouldn't the answer be in the actual
// figure? So this should look like a proper conversation." And: "Even the
// emails don't look like emails... They look like websites or something."
// So: ONE light conversation window holds both asks and both answers, whole
// at rest. The five emails sit in one mail window as drafts. The sheet is
// kept ("The actual table is pretty good"). The splits and the sent email
// are drawn as bars. No dark window, no button in an email.

import { useState } from "react";
import "./library/chat-window.css";

export const LIST_TOTAL = "1,158";

type Version = { label: string; subject: string; body: string[]; button: string };
// `fact` is the long reason Cato read on 9 Oct. It is kept as the record and
// is not printed; `why` is the short line the page shows.
type Trigger = { n: string; name: string; count: string; num: number; why: string; to: string; fact: string; versions: Version[] };

export const TRIGGERS: Trigger[] = [
  {
    n: "01",
    name: "Worked through module 1 and has not opened module 2",
    count: "102 people",
    num: 102,
    to: "102 people who worked through module 1 and have not opened module 2",
    why: "The keenest people on the list, and they are drifting.",
    fact: "155 people did the real work in module 1. They ticked things done, copied prompts and took files. Four days after module 2 opened, 102 of them had not been into it. These are the keenest people on the list, and they are the ones drifting.",
    versions: [
      {
        label: "Plain",
        subject: "Module 2 is open, and you are ready for it",
        body: [
          "Hi Aoife,",
          "You worked through module 1 properly.",
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
    num: 64,
    to: "64 people who copied a prompt and have not been back in a week",
    why: "They took a prompt away to use, so the email asks how it went.",
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
    num: 94,
    to: "94 people who signed up and never came in, while a colleague has",
    why: "Someone at the same company is already inside.",
    fact: "These people signed up and have not opened the course, and someone at the same company is already inside. That is a better reason to write than telling them they have not started.",
    versions: [
      {
        label: "One colleague in",
        subject: "Someone you work with has started the course",
        body: [
          "Hi Niamh,",
          "You signed up for the course and you haven't been in yet.",
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
          "You signed up for the course and you haven't been in yet.",
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
    num: 237,
    to: "237 people who opened the page and touched nothing",
    why: "Curious enough to come. One version makes it easy, the other asks why.",
    fact: "The module page loaded for these people and they did not click a single thing on it. They were curious enough to come, and we do not know what stopped them. So one version makes it easy and the other asks.",
    versions: [
      {
        label: "Make it easy",
        subject: "Start with one session",
        body: [
          "Hi Conor,",
          "You opened the course and didn't get any further. That is normal, because a new course always looks like more work than it is.",
          "Start with the first session only, and leave the rest for another day.",
        ],
        button: "Open the course",
      },
      {
        label: "Ask what stopped them",
        subject: "What stopped you?",
        body: [
          "Hi Rory,",
          "You opened the course and didn't get any further.",
          "I'd like to know why. Was it the wrong time, the wrong level, or not what you expected? Reply with one line.",
        ],
        button: "Open the course",
      },
    ],
  },
  {
    n: "05",
    name: "Said they want AI agents, and the agents module is not out yet",
    count: "230 people",
    num: 230,
    to: "230 people who said they want AI agents",
    why: "They are waiting for the module they came for.",
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

const MAX_TRIG = Math.max(...TRIGGERS.map((t) => t.num));

function Dots() {
  return (
    <>
      <i className="ppchat-dot ppchat-dot-r" />
      <i className="ppchat-dot ppchat-dot-a" />
      <i className="ppchat-dot ppchat-dot-g" />
    </>
  );
}

function AgentSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="ppug-chat-a">
      <p className="ppug-chat-who">
        <span>E</span>Email marketing agent
      </p>
      {children}
    </div>
  );
}

// The whole conversation in one light window, complete at rest: the question
// and its answer, then the job and what came back.
export function CourseChat() {
  return (
    <div className="ppchat ppug-chat">
      <div className="ppchat-bar">
        <Dots />
        <span className="ppchat-title">Paul and the email marketing agent</span>
      </div>
      <div className="ppchat-body">
        <div className="ppchat-you">
          <p>Tell me five surprising things about the people on the course.</p>
        </div>
        <AgentSays>
          <p className="ppug-chat-p">Here are three of the five.</p>
          <ol className="ppug-chat-finds">
            <li>
              <span>1</span>
              One person has opened the first module at 7.40 on nearly every working morning for three weeks.
            </li>
            <li>
              <span>2</span>
              Six people came in for the first time within the same forty hours. Every one of them came back once, and none has
              clicked on anything.
            </li>
            <li>
              <span>3</span>
              Ninety people have copied the same prompt, the one that builds a red team.
            </li>
          </ol>
        </AgentSays>
        <div className="ppchat-you">
          <p>
            Now pick the five most interesting triggers from what you have seen. Write an email for each, with versions for the
            kinds of people in it, and show me the segmentation as a sheet.
          </p>
        </div>
        <AgentSays>
          <p className="ppug-chat-p">Five triggers, from what the {LIST_TOTAL} people on the course have done.</p>
          <ol className="ppug-chat-trigs">
            {TRIGGERS.map((t) => (
              <li key={t.n}>
                <span className="ppug-chat-n">{t.n}</span>
                <span className="ppug-chat-t">
                  <b>{t.name}</b>
                  <em>{t.why}</em>
                </span>
                <span className="ppug-chat-bar" aria-hidden="true">
                  <i style={{ width: `${(t.num / MAX_TRIG) * 100}%` }} />
                </span>
                <span className="ppug-chat-c">{t.count}</span>
              </li>
            ))}
          </ol>
          <p className="ppug-chat-p">
            I have drafted an email for each one, {VERSION_COUNT} versions in all, and the sheet is up to date. Nothing goes until
            you say send.
          </p>
        </AgentSays>
      </div>
    </div>
  );
}

// The five drafts in one mail window: the drafts down the left, the open
// email on the right with who it is from, who it goes to and its subject.
export function MailDrafts() {
  const [d, setD] = useState(0);
  const [vs, setVs] = useState<number[]>(TRIGGERS.map(() => 0));
  const t = TRIGGERS[d];
  const i = vs[d];
  const v = t.versions[i];
  const pick = (n: number) => setVs((old) => old.map((x, k) => (k === d ? n : x)));
  return (
    <div className="ppug-mc">
      <div className="ppug-mc-bar">
        <Dots />
        <span className="ppug-mc-title">Mail</span>
      </div>
      <div className="ppug-mc-grid">
        <div className="ppug-mc-list" role="tablist" aria-label="The five drafts">
          <p className="ppug-mc-folder">
            Drafts <span>{TRIGGERS.length}</span>
          </p>
          {TRIGGERS.map((x, n) => (
            <button key={x.n} type="button" role="tab" aria-selected={n === d} data-on={n === d ? "1" : "0"} onClick={() => setD(n)}>
              <span className="ppug-mc-to">To {x.count}</span>
              <b>{x.versions[vs[n]].subject}</b>
              <span className="ppug-mc-snip">{x.versions[vs[n]].body[1]}</span>
            </button>
          ))}
        </div>
        <div className="ppug-mc-open">
          <div className="ppug-mc-head">
            <p className="ppug-mc-subj">{v.subject}</p>
            <div className="ppug-mc-addr">
              <span className="ppug-mc-av">PD</span>
              <span>
                <b>Paul Dervan</b>
                <span>
                  To: {t.to}
                </span>
              </span>
              <span className="ppug-mc-draft">Draft</span>
            </div>
          </div>
          <div className="ppug-mc-vers" role="tablist" aria-label="Versions of this email">
            <span>Version for</span>
            {t.versions.map((x, n) => (
              <button key={x.label} type="button" role="tab" aria-selected={n === i} data-on={n === i ? "1" : "0"} onClick={() => pick(n)}>
                {x.label}
              </button>
            ))}
          </div>
          <div className="ppug-mc-body">
            {v.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <span className="ppug-mc-link">{v.button}</span>
            </p>
            <p>Paul</p>
          </div>
        </div>
      </div>
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
  ["Sinéad", ["Did a little", "Module 1", "August", "Work, .ie", "Main sign-up", "Last 3 days", "Morning", "Two", "Watched a session", "AI Agents, Email Agents"], "Email 05, picked AI Agents"],
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

// What is in each column, with the count in every group, 9 Oct 2026. A
// "parts" row adds up to the whole list and is drawn as one bar cut into its
// groups. An "each" row is groups a person can be in several of, so each
// group gets its own bar. `z` marks the group that never came in.
type Part = { l: string; n: number; z?: boolean };
type Split = { name: string; kind: "parts" | "each"; parts: Part[]; note?: string };
const TOTAL = 1158;
const SPLITS: Split[] = [
  { name: "How far they got", kind: "parts", parts: [{ l: "Worked through it", n: 155 }, { l: "Did a little", n: 205 }, { l: "Opened the page only", n: 237 }, { l: "Never came in", n: 561, z: true }] },
  { name: "Modules they have been into", kind: "parts", parts: [{ l: "Modules 1 and 2", n: 101 }, { l: "Module 2 only", n: 12 }, { l: "Module 1 only", n: 484 }, { l: "None", n: 561, z: true }] },
  { name: "When they signed up", kind: "parts", parts: [{ l: "July", n: 601 }, { l: "August", n: 286 }, { l: "1 to 19 Sep", n: 92 }, { l: "20 Sep to 4 Oct", n: 153 }, { l: "From 5 Oct", n: 26 }] },
  { name: "Work address or personal", kind: "parts", parts: [{ l: "Work", n: 606 }, { l: "Personal", n: 552 }], note: "Of all of them, 252 end in .ie." },
  { name: "Where on the site they signed up", kind: "parts", parts: [{ l: "The main sign-up", n: 1029 }, { l: "A module card", n: 129 }] },
  { name: "When they were last in", kind: "parts", parts: [{ l: "Last 3 days", n: 152 }, { l: "4 to 7 days ago", n: 68 }, { l: "8 to 14 days ago", n: 138 }, { l: "15 days or more", n: 239 }, { l: "Never", n: 561, z: true }] },
  { name: "Time of day they mostly use it", kind: "parts", parts: [{ l: "Morning", n: 184 }, { l: "Afternoon", n: 209 }, { l: "Evening", n: 151 }, { l: "Night", n: 53 }, { l: "Never came in", n: 561, z: true }] },
  { name: "How many days they have been in", kind: "parts", parts: [{ l: "Three or more", n: 124 }, { l: "Two", n: 140 }, { l: "One", n: 333 }, { l: "None", n: 561, z: true }] },
  { name: "What they have done at least once", kind: "each", parts: [{ l: "Watched a session", n: 194 }, { l: "Opened a lesson", n: 168 }, { l: "Opened a link", n: 137 }, { l: "Ticked one done", n: 135 }, { l: "Copied a prompt", n: 132 }, { l: "Took a download", n: 120 }, { l: "Opened a file", n: 72 }], note: "One person can be in several." },
  { name: "What they want to learn", kind: "each", parts: [{ l: "AI Agents", n: 222 }, { l: "Strategy", n: 187 }, { l: "Brand", n: 152 }, { l: "Reporting", n: 150 }, { l: "Prompting", n: 148 }], note: "278 people have answered, and there are eleven more subjects. The other 880 have not answered yet." },
];

const fmt = (n: number) => n.toLocaleString("en-IE");

export function SplitBars() {
  return (
    <div className="ppug-sb">
      {SPLITS.map((s, n) => {
        const max = Math.max(...s.parts.map((p) => p.n));
        return (
          <div className="ppug-sb-row" key={s.name}>
            <p className="ppug-sb-name">
              <i>{String(n + 1).padStart(2, "0")}</i>
              {s.name}
            </p>
            <div className="ppug-sb-draw">
              {s.kind === "parts" ? (
                <>
                  <div className="ppug-sb-bar" aria-hidden="true">
                    {s.parts.map((p, k) => (
                      <i key={p.l} data-k={p.z ? "z" : k} style={{ width: `${(p.n / TOTAL) * 100}%` }} />
                    ))}
                  </div>
                  <ul className="ppug-sb-key">
                    {s.parts.map((p, k) => (
                      <li key={p.l}>
                        <i data-k={p.z ? "z" : k} />
                        {p.l} <b>{fmt(p.n)}</b>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul className="ppug-sb-each">
                  {s.parts.map((p) => (
                    <li key={p.l}>
                      <span>{p.l}</span>
                      <span className="ppug-sb-ebar" aria-hidden="true">
                        <i style={{ width: `${(p.n / max) * 100}%` }} />
                      </span>
                      <b>{fmt(p.n)}</b>
                    </li>
                  ))}
                </ul>
              )}
              {s.note && <p className="ppug-sb-note">{s.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// The email that did go, 5 Oct 2026: eight versions picked by behaviour.
// [what they had done, versions, delivered, opened %, clicked %]
const SENT: [string, number, number, number, number][] = [
  ["Never came in", 1, 589, 44, 3],
  ["Opened the page only", 1, 232, 49, 9],
  ["Did a little", 3, 182, 63, 16],
  ["Worked through it", 3, 129, 66, 21],
];

export function SentChart() {
  return (
    <div className="ppug-sc">
      <p className="ppug-sc-key">
        <span>
          <i data-k="o" />
          opened
        </span>
        <span>
          <i data-k="c" />
          clicked
        </span>
      </p>
      {SENT.map(([name, vers, del, op, cl]) => (
        <div className="ppug-sc-row" key={name}>
          <p className="ppug-sc-name">
            {name}
            <span>
              {vers} {vers === 1 ? "version" : "versions"}, {fmt(del)} delivered
            </span>
          </p>
          <div className="ppug-sc-bars">
            <p>
              <span className="ppug-sc-bar" aria-hidden="true">
                <i data-k="o" style={{ width: `${op}%` }} />
              </span>
              <b>{op}%</b>
            </p>
            <p>
              <span className="ppug-sc-bar" aria-hidden="true">
                <i data-k="c" style={{ width: `${cl}%` }} />
              </span>
              <b>{cl}%</b>
            </p>
          </div>
        </div>
      ))}
      <p className="ppug-sc-all">All eight versions: 1,132 delivered, 51% opened, 9% clicked.</p>
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
