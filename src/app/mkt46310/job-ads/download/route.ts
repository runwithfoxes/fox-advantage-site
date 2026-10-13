import { cookies } from "next/headers";
import data from "../jobAds.json";

/* The 85 job ads as a CSV file, behind the same door as the module page. */

const WORK = [
  "Reporting on results", "Content and copywriting", "Social media, unpaid", "Website and CMS",
  "Paid advertising, any kind", "Email", "SEO", "Paid social", "Managing agencies or suppliers",
  "Paid search", "Photo and video", "CRM and automation", "Testing and conversion", "Web analytics",
  "Ecommerce", "Holding a budget",
];

const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET() {
  const c = await cookies();
  if (process.env.NODE_ENV !== "development" && c.get("mkt46310_auth")?.value !== "1") {
    return new Response("Open the module page and enter the password first.", { status: 401 });
  }
  const head = ["Ad", "Job title", "Who posted it", "Posted", "Level", "Fewest years asked", "Pay, as the ad gives it",
    ...WORK, "Tools named", "Asks for AI", "The ad, in the employer's words"];
  const lines = [head.map(cell).join(",")];
  data.ads.forEach((a, i) => {
    lines.push([i + 1, a.title, a.employer, a.posted, a.level, a.years, a.pay,
      ...WORK.map((w) => (a.work.includes(w) ? "yes" : "")), a.tools, a.ai === "none" ? "" : "yes", a.text].map(cell).join(","));
  });
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="85-irish-digital-marketing-job-ads.csv"',
      "X-Robots-Tag": "noindex",
    },
  });
}
