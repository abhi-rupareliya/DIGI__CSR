const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
  ],
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
