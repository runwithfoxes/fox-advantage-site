/* The week, as items. First written 5 Sep 2026 with Paul from the working sheet, rewritten 11 Sep
   after his read of the Monday decks: the agent sends, the team builds all the agents, the
   timetable is the calendar's, plain English throughout. 12 Sep: four agents, not three, and a
   clock starts them (Paul: "agents that run on their own, not commands"). Paragraphs are split on blank lines; a
   line starting with "- " is a list row, a line starting with "> " is a quoted email. Nothing here
   is generated. */

export type ZFile = { name: string; what: string; href: string; external?: boolean };
export type ZItem = {
  t: string;
  text: string;
  files?: ZFile[];
  filesTitle?: string;
};

export const TEAMS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

export const SHEETS = {
  members: "https://docs.google.com/spreadsheets/d/16bvfbrkQeSJ8y8XV-5H_R-J__zA_w5F07QDUZPCWHak",
  checkins: "https://docs.google.com/spreadsheets/d/1Vo_XXFeL-my_xsirEwahUgzsIE7iucs8fu9oYvTWPYM",
  monday: "https://docs.google.com/spreadsheets/d/1FpzP2HfDMrFwk0yFSeAsddOaKfaWIe-cfYxsa-ElELY",
};

export const ITEMS: ZItem[] = [
  {
    t: "What you are building",
    text: `Gimnasio Zorro is a gym in Madrid. One floor, a studio, open six till eleven, 900 members. The owner is Marta Ferrer. She opened it nine years ago and still works the front desk most mornings. Nobody works in the back office.

Marta knows that a member who stops coming for a few weeks usually does not renew. She has watched it happen for nine years. What she does not have is the time to go through 900 members every Monday, work out who is drifting, and write each of them a personal email. So the thing the gym is for, being the gym that notices, is the thing the gym cannot do.

You are building the AI agent that does it for her. It reads the gym's visit data, finds the members who have stopped coming, writes each of them a personal email, and sends it. Two weeks later it checks who came back. It is four agents, and each one does one job and passes its work to the next. Carlos reads the check-ins and finds the members who have dropped off. Enrique reads Carlos's list and the three pages about the gym, writes each email in Marta's voice, sends it, and puts the reason and the email on the member's card in the CRM. Cato assumes the other two are wrong and tries to prove it, before anything goes out. Rosa comes back two weeks later, reads the check-ins again, and tells Marta how many of the people we wrote to came back.

Nobody starts them. A clock on the laptop wakes a small runner every half hour. On a Monday the runner starts Carlos, and each agent after that starts when the one before has left its file. Every step writes a line to a file called heartbeat.log, and that file is the proof it ran. This week the clock is on your laptop. In a company the same four pages would run in the cloud, on Anthropic's Managed Agents or the like, on their own timetable, with no laptop open. Nobody approves the emails first. Marta is only asked about the odd case, a member whose note says injured, or a reply that needs a person.

This week the gym is made up. Every member and every swipe in the files is invented. So the send is pretend: an email goes out by being written to the email log, and the card moves to emailed. Everything else is the real process, the same one a real gym would run off Glofox, its CRM and its email.

Your team builds all four agents. Carlos first, because everything else reads his file. Enrique second. Rosa third, because she only needs Carlos's file and the memory of who was written to. Cato last, once there is something for him to attack. Then you set the clock. Slowly. Get one working before you start the next.

On Friday your team shows the agent running, tells us how many of fifty marked members it got right, how many members came back after the emails, and your two worst mistakes. Anyone on the team can be asked about any part of it.`,
  },
  {
    t: "The build guide, and the presentations",
    text: `The build guide is the thing to have open while you work. One step at a time: what to press, what to type, and what you should see when it worked. Thirty-one steps in seven parts, from downloading the folder to the clock that starts the agents on a Monday with nobody at the keyboard. Every step number is something Isa knows, so if you are stuck, tell her the step.

The two decks from Monday morning are here too, so you can go back through them. They open in the browser. The arrow keys move, N shows the speaking notes, R plays a slide's motion again, F is full screen.`,
    filesTitle: "Open",
    files: [
      { name: "The build guide", what: "Step by step, with what you type and what you should see. Start here on Monday evening.", href: "/zorro/decks/the-build-guide.html", external: true },
      { name: "Monday 9:45. Gimnasio Zorro", what: "What you are building, and why. The fox, the gym, Sergio, the four agents on film, how it works in a real gym, and what starts them.", href: "/zorro/decks/monday-0945.html", external: true },
      { name: "Monday 11:15. How you build it", what: "The tools, where the data is, what an agent is here, how you make one, the order, Cato, the Attio connection, and the clock.", href: "/zorro/decks/monday-1115.html", external: true },
    ],
  },
  {
    t: "Before Tuesday morning",
    text: `Three things. Each one ruins Tuesday if it is missing. Do them on Monday evening, not on the bus.

- Claude Code, installed on your laptop and opened once. First make sure you can log in at claude.ai and know your password. Then go to claude.ai/code and follow the install steps for your machine, Mac or Windows. Open a terminal, type claude, and log in with the same account. If it opens and says hello, you are done.
- A free Attio workspace for your team, with the 900 members loaded. One person on the team makes the workspace at attio.com, names it Zorro and your team number, and invites the others. Do not pay for anything. Then make an API token in Attio's settings, put it in a file called .env in the gym folder, and run the loader. It makes the member fields and puts all 900 members in as cards. Never put the token in a page or in a chat.
- The gym folder on your laptop. Download the zip below, unzip it, and put the gimnasio-zorro folder on your Desktop. That is the folder you open Claude Code inside. Steps 1 to 7 of the build guide walk you through it, one press at a time.

If Claude Code will not install on your machine, tell Julie on Monday evening, not on Tuesday morning. If it will not go on at all, you can build in the browser on Tuesday, but you will want it working by Wednesday.`,
  },
  {
    t: "How to write a job an agent can do",
    text: `An agent in this course is a page of instructions in plain English, and Claude Code follows it. Enrique's page is the finished thing. This is how you get to a page like it. Seven steps, in order, and you will do all seven for each of your four agents.

1. Decide what it produces before anything else. Name the thing, and fix its shape. Not "reviews the members" but "one row per member: id, decision, reason, email or nothing". If two runs could give different shapes, it is not a thing yet, it is an activity, and an activity cannot be checked. Enrique's shape is four fields and never changes.

2. Name where it lands, and make sure someone reads there. A surface the owner already looks at, named exactly. Enrique lands on the member's card in Attio because Marta reads Attio. Work that lands in a folder nobody opens has not happened, and the log will still say success.

3. Write the done condition so it can fail. "Every member in the door log has a row, the rows are on the cards, and a second run on the same Monday adds nothing." Each part of that can be checked and each part can be false. "When the members have been reviewed" cannot fail, so it is not a condition.

4. Write what it does not do, and split the work at the line where mistakes happen. In real agent teams the mistakes are almost never in the fetching. They are in the sentence written next to the number. So the one who computes cannot write, and the one who writes cannot compute. Carlos does the arithmetic with code and copies the result. Enrique never opens the door log. Put the boundary in the job in plain words, because an agent will drift across it otherwise and every step after will look fine.

5. Name the handoffs, both sides. For every file, field or card that carries work in or out, say what it is and check that the other agent's page tells it to read that thing. A handoff where one side names a destination and the other side was never told to look breaks silently, and it looks identical to a working one from either side. Enrique's page names Carlos's file coming in and Marta's card going out, and Carlos's page names the same file.

6. Keep it on one page, and take a line out for every line you add. A list of instructions is obeyed less the longer it gets, and the drop starts early. A job that needs a page of steps to run is not written yet. Everything about how the run happens, which script, which file, which order, lives in a separate runbook, not in the job.

7. Run it, count it, attack it, change one line, run it again. Run the job on a Monday you have an answer key for and count the decisions that match. Then let Cato attack the decisions from the data, and attack the job itself with the four questions above, assuming the agent is literal, lazy and honest. Every finding is one line to change in the job. Change it, run the same Monday again, and see the number move. Stop when the number holds and Cato's attack list comes back with nothing that breaks. That is what "it works" means: not that it ran, but that you counted.`,
    filesTitle: "The four jobs, and the runbook",
    files: [
      { name: "carlos-role.md", what: "Carlos counts. He reads the check-ins and cannot write.", href: "/zorro/carlos-role.md" },
      { name: "enrique-role.md", what: "Enrique writes and sends. This page is the spec he runs on.", href: "/zorro/enrique-role.md" },
      { name: "cato-brief.md", what: "Cato assumes the other two are wrong and tries to prove it.", href: "/zorro/cato-brief.md" },
      { name: "rosa-role.md", what: "Rosa counts who came back, two weeks after the emails.", href: "/zorro/rosa-role.md" },
      { name: "how-to-write-a-job-an-agent-can-do.md", what: "This item, as a file.", href: "/zorro/how-to-write-a-job-an-agent-can-do.md" },
    ],
  },
  {
    t: "The week, day by day",
    text: `All sessions are at UCD Smurfit in Blackrock. Paul's sessions are the ones named here; the rest of the week is Julie's and the guest speakers'.

Monday. 9:45, what you are building, with Paul. 11:15, how you build it: the tools, the data, what an agent is, how you make one, and Cato as the vet and stress test, with Paul. 13:15, a data workshop with David DeFranza. The evening is for the three things above.

Tuesday. 9:45 and 11:15 with Paul. You build Carlos, then Enrique, then Rosa. Carlos reads the check-ins and writes one file, the same shape every time. Enrique reads that file and the three pages, decides for each member, writes the email, and puts it on the card in Attio. Rosa reads who was written to on 31 August and the check-ins since, and counts who came back. Run each on one member, then ten, then all 900, then a second time on the same Monday. The second run must give the same answer. Then you set the clock, watch it fire with nobody at the keyboard, and from then on nobody types anything on a Monday. 13:15, the bus leaves for the company visit to Deloitte.

Wednesday. Paul is not in. Julie's day.

Thursday. 9:45, Suhas Vijayakumar on text analysis. 11:15 and 13:15 with Paul: build a screen for Marta off your agent's real output, then the fifty marked members are handed out and you score your agent on all fifty. Was the flag right, was the email to the right person about the right goal, did it read the return right. Build Cato and score him beside Enrique: of Enrique's misses, how many did Cato catch. Sort the misses into instruction problems and data problems, fix the pages, run again, and put the numbers before and after on the board. 15:00 to 16:30 is your own time to rerun, tidy and rehearse.

Friday. 9:45, Marius Claudy on AI in market research. 11:15 and 13:15, the presentations, with Paul and Julie. Twelve minutes a team, then three minutes of questions. Marta's screen live, your heartbeat.log showing a Monday that ran with nobody at the keyboard, the number your agent scored on the fifty, Cato's number beside it, how many members came back, and your two worst mistakes. The two worst mistakes are worth more than the number. A team that hides its misses has not learned the week.`,
  },
  {
    t: "The gym files",
    text: `Everything the agents read, in one folder. Three files of data and three pages of words. The members file is what a gym's membership software holds: one row per member with the goal each person gave when they joined and any notes from the front desk. The check-ins file is what the door system exports: one row per swipe, the member id and the time, 27,871 rows over fourteen weeks from 8 June to 13 September. The email log is what happened when emails went out on 31 August, opened or not, replied or not, and the reply. The three pages about the gym are yours to use as they are: you do not have to work out the positioning or the voice, that would eat the week.

Every name and every swipe is made up. Nobody in these files exists.

The same members, check-ins and the agent's Monday are in Google Sheets if you want to look before you download, and the Monday sheet shows every email the agent wrote on 31 August in a cell beside the member.`,
    filesTitle: "Download",
    files: [
      { name: "gimnasio-zorro.zip", what: "The whole folder: the three data files, the three pages, the four role pages, the runbook, the set-up sheet, and in tools the Attio loader, the runner and the clock.", href: "/zorro/gimnasio-zorro.zip" },
      { name: "members.csv", what: "900 members. Id, name, email, joined, plan, goal, notes from the desk.", href: "/zorro/members.csv" },
      { name: "checkins.csv", what: "27,871 door swipes, 8 June to 13 September 2026.", href: "/zorro/checkins.csv" },
      { name: "email_log.csv", what: "What happened to the 65 emails sent on 31 August.", href: "/zorro/email_log.csv" },
      { name: "gimnasio-zorro.md", what: "The gym, the owner, and what it stands for. One page.", href: "/zorro/gimnasio-zorro.md" },
      { name: "email-voice-and-rules.md", what: "How Marta writes, the rules for every email, a bad one and a good one.", href: "/zorro/email-voice-and-rules.md" },
      { name: "messages-by-goal.md", what: "What the email says for each kind of member.", href: "/zorro/messages-by-goal.md" },
      { name: "The members, in Google Sheets", what: "The same 900 rows, to look at in a browser.", href: SHEETS.members, external: true },
      { name: "The check-ins, in Google Sheets", what: "The same 27,871 rows.", href: SHEETS.checkins, external: true },
      { name: "The agent's Monday, 31 August, in Google Sheets", what: "The 75 members it acted on: the reason, the email, and whether they came back.", href: SHEETS.monday, external: true },
    ],
  },
  {
    t: "Your team's packs",
    text: `Two small files per team. Five members to practise on, and ten members to build with on Tuesday before you run on all 900. Each row is one member with their visits per week for weeks 1 to 12, so you can see the pattern without running anything. Take your team's number and nobody else's. The packs are different on purpose.`,
    filesTitle: "Download",
    files: TEAMS.flatMap((n) => [
      { name: `team${n}-vet5.csv`, what: `Team ${Number(n)}. Five members to practise on.`, href: `/zorro/packs/team${n}-vet5.csv` },
      { name: `team${n}-build10.csv`, what: `Team ${Number(n)}. Ten members to build with.`, href: `/zorro/packs/team${n}-build10.csv` },
    ]),
  },
  {
    t: "How Marta writes",
    text: `Marta Ferrer is writing to one person she knows, not to a list. She has noticed they have not been in. She is not selling anything and she is not guilt-tripping anyone.

Every email says who it is from, in the first line, and that Marta noticed. It reminds the member of the goal they gave when they joined, in general words. It makes one ask, small and specific: a class this week, a morning, a reply. It ends. Four or five sentences, under eighty words.

An email never says we miss you. It never mentions the fee, the contract or renewal. It never asks why they stopped. It never offers a discount. It never lists three things they could do. It never uses the word journey. It never guesses at a reason the record does not give. And it never names the member's private life: no wedding, no holiday, no family member, no health matter, no date. A gym writing about someone's sister's wedding is intrusive, however well meant. Warm, but professional.

The agent does not write at all when the record says away, on holiday or travelling; when it says injured, physio, surgery, doctor or pregnant; when the member joined less than four weeks ago; when they have been gone eight weeks or more; when they have always come once a fortnight; or when a reply has come in that the agent cannot judge. In every one of those cases it writes nothing and tells Marta why, in one line.

Here is a bad one.

> Hi Rubén,
> We have missed you at Gimnasio Zorro! It has been a while since your last visit and we wanted to check in. Remember, consistency is key on your fitness journey. We have lots of great classes this month, plus a special offer on personal training. Don't forget your membership renews on the 30th. Hope to see you soon!
> The Zorro team

Nobody wrote it. It does not know who Rubén is or what he wanted. Three asks and a discount. And it mentions the renewal, which is the one thing that makes a drifting member cancel.

Here is a good one.

> Hi Rubén,
> Marta here. I noticed you have not been in since the middle of August. You told me when you joined what you were working towards, and a few weeks off makes that harder. Tuesday at 7 there is a small class that would suit, and I will be on the desk if you want a word first. Come in this week?
> Marta

One person to one person. It reminds him he had a goal without naming his private life. One ask with a day and a time. No fee, no guilt, no offer. He can say yes in two words.`,
  },
  {
    t: "What the email says for each goal",
    text: `The goal is on the member's record. The agent uses the line for that goal as the middle of the email, in Marta's words, and adds the one ask. None of this is a script to paste. It is what the email has to be about. The goal is referred to in general words, never the event, the person or the health matter behind it.

- Lose weight. Do not mention weight. Talk about the routine they had built and the mornings or evenings they used to come. The ask is a specific slot they used to keep.
- Build muscle. They care about not losing what they built. Say the floor has been quiet in the evenings and their bench is free. The ask is a session this week, not a programme.
- General fitness. The easiest to lose, because nothing is pulling them in. Name the class or the time they used to come and say it is still there. The ask is one visit.
- Stress and sleep. They joined because life was heavy. If they have stopped, life probably got heavier. Keep it gentle, no push. The ask is a quiet morning or a stretch class, and it is fine to say no.
- Get fit for an event. The event is on the record with a date, and the email never names it, never names who it is for, and never counts the weeks to it. Say they set themselves a goal with a date on it when they joined, and that there is still time to make a difference. The ask is a plan for the weeks left, and Marta offering ten minutes at the desk to write it.
- Strength as I get older. Usually a member over sixty who was coming steadily. Say plainly that a few weeks off costs more at their age and comes back slower, because it is true and they know it. The ask is a morning this week.
- Rehab after injury. Check the record first. If the notes say the injury is back, do not write. If the record is silent, ask how the recovery is going and offer a slot with the instructor who knows their case. The ask is a reply, not a visit.`,
  },
  {
    t: "Stuck? Ask Isa",
    text: `Isa is the fox in the bottom right corner of this page, and the Ask Isa button at the top. She has read every page here, the runbook, the four role pages, the set-up sheet and the three pages about the gym. She knows the build guide by step number. She will not write your agent for you, and she will not tell you the answer to the three practice members, but she will tell you what you have missed and where on this page the answer is. If Claude Code will not install, if the Attio token will not work, if Carlos gives a different answer the second time, ask her first. If she cannot help, ask Julie or Paul in the room.`,
  },
];
