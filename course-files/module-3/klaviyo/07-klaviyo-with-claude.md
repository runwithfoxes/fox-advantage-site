# Klaviyo with Claude, and Klaviyo's own AI

Checked against Klaviyo's own pages on 17 Oct 2026. This part of Klaviyo changes almost every month, so check the dates below before you rely on them.

## Can Claude work inside my Klaviyo account?

Yes. Klaviyo has a connector for Claude. It is listed in Claude's connector directory, so you don't need any code to set it up. Once it is connected, Claude can read your account and, if you let it, make changes in it. Klaviyo's own list of uses covers pulling campaign and flow reports, looking up and updating customer profiles, checking how a list or segment is defined, building email templates and creating campaigns. Klaviyo's example is asking "how did revenue from email compare last month vs this month" without exporting a spreadsheet. (Source: Klaviyo Help Center, "Frequently Asked Questions About Klaviyo App For Claude", updated 20 Jul 2026, https://help.klaviyo.com/hc/en-us/articles/51798102561435)

## How do I connect it?

In Claude, go to Settings, then Connectors, then Browse Connectors. Search for Klaviyo and connect it. Claude asks you to approve its access, and then Klaviyo asks you to allow the permissions on your account. You can also start from Klaviyo's side, by finding Claude in the Klaviyo App Marketplace and installing it. You need a Claude plan, and your Klaviyo login must have the Owner, Admin or Manager role. (Sources: the FAQ above, and Klaviyo developer docs, "Connect to the Klaviyo MCP server", no date shown, https://developers.klaviyo.com/en/docs/connect_to_the_klaviyo_mcp_server)

If you look after more than one Klaviyo account, for example as an agency, add Klaviyo as a custom connector once for each account, using the server address https://mcp.klaviyo.com/mcp with the account's name added to it. Then switch on only the right one in each chat. Klaviyo says custom connectors need a Pro, Max, Team or Enterprise Claude plan. (Source: the developer page above)

## Can I stop Claude changing anything?

Yes, if you connect it as a custom connector. Klaviyo's server has a setting called read-only. Add read-only=true to the server address, and every tool that could change your account is switched off. There is a second setting that stops Claude reading content your customers wrote, such as reviews, because text like that could carry instructions an AI might wrongly follow. Klaviyo also advises reviewing each action Claude proposes before it runs. If you are learning, start read-only. (Source: the developer page above, "Query parameters")

## What is the MCP server?

MCP is a standard way for AI tools to connect to other software. Klaviyo's MCP server is what sits behind the Claude connector. The same server works with ChatGPT, Cursor and VS Code. Klaviyo first listed it on 25 Jun 2025. The Claude connector joined Anthropic's directory on 22 Jan 2026, and on 11 Aug 2026 Klaviyo added what it called "260+ new MCP tools" covering data, segments, campaigns, flows and product catalogues. (Source: Klaviyo, What's New, entries dated 25 Jun 2025, 22 Jan 2026 and 11 Aug 2026, https://www.klaviyo.com/whats-new)

## What is Composer?

Composer is Klaviyo's own AI marketing agent, built into Klaviyo. It used to be called Marketing Agent, which launched on 24 Sep 2025, and Klaviyo now lists that name as replaced. The new Composer went live on 13 Oct 2026. You describe what you want in plain words, and it does one of two kinds of job. It can analyse and audit, for example "Audit my welcome flow and tell me what needs attention", and it returns a list of what to fix and why. Or it can create, drafting a campaign, a flow or a segment from a goal you describe, for you to review. Klaviyo says Composer does not send or publish anything without your sign-off. It works best on emails built in Klaviyo's drag-and-drop editor and less well on templates that are mostly images. (Sources: Klaviyo Help Center, "Getting started with Composer", updated 14 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/getting-started-with-composer ; What's New, 24 Sep 2025 and 13 Oct 2026)

## What does Composer cost?

Every Klaviyo account gets a free Composer plan with 500 credits a cycle, with nothing to sign up for. The paid plan is $20 a month for 2,000 credits. Klaviyo gives estimated ranges, not fixed prices: analysing data costs about $0.35 to $0.90 of credit, and creating a campaign anything from $0.10 to $10.00, depending on how big and complicated the job is. Questions about support or general information are free. (Source: Klaviyo Help Center, "How your Composer plan works", updated 14 Oct 2026, https://help.klaviyo.com/hc/en-us/articles/55587298026395)

## Composer or Claude: which should I use?

They do overlapping jobs, and Klaviyo supports both. Composer lives inside Klaviyo, and Klaviyo says it draws on your account's history and its own benchmarks. Claude with the connector lives where the rest of your work is, so it can put Klaviyo data next to your other files, notes and tools. Klaviyo says both can now answer questions about your data by turning a plain question into a database query using Klaviyo's own definitions of terms like revenue. (Source: Klaviyo, What's New page, highlight "Every agent you use, now fluent in your data", no date shown, checked 17 Oct 2026, https://www.klaviyo.com/whats-new) This is our reading, not Klaviyo's: use Composer for jobs that stay inside Klaviyo, and Claude when the answer needs things Klaviyo doesn't hold.
