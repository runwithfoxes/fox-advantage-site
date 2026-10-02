import { cookies } from "next/headers";

/*
  WHO HAS FULL ACCESS, and who they are. Two cookies, both httpOnly, both a year:

  - `rwf_access=1` says "this browser has given an email". Set by /api/access and by
    /api/course-signup, read by server components to open a download without asking again.
  - `rwf_course_id=<email>` is the course's identity cookie (course-signup, 3 Aug 2026; course-in
    for people arriving from a Klaviyo link). /api/access sets it too since 27 Sep, so a person is
    ONE person whichever door they came in: the course's behaviour events and the resource
    centre's Resource Viewed events land on the same profile.

  Paul, 27 Sep 2026: "if I have registered for the course, do I get access to all these things?
  The answer should be yes." So either cookie opens everything.
*/
export const ACCESS_COOKIE = "rwf_access";
export const IDENTITY_COOKIE = "rwf_course_id";

export async function hasAccess(): Promise<boolean> {
  const c = await cookies();
  return c.get(ACCESS_COOKIE)?.value === "1" || (c.get(IDENTITY_COOKIE)?.value ?? "").includes("@");
}

export async function identityEmail(): Promise<string | null> {
  const c = await cookies();
  const v = c.get(IDENTITY_COOKIE)?.value ?? "";
  return v.includes("@") ? v : null;
}
