const User = require("../models/user");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const Joi = require('joi');
const jwt = require('jsonwebtoken');



const signup = async (req, res, next) => {
  const { email, password } = req.body;

//   if (!email || !password) return next(new AppError("User not found", 404));

  // Create user in DB
  // const userCreated = new User({email, password});
  // await userCreated.save()

  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreated = await User.create({
    email: email,
    password: hashedPassword,
  });
  userCreated.password = undefined;
  const token = jwt.sign({ id: userCreated._id }, 'mySecret');
  userCreated.token = token;

  res.send({
    status: true,
    message: "User created successfully",
    data: {userCreated, token},
  });
};

// --------------------------------------------------
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError("User not found", 404));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentials1", 404));

  const isMatch = await bcrypt.compare(password, user.password);
  // const isMatch = await user.checkPassword(password)

  if (!isMatch) return next(new AppError("Invalid credentials2", 404));

  user.password = undefined;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.send({
    status: true,
    message: "User loggedin successfully",
    data: {user, token},
  });
};

// --------------------------------------------------
const getAllUsers = async (req, res, next) => {
  const allUsers = await User.find();

  res.send({
    status: true,
    message: "All users",
    total: allUsers.length,
    data: allUsers,
  });
};

// --------------------------------------------
const getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  const userDetails = await User.findById(id);

  if (!userDetails) return next(new AppError("User not found", 404));

  res.send({
    status: true,
    message: "User details",
    data: userDetails,
  });
};

// -------------------------------------------------------
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userDetails = await User.findByIdAndDelete(id);

  res.send({
    status: true,
    message: "User deleted Successfully",
    data: userDetails,
  });
};

// ------------------------------------------------------------
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const userUpdatedData = await User.findByIdAndUpdate(id, { email, password });

  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 404;
    return next(error);
  }

  if (!password) {
    const error = new Error("Password is required");
    error.statusCode = 404;
    return next(error);
  }

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 404;
    return next(error);
  }

  res.send({
    status: true,
    message: "User updated successfully",
    data: userUpdatedData,
  });
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserDetails,
  deleteUser,
  updateUser,
};
