const Category = require("../models/category")

class categoryController {
    create = (req, res) => {
        Category.create(req.body)
        .then((result) => {
            res.status(200).json(result)
        })
        .then((err) => {
            console.log(err)
        })

    }

    index = (req, res) => {
        Category.find()
        .then((result) => {
            res.status(200).json(result)
        })
        .then((err) => {
            console.log(err)
        })
    }

    delete = (req, res) => {
        Category.findByIdAndDelete({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .then((err) => {
            console.log(err)
        })
    }

}

module.exports = new categoryController