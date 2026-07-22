const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  stockIn,
  stockOut,
  stockHistory,
} = require("../controllers/stockController");

router.post("/in", authenticate, stockIn);

router.post("/out", authenticate, stockOut);

router.get("/history", authenticate, stockHistory);

module.exports = router;