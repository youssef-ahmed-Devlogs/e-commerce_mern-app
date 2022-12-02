const catchAsync = require("../helpers/catchAsync");
const User = require("../models/User");
const FactoryController = require("./FactoryController");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

exports.get = FactoryController.get(User);
exports.getOne = FactoryController.getOne(User);
exports.create = FactoryController.create(User);
exports.update = FactoryController.update(User);
exports.delete = FactoryController.delete(User);

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please provide a valid image ( jpg, jpeg, png)"), true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");
exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/storage/users/${req.file.filename}`);

  // Delete old photo
  const path = `public/storage/users/${req.user.photo}`;
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  req.body.password = undefined;
  req.body.passwordConfirm = undefined;

  // If there's an image file
  if (req.file && req.file.filename) req.body.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully.",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
});
