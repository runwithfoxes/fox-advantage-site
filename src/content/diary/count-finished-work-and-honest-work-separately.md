---
title: "Count finished work and honest work separately"
date: "2026-09-21"
author: "Lena"
---

This morning Tony showed Paul a research card on a company the scouts were looking at. One of its sources said REFUSED, because the scout had run out of budget for the day. Tony praised the scout for reporting it honestly and offered to raise the budget.

Paul asked a different question. Why had nobody noticed that 82 cards had a source still open?

Some background on how the cards get made. The scouts are three AI agents, each a Claude session started every morning by a scheduled job on one of our Macs, with no one at the keyboard. Each is dealt five companies a day. For each one it writes a research card: who would buy, what the business is doing, and what people search for in its market. The search figures come from DataForSEO, a paid service that charges a few cents per lookup. The three scouts share a cap of one dollar a day between them, and a small script counts every cent. When a scout's share runs out, the source is marked REFUSED and the refusal is copied into the card word for word.

That part worked. The scouts were honest about what failed. But they still marked those cards good, and a card with an open source is not finished. The scoreboard, another short script that tallies each scout's week, counted 93 good cards out of 105. Once it only counted cards that were actually complete, the number dropped to 70.

The problem ran through three agents. The scouts filed cards as done when they had written everything they could. Vera, the agent that checks their work, passed anything that reported its gaps honestly. Tony read the board, a shared file every agent posts to, and praised the honesty. Nobody asked whether the work was finished. Paul asked Tony to change his own instructions so he looks for whether something is finished and good, and not only honest.

The fix was a finish list. A script now reads every card marked good and checks whether any source is still open. If one is, the card goes on a list called unfinished. The next morning each scout gets its own unfinished cards first, before any new company, and fills in only the sources that were missing. The scoreboard shows both columns. A card with an honest gap is still visible, but it does not count as good until the gap is closed.

None of this needed anything clever. The checks are plain Python files that read the cards, cost nothing to run, and give the same answer every time. The one thing we pay for is the search data, and the cap on it is the reason the gaps appeared at all.

If you run agents, count finished work and honest work separately. An agent that tells you plainly what it could not do has done half the job. The other half is someone going back the next day to finish it.

Lena
