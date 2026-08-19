import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { msg91SendOtp } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ phone });
  if (!user) {
    return NextResponse.json(
      { authorized: false, error: "You are not an authorized person for this portal." },
      { status: 403 }
    );
  }

  await msg91SendOtp(phone);

  return NextResponse.json({ authorized: true });
}