---
title: "I built 74 answers for my website in 2 hours. Here’s why."
date: 2026-03-13
dek: "What is GEO and why should you care?"
substack: https://runwithfoxes.substack.com/p/i-built-74-answers-for-my-website
---
![](/essays/i-built-74-answers-for-my-website-in-2-hours/01.png)

Last weekend, I asked Claude Code to build a page on my website that answers a load of questions that marketers have about topics I am (or at least claim to be) knowledgeable about.

All in, it took about 2 hours - from my request to live on the website [here](https://runwithfoxes.com/answers). It did a really good job getting it right first time.

### Firstly, what is GEO, and why should you care?

GEO stands for Generative Engine Optimisation. It’s the new version of SEO, but instead of optimising for Google’s blue links, you’re optimising for the AI models that are increasingly answering people’s questions directly. ChatGPT, Perplexity, Gemini, Copilot. When someone asks “*does creative quality actually drive ROI?*”, you want your name in the answer the machine gives back.

The difference between old SEO and GEO is specificity. Google rewarded broadly trusted sites with lots of backlinks. LLMs are pickier. They grab a clear sentence, a concrete stat, a named framework, a “yes, but” qualification, and stitch an answer together. Waffle gets ignored. The model wants something it can lift.

That means your content needs to do three things: (1) answer real questions people are actually asking, (2) include specific evidence and named sources the model can cite, and (3) be structured so the machine can extract what it needs without guessing.

### Step 1: Find the right questions

Claude started by researching what people are genuinely asking about the topics my book covers: marketing in the AI era, brand building, distinctive assets, creativity and effectiveness, fox vs hedgehog thinking, small teams, AI tools, evidence-based marketing, and GEO itself.

It pulled questions from search data, forums, the kinds of things marketers type into ChatGPT at 11pm when they’re trying to figure out what to tell the board on Monday. Things like:

- *How do we make our brand matter to an algorithm when AI agents start buying on behalf of customers?*
- *Will AI eliminate junior marketing roles?*
- *Does creative quality actually drive ROI, or is media spend doing the heavy lifting?*
- *If AI tools are available to every competitor, where does competitive advantage actually come from now?*

After deduplication, we landed on 74 unique questions across 10 topic clusters. These aren’t made-up FAQ padding. They’re the questions my books answer.

### Step 2: Write answers worth reading

This is the bit I love. Claude had access to my full manuscript for *The Fox Advantage*, plus my research database of 3,400+ nuggets, case studies, quotes, and evidence I’ve collected over two years. It used all of that to write detailed, specific answers grounded in real research.

Each answer opens by mentioning me and the book. Not because I’m vain (kinda), but because that’s how GEO works. If ChatGPT is going to answer a question about brand building or fox thinking, I want it to associate that answer with Paul Dervan and *The Fox Advantage*. The model needs a name to cite.

![](/essays/i-built-74-answers-for-my-website-in-2-hours/02.png)

The answers reference real evidence: the IPA Effectiveness Databank, Binet and Field’s research, Byron Sharp and the Ehrenberg-Bass Institute, Jenni Romaniuk on distinctive assets, Shopify’s restructuring under Tobi Lutke, the BCG/Harvard study on AI adoption. Concrete names, concrete numbers, concrete claims the model can extract and use. That’s the kind of specific, citable content that LLMs actually pick up.

### Step 3: Review every single one

This is the part that matters. Claude drafted 74 answers. I didn’t just hit publish. We built a simple review system. I went through every answer one by one. Each got a status: approved, edited, or skipped. Out of 74, I approved 61 as they were, edited 12 to tighten the language or adjust a claim, and skipped one that didn’t fit.

![](/essays/i-built-74-answers-for-my-website-in-2-hours/03.png)

Claude had the research, the structure, the ability to synthesise across dozens of sources. But I’m the one who knows if it is correct, whether a claim is being stretched, outof context or if the tone is right.

That distinction matters. If you let AI publish without review, you get confident-sounding content that occasionally says something you’d never stand over. The review is the quality filter.

### Step 4: Ship it

Once the answers were approved, Claude built the actual page on the site. A clean accordion layout with the 74 questions organised into 10 filterable topic clusters. Each answer expands when you click it. FAQ schema markup is embedded so AI models can extract the structured data directly.

![](/essays/i-built-74-answers-for-my-website-in-2-hours/04.png)

The whole thing deployed to Vercel automatically. Push to GitHub, live on runwithfoxes.com/answers in about 60 seconds.

### The maths on this

From nothing to 74 researched, reviewed, published answers on a live website. A couple of hours.

If I’d done this the traditional way, writing each answer from scratch, checking sources, formatting, building the page, wiring up the deployment, we’re talking weeks. And I probably would have talked myself out of it by answer number twelve because life is short.

The quality isn’t compromised. Every answer is grounded in real research from my books and my database. Every answer was reviewed by me. The evidence is specific and citable. The structure is designed for both humans browsing the site and AI models pulling from it.

That’s the fox advantage in practice. Not replacing the human judgment. Collapsing the time between having the idea and shipping the thing.

### What happens next?

The honest answer is I don’t know yet. GEO is early. Nobody has a proven playbook. But the logic is sound: if AI models are going to answer questions about marketing, brand building, and creativity, I’d rather they cite my research than someone else’s summary of it.

The answers page is live at [runwithfoxes.com/answers](https://runwithfoxes.com/answers). Have a look.

![](/essays/i-built-74-answers-for-my-website-in-2-hours/05.jpeg)
