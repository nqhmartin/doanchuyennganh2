const { default: mongoose } = require("mongoose");
const moongse = require("mongoose");

const orderSchema = new moongse.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Chờ xác nhận",
    },
    payment: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        productname: {
          type: String,
          required: true,
        },
        imgpro: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
