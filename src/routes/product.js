const express = require("express");
const router = express();

const {
    create,
    getAll,
    getSpesific,
    update,
    deleteProduct,
} = require("../controllers/product");
const auth  = require("../middlewares/auth");

// protected route
router.get("/", auth, getAll);
router.get("/:id",auth, getSpesific);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
