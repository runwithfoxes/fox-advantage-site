import type { Metadata } from "next";
import { checkAuth } from "./actions";
import ZorroDoor from "./ZorroDoor";
import ZorroPage from "./ZorroPage";
import "./zorro.css";

export const metadata: Metadata = {
  title: "Gimnasio Zorro \\ Run with Foxes",
  description: "The student page for the UCD x IE week, September 2026.",
  robots: { index: false, follow: false },
};

/* /zorro. Password-gated on the server, so nothing behind the door is in the page source.
   In development the door is skipped, the same way the course modules do it, so the page
   can be reviewed without typing the password every time. Add ?door to see the door. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dev = process.env.NODE_ENV === "development" && sp.door === undefined;
  const authed = dev || (await checkAuth());
  if (!authed) return <ZorroDoor />;
  return <ZorroPage />;
}
