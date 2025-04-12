import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("session_token");
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL));
}