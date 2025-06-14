import mongoose  from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: "String"
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },

    password: {
      type: "String",
      required: true
    },
    
    age: {
      type: "Number",
      required: true,
    },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  
    role: {
      type: "String",
      enum: ["user", "counselor"],
      default: "user",
    },
    gender: {
      type: "String"
    },
    emailVerified: {
      type: "Boolean",
      default: false,
    },
    profileMaking: {
      type: "Boolean",
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestaps: true }
);



export const User = mongoose.models.User || mongoose.model("User", userSchema);
