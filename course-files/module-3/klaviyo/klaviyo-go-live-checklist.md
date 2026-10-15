Use this file as the checklist before any Klaviyo flow goes live, for any brand. Last checked against the sources on 19 Jul 2026 (the latest source date); edited 15 Oct 2026. Klaviyo changes, so check the current docs for any step that names a setting or an endpoint.

## Before you build: know the answers

Get a specific answer to each question, and write the answers down. Where you have none, record a gap with an owner, and do not write around it. If an email would promise something you cannot back up, that flow is blocked until you can.

1. The offer. What is given or sold, what does the person get and when, what does it cost?
2. The audience. Who is it for, and who is it not for?
3. The voice. Whose voice do the emails use? Get three real samples of that person's writing, any hard bans, and how they sign off.
4. The claims. What may you say, with a source for each, and what must you never say?
5. The assets. Photos, logos, fonts and brand guidelines: where are they, and what is missing?
6. The sources. Which pages and documents should the emails point to, and how does new material arrive?
7. The triggers. Which events matter (joined, bought, attended, went quiet) and what happens after each?
8. The cadence. How often is too often? Are there fixed dates?
9. The recurring value. What lands in the inbox on a rhythm, and who makes it? Ask early, because this question can hold up a whole build.
10. The platform. Who owns the account, and is a sending domain verified?

Read the answers back in plain English and get a yes before you build.

## Account and deliverability

1. SPF, DKIM and DMARC are set up and aligned, with DMARC at least at p=none.
2. One-click unsubscribe is in place.
3. The sending domain is verified in Klaviyo, and the sender name and from-address are set.
4. Complaint rate is under 0.1 percent and bounce rate under 2 percent.
5. A new domain or IP is warming up with the most engaged people first.
6. Attribution is set to clicks only with a 5-day email window, before the first real send. Changing it later recalculates all past data.

## The list and the trigger

1. Opt-in is a deliberate choice. Single opt-in is smoother. Double opt-in gives stronger consent proof and a Klaviyo confirmation email, and loses roughly 10 to 30 percent of sign-ups.
2. The trigger metric exists in the account already. Send one test event to create it before building the flow.
3. If the flow is triggered by an event, the sign-up route both subscribes the person and sends the event. Joining a list alone will not fire it.
4. The profile is created with its properties first, and added to the list second.
5. The trigger metric has its own name, not shared with another product or flow.

## The flow itself

1. The flow exits anyone who has bought since starting it.
2. Filters stop two flows sending to the same person, for example cart and checkout.
3. Discounts appear only where intended: not in the first abandonment email, and never to existing customers as a first-time offer.
4. Links go to the deepest page the person reached, not the homepage.
5. Smart sending is set on purpose. Off for welcome flows and back-in-stock alerts. On for low-intent flows. Remember that turning it on for one message can remove the person from the rest of the flow.
6. Transactional messages such as order confirmations are in their own flow, with no marketing in them.
7. Unengaged profiles are excluded from high-volume flows such as browse abandonment.
8. A time delay or split is there only where each path ends in a different message.
9. If you build it through the API, the definition is right first time, because a live flow cannot be edited. Smart sending and the template are set at creation.

## The email

1. Every claim has a source on file.
2. Any markdown or placeholder syntax renders correctly. Render one email and read it.
3. No placeholder text such as [[PLACEHOLDER - REPLACE BEFORE GOING LIVE]] remains, and the build stops if one does.
4. Fonts are web-safe, because Gmail removes web fonts.
5. Every link opens the right page. The destination page is live at a real address before the email goes out.
6. The email reads well on a phone. Check on a real device or a narrow frame, not a squeezed desktop browser window.
7. The sender name reads well in the inbox list and the greeting handles the case the person typed.

## Go live

1. Push the flow as a draft first. Nothing sends from a draft.
2. A named person approves the draft. Nothing goes live without that approval on record.
3. Set the flow live.
4. Prove it at once with a real sign-up through the real route. Watch for the Received Email event and open the message in a real inbox. Status "live" proves nothing. If nothing arrives within two minutes, delete the flow and rebuild it instead of debugging.
5. Remember that people who triggered before go-live do not enter the flow. Only events sent after it went live count. Plan for that.
6. Confirm the footer, the sender name and the links in the delivered email.
7. Record each sign-up in your own store as well as Klaviyo.
8. Delete every test profile and read the list back to zero. Name any test campaign so nobody can schedule it by mistake, because a sent campaign cannot be deleted.

## After go-live

1. Report revenue as attributed until a holdout has run. Keep 10 to 20 percent of people out of the flow for a period at least as long as the buying cycle, then compare revenue per recipient.
2. Watch complaints, bounces, net list growth and flow share of revenue each week. If complaints move toward 0.3 percent, stop and tighten before anything else.
3. Suppress people who never engage. Klaviyo bills on all active profiles, so this saves money as well as protecting deliverability.
4. Do not judge a flow on opens.
5. Review which flows exist, which sends are paused, and which tests are still running.
