"use server";

import { uploadToS3 } from "./s3Upload";
import { connectDB } from "./util";
import { Feature } from "./model/Feature";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Admin } from "./model/Admin";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { Article } from "./model/Blog";
import {VerificationMaster} from "./model/VerificationMaster"
import { User } from "./model/user";

export async function logout() {
  try {
    const cookieStore =  await cookies();
    await cookieStore.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Failed to logout");
  }

  redirect("/login");
}


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




export async function addBlog(formData) {
  try {

    const title = formData.get("title");
    const author = formData.get("author");
    const designation = formData.get("designation");
    const category = formData.get("category");
    const type = formData.get("type");
    const desc = formData.get("desc");
    const message = formData.get("message");
    const image = formData.get("image"); 
    const createdAt = formData.get("date");

    if (!image) {
      throw new Error("Image is required");
    }

    const imageUrl = await uploadToS3(image);
    await connectDB();

    // Extract all FormData entries
    const entries = Array.from(formData.entries());

    // Filter and structure content entries
    const contentMap = {};
    entries.forEach(([key, value]) => {
      const match = key.match(/^content\[(\d+)\]\[(title|body)\]$/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!contentMap[index]) {
          contentMap[index] = {};
        }

        contentMap[index][field] = value;
      }
    });

    // Convert map to array
    const content = Object.values(contentMap);

    const newBlog = new Article({
      title,
      author,
      designation,
      category,
      type,
      desc,
      message,
      imgSrc: imageUrl,
      createdAt,
      content
    });

    await newBlog.save();
    console.log("Blog saved successfully");

  } catch (error) {
    console.error("Error Adding Blog:", error.message);
    throw new Error("Failed to Add Blog");
  }

  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}


export async function updateBlog(formData) {
    try {
      
    const title = formData.get("title");
    const author = formData.get("author");
    const designation = formData.get("designation");
    const category = formData.get("category");
    const type = formData.get("type");
    const desc = formData.get("desc");
    const message = formData.get("message");
    const image = formData.get("image"); 
    const createdAt = formData.get("date");
    const id = formData.get("id")

    const imageUrl = await uploadToS3(image);
    await connectDB();

    // Extract all FormData entries
    const entries = Array.from(formData.entries());

    // Filter and structure content entries
    const contentMap = {};
    entries.forEach(([key, value]) => {
      const match = key.match(/^content\[(\d+)\]\[(title|body)\]$/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!contentMap[index]) {
          contentMap[index] = {};
        }

        contentMap[index][field] = value;
      }
    });

    // Convert map to array
      const content = Object.values(contentMap);
      
      const updateBlog ={
        title,
        author,
        designation,
        category,
        type,
        desc,
        message,
        imgSrc: imageUrl,
        createdAt,
        content
      };
        
      

        await Article.findByIdAndUpdate(id,updateBlog)

    } catch (error) {
        console.error("Error Update Blog:", error.message);
        throw new Error("Failed to Update Blog");
    }
    revalidatePath("/dashboard/blogs");
    redirect("/dashboard/blogs");
}

export async function deleteBlog(formData) {
    try {
        const id = formData.get("id")
    
        await connectDB();
        
        await Article.findByIdAndDelete(id)
        console.log("Deleted successfully");

    } catch (error) {
        console.error("Error Deleting Blog:", error.message);
        throw new Error("Failed to Delete Blog");
    }
    revalidatePath("/dashboard/blogs");
}

export const authenticate = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await connectDB();
    const user = await Admin.findOne({ email });
    if (!user) return "Wrong credentials";

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return "Wrong credentials";

    const userData = { _id: user._id.toString(), email: user.email, name: user.name };

    // Generate JWT using `jose`
    const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const token = await new SignJWT(userData)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secretKey);

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return { success: true, userData };

  } catch (err) {
    console.error("Authentication failed:", err);
    return "Failed to login!";
  }
};

export async function verifyCounselor({ userId }) {
  try {

    await connectDB();

    const alreadyVerified = await VerificationMaster.findOne({ userId });

    if (!alreadyVerified) {
      await VerificationMaster.create({
        userId,
        adminVerified: true,
      });
    }

    revalidatePath("/dashboard/users");

  } catch (error) {
    console.error("Error verifying counselor:", error.message);
    throw new Error("Failed to verify counselor");
  }
}


export async function deleteUser(userId) {
  try {

    await connectDB();

    // Delete the user by id
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    // Refresh the users page after deletion
    revalidatePath("/dashboard/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error("Failed to delete user");
  }
}
