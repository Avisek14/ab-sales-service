import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import ProgressTimeline from "@/components/ProgressTimeline";
import { recordType, type Stage } from "@/lib/stages";

export default async function TrackStatus() {
  const phone = (await cookies()).get("track_phone")?.value;
  if (!phone) redirect("/track");

  await connectDB();
  const leads = await Lead.find({ phone }).sort({ updatedAt: -1 }).lean();

  if (leads.length === 0) {
    return (
      <section className="mx-auto max-w-md px-6 py-20">
        <p className="text-ink/65">
          We couldn&apos;t find a record for this number yet. If you just
          submitted an inquiry, check back shortly.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Your status
      </p>
      {leads.map((lead) => (
        <div key={String(lead._id)} className="mb-14 last:mb-0">
          <h1 className="font-display text-3xl mb-1">{lead.name}</h1>
          <p className="text-ink/50 text-sm mb-8 capitalize">
            {recordType(lead.stage as Stage)} · {lead.area}
          </p>
          <ProgressTimeline stage={lead.stage as Stage} />
        </div>
      ))}
    </section>
  );
}
