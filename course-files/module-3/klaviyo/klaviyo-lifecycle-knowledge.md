Use this file to give your Claude the lifecycle marketing knowledge a good Klaviyo operator uses, for any brand. Last checked against the sources on 19 Jul 2026 (the latest source date); edited 15 Oct 2026. The knowledge was current for 2025 and 2026, after Apple Mail Privacy Protection and after the 2024 Google and Yahoo sender rules. Klaviyo changes, so verify before you rely on a date or a number.

Each claim below carries a confidence tag from the source. Well-evidenced means backed by evidence. Consensus means most practitioners agree but it is not proven. Vendor claim means it comes from a seller and you should not repeat it as fact. Platform mechanic means it is how the tool works.

## What separates a good operator from a weak one

A good operator treats automatic flows as the main revenue engine. They protect deliverability by leaving out people who do not engage. They judge success on clicks and revenue per recipient, never opens. They know the difference between attributed revenue and incremental revenue, and they use holdouts to find the second.

A weak operator mails the whole list, over-discounts, chases a flattering open rate, and reports attributed revenue as if the emails caused it.

Nearly all reported lifecycle return is attributed, not incremental. The only independent controlled evidence in the sources, on cart retargeting, shows the lift depends on timing and can be zero or negative.

## Build flows before campaigns

Klaviyo's 2026 benchmark (more than 183,000 brands) says flows produce about 41 percent of email revenue from 5.3 percent of sends, around 18 times the revenue per recipient of campaigns. This is a vendor claim, directionally reliable.

A healthy flow share of Klaviyo revenue is 30 to 50 percent, with a median near 40. Below about 22 percent suggests a structural problem. Total email revenue is often 20 to 35 percent of store revenue, but that is attributed and varies by business. Treat these bands as vendor or single-portfolio figures.

## Lifecycle stages

Place each person by their most recent high-intent action, not by which list they are on. The order, from highest intent down: active checkout, cart add, browse, post-purchase window, replenishment window, lapsed, never engaged.

Match the model to the product. Things people use up, and subscriptions, run on a reorder cycle. Durable goods and single-hero products depend more on acquisition and referral. Do not force replenishment onto a mattress brand (consensus).

Only branch a flow when each path ends in a different goal or message.

For software and subscription businesses the triggers differ. They come from in-product milestones, such as "connected data but has not launched a workflow", sent in through the API or webhooks. Email is secondary to in-product onboarding. The buying unit is an account, not a person. Activation is not the same as conversion. Replies matter as a metric. Trial extensions beat discounts. Klaviyo's shop-based predictive models do not apply.

## Flows worth having

Welcome series. Triggered by joining a list. Send email 1 at once. Use 3 to 5 emails over 7 to 14 days. Split on whether the person has ever placed an order. Non-buyers get the offer and bestsellers. Customers get the story and new items, with no first-purchase discount. Judge by revenue per recipient and first-purchase conversion. Common mistakes: one long chaotic email, a discount for everyone, delaying email 1.

Abandoned checkout. Triggered by Started Checkout. Exit anyone who placed an order since starting the flow, and keep people out who were in the flow in the last 30 days. Email 1 at 2 to 4 hours, email 2 at 20 to 48 hours, an optional third on day 3 or 4. Offer discounts only on the never-purchased path, and not in email 1. Checkout flows earn roughly 2 to 3.5 times what cart flows earn (consensus). Common mistakes: confusing checkout with cart, linking to the homepage, no exit on purchase.

Abandoned cart. Triggered by Added to Cart, which on Shopify needs a code snippet installed. Filter out checkout starters and purchasers, so the cart and checkout flows never both send. Send after 1 to 4 hours and again at 24 hours, 2 to 3 messages in all. Link to the deepest page the person reached.

Browse abandonment. Triggered by Viewed Product. Exclude anyone who carted, checked out or bought since. Exclude unengaged profiles, because this flow is high volume and can hurt deliverability. Send 1 or 2 messages. Intent is lowest, so use smart sending here.

Post-purchase. Triggered by Placed Order. Keep order confirmations in a separate transactional flow with no marketing in it. Split first-time from repeat buyers. Ask for a review after delivery, not before. Judge on repeat rate and revenue per recipient, not opens, because this flow has the highest open rate and low revenue per recipient.

Replenishment and cross-sell. Triggered by Placed Order plus a delay taken from your own reorder data, firing a few days before the average gap between orders. The other route is Klaviyo's predicted next order date, mainly for one-time buyers. Add an exit when they reorder, and a product filter so gifts do not trigger it. Send 3 messages and put any discount in the third.

Win-back. Time it at about 1.5 times the average reorder cycle, not the default 180 days. Exclude recent buyers, active browsers and never-engaged people. Send 2 to 4 messages with any incentive last. Judge by reactivation rate.

Back in stock. Use the native back-in-stock metric and the Back in Stock delay, not a time delay. Turn smart sending off. Inventory tracking must be on in the shop, "continue selling when out of stock" must be off, and variant ids must match exactly. Smart sending on suppresses the alert.

Price drop. Uses a catalogue trigger with a threshold. Add a split part way through to check the price is still down. People who started checkout with the item convert best.

Sunset and suppression. Build a segment from several signals, never opens alone. For example: can receive email, profile created at least 180 days ago, received at least 5 emails, no engagement, no orders, no site activity. Tune the windows to the buying cycle. Send 2 or 3 final emails, then suppress those who do not respond. People who received 5 or more emails and never opened, clicked or ordered should be suppressed without a sunset flow. The goal is deliverability, not revenue. A 60-day opens-only rule wrongly removes loyal customers who rarely open.

Every flow needs an exit on purchase (placed order zero times since starting the flow, or similar) and filters that stop two flows sending to the same person. Turning smart sending on for one message removes the profile from the rest of that flow's queue, not only that message (platform mechanic, as stated in one source).

## Segments to build first

Start with five. Engaged people in 30, 60 and 90 day tiers, using clicks rather than opens. Default campaigns to the 30 to 90 day engaged group, never the full list. VIPs, meaning orders or revenue above the annual average within the last 365 days. Engaged non-buyers. Recent purchasers, used as an exclusion for 0 to 30 days. Lapsed customers past their reorder cycle.

Do not start with 30 segments you never measure. Start with three to five.

RFM groups (Champions, Loyal, Recent, Needs Attention, At Risk, Inactive) are built in on Klaviyo's advanced tier, and you can build the same with custom properties. Moves between groups, such as Loyal to At Risk, make good retention triggers.

Predictive analytics need at least 500 ordering customers, at least 180 days of history, and some customers with 3 or more orders. Below that they are silently unavailable. Next order date, churn risk and predicted lifetime value are useful as group averages. Klaviyo itself says individual predictions are not reliable. Do not use churn risk as a trigger.

## Offers and creative

If the sign-up pop-up promised a discount, deliver it in email 1. Split on purchase history so existing customers never get a first-time discount. Do not lead abandonment flows with a discount. Hold it for email 2 or 3 and send it to non-purchasers only. Discount discipline protects margin and stops people learning to wait for codes. Send links to the deepest point in the funnel the person reached.

## Frequency and cross-channel

The sources give no universal send cap. They say to set cadence and a cap per brand, to default campaigns to engaged segments, and to use smart sending on low-intent flows. Over-mailing shows up as rising complaints, so watch that number.

SMS earns its cost only at high-intent, time-sensitive moments: cart and checkout, back in stock, shipping, VIP drops. Send email first and use SMS as the nudge. SMS needs separate express written consent. In the US, quiet hours are 8am to 9pm local time, stricter in Florida, Oklahoma, Washington, Connecticut, New Jersey and Maryland. Violations cost $500 to $1,500 per message. This is US law as stated in the source; check your own market.

## Deliverability

From February 2024 Google and Yahoo, and from 5 May 2025 Microsoft, enforce rules on bulk senders (about 5,000 or more a day). You need SPF, DKIM and DMARC aligned, with DMARC at least at p=none. You need one-click unsubscribe (RFC 8058). Complaint rate must stay under 0.3 percent, and you should aim for under 0.1 percent. Breaking these means rejection by the receiving server, not just the spam folder. Microsoft's rejection code is 550 5.7.515.

When deliverability slips, stop mailing unengaged people. Do not change the creative.

Warm new domains and IPs by starting with the most engaged 30-day segment and ramping slowly. A dedicated IP takes about 30 to 40 days to warm and is only worth it above roughly 1 million sends a month.

Suppress hard bounces at once and keep bounce rate under about 2 percent.

## Measuring what good looks like

Metrics that count: revenue per recipient (attributed revenue divided by recipients), placed-order rate, click rate, flow share of revenue, repeat-purchase rate, complaint rate under 0.1 percent, bounce under 2 percent, net list growth.

Metrics that mislead: open rate, because Apple Mail Privacy Protection inflates opens by 15 to 40 percent or more, and click-to-open rate, because its denominator is inflated. Never trigger or exit a flow on Opened. Never present attributed revenue as return on investment without a control.

Attribution. The default is a 5-day window counting opens and clicks. Set it to clicks only, 5-day email, before the first real send. Changing the window later recalculates all past data, so warn people first. Revenue is credited to the send day, so single-day queries understate. Read windows at least as long as the attribution window. SMS attribution starts only on a click.

Incrementality. Attributed is not incremental. To measure incremental, keep a random 10 to 20 percent of people out of the flow permanently. Compare revenue per recipient after a period at least as long as the buying cycle, and apply it across channels. Incremental lift is treated revenue per recipient minus holdout revenue per recipient.

The strongest independent evidence is a 2021 study (Li, Luo, Lu and Moriguchi, Journal of Marketing 85(4)). Retargeting within 30 to 60 minutes of cart abandonment made customers less likely to buy than the control group. Retargeting 1 to 3 days later had a positive effect. Cart retargeting was about 2.25 times more incremental than browse retargeting. No independent holdout study was found for welcome, browse or win-back flows. The rule of thumb that 20 to 40 percent of attributed revenue would have happened anyway is consensus, not measured.

## A staged rollout for a new account

Stage 1, weeks 1 and 2. Pass the authentication checks (SPF, DKIM, DMARC, one-click unsubscribe) in Google Postmaster Tools, with complaints under 0.1 percent. Build the five core segments. Set clicks-only 5-day attribution. Build the welcome and abandoned checkout flows, which together produce an estimated 40 to 60 percent of flow revenue (consensus).

Stage 2, weeks 3 to 8. Add cart, browse (unengaged excluded), post-purchase and sunset flows. Suppress never-engaged people now. Send campaigns to engaged people only. Move on when flow share is near 30 percent, complaints are under 0.1 percent and bounce is under 2 percent.

Stage 3, month 3 onward. Add replenishment from your own reorder data, win-back at 1.5 times the cycle, back in stock, price drop and VIP. Add RFM and predictive models once the data thresholds are met. Run the first holdout on the highest-volume stream. If the incremental lift is near zero, cut or rework the flow whatever the attributed revenue says.

Change the plan when complaints approach 0.3 percent (stop and tighten), when flow share passes 30 percent (move to optimising and measuring incrementality), or when revenue rises while margin falls (pull discounts back to people who do not convert).

## Mistakes to avoid

Mailing the whole list is the most common silent account-killer. Optimising to open rate is optimising to noise. Skipping authentication leads to rejection at around 5,000 a day. Depending on discounts trains customers to wait. Confusing cart and checkout triggers, and missing exit filters, causes double sends. Replenishment with no product filter or reorder exit mails people who have already reordered. An opens-only sunset removes loyal customers, and never suppressing damages deliverability. Over-segmenting before measuring wastes effort. Reporting attributed as incremental misleads everyone. Using SMS as a second newsletter risks legal penalties. Ignoring that Klaviyo bills on all active profiles turns list bloat into a cost.

## A caution on retention claims

Byron Sharp, in How Brands Grow (pages 29 to 30), calls the claim that retaining customers is far cheaper than finding new ones "pure fantasy" with "no empirical support", and says loyalty programmes produce "very slight loyalty effects". Brands grow mainly by reach, meaning mental and physical availability.

Lifecycle email is useful where it removes friction at real buying moments, times replenishment to real need, and protects your ability to reach people. It is overclaimed when it is reported as incremental without a holdout, treated as a replacement for acquisition, or used to justify heavy discounting. The Ehrenberg-Bass evidence comes from consumer goods and brands, so it is a strong caution for email, not a direct measurement of email programmes.

## What cannot be verified

No independent holdout study exists for welcome, browse or win-back flows. Klaviyo's benchmark figures, agency flow-share bands, "recover 30 percent of carts" and "$8 welcome revenue per recipient" are vendor or single-portfolio claims. McKinsey's "40 percent more revenue from personalisation" is a finding about the mix of revenue for faster-growing firms, not a 40 percent lift. The audited lift figure is 10 to 15 percent. The status of Klaviyo's AI features changes: predictive analytics, smart send time and channel affinity were treated as strong, AI copy as good for brainstorming only, and Composer, Marketing Agent and Segments AI as beta. Check whether any of these are generally available before relying on them.
