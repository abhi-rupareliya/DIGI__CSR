require("./Database/Connection");
const RFP = require("./Models/RFP");
const mongoose = require("mongoose");
async function calculateSectorAmounts() {
  try {
    const results = await RFP.aggregate([
      {
        $unwind: "$donations",
      },
      {
        $match: {
          amount: { $exists: true },
          sectors: { $exists: true },
          "donations.ngo": new mongoose.Types.ObjectId(),
          "donations.status": "rejected",
        },
      },
      {
        $unwind: "$sectors",
      },
      {
        $group: {
          _id: "$sectors",
          totalAmount: { $sum: "$donations.amount" },
        },
      },
    ]);

    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

calculateSectorAmounts();
