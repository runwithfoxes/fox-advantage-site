import { NextRequest, NextResponse } from "next/server";

// Gate private static assets so they can only be fetched with the matching auth
// cookie (set after the password is entered). The page routes render their own gate.
//  - SoftCo media:        softco_auth
//  - Presentation app:    presentation_auth  (the "AI at Sabre" working session)
//  - Ardán proposal:      ardan_auth  (static proposal assets under /proposals/ardan)
//  - ARI proposal:        ari_auth    (static proposal assets under /proposals/ari)
//  - Nova HCM proposal:   nova-hcm_auth (static proposal assets under /proposals/nova-hcm)
//  - WeSwitchU proposal:  weswitchu_auth (static proposal assets under /proposals/weswitchu)
//  - Mervue proposal:     mervue_auth (static proposal assets under /proposals/mervue)
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

  // Gate the static proposal assets (each /proposals/{slug} page renders its own
  // password gate; this protects the index.html + demos + images it iframes in).
  if (pathname.startsWith("/proposals/ardan/")) {
    if (req.cookies.get("ardan_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/kapture/")) {
    if (req.cookies.get("kapture_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/data-intelligence/")) {
    if (req.cookies.get("data-intelligence_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/ari/")) {
    if (req.cookies.get("ari_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/santegic/")) {
    if (req.cookies.get("santegic_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/yellowharbour/")) {
    if (req.cookies.get("yellowharbour_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/supplyit/")) {
    if (req.cookies.get("supplyit_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/lonergan/")) {
    if (req.cookies.get("lonergan_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/nova-hcm/")) {
    if (req.cookies.get("nova-hcm_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/weswitchu/")) {
    if (req.cookies.get("weswitchu_auth")?.value !== "1") {
      return new NextResponse("Not authorised", { status: 401 });
    }
  }

  if (pathname.startsWith("/proposals/mervue/")) {
    if (req.cookies.get("mervue_auth")?.value !== "1") {
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
    "/proposals/kapture/:path*",
    "/proposals/data-intelligence/:path*",
    "/proposals/ari/:path*",
    "/proposals/santegic/:path*",
    "/proposals/yellowharbour/:path*",
    "/proposals/supplyit/:path*",
    "/proposals/lonergan/:path*",
    "/proposals/nova-hcm/:path*",
    "/proposals/weswitchu/:path*",
    "/proposals/mervue/:path*",
  ],
};
