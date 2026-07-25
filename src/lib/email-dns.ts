import { resolveMx, resolve4, resolve6 } from "node:dns/promises";

/*
  ⭐ THE DOMAIN CHECK FLAGS. IT MUST NEVER REJECT. Same rule as the name check in
  the signup route, for the same reason, and it is worth saying why it is not
  tempting to break it here.

  Three addresses on the course list on 25 Jul could not receive mail at all:
  `gmail.con`, `yahoo.comm` and `temarketig.ie`. Two were caught only because a
  human read the list. Tanya at `temarketig.ie` signed up on 22 Jul, bounced 27
  seconds later, and sat there for three days looking exactly like a successful
  registration - which is the failure `course_status.py` exists to catch and
  could not see, because the bounce was outside its 40-profile sample.

  A typo'd address IS something the visitor could fix, unlike a rejected name, so
  rejecting is more defensible here than it is there. It is still not what this
  does. The rejection cost is unchanged - a real person turned away at the form
  is gone - and DNS is not a good enough oracle to spend that on: a domain can
  fail to resolve because the resolver blipped, because it is new, or because the
  network is having a moment. So this only reports, and a human decides. The
  place to catch a typo while the person can still fix it is an inline "did you
  mean gmail.com?" on the page, which is a UX change and is not this.

  DEFINITIVE-NEGATIVE-ONLY. `looksUndeliverable` returns true ONLY when DNS
  positively answers "this domain has no mail route": no MX, and no A or AAAA
  either, because RFC 5321 §5.1 lets a bare address record accept mail and
  several small Irish business domains on this list do exactly that. Any timeout,
  SERVFAIL, refusal or unexpected error returns false. Not knowing must always
  read as fine.
*/

const MX_TIMEOUT_MS = 2000;
const DOMAIN_TTL_MS = 10 * 60 * 1000;
const domainCache = new Map<string, { noMail: boolean; at: number }>();

function codeOf(err: unknown): string | undefined {
  return (err as { code?: string } | null)?.code;
}

/*
  ⭐ ENOTFOUND AND ENODATA ARE NOT THE SAME ANSWER, AND THE DIFFERENCE IS THE
  WHOLE FUNCTION. Getting this wrong is what made the first version both slow
  and wrong - it asked for A and AAAA even after the MX query had already said
  the name does not exist, which took 2-4 seconds per bogus domain, blew the
  timeout, and returned "fine" for all three addresses that had actually bounced.

   - ENOTFOUND is NXDOMAIN: the NAME does not exist, for any record type
     (RFC 2308 §2). There is nothing to fall back to, so answer immediately.
     This is the common bad case - `gmail.con`, `yahoo.comm` - and it is now a
     single query of about 30ms.
   - ENODATA means the name DOES exist but has no MX. RFC 5321 §5.1 says a mail
     sender then falls back to the address record, so we must check A/AAAA
     before condemning it. Several small Irish business domains rely on this.
   - Anything else (ETIMEOUT, ESERVFAIL, EREFUSED) is not an answer at all.
*/
export async function hasNoMailRoute(domain: string): Promise<boolean> {
  try {
    const mx = await resolveMx(domain);
    // A single "." target is the RFC 7505 null MX: explicitly accepts no mail.
    if (mx.length > 0) return mx.every((r) => r.exchange.trim() === ".");
    // An empty answer is ENODATA in disguise; fall through to the A/AAAA check.
  } catch (err) {
    const code = codeOf(err);
    if (code === "ENOTFOUND") return true; // NXDOMAIN, nothing can live here
    if (code !== "ENODATA") return false; // resolver trouble, not a verdict
  }

  // ENODATA only: the name exists but has no MX. RFC 5321 implicit MX applies.
  const [v4, v6] = await Promise.allSettled([resolve4(domain), resolve6(domain)]);
  for (const r of [v4, v6]) {
    if (r.status === "fulfilled" && r.value.length > 0) return false;
    if (r.status === "rejected") {
      const code = codeOf(r.reason);
      // Same rule as above: only a definitive "nothing here" may count against
      // the domain. A resolver problem must read as fine.
      if (code !== "ENOTFOUND" && code !== "ENODATA") return false;
    }
  }
  return true;
}

/* Never throws, never blocks for long, never reports a maybe as a no. */
export async function looksUndeliverable(email: string): Promise<boolean> {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  if (!domain) return false;

  const hit = domainCache.get(domain);
  if (hit && Date.now() - hit.at < DOMAIN_TTL_MS) return hit.noMail;

  const TIMED_OUT = Symbol("timed-out");
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const outcome = await Promise.race([
      hasNoMailRoute(domain),
      new Promise<typeof TIMED_OUT>((resolve) => {
        timer = setTimeout(() => resolve(TIMED_OUT), MX_TIMEOUT_MS);
      }),
    ]);
    // A timeout is not an answer: do not cache it, and do not act on it.
    if (outcome === TIMED_OUT) return false;
    domainCache.set(domain, { noMail: outcome, at: Date.now() });
    return outcome;
  } catch {
    return false;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
