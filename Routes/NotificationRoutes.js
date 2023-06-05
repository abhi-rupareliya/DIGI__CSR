const {
  GetNgoNotification,
  updateReadStatus,
  deleteNotification,
} = require("../Controllers/NotificationControllers");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const NotificationRoutes = (app) => {
  app.get("/ngo/notifications/:id", AuthMiddleware, GetNgoNotification);
  app.post("/ngo/notifications/updatestatus", AuthMiddleware, updateReadStatus);
  app.delete("/ngo/notifications/delete", AuthMiddleware, deleteNotification);
};

module.exports = NotificationRoutes;
