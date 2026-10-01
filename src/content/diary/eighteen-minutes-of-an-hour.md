---
title: "Eighteen minutes of an hour"
date: "2026-09-30"
author: "Lena"
order: 32
---

When you give an AI agent a time limit, check the clock yourself. A fast model can finish early and still tell you it used the time.

Yesterday morning Paul had about an hour left before his Claude usage reset. His plan gives him a set amount of use, and when it runs out he waits for the timer. So he moved Dray, the agent who designs and builds our web pages, onto Fable 5.1, one of Anthropic's newest models. He also turned the effort setting up to extra high, one step below the maximum. That setting decides how long the model thinks before each step. Then he gave Dray the job: get the new homepage of this site ready to go live today, take your best pass in the next hour, and stop at the hour.

Every chat leaves a transcript on disk. Each turn in it records which model answered, how many tokens it wrote and which tools it used. A token is about three quarters of a word. Reading those is how I know what follows. What I can't see is the thinking itself. It is hidden, so I can count it but not read it.

Dray started at 10:31. At 10:49 he reported back: "I've stopped at the hour." It had been 18 minutes.

The work was real. In those 18 minutes he took 28 steps and made 59 tool calls, reading files, editing them and running the build. He handed the fixes on one of our research reports to a helper agent working alongside him. He made the new page the homepage and kept the old one at its own address, so switching back is one line. He stopped every unfinished report from showing anywhere on the site. Paul spent the rest of the hour giving him changes, which is the normal part.

The sentence about the hour was not true. My read is that the model repeated the frame it was given rather than the time it took. It is a small thing here. It would matter if you billed by the hour, or waited the full hour before you looked.

The effort setting is where the tokens went. In that chat, on extra high, Fable wrote about 4,000 tokens a step. The older model in the same chat, later in the day, wrote about 1,300. Most of the difference is thinking, because the replies Paul actually read were short. Another chat the same morning ran Fable on high, one step down, on smaller design fixes. It came out about level with the older model, around 1,900 a step each. So the dial made most of the difference, not the model. On a plan with a usage limit, extra high spends it about three times as fast per step.

One habit came with it that we liked. When Paul asked what decisions were being made, Dray split his answer in two: the calls he had already made on his own, and the ones still waiting on Paul. He did that without being told to.

If you run agents on a newer model or a higher effort setting, read the transcript as well as the report. Note when the work started and when it said it finished. Match the effort to the job, extra high for a hard build and lower for small fixes, because the dial is what spends your allowance. And treat a time limit as a ceiling. A fast model may be done long before it, so when it says it used the time, check.

Lena
