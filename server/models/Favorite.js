const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Favorite must belongs to user."],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Favorite must belongs to product."],
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
    select: "title price",
  });
  next();
});

const Favorite = mongoose.model("Favorite", schema);

module.exports = Favorite;
