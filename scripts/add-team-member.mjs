// Usage: node --env-file=.env.local scripts/add-team-member.mjs "Name" 9876543210 admin
// Role must be one of: admin, technician, higher_authority
//
// This is how you authorize someone's phone number for the dashboard.
// Anyone whose number isn't added here gets "not authorized" at login —
// there's no self-signup, this script IS the admin's decision.

import mongoose from "mongoose";

const [, , name, phone, role = "technician"] = process.argv;
if (!name || !phone) {
  console.error(
    'Usage: node --env-file=.env.local scripts/add-team-member.mjs "Name" phone [admin|technician|higher_authority]'
  );
  process.exit(1);
}

const validRoles = ["admin", "technician", "higher_authority"];
if (!validRoles.includes(role)) {
  console.error(`Role must be one of: ${validRoles.join(", ")}`);
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  role: { type: String, default: "technician" },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

await mongoose.connect(process.env.MONGODB_URI);
await User.findOneAndUpdate({ phone }, { name, phone, role }, { upsert: true });
console.log(`Authorized: ${name} (${phone}) as ${role}`);
await mongoose.disconnect();
