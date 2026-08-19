import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { msg91SendOtp } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  await connectDB();

  // Don't reveal whether the phone number exists — same response either way.
  const exists = await Lead.exists({ phone });
  if (exists) {
    await msg91SendOtp(phone);
  }

  return NextResponse.json({ ok: true });
}