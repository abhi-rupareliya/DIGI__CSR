const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/AuthController");
const { NGOSignup , VerifyNGO } = require("../Controllers/AuthNGOController");
const {CompanyDetails} = require("../Controllers/AuthCompDetController");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
  app.post("/ngo/signup", NGOSignup);
  app.post("/ngo/verify", VerifyNGO);
  app.post("/company/details", CompanyDetails);

};
module.exports = AuthRoutes;
