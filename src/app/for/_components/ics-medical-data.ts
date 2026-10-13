// The words and the notes inside the example agent windows on the ICS Medical
// proposal page, for Brendan Marrinan and Laura Fuvessy. Built 13 Oct 2026
// from the page for the Unknown group (unknown-group-data.ts), which is left
// alone.
//
// What is real here is only what was said on the 28 Aug and 8 Oct calls. Every
// company, person and number below is invented, and the note under each
// window says so. Nothing is written as a fact about ICS beyond the calls.
import type { NoteItem } from "@/components/agents/TypedNote";

// The headline. Agreed by Paul on 13 Oct 2026, as reported by Jo ("Yeah, it's
// a good headline."). It is the one place the words live.
export const HEADLINE = "What if you heard about every funded startup before your competitors did?";

export const RESEARCH: NoteItem[] = [
  { kind: "lead", text: "Hi Brendan," },
  { kind: "p", text: "Here's today's research. Five companies, all filed. The one to look at first is **Fennick Foods**." },
  { kind: "p", text: "They have been advertising for a Head of Marketing since June and the role is still open. Their agency contract goes out to tender in January, according to the notice on their site. The person to ask is **Gráinne Mulhall**, Marketing Director, confirmed in a press release in June." },
  { kind: "li", text: "Two of her team read last month's article, so there is a **warm way in**." },
  { kind: "li", text: "They changed their pack design in March and have said nothing in public about how it went." },
  { kind: "li", text: "**Three ads live**, all the same offer since the spring." },
  { kind: "p", text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Growth Agent**." },
  { kind: "att", text: "fennick-foods-card.pdf · 2 pages" },
];

export const REDTEAM: NoteItem[] = [
  { kind: "lead", text: "Hi Brendan," },
  { kind: "p", text: "I attacked the six claims that would cost the most if they were wrong today. Two broke." },
  { kind: "li", text: "The Fennick Foods card says **Gráinne Mulhall** was confirmed Marketing Director in a June press release. The release is June last year. Fix: the Research Agent finds a source inside twelve months, or the card says the date is unconfirmed." },
  { kind: "li", text: "The campaign report says leads rose in **three of the last four weeks**. I counted again from the data file and get two. Fix: the writer takes the number from the file and names the file." },
  { kind: "p", text: "Four held. I tried the Growth Agent's meeting count against the calendar, the ad sizes against the brand rules, the Search Agent's bid cap against the account, and the post against what was said on the call. None of them moved." },
  { kind: "p", text: "One gap in the process. The Search Agent's Friday report lands in a folder that no other agent's spec tells it to read. Fix: the **Campaign Manager's** spec names the file." },
];

export const PM: NoteItem[] = [
  { kind: "lead", text: "Hi Brendan," },
  { kind: "p", text: "Where everything stands this morning. Three projects moved, one is waiting on you, nothing is late." },
  { kind: "li", text: "**The monthly report.** The draft passed the red team yesterday and goes out on Thursday. Nothing needed from you." },
  { kind: "li", text: "**The growth plan for next year.** Two sections changed overnight from what was said on Tuesday. The third needs a number only you can give. That is the one waiting on you." },
  { kind: "li", text: "**Proposal for Fennick Foods.** Drafted from Friday's call, priced, and in your drafts folder to read. It does not go anywhere until you press send." },
  { kind: "p", text: "The board is current. If you do one thing today, give me the number." },
];

/* The copywriter's post. Written from what Brendan said on the 28 Aug call,
   in his own account of what ICS does and why being known matters. */
export const GHOST_POST: NoteItem[] = [
  { kind: "p", text: "We are the quiet partner behind a lot of medical device startups.", note: "positioning" },
  { kind: "p", text: "A startup has an idea and needs a partner to help it make the device real, and quickly. We design and develop catheter delivery systems, and we stay with them from development through to manufacture.", note: "messaging" },
  { kind: "p", text: "Our aim is to take risk out of their journey.", note: "voice" },
  { kind: "p", text: "Some of our customers are bought by bigger companies. The buyer checks their suppliers too, and a supplier they have never heard of is a risk. So we want to be known.", note: "messaging" },
];

/* The case study writer's draft. A placeholder device and a placeholder client:
   this is not an ICS case study and no fact in it is real. Square brackets mark
   what the writer would take from the project file. */
export const CASE_STUDY: NoteItem[] = [
  { kind: "lead", text: "Draft case study. Client A, a steerable catheter." },
  { kind: "p", text: "**Client A** came to us with a design for a steerable catheter and a funding round to close. They needed a partner to make the device real." },
  { kind: "li", text: "**The start.** [What the client brought, from the project file.]" },
  { kind: "li", text: "**The work.** [What was designed, built and tested, from the project file.]" },
  { kind: "li", text: "**The result.** [The outcome and the client's own words, once they have agreed them.]" },
  { kind: "p", text: "Every square bracket is a fact I still need from the file or from you. I do not fill a gap with a guess." },
  { kind: "att", text: "client-a-case-study-draft.docx · 1 page" },
];
