import { NextRequest, NextResponse } from "next/server";
import { recordSignup } from "@/lib/course-signup-record";

/*
  Course signup capture. The page posts here; this route talks to Klaviyo.

  Server-side on purpose, for three reasons that are all load-bearing:
   - the private key never reaches the browser
   - consent is enforced in one place rather than trusted to the page
   - the interest-versus-member door is decided from the SERVER date, because a
     cached page would happily tell a visitor the course is open when it is not

  The Klaviyo call is two steps and the order matters. The subscribe endpoint
  does not accept profile properties (verified against the live API, 19 Jul: it
  rejects both `properties` and `first_name`), so the profile is upserted with
  its intent properties FIRST and only then added to the list. Adding to the
  list is what triggers a flow, so doing it the other way round would let a live
  welcome fire before the intent data it might reference exists.
*/

/*
  🔴 THIS ROUTE SENDS NO KLAVIYO EVENTS, AND THAT IS DELIBERATE.

  The `onboarding` flow (SyvF2A) does not trigger on any list. It triggers on a
  custom metric named `Joined`, which the Movement signup page sends. That flow
  tells the reader their first module is below. Send a `Joined` event from here
  and every course signup is pointed at a module that does not exist yet.

  Adding people to a list is safe: `GET /lists/U33KxM/flow-triggers/` returns
  zero flows. Sending an event named `Joined` is what is dangerous, which is the
  reverse of what most of the project docs used to warn about.

  If the course ever needs events, give it its OWN metric name (for example
  `Course Signup`), never `Joined`, so the two products cannot collide by
  naming accident.
*/

const LIST_ID = "U33KxM"; // course-interest
const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

// Mon 21 Sep 2026, 00:00 Europe/Dublin (UTC+1 in September).
const LAUNCH = Date.parse("2026-09-21T00:00:00+01:00");

type Door = "interest" | "member";

function doorFor(now: number): Door {
  return now >= LAUNCH ? "member" : "interest";
}

// Deliberately permissive. This catches the typo and the empty box; it is not
// trying to be RFC 5322. Klaviyo is the real validator and rejects what it will.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function headers(key: string, write: boolean) {
  const h: Record<string, string> = {
    Authorization: `Klaviyo-API-Key ${key}`,
    revision: REVISION,
    accept: "application/vnd.api+json",
  };
  if (write) h["content-type"] = "application/vnd.api+json";
  return h;
}

/* Has this person signed up before, and did they already record an intent?
   First touch is the true one: if someone came in through "Make the ads" and
   later clicks another card, module 4 is still what pulled them in. Returns
   null when we cannot tell, and the caller treats that as a new signup. */
async function existingProfile(key: string, email: string) {
  const url =
    `${KLAVIYO}/profiles/?filter=` +
    encodeURIComponent(`equals(email,"${email}")`);
  const res = await fetch(url, { headers: headers(key, false) });
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  const hit = body?.data?.[0];
  if (!hit) return null;
  return {
    id: hit.id as string,
    hasIntent: hit.attributes?.properties?.signup_module != null,
  };
}

export async function POST(req: NextRequest) {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) {
    // Missing config is our fault, never the visitor's. Loud in the log, polite
    // on the wire.
    console.error("[course-signup] KLAVIYO_PRIVATE_KEY is not set");
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const firstName = String(body.first_name ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const source = body.signup_source === "card" ? "card" : "hero";
  const moduleRaw = Number(body.signup_module);
  const signupModule =
    Number.isInteger(moduleRaw) && moduleRaw >= 1 && moduleRaw <= 6
      ? moduleRaw
      : null;
  const lands =
    typeof body.signup_module_lands === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(body.signup_module_lands)
      ? body.signup_module_lands
      : null;

  const now = Date.now();
  const door = doorFor(now);
  const stamp = new Date(now).toISOString();

  try {
    const existing = await existingProfile(key, email);
    const firstTouch = !existing?.hasIntent;

    // Step 1: the profile and its intent. Intent properties are written on the
    // first touch only, so a second signup never overwrites what actually
    // pulled the person in. Every touch is appended either way, so a repeat is
    // visible rather than silently lost.
    const properties: Record<string, unknown> = {};
    if (firstTouch) {
      properties.signup_source = source;
      properties.signup_door = door;
      if (signupModule !== null) properties.signup_module = signupModule;
      if (lands !== null) properties.signup_module_lands = lands;
    }

    const importRes = await fetch(`${KLAVIYO}/profile-import/`, {
      method: "POST",
      headers: headers(key, true),
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
            ...(firstName ? { first_name: firstName } : {}),
            ...(Object.keys(properties).length ? { properties } : {}),
          },
        },
      }),
    });

    if (!importRes.ok) {
      const detail = await importRes.text().catch(() => "");
      console.error("[course-signup] profile-import failed", importRes.status, detail);
      await recordSignup({
        ts: stamp, email, first_name: firstName, signup_source: source,
        signup_module: signupModule, signup_module_lands: lands,
        door, klaviyo: "failed",
      });
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }

    const profileId: string | undefined = (await importRes.json().catch(() => null))
      ?.data?.id;

    // A repeat signup gets a touch appended rather than an overwrite.
    if (!firstTouch && profileId) {
      const touch = `${stamp.slice(0, 10)} ${source}${
        signupModule !== null ? `:${signupModule}` : ""
      }`;
      await fetch(`${KLAVIYO}/profiles/${profileId}/`, {
        method: "PATCH",
        headers: headers(key, true),
        body: JSON.stringify({
          data: {
            type: "profile",
            id: profileId,
            attributes: {},
            meta: { patch_properties: { append: { signup_touches: touch } } },
          },
        }),
      }).catch((err) =>
        // A lost touch record is not worth failing a signup over.
        console.error("[course-signup] touch append failed", err)
      );
    }

    // Step 2: consent and the list. The list is single opt-in, so this
    // subscribes outright rather than sending a confirmation request.
    const subRes = await fetch(`${KLAVIYO}/profile-subscription-bulk-create-jobs/`, {
      method: "POST",
      headers: headers(key, true),
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: `course signup (${source})`,
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: { list: { data: { type: "list", id: LIST_ID } } },
        },
      }),
    });

    // This endpoint is a job: it answers 202, not 200.
    if (!subRes.ok) {
      const detail = await subRes.text().catch(() => "");
      console.error("[course-signup] subscribe failed", subRes.status, detail);
      await recordSignup({
        ts: stamp, email, first_name: firstName, signup_source: source,
        signup_module: signupModule, signup_module_lands: lands,
        door, klaviyo: "failed",
      });
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }

    await recordSignup({
      ts: stamp, email, first_name: firstName, signup_source: source,
      signup_module: signupModule, signup_module_lands: lands,
      door, klaviyo: "ok",
    });

    // Someone who submits twice, or refreshes mid-submit, has done nothing
    // wrong. Both land here as a success with `already` set, not as an error.
    return NextResponse.json({ ok: true, door, already: !!existing });
  } catch (err) {
    console.error("[course-signup] unexpected failure", err);
    await recordSignup({
      ts: stamp, email, first_name: firstName, signup_source: source,
      signup_module: signupModule, signup_module_lands: lands,
      door, klaviyo: "failed",
    }).catch(() => {});
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

// A bare GET is someone poking the URL in a browser. Say so plainly.
export async function GET() {
  return NextResponse.json({ ok: false, error: "post only" }, { status: 405 });
}
