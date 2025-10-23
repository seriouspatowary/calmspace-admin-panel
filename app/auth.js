import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// jut check

export const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    
    if (!token) return null;

    const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const { payload } = await jwtVerify(token, secretKey); // ✅ Verifying JWT with `jose`

    return payload; // Contains user details (_id, email, name)
  } catch (err) {
    console.error("Invalid session:", err);
    return null;
  }
};
