import { NextRequest, NextResponse } from "next/server";

// Gate private static assets so they can only be fetched with the matching auth
// cookie (set after the password is entered). The page routes render their own gate.
//  - SoftCo media:        softco_auth
//  - Presentation app:    presentation_auth  (the "AI at Sabre" working session)
//  - Ardán proposal:      ardan_auth  (static proposal assets under /proposals/ardan)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/clients/softco/media")) {
    if (req.cookies.get("softco_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/presentation-app")) {
    if (req.cookies.get("presentation_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  // Gate the static proposal assets (the /proposals/ardan page renders its own
  // password gate; this protects the index.html + demos + images it iframes in).
  if (pathname.startsWith("/proposals/ardan/")) {
    if (req.cookies.get("ardan_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/clients/softco/media/:path*",
    "/presentation-app/:path*",
    "/proposals/ardan/:path*",
  ],
};
