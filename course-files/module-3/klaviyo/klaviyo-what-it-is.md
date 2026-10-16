Use this file to explain to your Claude what Klaviyo is and how it is organised. Last checked against the sources on 19 Jul 2026 (the latest source date); edited 15 Oct 2026. Klaviyo changes, so check its current documentation before relying on any detail here.

## What Klaviyo is

Klaviyo is a tool for sending email and SMS to your customers and sign-ups, and for working out who should get what. Most brands use it for two kinds of sending. One is a message that goes out automatically when a person does something, such as signing up or leaving a basket. The other is a one-off message sent to a group on a day you choose.

The tool keeps a record of every person and every action they take. That record is what lets it send the right message at the right time. Everything below is a part of that record or a way of using it.

## Profiles

A profile is one person. It holds their email address, their name and any other facts you store about them, such as a city or where they signed up. These extra facts are called properties. You can make up your own.

A profile also holds consent. This is whether the person has agreed to receive email or SMS. Consent matters because Klaviyo should only send marketing to people who have said yes.

## Lists

A list is a fixed group of profiles that you add people to, usually through a sign-up form. A list has an opt-in setting. Single opt-in means a person is on the list as soon as they sign up. Double opt-in means Klaviyo first sends them a "confirm your subscription" email and only adds them when they click.

Double opt-in gives better sender reputation and proof of consent. It also loses an estimated 10 to 30 percent of sign-ups at the confirm step (that range comes from one team's experience, not a Klaviyo figure). Single opt-in is smoother. Choose on purpose, because the default is double.

## Segments

A segment is a group that Klaviyo builds from rules and keeps up to date. A rule might be "placed an order at least once" or "has clicked an email in the last 90 days". People move in and out as their behaviour changes. A list is a group you fill. A segment is a group the rules fill.

## Events and metrics

An event is a thing that happened to a person at a moment in time, such as Placed Order, Started Checkout, Viewed Product or Added to Cart. A metric is the name for a kind of event. Each event is tied to a profile and can carry extra detail, called event properties, such as which product was in the basket.

Online shops connected to Klaviyo send these events in automatically. For anything else you can send your own custom events from your own systems. A custom metric appears in the account the first time an event with that name arrives.

Klaviyo also records its own events about email, such as Received Email.

## Flows

A flow is an automatic sequence. It starts with a trigger, then runs through steps in order. The steps can be a time delay, a split that sends people down different paths, and an email or SMS.

The trigger is the thing that puts a person into the flow. It can be joining a list, a metric (such as Started Checkout), or a catalogue change such as a price drop.

Three kinds of check are worth knowing apart. A trigger split is checked once, when the person enters. A conditional split is checked part way through the flow. A flow filter is checked all the time and removes anyone who no longer qualifies.

Every flow email has a setting often called smart sending. In the interface it can read "Skip recently emailed profiles". It skips people who were emailed recently (one source gives the window as 16 hours). It is on by default. It protects people from too many emails, and it can also stop an email you wanted to send.

## Campaigns

A campaign is a one-off send to a list or segment. You pick the audience, attach a template, and send it now or schedule it. Once a campaign has been sent it cannot be deleted. It stays as a permanent record.

## Templates

A template is the design and content of an email. Templates can be built in the visual editor or written as code, with raw HTML.

A template does not hold the subject line. The subject line lives on the campaign message or the flow email.

When you attach a template to a flow email, the flow keeps its own copy. Changing the original later does not change what the flow sends.

## Reading the numbers

Klaviyo credits revenue to emails and SMS using an attribution window. The default counts opens and clicks within 5 days. Revenue it reports this way is attributed, which means it was near an email. It does not prove the email caused the sale. The lifecycle knowledge file explains the difference and why opens are no longer a reliable signal.

## Cost

Klaviyo bills on all active profiles, not only the ones you mail (a 2025 change, as of the July 2026 sources). A list full of people who never engage costs money. A free tier existed as of 3 Jul 2026, with a small profile limit and a monthly send limit, and it included the full API. Check current pricing before you quote it.
