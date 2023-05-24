const { AddRfp } = require("../Controllers/RFPControllers");
const RFPRoutes = (app) => {
  app.post("/add-rfp", AddRfp);
};

module.exports = RFPRoutes;
