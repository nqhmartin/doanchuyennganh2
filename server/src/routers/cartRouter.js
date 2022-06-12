const express = require("express")
const router = express.Router()
const cartController = require("../app/controllers/cartController")


router.post("/", cartController.create)
router.get("/show/:name", cartController.show)
router.delete("/delete/:id", cartController.delete)
router.put("/:id", cartController.update)
router.delete("/deleteall/:user",cartController.deleteAll)


module.exports= router