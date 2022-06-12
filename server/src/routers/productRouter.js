const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/productController");
const upload = require("../middleware/upload");
router.post("/", upload.single("imgpro"), productController.create);
router.get("/", productController.index);
router.delete("/:id", productController.delete);
router.get("/search/:product", productController.search);
router.put("/:id", productController.update);
router.get("/:id", productController.indexOne);

module.exports = router;
