import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import PortalStats from "@/models/PortalStats";
import * as XLSX from "xlsx";

const NOT_YET_INSTALLED = new Set(["Upload Agreement (Pending)", "Installation (Pending)"]);
const FULLY_COMPLETED = "Subsidy Disbursal (Disbursed)";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  if (rows.length === 0) {
    return NextResponse.json({ error: "No rows found in the sheet." }, { status: 400 });
  }

  const statusKey = Object.keys(rows[0]).find((k) => k.trim().toLowerCase() === "status");
  if (!statusKey) {
    return NextResponse.json(
      { error: 'Could not find a "Status" column in the sheet.' },
      { status: 400 }
    );
  }

  let totalInstallations = 0;
  let totalCompleted = 0;

  for (const row of rows) {
    const status = String(row[statusKey] ?? "").trim();
    if (!NOT_YET_INSTALLED.has(status)) totalInstallations++;
    if (status === FULLY_COMPLETED) totalCompleted++;
  }

  await connectDB();
  await PortalStats.findOneAndUpdate(
    {},
    {
      totalCustomers: rows.length,
      totalInstallations,
      totalCompleted,
      uploadedBy: session.user?.name,
    },
    { upsert: true }
  );

  return NextResponse.json({
    totalCustomers: rows.length,
    totalInstallations,
    totalCompleted,
  });
}