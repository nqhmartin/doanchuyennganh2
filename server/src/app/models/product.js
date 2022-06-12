const { default: mongoose } = require("mongoose")
const moongse = require("mongoose")

const productSchema = new moongse.Schema({
    productname : {
        type: String,
        required: true,

    },
    categoryName: {
        type: String,
        required: true,
    },
    desc : {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    imgpro : {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("product", productSchema)