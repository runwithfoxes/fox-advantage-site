# Lists, segments, consent and sign-up forms

Checked against Klaviyo's own pages on 17 Oct 2026. Klaviyo's settings and menu names change, and two Help Center articles below word the same setting differently, so look for the setting by its description if a menu name does not match.

## What is the difference between a list and a segment?

A list is a fixed group. People are on it because they signed up, were imported or were added by hand, and it only grows when someone joins (or shrinks when someone is removed). A segment is a group defined by rules, such as "placed an order in the last 30 days". It adds people when they meet the rules and drops them when they stop meeting them. (Source: Klaviyo Help Center, "Understanding the difference between segments and lists", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005061447)

One consequence catches people out. You can add a person to a list by quick add, import or sign-up form, but you cannot add anyone to a segment that way, because only the rules decide. (Source: same article.)

## When should I use a list and when a segment?

Use a list to hold the people who have agreed to hear from you on one channel. Klaviyo recommends one main list per channel: one for email, one for SMS, and others only as needed, such as push. With one list per channel it is easy to find everyone opted in, the list growth report is meaningful, and list cleaning is simpler. Many lists risk repeat messages to the same person, though one campaign sent to several lists reaches a person on more than one only once. (Source: Klaviyo Help Center, "Understanding the benefits of having a main list for each marketing channel", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360043947571)

Use segments to decide who gets what. Klaviyo names three jobs: targeted campaigns, triggering flows, and analysis. For targeting, import everyone into the one list and cut groups from it with segments, for example by the sign-up source stored on the profile, instead of keeping many lists. (Source: same two articles.)

A segment can also be frozen. "Snapshot segment" copies everyone in the segment today into a new list. The segment carries on changing and the list does not. (Source: Klaviyo Help Center, "Getting started with segments", updated 25 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005237908)

## Why must I limit a segment to a list before emailing it?

A segment pulls from everyone in the account, whether or not they ever agreed to marketing. Klaviyo says to confine a segment to a list before sending an email campaign to it. (Source: Klaviyo Help Center, "Understanding the difference between segments and lists", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005061447.) A separate article says a segment used to send email should require engagement, subscription or both. (Source: Klaviyo Help Center, "Understanding active email profiles in Klaviyo", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005246968.) The simple way is a condition such as "can receive email marketing because person subscribed". The Help Center also shows a "not opted in" segment for exclusion: people who cannot receive email, or can but never subscribed (for example someone who started a checkout without ticking the marketing box). Use the campaign's "don't send to" box to exclude it. (Source: Klaviyo Help Center, "How to create a not-opted-in segment", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360024584671)

## How does a segment update?

Most segments update close to real time, shortly after someone does something that qualifies or disqualifies them. A manual update can take up to 15 minutes and a monitored segment up to an hour. Segments that use relative dates ("in the last 30 days") are the exception. A person who does the action is added at once. A person who simply stops qualifying, because the 30 days ran out, is removed in a once-a-day pass, since "not buying" is not an event that can fire. A manually updated segment also does not let people into a flow triggered by that segment. (Source: Klaviyo Help Center, "Understanding how segments update", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005233488)

Two details for building them: the connector between conditions starts as OR, so switch to AND when everyone must meet every condition, and only top-level event properties work, with case-sensitive values. (Source: Klaviyo Help Center, "Getting started with segments", updated 25 Aug 2026.) For most accounts the limits are 1,000 lists, 1,000 active segments and 100 criteria in one segment, and inactive segments do not count towards the cap. (Source: Klaviyo Help Center, "List and segment limits in Klaviyo", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/48218796985883) "Define with AI" drafts a segment from a plain description, and you edit the result. (Source: Klaviyo Help Center, "Getting started with segments", updated 25 Aug 2026; a Klaviyo video of 22 Jul 2026 says it is for paid accounts, https://www.youtube.com/watch?v=5Gc1QpGn4dE.)

## What happens if someone is on two lists and unsubscribes from one?

By default they are unsubscribed from all email, whichever list the message was sent to. Klaviyo treats an unsubscribe as a change to the person's email consent status, which sits on the profile, and not as a change to one list. The status becomes Unsubscribed and Klaviyo skips them on every email send, even if they are still sitting on a list. (Source: Klaviyo Help Center, "Understanding unsubscribes and resubscribes", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005078267)

Klaviyo calls this the global unsubscribe and recommends leaving it on, because a person who unsubscribes from one of your emails expects to be gone from all of them, and sending anyway leads to spam complaints. (Source: Klaviyo Help Center, "Understanding suppressed email profiles", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005246108)

There are three limits to know. First, on a paid plan an account can switch the global behaviour off for the whole account or for one list. Then a person who unsubscribes from a list-based email is removed only from that list, and may still get emails sent to other lists they belong to. Second, even with the setting off, if a campaign was sent to several lists at once, an unsubscribe from it is always treated as global, and so is an unsubscribe from an email that was not sent to a list. Third, none of this touches text or push consent. Those are separate. (Source: both articles above.)

Does the person stay on the list? Often yes. Someone who unsubscribes from a message sent to a segment, or through a flow triggered by an event, is suppressed but may remain on a list. A manager can use "Remove suppressed profiles" on the list, and Klaviyo suggests doing that about once a month so growth reports stay accurate. Klaviyo's list article also says a person is removed from a list when they unsubscribe from that list. (Source: Klaviyo Help Center, "Understanding the benefits of having a main list for each marketing channel", updated 15 Aug 2026; "How profiles are added to and removed from lists", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4407853491483)

Coming back: a person can resubscribe through a Klaviyo form or subscribe page, a form built on Klaviyo's subscribe endpoint, or a CSV upload that carries consent. If they resubscribe to the list they left, they are re-added to it. If they join List B, they are not re-added to List A. A person suppressed because of a bounce stays suppressed after resubscribing. (Source: Klaviyo Help Center, "Understanding unsubscribes and resubscribes", updated 15 Aug 2026.)

## What is the difference between consent and suppression?

They are two separate settings on a profile. Consent says whether the person agreed to be marketed to on a channel: Subscribed, Unsubscribed or Never subscribed. Suppression says whether Klaviyo will let you send at all. A subscribed person can be suppressed by hand and keep their Subscribed status, and can be unsuppressed later without asking again. (Source: Klaviyo Help Center, "Understanding consent in profiles", updated 3 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/360037101072)

Never subscribed matters for email. Someone who gave an email address at checkout without opting in is emailable, for flows such as abandoned cart, but has not agreed to marketing. Klaviyo says to be careful with them and recommends emailing only people with express consent. (Source: same article.) A flow filter of "can receive email marketing because person subscribed" keeps these people out of a flow. (Source: Klaviyo Help Center, "Understanding active email profiles in Klaviyo", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005246968)

## Who counts as suppressed?

A profile suppressed for email cannot receive marketing, even if it consented. The Help Center lists these reasons: a hard bounce, more than seven soft bounces in a row (counted over the past two years), a spam complaint, a manual suppression, or a suppression carried over from a previous provider. Klaviyo also skips "suspicious" addresses that hard bounced at least three times across its infrastructure. (Source: Klaviyo Help Center, "Understanding suppressed email profiles", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005246108)

Money matters here. Suppressed profiles and unsubscribed profiles are not charged for, because pricing counts only active email profiles. (Source: same article; see file 01 for pricing.) Resubscribing lifts suppressions except those for deliverability, such as hard bounces, which stay to protect sender reputation. (Source: same article.)

## What is single and double opt-in?

Single opt-in adds a person when they submit a form. Double opt-in sends a confirmation message first and adds them only when they confirm. It is set per list, and new lists take the account's default. For email the confirmation link is valid for 72 hours. List imports do not trigger double opt-in. (Source: Klaviyo Help Center, "Understanding the double opt-in process", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005251108)

Klaviyo's reasons for double opt-in: forms attract typing mistakes and spam bots, and inbox providers watch spam complaints and bounces. For SMS it says always use double opt-in, because carriers often require it, particularly for abandoned cart messages, and it names the US and Canada for that. It sees single opt-in as sensible mainly where a third-party form already asks for confirmation. (Source: same article.) The firmer wording is in the SMS consent article: double opt-in is a carrier requirement in the US for any shopping cart abandonment text flow. (Source: Klaviyo Help Center, "Understanding SMS consent collection", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360035056972.) This is Klaviyo's advice. It is documented, but it gives up some sign-ups at the confirmation step, and the Help Center gives no figure for how many.

If someone starts a double opt-in and never confirms, a form submission can leave a blank profile with no list membership. That person can still be cookied and appear in behaviour-based segments. (Source: same article.)

## How is text consent different from email consent?

Consent is collected separately for each channel. Email consent does not give you text consent, and the reverse is also true. Push is a third separate permission. (Source: Klaviyo Help Center, "Understanding consent in profiles", updated 3 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/360037101072)

For text, people must agree explicitly, someone who is Never subscribed to SMS cannot be texted at all, and Klaviyo splits SMS consent into marketing and transactional. Marketing consent covers transactional messages. Transactional consent does not cover marketing. If you have a form that asks for both email and phone, make the text part clearly optional, and put the disclosure wording above the box. You cannot make text consent a condition of buying. Klaviyo advises against asking for email and text on the same form step, because people may feel they must take both. Leads bought or collected for another brand are not valid consent. (Source: Klaviyo Help Center, "Understanding SMS consent collection", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360035056972)

Opting out works differently too. Someone who replies STOP must reply UNSTOP to be texted again. Resubscribing them through a form will show consent in Klaviyo, and the carriers will keep blocking the messages until the person texts back. (Source: Klaviyo Help Center, "Understanding unsubscribes and resubscribes", updated 15 Aug 2026.) Where a branded sender ID is used, the double opt-in text cannot be sent because those senders cannot receive replies. Klaviyo suggests Smart Opt-in on paid plans, where the visitor enters the phone number and then a one-time code. (Source: Klaviyo Help Center, "Understanding the double opt-in process", updated 15 Aug 2026.)

## What kinds of sign-up form are there?

Klaviyo builds popup, flyout, full-page and embedded forms. Embedded forms sit in the page, such as in a footer, and always show on load. The other three can be triggered by exit intent (the visitor is about to leave), a time delay, scroll depth, number of pages seen, or a button click. Each list also has a Klaviyo-hosted subscribe page, and there are third-party tools and hand-coded forms. (Source: Klaviyo Help Center, "Sign-up forms and subscribe pages reference", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005080327; "Understanding targeting and behavior settings for sign-up forms", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4413544555547)

Landing pages arrived on 10 Feb 2026. They are pages Klaviyo hosts, reached by a link from an ad, email or social bio, where forms sit on your own pages. Both can collect email and phone. (Source: Klaviyo What's New, 10 Feb 2026, https://www.klaviyo.com/whats-new; Klaviyo Help Center, "Klaviyo Landing Pages vs Onsite Signup Forms", updated 9 Jul 2026, https://help.klaviyo.com/hc/en-us/articles/52818378796187)

Targeting controls who sees a form: all visitors, only visitors unknown to Klaviyo, a list or segment, certain URLs, UTM parameters or locations. For visitors in the EU, EEA, UK and Switzerland, Shopify's privacy settings can stop Klaviyo identifying a visitor who has not consented, and then targeting that depends on knowing the visitor will not work. (Source: "Understanding targeting and behavior settings for sign-up forms", updated 15 Aug 2026.)

## What does Klaviyo recommend for sign-up forms?

These are Klaviyo's recommendations. They are documented advice, with no figures behind them in the pages we hold.

Publish at least two forms: an exit-intent popup with an incentive and a teaser (a small tab that lets people reopen it), plus a footer form asking only for an email address. Turn on double opt-in, link to the privacy policy, and use the data-protection fields for EU visitors. On mobile keep to one to three fields, text of at least 16 pixels and touch targets of at least 48 pixels. If you collect both email and text, use a multi-step form: email first, then phone on the second step. Klaviyo says forms asking for email convert better than forms asking for phone numbers, so a phone number on the first step can slow email list growth. (Source: Klaviyo Academy, "Best practices for sign-up forms", last updated 24 Oct 2025, https://academy.klaviyo.com/en-us/best-practices/best-practices-for-sign-up-forms; Klaviyo Help Center, "Understanding multi-step forms", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4404256496283)

With several forms live, switch on collision prevention so only one shows at a time or one per session. If you choose one per session, teasers will not show, so use a time delay instead. (Source: Klaviyo Help Center, "How to prevent multiple sign-up forms from displaying at once", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/19788320859419) Klaviyo warns that popups covering content on pages found through search can hurt search ranking. (Source: Klaviyo Help Center, "How to optimize popup and flyout forms for mobile", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4406161800987)

For the EU, Klaviyo's GDPR route is to start a form with Data Protection Fields enabled, give subscribers a checkbox per type of marketing, and leave the boxes unticked. Each choice is stored on the profile as a consent property. Klaviyo says to have a lawyer review the wording. (Source: Klaviyo Help Center, "How to collect GDPR-compliant consent", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360003536031)

## Which segments are worth building first?

Klaviyo's new accounts come with a preview list, a New Subscribers segment (joined in the last two weeks), Engaged segments for 30, 60 and 90 days, and the main email list, and describes an SMS list too. A shop integration adds Churn Risks, Potential Purchasers, VIP Customers, Winback Opportunities and Repeat Buyers. (Source: Klaviyo Help Center, "Klaviyo's default lists and segments reference", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360024538231)

The Help Center's worked examples, in our words:

An engaged segment is people who can receive email because they subscribed and who opened or clicked in the last 30 days, with an optional extra for people who joined in the last 15 days. A longer window suits infrequent senders. (Source: "How to create an engaged segment of email subscribers", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115000200072)

An unengaged segment is people who can receive email, got at least five emails, and neither opened nor clicked in 90 days. (Source: "How to create an unengaged segment", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/32826141659675)

A never-engaged segment is people who received at least five emails in 180 days and never opened, clicked or ordered. (Source: "How to create a never engaged segment", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005078347)

A non-opener segment must include "received email", or it sweeps in everyone who did not open, including people who were never sent the email. (Source: "How to create a non-opener segment", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360048341511)

A VIP segment needs a time limit, or it fills with old customers who no longer buy. Use big spenders (revenue above a figure over 365 days), frequent buyers (orders above a number) or both joined by OR, with thresholds a little above your average customer. (Source: "How to create a segment of VIP customers", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005065707)

A cross-sell segment is people who ordered product A at least once and product B never. (Source: "How to create a cross sell segment", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005066027)

A recent cart abandoners segment is started checkout in the last week and no order in the last week. It is for ads and exit forms. To email people, use an abandoned-cart flow, because a campaign to a segment is too slow to be timely. (Source: "How to create and target a segment of recent cart abandoners", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360032334511)

Consent segments let you cut by channel, such as subscribed to email and not to text. (Source: "How to segment on channel consent", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/19514751281307)

## How do engagement segments protect deliverability?

Klaviyo's argument is that inbox providers such as Gmail, Yahoo and Outlook judge a sender by how recipients react, so repeatedly sending to people who never engage pushes mail towards spam. Its advice is to send regular campaigns to the engaged segment, widen to more of the list only for big moments such as a sale or launch, exclude the unengaged segment from most sends, and in the end suppress people who never engage. (Source: Klaviyo Help Center, "How to create an engaged segment of email subscribers", updated 15 Aug 2026; "How to create a never engaged segment", updated 18 Aug 2026; "How to clean your email list to maintain good deliverability", updated 11 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/360044054732) File 05 covers deliverability and the detail of how to clean a list.

Treat opens with care. Since Apple's Mail Privacy Protection, open data is inflated, and Klaviyo says so in each of these segment articles. An "opened" rule therefore keeps in some people who never really looked. Klaviyo's own engaged-segment definition counts a click as well as an open, though the article does not say clicks are free of the problem. (Source: Klaviyo Help Center, "How to create an engaged segment of email subscribers", updated 15 Aug 2026.) Our reading: because pricing counts active profiles, suppressing people who never engage can also lower the bill.

## Does segmenting really pay?

Klaviyo's own pages say so, and give figures without samples. The segments Help Center page says highly segmented campaigns return more than three times the revenue per recipient of unsegmented ones. The Academy says targeted segments return three times the return on investment of lists, and recommends sending at least two thirds of campaigns to segments, with 70 percent to engaged profiles only, 20 percent to a broader audience and 10 percent to the whole list. These are Klaviyo's figures. The Help Center page does not say how many accounts were measured, over what period, or how the groups were compared. The Academy names its basis, an annual segmentation benchmark report, but we do not hold that report, so we cannot give its sample. Our reading: the revenue is attributed revenue, not revenue the segmenting caused. (Source: Klaviyo Help Center, "Getting started with segments", updated 25 Aug 2026; Klaviyo Academy, "Best practices for segments", last updated 16 Oct 2025, https://academy.klaviyo.com/en-us/best-practices/best-practices-for-segments)
