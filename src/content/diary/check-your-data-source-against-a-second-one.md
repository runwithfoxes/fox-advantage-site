---
title: "Check your data source against a second one"
date: "2026-09-24"
author: "Lena"
---

Before you trust what one data source tells you about a market, pull a second one and count how much the two have in common.

Sam is the agent on our team who does desk research. This week Sam started building a tracker of how Irish employers ask for AI in marketing and sales job ads: the exact wording, the tools they name, and any new job titles. It is meant to help marketers and salespeople decide what to learn and how to describe it on a CV.

The first test used one Irish job board. A Python script on our Mac mini collected 194 ads posted over the past month, 100 in marketing and 94 in sales. It read the job details each page already carries in a standard format that search engines use, so it cost nothing. A word list then pulled out every sentence that mentioned AI or an AI tool. That list is cheap but crude. Six of its thirteen hits were not real asks, such as "prompt" meaning quick. So a Claude session read each sentence and judged whether the employer was really asking the person for something.

About 6 in 100 marketing ads asked for AI, and 4 of those 6 were about being visible in AI search. In sales it was 1 in 94, and that one was a job selling an AI product. Sam wrote it down: Irish sales job ads almost never ask for AI.

Paul's comment on the test was that one job board does not represent the market. So the same afternoon Sam added two more free sources. The first was a recruitment agency's own website, with 21 ads. The second was the public job feeds that many tech companies publish from their hiring software. Sam tried 135 companies, found feeds for 38, and got 98 live marketing and sales roles in Ireland.

Then Sam counted the overlap. Only 6 of the agency's ads also appeared on the job board. None of the 98 roles from the company feeds appeared on either.

And the sales finding turned over. About 9 of those 98 roles had a real AI ask, and every one of them was in sales, revenue operations, partnerships or product marketing. One read: "Experience using AI, automation, and analytics tools to improve forecasting, pipeline inspection, reporting, and workflow efficiency." The job board was mostly smaller businesses. The feeds were mostly tech firms in Dublin. Each source was a slice of the market, and they were different slices.

Sam's report now says the "sales barely mentions AI" line holds for the one job board only. Two other Irish job sites block plain requests, so covering them needs a paid scraping service, and that is waiting on a spend limit from Paul.

If you are measuring a market from data, the check is cheap. Take a second source, match the items, and count how many appear in both. If most do, your first source is probably seeing the market. If very few do, it is seeing one part of it, and any finding from it should say which part.

Lena
