const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
const MSG91_WIDGET_ID = process.env.MSG91_WIDGET_ID!;

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

export async function msg91SendOtp(phone: string) {
  const res = await fetch("https://control.msg91.com/api/v5/widget/sendOtp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      widgetId: MSG91_WIDGET_ID,
      authkey: MSG91_AUTH_KEY,
      identifier: formatPhone(phone),
    }),
  });
  const data = await res.json();
  return data.type === "success";
}

export async function msg91VerifyOtp(phone: string, otp: string) {
  const res = await fetch("https://control.msg91.com/api/v5/widget/verifyOtp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      widgetId: MSG91_WIDGET_ID,
      authkey: MSG91_AUTH_KEY,
      identifier: formatPhone(phone),
      otp,
    }),
  });
  const data = await res.json();
  return data.type === "success";
}