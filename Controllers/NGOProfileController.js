const NGO = require("../Models/NGO");
const fs = require("fs");
const { NgoProfileValidator } = require("../Services/Validators/ngoValidators");

exports.getNGOProfile = async (req, res) => {
  try {
    const NGOId = req.params.id;

    // Retrieve the NGO document by its ID
    const ngo = await NGO.findById(NGOId).populate("profile.board_members");

    if (!ngo) {
      return res
        .status(404)
        .json({ success: false, message: "NGO not found." });
    }

    // Prepare the response data
    const responseData = {
      NGO_name: ngo.ngo_name,
      email: ngo.email,

      profile: {
        summary: ngo.profile.summary,
        board_members: ngo.profile.board_members,
        csr_budget: ngo.profile.csr_budget,
        operation_area: ngo.profile.operation_area,
        sectors: ngo.profile.sectors,
      },
    };

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.AddNGOProfile = async (req, res) => {
  try {
    if (req.userType !== "ngo") {
      return res
        .status(400)
        .send({ success: false, message: "Not Authorized." });
    }
    const NGOId = req.user.id;
    const {
      ngo_name,
      summary,
      board_members,
      csr_budget,
      operation_area,
      sectors,
    } = req.body;

    let fileData;
    if (req.files && req.files.ngo_logo) {
      fileData = fs.readFileSync(req.files.ngo_logo[0].path);
      updatedFields["profile.ngo_logo"] = fileData;
    }
    // console.warn(req.body);
    const { error } = NgoProfileValidator.validate({
      ...req.body,
      ngo_logo: fileData,
    });
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    let updatedFields = {
      ngo_name: ngo_name,
      "profile.summary": summary,
      "profile.board_members": board_members,
      "profile.csr_budget": csr_budget,
      "profile.operation_area": operation_area,
      "profile.sectors": sectors,
    };

    const ngo = await NGO.findByIdAndUpdate(
      NGOId,
      { $set: updatedFields },
      { new: true }
    );

    if (!ngo) {
      return res
        .status(404)
        .json({ success: false, message: "NGO not found." });
    }

    res.status(200).json({
      success: true,
      message: ngo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getNgoLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findOne(
      { _id: id },
      {
        "profile.ngo_logo": 1,
      }
    );
    if (!ngo) {
      return res
        .status(404)
        .json({ success: false, message: "NGO not found." });
    }

    const logoBuffer = ngo.profile.ngo_logo;
    if (!logoBuffer) {
      return res.status(404).json({
        success: false,
        message: "Registration certificate not found.",
      });
    }

    res.set("Content-Type", "image");
    res.send(logoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getAllNgo = async (req, res) => {
  try {
    const userType = req.userType;
    if (userType !== "company" && userType !== "Beneficiary") {
      return res
        .status(403)
        .send({ success: false, message: "Not Authorized." });
    }
    const ngos = await NGO.find({});
    return res.status(200).send({ success: true, ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
