const catchAsync = require("../helpers/catchAsync");
const Cart = require("../models/Cart");
const Stripe = require("stripe");

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
