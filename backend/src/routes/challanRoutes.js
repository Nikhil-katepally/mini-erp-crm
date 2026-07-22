const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  createChallan,
  getAllChallans,
  getChallanById,
  confirmChallan,
} = require("../controllers/challanController");

router.post("/", authenticate, createChallan);
router.get("/", authenticate, getAllChallans);
router.get("/:id", authenticate, getChallanById);
router.put("/:id/confirm", authenticate, confirmChallan);

module.exports = router;