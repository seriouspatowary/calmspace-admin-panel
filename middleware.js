import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("session_token")?.value;
  const url = req.nextUrl.clone(); // Clone the request URL

  if (token) {
    const isValid = await verifyJWT(token);
    if (isValid) {
      // If user is logged in and tries to access /login, redirect to /dashboard
      if (url.pathname === "/login") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  // If no token and user tries to access a protected route, redirect to login
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/profile/:path*"], // Include /login route
};
