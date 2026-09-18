import { NextRequest, NextResponse } from "next/server";
import { IDENTITY_COOKIE } from "../course-event/route";

/*
  THE EMAIL-LINK LOGIN, 18 Sep 2026.

  Paul's course emails link here as /api/course-in?k={{ person.KlaviyoID }}&n=1. The 968
  people who registered before launch signed up on the live form, which never set the
  identity cookie, so without this every one of them would click Monday's email and land
  on a form asking for the address we have just emailed them at.

  ⭐ HOW IT KNOWS WHO YOU ARE. `k` is the person's Klaviyo profile id, a random 26-character
  id nobody can guess or work out from an email address. We look it up in Klaviyo, read the
  email off the profile, and set the same cookie the door sets. Nothing in the link is the
  email itself, so a forwarded or shared link does not hand anyone a way to type in someone
  else's address.

  ⚠️ A FORWARDED EMAIL DOES CARRY THE LINK. Whoever clicks it is recorded as the person it
  was sent to. That is the same trade every "click to view in browser" link makes, and it is
  acceptable here because the door is not a lock (Paul, 3 Aug: "i also don't mind people
  accessing these"). The cost is a mis-named row in the record, never a leak.

  ⛔ IT NEVER FAILS IN FRONT OF THE READER. A missing id, an unknown id, Klaviyo down: all
  of them send the person to the module anyway, where the door asks for an email. The worst
  case is the old behaviour, never an error page.
*/

const KLAVIYO = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

/** Klaviyo profile ids are 26 upper-case letters and digits. Older accounts can hold 6-character
    ids; checked 18 Sep 2026, all 978 on the course list are 26, and a 6-character id is far
    easier to guess, so those go to the door rather than being looked up. */
const PROFILE_ID = /^[0-9A-Z]{26}$/;

function target(req: NextRequest, n: number | null): URL {
  return new URL(n ? `/course/${n}` : "/course", req.url);
}

export async function GET(req: NextRequest) {
  const k = req.nextUrl.searchParams.get("k")?.trim() ?? "";
  const nRaw = Number(req.nextUrl.searchParams.get("n"));
  const n = Number.isInteger(nRaw) && nRaw >= 1 && nRaw <= 6 ? nRaw : null;

  /* Already known in this browser: nothing to look up. */
  if (req.cookies.get(IDENTITY_COOKIE)?.value?.includes("@")) {
    return NextResponse.redirect(target(req, n));
  }

  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key || !PROFILE_ID.test(k)) {
    return NextResponse.redirect(target(req, n));
  }

  let email = "";
  try {
    const res = await fetch(`${KLAVIYO}/profiles/${k}/?fields[profile]=email`, {
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: REVISION,
        accept: "application/json",
      },
      cache: "no-store",
    });
    if (res.ok) {
      const body = (await res.json()) as { data?: { attributes?: { email?: string } } };
      email = (body.data?.attributes?.email ?? "").trim().toLowerCase();
    } else {
      console.warn("[course-in] profile lookup", res.status, k);
    }
  } catch (err) {
    console.error("[course-in] profile lookup failed", err);
  }

  const out = NextResponse.redirect(target(req, n));
  if (email.includes("@")) {
    /* Same cookie, same settings as the door (api/course-signup). */
    out.cookies.set({
      name: IDENTITY_COOKIE,
      value: email,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return out;
}
