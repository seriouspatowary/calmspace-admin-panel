import mongoose, { Schema } from "mongoose";

const VerificationMasterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  adminVerified: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
}, {
  timestamps: true, 
});

export const VerificationMaster = mongoose.models.VerificationMaster || mongoose.model('VerificationMaster', VerificationMasterSchema);


