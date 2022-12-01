const catchAsync = require("../helpers/catchAsync");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken({ id: user._id });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    return next(new Error("Please provide email or username."));
  }

  if (!password) {
    return next(new Error("Please provide password."));
  }

  const findQuery = email ? { email: email } : { username: username };

  const user = await User.findOne(findQuery).select("+password");

  if (!user) {
    return next(new Error("This user is not exists."));
  }

  if (!(await user.compareHashPassword(password, user.password))) {
    return next(new Error("Incorrect password."));
  }

  const token = signToken({ id: user._id });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});

exports.auth = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new Error("You are not logged in."));

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(
      new Error("The user belonging to this token does no longer exist.")
    );
  }

  if (user.checkIfPasswordChange(decodedToken.iat)) {
    return next(
      new Error("User recently changed password! Please login again.")
    );
  }

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You doesn't have permission to perform this action.")
      );
    }

    next();
  });
};
