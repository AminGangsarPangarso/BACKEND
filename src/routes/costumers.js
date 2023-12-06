const express = require("express");
const router = express.Router();
const CostumersController = require('../controllers/pengguna')
const { auth, loginValidator, registerValidator } = require("../middlewares");

router.post("/login", loginValidator, CostumersController.login);
router.post("/register", registerValidator, CostumersController.register);

// Protected route
router.get("/", auth, CostumersController.detail);
router.put("/", auth, CostumersController.update);
router.delete("/", auth, CostumersController.delete);

module.exports = router;
