import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If on admin login page but already authenticated as admin
    if (pathname === "/admin/login" && token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // If on admin route but not admin
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (!token || token.role !== "ADMIN") {
        const loginUrl = new URL("/admin/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle auth
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
