const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Order must belongs to user."],
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Order must belongs to product."],
    },
  ],
  status: {
    type: Number,
    default: 1,
  },
  paidStatus: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: [true, "Total field is required."],
  },
  shippedDate: {
    type: Date,
    required: [true, "Shipped Date field is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

schema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  }).populate({
    path: "products",
  });
  next();
});

const Order = mongoose.model("Order", schema);

module.exports = Order;
