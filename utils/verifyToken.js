const jwt = require('jsonwebtoken');
const User = require("../models/user");
const AppError = require("./AppError");


module.exports = async (req, res, next) => {
  // 1) get token
  // 2) verify token
  // 3) get user with id from payload
  // 4) attach user to req.user

  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please provide a token", 404));
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: id });
  if (!user) return next(new AppError("Invalid token", 404));
  req.user = user;
  next();
};
