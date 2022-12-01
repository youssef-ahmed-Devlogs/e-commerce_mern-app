const catchAsync = require("../helpers/catchAsync");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require("../helpers/Email");
const crypto = require("crypto");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Get old access tokens and check if expires
const checkAccessTokensExpires = (user) => {
  return (
    user.accessTokens.filter((t) => {
      const timeDiff =
        parseInt(Date.now() / 1000, 10) - parseInt(t.iat.getTime() / 1000, 10); // milliseconds / 1000 = seconds
      if (timeDiff < 172800) return t; // 172800 is 2 days in seconds 2d * 24h * 60m * 60s = 172800s
    }) || []
  );
};

const createRandomToken = () => {
  const token = crypto.randomBytes(32);
  return crypto.createHash("sha256").update(token).digest("hex");
};

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const verifyEmailToken = req.params.token || "no token";
  const user = await User.findOne({ verifyEmailToken });

  if (!user) {
    return next(new Error("This user is not exists or Invalid token"));
  }

  if (user.verifyEmailExpires.getTime() < Date.now())
    return next(new Error("This token is expires"));

  const token = signToken({ id: user._id });

  // Send welcome email

  user.verifyEmailToken = undefined;
  user.verifyEmailExpires = undefined;
  user.active = true;
  await user.save();

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  /**
   * Date.now() + (10 * 60 * 1000)
   * 10 minutes
   * 10 * 60 = 600 seconds
   * 600 * 1000 = 600000 milliseconds
   */

  // create verify email link
  const verifyEmailToken = createRandomToken();
  const verifyEmailExpires = Date.now() + 10 * 60 * 1000;

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    verifyEmailToken,
    verifyEmailExpires,
  });

  const link = `${req.protocol}://${req.headers.host}/api/v1/users/verifyEmail/${verifyEmailToken}`;
  await new Email(user, link).sendVerifyEmail();

  res.status(201).json({
    status: "success",
    message:
      "Please check your email to verify the account. The verify token link is valid for 10 minutes!",
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

  if (!user.active) {
    return next(new Error("Please check your email to verify the account."));
  }

  const token = signToken({ id: user._id });

  // Get old access tokens and check if expires
  let oldAccessTokens = checkAccessTokensExpires(user);

  // Prepare add new access token and old
  const accessTokens = [
    ...oldAccessTokens,
    {
      val: token,
      iat: Date.now(),
    },
  ];

  await User.findByIdAndUpdate(user._id, { accessTokens });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new Error("You are not logged in."));

  const newTokens = req.user.accessTokens.filter((t) => t.val != token);
  await User.findByIdAndUpdate(req.user._id, { accessTokens: newTokens });

  res.status(201).json({
    status: "success",
    message: "You are logged out successfully.",
  });
});

// forgot password => email
// reset password => reset link with token

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

  // Get old access tokens and check if expires
  let oldAccessTokens = checkAccessTokensExpires(user);
  await User.findByIdAndUpdate(user._id, { accessTokens: oldAccessTokens });

  // Check if current token in authorization header is in user access tokens in database
  const checkTokens = oldAccessTokens.filter((t) => t.val == token);

  if (!checkTokens.length) return next(new Error("You are not logged in."));

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
