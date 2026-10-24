
const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const {
  getAllUsers,
  updateUserStatus,
} = require("../controllers/adminController");

const router = express.Router();

// All routes below require super_admin authentication
router.use(protect, authorizeRoles("super_admin"));

// Existing admin dashboard
router.get("/dashboard", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the GreenCity AI admin dashboard",
    user: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

// View all users
router.get("/users", getAllUsers);

// Activate or deactivate a user
router.patch("/users/:id/status", updateUserStatus);

module.exports = router;
