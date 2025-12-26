import { NextResponse } from "next/server";
import { connectDB } from "../../lib/util";
import { User } from "../../lib/model/user";
import { Counselor } from "../../lib/model/Counselor";
import { Price } from "../../lib/model/Price";
import mongoose from "mongoose";

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      counselorId,

      name,
      email,
      age,
      gender,

      experience,
      degree,
      expertise,
      therapy,
      info,
      status,

      chatPrice,
      videoPrice,
      audioPrice,
    } = body;

    if (!mongoose.Types.ObjectId.isValid(counselorId)) {
      return NextResponse.json(
        { message: "Invalid counselor ID" },
        { status: 400 }
      );
    }

    // 1️⃣ Update Counselor
    const counselor = await Counselor.findByIdAndUpdate(
      counselorId,
      {
        experience,
        degree,
        expertise,
        therapy,
        info,
        status,
      },
      { new: true }
    );

    if (!counselor) {
      return NextResponse.json(
        { message: "Counselor not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Update linked User
    await User.findByIdAndUpdate(counselor.counselorId, {
      name,
      email,
      age,
      gender,
    });

    // 3️⃣ Update Price (if exists)
    if (counselor.priceId) {
      await Price.findByIdAndUpdate(counselor.priceId, {
        chat: chatPrice,
        video: videoPrice,
        audio: audioPrice,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Counselor updated successfully",
    });
  } catch (error) {
    console.error("Update counselor error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update counselor" },
      { status: 500 }
    );
  }
}
