import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import OtpToken from "@/models/OtpToken";
import { sendOtpSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  await connectDB();

  // Don't reveal whether the phone number exists — same response either way.
  const exists = await Lead.exists({ phone });
  if (exists) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await OtpToken.create({
      phone,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await sendOtpSms(phone, code);
  }

  return NextResponse.json({ ok: true });
}
