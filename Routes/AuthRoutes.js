const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/AuthController");
const { NGOSignup, VerifyNGO } = require("../Controllers/AuthNGOController");
const {
  getCompanyProfile,
} = require("../Controllers/CompanyProfileController");
const {CompanyDetails} = require("../Controllers/AuthCompDetController");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
  app.post("/ngo/signup", NGOSignup);
  app.post("/ngo/verify", VerifyNGO);
};
module.exports = AuthRoutes;
