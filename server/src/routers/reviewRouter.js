const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const ReviewController = require("../app/controllers/ReviewController");

router.get("/all", ReviewController.getAll);
router.post("/", upload.single("imgReview"), ReviewController.create);
router.get("/:product", ReviewController.index);
router.delete("/:id", ReviewController.delete);
module.exports = router;
