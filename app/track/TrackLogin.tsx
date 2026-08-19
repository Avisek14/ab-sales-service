"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initMsg91, msg91SendOtp, msg91VerifyOtp } from "@/lib/msg91-client";

function toMsg91Identifier(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

export default function TrackLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const identifier = toMsg91Identifier(phone);
      await initMsg91(identifier);
      await msg91SendOtp(identifier);
      setStep("otp");
    } catch {
      setError("Couldn't send the code — check the number and try again.");
    }
    setBusy(false);
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await msg91VerifyOtp(code);
      const res = await fetch("/api/track/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, accessToken: result.message }),
      });
      if (res.ok) {
        router.push("/track/status");
      } else {
        setError("That code didn't work — check it and try again.");
      }
    } catch {
      setError("That code didn't work — check it and try again.");
    }
    setBusy(false);
  }

  if (step === "phone") {
    return (
      <form onSubmit={requestOtp} className="space-y-4">
        <div>
          <label className="block text-sm mb-1.5" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30"
            placeholder="10-digit mobile number"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink text-paper px-6 py-3 font-medium hover:bg-dusk transition-colors disabled:opacity-60"
        >
          {busy ? "Sending code…" : "Send OTP"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={verifyOtp} className="space-y-4">
      <p className="text-sm text-ink/60">We sent a 6-digit code to {phone}.</p>
      <div>
        <label className="block text-sm mb-1.5" htmlFor="code">
          Enter code
        </label>
        <input
          id="code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-solar focus:ring-2 focus:ring-solar/30 font-mono tracking-widest"
          maxLength={6}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="rounded-full bg-ink text-paper px-6 py-3 font-medium hover:bg-dusk transition-colors disabled:opacity-60"
      >
        {busy ? "Verifying…" : "Verify & continue"}
      </button>
      <button
        type="button"
        onClick={() => setStep("phone")}
        className="block text-sm text-ink/50 hover:text-ink"
      >
        Use a different number
      </button>
    </form>
  );
}