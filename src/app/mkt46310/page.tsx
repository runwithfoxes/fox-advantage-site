import type { Metadata } from "next";
import { checkAuth } from "./actions";
import ModuleDoor from "./ModuleDoor";
import ModulePage from "./ModulePage";
import "../zorro/zorro.css";
import "./mkt46310.css";

export const metadata: Metadata = {
  title: "AI and Digital Marketing Strategy \\ Run with Foxes",
  description: "The student page for the UCD module MKT46310, autumn 2026.",
  robots: { index: false, follow: false },
};

/* /mkt46310. Password-gated on the server, the same way as /zorro, so nothing behind the
   door is in the page source. In development the door is skipped. Add ?door to see it. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dev = process.env.NODE_ENV === "development" && sp.door === undefined;
  const authed = dev || (await checkAuth());
  if (!authed) return <ModuleDoor />;
  return <ModulePage />;
}
