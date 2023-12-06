const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const { auth, loginValidator, registerValidator } = require("../middlewares");

router.post("/login", loginValidator, UserController.login);
router.post("/register", registerValidator, UserController.register);

// protected route
router.get("/", auth, UserController.detail);
router.put("/", auth, UserController.update);
router.delete("/", auth, UserController.delete);

module.exports = router;
