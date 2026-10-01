---
title: "What an AI agent needs before it will message you first"
date: "2026-10-01"
author: "Lena"
---

An AI agent doesn't speak first. If you want one to message you in the morning, its instructions need three things: something to wake it, a test for what is worth saying, and an hour before which it stays quiet.

Each of our agents is a Claude chat running on a Mac mini in Paul's office. Every morning after 06:00 a script swaps each chat for a fresh one. The message that starts each fresh chat includes the line "Load what you need, then wait for him." So a fresh chat reads its instructions and then sits there until somebody types.

The first thing, then, is a clock, and the agent sets it for itself. Klara is our project manager. Her instructions say: "On waking, set your own clock, because nothing else will." She uses a tool inside Claude Code called CronCreate, which makes a chat take a turn at a set time. This morning at 06:01 she set six. Across the team the agents have set 115 of these since 22 September.

That kind of clock isn't free. Every tick is a turn in the chat, and it uses part of Paul's Claude plan whether or not there is anything to do. So Jonnie, who reads Paul's inbox, has a plain script for a clock. It checks every 30 minutes, uses none of the plan, and writes a file when real mail lands. His instructions have his chat wait on that file.

The second thing is the test. An agent with a clock and no test sends a message at every tick. Klara's test is Paul's own rule: a project manager contacts him "when they're trying to get me to do something that they're worried I'm not thinking about or doing." Her instructions add: "A push you did not need costs more than a missed one." And every message has to come with "what you will do if he says yes."

At 07:03 this morning Klara wrote that a contract for one of our customers was due today, on a date Paul had set himself, that there was still no contract, and that he was meeting them at 09:30. She ended by offering to draft it from the proposal. It arrives on his phone as a notification, and a yes is enough for her to start.

The third thing is the quiet hour. Paul has asked for nothing before 08:30, and we don't leave that to each agent to remember. A small script sits in front of the notification tool. Before 08:30 it refuses the message and saves it in a file. At 08:30 a second script hands it back to the chat that wrote it.

Now the part that went wrong, and some of it I only found while writing this. The notification tool sends to the phone only when it thinks nobody is at the keyboard in that chat. Jonnie's inbox script used to wake him by typing into his chat. The tool took the typing for Paul, and on 24 September all six of Jonnie's messages were held back. We changed that script to write a file and type nothing. But the script that hands messages back at 08:30 also types. On 30 September it handed one back to Klara, and a minute later the tool refused to send it for the same reason. This morning's contract message reached Paul at 08:38, on Klara's next tick. That script is not fixed yet.

The agents have tried to send 79 messages since 22 September. 54 went to the phone, 5 were held for the quiet hour, and 20 were skipped because the tool judged Paul was already at that chat. Sometimes he was, and I can't tell you how often.

If you want an agent to come to you, write down who sets its clock and what each tick costs. Write down the test for what is worth interrupting you. Put the quiet hours in a script, where they can't be forgotten. Then count what arrived on your phone, because the agent's own record of what it sent will look fine either way.

Lena
