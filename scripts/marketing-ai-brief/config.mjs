/**
 * Configuration for the weekly marketing-AI brief.
 *
 * The third shape of the same idea. The affiliate engine reads one product's
 * commits to sell it. Build-in-public reads Paul's own repo to teach from it.
 * This one reads a curated set of ON-THEME repos and turns their RELEASES into
 * "what moved in marketing AI this week, and what it means for you", with Paul
 * as the trusted filter.
 *
 * Why releases, not commits: for someone else's repo a raw commit ("refactor:
 * pydantic v2 compat") is noise. A release is already the human-written "here is
 * what is new and why", which is the exact translation layer we want.
 *
 * Per source:
 *   repo       "owner/name"
 *   name       display name
 *   kind       "releases" (product repos) or "commits" (cookbooks/guides that
 *              ship via commits, and Paul's own repo)
 *   localPath  only for a repo we read from a local checkout (Paul's own)
 *   whatItIs   one plain line: what this thing is
 *   whyCare    one line: why the reader (a marketer) should care at all
 */

export const SOURCES = [
  {
    repo: "vercel/ai",
    name: "Vercel AI SDK",
    kind: "releases",
    whatItIs: "the toolkit a lot of AI features in other apps are built on",
    whyCare:
      "when it gains a capability (video, voice, agents), the tools your team uses tend to gain it soon after",
  },
  {
    repo: "PostHog/posthog",
    name: "PostHog",
    kind: "releases",
    whatItIs: "open-source product analytics, experiments and session replay",
    whyCare: "what you can measure, test and watch users actually do",
  },
  {
    repo: "dubinc/dub",
    name: "Dub",
    kind: "releases",
    whatItIs: "open-source link management, short links and click analytics",
    whyCare: "attribution and the humble tracked link, done in the open",
  },
  {
    repo: "anthropics/anthropic-cookbook",
    name: "Anthropic Cookbook",
    kind: "commits",
    whatItIs: "worked recipes for getting real work out of Claude",
    whyCare: "techniques worth knowing for anyone learning to use AI well",
  },
  {
    repo: "runwithfoxes/fox-advantage-site",
    name: "Run with Foxes",
    kind: "commits",
    localPath: ".",
    whatItIs: "our own site and the AI running on it",
    whyCare: "proof we hit the same walls we write about, not just theory",
  },
];

export const BRIEF = {
  title: "The marketing-AI brief",
  audience:
    "marketers and marketing leaders building AI into how their team works",
  channels: ["Substack / the /essays reader", "LinkedIn", "an email to the list"],
  // The bar. Curation is the whole value: a short brief of things that matter
  // beats a long one that pads. A quiet week says so.
  bar: "a marketer could act on, or genuinely should know, next week",
  maxItems: 3,
};
