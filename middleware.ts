// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const url = request.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
    };

    const path = request.nextUrl.pathname;

  
    if (path.startsWith("/dashboard/lecturerDashboard") && decoded.role !== "lecturer") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (path.startsWith("/dashboard/studentDashboard") && decoded.role !== "student") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
