import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLink, getLinkEverything, incrementLinkClicks } from "~~/core/link";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const key = decodeURI(pathname.slice(1));

  const link = await getLink(key);

  if (!link) {
    return NextResponse.redirect(new URL("/oops", request.url));
  }

  incrementLinkClicks(key);

  return NextResponse.redirect(new URL(link));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - emoji (emoji route)
     * - sketchy (sketchy route)
     * - oops (oops route)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|emoji|sketchy|oops).*)",
  ],
};
