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
