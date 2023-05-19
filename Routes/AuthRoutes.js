const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/AuthController");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
};
module.exports = AuthRoutes;
