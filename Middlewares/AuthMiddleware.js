const jwt = require("jsonwebtoken");
const jwt_sec = process.env.JWT_SEC;
const Company = require('../Models/Company');
const Beneficiary = require("../Models/Beneficiary");
const NGO = require("../Models/NGO");

module.exports = async (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).send({ success: false, message: "Not Authorized. Token not found !!!" });
  }

  try {


    const { _id, type } = jwt.verify(token, jwt_sec);

    console.log("_id: " + _id + ' type: ' + type);

    switch (type) {
      case "company":
        try {
          const company = await Company.findById(_id);
          if (company) {
            req.LoggedEntity = company;
            req.LoggedEntity.type = "company";
            break;
          }
          throw new Error("Unauthorized");
        } catch (error) {
          return res.status(401).send({ success: false, message: "Not Authorized." });
        }

      case "NGO":
        try {
          const ngo = await NGO.findById(_id);
          if (ngo) {
            req.LoggedEntity = ngo;
            req.LoggedEntity.type = "NGO";
            break;
          }
          throw new Error("Unauthorized");
        } catch (error) {
          return res.status(401).send({ success: false, message: "Not Authorized." });
        }

      case "Beneficiary":
        try {
          const beneficiary = await Beneficiary.findById(_id);
          if (beneficiary) {
            req.LoggedEntity = beneficiary;
            req.LoggedEntity.type = "Beneficiary";
            break;
          }
          throw new Error("Unauthorized");
        } catch (error) {
          return res.status(401).send({ success: false, message: "Not Authorized." });
        }

      default:
        return res.status(401).send({ success: false, message: "Not Authorized." });
    }

    next();

  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ success: false, message: "Invalid token. Not Authorized." });
    }
    return res.status(500).send({ success: false, message: "Server internal error" });
  }
};
