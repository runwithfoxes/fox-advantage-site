---
title: "When an agent is not an agent"
date: 2026-09-24
dek: "Most people on my course want to learn about AI agents. So what is an agent, what isn't one, and does it matter?"
---

<img src="/essays/when-an-agent-is-not-an-agent/01.png" width="200" alt="The grumpy fox from the book, sitting unimpressed">

When people start my AI course, the first thing I ask is what they want to learn more about. 85% pick AI agents, more than anything else.

When you go into Claude or ChatGPT, they do have agents. They have sub-agents, and they have swarms of agents. Those are real agents. When you ask Claude to do something and it goes off, searches, reads files and works through the steps until it's done, that's an agent at work.

But I don't think that's what most people mean when they say they want an agent. I think they mean the work gets done without them. The agent runs on its own.

There are a few signs of that. The first is that you don't have to start it yourself. You're not the trigger. You're not going to your laptop and asking it to do something. It's started by something else, which could be data moving, or something else altogether. The second is that it can keep running without you having to interact with it and work with it.

There are different definitions of agents, and they'll change over time.

The other thing that isn't technically an agent, I'd argue, is a script. A small piece of Python, a clock, something that just pulls data on a schedule. It isn't doing any thinking. It can feel like an agent, because it runs on its own and the work turns up, but actually it's just a piece of script. It does the same thing every time, and that's the point of it.

This month I built a team of four agents for [a made-up gym in Madrid](/essays/four-agents-for-a-gym-in-madrid), for a class I taught at UCD. The owner, Marta, wants to email the members who are coming in less than they used to, before they give up on the gym. She doesn't have the hours to go through 900 members every week, so the team does it for her every Monday.

That team has all of these in it. There's a clock that wakes every 30 minutes and asks if this Monday has been done yet. That clock is a script. It starts the agents, but it isn't one. Carlos counts every member's visits and Rosa counts who came back, and both are plain Python with no AI, because counting has one right answer. Enrique chooses who to email and writes the emails, and he is Claude doing the thinking. Cato checks the other two, with Python for the sums and Claude for the judgement. I called all four of them agents, because they work like four people on staff, each with one job. Strictly, two of them are scripts. And the team as a whole runs without Marta. She doesn't press anything.

At the end of the day, I'm not sure it matters whether you're using a script, a Claude skill, a sub-agent or an autonomous agent. What Marta wants is for the members who are drifting away to get a good email, and to know how many of them come back.

So the most important thing is to start with the work you want to get done, and what good looks like. Then use whatever does that job best.
