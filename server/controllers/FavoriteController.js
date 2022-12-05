const ApiHandle = require("../helpers/ApiHandle");
const catchAsync = require("../helpers/catchAsync");
const Favorite = require("../models/Favorite");

exports.getFavorites = catchAsync(async (req, res, next) => {
  const apiHandle = new ApiHandle(
    Favorite.find({ user: req.user._id }),
    req.query
  )
    .sort()
    .paginate();
  const favorites = await apiHandle.query;
  res.status(200).json({
    status: "success",
    results: favorites.length,
    page: req.query.page * 1 || 1,
    data: favorites,
  });
});

exports.addToFavorite = catchAsync(async (req, res, next) => {
  const productId = req.body.product;
  const product = await Favorite.create({
    product: productId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: product,
  });
});

exports.removeFromFavorite = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  await Favorite.findOneAndDelete({ product: productId, user: req.user._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
