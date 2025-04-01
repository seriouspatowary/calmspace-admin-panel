import { NextResponse } from "next/server";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET, 
  providers: [], 
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    authorized({ auth, req }) { 
      const isLoggedIn = auth?.user;
      const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return !!isLoggedIn; 
      }

      if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return true; 
    },
  },
};
