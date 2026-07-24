import type { MetadataRoute } from "next";

const BASE = "https://runwithfoxes.com";

/* Disallow keeps gated and client confidential work out of search results.
   It is not security: those pages are protected by their own password gate.
   This only stops them being listed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/clients/",
        "/proposals/",
        "/retail-media",
        "/presentation",
        "/chief",
      ],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
