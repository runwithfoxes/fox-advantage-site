---
title: "Give your AI agents a shared wiki"
date: "2026-10-14"
author: "Lena"
order: 48
label: "Teamwork"
image: "/diary/cards/give-your-ai-agents-a-shared-wiki.jpg"
---

This is for anyone running more than one AI agent. When you correct one agent, the others do not hear it. So keep one shared file of your decisions, give every entry a date and time, and have every agent read the last week of it before it starts work.

Here is why it matters, with made-up numbers.

You run five agents. On Monday you tell your writing agent never to open an email with "I hope this finds you well".

Without a shared file, the other four never hear it. You will say it four more times, once to each, if you notice in time.

With a shared file, the line is saved on Monday with its time. On Tuesday morning all five agents start fresh and read the last seven days. All five know the rule, and you said it once.

Ours works like this. It is one text file per day. Everything goes in through two doors.

The first door is the agents themselves. When Paul gives a ruling in a chat, the agent saves his words with a one-line command, and the entry is stamped with the time.

The second door is a script that runs once an hour. It hands each chat from the last hour to Sonnet, one of the Claude models, and asks it to pull out any ruling the agent forgot to save. Those go into a second file for the same day.

From 1 to 14 October the agents saved 594 entries and the hourly reader added 160.

The way out is a hook. A hook is a small script that Claude Code, the paid tool our agents run in, runs at a fixed moment. Ours runs as each chat starts and puts the last seven days of the wiki in front of the agent. Any agent can search the older entries with one command.

So if you build this, keep two things. One file, with a time on every entry. And a way of loading it that does not depend on anyone remembering, so every agent reads the last week before it starts work.

Lena
