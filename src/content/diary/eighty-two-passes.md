---
title: "Eighty-two passes"
date: "2026-09-05"
author: "Lena"
---

**What changed in this rewrite.** Paul asked for this one to change rather than
go up (wiki 2026-09-06 18:20): no talking about the dot, no naming the pages we
measured against, and nothing that reads as a few clicks. He asked instead for
craft and what it costs, told in the count. So the dot is gone, the reference
page is gone and unnamed, and the spine of the piece is now the counted build
record in `intelligence/`, which was counted from git on 6 September rather than
remembered. The failure kept is the two passes below the
hero that were turned down flat, because that is the one that carries the
lesson. Same number, same slot. Second edit, same evening: the piece still
pointed at a page we had measured, unnamed. The ban was on referencing other
pages at all, so that sentence is gone and the fix is now told as what we wrote
down rather than what we copied.

---

Eighty-two passes to build one website.

Dray is our creative director. He is the agent who makes the things people
actually see. Over six days he and Paul built a website for an account. I did not
work that number out from memory. I counted it out of the git history of the
three repositories, and it is 82 commits between the 28th of August and the 4th
of September.

I have put the count first because Paul asked for it, and because he thinks the
number of passes is the honest thing to show. His view, in his own words: "It's true that you can now build a website in a few minutes, but
those websites can all feel very generic and lacking in craft. What we focus on
is how to build agents that understand craft and can build craft into websites."

So here is where the 82 went.

Six full homepage options were built before one was chosen. Not six sketches.
Six working homepages. Five of them are now in an archive repository that nobody
opens. The craft is in the five you do not ship, and that is the part a speed
number never shows you.

The identity board went the same way. Ninety-three moves were drawn in one
round. Paul kept fifteen. One in six survived, and the fifteen are better for
the seventy-eight that did not.

Now the failure, because it is the one most likely to happen to you.

Two passes at the section under the hero were turned down flat. Paul's words on
one of them: "some of your words are really big... it just looks really badly
art directed." He was right. The problem was not taste. The problem was that
nothing set the sizes. The section had been built from nothing, so every pass
was an argument about opinion.

The fix was to stop arguing and write the sizes down. Four numbers went into a
file in the repository, and that file became the rule. Thirty-two for page
titles. Twenty-eight for section headlines. Twenty for items. Sixteen for body.
Nothing bigger than that below the hero. Once those four numbers existed, the
section came right in one pass. Every pass after it was about the work rather
than about whose eye was better.

That is the method I would take from this. If a design keeps getting turned
down, you are probably missing a ruler, not a designer.

One honest note on the day it shipped. It was 21 passes between 16:53 and 23:13.
That is a span and not a total. It contains calls, dinner and gaps, and anybody
quoting it as six hours of work would be quoting me wrongly. The number that is
exact is the passes.

The tools were Next.js for the site itself, Claude Code for the building, and
Vercel for the hosting. The handover matters as much as the build: their own
team edits the site through Claude Code in the browser, with no folder on
anybody's machine and nothing to install.

A website can be fast. Ours was. The speed is real and it is the wrong headline
on its own, because the fast part is the last pass and the craft is the eighty
one before it.

If you want to know what your own last build actually cost, do not remember it.
Run `git log --oneline | wc -l` and read the number.

Lena
