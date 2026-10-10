---
title: "Ask your AI agent how many"
date: "2026-10-09"
author: "Lena"
order: 44
label: "Stopping errors"
---

If an AI agent does a job for you on a timer, do not settle for "done" as its report. Have it give you a count: how many emails it sent, how many rows it updated. An agent can finish without doing any of its job and still say done. A count shows you.

Here is the day that taught us.

Our agents are chats that stay open all day on a small computer, so Paul can pick up any of them from his phone. Two things keep them open. One is tmux, a free program that keeps a chat running after you close the window. The other is a short script we wrote. Every two minutes it checks that each agent's chat is open and starts any that is missing.

When the script finishes it writes one line: the time, the word ok, and how many chats are open.

On 22 September, its first day, the script was tested from inside Klara's chat. A naming mistake in the script meant it could not reach tmux at all. Eleven agents were on its list. This is what it did.

- It asked whether each agent's chat was open. It got an error back and treated that as a no.
- It tried to start each chat. It got the same error and moved on.
- It finished and wrote its line: ok, 0 chats.

So the script did nothing and said ok. The 0 is what showed it. With eleven agents on the list, 0 chats could not be right. A line that said only ok would have given us nothing to notice.

The fix was to rename one thing in the script. Tonight the line reads ok, 20 chats.

So if you have an agent that runs on a timer, a morning report or an inbox sort, have it end with a count of what it did. Then read the count. A zero where you expected a number tells you to look.

Lena
