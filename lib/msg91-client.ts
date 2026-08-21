"use client";

declare global {
  interface Window {
    sendOtp: (identifier: string, onSuccess: (data: unknown) => void, onFailure: (error: unknown) => void) => void;
    verifyOtp: (otp: string, onSuccess: (data: unknown) => void, onFailure: (error: unknown) => void) => void;
    initSendOTP: (config: Record<string, unknown>) => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadMsg91Script(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById("msg91-otp-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "msg91-otp-script";
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load MSG91 script"));
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export async function initMsg91() {
  await loadMsg91Script();
  window.initSendOTP({
    widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID,
    tokenAuth: process.env.NEXT_PUBLIC_MSG91_WIDGET_TOKEN,
    exposeMethods: true,
    success: () => {},
    failure: () => {},
  });

  // Widget attaches window.sendOtp asynchronously after init — wait for it.
  for (let i = 0; i < 50; i++) {
    if (typeof window.sendOtp === "function") return;
    await new Promise((r) => setTimeout(r, 100));
  }
}

export function msg91SendOtp(identifier: string): Promise<{ message: string }> {
  return new Promise((resolve, reject) => {
    window.sendOtp(identifier, resolve as (d: unknown) => void, reject);
  });
}

export function msg91VerifyOtp(otp: string): Promise<{ message: string; type: string }> {
  return new Promise((resolve, reject) => {
    window.verifyOtp(otp, resolve as (d: unknown) => void, reject);
  });
}