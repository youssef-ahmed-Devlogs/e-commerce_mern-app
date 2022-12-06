const catchAsync = require("../helpers/catchAsync");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Stripe = require("stripe");
const FactoryController = require("./FactoryController");

exports.get = FactoryController.get(Order);
exports.getOne = FactoryController.getOne(Order);
exports.create = FactoryController.create(Order);
exports.update = FactoryController.update(Order);
exports.delete = FactoryController.delete(Order);

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: orders.length,
    page: req.query.page * 1 || 1,
    data: orders,
  });
});

exports.getOneFromMyOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const cart = await Cart.find({ user: req.user._id });

  if (!cart) return next(new Error("Something went wrong."));

  const line_items = cart.map((item) => {
    return {
      price_data: {
        unit_amount: item.product.price * 100,
        currency: "usd",
        product_data: {
          name: `${item.product.title} Product`,
          description: item.product.description,
        },
      },
      quantity: item.quantity,
    };
  });

  const host = `${req.protocol}://${req.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${host}/orders/checkout/success`,
    cancel_url: `${host}/orders/checkout/cancel`,
    customer_email: req.user.email,
    line_items,
  });

  res.status(200).json({
    status: "success",
    data: session,
  });
});
