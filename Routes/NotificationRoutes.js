const {
  GetNgoNotification,
} = require("../Controllers/NotificationControllers");

const NotificationRoutes = (app) => {
  app.get("/ngo/notifications/:id", GetNgoNotification);
};

module.exports = NotificationRoutes;
