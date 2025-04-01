import { withAuth } from "next-auth/middleware";
import { authConfig } from "./app/authconfig";

export default withAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware only to `/dashboard`
};
