import { NextRequest, NextResponse } from "next/server";

// Gate the SoftCo media files: they may only be fetched with the softco_auth cookie
// (set after the password is entered). The page route itself renders its own gate.
export function middleware(req: NextRequest) {
  const authed = req.cookies.get("softco_auth")?.value === "1";
  if (!authed) {
    return new NextResponse("Not authorised", { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/clients/softco/media/:path*"],
};
