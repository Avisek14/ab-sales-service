import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

// POST /api/leads — public: the Contact/Inquiry form on the website submits here.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, address, area, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  await connectDB();
  const lead = await Lead.create({
    name,
    phone,
    address,
    area,
    source: "Contact form",
    stage: "Inquiry",
    stageHistory: [{ stage: "Inquiry", note: message || "New inquiry via website" }],
  });

  return NextResponse.json({ id: lead._id }, { status: 201 });
}

// GET /api/leads — team only: dashboard list, optionally filtered by stage/area.
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");
  const area = searchParams.get("area");

  const filter: Record<string, string> = {};
  if (stage) filter.stage = stage;
  if (area) filter.area = area;

  const leads = await Lead.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ leads });
}
