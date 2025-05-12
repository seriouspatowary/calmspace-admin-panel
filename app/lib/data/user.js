import { connectDB } from "../util";
import { User } from "../model/user";
import { Counselor } from "../model/Counselor";

export const fetchTotalCounts = async () => {
  try {
    await connectDB();

    // Total counts
    const totalUsers = await User.countDocuments();
    const totalCounselors = await Counselor.countDocuments();

    // Weekly user counts
    const weeklyData = await User.aggregate([
      {
        $match: {
          createdAt: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 },
      },
    ]);

    // Compute weekly stats
    const weeklyStats = weeklyData.map((entry, index) => {
      const previous = weeklyData[index - 1];
      const currentCount = entry.totalUsers;
      const previousCount = previous ? previous.totalUsers : 0;

      let percentChange = null;

      if (previousCount === 0) {
        percentChange = null;
      } else {
        percentChange = ((currentCount - previousCount) / previousCount) * 100;
        percentChange = Math.round(percentChange * 100) / 100;
      }

      return {
        year: entry._id.year,
        week: entry._id.week,
        totalUsers: currentCount,
        percentChangeFromPreviousWeek: percentChange,
      };
    });

    const currentWeekStats = weeklyStats[weeklyStats.length - 1];

    return {
      totalUsers,
      totalCounselors,
      currentWeekStats, // Only latest week's data
    };
  } catch (err) {
    console.error("Error fetching dashboard stats:", err.message);
    throw new Error("Failed to fetch dashboard statistics!");
  }
};

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 6;
    const currentPage = parseInt(page, 10) || 1;

  try {
    await connectDB();

    const count = await User.countDocuments({ name: { $regex: regex } });

    const users = await User.aggregate([
      {
        $match: {
          name: { $regex: regex },
        },
      },
      {
        $lookup: {
          from: "verificationmasters", 
          localField: "_id",
          foreignField: "userId",
          as: "verification",
        },
      },
      {
        $addFields: {
          adminVerified: {
            $cond: [{ $gt: [{ $size: "$verification" }, 0] }, true, false],
          },
        },
      },
      {
        $project: {
          verification: 0, 
        },
      },
      { $skip: ITEM_PER_PAGE * (currentPage - 1) },
      { $limit: ITEM_PER_PAGE },
    ]);

    return { count, users };
  } catch (err) {
    console.error("Error fetching users:", err.message);
    throw new Error("Failed to fetch users!");
  }
};




export const fetchCounselors = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  const currentPage = parseInt(page, 10) || 1;

  try {
    await connectDB();

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "counselorId",
          foreignField: "_id",
          as: "counselorId",
        },
      },
      { $unwind: "$counselorId" },
      {
        $match: {
          "counselorId.name": { $regex: regex },
          "counselorId.role": "counselor",
        },
      },
      {
        $lookup: {
          from: "prices",
          localField: "priceId",
          foreignField: "_id",
          as: "priceId",
        },
      },
      { $unwind: { path: "$priceId", preserveNullAndEmptyArrays: true } },
      {
        $facet: {
          data: [
            { $skip: ITEM_PER_PAGE * (currentPage - 1) },
            { $limit: ITEM_PER_PAGE },
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ];

    const result = await Counselor.aggregate(pipeline);
    const counselors = result[0]?.data || [];
    const count = result[0]?.totalCount[0]?.count || 0;

    return { count, users: counselors };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch counselors!");
  }
};

