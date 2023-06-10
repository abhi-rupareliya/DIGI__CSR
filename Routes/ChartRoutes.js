const {
  SectorsData,
  StatesData,
  YearData,
} = require("../Controllers/ChartControllers");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const RFPRoutes = (app) => {
  app.get("/charts/sector", AuthMiddleware, SectorsData);
  app.get("/charts/state", AuthMiddleware, StatesData);
  app.get("/charts/year", AuthMiddleware, YearData);
};

module.exports = RFPRoutes;
