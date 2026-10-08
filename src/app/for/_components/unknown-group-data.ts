// The notes and the board that sit inside the example agent windows on the
// Unknown group page. Copied word for word from the homepage agents section
// (src/components/agents/AgentsSection.tsx) on 8 Oct 2026, so that file, which
// drives the live homepage, is not touched. One change: an invented person on
// the board shared a first name with the reader and was renamed. Every firm
// and person here is invented.
import type { NoteItem } from "@/components/agents/TypedNote";

export const RESEARCH: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "Here's today's research. Five companies, all filed to the CRM. The one to look at first is **Kite Insurance**." },
  { kind: "p", text: "They've been hiring a performance marketing manager since May and the role is still open. Renewal price rises were in the news last week and their own site says nothing about it. The person to ask is **Órla Kavanagh**, Head of Marketing, confirmed in a press release in June." },
  { kind: "li", text: "Two of her team registered for the course in August, so there is a **warm way in**." },
  { kind: "li", text: "“Kite insurance renewal” gets **2,400 searches a month** and they rank fourth. “Car insurance quote” gets 33,100 and they are not in the top 20." },
  { kind: "li", text: "**Three ads live**, all the same offer since March." },
  { kind: "p", text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Growth Agent**." },
  { kind: "att", text: "kite-insurance-card.pdf · 2 pages" },
];

export const REDTEAM: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "I attacked the six claims that would cost the most if they were wrong today. Two broke." },
  { kind: "li", text: "The Kite card says **Órla Kavanagh** was confirmed Head of Marketing in a June press release. The release is June last year. Fix: the Research Agent finds a source inside twelve months, or the card says the date is unconfirmed." },
  { kind: "li", text: "The renewal email says customers saved **€187 on average**. I recomputed it from the renewal sheet and get €163. Fix: the Email Agent takes the number from the sheet and names the sheet." },
  { kind: "p", text: "Four held. I tried the Growth Agent's meeting count against the calendar, the ad set's sizes against the brand book, the Search Agent's bid cap against the account, and the ghostwriter's seven in ten against the renewal data. None of them moved." },
  { kind: "p", text: "One gap in the process. The Search Agent's Friday report lands in a folder that no other agent's spec tells it to read. Fix: the **Campaign Manager's** spec names the file." },
];

export const PM: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "Where everything stands this morning. Three projects moved, one is waiting on you, nothing is late." },
  { kind: "li", text: "**Kite renewal campaign.** The emails passed the guardian yesterday and go out Thursday. Nothing needed from you." },
  { kind: "li", text: "**The website.** Two pages changed overnight from what you said on Tuesday. The third needs a photograph only you can pick. That is the one waiting on you." },
  { kind: "li", text: "**Harbour Cover proposal.** Drafted from Friday's call, priced, and in your drafts folder to read. It does not go anywhere until you press send." },
  { kind: "p", text: "The board is current. If you do one thing today, pick the photograph." },
];

/* THE GROWTH AGENT'S WORLD. Paul, 5 Sep: "Growth Agent, I want to show Growth
   Agent", pasting the section from the AXA page. The morning note, the board
   and the copy come across as they are there. Every firm and person is
   invented; the note is task-shaped and carries no numbers on purpose. */
export const GROWTH_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Behan Financial Planning.",
  "Three things need you today. The Kilbrannan terms are waiting on your yes. This week's partner list is built and ready for you to prune. And one broker has asked a pricing question I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

export const GROWTH_PIPELINE = [
  [
    { firm: "Hyland Mortgage Advisers", person: "Cormac Hyland · Principal", note: "intro sent, two new advisers" },
    { firm: "Ballagh Group", person: "Donal Moore · Reward Manager", note: "benefits review in October" },
    { firm: "Barrow Credit Union", person: "Áine Ronan · Head of Member Services", note: "detail sent, follow-up due" },
  ],
  [
    { firm: "Foyle Comparison", person: "Sinéad Crotty · Partnerships Lead", note: "Tuesday 11am, panel terms" },
    { firm: "Behan Financial Planning", person: "Ruairí Behan · Director", note: "Thursday 2pm, retention data prepared" },
  ],
  [
    { firm: "Kilbrannan Brokers", person: "Maeve Tobin · Managing Director", note: "waiting on your yes" },
    { firm: "Slaney Union", person: "Peter Rafferty · CEO", note: "follow-up Friday" },
  ],
  [
    { firm: "Tolka Employee Benefits", person: "Onboarding", note: "terms agreed, launch date set" },
    { firm: "Ashfield Brokers", person: "Live", note: "first month, 41 policies written" },
  ],
];

export const GHOST_POST: NoteItem[] = [
  { kind: "p", text: "I spent last week going through what our customers did at renewal time last year, and I want to share what I found, because I think it says something about how this industry works.", note: "voice" },
  { kind: "p", text: "About seven in ten of the people we insure paid the renewal price we sent them without shopping around. When I first saw that number I assumed it meant they were happy with us. I don't think it does. I think it means the alternative was a fortnight of filling in forms on four different websites, answering the same eleven questions each time, and most people have better things to do with their evenings.", note: "proof" },
  { kind: "p", text: "So we've started doing the shopping around for them. About three weeks before a renewal is due, we check what everyone else would charge for the same cover. If someone is cheaper, we tell the customer and move them, and we do the paperwork. If nobody is, they stay where they are. Either way they get a note saying what we found.", note: "positioning" },
  { kind: "p", text: "I know how that sounds coming from an insurer, and it will cost us customers some years. I'd rather that than a business that depends on people not getting around to checking. If you're with an insurer that won't do this for you, it's worth asking them why.", note: "messaging" },
];
