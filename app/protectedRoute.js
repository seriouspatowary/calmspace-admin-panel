// protected-route.js (Protect API Route)
import { NextResponse } from "next/server";
import { getSession } from "./auth";

export async function GET() {
  const session = getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Protected Data", user: session });
}