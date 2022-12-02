const catchAsync = require("../helpers/catchAsync");
const User = require("../models/User");
const FactoryController = require("./FactoryController");
const multer = require("multer");
const resizeImage = require("../helpers/resizeImage");
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

exports.updateMe = catchAsync(async (req, res, next) => {
  // check when user upload image and set req.body.photo
  if (req.file) {
    req.body.photo = `users-${req.user._id}-${Date.now()}.jpeg`;
  }

  req.body.password = undefined;
  req.body.passwordConfirm = undefined;

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
  });

  // check when user upload image
  if (req.file) {
    const path = `public/storage/users`;

    if (
      !user.photo.startsWith("default") &&
      fs.existsSync(`${path}/${user.photo}`)
    ) {
      // delete the old image
      fs.unlinkSync(`${path}/${user.photo}`);
    }

    // resize the photo
    const resized = resizeImage(req, {
      width: 500,
      height: 500,
      quality: 90,
    });

    // upload the photo after resized it
    await resized.toFile(`${path}/${req.body.photo}`);
  }

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
