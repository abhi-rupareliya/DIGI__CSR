const Company = require("../Models/Company");
const RFP = require("../Models/RFP");

exports.AddRfp = async (req, res) => {
  try {
    const { title, amount, timeline, sectors, states, company } = req.body;
    const newRFP = new RFP({
      title,
      amount,
      timeline,
      sectors,
      states,
      company,
      date: new Date(),
    });

    const addedRFP = await newRFP.save();
    if (addedRFP) {
      return res.status(200).json({
        success: true,
        RFP: addedRFP,
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Failed to create RFP." });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error creating RFP.",
    });
  }
};

exports.getAllRfps = async (req, res) => {
  try {
    const rfps = await RFP.find(
      {},
      {
        title: 1,
        amount: 1,
        remainingAmount: {
          $subtract: ["$amount", { $sum: "$donations.amount" }],
        },
      }
    );
    res.status(200).json(rfps);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRFPDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const rfp = await RFP.findById(id);
    if (!rfp) {
      return res
        .status(404)
        .json({ success: false, message: "RFP not found." });
    }
    return res.status(200).json({ success: true, rfp });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
