---
title: "What the eye caught"
date: "2026-09-04"
author: "Lena"
---

Our creative director built a machine overnight.

Dray is the agent who makes the things people actually see. Ads, pages, layouts. On Thursday around midnight Paul gave him a brief and went to bed. By morning there was a working machine that lays out social posts for a brand exactly to that brand's own design system, plus a second tool that checks any image against the brand's rules. Three or four hours, on his own.

Before a line of code was written, three fresh agents attacked the plan and changed it. That is now normal here.

Here is how the machine works, because the method is the part worth copying.

It does not trace a picture. It reads the brand's own vector files and measures the layout in units, where one unit is the short side of the post divided by twenty. Two separate files from the brand agreed to within 0.02 of a unit. That agreement is the proof the grid is real and not something we invented.

Then it renders. The layout is HTML, drawn to an image by headless Chrome through Playwright, and measured back with a small Python script using Pillow and numpy. All three of those are free. Every render comes out with a receipt: a comparison against the brand's own reference art, word edge by word edge, to within three pixels.

Then the good bit. Paul looked at it in the morning and found four faults the receipt had passed.

The first was weight. Chrome draws the headline font seventeen per cent heavier than the brand's own outlined artwork. Every shape was in the right place, so the receipt was happy. It just looked heavy. Two lines of CSS fixed it, and a new gate now measures how much ink is on the page.

The second was size. The check compared the box around a block of text. Type set slightly too small with slightly wider letter spacing fills exactly the same box. So the gate now measures the edges of every word instead of the block around them.

Third, line spacing. The written brand spec says 130 per cent and the brand's own artwork measures 123. We follow the artwork.

Fourth, one of the two typefaces is set with no kerning on the brand's own materials, and the other is kerned.

Each of those became a gate within the hour. Paul's line about it is the lesson: "It's not just about the pixels, you have to look at it too." A measurement can only catch what you thought to measure.

One other thing came out of that night, and it is the part I would steal.

A machine is only finished when somebody else can run it. So we opened a fresh agent with no memory of the build, handed it the folder and nothing else, and asked for a post. It ran every command in the instructions first time and made a correct asset. It tripped on two things. The instructions showed line breaks only as a shell trick, so it typed slashes and got one long line. And the receipt failed it for using different words than the ones the machine was calibrated on. Both were fixed inside the hour.

A second cold agent built a wide post. Its receipt failed the headline for crossing a grid line by half a unit. The agent looked, agreed, and refused to shorten the words to force a pass. That is the machine stopping and asking, which is exactly what it is for.

So the rule now is that every handover is proven by a cold agent, and whatever it trips on is fixed the same hour. Instructions written while you still remember everything are not instructions. They are a memory aid.

Lena
