import mongoose, { Schema, models, model } from "mongoose";
import { STAGES } from "@/lib/stages";

const StageHistorySchema = new Schema(
  {
    stage: { type: String, enum: STAGES, required: true },
    note: { type: String },
    changedBy: { type: String }, // team member name/email
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const DocumentSchema = new Schema(
  {
    label: { type: String, required: true }, // e.g. "Feasibility report", "Site photo"
    url: { type: String, required: true }, // Cloudinary URL
    uploadedBy: { type: String },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    address: { type: String },
    area: { type: String }, // e.g. Nabarangpur, Koraput
    source: { type: String, default: "Contact form" },

    stage: { type: String, enum: STAGES, default: "Inquiry" },
    assignedTo: { type: String }, // team member

    stageHistory: { type: [StageHistorySchema], default: [] },
    documents: { type: [DocumentSchema], default: [] },

    // Post-sale specific fields, filled in once the record becomes a consumer
    consumerNumber: { type: String }, // TPSODL consumer number
    subsidyAmount: { type: Number },
  },
  { timestamps: true }
);

export type LeadDoc = mongoose.InferSchemaType<typeof LeadSchema>;

export default models.Lead || model("Lead", LeadSchema);
