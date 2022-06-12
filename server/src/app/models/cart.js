const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productname : {
        type: String,
        required: true,

    },
    productId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
  
    imgpro : {
        type: String,
        required: true,
    }

},{
    timestamps: true
})

module.exports = mongoose.model("cart", cartSchema)