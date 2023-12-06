const express = require("express");
const router = express();

const { landing, getSpesificProduct } = require('../controllers/landing')

router.get('/', landing)
router.get('/:id', getSpesificProduct)

module.exports = router
