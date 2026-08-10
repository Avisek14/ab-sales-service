import mongoose, { Schema, models, model } from "mongoose";

// Team members are pre-authorized by an admin (entered directly for now —
// see scripts/add-team-member.mjs). Anyone whose phone isn't in this
// collection is rejected at login with "not authorized", they never get
// as far as receiving an OTP.
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true, index: true },
    role: {
      type: String,
      enum: ["admin", "technician", "higher_authority"],
      default: "technician",
    },
  },
  { timestamps: true }
);

export type UserDoc = mongoose.InferSchemaType<typeof UserSchema>;

export default models.User || model("User", UserSchema);
