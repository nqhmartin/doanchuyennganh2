const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user/:id", authController.getUser);
router.get("/all", authController.getAll);
router.put("/user/:id", authController.updateUser);
router.delete("/user/:id", authController.deleteUser);

module.exports = router;
