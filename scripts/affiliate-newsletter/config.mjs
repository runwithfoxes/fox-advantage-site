/**
 * Per-product configuration for the weekly affiliate newsletter workflow.
 *
 * One entry per product. Every Monday the workflow runs once per product,
 * independently, so a bad week for one never blocks the other.
 *
 * Fields:
 *   key         short slug, used for output filenames
 *   name        display name (Title Case, no "AI" per RWF naming rule)
 *   github      "owner/repo" - the source of truth for the week's changes.
 *               Read via the GitHub API when GITHUB_TOKEN is set.
 *   localPath   optional. A local git checkout to read commits from instead
 *               of GitHub. Used for the prototype / offline runs. When set and
 *               --source=local (or no token), commits come from `git log` here.
 *   affiliate   everything the promo assets need to be copy-paste ready:
 *     signupUrl   where a customer converts (affiliates append their code)
 *     dashboardUrl where the affiliate grabs their personal link
 *     audience    one line: who the affiliate is talking to
 *     rate        the affiliate reward, stated plainly (used in the campaign note)
 *   voice       one line of tone guidance for this product's newsletter
 */

export const PRODUCTS = [
  {
    key: "revid",
    name: "Revid",
    github: "revid-ai/revid",
    localPath: null,
    affiliate: {
      signupUrl: "https://www.revid.ai/?via=AFFILIATE_CODE",
      dashboardUrl: "https://revid.getrewardful.com/",
      audience: "creators and marketers who make short-form video at volume",
      rate: "30% recurring",
    },
    voice:
      "practical and fast-moving; creators care about output and time saved, not internals",
  },
  {
    key: "outrank",
    name: "Outrank",
    github: "outrank-so/outrank",
    localPath: null,
    affiliate: {
      signupUrl: "https://www.outrank.so/?via=AFFILIATE_CODE",
      dashboardUrl: "https://outrank.getrewardful.com/",
      audience: "founders and SEO/content teams growing organic traffic",
      rate: "30% recurring",
    },
    voice:
      "outcome-led; the reader wants rankings and traffic, so lead with the job done",
  },
];

/**
 * The prototype product. `npm run` / the demo points here so the workflow is
 * runnable in THIS repo with no external access: it reads this checkout's own
 * commits and drafts a newsletter for "Run with Foxes". Swap --product to run a
 * real one once its repo and token are in place.
 */
export const PROTOTYPE_PRODUCT = {
  key: "runwithfoxes",
  name: "Run with Foxes",
  github: "runwithfoxes/fox-advantage-site",
  localPath: ".", // read this repo's own git history
  affiliate: {
    signupUrl: "https://runwithfoxes.com/book#signup",
    dashboardUrl: "https://runwithfoxes.com/",
    audience: "marketers building AI into how their team works",
    rate: "n/a (prototype)",
  },
  voice:
    "peer-to-peer and optimistic; quality and speed are the two themes; no hype, no em dashes",
};

export function resolveProduct(key) {
  if (!key || key === PROTOTYPE_PRODUCT.key) return PROTOTYPE_PRODUCT;
  const found = PRODUCTS.find((p) => p.key === key);
  if (!found) {
    const known = [PROTOTYPE_PRODUCT.key, ...PRODUCTS.map((p) => p.key)].join(", ");
    throw new Error(`Unknown product "${key}". Known products: ${known}`);
  }
  return found;
}
