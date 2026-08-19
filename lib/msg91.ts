const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;

// Called after the client-side widget verifies the OTP and hands us an
// access-token — we double-check it server-side before trusting it.
export async function msg91VerifyAccessToken(accessToken: string): Promise<boolean> {
  const res = await fetch("https://control.msg91.com/api/v5/widget/verifyAccessToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      authkey: MSG91_AUTH_KEY,
      "access-token": accessToken,
    }),
  });
  const data = await res.json();
  return data.type === "success";
}