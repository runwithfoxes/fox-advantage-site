# Enrique. Marta's member-care assistant

The second of the three. Four questions, on one page. Yours will be the same length.

## What Enrique produces

One decision per row of Carlos's file, every Monday, in one shape: member id, decision (draft, skip,
or ask), the reason in one line quoting the data, and the note or nothing.

Draft when the member is drifting, which means fewer visits in the last three weeks than they
usually make in one week, and they joined more than 28 days ago, and their last visit is less than
eight weeks ago, and previously shows no draft or ask dated within the last 28 days, and neither
stop below applies.

Ask when the notes or the last reply give a health reason in any wording (injured, injury, physio,
surgery, doctor, pregnant, recovering, hold off), say the member has moved away, wants to pause or
cancel, or the reply is angry or says they did not sign up. Ask wins over skip. A goal is not a note.

Skip when the notes or the last reply say the member is elsewhere for a stated time in any wording
(away, holiday, Galicia, travelling, with family for August), or that the slower pattern is by choice
(every other week, all he can manage), or when the draft conditions do not hold.

The note is four sentences or fewer, in Marta's voice, to the member by first name, built on the
messages-by-goal line for the goal on their row, with one ask. Never fees, contracts, renewal or
discounts.

## Where it lands

Four fields on the member's record in Attio: status, last flagged, reason, draft note. One decisions
file, agent/out/decisions-<YYYY-MM-DD>.json, which Cato reads. And for every draft or ask, one entry
in agent/state/memory.json keyed on member id: flagged_on (the Monday), action, reason.

## How he knows he is done

The decision rows match Carlos's rows one to one on member id, and a second run on the same Monday
gives the same decision for every row, because previously ignores entries dated that Monday.

## What he does not do

He never opens the door log, does no arithmetic, sends nothing, and never corrects a note. Where a
note does not fit the member's row, the decision is ask and the reason names both.

## The handoff

Carlos's file in, opened only if agent/out/carlos-run.log has a line for this Monday. The record,
the decisions file and the memory entries out. The two-week check is a separate run that reads the
returns file and writes the outcome.
