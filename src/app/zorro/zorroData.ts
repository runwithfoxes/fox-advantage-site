/* The week, as items. Written 5 Sep 2026 with Paul from the working sheet. Paragraphs are
   split on blank lines; a line starting with "- " is a list row. Nothing here is generated. */

export type ZFile = { name: string; what: string; href: string };
export type ZItem = {
  t: string;
  text: string;
  files?: ZFile[];
  filesTitle?: string;
};

export const TEAMS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

export const ITEMS: ZItem[] = [
  {
    t: "What you are building",
    text: `Gimnasio Zorro is a neighbourhood gym in Chamberí, Madrid. One floor, a studio, open six till eleven, about 900 members. The owner is Marta Ferrer. She opened it nine years ago and still works the desk most mornings.

Marta knows that a member who stops coming for a few weeks tends not to renew. She has watched it for nine years. What she does not have is the hours to go through 900 members every Monday, work out who is drifting, and write each of them a proper note. So the thing the gym is for, being the gym that notices, is the thing the gym cannot do.

You are building the agent that does it. Her name is Lola, and her job title is Marta's member-care assistant. Every Monday she reads the door log and the member records, finds the members who are drifting away from their own pattern, writes each one a short personal note in Marta's voice off what they said they wanted when they joined, and puts the flag and the draft on the member's record in Attio for Marta to approve. Two weeks later it looks again and tells her how many came back. It never sends anything itself. It never chases someone whose record says injured or away. When a reply needs a human, it says so.

That is the whole loop, and the loop is the point. The agent is a role, not a tool. Its job does not end when the email is written. It ends when Marta knows whether the member came back.

The lesson of the week, said on Monday and shown every day after: building an agent is easy, you can do it from your phone. Building one that does what you want every Monday without anyone watching is a skill, and it comes from practice, curiosity and discipline. Every agent has to answer four questions plainly: what it produces, where it lands, how it knows it is done, and what it does not do. Lola's answers are on this page. You will write your own on Monday afternoon, in under 300 words.

On Friday your team shows the agent running, tells us the number it scored on fifty marked members, the return rate from its second run, and your two worst mistakes. Anyone on the team can be asked about any part of it.`,
  },
  {
    t: "Before Monday",
    text: `Four things, and each one ruins Monday afternoon if it is missing. Do them this week, not on the bus.

- Claude. Make sure you can log in at claude.ai and know your password. Then install Claude Code, which runs on your laptop in a terminal. Go to claude.ai/code and follow the steps for your machine. Open a terminal, type claude, log in with the same account. If it opens and says hello, you are done.
- Attio. This is the CRM the gym's members live in and your agent will read and write it. Sign up for a free account at attio.com. One person per team creates the workspace, names it Zorro Team and your number, and invites the other two. The free plan allows three people, which is why teams are three. Do not pay for anything.
- The files. They are on this page, under the gym files. Download the members and the door log now and put them in a folder on your laptop. That is where Claude Code will work on Monday.
- Your laptop. Charged, with a terminal you can open, and enough battery for a full day. The room has power but not at every seat.

If something will not install, tell Julie before Monday, not on Monday. If Claude Code will not go on your machine we can still run Monday in the browser, but you will want it working by Tuesday.`,
  },
  {
    t: "Monday. The brief, the trap, and the brain",
    text: `Three sessions with Paul, room E117. You need nothing on your laptop for the first one.

9:45 to 11:00. The AI and tech picture in Dublin, then the gym. You watch the finished agent run twice: once on 31 August, writing the notes, and once on 14 September, reading who came back and telling Marta the number. You get the brief, you form your team of three, and you leave knowing exactly what you are building.

11:15 to 12:15. Catching it wrong. Open Claude in the browser and your team's five-member pack. Ask the model whether each of the five is lapsing. Mark each answer right or wrong against the visits and the notes in the pack. Count. Then we write the judgment on the board together: compare a member to their own pattern, not the gym's; a gap with a reason in the notes is not a lapse; read what they said they wanted before you write a word.

13:15 to 15:00. Building the brain. Open Claude Code in your gym folder with your team's ten-member pack, the three pages about the gym, Lola's role page, and your Attio workspace. In order: write your agent's role in the four-question shape, under 300 words. Then write the instructions that take one member and return the same shape every time, flag or no flag, the reason in one line, the note or nothing. A script we give you does the arithmetic on the door log and hands your agent one file; your agent judges and writes off that file and nothing else, because in real agent teams the mistakes are almost never in the fetching, they are in the sentence written next to what was fetched. Run it on ten. Swap packs with another team and run again; where two teams disagree on the same member, the instruction is loose, so tighten the instruction and not the answer. Connect Attio and write the flag and the draft onto ten records. Write the note in Marta's voice. Run the ten again and check Attio.

Homework: run it on fifty members and bring the count in the morning.`,
  },
  {
    t: "Tuesday and Wednesday. Make it standing",
    text: `Tuesday 11:15 to 12:15 with Paul. An hour, so it is tight, and it starts on time.

A standing agent has four things a prompt does not. A trigger: every Monday at seven. A memory: who was flagged, when, and what was sent. A diff: new drifters only, and nobody gets a second note inside four weeks. A stop: a reply that says I am injured or I have moved goes to Marta, not back into the loop. You build the memory on the Attio record and prove it in the room: run week 13 and it writes, run week 13 again and it writes nothing. That second run producing nothing is the agent working properly.

Then the check. Two weeks on, the agent reads the door log for the two weeks after the notes went, marks each member returned or not on their record, and tells Marta the number. The email log with the replies is released here, and the class decides which replies should stop the agent.

Wednesday Paul is not in. Two things to do in the evening and the morning before the Accenture visit. Finish the standing version, run it for the following week, and bring Marta's number on Thursday. And build Cato from his one-page brief, which is on this page. Cato is a second agent with a fresh start whose job is to assume your first agent is wrong and prove it from the door log and the records, never from her reasons, and to log what he attacked as well as what he found. One separate check against the job is the biggest measured gain in the research on agent teams, and a checker that only logs what broke cannot be trusted when it is quiet.`,
  },
  {
    t: "Thursday. The owner's screen, then the count",
    text: `11:15 to 12:15. Working first, surface second. Marta needs five things on a Monday and nothing else: who is flagged, why in one line, the draft, approve or skip, and what happened to the last lot. You build that screen off your agent's real output in thirty-five minutes, and each team shows it with its own data.

13:15 to 15:00. The fifty marked cases are handed out here and not before. You score your agent on all fifty: was the flag right, was the note to the right person about the right goal, did it read the return right. You score Cato beside her: of her misses, how many did he catch, and of his disagreements, how many were right. Then you sort the misses into instruction problems and data problems, fix the instructions on both agents, run again, and put the numbers before and after on the board.

15:00 to 16:30 is your own time. Rerun, tidy, rehearse. Your Friday slot is ten minutes.`,
  },
  {
    t: "Friday. Your number",
    text: `Ten minutes a team, with Paul and Julie. The owner's screen live. The number your agent scored on the fifty, and Cato's number beside it. The return rate from the second run. Your two worst mistakes, which agent caught them, and what you would change. Then questions, to any member of the team, about any part.

The two worst mistakes are worth more than the number. A team that hides its misses has not learned the week.`,
  },
  {
    t: "The gym files",
    text: `Everything the agent reads. The members are what a gym's CRM would hold, with the goal each person gave when they joined and any notes from the desk. The door log is what a door system exports, one row per swipe, fourteen weeks from 8 June to 13 September. The three pages about the gym are yours to use as they are: you do not have to work out the positioning or the voice, that would eat the week, but Paul will talk about why they matter.

Every name and every swipe is made up. Nobody in these files exists.`,
    filesTitle: "Download",
    files: [
      { name: "members.csv", what: "900 members. Id, name, email, joined, plan, goal, notes.", href: "/zorro/members.csv" },
      { name: "checkins.csv", what: "27,922 door swipes, 8 June to 13 September 2026.", href: "/zorro/checkins.csv" },
      { name: "gimnasio-zorro.md", what: "The gym, the owner, and what it is for. One page.", href: "/zorro/gimnasio-zorro.md" },
      { name: "email-voice-and-rules.md", what: "How Marta writes, the rules the agent follows, a bad note and a good one.", href: "/zorro/email-voice-and-rules.md" },
      { name: "messages-by-goal.md", what: "What the note says for each kind of member.", href: "/zorro/messages-by-goal.md" },
      { name: "lola-role.md", what: "Lola's job in the four-question shape. The model for your own agent's role.", href: "/zorro/lola-role.md" },
      { name: "cato-brief.md", what: "The red team, one page. Build him on Wednesday.", href: "/zorro/cato-brief.md" },
    ],
  },
  {
    t: "Your team's packs",
    text: `Two small files per team. The five-member pack is for Monday at 11:15, the ten-member pack for Monday afternoon. Each row is one member with their visits per week for weeks 1 to 12, so you can see the pattern without running anything. Take your team's number and nobody else's; the packs are different on purpose, and the swap after lunch only works if you have not seen the other team's.`,
    filesTitle: "Download",
    files: TEAMS.flatMap((n) => [
      { name: `team${n}-vet5.csv`, what: `Team ${Number(n)}, Monday 11:15. Five members.`, href: `/zorro/packs/team${n}-vet5.csv` },
      { name: `team${n}-build10.csv`, what: `Team ${Number(n)}, Monday 13:15. Ten members.`, href: `/zorro/packs/team${n}-build10.csv` },
    ]),
  },
  {
    t: "How Marta writes",
    text: `Marta Ferrer is writing to one person she knows, not to a list. She has noticed they have not been in. She is not selling anything and she is not guilt-tripping anyone.

Every note says who it is from, in the first line, and that Marta noticed. It names the thing the member said they wanted, in their own words off the record. It makes one ask, small and specific: a class this week, a morning, a reply. It ends. Four or five sentences, under eighty words.

A note never says we miss you. It never mentions the fee, the contract or renewal. It never asks why they stopped. It never offers a discount. It never lists three things they could do. It never uses the word journey. It never guesses at a reason the record does not give.

The agent does not write at all when the record says away, on holiday or travelling; when it says injured, physio, surgery, doctor or pregnant; when the member joined less than four weeks ago; when they have been gone eight weeks or more; when they have always come once a fortnight; or when a reply has come in that the agent cannot judge. In every one of those cases it writes nothing and tells Marta why, in one line.

Here is a bad one.

> Hi Rubén,
> We have missed you at Gimnasio Zorro! It has been a while since your last visit and we wanted to check in. Remember, consistency is key on your fitness journey. We have lots of great classes this month, plus a special offer on personal training. Don't forget your membership renews on the 30th. Hope to see you soon!
> The Zorro team

Nobody wrote it. It does not know who Rubén is or what he wanted. Three asks and a discount. And it mentions the renewal, which is the one thing that makes a drifting member cancel.

Here is a good one.

> Hi Rubén,
> Marta here. I noticed you have not been in since the middle of August. You told me when you joined that you wanted to get your knee strong again before the winter. Tuesday at 7 there is a small mobility class, and I will be on the desk if you want a word first. Come in this week?
> Marta

One person to one person. It names what he said he wanted. One ask with a day and a time. No fee, no guilt, no offer. He can say yes in two words.`,
  },
  {
    t: "What the note says for each goal",
    text: `The goal is on the member's record. The agent uses the line for that goal as the middle of the note, in Marta's words, and adds the one ask. None of this is a script to paste. It is what the note has to be about.

- Lose weight. Do not mention weight. Talk about the routine they had built and the mornings or evenings they used to come. The ask is a specific slot they used to keep.
- Build muscle. They care about not losing what they built. Say the floor has been quiet in the evenings and their bench is free. The ask is a session this week, not a programme.
- General fitness. The easiest to lose, because nothing is pulling them in. Name the class or the time they used to come and say it is still there. The ask is one visit.
- Stress and sleep. They joined because life was heavy. If they have stopped, life probably got heavier. Keep it gentle, no push. The ask is a quiet morning or a stretch class, and it is fine to say no.
- Get fit for an event. The event is on the record with a date. Count the weeks to it and say so. The ask is a plan for the weeks left, and Marta offering ten minutes at the desk to write it.
- Strength as I get older. Usually a member over sixty who was coming steadily. Say plainly that a few weeks off costs more at their age and comes back slower, because it is true and they know it. The ask is a morning this week.
- Rehab after injury. Check the record first. If the notes say the injury is back, do not write. If the record is silent, ask how the recovery is going and offer a slot with the instructor who knows their case. The ask is a reply, not a visit.`,
  },
];
