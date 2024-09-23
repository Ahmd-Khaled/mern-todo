const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  getUserDetails,
  deleteUser,
  updateUser,
} = require("../controllers/authenticationController");

const { signupValidator, loginValidator } = require("../utils/authenticationSchema");

const router = express.Router();

// Get Users
router.get("/", getAllUsers);

// Get User Details
router.get("/:id", getUserDetails);

// Delete User
router.delete("/:id", deleteUser);

// Update User
router.patch("/:id", updateUser);

// Signup
router.post("/", signupValidator, signup);

// login
router.post("/login", loginValidator, login);

module.exports = router;
