import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { parseCsv } from "@/lib/csv";
import { STAGES } from "@/lib/stages";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const text = await file.text();
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return NextResponse.json({ error: "CSV has no data rows." }, { status: 400 });
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const phoneCol = header.indexOf("phone");
  const stageCol = header.indexOf("stage");
  const noteCol = header.indexOf("note");

  if (phoneCol === -1 || stageCol === -1) {
    return NextResponse.json(
      { error: 'CSV must have "phone" and "stage" columns.' },
      { status: 400 }
    );
  }

  const stageLookup = new Map(STAGES.map((s) => [s.toLowerCase(), s]));

  await connectDB();

  const updated: string[] = [];
  const notFound: string[] = [];
  const invalidStage: string[] = [];

  for (const row of rows.slice(1)) {
    const phone = row[phoneCol]?.trim();
    const rawStage = row[stageCol]?.trim();
    if (!phone || !rawStage) continue;

    const stage = stageLookup.get(rawStage.toLowerCase());
    if (!stage) {
      invalidStage.push(`${phone} (unrecognized stage "${rawStage}")`);
      continue;
    }

    const lead = await Lead.findOne({ phone });
    if (!lead) {
      notFound.push(phone);
      continue;
    }

    lead.stage = stage;
    lead.stageHistory.push({
      stage,
      note: noteCol !== -1 ? row[noteCol]?.trim() : "Imported via CSV",
      changedBy: session.user?.name ?? undefined,
      at: new Date(),
    });
    await lead.save();
    updated.push(phone);
  }

  return NextResponse.json({ updated, notFound, invalidStage });
}