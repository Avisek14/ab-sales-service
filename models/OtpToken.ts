import mongoose, { Schema, models, model } from "mongoose";

const OtpTokenSchema = new Schema({
  phone: { type: String, required: true, index: true },
  code: { type: String, required: true },
  purpose: { type: String, enum: ["customer", "team"], default: "customer" },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }, // TTL index
});

export type OtpTokenDoc = mongoose.InferSchemaType<typeof OtpTokenSchema>;

export default models.OtpToken || model("OtpToken", OtpTokenSchema);
