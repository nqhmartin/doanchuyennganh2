const express = require("express")
const router = express.Router()

const categoryController = require("../app/controllers/categoryController")

router.post("/",categoryController.create)
router.get("/",categoryController.index)
router.delete("/:id", categoryController.delete)



module.exports = router