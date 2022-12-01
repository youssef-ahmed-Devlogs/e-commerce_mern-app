const catchAsync = require("../helpers/catchAsync");
const User = require("../models/User");
const FactoryController = require("./FactoryController");

exports.get = FactoryController.get(User);
exports.getOne = FactoryController.getOne(User);
exports.create = FactoryController.create(User);
exports.update = FactoryController.update(User);
exports.delete = FactoryController.delete(User);

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
