import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true
    },
    email: { 
      type: String,
      required: true,
      unique: true
    },
    password: { 
      type: String,
      required: true,
      minLength: 5
    },
    AdminRole: {
      type: String,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
