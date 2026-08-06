# Build-in-public draft (hand-run example)

> This is a real example, written by hand from the actual week of 2026-08-06,
> because this environment has no model key. It shows what the workflow produces:
> the week's work in, one teaching post in Paul's voice out. A live run with
> CHAT_ANTHROPIC_API_KEY set writes the same shape straight to a dated file.

> Source: the week's commits + CLAUDE.md notes · picked: the Isa attitude fix (5d91c8c)

## ⚠ Voice check

- no em dashes found
- no hype/corporate words found

## Headline

Our chatbot went flat, and the examples were the reason

## Alternative openers

- Someone said hello to Isa last week and got a tidy, lifeless "What can I help you with?".
- We could finally count how often our chatbot sounded like herself. It was 24% of the time.
- The fox on our homepage lost her cheek, and it took us a while to see why.

## Post

Someone said hello to Isa last week, the fox that pops up on our homepage, and got back a tidy "What can I help you with?". No warmth, no cheek. Which is a problem, because the cheek is rather the point of her.

We went looking, and the good news is we could count it. The healthcheck logs every conversation that opens with a bare hello. Across the last 42 of them, only 10, so 24%, had any of her personality in the first line. It wasn't a bad day. It was most days.

The cause is the part worth passing on. Every example of her tone in the prompt had me as the target. Every single one. So she had quietly learned something narrower than we meant: attitude means talk about Paul. Take me out of the chat and there was no worked example of what attitude even looks like, while a couple of quieter rules, one dry aside maximum and a length cap, nudged her towards short and safe. Bland kept every loud rule happy at once.

We fixed it by giving her attitude that holds up whether or not I am in the room, and by keeping the joke on me and never on the person asking.

The thing we're carrying into the next build: the examples we hand an AI aren't decoration, they're the spec. A gap in our examples becomes a gap in how it behaves, and we didn't see it until we counted.

---

## What it is built on

- **Isa's opening line went bland when Paul wasn't the subject**
  - lesson: the examples you give an AI are the spec, not decoration; gaps in the examples become gaps in behaviour, and you only catch them by measuring
  - grounded in: 5d91c8c, and the 42-reply / 24% figure from the healthcheck log

**Why publish:** every marketer wiring brand voice into an AI hits this. It is concrete, it has a real number, and it teaches something they can check on their own bot on Monday.
