import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const publicAdminRoutes = ["/admin/login"];

export default auth(async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPublicRoute = publicAdminRoutes.includes(nextUrl.pathname);
  const isLoggedIn = !!request.auth;

  if (isAdminRoute && !isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl.origin));
  }

  if (nextUrl.pathname === "/admin/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"]
};
