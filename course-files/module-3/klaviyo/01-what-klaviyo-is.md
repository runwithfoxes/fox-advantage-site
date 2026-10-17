# What Klaviyo is and how it is put together

Checked against Klaviyo's own pages on 17 Oct 2026. Klaviyo renames and ships things often, so treat anything dated as of that day. Where a page shows no date, the citation says "no date shown" and gives the day we read it.

## What is Klaviyo, in one paragraph?

Klaviyo is software that keeps one record for each of a business's customers, then uses that record to send them messages: email, text, WhatsApp and app push notifications. It also now sells AI agents that do some of the marketing work and some of the customer service. Klaviyo's own name for what it is: "the autonomous B2C CRM", where B2C means it sells to businesses that sell to individual consumers. Its platform page says marketing, service and analytics sit on one data foundation called the Klaviyo Data Platform (KDP). (Source: Klaviyo platform overview, no date shown, read 17 Oct 2026, https://www.klaviyo.com/platform)

Klaviyo's own guide for AI readers lays the portfolio out in four levels: platform, solution, product, feature. The solutions are Klaviyo Marketing, Klaviyo Service, Klaviyo Data Platform and Klaviyo Analytics. K:AI (Klaviyo AI) is described as a layer that runs across them, not a solution of its own. (Source: Klaviyo llms.txt, "Last updated 2026-09-09", https://www.klaviyo.com/llms.txt)

## Who is Klaviyo built for?

It is built for businesses that sell to consumers, and in practice for online shops. This is partly our reading and partly documented. Documented: Klaviyo's platform FAQ says B2C tools are shaped around individuals, high-volume sending and automation, where B2B tools are shaped around fewer, more complex accounts and long sales cycles. (Source: Klaviyo platform overview, no date shown, read 17 Oct 2026, https://www.klaviyo.com/platform) Documented: the Help Center says to connect your ecommerce platform to pull in events such as Placed Order and Checkout Started, and lists Shopify, Magento, BigCommerce, WooCommerce and Wix. (Source: Klaviyo Help Center, "Understanding Klaviyo-built integrations", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115000256472) Our reading: nearly every example in the Help Center is a shop, so a marketer outside ecommerce should expect to translate. Placed Order becomes "booked a table" or "paid an invoice", and the data has to be sent in.

It is not only shops. Extra ready-made segments are added to an account when a Klaviyo-built integration is added, and the list covers restaurants (ChowNow, Toast), health and wellness (Zenoti, Boulevard) and hotels and travel (Guesty, Mews, Cloudbeds), as well as the shop platforms. (Source: Klaviyo Help Center, "Klaviyo's default lists and segments reference", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360024538231) Any other business can send its own events and customers through the API or a CSV upload. (Source: Klaviyo Help Center, "Getting started with metrics", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005076787)

On size, Klaviyo's product pages say "Trusted by 205,000+ brands". That is Klaviyo's figure, and the pages do not say what counts as a brand or how it was measured. (Source: Klaviyo Composer page, no date shown, read 17 Oct 2026, https://www.klaviyo.com/composer) Klaviyo's 2026 abandoned-cart benchmark post uses a different number, more than 110,000 customers, as the sample for that one analysis, and Klaviyo does not reconcile the two. (Source: Klaviyo blog, abandoned cart benchmarks 2026, saved in sources/practice/klaviyo-blog-abandoned-cart-benchmarks-2026.md)

## What is a profile?

A profile is Klaviyo's single record for one person. If someone is on three lists, there is still one profile, which notes that they are on three. The profile holds contact details, a timeline of everything the person has done (emails opened, pages visited, orders placed, support requests) and their consent status for each channel. It has tabs for details, metrics and insights, lists and segments, and custom objects. Merging or deleting a profile is permanent, so Klaviyo recommends suppressing instead, which keeps the history. (Source: Klaviyo Help Center, "Understanding profiles in Klaviyo", updated 9 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/115005247088)

Klaviyo keeps three kinds of data: event data (what people did), profile data (facts about them, some Klaviyo's own such as first and last active, some custom ones you create such as birthday or size) and catalog data (the products in the shop, used to fill product blocks in messages). (Source: Klaviyo Help Center, "Getting started with data capture in Klaviyo", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/20920631501979)

## What is an event, and what is a metric?

An event is one thing a person did at one moment. Klaviyo uses "event" and "metric" for nearly the same idea: the metric is the named type (Placed Order), and each time it happens that is an event on a person's timeline. Events trigger flows and put people into segments. (Source: Klaviyo Help Center, "Klaviyo glossary", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005251588)

Metrics appear when you add an integration, when an event with a new name arrives through the API, or when you upload a CSV of events. An account is limited to 200 metrics. (Source: Klaviyo Help Center, "Getting started with metrics", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005076787)

## What is a list, and what is a segment?

A list is a fixed group that people join, usually by signing up through a form. A segment is a group defined by rules, such as "placed an order in the last 30 days", and it gains and loses people as their behaviour changes. File 02 covers the difference, consent and unsubscribing in full. (Source: Klaviyo Help Center, "Understanding the difference between segments and lists", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005061447)

## What is a flow?

A flow is an automated sequence of steps that one trigger starts. A trigger can be joining a list or segment, doing something such as placing an order, reaching a date stored on the profile (a birthday, for example), or a viewed product dropping in price or running low in stock. Steps include sending an email, text, push or WhatsApp message, waiting, splitting people down different paths and updating a profile. A flow filter limits who enters and is checked again before each message. (Source: Klaviyo Help Center, "Flow Glossary", updated 8 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/360054130591)

The classic flows are named after the trigger: welcome, abandoned cart (Started Checkout or Added to Cart), browse abandonment (Viewed Product), cross-sell and win-back. A person is scheduled for one step at a time, and a message left in draft is skipped. (Source: Klaviyo Help Center, "Understanding how contacts move through a flow", updated 8 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/360017706091) On 18 Aug 2026 Klaviyo announced "Flows 2.0", a rebuilt processing engine that it says handles over 74,000 profiles a second. (Source: Klaviyo What's New, entry dated 18 Aug 2026, https://www.klaviyo.com/whats-new)

## What is a campaign?

A campaign is a one-time send to a chosen group on a day you pick. Flows react to a person; campaigns reach out to many people at once. Since 23 Sep 2025 there are two kinds. A single-channel campaign sends one message on one channel to one audience at one time. An omnichannel campaign sends several messages, on any mix of channels, to several audiences, over several days. (Source: Klaviyo Help Center, "Difference between single message and omnichannel campaigns", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/41401317013147; the launch date is from Klaviyo What's New, "Omnichannel Campaign Builder", 23 Sep 2025, https://www.klaviyo.com/whats-new)

## What are sign-up forms and templates?

Sign-up forms are how a website collects email addresses and phone numbers and records consent. Klaviyo also hosts a subscribe page for every list. File 02 covers the types and best practice. (Source: Klaviyo Help Center, "Sign-up forms and subscribe pages reference", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005080327)

A template is the saved design of a message. Editing a saved template does not change copies already used in flows or in campaigns not yet sent. (Source: Klaviyo Help Center, "How to create, edit, delete, and manage templates", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115000102752)

## What is an integration, and how does a shop connect?

An integration is a connection that sends customer and order data into Klaviyo automatically. Most of what moves is one-way, into Klaviyo. Connecting uses either OAuth, a sign-in approval between two apps, or an API key. Private keys act like a password and should be kept safe. (Source: Klaviyo Help Center, "Understanding how information is exchanged between Klaviyo and apps", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/360030265051)

For Shopify, a person with access installs the Klaviyo app from the Integrations tab, approves the permissions in Shopify, then chooses settings: which list new email subscribers and new SMS subscribers go to, whether to sync Shopify Markets, and whether to push Klaviyo profile data back to Shopify. Klaviyo advises separate lists for email and SMS, and disconnecting any earlier email provider first, so existing subscribers do not get double opt-in emails. (Source: Klaviyo Help Center, "Getting started with Shopify", updated 7 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/115005080407) Klaviyo says it has 350+ ready-made integrations. That is Klaviyo's figure. (Source: Klaviyo llms.txt, 9 Sep 2026, https://www.klaviyo.com/llms.txt) The directory was renamed the Klaviyo App Marketplace on 29 Jul 2025. (Source: Klaviyo What's New, 29 Jul 2025, https://www.klaviyo.com/whats-new)

## Which channels does Klaviyo send on?

Email is on in every account. The other channels are set up separately. (Source: Klaviyo Help Center, "Difference between single message and omnichannel campaigns", updated 18 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/41401317013147)

Klaviyo calls its text product Text, with SMS and RCS as the channels inside it. RCS is a richer kind of text with a verified brand name, images, carousels and buttons. Klaviyo added RCS for Business on 24 Feb 2026. (Source: Klaviyo llms.txt, 9 Sep 2026, https://www.klaviyo.com/llms.txt; Klaviyo What's New, 24 Feb 2026, https://www.klaviyo.com/whats-new) WhatsApp is a separate product built on Meta's WhatsApp Business Platform, with full support launched on 24 Sep 2025. (Source: same two pages.) The Klaviyo Mobile App product covers push notifications and in-app messages for brands with their own app. Its page says unlimited push notifications come with every plan. (Source: Klaviyo Mobile App page, no date shown, read 17 Oct 2026, https://www.klaviyo.com/products/mobile-app-marketing)

Consent is kept per channel, so a person can be subscribed to text and not to email. File 02 explains this.

## What are the products called now?

Klaviyo asks readers to use its current names. Under Klaviyo Marketing sit Klaviyo Email, Text (SMS/RCS), Klaviyo WhatsApp, Klaviyo Mobile App, Composer, Social, Customer Hub, Personalization and Klaviyo Reviews. Under Klaviyo Service sit Customer Agent and Helpdesk (one word). KDP has three tiers: Standard, Data Warehouse Sync and Advanced. Customer Hub is a Marketing product, not a Service one. Klaviyo wants "flow" or "automation", never "workflow", and does not want Customer Agent called a chatbot. (Source: Klaviyo llms.txt, "Last updated 2026-09-09", https://www.klaviyo.com/llms.txt)

Composer is the AI marketing agent. Customer Agent is the AI customer service agent, which answers questions, recommends products and hands off to a person with context. Helpdesk is the workspace where a support team handles conversations with the customer profile attached. Customer Hub is a personalised on-site experience with self-service actions. Personalization decides who to reach, what to show and when, per customer. (Source: same llms.txt page.)

## What shipped or was renamed in 2025 and 2026?

All dates below come from Klaviyo's What's New page unless stated. (Source: Klaviyo What's New, entries 19 Dec 2024 to 16 Oct 2026, https://www.klaviyo.com/whats-new)

On 20 Feb 2025 Marketing Analytics launched. It is now called Personalization, and the Personalization page says it was "previously known as Marketing Analytics". No dated entry marks the rename. In Spain and Italy the old name is still the right one. (Source: Klaviyo Personalization page, read 17 Oct 2026, https://www.klaviyo.com/products/personalization; llms.txt, 9 Sep 2026)

Custom Objects, for data that is more than an event or a profile property (reservations, appointments), launched on 16 Jun 2025, and became available on all accounts on 14 Oct 2026.

Klaviyo's MCP server (a standard way for AI apps to work with Klaviyo data) was first listed on 25 Jun 2025. A ChatGPT connector followed on 9 Oct 2025. On 22 Jan 2026 Klaviyo announced a Klaviyo connector in Anthropic's MCP Directory, which is how Claude connects. A ChatGPT app followed on 28 Jan 2026. On 11 Aug 2026 Klaviyo announced more than 260 new tools. The developer docs say the server exposes over 260 tools, loads a core set by default, has a read-only setting, and can only be connected by an Owner, Admin or Manager. (Source: Klaviyo developer docs, "Klaviyo MCP server", "Connect to the MCP server", "Available tools", no date shown, read 17 Oct 2026, https://developers.klaviyo.com/en/docs/klaviyo_mcp_server) The Claude route is also on Klaviyo's own page, which lists uses such as a weekly performance recap, copy shaped by a segment, and a flow audit. (Source: Klaviyo + Claude page, no date shown, read 17 Oct 2026, https://www.klaviyo.com/integrate/claude)

On 24 Sep 2025 Klaviyo launched a "Marketing Agent", WhatsApp support and Customer Agent, and on 25 Sep 2025 Helpdesk. Marketing Agent is now a superseded name for Composer. The last Marketing Agent entry is 27 Oct 2025, and the first entry called Composer is 30 Jun 2026. No entry says on which day the rename happened. (Source: What's New; llms.txt, 9 Sep 2026.)

Other dated launches: Personalized Send Time (8 Jan 2026), Landing Pages (10 Feb 2026), Customer Agent for email (24 Mar 2026) and a Klaviyo extension for Shopify Sidekick (17 Jun 2026).

## What is Composer, and is it still in beta?

Composer is Klaviyo's AI marketing agent, built into Klaviyo. The Help Center says it analyses an account, audits flows and campaigns, drafts campaigns, flows and segments, and runs scheduled tasks, and that it does not send or publish anything without the user's sign-off. (Source: Klaviyo Help Center, "Getting started with Composer", updated 14 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/getting-started-with-composer)

Sources disagree on status because they were written on different days. Klaviyo's AI-reader file, last updated 9 Sep 2026, says Composer is "In beta". What's New says "The new Composer is live" on 13 Oct 2026, and a Klaviyo video of the same date says it is available to every customer. (Source: Klaviyo What's New, 13 Oct 2026; Klaviyo YouTube, "Composer Is Now Available to Every Klaviyo Customer", 13 Oct 2026, https://www.youtube.com/watch?v=pEzPPsxwwEg) Read the newer dates as current.

## What does Klaviyo cost?

Klaviyo's pricing page was read on 17 Oct 2026 and shows no date. Prices change, so check the page live before quoting any number. (Source: Klaviyo pricing page, no date shown, read 17 Oct 2026, https://www.klaviyo.com/pricing)

The free plan, as the page states it, covers up to 250 active profiles and 500 email sends a month, plus $5 of mobile messages and $5 of Composer use a month. Above that, email is priced by the number of active profiles. The prices come from the page's code, which feeds its price calculator, not from a visible table. They give (USD a month) $20 for 251 to 500 profiles, $30 for 501 to 1,000, $45 for 1,001 to 1,500 and $150 for 6,501 to 10,000. The page defines active profiles as any contact that can receive marketing. Per the Help Center, that means any profile not suppressed for email, and Klaviyo does not charge for suppressed profiles. (Source: Klaviyo Help Center, "Understanding suppressed email profiles", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/115005246108) Texts and other mobile messages are paid per credit on Klaviyo's legacy credit pricing, and the number of credits a message uses depends on the country and type. Accounts are moving from credits to a dollar cost per message, with carrier fees still built in, so which applies depends on the account. (Source: Klaviyo Help Center, "Understand Klaviyo's mobile messaging system", https://help.klaviyo.com/hc/en-us/articles/13502982552347) The page says its mobile price includes carrier fees where they apply. The page's own price tables are not fully labelled, and the Help Center's older credit table gives different credit counts for some countries, so check live before quoting a text price.

Composer costs $20 a month for 2,000 credits, against 500 free credits a month. Extra use is $10 per 1,000 credits. Unused credits do not roll over. (Source: Klaviyo Help Center, "How your Composer plan works", updated 14 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/55587298026395) Composer credit amounts have changed through 2026, and a 5 Aug 2026 Klaviyo video says every account then got 10,000 credits during the public beta (https://www.youtube.com/watch?v=fldaC9MmJlc), so ask which plan someone is on.

Customer Agent is priced by "AI resolutions" a month (a conversation the agent settles without a person), with the first 50 free. Helpdesk is priced by tickets a month, with a 30-day free trial. (Source: Klaviyo pricing page, no date shown, read 17 Oct 2026.)

Our reading, and not Klaviyo's: because email is priced by active profiles and texts by credit or by message, Klaviyo earns more when a customer's list is bigger and more is sent. Its advice therefore leans towards growing lists and sending more, so weigh it against your own goals.

## What does "revenue from Klaviyo" mean?

Revenue that Klaviyo reports against an email or text is attributed revenue. By default Klaviyo credits a sale to a message if the person opened or clicked an email in the 5 days before the sale (5-day windows for email opens and clicks and text clicks, 1 day for text opens). That is a last-touch rule. It shows the message was nearby, and it does not prove the message caused the sale. (Source: Klaviyo Help Center, "How to change your attribution model", updated 15 Aug 2026, https://help.klaviyo.com/hc/en-us/articles/11118357030555)
