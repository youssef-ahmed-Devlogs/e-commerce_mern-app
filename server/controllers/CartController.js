const catchAsync = require("../helpers/catchAsync");
const Cart = require("../models/Cart");

exports.getMyCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: cart.length,
    data: cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.create({
    product: req.body.product,
    user: req.user._id,
    quantity: req.body.quantity,
  });

  res.status(201).json({
    status: "success",
    data: cart,
  });
});

exports.updateMyCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    {
      product: req.params.productId,
      user: req.user._id,
    },
    req.body,
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  await Cart.findOneAndDelete({
    product: req.params.productId,
    user: req.user._id,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
