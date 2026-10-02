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
    /* ⭐⭐ THE MODULE FILES SHIP WITH THE SERVERLESS FUNCTION, NOT AS STATIC ASSETS.
     `course-files/` is outside `public/` on purpose, so that the only way to read one is
     through `api/course-file`, which checks the course cookie. Nothing imports these files,
     so Next's tracer cannot see them and would leave them out of the deployment: the route
     would work locally and 404 every document in production. Naming them here is what puts
     them in the bundle.
     ⚠️ THE PATH IS RELATIVE TO THE PROJECT ROOT and the glob must keep matching if a
     module 3 folder appears beside module-2. */
    "/api/course-file/[...path]": ["./course-files/**/*"],
    /* The report PDFs and data files, behind the email door (29 Sep 2026). Same reason as above:
       nothing imports them, so without this line the route 404s every file in production. */
    "/api/resource-file/[file]": ["./resource-files/*"],
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
      /* The fox prompt slider, 22 Sep 2026, made for a LinkedIn post about the course.
         A static page from /branded-page, linking to /course/everything. */
      {
        source: "/course/same-prompt",
        destination: "/course/same-prompt/index.html",
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
      /* 29 Sep 2026, launch day. The jobs tracker page still headlines the September count that
         Cato's reviews moved (660 and 47); the report carries the final one (636 and 56). Until the
         tracker page is rebuilt from the report's numbers, the report is where that link goes. */
      {
        source: "/resources/jobs-ai",
        destination: "/resources/the-ai-ask/2026-q3",
        permanent: false,
      },
      /* The reports list page reads as a programme of thirteen with one report in it (29 Sep, Paul:
         "we don't want that right?"). Until there are more, the reports band on the homepage is the
         list. Only the list page itself; the report pages keep their own addresses. */
      { source: "/resources/reports", destination: "/#reports", permanent: false },
      /* Paul, 30 Sep 2026: "I don't want other library pages. We have one library, and one way in." The
         library is /course/everything, where every module already sends people; the way in is the
         library band on the homepage. The resource-centre copy and the test page forward to it. */
      { source: "/resources/library", destination: "/course/everything", permanent: false },
      { source: "/for-library-test", destination: "/course/everything", permanent: false },
      /* Paul, 30 Sep 2026: contact and About are one page; contact is its last section. */
      /* 1 Oct 2026: to the top of the page, not #contact, so the film is seen (Paul). */
      { source: "/contact", destination: "/about", permanent: false },
      /* Held back until Paul signs them off (29 Sep): GEO Ireland and the Ad Audit. Their pages stay
         in the code; these two lines are what keep them off the live site. Remove to release. */
      { source: "/resources/geo-ireland/:path*", destination: "/resources/reports", permanent: false },
      { source: "/resources/the-ad-audit/:path*", destination: "/resources/reports", permanent: false },
      /* The new homepage was built at /home-next. It is the homepage now; the old address follows. */
      {
        source: "/home-next/:path*",
        destination: "/",
        permanent: false,
      },
      { source: "/home-next", destination: "/", permanent: false },
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
