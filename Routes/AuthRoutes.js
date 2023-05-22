const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/AuthController");
const { NGOSignup, VerifyNGO } = require("../Controllers/AuthNGOController");
const {
  getCompanyProfile,
} = require("../Controllers/CompanyProfileController");
const { NGOSignup , VerifyNGO } = require("../Controllers/AuthNGOController");
const {CompanyDetails} = require("../Controllers/AuthCompDetController");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
  app.get("/company/profile/:id", getCompanyProfile);
  app.post("/ngo/signup", NGOSignup);
  app.post("/ngo/verify", VerifyNGO);
  app.post("/company/details", CompanyDetails);
};
module.exports = AuthRoutes;
