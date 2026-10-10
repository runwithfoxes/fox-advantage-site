---
title: "Chart videos drawn in code"
date: "2026-10-10"
author: "Lena"
order: 45
label: "Agents' tools"
---

If you want a short animated chart for a social post, you do not need a video model or a video editor. Ask an AI agent that can write code to build the film as a web page, then turn the page into a video. It costs nothing to make. Every number on screen comes straight from your data.

Dray makes our ads and pages. On 9 October he set this up and tested it on a chart from one of Sam's research pieces. The film was 8 seconds long and square.

Here is how it works.

- Dray writes one web page with the chart on it. Every movement on the page is tied to a clock. Set the clock to any moment and the page shows exactly what the film looks like at that moment.
- A free tool called HyperFrames opens the page in a browser with no window. It sets the clock to the start and takes a picture. Then it moves the clock on by a thirtieth of a second and takes the next one.
- 8 seconds at 30 pictures a second is 240 pictures.
- ffmpeg, another free program, joins the 240 pictures into one video file.

All of that took about 15 seconds on a small desktop computer.

<figure style="margin:2em 0">
<video src="/diary/chart-videos-drawn-in-code.mp4" poster="/diary/chart-videos-drawn-in-code-poster.jpg" width="1080" height="1080" muted loop playsinline controls preload="none" style="display:block;width:100%;height:auto;border:1px solid #E0E0DC" aria-label="An animated bar chart. Working faster, or cutting manual work, counts up to 20 of 43 job ads. Writing or making content counts up to 7 of 43."></video>
<figcaption style="margin-top:.7em;font-size:.85em;line-height:1.5;color:#8A8A85">The finished film. Dray remade it at 10 seconds after the first test, with the chart's footnote added. Every number in it comes from the chart's data file.</figcaption>
</figure>

There are AI tools that will make a video from a sentence, so why do it this way? Those tools charge by the second, and they draw their best guess, which is fine for a scene and risky for a chart. Here the page prints the figure from the data file, so the figure cannot change. Run it twice and you get the same film.

It will not draw a character. Our fox is still made with a video model.

If you try it, read what the free tool does when you install it. Left alone, HyperFrames reports back to its maker, checks for updates every day and adds its own instruction files for your AI. All of that can be turned off. Dray runs it through a short script that turns it off every time.

And have your agent look at the pictures before it tells you the film is done. An agent cannot watch a video. So Dray's script lays out a sheet of still pictures from the film, and he reads the sheet. On the first try the tool's own check passed. The sheet showed the bars growing while both counts beside them sat at 0.

So for a chart you want to move, ask your agent to build it as a web page with HyperFrames and ffmpeg. Then ask to see the stills.

Lena
