const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Cart must belongs to user."],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Cart must belongs to product."],
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

schema.index({ user: 1, product: 1 }, { unique: true });

schema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username",
  }).populate({
    path: "product",
    select: "title description price",
  });
  next();
});

const Cart = mongoose.model("Cart", schema);

module.exports = Cart;
