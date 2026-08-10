import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardList from "./DashboardList";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Team dashboard
      </p>
      <h1 className="font-display text-3xl mb-8">Leads &amp; consumers</h1>
      <DashboardList />
    </section>
  );
}
