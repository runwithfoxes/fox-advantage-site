# Kite Insurance: data notes

> ⚠️ **Kite is a fictional brand, invented for this course.** Every number in the campaign
> file is made up, and the file has the problems real files have. None of it is research
> about the insurance market, and none of it should be repeated anywhere as fact.

These notes travel with `campaigns-2025.csv` and `policies-monthly-2025.csv`. Read them
before you total anything.

## What the files are

`campaigns-2025.csv` is Kite's paid acquisition results for 2025, one row per channel per
week, as the ad platforms report them. It covers paid channels only. Policies that arrive
direct, through word of mouth or through renewals moving across from another insurer's book
are not in this file, so its column totals are not Kite's year.

`policies-monthly-2025.csv` is the policy system speaking: policies actually opened each
month, from every source. It is the number the campaign file's claims can be checked
against.

## Columns

- **week_starting.** The Monday of the week the spend ran. All dates are 2025.
- **channel.** One of brand-search, price-comparison, social, radio, podcast-sponsorship.
  Radio does not run all year: it buys bursts.
- **segment_focus.** The customer type the activity was planned against. Kite plans against
  three: Payers, who tend to renew without shopping around; Switchers, who shop around every
  year; and Jugglers, who hold several policies in one household. "All" means the activity
  was not aimed at one type. This column records planning intent, not measurement. The file
  does not know who actually saw anything.
- **spend_eur.** What the week cost, media only. Production, the podcast contract's fixed
  fee and agency time are not in it.
- **quotes_started.** People who began a quote that the platform credited to the channel.
  Each platform counts its own credit, so the same person can appear under two channels.
- **new_policies.** Policies opened that the platform credited to the channel, same warning
  as above.

## Changelog, 2025

- **6 January.** File starts. Weekly exports from the media dashboard.
- **3 March.** Ardline, the biggest insurer in the market, wrote to all of its customers
  with an average 9% price increase, and the story was in the papers and on morning radio
  for most of a week.
- **7 April.** Budget review moved more money into price-comparison for eight weeks, on the
  strength of its cost per policy.
- **16 June.** The podcast player changed its links and the quote tracking from it broke.
  Fixed 4 July.
- **30 June.** The export job was rebuilt when the dashboard changed its login. Exports
  resumed in July.
- **1 September.** Second radio burst booked, same weight as spring.

## For whoever analyses this file

1. Check the file before you believe it. Exports are made by software and software has bad
   weeks.
2. A cost per policy is an answer to one question, not to every question. Ask what job each
   channel was bought to do before you rank them on one number.
3. If a week looks unusual, look for the reason outside the file before crediting the
   channel. The changelog above is where Kite's year is written down.
