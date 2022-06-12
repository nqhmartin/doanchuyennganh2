const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const feedController = require("../app/controllers/feedController");
router.post("/", upload.single("image"), feedController.create);
router.get("/", feedController.index);
router.delete("/:id", feedController.delete);

module.exports = router;
