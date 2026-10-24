
const express = require("express");

const {
  register,
  login,
  getMe,
    updateProfile,
    changePassword,
    logout

} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateProfile);
router.patch("/me/password", protect, changePassword);
router.post("/logout", protect, logout);

module.exports = router;
