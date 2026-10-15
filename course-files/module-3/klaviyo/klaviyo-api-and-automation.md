Use this file to teach your Claude how Klaviyo is driven from outside through its API, so it can build and run lifecycle work for you. Last checked against the sources on 19 Jul 2026 (the latest source date); live tests in the sources ran on 2 to 4 Jul and 19 Jul 2026. Klaviyo's API changes by dated revision, so check current docs before you build.

## The basics

The API root is https://a.klaviyo.com/api. Each request carries an Authorization header in the form "Klaviyo-API-Key" followed by a private key, and a revision header holding a date. Bodies use the JSON:API format. The revision date picks which version of the API you get. The sources used 2026-04-15 for most work, 2024-10-15.pre for creating flows, and 2025-01-15 for reading a flow's definition.

Keep the private key on the server. Never put it in a web page or in a file you commit. A separate public key exists for browser-side sign-up forms. The browser-side subscribe call is POST https://a.klaviyo.com/client/subscriptions/ with the public company id as a query parameter. One source wrote that call from the docs and had not tested it, so test it before you rely on it.

The sources used a free account for testing. As of early July 2026 it had a small profile limit and a monthly send limit, and it included the full REST API. Confirm current limits.

## What can be read

Account details, profiles, lists, templates, flows, metrics and events can all be read. A few reading tips from live use.

Ask for subscriptions on purpose. Profile consent comes back empty unless you request it with ?additional-fields[profile]=subscriptions. Without it, consent reads as nothing and looks like a bug.

Read a flow's definition by adding additional-fields[flow]=definition to GET /flows/{id}/. That field was not exposed on revision 2024-10-15 and worked on 2025-01-15.

To see what actually fires when someone joins a list, call GET /lists/{id}/flow-triggers/. It answers the question directly, which is better than guessing from flow status.

Lists with many members come back in pages. Follow the links.next address the API gives you rather than building page parameters yourself.

Metric totals can be read with POST /metric-aggregates/, a read-only query. The sources disagree on how well this worked. One note said the filter shape could not be confirmed and the counts were left empty. A later note says a bounded 30-day query was pinned down, and the live test hit a rate limit. Treat this endpoint with caution, test it on a small query, and treat an empty result as "not wired up", never as zero.

No field in the API says which Klaviyo plan an account is on. To find out whether a paid plan removed Klaviyo's footer branding, you have to look at a delivered email.

## What can be written

Profiles. Create or update with POST /profile-import/. It is idempotent by email, so running it twice does not make duplicates. Upsert the profile with its properties first and add it to a list second, otherwise a welcome email can fire before the data it uses exists.

Subscribing. Use the subscription endpoint (the profile-subscription-bulk-create-jobs route). Adding a profile to a list through /lists/{id}/relationships/profiles/ gives list membership but does not create a subscribe event, so a list-triggered flow never sees it. Always test through the same route real sign-ups use.

Events. Send custom events to tie behaviour to a profile with any properties you like. A metric-triggered flow starts from an event. Sending an event creates the metric if it does not exist yet.

Lists. Create with POST /lists/. Change the opt-in setting with PATCH /lists/{id}/, setting attributes.opt_in_process to single_opt_in or double_opt_in.

Templates. Create with POST /templates/, using editor_type "CODE" and raw HTML. editor_type is valid on create and not on PATCH. Templates have no subject field. Subject lines belong to the flow email or campaign message.

Flows. Create with POST /flows/. Set a flow live with PATCH /flows/{id}/ and a status. Delete with DELETE /flows/{id}/, which returns 204. More on this below.

Campaigns. You can create a campaign, assign a template and send it with campaign-send-jobs. There is no test-send endpoint.

Deleting people. DELETE /profiles/{id}/ returns 405. Use POST /data-privacy-deletion-jobs/ instead. It is an asynchronous job, and in testing the profile was gone by the next call.

## Flows through the API

Flow creation needs a full flow definition. A minimal one is rejected with a 400 error saying triggers is required. The definition holds the triggers, an entry_action_id, and the list of actions with links between them. Read the shape from an existing flow first and copy it. Do not guess.

Errors met in order while learning the shape, and what they meant: definition is required on create; entry_action_id is required; you cannot set an action id on create, so give each action a temporary_id and point entry_action_id at it; a trigger_filter is valid on a metric trigger but not on a list trigger.

A tested flow had a metric trigger, a 24 hour time delay (with timezone "profile") and a send-email action in draft status. Another had an A/B test action, with the main email plus variations and a winner metric of unique clicks. The rules for the A/B action: every nested action needs a temporary_id that is unique across the whole definition; the variations list must hold all arms including the main one, because one item gives a 400; nested actions carry no links.

Klaviyo's schema also names these action types: conditional split, trigger split, multi-branch split and content experiment.

A flow cannot be edited through the API. PATCH on a flow accepts status only and rejects a definition. To change the template, subject, smart sending or trigger you must delete the flow and create it again. Get the definition right at creation.

A flow keeps its own copy of the template you attach, with a different id. You can read that copy, but PATCH on it returns 404. So you cannot edit a live flow's email through the API either. Rebuild.

One source calls the 2024-10-15.pre revision beta and says Klaviyo does not recommend it for production. Another says flow creation is generally available on revision 2026-04-15. The sources do not settle this. Check the current docs for the revision you use.

Set smart sending when you create a flow. It defaults to on and skips people emailed within the last 16 hours (the figure one source gave). The first test works, and every test after it quietly does nothing. For a welcome flow, set smart_sending_enabled to false at creation, because someone who just signed up should always get the reply. Because you cannot patch it, this has to be right the first time. In the interface the control sits on the email action, labelled "Skip recently emailed profiles".

Only a few jobs need a person in the dashboard: changing smart sending on a flow that already exists, and the account's default sender name, which lives in account settings under contact information.

## Sending a real test email

Because there is no test-send endpoint, the sources used this route.

1. Use a list with exactly one member, the person who should get the email.
2. Create a template with the real copy.
3. Create a campaign for that list and assign the template.
4. Send it with campaign-send-jobs.
5. Delete the template afterwards.

A sent campaign cannot be deleted, so name it so nobody can mistake it, for example "FOOTER CHECK, do not schedule". The status Queued without Recipients shows briefly while the audience resolves. Wait for Scheduled, Sending, Sent. Do not send again or the person gets two.

Only a real inbox tells you whether the footer branding is gone, how the sender name is cut off in the inbox list, and whether the greeting shows the name in the case the person typed.

## Rate limits

Klaviyo limits how fast you can call each endpoint. When you go too fast it returns 429 with the code "throttled" and tells you roughly how long to wait (one test said available again in 1 second). Slow down and retry after the wait. Read Klaviyo's rate limit page for the exact limits per endpoint, because the sources do not list them.

## The gotchas, in one place

A flow can report status live and send nothing, ever. In one case a flow identical to a working one was inert, and deleting and rebuilding fixed it. The only evidence a flow works is a real send you have watched arrive, shown by a Received Email event. If nothing arrives within two minutes of a genuine trigger, delete and rebuild instead of debugging for an hour.

A 200 response is not evidence. Read the thing back out of the account.

The events feed lags. A missing event does not prove something did not happen.

Give each product or flow family its own trigger metric name, so two products cannot collide.

Test through the real path. Simulating a trigger with a lower-level call does something slightly different and you end up debugging the wrong thing.

A flow triggered by a custom event (such as a Joined event) does not fire from list membership alone. A sign-up route for such a flow must subscribe the person and send the event.

Metric-triggered flows only take in events sent after the flow went live. People who triggered earlier must trigger again.

The metric used in a flow definition must already exist before you build the flow. Send one test event first to create it.

Do not use a Vercel preview link or a login-protected page to check a result without confirming you got the real page and not a sign-in screen.

## Email build tips from live use

Gmail removes web fonts, so brand typefaces cannot be used in email. Stay with web-safe fonts such as Georgia, Arial, Helvetica, Verdana, Times or the system stack. What makes an email look like marketing is the coloured background, the fixed max-width and the centring. Remove those three and the same words read like a normal typed email. Asking readers to reply helps tell their mail provider the address is wanted. Leave an unmistakable placeholder string, such as [[PLACEHOLDER - REPLACE BEFORE GOING LIVE]], where copy is still missing, because it renders exactly as written in a real inbox, and you can block going live while it is present.

## Letting an AI write the message at send time

One pattern for module 4, from the sources, is to put the thinking outside Klaviyo and use Klaviyo as the sender. An AI tool reads customer behaviour, decides what the moment is, writes the message, and sends a custom event to Klaviyo with the message split into separate fields. One flow, triggered by that event, builds the email from those fields. Klaviyo handles consent, suppression, sending and reporting.

Keep the fixed parts of the email (logo, layout, footer, unsubscribe link, tracking, fallback content) in the Klaviyo template. Pass the changing parts as separate event properties, such as subject, preview text, intro, body, recommendation, button label, button link, image link, a reason code, a confidence score and suppression flags. Do not pass one large block of text.

Separate fields let you check each part on its own, verify the link, swap the image, log the reason, and stop the send when the recommendation is weak. Klaviyo renders event properties in a flow email with {{ event.* }} variables.

The sources flag one open question. If every email is written at send time, you cannot approve each email in advance. The likely answer is to approve the template shell, the decision logic, the field-level checks and sample renders, and to set stop rules for low confidence. Settle that approval rule before anything sends. The initial setup still needs proper plumbing: API access, event naming rules, the template wrapper, consent and suppression, tracking checks, fallback content and permissions.

## Keep your own record

Write each sign-up to your own store as well as to Klaviyo, so a Klaviyo failure can be recovered. Prove it by pointing the route at an invalid key and checking the person is still captured. Clean up every test profile at the end and read the list back to zero.
