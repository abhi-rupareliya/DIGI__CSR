const Company = require("../Models/Company");
const fs = require("fs");
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
    const companyId = req.params.id;
    const {
      company_name,
      city,
      state,
      pincode,
      establishment_year,
      cp_name,
      cp_email,
      cp_designation,
      cp_phone,
      tax_comp,
      sectors,
    } = req.body;

    console.warn(req.body);

    let updatedFields = {
      company_name,
      "profile.location.city": city,
      "profile.location.state": state,
      "profile.location.pincode": pincode,
      "profile.establishment_year": establishment_year,
      "profile.comunication_person.cp_name": cp_name,
      "profile.comunication_person.cp_email": cp_email,
      "profile.comunication_person.cp_designation": cp_designation,
      "profile.comunication_person.cp_phone": cp_phone,
      "profile.tax_comp": tax_comp,
      "profile.sectors": sectors,
    };

    if (req.file && req.file.path) {
      const fileData = fs.readFileSync(req.file.path);
      updatedFields["profile.registration_certificate"] = fileData;
    }

    const company = await Company.findByIdAndUpdate(
      companyId,
      { $set: updatedFields },
      { new: true }
    );

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    res.status(200).json({
      success: true,
      message: company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
