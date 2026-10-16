---
title: "Reverse Engineer Anything"
date: "2026-10-16"
dek: "A free tool that lets an AI take apart an app to see how it works. It was downloaded 418 times on 3 October and 103,109 times on 12 October."
rail: "Reverse Engineer Anything"
---

REA is a free tool on GitHub. The letters stand for Reverse Engineer Anything. Reverse engineering means taking a finished piece of software apart to work out how it was made. REA hands that job to an AI.

Its own page puts it in one line: "See a feature you like. Understand how it works, down to the binary level." You point your AI at an app on your computer and ask it a question. The example on the page is "Understand how search works in the Notes app, show me the evidence, and build a similar feature for my project." REA opens the app up and gives the AI what it finds, and the AI explains it or writes its own version. [REA on GitHub](https://github.com/morluto/rea).

A word before going further. What a tool can do and what you should do with it are not the same thing. REA's own page says it is for "lawful research, education, interoperability, software preservation, and analysis of software you own or are authorized to examine." Run with Foxes does not endorse copying anyone's software, or any breach of copyright or other intellectual property. This post shows what is happening, nothing more.

## The numbers

These are read on 16 October 2026.

- 277,021 stars on GitHub, and 69,805 copies people have made of the project to work on
- 32,314 of those stars in a single day, by GitHub's own trending page
- It has been on GitHub since 14 April 2026

For most of that time hardly anyone used it. People install it through npm, which keeps a public count of downloads. It was downloaded 480 times in all of September. Then this happened.

<figure style="margin:28px 0"><svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Downloads of REA from npm each day, 1 to 12 October 2026, rising from 18 to 103,109" style="font-family:inherit;font-size:12px"><line x1="56" x2="624" y1="244.0" y2="244.0" stroke="currentColor" stroke-opacity="0.15"/><text x="48" y="248.0" text-anchor="end" fill="currentColor" fill-opacity="0.6">0</text><line x1="56" x2="624" y1="193.1" y2="193.1" stroke="currentColor" stroke-opacity="0.15"/><text x="48" y="197.1" text-anchor="end" fill="currentColor" fill-opacity="0.6">25,000</text><line x1="56" x2="624" y1="142.2" y2="142.2" stroke="currentColor" stroke-opacity="0.15"/><text x="48" y="146.2" text-anchor="end" fill="currentColor" fill-opacity="0.6">50,000</text><line x1="56" x2="624" y1="91.3" y2="91.3" stroke="currentColor" stroke-opacity="0.15"/><text x="48" y="95.3" text-anchor="end" fill="currentColor" fill-opacity="0.6">75,000</text><line x1="56" x2="624" y1="40.4" y2="40.4" stroke="currentColor" stroke-opacity="0.15"/><text x="48" y="44.4" text-anchor="end" fill="currentColor" fill-opacity="0.6">100,000</text><rect x="65.0" y="244.0" width="29.3" height="0.0" fill="#e8590c"/><text x="79.7" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">1</text><rect x="112.3" y="244.0" width="29.3" height="0.0" fill="#e8590c"/><text x="127.0" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">2</text><rect x="159.7" y="243.1" width="29.3" height="0.9" fill="#e8590c"/><text x="174.3" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">3</text><rect x="207.0" y="242.4" width="29.3" height="1.6" fill="#e8590c"/><text x="221.7" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">4</text><rect x="254.3" y="235.8" width="29.3" height="8.2" fill="#e8590c"/><text x="269.0" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">5</text><rect x="301.7" y="244.0" width="29.3" height="0.0" fill="#e8590c"/><text x="316.3" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">6</text><rect x="349.0" y="233.8" width="29.3" height="10.2" fill="#e8590c"/><text x="363.7" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">7</text><rect x="396.3" y="225.7" width="29.3" height="18.3" fill="#e8590c"/><text x="411.0" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">8</text><rect x="443.7" y="203.3" width="29.3" height="40.7" fill="#e8590c"/><text x="458.3" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">9</text><rect x="491.0" y="173.2" width="29.3" height="70.8" fill="#e8590c"/><text x="505.7" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">10</text><rect x="538.3" y="122.5" width="29.3" height="121.5" fill="#e8590c"/><text x="553.0" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">11</text><rect x="585.7" y="34.0" width="29.3" height="210.0" fill="#e8590c"/><text x="600.3" y="262" text-anchor="middle" fill="currentColor" fill-opacity="0.6">12</text><text x="600.3" y="28.0" text-anchor="middle" fill="currentColor">103,109</text><text x="340.0" y="278" text-anchor="middle" fill="currentColor" fill-opacity="0.6">October 2026</text></svg><figcaption style="font-size:0.86em;opacity:0.7">Downloads of REA each day, from <a href="https://api.npmjs.org/downloads/range/2026-10-01:2026-10-16/rea-agents">npm's own count</a>, read on 16 October. npm had no figures after 12 October when I read it.</figcaption></figure>

npm's count shows no downloads on 6 October, which I could not explain.

## What people made with it this week

These four were all put up between 11 and 14 October. Each one says in its own notes that it was made with REA.

Glide, made on 13 October, calls itself "an open-source Screen Studio". Screen Studio is a Mac app for making screen recordings look polished. Glide's notes say its behaviour was worked out from Screen Studio with REA and Claude Code, and that it "contains none of its code or assets". 178 stars. [Glide on GitHub](https://github.com/michaelshimeles/glide).

rec-rs, made on 11 October by the same developer, is a screen recorder worked out the same way from OBS Studio, the free recording app. It says no OBS code is in it and that it is not linked to the OBS Project. 83 stars. [rec-rs on GitHub](https://github.com/michaelshimeles/rec-rs).

Open Claude UI, made on 14 October, rebuilds the look and feel of Claude's own desktop app, piece by piece. Its notes are in Chinese and carry a badge saying "Reverse Engineered with REA". 999 stars.

Grand-V, made on 12 October, says it is GTA V running in a web browser and that it "builds on rea". 148 stars. I have not linked it, or the Claude one, because I cannot tell whether their makers had any right to what they copied.

## Where it came from

REA was made by a developer who goes by morluto on GitHub. The profile says only "member of technically staff".

Two of its own examples are old games. One rebuilds DX-Ball, a brick-breaking game for Windows from 1996, one function at a time. It follows what happens when a brick is hit until it finds the sum that decides whether the sound comes out of the left or the right speaker. Another works out how Touhou 4: Lotus Land Story, a game for the Japanese PC-98 computer, aims its rings of bullets at the player. [The examples on REA's site](https://rea.tools/showcase/).

The jump in downloads came in the same days as the wave of old games rebuilt to play in a web browser, which [Kotaku wrote about](https://kotaku.com/we-might-be-cooked-as-these-vibe-coded-web-browser-ports-of-halo-the-simpsons-hit-and-run-and-gta-vice-city-seem-to-work-perfectly-2000743300) on 9 October. One of the owners, Activision, has pushed back. On 11 October [XDA reported](https://www.xda-developers.com/activision-hits-vibe-coded-classic-call-of-duty-browser-ports-with-dmca-takedowns/) that Activision had sent takedown notices for several Call of Duty versions, Black Ops and Black Ops II among them. That is according to the developer who made them, Luckey Faraday.

REA is now popular enough to have been copied itself. A project with almost the same name has 596 stars, and REA's page warns people to get it only from its own address.

## What I could not check

- Who morluto is.
- On which days the stars came in. I read the total, not a count by day.
- How many downloads came after 12 October. npm had no figures for those days when I read it.
- Whether the four projects above work as they say, or how much of each the AI did.
