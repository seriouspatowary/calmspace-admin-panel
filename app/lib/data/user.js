import { connectDB } from "../util";
import {User} from "../model/user";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectDB();
    const count = await User.countDocuments({ name: { $regex: regex }, role: "user"  });
    const users = await User.find({ name: { $regex: regex } , role: "user" })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchCounselors = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectDB();
    const count = await User.countDocuments({ name: { $regex: regex }, role: "counselor"  });
    const users = await User.find({ name: { $regex: regex } , role: "counselor" })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};