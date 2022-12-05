const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content field is required."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belongs to user."],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Review must belongs to product."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

schema.index({ createdBy: 1, product: 1 }, { unique: true });

schema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "username photo",
  }).populate({
    path: "product",
    select: "title price",
  });
  next();
});

const Review = mongoose.model("Review", schema);

module.exports = Review;
