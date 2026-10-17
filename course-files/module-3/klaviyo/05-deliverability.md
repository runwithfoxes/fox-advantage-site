# Deliverability: getting email into the inbox

Checked against Klaviyo's own pages, and against the Google, Yahoo and Microsoft sender pages, on 17 Oct 2026. Inbox providers change their rules, so check the live pages before acting on a number here. Help Center dates below are the "updated" dates on the articles as saved on 17 Oct 2026.

## What is deliverability, and how is it different from delivery?

Delivery means the receiving mail server accepted your email. Deliverability means where it landed after that: the main inbox (Gmail's Promotions tab counts) or the spam folder. You can have near-perfect delivery and poor deliverability. Klaviyo says deliverability is best judged on signs of a real person engaging, such as clicks, replies, forwards and orders. It names four things that shape it: who you send to and how they respond, how often and how much you send, what is in the email, and the set-up you send from (sending domain, click-tracking domain and IP address). All of this is documented. (Source: Klaviyo Help Center, "Understanding email deliverability", updated 17 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005247008)

## Who counts as a bulk sender?

Each provider draws the line differently.

Gmail's FAQ defines a bulk sender as one sending "close to 5,000 messages or more" in 24 hours to personal Gmail addresses. Mail from the same primary domain is added together, so 2,500 a day from one subdomain plus 2,500 from another is 5,000. Reach the line on one day and you are a bulk sender for good. The rules are about mail sent to personal Gmail accounts, not mail sent to Google Workspace business accounts. If you send from a Workspace account to personal Gmail addresses, the rules still apply to you: Google says "All senders, including Google Workspace users, must meet the requirements". Google's own pages say both "5,000 or more" and "more than 5,000", so treat 5,000 a day as the line. (Source: Google, "Email sender guidelines FAQ", no update date shown, checked 17 Oct 2026, https://support.google.com/a/answer/14229414.) A personal Gmail account is one ending in @gmail.com or @googlemail.com. (Source: Google, "Email sender guidelines", no update date shown, checked 17 Oct 2026, https://support.google.com/a/answer/81126)

Yahoo gives no number. It says a bulk sender is one sending "a significant volume of mail" and that it will not publish a threshold. Its rules cover every brand Yahoo hosts, including AOL. (Source: Yahoo Sender Hub, "FAQs", undated, checked 17 Oct 2026, https://senders.yahooinc.com/faqs)

Microsoft's line is domains sending more than 5,000 emails a day to Outlook.com, Hotmail and Live addresses. (Source: Microsoft Outlook team, "Strengthening Email Ecosystem: Outlook's New Requirements for High-Volume Senders", 2 Apr 2025, updated 30 Apr 2025, https://techcommunity.microsoft.com/blog/outlook/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730)

Klaviyo adds that Google counts all your traffic toward the line, including order confirmations. (Source: Klaviyo Help Center, "Understanding branded vs. shared sending domains", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/7674941873947)

## What do Gmail and Yahoo require since February 2024?

Both began enforcing in February 2024. Google says that from November 2025 it is "ramping up its enforcement", with temporary and permanent rejections for mail that fails. Yahoo started on the unsubscribe rule in June 2024. For bulk senders the two lists are close to the same.

Authenticate. Both want SPF and DKIM, and a DMARC record. The DMARC policy can be the weakest one, "none" (written p=none), which asks receivers to take no action on mail that fails. Asking for reports is a separate job, done by a reporting address in the record (the "rua" tag), and Yahoo strongly recommends adding one. The domain in the From address must match the domain that passed SPF or DKIM, which is what "alignment" means. Google says DKIM keys must be 1024 bits or longer and recommends 2048.

Make unsubscribing easy. Marketing mail needs one-click unsubscribe (next section) and a visible unsubscribe link in the body. Google says to process unsubscribes within 48 hours and Yahoo says within 2 days. Receipts and password resets are exempt from the one-click rule at both.

Keep complaints low (the section after next).

(Sources: Google, "Email sender guidelines", no update date shown, checked 17 Oct 2026, https://support.google.com/a/answer/81126; Google FAQ above; Google, "Email subscription guidelines for senders", no update date shown, checked 17 Oct 2026, https://support.google.com/mail/answer/15263077; Yahoo Sender Hub, "Sender Requirements & Recommendations", undated, checked 17 Oct 2026, https://senders.yahooinc.com/best-practices)

## What does one-click unsubscribe mean in practice?

It means two lines in the email's hidden technical header: a List-Unsubscribe line holding a web address, and a List-Unsubscribe-Post line reading List-Unsubscribe=One-Click. Inboxes read these to show an Unsubscribe button beside the sender name. A link in the body does not satisfy the rule alone, and Google says a mailto link does not either. Yahoo also requires the List-Unsubscribe header, which supports one-click unsubscribe, for marketing mail. What it only recommends is the Post method: it calls that "highly recommended" and says mailto is "acceptable". Google adds that the button appears only for senders who pass its automated checks. (Sources: Google, "Email sender guidelines" and FAQ; Yahoo, "Sender Requirements & Recommendations", as above)

## What spam complaint rate is safe?

The spam complaint rate is the share of recipients who press "report spam". Three sources give three numbers.

Gmail says to keep the rate shown in Google Postmaster Tools below 0.10% and never reach 0.30%. It says rates above 0.1% already hurt inbox delivery for bulk senders, and above 0.3% you lose access to mitigation help. It calculates the rate daily. (Source: Google FAQ, as above)

Yahoo says below 0.3%, worked out on mail that reached the inbox, which is a different base from most platforms. (Source: Yahoo, "Sender Requirements & Recommendations")

Klaviyo's targets are tighter (Klaviyo's figures): under 0.01% is healthy, 0.01% to 0.05% has room for improvement, above 0.05% needs attention. Its reason is sound. Gmail passes few complaints back to email platforms, so the figure inside Klaviyo likely runs low, and Klaviyo points senders to Postmaster Tools for the real Gmail number. Separately, its deliverability article says inbox providers may treat you as a bad sender once your abuse rate "hits even 0.05%". No data is shown for that (practitioner view), and it sits below Google's guidance. Treat Google and Yahoo's numbers as the rules and Klaviyo's as a cautious target. (Sources: Klaviyo Help Center, "Understanding the deliverability tab in campaigns and flows", updated 1 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/12695416712219; Klaviyo Help Center, "How to reduce spam complaint rates", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360057985791)

## What did Outlook add in 2025?

For domains sending more than 5,000 emails a day, Microsoft requires SPF and DKIM to pass and DMARC to be at least p=none and aligned with SPF or DKIM, preferably both. It only recommends a working unsubscribe link, regular list clean-up and honest subject lines. It sets no complaint-rate threshold and no unsubscribe deadline, and says Safe Senders lists will not get you round the rule.

Its post contradicts itself on what happens to failing mail. One paragraph says rejection with the error "550; 5.7.515 Access denied" starts on 5 May 2025. A later one says that after 5 May mail goes to Junk first, with rejection starting on a date to be announced. Plan for rejection. (Source: Microsoft Outlook team, 2 Apr 2025, updated 30 Apr 2025, link above)

## How do I set up my own sending domain in Klaviyo?

A new account sends from Klaviyo's shared domain and IP, and Gmail shows "via klaviyomail.com" beside your name. Klaviyo recommends a dedicated sending domain (also called branded), so mail comes from your own domain, your reputation is built there, and other senders on the shared domain cannot drag you down. It also lets you pass DMARC. Klaviyo says a bulk sender must have one. (Source: Klaviyo Help Center, "Understanding branded vs. shared sending domains", as above)

You choose an unused subdomain ("send" is the most common) and add DNS records Klaviyo generates. Klaviyo recommends "dynamic" routing, where NS records hand the subdomain to Klaviyo. "Static" routing uses CNAME records, for DNS providers that cannot do NS. Records can take up to 48 hours to spread. You can run separate domains for marketing, transactional and service mail so each builds its own reputation. The From address must share the root domain with the sending domain. (Source: Klaviyo Help Center, "How to set up a branded sending domain", updated 30 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/115000357752)

## Do I need to warm up a new domain?

Klaviyo's rule: new dedicated infrastructure must be warmed. "New" means a root domain registered in the last 30 days or never used for email, or an IP unused for 30 days. Warming is how you build a reputation from nothing. Ramping means starting with small volumes and growing them. Existing Klaviyo customers moving to a branded sending domain need no new warming if the domain was registered at least 30 days ago and has already been used to send email, for example with a past provider or with Klaviyo. People joining Klaviyo from another platform follow the process below. (Source: Klaviyo Help Center, "Understanding guided warming in Klaviyo", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4402636609691) Klaviyo's example: ramping to 100,000 emails may take as little as 10 days, but inbox providers usually take up to 30 days to form a first view, and opens and clicks can move around for about 120 days. (Source: Klaviyo Help Center, "Understanding ramping vs. warming", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/7520811253275)

If you have engagement data from a previous platform, Klaviyo's standard process runs like this. All thresholds are Klaviyo's own targets, not inbox provider rules.

1. Build engaged segments for the last 30, 60, 90, 120 and 180 days (opened or clicked in that window).
2. Send the first campaign to the 30-day segment, under 10,000 recipients, aiming for an open rate above 30%.
3. Stay on the 30-day segment for two weeks. While opens stay above 20%, widen to 60 days for weeks three and four, then 90 days, widening every two weeks. If opens fall below 20%, stop widening.
4. Switch on flows next. Flows that have done well before (open rate above 40%, click rate above 1%, unsubscribe and complaint rates under 0.1%) can go live. Otherwise start the welcome flow after 2 weeks of campaigns, abandoned cart after 30 days, and browse abandonment after 30 to 60 days.
5. Leave winback, re-engagement and sunset flows until warming is done, since they draw low engagement by nature.

(Source: Klaviyo Help Center, "How to warm your sending domain in Klaviyo", updated 15 Sep 2026, https://help.klaviyo.com/hc/en-us/articles/20413890435355)

New accounts with at least 5,000 active profiles and some engagement history may see "guided warming" banners that warn when an audience is too big and can leave out unengaged people automatically. (Source: Klaviyo Help Center, "Understanding guided warming in Klaviyo", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/4402636609691) Accounts with no engagement history use a "platform introduction" process with caps: for a daily sender, 2,000, 4,000, 8,000 and 12,000 on days one to four, starting with people who clicked in the last 30 days. (Source: Klaviyo Help Center, "Understanding the platform introduction process in Klaviyo", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/20414723525531)

Open rates drive this process, and Apple's Mail Privacy Protection inflates them (file 06). Klaviyo says so itself. A 30% open rate is softer evidence than it looks.

## How do I stop sending to people who never respond?

Klaviyo describes three segments, and they count different things.

An engaged segment is people who can receive email and opened or clicked in the last 30 days, or subscribed in the last 15. Klaviyo suggests using it for regular sends and widening it for big promotions. (Source: Klaviyo Help Center, "How to create an engaged segment of email subscribers", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115000200072)

An unengaged segment is people who have received at least 5 emails but had no opens or clicks in the last 90 days. Klaviyo says mailing people silent for three to six months can send your mail to spam. (Source: Klaviyo Help Center, "How to create an unengaged segment", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/32826141659675)

A sunset segment is stricter: created at least 180 days ago, at least 5 emails received in the last 72 weeks, and no open, click, site visit, product view, checkout or order, ever. The sunset flow sends one to three last emails, waits a few days, then tags non-responders for suppression. Suppression is a manual step for now. (Source: Klaviyo Help Center, "How to create a sunset flow", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360017518492)

Klaviyo calls stopping sends to never-engaged people "the single most effective way" to fix deliverability problems (practitioner view; no data shown). (Source: Klaviyo Help Center, "How to create a never engaged segment", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005078347)

Our reading on money: Klaviyo's email price rises with the number of active profiles, and the sunset article says suppressed profiles stop counting toward your plan. Here its advice and your bill point the same way. Elsewhere, bigger lists and more sending are what earn Klaviyo more, so check its advice on frequency and list size against your own complaint rate and click and order numbers. (Sources: sunset article above; Klaviyo pricing page, no date shown, checked 17 Oct 2026, https://www.klaviyo.com/pricing)

## How do I monitor deliverability in Klaviyo?

The Deliverability hub (under Analytics) gives a score from 0 to 100 built from the last 30 days of open, click, bounce, unsubscribe and complaint rates. Bands: Poor 0 to 49, Fair 50 to 74, Good 75 to 89, Excellent 90 to 100. It needs at least 1,000 emails sent in 30 days. It also lists recommended actions and splits results by inbox provider. Each sent campaign and flow email has a Deliverability tab. (Source: Klaviyo Help Center, "Understanding the email deliverability hub in Klaviyo", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/18378819907995)

Klaviyo's per-message targets (Klaviyo's figures): bounce rate healthy under 1%, needs attention over 2%; unsubscribe rate healthy under 0.3%, needs attention over 1%; open rate healthy above 33%; click rate healthy above 1.2%. Look at 30 days and worry about trends, not one weak campaign. The industry open and click tables in its monitoring guide are Q3 2023 data and include Apple's machine opens, so do not set them beside 2026 benchmarks. (Sources: deliverability tab article above; Klaviyo Help Center, "Getting started with email deliverability monitoring and performance metrics", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115000201131)

For Gmail, use Google Postmaster Tools. Google says it does not track open rates, cannot verify the ones outside tools report, and that a low open rate alone does not prove a spam problem. (Source: Google, "Email sender guidelines")

## What do outside figures say about inbox placement?

Validity measures it with seed addresses, test mailboxes at inbox providers, and checks where each message lands. Only customers who agreed to aggregation are included, and it does not state how many senders or messages (outside data, method only). Its 2026 report, covering 2025, gives a global inbox placement rate of 87.2%, up 3.7 points from 83.5% a year earlier. By provider in 2025: Gmail 89.8%, Yahoo 87.3%, Apple 82.0%, Microsoft 77.4% (15.1% in spam, 7.5% missing, meaning deferred or blocked). Retail: 90.4% inbox, 2.7% spam, 6.9% missing. Validity credits the Gmail, Yahoo and Microsoft rules for part of the rise and says sending volume fell year on year for the first time in its reports. Those explanations are Validity's reading, not something its data proves. (Source: Validity, "2026 Email Deliverability Benchmark Report", Mar 2026, https://www.validity.com/wp-content/uploads/2026/03/2026-Benchmark-Report.pdf; 83.5% from Validity, "2025 Email Deliverability Benchmark Report", Mar 2025, https://validity.com/wp-content/uploads/2025/03/2025-Benchmark-Report-FINAL.pdf)
