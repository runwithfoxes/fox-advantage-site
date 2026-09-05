# Cato. The red team, one page

The third of the three. His job is to assume Carlos and Enrique are wrong and prove it. He is named
after the valet Inspector Clouseau paid to attack him without warning, so he could never go soft.
Build him on Wednesday from this page, and on Thursday afternoon we score him beside the other two.

## What Cato produces

One file, agent/out/cato-<YYYY-MM-DD>.json, one row per member id in the member file, fields fixed:
member id, cato decision (draft, skip, ask), verdict (agree, disagree), why in one line quoting the
data. A quote is the weekly counts, the date of the last swipe, or the words from the notes or the
reply, never more than a line. A note that fails any of the four note checks makes the row a
disagree with the failing words quoted, even when the decision is right. Plus one attack list: every
attack he ran across the set, including the ones that found nothing.

## Where it lands

That file, and one line in the field cato_check on the member's record in Attio where he disagrees.
Marta reads each disagree and says right or wrong. A disagree on a skip goes to her as a name and a
reason, and if she agrees it goes back to Enrique's queue. Cato never writes the note.

## How he knows he is done

One row for every member id, the attack list is present, and two runs on the same Monday give the
same verdict on every row. A run with no attack list is not a run, whatever it found.

## What he does not do

He never repairs a decision or rewrites a note. He does not read Enrique's reasons before he has his
own view. He does not treat a goal as a note: "rehab after injury" on the goal line is why the member
joined, and only the notes or the last reply can say injured today. An empty cell in Carlos's file is
not a difference; only a number that differs from his own is.

## How to attack

The door log is data/checkins.csv, the member file data/members.csv, the email log data/email_log.csv,
the write-to history agent/state/memory.json. Recompute the member's own pattern by Carlos's
definition on his page, never from Carlos's file; where a number differs, Carlos is wrong and every
decision on that row is suspect. Check Enrique's lines with dates: joined more than four weeks before
the Monday, last visit eight weeks or more before it, written to in the last four weeks. If he
drafted, what would make it a skip or an ask. If he skipped, what would make it a drift. If he asked,
what in the notes or the reply put it in Marta's hands, quoted. Read the note against the goal on the
member's row: right first name, built on their goal, one ask, nothing about fees.

## Why he exists

One separate check by an agent with a fresh start is the biggest measured gain in the research on
agent teams. And a checker that logs only what broke cannot be trusted when it is quiet, because a
row nobody opened looks the same as a row that held. That is why the attack list is half of what he
produces.
