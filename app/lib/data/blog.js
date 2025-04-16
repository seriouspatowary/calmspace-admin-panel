import { connectDB } from "../util";
import { Article } from "../model/Blog";


export const fetchBlog = async (id) => {
  try {
    connectDB();
    const blog = await Article.findById(id);

    if (!blog) {
      throw new Error("Feature not found!");
    }

    // Convert _id to string and spread blog data
    return {
      ...blog.toObject(),
       _id: blog._id.toString(),
        imgSrc: blog.imgSrc
    };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch feature!");
  }
};




export const fetchBlogs = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;

  try {
    connectDB();
    const count = await Article.countDocuments({ title: { $regex: regex } });
    const blogs = await Article.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    // Generate signed URLs for images
   const updatedFeatures = await Promise.all(
      blogs.map(async (feature) => ({
      
       _id: feature._id.toString(),
        imgSrc: feature.imgSrc,
 
      }))
    );
   

    return { count, blogs };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch features!");
  }
};