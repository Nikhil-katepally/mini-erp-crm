const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;


const authenticate = require("../middleware/authMiddleware");

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});