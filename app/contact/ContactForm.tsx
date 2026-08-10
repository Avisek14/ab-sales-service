"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? "sent" : "error");
    if (res.ok) formEl.reset();
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="font-display text-xl mb-2">Thanks — we&apos;ve got it.</p>
        <p className="text-ink/65 text-sm">
          Our team will call you to schedule a site visit. You can check
          progress any time from the Track page once your inquiry is logged.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm mb-1.5" htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5" htmlFor="phone">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5" htmlFor="area">
          Area
        </label>
        <select
          id="area"
          name="area"
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
        >
          <option>Nabarangpur</option>
          <option>Kalahandi</option>
          <option>Koraput</option>
          <option>Malkangiri</option>
          <option>Boudh</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1.5" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
        />
      </div>
      <div>
        <label className="block text-sm mb-1.5" htmlFor="message">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink text-paper px-6 py-3 font-medium hover:bg-dusk transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a site visit"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}