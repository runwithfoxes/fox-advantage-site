import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ⭐⭐ THE MODULE FILES SHIP WITH THE SERVERLESS FUNCTION, NOT AS STATIC ASSETS.
     `course-files/` is outside `public/` on purpose, so that the only way to read one is
     through `api/course-file`, which checks the course cookie. Nothing imports these files,
     so Next's tracer cannot see them and would leave them out of the deployment: the route
     would work locally and 404 every document in production. Naming them here is what puts
     them in the bundle.
     ⚠️ THE PATH IS RELATIVE TO THE PROJECT ROOT and the glob must keep matching if a
     module 3 folder appears beside module-2. */
  outputFileTracingIncludes: {
    "/api/course-file/[...path]": ["./course-files/**/*"],
  },
  async rewrites() {
    return [
      /* Campaign entry paths for /course. A rewrite, not a redirect, so the
         address stays as sent and Web Analytics records the entry path as its
         own page. That is how a visit is attributed to a campaign: Vercel does
         not capture UTM parameters outside the Plus add-on, and a query string
         in a one-to-one LinkedIn message reads as marketing automation.
         /li = Jo's HeyReach campaign. Add one line per channel. */
      {
        source: "/course/li",
        destination: "/course",
      },
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
