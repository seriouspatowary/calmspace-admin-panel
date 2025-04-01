"use server";

import { uploadToS3 } from "./s3Upload";
import { connectDB } from "./util";
import { Feature } from "./model/Feature";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Admin } from "./model/Admin";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function addFeature(formData) {
    try {
        const title = formData.get("title");
        const subtitle = formData.get("subtitle");
        const image = formData.get("image"); 
        if (!image) {
            throw new Error("Image is required");
        }
        const imageUrl = await uploadToS3(image);
        await connectDB();
        
        const newFeature = new Feature({
            title,
            subtitle,
            imgSrc: imageUrl
        });

        await newFeature.save();
        console.log("Feature saved successfully");

    } catch (error) {
        console.error("Error Adding Feature:", error.message);
        throw new Error("Failed to Add Feature");
    }
    revalidatePath("/dashboard/features");
    redirect("/dashboard/features");
}



export async function deleteFeature(formData) {
    try {
        

        const id = formData.get("id")
    
        await connectDB();
        
        
        await Feature.findByIdAndDelete(id)
        console.log("Deleted successfully");

    } catch (error) {
        console.error("Error Deleting Feature:", error.message);
        throw new Error("Failed to Delete Feature");
    }
    revalidatePath("/dashboard/features");
}

export async function updateFeature(formData) {
    try {
        const title = formData.get("title");
        const subtitle = formData.get("subtitle");
        const image = formData.get("image"); 
        const id = formData.get("id")

        console.log("updatefilled:",id)
        if (!image) {
            throw new Error("Image is required");
        }
        const imageUrl = await uploadToS3(image);
        await connectDB();
        
        const updatedFeature = {
            title,
            subtitle,
            imgSrc: imageUrl
        };

        await Feature.findByIdAndUpdate(id,updatedFeature)

    } catch (error) {
        console.error("Error Update Feature:", error.message);
        throw new Error("Failed to Update Feature");
    }
    revalidatePath("/dashboard/features");
    redirect("/dashboard/features");
}




export const authenticate = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("data:", email, password);

  try {
    await connectDB();

    const user = await Admin.findOne({ email });
    if (!user) {
      console.error("User not found");
      return "Wrong credentials"; 
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.error("Incorrect password");
      return "Wrong credentials"; // Return an error if password is incorrect
    }

    const userData = {
      _id: user._id.toString(), // Convert _id to string
      email: user.email,
      name: user.name,
    };

    // Generate JWT Token
    const token = jwt.sign(userData, process.env.NEXTAUTH_SECRET, { expiresIn: "7d" });

    // Set cookie with the token (HttpOnly for security)
    cookies().set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return userData;
  } catch (err) {
    console.error("Authentication failed:", err);
    return "Failed to login!";
  }
};
