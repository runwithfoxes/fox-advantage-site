---
title: "How I build an AI writer"
date: 2026-05-13
dek: "I’ve now built this system for several different brands."
substack: https://runwithfoxes.substack.com/p/how-i-build-an-ai-writer
---
Ask AI to write something without any supporting documents and you get a very specific voice. Not your voice. Its voice. Polished, neutral, forgettable. 

![](/essays/how-i-build-an-ai-writer/01.png)

- The same structure every time. It hedges everything, fills gaps with fabricated confidence, and defaults to consultant-speak because it has nothing else to work from.

> The problem isn’t creativity. It’s context. 

AI doesn’t know what makes your brand different. It doesn’t know your tone, your audience, or what claims you can back up. So it guesses. And guessing produces copy that could belong to anyone in your category.

Professional copywriters don’t start with a blank page. They start with a brief, a brand guide, and a stack of source material. An AI writer needs the same things. The difference is you only need to build them once.

I’ve now built this system for several different brands. It’s not one oversized prompt. But rather a set of documents that together form an AI writer. Here’s what I build, and in what order.

#### 1. The messaging framework
Not a positioning document. Not a brand guide. One document that combines positioning, proof points, competitive contrast, voice rules, and hard bans. 

I used to describe this as two separate steps: positioning and brand DNA. In practice, they live in the same file. The AI loads one document and gets the full picture: what we say, who we say it to, how we’re different, what the evidence is, and what we never do.

For one client, the messaging framework was 82 lines. One page. It had:

A value proposition split by use case, because the same company sells differently depending on which door the client walks through. Their general offer had one line. Their specialist offer had a different one.

- Four messaging pillars, each with a “Proof:” line. Not “we’re experts” but specific evidence: years of experience, number of people, named platforms, client examples where previous attempts had failed before they rebuilt them.

- A competitive contrast section. Not “we’re better than the competition” but a structural argument: “The big firms do X and hand you a manual. The small firms lack scale. We stay through adoption.” With a hard rule from the client: no negative shots at competitors. Position by what you do, not by what they do wrong.

- A positioning statement in a specific format: “For [audience], [brand] is the [category alternative], combining [capability], so [benefit].”

- And a “Never use” section and a “Never do” section. Words that were banned. Behaviours that were banned.

So one document. The AI loads it before writing anything, and every piece of content is anchored to the same pillars, the same proof, the same competitive framing.

For a larger company, the same architecture scales up. I ran a positioning workshop that mapped competitive alternatives by capability area. Not “who are your competitors” but “what would your customer use instead of you, for each specific thing you do.” Eight capability areas. Named competitors in each. Then three value pillars with specific proof points, best-fit and poor-fit account profiles, and an eight-step sales narrative that builds from market insight to the ask.

The positioning includes a story structure for selling. When the AI later writes a case study or an outreach email, it frames the problem the same way the sales team frames it. Without that alignment, the website says one thing, the pitch deck says another, and the AI picks up whichever it finds first.

The brand DNA sat alongside the positioning. Three pillars, each with explicit marketing implications. Not just names. Instructions. Such as: “Anchor every asset in a customer problem. Spell out their pain first, then show how we remove it.” Another said: “No safe B2B headlines. We prod with wit and clarity. Overcommit to one or two fights and throw our full weight behind them.”

The AI can write from “anchor every asset in a customer problem.” It struggles with things like “customer-centric.” One is a behaviour. The other is an adjective. Adjectives are decoration. Behaviours are instructions.

#### 2. The voice framework
The messaging framework tells the robot what to say. The voice framework tells it how to sound, and importantly, how not to sound like AI.

These can live in the same document for a smaller brand. One client’s messaging framework had a voice summary and writing principles built in, all on the same page. For a bigger company with a marketing team, voice becomes its own document because the rules get long.

I currently divide my voice framework into three parts: voice traits with writing instructions, tone calibration by channel, and hard constraints with AI-specific detection rules.

Voice traits are not adjectives. “Infectiously upbeat” means nothing to an AI. I like it but robots not so much. They seem to prefer this kind of stuff: “Vary sentence length to create rhythm. Short ones inject energy. Longer ones carry the reader forward. Lead with positive framing. Active voice. Punchy verbs: ‘boost’ not ‘improve’, ‘kick off’ not ‘start’, ‘shift’ not ‘change’.” 

Tone calibration matters because your voice on a campaign is not possibly not the exact same as your voice in a thought leadership report. The personality stays the same. But small adjustments. I’m the same talking regardless of if talking to my kids or my mates or my clients. But I curse less often (in front of my kids). I do this currently through a simple calibration table for each channel. 

Then the hard constraints. I ban em dashes. AI uses them three to five times more often than human writers. They’re the clearest AI tell in writing. Zero tolerance. I ban corporate words. Unlock, leverage, ecosystem, synergy, reimagine, holistic, paradigm. If you wouldn’t say it to a customer over a coffee, it doesn’t belong. This is not so much AI but just bad writing. I’ve many, many words I ban. Delve, comprehensive, facilitate, utilize, landscape, embark, crucial, game-changing, revolutionary, breakthrough. 

> But bans on their own aren’t enough. AI doesn’t just fail at word level. It fails at rhythm level. 

I build an AI Rhythm Detection section into every voice framework. It names the exact cadence patterns that give AI writing away:

- Stacked punchy sentences. AI defaults to: “Short sentence. Medium sentence. Marketing punch. Marketing punch.” Two punchy sentences in a row means rewrite.

- The three-point landing. Three consecutive sentences each ending on a “point.” This is the cadence of every product demo voiceover you’ve ever sat through. Rewrite immediately.

- The “This isn’t X, it’s Y” pattern. AI will use it four times if you let it.

- Uniform paragraph shapes. AI creates paragraphs that are all the same length and structure. Some paragraphs should be a single long sentence. Others should mix three different lengths. Predictability is the enemy. 

I include a before/after comparison in each voice framework so the AI has a concrete standard. Here’s AI rhythm:

*“The industry is changing. Fast. And the companies that adapt will thrive. The ones that don’t will be left behind.”*

Here’s human writing:

*“Teams know their pricing is a constraint, but their switching cost calculation keeps coming out negative. What is different is that customers can see this constraint now (unlike before), and this is making it more difficult to model.”*

One difference to watch for; human writing develops an idea across sentences. AI writing restates the same idea with different emphasis. 

#### 3. Audience-specific messaging
One messaging framework is probably not enough if you sell to different audiences. The product is the same. But the message may not be. For one client, we built two separate positioning documents. Their two audiences face completely different competitive alternatives, different value pillars, different proof points, and different language entirely.

The AI writer identifies the audience before it writes a single word. It asks: “Who is this for? Audience A or Audience B?” Then it loads the correct positioning. An email to one segment uses one set of language. An email to the other uses different terms for the same capability. Same voice. Different positioning.

For another client, audience-specific messaging meant different tracks for different team members. One person targets leaders worried about a specific operational problem. Another targets executives going through broader organisational change. Same firm, same capability, but different competitive alternatives, different proof points, and different language.

We also include approved customer quotes per segment. Real words from real customers. When the AI writes for a specific audience, it pulls from the right quotes, the right pain points, the right proof. 

#### 4. Content-type frameworks
I’m coming to the view that the more narrow the use case the better. So my approach is evolving a bit. But for now, each content format gets its own framework. I build separate ones for advertising, email, thought leadership, case studies, and web pages. Each one teaches the AI why something works in that format, not just what to write. 

A thought leadership report is not marketing with longer sentences. An email is not a landing page cut into paragraphs. Treating them the same is how brands end up with everything sounding identical and nothing performing. For example, for emails, we might focus on subject line formulas with performance benchmarks as well as body copy structures: PAS (Problem, Agitate, Solution), BAB (Before, After, Bridge) or AIDA. 

The case study framework uses a five-part arc: company, challenge, solution, results, customer quote. Two intake paths: the AI asks structured questions in sequence, or works from whatever messy notes you paste in.Each of these frameworks is a standalone document, usually ten to twenty pages. They took time to build. But they only need building once.

#### 5. The source protocol
This is what stops the AI from making things up. AI is confident by default. It will invent a plausible-sounding statistic (”73% of marketers agree...”) and present it as fact. Every writer who has used AI for more than a week has found a fabricated claim in their output. The source protocol makes verification mandatory, not optional.

Before writing anything, the AI completes a verification step. It identifies the audience. Reviews the positioning. Confirms what source materials it has: data, customer quotes, product specs, research. Every claim in the final copy must trace back to a source. No fabricated statistics. No invented customer quotes. No assumed industry data. If the AI can’t find a source, it flags the gap and asks.

I also build in credibility stop triggers. If the AI is about to use a percentage without a source, a performance claim without documentation, or a company reference without permission, it stops. It doesn’t invent. It asks.

Every response the AI produces ends with a protocol confirmation block: which audience, which documents reviewed, which voice settings applied, what materials used, and what gaps found. If the block is missing, the output is incomplete. Don’t deliver incomplete work. The gap between AI writing and professional writing isn’t creativity. It’s credibility. 

#### 6. The orchestrator
The master instruction file ties everything together. It tells the AI who it is, how to route requests, and what workflow to follow every time.

When a writing request comes in, the AI follows a decision tree: identify the audience first, then the content type, then load the correct positioning document, voice framework, and content-type framework. An email to one audience uses different positioning than a thought leadership piece for another, even though both are for the same brand.

The workflow is always the same: identify the audience, load the positioning, confirm the source protocol, write. Quality checklist at the end. If anything is missing, the AI doesn’t deliver. It asks.

For one client, the orchestrator is 280 lines. It routes between two audiences and four content types, enforces the voice framework on every response including conversational replies (not just deliverables), and requires the protocol confirmation block at the end of every output. 

#### What you end up with
Once the documents are in place, the AI writes from your positioning, in your voice, for your specific audiences, in whatever format you need. Case studies, email sequences, thought leadership, web pages. Different structures, different tones, same brand.

For one client, the system is five documents. For another, eight. Both took a few days for the first pass, then refinement as teams used them, feedback and we fine tune them. Testing them takes longer than building them. 

The voice framework requires the messaging framework, because you can’t define how you sound until you know what you’re saying. The content-type frameworks require the voice framework, because each format is a variation on the same voice. The source protocol requires the content frameworks, because each format has different credibility requirements.

Skip the messaging framework and every piece of content is generic. Skip the voice rules and everything sounds like AI. Skip the source protocol and the AI starts inventing claims you’ll have to answer for.

So this is how I built AI writers. Slowly. Then fast. 

![](/essays/how-i-build-an-ai-writer/02.jpeg)
