import { NextRequest, NextResponse } from "next/server";
import { msg91VerifyAccessToken } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  const { phone, accessToken } = await req.json();
  if (!phone || !accessToken) {
    return NextResponse.json({ error: "Phone and access token are required." }, { status: 400 });
  }

  const valid = await msg91VerifyAccessToken(accessToken);
  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("track_phone", phone, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}