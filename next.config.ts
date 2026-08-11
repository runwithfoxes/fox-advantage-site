import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The gated audit PDFs live in content/for/, NOT public/, so they cannot
     be fetched without the page password. fs.readFile is invisible to
     Next's dependency tracing, so without this line the file is missing
     from the serverless bundle on Vercel and the route 404s in production
     while working locally. */
  outputFileTracingIncludes: {
    "/for/[slug]/audit": ["./content/for/**"],
    "/for/[slug]/pdf": ["./content/for/**"],
  },
  async rewrites() {
    return [
      /* Campaign entry paths for /course. A rewrite, not a redirect, so the
         address stays as sent and Web Analytics records the entry path as its
         own page. That is how a visit is attributed to a campaign: Vercel does
         not capture UTM parameters outside the Plus add-on, and a query string
         in a one-to-one LinkedIn message reads as marketing automation.
         /li = Jo's HeyReach campaign, /fb = the Meta ads for the free course.
         Add one line per channel. */
      {
        source: "/course/li",
        destination: "/course",
      },
      {
        source: "/course/fb",
        destination: "/course",
      },

      /* De-iframed pages. Each of these was a Next route whose entire body was
         an <iframe> pointing at a static file. Crawlers and AI engines read the
         outer document, so the sitemap advertised a URL serving zero words
         while the real content sat at a second URL nothing linked to. Serving
         the file at the pretty path gives one URL with the words in it. Each
         static file carries rel="canonical" back to the path named here,
         because the file stays directly reachable at its own URL too.
         ⚠️ Before adding one: every asset, link and fetch target in the file
         must be ROOT ABSOLUTE. The file gets served from a path it does not sit
         at, so anything relative resolves against the pretty path and 404s
         silently while a word count still passes clean. */
      {
        source: "/info",
        destination: "/info/index.html",
      },
      {
        source: "/training",
        destination: "/training-app/index.html",
      },
      {
        source: "/productivity",
        destination: "/productivity-app/index.html",
      },

      /* Static article pages. Same mechanism, but these never had a Next route. */
      {
        source: "/distinctive",
        destination: "/distinctive/index.html",
      },
      {
        source: "/broad-lake",
        destination: "/broad-lake/index.html",
      },
      {
        source: "/bellinter",
        destination: "/bellinter/index.html",
      },
      {
        source: "/ucd",
        destination: "/ucd/index.html",
      },
      {
        source: "/prep",
        destination: "https://ucd-prep.vercel.app/",
      },
      {
        source: "/april",
        destination: "https://april-page.vercel.app/",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/clients",
        destination: "https://clients.runwithfoxes.com",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
