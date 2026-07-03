import { NextResponse } from "next/server";

// City member counts for the /training page. Reads profiles from Klaviyo with the
// private key (server-side only) and counts by the "city" custom property. The list
// is small (free tier caps at 250 profiles) so a full paginated read is fine; cached
// for 5 minutes at the edge.

const CITIES = ["Dublin", "Cork", "Galway", "Limerick", "Belfast"];
const THRESHOLD = 100;
const REVISION = "2026-04-15";

export async function GET() {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) {
    return NextResponse.json({ counts: null, threshold: THRESHOLD });
  }
  try {
    const counts: Record<string, number> = Object.fromEntries(CITIES.map((c) => [c, 0]));
    let url: string | null = "https://a.klaviyo.com/api/profiles/?page[size]=100";
    let pages = 0;
    while (url && pages < 20) {
      const res: Response = await fetch(url, {
        headers: {
          Authorization: `Klaviyo-API-Key ${key}`,
          revision: REVISION,
          accept: "application/vnd.api+json",
        },
        next: { revalidate: 300 },
      });
      if (!res.ok) throw new Error(`klaviyo ${res.status}`);
      const body = await res.json();
      for (const p of body.data ?? []) {
        const city = p?.attributes?.properties?.city;
        if (typeof city === "string" && city in counts) counts[city] += 1;
      }
      url = body?.links?.next ?? null;
      pages += 1;
    }
    return NextResponse.json(
      { counts, threshold: THRESHOLD },
      { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ counts: null, threshold: THRESHOLD });
  }
}
