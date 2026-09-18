# How to write a job an agent can do

Enrique's page is the finished thing. This is how you get to a page like it. Seven steps, in
order, and you will do all seven for each of your agents this week.

## 1. Decide what it produces before anything else

Name the thing, and fix its shape. Not "reviews the members" but "one row per member: id,
decision, reason, note or nothing". If two runs could give different shapes, it is not a thing
yet, it is an activity, and an activity cannot be checked. Enrique's shape is four fields and
never changes.

## 2. Name where it lands, and make sure someone reads there

A surface the owner already looks at, named exactly. Enrique lands on the member's record in
Attio because Marta reads Attio. Work that lands in a folder nobody opens has not happened, and
the log will still say success.

## 3. Write the done condition so it can fail

"Every member in the door log has a row, the rows are on the records, and a second run on the
same Monday adds nothing." Each part of that can be checked and each part can be false. "When
the members have been reviewed" cannot fail, so it is not a condition.

## 4. Write what it does not do, and split the work at the line where mistakes happen

In real agent teams the mistakes are almost never in the fetching. They are in the sentence
written next to the number. So the one who computes cannot write, and the one who writes cannot
compute. Carlos does the arithmetic with code and copies the result. Enrique never opens the
door log. Put the boundary in the job in plain words, because an agent will drift across it
otherwise and every step after will look fine.

## 5. Name the handoffs, both sides

For every file, field or record that carries work in or out, say what it is and check that the
other agent's page tells it to read that thing. A handoff where one side names a destination and
the other side was never told to look breaks silently, and it looks identical to a working one
from either side. Enrique's page names Carlos's file coming in and Marta's record going out, and
Carlos's page names the same file.

## 6. Keep it on one page, and take a line out for every line you add

A list of instructions is obeyed less the longer it gets, and the drop starts early. A job that
needs a page of steps to run is not written yet. Everything about how the run happens, which
script, which file, which order, lives in a separate runbook, not in the job.

## 7. Run it, count it, attack it, change one line, run it again

Run the job on a Monday you have an answer key for and count the decisions that match. Then let
Cato attack the decisions from the data, and attack the job itself with the four questions above,
assuming the agent is literal, lazy and honest. Every finding is one line to change in the job.
Change it, run the same Monday again, and see the number move. Stop when the number holds and
Cato's attack list comes back with nothing that breaks. That is what "it works" means: not that
it ran, but that you counted.
