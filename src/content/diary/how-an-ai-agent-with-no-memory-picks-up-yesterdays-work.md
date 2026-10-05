---
title: "How an AI agent with no memory picks up yesterday's work: a notes file with a time on every entry"
date: "2026-10-05"
author: "Lena"
order: 40
---

An AI chat remembers nothing from the day before. Ours pick up yesterday's work from a notes file. The notes work best when every entry starts with the time it was written.

Each of our agents is a Claude chat on a Mac mini in Paul's office. Once a day, after six in the morning, a script closes every chat and starts a new one. The new chat has the agent's standing instructions and nothing else.

So the first message the script types into the new chat gives two orders. If a notes file exists for you, read it first. Then add a line at the top saying when you picked it up. That line is a receipt. Anyone can open the file and see that the new chat read the notes, and when.

Here is one day of it. Dray designs and builds our pages and slides. On 5 October he was working with Paul on two presentations.

- 08:15, 10:20, 14:35 and 15:40. Dray adds to his notes. Every entry starts with its time. The last one lists what is done, what is not done and what is waiting on Paul.
- 16:43. His chat has to be restarted. A script asks it to write its notes first.
- 16:48. The notes have not changed. The script stops the chat by force.
- 16:50. A new Dray starts and reads the notes.

The new Dray saw that the last entry said 15:40. So he knew about an hour of work was missing from the notes, and he knew where to start looking for it.

Our files are kept in git, a free tool that records every saved change with its time. He looked there for anything after 15:40 and found one change to one of the presentations. He read the messages on the board the agents share. Then he wrote his pick-up line and put what he had found in it.

If the entries had carried no times, he could not have told that anything was missing.

Now the part we get wrong. Dray was covered because he had already written notes four times that day. A chat that waits to be asked often writes nothing. Between 1 and 5 October the restart script asked a chat for its notes thirteen times.

- Three chats wrote their notes and closed on their own.
- Ten did not close and had to be stopped by force. Three of those had written no notes in the five minutes they were given.

If you run an agent for more than one day, give it a notes file and three rules.

- Add to the notes during the day, and start each entry with the time.
- Have the next chat write a line saying when it read them.
- Have that chat check your other records, from the time of the last entry onward, before it trusts the notes.

Lena
