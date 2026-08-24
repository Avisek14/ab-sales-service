import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import PortalStats from "@/models/PortalStats";

export async function GET() {
  await connectDB();

  const [totalLeads, portalStats] = await Promise.all([
    Lead.countDocuments({}),
    PortalStats.findOne({}).lean(),
  ]);

  return NextResponse.json({
    totalLeads,
    totalCustomers: portalStats?.totalCustomers ?? 0,
    totalInstallations: portalStats?.totalInstallations ?? 0,
    totalCompleted: portalStats?.totalCompleted ?? 0,
  });
}