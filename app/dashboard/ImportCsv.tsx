"use client";

import { useRef, useState } from "react";
import { STAGES } from "@/lib/stages";

type ImportResult = {
  updated: string[];
  notFound: string[];
  invalidStage: string[];
};

export default function ImportCsv({ onDone }: { onDone: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
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

    const res = await fetch("/api/leads/import", { method: "POST", body: form });
    const data = await res.json();
    setBusy(false);

    if (!res.ok) {
      setError(data.error || "Import failed.");
      return;
    }

    setResult(data);
    if (fileRef.current) fileRef.current.value = "";
    onDone();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-mono px-4 py-2 rounded-full border border-solar/40 bg-solar/5 text-ink/70 shadow-sm hover:shadow-md hover:border-solar hover:text-ink hover:bg-solar/10 hover:-translate-y-0.5 transition-all duration-300 animate-[slowPulse_3s_ease-in-out_infinite]"
      >
        Bulk update via CSV
      </button>
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg">Bulk update via CSV</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-ink/50 hover:text-ink"
        >
          Close
        </button>
      </div>
      <p className="text-xs text-ink/60 mb-4">
        CSV needs a <code className="font-mono">phone</code> column and a{" "}
        <code className="font-mono">stage</code> column (optional{" "}
        <code className="font-mono">note</code>). Stage values must match
        exactly: {STAGES.join(" · ")}
      </p>

      <form onSubmit={onUpload} className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          required
          className="text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-dusk transition-colors disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload & update"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 text-sm space-y-1">
          <p className="text-good">✓ Updated: {result.updated.length}</p>
          {result.notFound.length > 0 && (
            <p className="text-ink/60">
              Not found in system: {result.notFound.join(", ")}
            </p>
          )}
          {result.invalidStage.length > 0 && (
            <p className="text-red-600">
              Unrecognized stage: {result.invalidStage.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}