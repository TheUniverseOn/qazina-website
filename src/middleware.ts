import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// On Fly.io (broker OS deployment), redirect non-broker routes to /broker
const BROKER_HOST = "qazina-broker-os.fly.dev";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Only apply redirects on the Fly.io broker deployment
  if (hostname.includes(BROKER_HOST) || hostname.includes("broker")) {
    // Allow broker routes, API routes, and static assets through
    if (
      pathname.startsWith("/broker") ||
      pathname.startsWith("/insured") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon")
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to /broker
    const url = request.nextUrl.clone();
    url.pathname = "/broker";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and internal Next.js paths
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
