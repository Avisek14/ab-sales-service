"use client";

import { useRef, useState } from "react";

export default function PortalStatsUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    totalCustomers: number;
    totalInstallations: number;
    totalCompleted: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setBusy(true);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/portal-stats/upload", { method: "POST", body: form });
    const data = await res.json();
    setBusy(false);

    if (!res.ok) {
      setError(data.error || "Upload failed.");
      return;
    }

    setResult(data);
    if (fileRef.current) fileRef.current.value = "";
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-mono px-4 py-2 rounded-full border border-sky/40 bg-sky/5 text-ink/70 shadow-sm hover:shadow-md hover:border-sky hover:text-ink hover:bg-sky/10 hover:-translate-y-0.5 transition-all duration-300 animate-[slowPulse_3s_ease-in-out_infinite]"
      >
        Upload portal Excel
      </button>
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg">Upload portal Excel export</h3>
        <button onClick={() => setOpen(false)} className="text-xs text-ink/50 hover:text-ink">
          Close
        </button>
      </div>
      <p className="text-xs text-ink/60 mb-4">
        Upload the .xlsx export from the PM Surya Ghar portal (&quot;My Applications List&quot;).
        This refreshes the homepage ticker&apos;s Total Customers, Installations, and
        Completed counts. Upload again each time the portal data changes.
      </p>

      <form onSubmit={onUpload} className="flex flex-wrap items-center gap-3">
        <input ref={fileRef} type="file" accept=".xlsx,.xls" required className="text-sm" />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-dusk transition-colors disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload & refresh"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 text-sm space-y-1">
          <p className="text-good">✓ Updated from {result.totalCustomers} rows</p>
          <p className="text-ink/60">Installations: {result.totalInstallations}</p>
          <p className="text-ink/60">Completed: {result.totalCompleted}</p>
        </div>
      )}
    </div>
  );
}