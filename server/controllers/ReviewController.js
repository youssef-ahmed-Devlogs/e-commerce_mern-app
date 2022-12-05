const FactoryController = require("./FactoryController");
const Review = require("../models/Review");
const catchAsync = require("../helpers/catchAsync");

exports.checkBelongTo = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  const check = review.createdBy._id.toString() == req.user._id.toString();
  if (!check) return next(new Error("You don't have permission to do this."));
  next();
});

exports.get = FactoryController.get(Review);
exports.getOne = FactoryController.getOne(Review);
exports.create = FactoryController.create(Review);
exports.update = FactoryController.update(Review);
exports.delete = FactoryController.delete(Review);
