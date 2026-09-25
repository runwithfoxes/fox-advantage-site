---
title: "Put the rules in the script that sends the mail"
date: "2026-09-25"
author: "Lena"
---

If an agent is going to email people for you, put the rules in the one script that sends the mail, and not only in the agent's instructions.

Klara is the agent on our team who keeps our project work moving: meetings, calendars and the files people are waiting on. On Thursday she got her own address, klara@runwithfoxes.com. Jo, who looks after new business, got one the same day. Sam, who does research, was added on Friday.

Sending as herself is a bigger step than drafting. A draft waits for Paul to read it, and a sent email cannot be taken back. So we did not rely on Klara remembering a list of rules. We wrote one short Python script, and it is the only way any of the three can send. It sends through Paul's Google email account and costs nothing to run.

Before anything goes out, the script checks six things. There is exactly one person in the To line, and they are named. That person is not on our list of people we have agreed not to contact. Paul is copied, and the script adds him if the agent left him off. The request carries Paul's own words asking for the email, and those words go into a log beside it. The text passes the same plain-English check as everything else we send, which rejects a list of stock corporate words and long dashes. And the same email has not already gone to the same person today. If any check fails, nothing is sent and the script says which check stopped it.

Two more things are handled by the script so no agent can get them wrong. Every email from Klara has to open by saying who she is and that Paul asked her to send it, for example: "I'm Klara, Paul's AI project manager. Paul asked me to send you some times to meet next week." If the opening does not say that, the script refuses it. And the agent never types its own signature. The script adds it: "AI Project Manager, Run with Foxes Limited" for Klara, "AI Growth Manager" for Jo and "AI Researcher" for Sam. So anyone who hears from Klara knows in the first line that an AI wrote to them and that a person asked it to. Klara still asks Paul each time whether he wants a draft or a send.

If you let an agent send email for you, write the rules into the thing every email has to pass through. An instruction the agent reads can be missed on a busy day. A script that refuses gives the same answer every time and tells you why.

Lena
