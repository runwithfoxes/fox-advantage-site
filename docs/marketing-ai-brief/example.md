# The marketing-AI brief - draft (hand-run example)

> A real example, built by hand because this environment has no model key. The
> Vercel AI SDK items are verified from that repo's own changelog
> (`packages/ai/CHANGELOG.md`, releases 7.0.50-7.0.55 and the speech/transcribe
> stable promotions); the last item is from our own repo (commit 5d91c8c). The
> SDK items span a few releases rather than a strict 7 days because I pulled them
> offline. A live run windows each source to the last 7 days and adds PostHog,
> Dub and the Anthropic Cookbook.

> Sources read: Vercel AI SDK, Run with Foxes (live run adds PostHog, Dub, Anthropic Cookbook)

## Video and voice quietly became part of the standard AI kit

Most weeks the AI world ships plumbing only a developer would care about. This week had one thing worth your time. The toolkit a lot of AI features are built on moved video, voice and transcription out of the experiments folder and into the normal kit, and that changes what your team can make without buying another tool.

### Vercel AI SDK

**What shipped:** Two things that sat behind an "experimental" label for months, generating a voiceover and transcribing audio, are now stable and properly supported. Video generation can run in the background and ping you when it is done, instead of making you sit and wait. There is a new way to generate in bulk, and a new voice provider, Cartesia, with fairly natural speech.

**What it means for you:** This is the kit under a lot of the AI tools your team already uses. When it grows a capability, those tools tend to grow it soon after. So making a short video, dropping a voiceover onto an ad, or transcribing a batch of customer calls stops being a separate service you bolt on and pay for twice. The bulk part matters for our world in particular: a hundred variants of an ad in one run, tested properly, for less than doing them one at a time.

**Do this Monday:** Ask whoever runs your AI tools whether they are built on this SDK. If they are, work out what you are currently paying a separate video, voice or transcription tool to do.

<sub>grounded in: vercel/ai 7.0.50-7.0.55, generateSpeech + transcribe promoted to stable, Cartesia Sonic 3.5</sub>

### From our own week

**What shipped:** Someone said hello to the fox on our homepage last week and got a flat, tidy reply with no character at all. We could count how often: across the last 42 plain hellos, only 10 had any of her personality in the first line.

**What it means for you:** The cause was daft in hindsight. Every example of her voice in the instructions had Paul as the target, so with him out of the chat she had no worked example of what "personality" even looked like, and played it safe. The examples you feed an AI are the spec, not decoration. If you have asked a model to write in your brand voice and it came back beige, that is usually why. Worth counting how often yours sounds like you before you trust it with anything that ships.

<sub>grounded in: runwithfoxes/fox-advantage-site 5d91c8c, the 42-hello / 24% figure from the healthcheck log</sub>

That is the week. If a week is quiet, we will tell you it is quiet rather than pad it. See you next Monday.

---

**Why this set:** one thing every marketer can use, video and voice going mainstream, and one lesson they can check on their own AI today. Both real, both grounded in this week's work.
