# Readability QA, in plain English

This is the automatic check that sits at the end of the SoftCo ad machine. Every
time the machine renders an ad, this gate looks at it and decides PASS or FAIL
before the ad is allowed out. If it fails, the machine does not save the image, and
it prints exactly what was wrong. Nothing off-spec ships by accident.

It checks four things, and it measures them, it never guesses.

**1. Can you read the text against its background? (Contrast)**
It works out the real contrast between each piece of text and whatever sits behind
it, by looking at the actual pixels of the rendered ad (so a gradient or a photo
background is handled properly, not assumed). Small body text has to clear the
accessibility standard (4.5 to 1). Big headline text has a slightly easier bar
(3 to 1), or it can be an intentional, pre-approved brand colour pairing. Faint
grey-on-white or pale-on-pale fails here.

**2. Is the text big enough? (Size)**
Every line of text has to be at least a set size for that format, measured at the
ad's true pixel size. A 9px legal line on a big card fails.

**3. Is anything jammed into the edge or on top of the logo? (Spacing)**
Text has to keep a margin from the edge of the canvas, and nothing is allowed to
sit on top of the logo. Crammed-to-the-corner fails.

**4. Is there too much copy? (Density)**
Each format has a word limit. Email banners also have to stay on a single line.
A paragraph crammed onto a banner fails.

## What you see when it runs
- Pass: `QA PASS  softco/stat_card  (5 text blocks checked, all gates clear)`
- Fail: `QA FAIL  softco/stat_card  - 3 violation(s):` then one line per problem,
  each naming the element, the rule, the measured value, and what it needed. For
  example: `[contrast] headline: large text -> measured 1.16:1, need >= 3:1`.

## When something fails, you decide (not us)
A fail is not a wall. The check opens a page showing each flagged item: the ad, a
zoom on the exact spot, what is wrong in plain words, our recommendation and why,
and three buttons:
- **Fix it** - keep the rule, the ad stays held until the design is changed.
- **Accept just this one** - let this single ad through, the rule stays as it is.
- **Change the rule for all** - update the guardrail itself (e.g. allow smaller
  kicker text, or approve a colour pair) for everything from now on.

You click your choices, press **Apply**, and your own Claude folds them straight
into your settings. Nobody outside your team is involved. "Accept" is one click;
"change the rule" is a deliberate second choice, so a quick yes never quietly
loosens your brand guardrails.

## Why it won't nag you about good work
The thresholds were set from SoftCo's own already-approved templates, so work that
matches what you've signed off passes cleanly. If something ever fails that
shouldn't, the fix is a number in a small settings file (`configs/softco.json`),
not a code change. Each brand gets its own settings file, so the same gate can guard
EPIC, Sabre and the rest later without rebuilding it.
