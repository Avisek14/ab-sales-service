import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import OtpToken from "@/models/OtpToken";
import { sendOtpSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ phone });
  if (!user) {
    // Unlike the customer flow, team login explicitly tells the caller
    // they're not on the authorized list — this is an internal tool,
    // not a public signup surface.
    return NextResponse.json(
      { authorized: false, error: "You are not an authorized person for this portal." },
      { status: 403 }
    );
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpToken.create({
    phone,
    code,
    purpose: "team",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });
  await sendOtpSms(phone, code);

  return NextResponse.json({ authorized: true });
}
