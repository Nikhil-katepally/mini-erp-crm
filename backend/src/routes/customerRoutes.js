const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  addFollowUp,
} = require("../controllers/customerController");

router.post("/", authenticate, createCustomer);

router.get("/", authenticate, getCustomers);

router.get("/search", authenticate, searchCustomers);

router.get("/:id", authenticate, getCustomerById);

router.put("/:id", authenticate, updateCustomer);

router.patch("/:id/followup", authenticate, addFollowUp);

router.delete("/:id", authenticate, deleteCustomer);

module.exports = router;