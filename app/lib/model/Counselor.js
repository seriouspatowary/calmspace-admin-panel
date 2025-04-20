import mongoose, { Schema } from "mongoose";

const counselorSchema = new Schema({
  counselorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  experience: String,
  degree: String,
  therapy: String,
  info: String,
  expertise: String,
  speciality: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
  },
  languages: [String],
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  employeeId: {
    type: String,
    unique: true,
  },
  priceId: {
    type: Schema.Types.ObjectId,
    ref: "Price",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  adminVerified: {
    type: Boolean,
    default: false,
  },
  PhoneNumber: Number,
});

// Validator function to check array length
function arrayLimit(val) {
  return val.length <= 3;
}

// Middleware to generate employeeId
counselorSchema.pre("save", async function (next) {
  if (this.isNew) {
    const User = mongoose.model("User");
    const user = await User.findById(this.counselorId);
    if (!user) {
      return next(new Error("User not found"));
    }

    const initials = user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const date = new Date(this.registrationDate);
    const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

    const count = (await mongoose.model("Counselor").countDocuments()) + 1;
    const index = String(count).padStart(3, "0");

    this.employeeId = `${initials}${formattedDate}${index}`;
  }
  next();
});

export const Counselor = mongoose.models.Counselor || mongoose.model("Counselor", counselorSchema);
