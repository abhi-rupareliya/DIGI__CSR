const Notification = require("../Models/Notification");
exports.GetNgoNotification = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid ID parameter" });
    }

    const notifications = await Notification.find(
      { recipients: { $in: id } },
      {
        content: 1,
        timestamp: 1,
        read: 1,
      }
    );
    if (!notifications) {
      return res
        .status(404)
        .send({ success: false, message: "No notifications found" });
    }
    // let response = [];
    // for (const notification of notifications) {
    //   response.push({
    //     title: notification.content,
    //     read: notification.read,
    //   });
    // }
    return res
      .status(200)
      .send({ success: true, notifications: notifications });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};
