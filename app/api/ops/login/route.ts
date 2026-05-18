import { NextResponse, type NextRequest } from "next/server";
import { OPS_COOKIE, makeCookieValue } from "@/lib/ops-auth";

export async function POST(req: NextRequest) {
  const password = process.env.OPS_PASSWORD;
  const secret = process.env.OPS_AUTH_SECRET;
  if (!password || !secret) {
    return NextResponse.json(
      { error: "OPS_PASSWORD and OPS_AUTH_SECRET must be set in .env.local." },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const submitted = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/ops/runs");

  if (submitted !== password) {
    const url = req.nextUrl.clone();
    url.pathname = "/ops/login";
    url.searchParams.set("error", "1");
    if (next) url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const value = await makeCookieValue(secret);
  const url = req.nextUrl.clone();
  url.pathname = next.startsWith("/ops") ? next : "/ops/runs";
  url.search = "";
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(OPS_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
