---
type: chapter
part: 4
created: 2026-03-17
tags: [book, part-4, building, events, ai]
status: draft
---

# Chapter 61: The whole event in an evening

_Part 4_

My family were away again. The house was quiet, which by now you know is a warning sign.

I sat down at the kitchen table at about half seven with a cup of tea and a vague idea. We had an event coming up for a client, one of those intimate dinners, forty people, nice venue, QR check-in at the door, the kind of thing that usually lives in Splash or Eventbrite and costs a few grand a year in subscription fees. I wanted to see if I could build the whole system myself. Landing page, registration, email templates, QR codes, check-in dashboard, reporting. Everything.

By midnight I had it live. Working. On Vercel, for free. Guests could register, get a QR code, add the evening to their calendar. Staff could scan the QR at the door from any phone browser. No app install. No login. No subscription. The full loop, from invitation to follow-up email.

That's the bit that stopped me. Not that it worked, but that it was Tuesday.

A year ago, this would have been a three-week project. A brief to an agency or a developer, a round of designs, a round of feedback, another round, a staging site, some QA, a launch. Now it was one person, one evening, one conversation with Claude about how Next.js handles server routes.

I want to be honest about what I actually did. I didn't write every line of code. I described what the page should look like, section by section. I described the registration flow, what fields, where the data goes. I described the QR code format, what happens when a guest scans it, what the host sees on their screen. Claude built each piece. I reviewed it, caught the bits that didn't feel right, fixed the copy, pushed it live. Then I moved on to the next page.

It felt like directing a film where the crew works at the speed of thought. You say "I want the check-in dashboard to show a real-time guest list with one-tap check-in and a progress bar" and three minutes later you're looking at it. Not a mockup. The thing.

The registration form saved to Vercel Blob, which is free. No database to set up. No credentials to rotate. The QR codes were generated server-side and embedded in the confirmation page. The calendar invite was a proper .ics file with timezone handling and two reminders. The email templates were six proper HTML emails, tested in Outlook, with personalisation tokens.

I got cocky after the first one and built a second. Same structure, different brand, different city. This time I turned the process into a skill, a set of instructions that could be rerun for any venue. Clone the template, swap the photos, rewrite the copy for the new city, deploy. Twenty minutes per event once the template existed.

That second build is where the real lesson lives. Not in the speed, but in the scaffolding. The first event was a proof of concept. The second was a system. And the difference between "I can build one thing fast" and "I have a repeatable process that works every time" is the difference between a party trick and an actual capability.

Here's what surprised me. The hardest part wasn't the code. It was the copy. Getting the tone right for an invitation. Writing FAQ answers that didn't sound like a chatbot. Describing a venue you've never visited in a way that felt specific without inventing details. That's the human bit. The structure, the logic, the deployment, that was the easy part. The judgement about what to say and how to say it, that was the work.

The other thing I noticed, and this one matters for anyone running a team. The vendor model for events is broken in the same way it's broken for everything else. You don't need Splash. You don't need a monthly subscription to a platform that gives you 80% of what you want and locks the other 20% behind their roadmap. You need someone who can build, and you need a template that holds the brand.

I'm not saying fire your events agency. I'm saying notice how much of what they charge for is now a Tuesday night. The landing page, the registration, the emails, the check-in, the reporting. The venue booking and the catering and the guest list curation, that's still people work. But the digital infrastructure around it, that collapsed overnight and nobody sent the memo.

Two things that went wrong, because this wouldn't be honest without them. First, QR code caching. I changed the payload format three times and the old cached versions kept getting served. That burned an hour. Second, the email HTML. Outlook rendering in 2026 is still the same nightmare it was in 2006. If your email has a table layout that works everywhere, protect it like a firstborn.

The finished system had six pages, three API routes, six email templates, and a deploy script. It runs on Vercel's free tier. The total cost is zero, unless you count the tea.

That last bit is the structural point. We keep talking about AI making marketers more productive. But productive at what? Faster at writing briefs? Quicker at making decks? That's fine. But the real shift is that whole categories of work that used to require a vendor, a budget, and a timeline now require a Tuesday. If you're a marketing leader and you're not adjusting your operating model for that, you're still buying horses after the car arrived.
