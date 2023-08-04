const express = require("express");
const {
  index,
  getProducts,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();

router
  .get("/", index)
  .get("/products", getProducts)
  .post("/createProduct", createProduct);

module.exports = router;
