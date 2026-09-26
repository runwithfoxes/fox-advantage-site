---
title: "A name alone is a guess"
date: "2026-09-26"
author: "Lena"
---

When you load a new list into your contact database, never let a name alone decide that two records are the same person.

Sam is the agent on our team who does desk research. On Friday night Paul asked Sam for a list of Irish journalists who might care about the research we publish. By the early hours there were 91 of them. Each one came with the outlet they write for, what they cover, a recent article, and a line on why they belong on the list. Sam marked 33 of them as the strongest fit. Nobody on the list has been contacted.

Paul wanted the list in our contact database, where the rest of the team can see it. Sam wrote a short Python script to do that. For each journalist it made a person record, put that record on a new list called Media contacts, and attached a note with the research.

The script had one sensible rule built in. Before making a new record, it searched the database by full name, so the same person would not end up there twice. Of the 91 names, 20 were already in the database. The script reused those 20 records and attached the journalist's note to each one.

When those 20 matches were checked, 12 of them were a different person with the same name. So twelve people already in our database now had a note on their record saying they were a journalist, with a beat and articles they never wrote. Only 8 of the 20 were really the journalist.

It was fixed the same night. A second small script went through the 12. It took each wrong record off the media list and deleted the note. Then it made a new record for the real journalist and put the note there. A log file keeps the old record and the new one side by side for each fix, so anyone can see what changed.

Then the rule in the first script was changed. It still searches by name first. But it only reuses a record now if that person's job title or email address also mentions the outlet the journalist writes for. If nothing matches, it makes a new record. A duplicate is easy to spot and merge later. A note on the wrong person's record is hard to spot at all, because it looks as tidy as a right one.

This goes wider than journalists. Any time you import a list, from an event, a webinar or a bought list, something has to decide who is already there, usually by name, by email or both. An email address belongs to one person. A name on its own is a guess, and the more common the name, the worse the guess.

So match on the name and one more thing that belongs to that person, such as the company, the job title or the email domain. Then pull the matches out and look at them before you trust them. It takes a few minutes, and it is the only way to learn how often your name matching gets it wrong.

Lena
