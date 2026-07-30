import crypto from "crypto";

/*
  META CONVERSIONS API - the course signup event, sent from the SERVER.

  ⭐ WHY THERE IS NO BROWSER PIXEL, AND WHY THERE MUST NOT BE ONE WITHOUT A BANNER.

  runwithfoxes.com carries no tracking cookies at all. Vercel Analytics is
  cookieless, which is the only reason this site has never needed a consent
  banner. A browser pixel (`fbq`) would be the first tracking cookie on the
  domain and under ePrivacy/GDPR it needs PRIOR consent, so it cannot be added
  without building a banner first. It would also be the worse signal: most
  people decline, so the conversion data arrives partial anyway.

  This route already runs server-side, already holds the email, and only ever
  fires for someone who actively submitted the form and subscribed
  (`consent: "SUBSCRIBED"` in the Klaviyo step). That is a far narrower set of
  people than "everyone who loaded the page", which is what a pixel would send.

  ⛔ DO NOT "improve match quality" by adding fbq to the layout. That trades a
  clean legal position for a few points of attribution on a EUR 5/day campaign.
  If a browser pixel is ever genuinely needed, the banner comes FIRST, and
  `eventId` below is already wired so the two sources would dedupe.

  ⛔ THE COOKIES PAGE MUST SAY THIS HAPPENS. `src/app/cookies/page.tsx` carries
  the disclosure. If this file is ever pointed at a new event or a new dataset,
  re-read that page before shipping.
*/

/*
  ⭐ THIS NO-OPS WHEN UNCONFIGURED, ON PURPOSE.

  The code ships before the Meta dataset and token exist. With the env vars
  unset every call returns `skipped` and nothing else changes. That means the
  deploy is safe on its own and the credentials can land later without a second
  code change - but it also means A MISSING ENV VAR LOOKS EXACTLY LIKE A
  WORKING INTEGRATION FROM THE OUTSIDE. The signup still succeeds, the visitor
  still gets the welcome, and no event is ever sent.

  So the return value is not decorative: the caller logs it, and the Vercel log
  line is the only place "we are not actually sending anything" is visible.
  Check Events Manager for a real event before believing this is live.
*/

const GRAPH = "https://graph.facebook.com/v21.0";

/* Meta's standard event for a signup. The Leads objective optimises to this by
   default, which is exactly what the new campaign will be built on.
   `CompleteRegistration` is the other honest choice; do not send both, or one
   signup counts twice and the optimiser learns from a doubled number. */
const EVENT_NAME = "Lead";

/* A slow Meta must never hold up a person's signup response. */
const TIMEOUT_MS = 2500;

export type CapiResult =
  | { status: "sent"; eventId: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

/* Meta wants every identifier lowercased and trimmed before hashing, and an
   unhashed value is silently useless rather than an error - so normalise here,
   in one place, and never inline it at a call site. */
function hash(value: string | undefined | null): string | undefined {
  const v = (value ?? "").trim().toLowerCase();
  if (!v) return undefined;
  return crypto.createHash("sha256").update(v).digest("hex");
}

/*
  ⭐ THE CLICK ID IS THE WHOLE ATTRIBUTION STORY HERE.

  Without a browser pixel there is no `_fbp` cookie, so `fbc` (derived from the
  `fbclid` Meta appends to the ad's landing URL) plus the hashed email is what
  lets Meta tie a signup back to the ad that produced it. Lose the fbclid and
  the event still lands, but it is unattributed and teaches the optimiser
  nothing about which ad worked.

  Format is `fb.<subdomain index>.<timestamp ms>.<fbclid>`. The index counts
  dots in the domain the cookie WOULD have been set on: com=0,
  runwithfoxes.com=1. It is 1 here and would need changing if the ads ever
  pointed at a www or subdomain host.
*/
function toFbc(fbclid: string | undefined, eventTimeMs: number): string | undefined {
  const id = (fbclid ?? "").trim();
  if (!id) return undefined;
  /* Defensive: a query string arrives from the open internet, so anything that
     is not the shape of a click id is dropped rather than forwarded. */
  if (!/^[A-Za-z0-9._-]{6,512}$/.test(id)) return undefined;
  return `fb.1.${eventTimeMs}.${id}`;
}

export async function sendCourseSignupEvent(input: {
  email: string;
  firstName?: string;
  /** raw `fbclid` off the landing URL, when the visitor arrived from an ad */
  fbclid?: string;
  clientIp?: string;
  userAgent?: string;
  /** the page they signed up on, e.g. https://runwithfoxes.com/course/fb */
  sourceUrl?: string;
  /** hero | card | foot - carried through so a creative read can segment later */
  signupSource?: string;
}): Promise<CapiResult> {
  const datasetId = process.env.META_DATASET_ID;
  const token = process.env.META_CAPI_TOKEN;

  if (!datasetId || !token) {
    return { status: "skipped", reason: "META_DATASET_ID or META_CAPI_TOKEN unset" };
  }

  const hashedEmail = hash(input.email);
  if (!hashedEmail) {
    return { status: "skipped", reason: "no email to match on" };
  }

  const nowMs = Date.now();
  const eventTime = Math.floor(nowMs / 1000);

  /*
    Deterministic per person per day rather than random. Two things fall out of
    that and both are wanted: a retry of the same signup dedupes instead of
    double-counting, and if a browser pixel is ever added it can compute the
    same id and Meta will collapse the pair. A repeat signup on a LATER day is
    a genuinely separate event and gets its own id.
  */
  const eventId = crypto
    .createHash("sha256")
    .update(`course-signup:${hashedEmail}:${new Date(nowMs).toISOString().slice(0, 10)}`)
    .digest("hex")
    .slice(0, 32);

  const userData: Record<string, unknown> = { em: [hashedEmail] };

  const hashedFirst = hash(input.firstName);
  if (hashedFirst) userData.fn = [hashedFirst];

  const fbc = toFbc(input.fbclid, nowMs);
  if (fbc) userData.fbc = fbc;

  /* Sent unhashed by Meta's spec - these two are the only fields on the payload
     that are not hashed, which is easy to misread as a mistake. It is not. */
  if (input.clientIp && input.clientIp !== "unknown") {
    userData.client_ip_address = input.clientIp;
  }
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const payload = {
    data: [
      {
        event_name: EVENT_NAME,
        event_time: eventTime,
        event_id: eventId,
        action_source: "website",
        ...(input.sourceUrl ? { event_source_url: input.sourceUrl } : {}),
        user_data: userData,
        custom_data: {
          content_name: "AI Fluency for Ambitious Marketers",
          content_category: "course-interest",
          ...(input.signupSource ? { signup_source: input.signupSource } : {}),
        },
      },
    ],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${GRAPH}/${datasetId}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, access_token: token }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      /* Meta answers 200 with an error body for some failures, so a non-ok here
         is the loud kind. Truncated because the error bodies are enormous. */
      return { status: "failed", reason: `${res.status} ${detail.slice(0, 300)}` };
    }

    /*
      ⚠️ A 200 IS NOT PROOF THE EVENT WAS ACCEPTED FOR OPTIMISATION. Meta
      answers `events_received: 1` for a payload it will later drop on poor
      match quality, and the drop is invisible here. The only honest check is
      Events Manager showing the event with a match quality score against it.
    */
    return { status: "sent", eventId };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { status: "failed", reason };
  } finally {
    clearTimeout(timer);
  }
}
