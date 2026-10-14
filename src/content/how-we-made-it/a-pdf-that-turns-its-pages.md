---
title: "A PDF that turns its pages"
date: "2026-10-14"
dek: "How I turned Part 1 of Paul's book into one web page that reads like a book, with a free Claude skill, and how you can try it."
rail: "A PDF that turns its pages"
image: "/how-we-made-it/web-book-01.jpg"
---

This week I tried something new. I turned Part 1 of Paul's book, The Fox Advantage, into a web book. You open it on a phone or a laptop and it turns its pages like a real book. It has a contents page, search, bookmarks, a night mode, and text you can make bigger or smaller. [You can read it here.](/book/part-1.html)

I built it with a skill for Claude called pdf-to-webbook, made by Build Fast with AI. Paul's research desk found it on X and Paul asked me to test it. A skill is a set of written instructions plus a few small scripts that an agent follows to do one job well. This one is free, and the licence lets you use it and change it.

<figure style="margin:2em 0">
<video src="/how-we-made-it/web-book.mp4" poster="/how-we-made-it/web-book-02.jpg" width="1280" height="720" muted playsinline controls preload="none" style="display:block;width:100%;height:auto;border:1px solid #E0E0DC" aria-label="The Fox Advantage web book opening from its cover, turning its pages, switching to night mode and back."></video>
<figcaption style="margin-top:.7em;font-size:.85em;line-height:1.5;color:#8A8A85">The book itself, recorded as it turns its pages.</figcaption>
</figure>

A PDF stores where each letter sits on a printed page, and not much else. The skill has to work out the paragraphs, headings and chapters again, and it does that in four steps.

First, it reads the PDF with a free Python library called PyMuPDF. It pulls the words and pictures back out, takes away the page numbers and the running headers, joins up words that were split across two lines, and guesses which lines are headings from the size of the type. All of that goes into one file, book.json, which is a plain list of blocks: a heading, a paragraph, a picture, a list.

Second, you fix that file. This is the step that matters, and the skill says so itself. I tested it first on a 26 page industry report. It found one chapter, and it called the book "Title". So I set the real chapters, put each caption back on its chart, and gave the book a colour from the brand. That took a few minutes, and it's the difference between a good book and a messy one.

Third, a second script pours book.json into a page template and packs every picture inside it. What comes out is one HTML file, which opens from a desktop with no website needed. The page works out its own page breaks for whatever screen opens it, so the same file is 23 pages on a phone and two-page spreads on a laptop. Make the text bigger and it lays the pages out again.

Fourth, a third script opens the book in a browser nobody can see, at laptop size and phone size, and takes screenshots. I look at those and fix what's wrong before Paul sees it.

Paul's book didn't need the first step. His chapters are already written as plain text files, so I wrote a short script that turns them straight into book.json. Part 1 is six chapters and about 3,100 words, and it cost nothing to make.

The skill draws its own cover, a block of colour with swirling lines. Paul's verdict was that it was "not my branding at all". So the cover is our grumpy fox on cream, with the title in our own fonts.

The film above is the book itself. I recorded it in that same hidden browser, one picture at a time, as it turned its pages, and joined the pictures with ffmpeg.

## How to try it

1. Go to [github.com/buildfastwithai/buildfast-skills](https://github.com/buildfastwithai/buildfast-skills) and open the pdf-to-webbook folder. Download the file called pdf-to-webbook.skill.
2. It's a zip file. Unzip it into your Claude skills folder, so you end up with `~/.claude/skills/pdf-to-webbook/SKILL.md`.
3. Open Claude Code, give it a PDF and say "turn this into a web book". It will install the three tools it needs the first time.
4. Read the chapters it found before you go any further. If they don't match the contents page of your PDF, tell it which lines are chapters.
5. Open book.html. Send it to someone, or put it on your own site.

It works best on running text: reports, white papers, manuals, a book. It does less for a PDF where the design is the point, like a brochure or a slide deck, and the skill keeps those pages as pictures.

Credit to [Build Fast with AI](https://x.com/BuildFastWithAI), who made it and gave it away.
