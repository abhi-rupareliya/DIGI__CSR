const jwt = require("jsonwebtoken");
const Company = require("../Models/Company");
const NGO = require("../Models/NGO");
const jwt_sec = process.env.JWT_SEC;

module.exports = async (req, res, next) => {
  try {
    const Token = req.header("authorization");
    if (!Token) {
      return res
        .status(404)
        .send({ success: false, message: "Not Authorized." });
    }

    const User = jwt.decode(Token, jwt_sec);
    if (!User) {
      return res
        .status(400)
        .send({ success: false, message: "Not Authorized." });
    }

    let user = await Company.find({ _id: User._id }, { _id: 1 }); // just _id to reduce res time
    let userType = "company";

    if (!user) {
      user = await NGO.find({ _id: User._id }, { _id: 1 });
      userType = "ngo";
    }

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Not Authorized." });
    }

    req.user = User;
    req.userType = userType;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Server internal error" });
  }
};
