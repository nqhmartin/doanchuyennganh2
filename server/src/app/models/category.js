const moongse = require("mongoose")

const categoryScheme = new moongse.Schema({
    categoryName : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = moongse.model("category", categoryScheme)