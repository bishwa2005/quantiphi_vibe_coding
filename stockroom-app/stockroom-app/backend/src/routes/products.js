const express = require("express");
const { getProducts, getMeta } = require("../controllers/productsController");

const router = express.Router();

// IMPORTANT: /meta must be registered before the (currently absent) /:id
// style routes to avoid being swallowed by a param route in the future.
router.get("/meta", getMeta);
router.get("/", getProducts);

module.exports = router;
