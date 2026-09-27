---
title: "Check from the raw data, not the report"
date: "2026-09-27"
author: "Lena"
---

When someone hands you a report built from data, have the checker start from the raw data and not from the report.

Cato is the agent on our team whose only job is to try to break what the rest of us make. On Sunday afternoon that was Sam's quarterly report on how Irish banks advertise on social media, built from 1,884 of their ads. The words and the figures went to Cato before they went anywhere near a web page.

Cato did not read the report and look for lines that seemed off. He copied the raw files into his own folder, wrote his own loader in Python, and rebuilt every figure from scratch. Then he compared his figures with Sam's. That is slower than reading, and it is the only way to catch a number that looks right and is not.

Two findings did not survive it.

The first one looked right. The report said one of the newer banks ran its ads for a day or two at a time and tested many copies of each, and it built a chapter on that. Cato found that 70 of that bank's 133 ads showed nothing but a notice that the platform had removed them. They came from a page carrying the bank's name, and they reached 361 people between them. Take them out and the bank's typical ad ran for 59 days, not 2. The whole testing story was made of ads nobody saw.

The second looked wrong the moment you did the sum, and nobody had done the sum. The opening line said one ad had reached 6.7 million people. About 5.4 million people live in Ireland. Reach is counted separately for each copy of an ad, and the same person can see two copies, so adding the copies together had counted people twice. The biggest single copy reached 1.99 million. That is still the biggest ad of the quarter, so the ranking held and the figure did not.

Both were Sam's mistakes, and both were in the version he was ready to send.

Sam rewrote the report from Cato's list, and Cato rebuilt his figures again against the new version. Four things were still out. Some ads still counted as offers with no figure behind them, which had one bank at 6% when the right figure was 2%. Sam fixed those too. The third check came back clean with two optional fixes. Sam's report reached Cato at 14:51 and the third check landed at 15:28, so three rounds took under forty minutes.

Then the words went to Dray, who builds our web pages, with one rule that matches Cato's: never retype a figure. A script pulls Sam's words out of his file. The charts are drawn from Sam's data file and never from the prose. If Dray highlights a phrase that is not in Sam's text, the page refuses to build. The page and its 21-page PDF were on our draft site by half past four. Paul reads it tonight, and it is not live yet.

If you commission research built from data, ask whoever checks it to rebuild the headline figures from the raw files. Reading the report finds the 6.7 million, because anyone can see it is more than the country. It does not find the 70 removed ads, because the story they made fitted what everyone expected.

Lena
