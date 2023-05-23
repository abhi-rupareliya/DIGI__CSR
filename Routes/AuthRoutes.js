const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/AuthController");
const { NGOSignup, VerifyNGO } = require("../Controllers/AuthNGOController");
const {
  getCompanyProfile,
} = require("../Controllers/CompanyProfileController");
const {CompanyDetails} = require("../Controllers/CompanyProfileController");
const {CompanyLogin , CompanyLoginVerify} = require("../Controllers/AuthController");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
  app.post("/ngo/signup", NGOSignup);
  app.post("/ngo/verify", VerifyNGO);
  app.post("/company/login", CompanyLogin);
  app.post("/company/login/verify", CompanyLoginVerify);
};
module.exports = AuthRoutes;
