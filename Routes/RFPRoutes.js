const {
  AddRfp,
  getAllRfps,
  getRFPDetails,
  acceptRFP,
} = require("../Controllers/RFPControllers");
const RFPRoutes = (app) => {
  app.post("/add-rfp", AddRfp);
  app.get("/rfps", getAllRfps);
  app.get("/rfp-details/:id", getRFPDetails);
  app.put("/accept-rfp", acceptRFP);
};

module.exports = RFPRoutes;
