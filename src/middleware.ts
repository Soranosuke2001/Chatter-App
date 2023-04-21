import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Managing route protection
  const isAuth = await getToken({ req });
  const isLoginPage = pathname.startsWith("/login");

  const sensitiveRoutes = ["/dashboard"];
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

    // If the user is trying to access the '/login' route
  if (isLoginPage) {

    // If the user is already logged in, redirect them to the dashboard
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If the user is not logged in, let them access the '/login' route
    return NextResponse.next();
  }

    // If the user is not logged in and is trying to access a sensitive route, redirect them to the '/login' route
  if (!isAuth && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

    // If the user is logged in and is trying to access the '/' route, redirect them to the '/login' route
  if (pathname === '/') {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}, {
    // This is required to prevent the middleware from looping infinitely
    callbacks: {
        async authorized() {
            return true
        }
    }
});

// Determines which route will trigger this specific middleware
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
