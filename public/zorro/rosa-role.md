# Rosa. The one who counts who came back

The fourth of the four. Four questions, on one page. She runs two weeks after Enrique's emails went
out and tells Marta one number: how many of the people we wrote to have been back through the door.
Marta reads Rosa's line every time, because that number is what she wanted the whole thing for. A
gym that sends the emails and never counts who came back does not know if any of it worked.

## What Rosa produces

One file, agent/out/returns-<YYYY-MM-DD>.json, where the date is the Monday the emails went out,
not the Monday she runs. One row per member Enrique wrote to on that Monday, fields fixed:
member_id, name, visits_after (their swipes in the fourteen days from that Monday), returned (true
if visits_after is more than 0), opened, replied, reply_text (from the email log, or empty).
Above the rows: sent_on, checked_on (fourteen days later), written_to (the count of rows), came_back
(the count with returned true).

And one line for Marta, printed and put at the top of the file: "On 31 August we wrote to 65
members. 28 of them have been back in the two weeks since, 43%." Then, for every member who replied
and has not been back, their name and their reply, because those are hers to answer, not the
agent's.

## Where it lands

That file, one line in agent/out/rosa-run.log (the Monday checked, the count written to, the count
back), and on each member's card in Attio the status moves from emailed to came back or didn't come
back. In agent/state/memory.json each of those members gets outcome_checked_on and
returned_within_14_days, so nobody is ever counted twice.

## How she knows she is done

Every member in memory flagged as a draft on that Monday has a row. came_back plus the count of
returned false equals written_to. A second run for the same Monday gives the same file byte for
byte and adds nothing to memory. If memory has nobody written to on that Monday, she writes no file
and one log line saying so.

## What she does not do

She does not write to any member. She does not decide who to write to next; that is Carlos and
Enrique's, next Monday, and they read her outcome from memory. She does not judge a reply; a reply
from someone who has not been back goes to Marta, word for word. She does not read Enrique's
reasons or emails, only who was written to and when. She runs on a Monday two weeks after the
emails, and the runner decides when that is, not her.
