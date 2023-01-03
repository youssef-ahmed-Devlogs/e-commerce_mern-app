const mongoose = require("mongoose");
const slugify = require("../helpers/slugify");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required."],
    unique: true,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "Price field is required."],
  },
  description: String,
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  images: {
    type: [String],
    required: [true, "Images field is required."],
  },
  rating: {
    rate: Number,
    count: Number,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

schema.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "title",
  }).populate({
    path: "createdBy",
    select: "username",
  });
  next();
});

schema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

schema.post(/update/i, async function () {
  const product = await this.model.findOne(this.getQuery());
  product.slug = slugify(product.title);
  product.save();
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
