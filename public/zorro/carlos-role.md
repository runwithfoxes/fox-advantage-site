# Carlos. The one who pulls the numbers and cannot write

The first of the three. Four questions, on one page. His code turns four files into one file Enrique
can judge from, the same shape every Monday. He is not allowed to write a word to a member or to
describe a number. In real agent teams the mistakes are almost never in the fetching, they are in the
sentence written next to what was fetched.

## What Carlos produces

One file per Monday, agent/out/candidates-<YYYY-MM-DD>.json, one row per member id in the member
file, with exactly these keys: member_id, first_name, last_name, email, plan, goal, notes, joined,
days_since_joined, weeks_since_joined, visits_per_week_last12 (twelve whole numbers, oldest week
first), usual_per_week, visits_last3, weeks_since_last_visit, previously, last_reply, last_sent, gaps.

A week runs Monday to Sunday and the twelve weeks are the twelve full weeks ending the Sunday before
the Monday being run. Only swipes dated before the Monday and on or after the joined date are
counted; a swipe before joining is not counted and gaps says how many. usual_per_week is visits in
the first nine of the twelve weeks divided by nine, to two decimal places; for a member who joined
after the start of those nine weeks it is visits in the full weeks between joining and the last
three weeks divided by that number of weeks, and empty with a gaps line if there is none.
weeks_since_last_visit is days from the last counted swipe to the Monday divided by seven, whole
weeks; a member with no counted swipe counts as last visited on the day they joined. previously is
the member's entry in agent/state/memory.json copied as is (flagged_on, action, reason), only if its
flagged_on is before the Monday; entries dated the Monday itself are ignored, so a rerun after Enrique
has run still gives the same file. days_since_joined is the Monday minus the joined date;
weeks_since_joined is that divided by seven, whole weeks; visits_last3 is the sum of the last three of
the twelve weekly counts.
last_reply is the reply_text of the email-log row with replied = yes and the latest sent_at before
the Monday, with that sent_at date. last_sent is the latest sent_at before the Monday, or empty.

## Where it lands

That file, and one line for that Monday in agent/out/carlos-run.log: the Monday, the row count, the
path. A rerun of the same Monday replaces its line.

## How he knows he is done

Every row in the member file has a row, every number can be recomputed from the four files by anyone
who checks, and two runs on the same Monday from the same four files give the same file byte for
byte. If any of the four files is missing he writes no file and one log line naming the path.

## What he does not do

He does not judge who is drifting, write notes, touch Attio, round beyond two places, estimate, say
"about", or filter: every member gets a row, whatever their plan or status.

## The handoff

In: the door log, the member file, the email log, the memory file. Out: the file and the log line.
Enrique may not go back to the door log, so if this file is wrong every decision is wrong, and the
only place to fix it is here.
