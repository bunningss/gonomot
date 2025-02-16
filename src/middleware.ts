import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const { error } = await getSession();
  const { pathname } = request.nextUrl;

  // Redirect authenticated users from auth pages
  if (!error) {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/reset-password")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect unauthenticated users to auth pages
  if (error) {
    if (pathname.startsWith("/user") || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
