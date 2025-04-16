import { connectDB } from "../util";
import { Feature } from "../model/Feature";


export const fetchFeature = async (id) => {
  try {
    connectDB();
    const feature = await Feature.findById(id);

    if (!feature) {
      throw new Error("Feature not found!");
    }

    return {
      id: feature._id.toString(),
      title: feature.title,
      subtitle: feature.subtitle,
      imgSrc:feature.imgSrc, // Generate signed URL for image
    };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch feature!");
  }
};



export const fetchFeatures = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;

  try {
    connectDB();
    const count = await Feature.countDocuments({ title: { $regex: regex } });
    const features = await Feature.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    // Generate signed URLs for images
    const updatedFeatures = await Promise.all(
      features.map(async (feature) => ({
        id:feature._id.toString(),
        title: feature.title,
        subtitle: feature.subtitle,
        date:feature.date,
        imgSrc: feature.imgSrc
      }))
    );

    return { count, features: updatedFeatures };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch features!");
  }
};