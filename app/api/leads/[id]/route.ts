import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { STAGES } from "@/lib/stages";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const lead = await Lead.findById(id).lean();
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ lead });
}

// PATCH — move to a new stage (appends to stageHistory), or update fields
// like consumerNumber / subsidyAmount / assignedTo.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { stage, note, ...rest } = body;

  if (stage && !STAGES.includes(stage)) {
    return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
  }

  await connectDB();
  const update: Record<string, unknown> = { ...rest };
  if (stage) update.stage = stage;

  const lead = await Lead.findById(id);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  Object.assign(lead, update);
  if (stage) {
    lead.stageHistory.push({
      stage,
      note,
      changedBy: session.user?.name ?? undefined,
      at: new Date(),
    });
  }
  await lead.save();

  return NextResponse.json({ lead });
}