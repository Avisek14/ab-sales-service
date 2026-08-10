"use client";

import { useEffect, useState } from "react";
import { STAGES, recordType, type Stage } from "@/lib/stages";

type LeadRow = {
  _id: string;
  name: string;
  phone: string;
  area?: string;
  stage: Stage;
  assignedTo?: string;
};

export default function DashboardList() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const url = filter ? `/api/leads?stage=${encodeURIComponent(filter)}` : "/api/leads";
    const res = await fetch(url);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    load();
  }, [filter]);

  async function updateStage(id: string, stage: Stage) {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, stage } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setFilter("")}
          className={`text-xs font-mono px-3 py-1.5 rounded-full border ${
            filter === "" ? "bg-ink text-paper border-ink" : "border-line text-ink/60"
          }`}
        >
          All
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-mono px-3 py-1.5 rounded-full border ${
              filter === s ? "bg-ink text-paper border-ink" : "border-line text-ink/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-ink/50 text-sm">No records match this filter.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/50 border-b border-line">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Area</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.area ?? "—"}</td>
                  <td className="px-4 py-3 capitalize">{recordType(lead.stage)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.stage}
                      onChange={(e) => updateStage(lead._id, e.target.value as Stage)}
                      className="rounded-md border border-line px-2 py-1 text-xs bg-paper"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
