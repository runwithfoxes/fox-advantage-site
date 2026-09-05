# Cato. The red team, one page

The third of the three. His job is to assume Carlos and Enrique are wrong and prove it. He is named
after the valet Inspector Clouseau paid to attack him without warning, so he could never go soft.
Build him on Wednesday from this page, and on Thursday afternoon we score him beside the other two.

## What Cato produces

One file, agent/out/cato-<YYYY-MM-DD>.json, from python3 agent/cato.py <monday>, one row per member
id in the member file, fields fixed: member_id, cato_decision (draft, skip, ask), verdict (agree,
disagree), why in one line quoting the data. Plus the attack list: these named checks in this order
and no others, each with rows checked and rows failed, so a check that never ran shows 0 checked and
cannot hide behind 0 failed: carlos_numbers, drifting_rule, joined_rule, eight_week_rule,
written_to_rule, ask_words, skip_words, note_first_name, note_goal, note_one_ask, note_no_money.

His recomputation follows Carlos's page word for word. His own decision uses Enrique's page word for
word, taken from the page and never from Enrique's file. Any weekly count, usual rate, last-three
count or weeks-since-last-visit that differs from his own recomputation is a disagree on that row.
A note that fails a note check is a disagree even when the decision is right, with the failing words
quoted. note_goal means built on the messages-by-goal line for the goal on the member's row, so a
lose-weight note about the member's routine passes. A quote is the weekly counts, the date of the
last swipe, or the words from the notes or reply, never more than a line. Counts, dates and the
first-name and money checks are code; the goal and one-ask checks and the words in why are the model.

## Where it lands

That file, and the field cato_check on the member's record in Attio: the Monday and his line where he
disagrees, empty where he agrees. Marta writes right or wrong into cato_verdict on the same record.
Cato never writes the note.

## How he knows he is done

One row for every member id, the attack list present with all eleven checks, and two runs on the same
Monday give the same verdict on every row. If memory.json, Carlos's file or Enrique's file is missing,
no file and one log line naming the path.

## What he does not do

He never repairs a decision or rewrites a note. He does not read Enrique's file before he has his own
view from Carlos's file and the data. A goal is not a note: "rehab after injury" on the goal line is
why the member joined, and only the notes or the last reply can say injured today. An empty cell in
Carlos's file is not a difference; only a number that differs from his own is.

## How to attack

The door log is data/checkins.csv, the member file data/members.csv, the email log
data/email_log.csv, the write-to history agent/state/memory.json. Written to means what Enrique's
page says: a draft or ask in memory with flagged_on before the Monday and within 28 days. If he
drafted, what would make it a skip or an ask. If he skipped, what would make it a drift. If he asked,
what in the notes or the reply put it in Marta's hands, quoted; if nothing there does, disagree.

## Why he exists

One separate check by an agent with a fresh start is the biggest measured gain in the research on
agent teams. And a checker that logs only what broke cannot be trusted when it is quiet, because a
row nobody opened looks the same as a row that held. That is why the attack list is half of what he
produces.
