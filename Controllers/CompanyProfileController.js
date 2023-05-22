const Company = require("../Models/Company");

exports.getCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    return res.status(200).json({ success: true, company });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot get company." });
  }
};

exports.AddCompanyProfile = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to add company data." });
  }
};
