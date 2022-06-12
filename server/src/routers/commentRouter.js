const express = require("express");
const router = express.Router();
const commentController = require("../app/controllers/commentController");

router.post("/", commentController.create);
router.get("/", commentController.index);

module.exports = router;
