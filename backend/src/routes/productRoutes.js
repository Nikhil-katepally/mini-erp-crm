const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  lowStockProducts,
} = require("../controllers/productController");

router.post("/", authenticate, createProduct);

router.get("/", authenticate, getProducts);

router.get("/search", authenticate, searchProducts);

router.get("/low-stock", authenticate, lowStockProducts);

router.get("/:id", authenticate, getProductById);

router.put("/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

module.exports = router;