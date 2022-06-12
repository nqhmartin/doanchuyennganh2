const moongse = require("mongoose");

const ReviewSchema = new moongse.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    imgReview: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongse.model("Review", ReviewSchema);
