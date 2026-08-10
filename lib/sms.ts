// Stub SMS sender. For local dev this just logs the OTP so you can test the
// flow without an SMS account. Swap the body of this function for a real
// MSG91 / Twilio call once you have API credentials — the rest of the app
// doesn't need to change.

export async function sendOtpSms(phone: string, code: string) {
  if (process.env.SMS_PROVIDER === "msg91" && process.env.MSG91_API_KEY) {
    // TODO: call MSG91 API here using process.env.MSG91_API_KEY
    // await fetch("https://api.msg91.com/api/v5/otp", { ... })
  }

  console.log(`[dev sms] OTP for ${phone}: ${code}`);
}
