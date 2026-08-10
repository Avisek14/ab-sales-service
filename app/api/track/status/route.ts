import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export async function GET(req: NextRequest) {
  const phone = req.cookies.get("track_phone")?.value;
  if (!phone) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  await connectDB();
  const leads = await Lead.find({ phone }).sort({ updatedAt: -1 }).lean();

  return NextResponse.json({ leads });
}
