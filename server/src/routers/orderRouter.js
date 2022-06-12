const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/orderController");

router.post("/", orderController.create);
router.get("/all", orderController.indexAll);
router.get("/find/:id", orderController.findId);
router.get("/:name", orderController.index);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
module.exports = router;
