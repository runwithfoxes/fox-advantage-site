---
title: "I turned my book into a web book"
date: 2026-10-14
dek: "A free Claude skill turns a PDF into one web page that reads like a book. Here is how it works and how to try it."
---

![The first page of The Fox Advantage turning in the web book](/essays/my-book-turns-its-pages/01.jpg)

This week I tried something new. I turned Part 1 of my book, The Fox Advantage, into a web book. You open it on your phone or laptop and it turns its pages like a real book. It has a contents page, search, bookmarks, a night mode, and text you can make bigger or smaller. [You can read it here.](/book/part-1.html)

It's built with a skill for Claude called pdf-to-webbook, made by Build Fast with AI. I saw it on X. A skill is a set of written instructions plus a few small scripts that an agent follows to do one job well. This one is free, and the licence lets you use and change it.

<video class="essay-embed" src="/essays/my-book-turns-its-pages/film.mp4" poster="/essays/my-book-turns-its-pages/02.jpg" playsinline controls muted></video>

## How it works

A PDF doesn't know what a paragraph is. It only knows where each letter sits on a printed page. So the skill does its work in four steps.

First, it reads the PDF with a free Python library called PyMuPDF. It pulls the words and pictures back out, takes away the page numbers and the running headers, joins up words that were split across two lines, and guesses which lines are headings from the size of the type. All of that goes into one file, book.json, which is a plain list of blocks: a heading, a paragraph, a picture, a list.

Second, you fix that file. This is the step that matters. The skill says so itself: your judgement goes in here. When Dray, my AI creative director, tested it first on a 26 page industry report, it found one chapter and called the book "Title". Dray set the real chapters, put each caption back on its chart, and gave it a colour from the brand. That took a few minutes, and it's the difference between a good book and a messy one.

Third, a second script pours book.json into a page template and packs every picture inside it. What comes out is one HTML file. It opens from your desktop with no website needed. The page works out its own page breaks for whatever screen opens it, so the same file is 23 pages on a phone and two-page spreads on a laptop. Make the text bigger and it lays the pages out again.

Fourth, a third script opens the book in a browser nobody can see, at laptop size and phone size, and takes screenshots. The agent then looks at them and fixes what's wrong before you see it.

My book didn't need the first step. The chapters are already written as plain text files, so Dray wrote a short script that turns them straight into book.json. The cover is our grumpy fox on cream, with the title in our own fonts, because the skill's own cover looked like nobody's brand. Part 1 is six chapters and about 3,100 words, and it costs nothing to make.

The film above is the book itself, recorded in that same hidden browser, one frame at a time, as it turns its pages.

## How to try it

1. Go to [github.com/buildfastwithai/buildfast-skills](https://github.com/buildfastwithai/buildfast-skills) and open the pdf-to-webbook folder. Download the file called pdf-to-webbook.skill.
2. It's a zip file. Unzip it into your Claude skills folder, so you end up with `~/.claude/skills/pdf-to-webbook/SKILL.md`.
3. Open Claude Code, give it a PDF and say "turn this into a web book". It will install the three tools it needs the first time.
4. Read the chapters it found before you go any further. If they don't match your book's own contents page, tell it which lines are chapters.
5. Open book.html. Send it to someone, or put it on your own site.

It works best on running text: reports, white papers, manuals, a book. It does less for a PDF where the design is the point, like a brochure or a slide deck, and the skill keeps those pages as pictures.

Credit to [Build Fast with AI](https://x.com/BuildFastWithAI), who made it and gave it away.
