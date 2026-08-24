import mongoose, { Schema, models, model } from "mongoose";

const PortalStatsSchema = new Schema(
  {
    totalCustomers: { type: Number, default: 0 },
    totalInstallations: { type: Number, default: 0 },
    totalCompleted: { type: Number, default: 0 },
    uploadedBy: { type: String },
  },
  { timestamps: true }
);

export default models.PortalStats || model("PortalStats", PortalStatsSchema);