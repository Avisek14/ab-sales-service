import { NextRequest, NextResponse } from "next/server";
import { msg91VerifyOtp } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();
  if (!phone || !code) {
    return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
  }

  const valid = await msg91VerifyOtp(phone, code);
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