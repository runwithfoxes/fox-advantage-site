---
title: "I built a website tonight using Claude Code"
date: 2026-02-20
dek: "No designer. No UX person. No copywriter. No developer. Here is how:"
substack: https://runwithfoxes.substack.com/p/i-built-a-website-tonight-using-claude
---
![](/essays/i-built-a-website-tonight-using-claude-code/01.png)

Last November I’d spent real money on a Webflow build, paid a designer, gone back and forth on fonts and spacing and all the rest of it. The result was fine. Professional. Just not live. Because webflow templates are a bit tricky and I was struggling to invest time into figuring it out.

So tonight I opened Claude Code and asked it to build me a website for the book. I shared some screengrabs from sites I like. And over a few hours, it did. The whole thing. Landing page, chapter reader, email signup, the lot. No designer. No UX person. No copywriter. No developer. Just me, a terminal window, and a beer, saying “that looks good” or “no, use the orange hex from my brand guidelines.”

I want to walk you through the technical bits, not because you need to understand them, but because I want you to see how much was involved and how little of it I actually had to know.

The site runs on something called Next.js, which is a framework. Think of it as the skeleton that holds everything together. It handles how pages load, how you move between them, how the site performs on different devices. Under that sits React, which is the thing that makes the buttons and forms and navigation actually work. There’s TypeScript too, which I believe is JavaScript with guardrails. It catches mistakes before they turn into problems.

None of this meant anything to me before I started. Still doesn’t. I know the words now. I couldn’t explain them at a dinner party. And I probably shouldn’t if I ever get invited to a party.

The chapters are just plain text files. Markdown, it’s called. You write in a simple format, a hash for a heading, a blank line for a paragraph, and the site converts it to proper formatted HTML when it builds. So when I want to update a chapter, I open a text file, change the words, and push it live. No content management system. No logging into anything. Just files in a folder.

![](/essays/i-built-a-website-tonight-using-claude-code/02.png)

The styling is where it gets interesting, because this is the part that would normally need a designer.

Claude wrote about 1,370 lines of CSS. That’s the code that controls the colours, the spacing, the fonts, how things move when you hover over them, how the layout shifts on a phone versus a laptop. It picked the colour palette, orange and charcoal and cream. It paired the fonts, one monospace, one sans-serif. It built the dot-grid background pattern. It designed the navigation bars at the top and bottom. It made cards with hover animations. It set responsive breakpoints, which means it decided how the layout rearranges itself depending on screen size.

These are design decisions. Every one of them. The kind a designer would normally spend days on, mocking up options in Figma, presenting three directions, going back for revisions. Claude made them in real time, and when I didn’t like something I just said so and it changed.

The email signup was the part I was most dubious about. And it still needs testing. But the plan is that when someone enters their email to download the PDF, it goes straight to my Substack newsletter. No separate email service. No Mailchimp. No integration headaches. Claude built a hidden form that quietly submits the email to Substack’s API, stores a little flag in the visitor’s browser so they don’t get asked again, and then shows the download link. The whole thing is maybe 130 lines of code.

![](/essays/i-built-a-website-tonight-using-claude-code/03.png)

Hosting is free. The site lives on Vercel, which is the company that makes Next.js. I knew of Next.js but had never heard of Vercel. Claude found it for me. I push the code to GitHub, Vercel detects the change, rebuilds the site, and deploys it to servers all over the world. Automatic. Free. SSL certificate included, that’s the padlock icon in the browser. Custom domain pointing to it. The whole thing costs me nothing to run. Not a monthly fee, not a per-visitor charge. Nothing.

What I find insane is how many roles Claude performed without being asked. It made design decisions, choosing colours, pairing fonts, setting spacing. It made UX decisions, how navigation works, where to put the email gate, how to handle the chapter reading flow. It made content decisions, structuring the landing page so it moves from “what is this book” to “read a chapter” to “get the PDF” to “who wrote it.” It wrote code, obviously. But it also did the jobs of a designer, a UX researcher, and a front-end developer, simultaneously, in one conversation.

That’s the thing that used to cost you a team and a timeline. A designer creates mockups, a UX person maps user flows, a copywriter crafts the messaging, a developer builds it all. Each handoff introduces delays and misinterpretation and cost. With Claude Code, one person with a clear picture of what they want can have all of those roles executed in a single sitting.

And this would work for anything. A landing page for a campaign. A microsite for an event. A portfolio for a pitch. A prototype to test an idea before you commit budget. The fact that hosting is free means there’s no risk. Build it, put it live, see if anyone cares. If they don’t, build something else tomorrow.

It’s live but I’m going to a little bit of testing and then point my old domain at it. I’ll share the link in a few days.

![](/essays/i-built-a-website-tonight-using-claude-code/04.jpeg)
