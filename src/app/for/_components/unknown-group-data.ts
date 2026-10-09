// The notes and the board that sit inside the example agent windows on the
// Unknown group page. They began as word for word copies of the homepage
// agents section (Kite Insurance). Paul, 9 Oct 2026, after his first look:
// "personalise the examples for unknown from based on what you've heard versus
// kite in the figures."
//
// So each one is now written as it could look for the group. What is real is
// only what Declan said on the 8 Oct call: the group is Unknown, Empathy and
// Salience are two of its four brands, the work is insight, brand, strategy
// and futures, growth planning for next year is starting, and his own account
// of the name. Every client company, person, number and finding below is
// invented, and the note under the examples says so. The other two brands are
// not named because nobody here has their names.
import type { NoteItem } from "@/components/agents/TypedNote";

export const RESEARCH: NoteItem[] = [
  { kind: "lead", text: "Hi Declan," },
  { kind: "p", text: "Here's today's research. Five companies, all filed to the CRM. The one to look at first is **Harbour Foods**." },
  { kind: "p", text: "They have been advertising for a Head of Insight since June and the role is still open. Their brand tracker goes out to tender in January, according to the notice on their site. The person to ask is **Gráinne Mulhall**, Marketing Director, confirmed in a press release in June." },
  { kind: "li", text: "Two of her team read the last Empathy report, so there is a **warm way in**." },
  { kind: "li", text: "They changed their pack design in March and have said nothing in public about how it went. That is a question **Salience** could help with as well as Empathy." },
  { kind: "li", text: "**Three ads live**, all the same offer since the spring." },
  { kind: "p", text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Growth Agent**." },
  { kind: "att", text: "harbour-foods-card.pdf · 2 pages" },
];

export const REDTEAM: NoteItem[] = [
  { kind: "lead", text: "Hi Declan," },
  { kind: "p", text: "I attacked the six claims that would cost the most if they were wrong today. Two broke." },
  { kind: "li", text: "The Harbour Foods card says **Gráinne Mulhall** was confirmed Marketing Director in a June press release. The release is June last year. Fix: the Research Agent finds a source inside twelve months, or the card says the date is unconfirmed." },
  { kind: "li", text: "The client email says the finding showed up in **three of the last four waves**. I counted again from the data file and get two. Fix: the writer takes the number from the file and names the file." },
  { kind: "p", text: "Four held. I tried the Growth Agent's meeting count against the calendar, the ad sizes against the brand rules, the Search Agent's bid cap against the account, and the post about the group's name against what was said on the call. None of them moved." },
  { kind: "p", text: "One gap in the process. The Search Agent's Friday report lands in a folder that no other agent's spec tells it to read. Fix: the **Campaign Manager's** spec names the file." },
];

export const PM: NoteItem[] = [
  { kind: "lead", text: "Hi Declan," },
  { kind: "p", text: "Where everything stands this morning. Three projects moved, one is waiting on you, nothing is late." },
  { kind: "li", text: "**Empathy's monthly report.** The draft passed the red team yesterday and goes out on Thursday. Nothing needed from you." },
  { kind: "li", text: "**The growth plan for next year.** Two sections changed overnight from what was said on Tuesday. The third needs a number only you can give. That is the one waiting on you." },
  { kind: "li", text: "**Salience proposal for Harbour Foods.** Drafted from Friday's call, priced, and in your drafts folder to read. It does not go anywhere until you press send." },
  { kind: "p", text: "The board is current. If you do one thing today, give me the number." },
];

/* The growth agent's morning note and board. Task-shaped, and it carries no
   revenue numbers on purpose. Every firm and person is invented. */
export const GROWTH_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Corrib Energy, for Empathy.",
  "Three things need you today. The Tolka Retail terms are waiting on your yes. This week's list of brands to approach is built and ready for you to prune. And one prospect has asked a pricing question I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

export const GROWTH_PIPELINE = [
  [
    { firm: "Harbour Foods", person: "Gráinne Mulhall · Marketing Director", note: "intro sent, tracker out to tender in January" },
    { firm: "Ballagh Group", person: "Donal Moore · Head of Strategy", note: "planning for next year starts in November" },
    { firm: "Barrow Credit Union", person: "Áine Ronan · Head of Member Services", note: "detail sent, follow-up due" },
  ],
  [
    { firm: "Corrib Energy", person: "Sinéad Crotty · Brand Director", note: "Thursday 2pm, for Empathy" },
    { firm: "Slaney Drinks", person: "Ruairí Behan · Insight Lead", note: "Tuesday 11am, for Salience" },
  ],
  [
    { firm: "Tolka Retail", person: "Maeve Tobin · Chief Customer Officer", note: "waiting on your yes" },
    { firm: "Foyle Travel", person: "Peter Rafferty · CEO", note: "follow-up Friday" },
  ],
  [
    { firm: "Ashfield Health", person: "Onboarding", note: "terms agreed, first workshop booked" },
    { firm: "Kilbrannan Dairy", person: "Live", note: "first wave of the tracker in field" },
  ],
];

/* The ghostwriter's post. This one is not invented: it is written from what
   Declan said on the call about the name (24:00 to 24:20), in his words. */
export const GHOST_POST: NoteItem[] = [
  { kind: "p", text: "People ask why we called the group Unknown. The honest answer is that we stumbled on it a little, like a lot of good things.", note: "voice" },
  { kind: "p", text: "But it fits. When a client comes to us they have an unknown. There is a gap, or a problem that needs solving. Our work is to take away the “un” and show what is known.", note: "positioning" },
  { kind: "p", text: "A lot of the time the answer is hiding in plain sight. It is unseen, or unheard, or unimagined, and nobody has gone looking in the right place.", note: "messaging" },
  { kind: "p", text: "It is a bit playful as well. The first thing people say is “why are you unknown?”, and that is a good way to start a conversation.", note: "voice" },
];
