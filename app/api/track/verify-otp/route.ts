import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();
  if (!phone || !code) {
    return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
  }

  await connectDB();
  const token = await OtpToken.findOne({ phone, code }).sort({ _id: -1 });
  if (!token || token.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 401 });
  }

  await OtpToken.deleteMany({ phone });

  const res = NextResponse.json({ ok: true });
  // Simple session: httpOnly cookie holding the verified phone number.
  // Good enough for a read-only status view; swap for signed JWT if this
  // needs to carry more trust later.
  res.cookies.set("track_phone", phone, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}
