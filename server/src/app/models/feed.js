const mongoose = require("mongoose");
const FeedSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    avatar: {
      type: String,
    },
    admin: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feed", FeedSchema);
