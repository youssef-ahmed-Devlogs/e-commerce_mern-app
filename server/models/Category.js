const mongoose = require("mongoose");
const slugify = require("../helpers/slugify");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required."],
    unique: true,
  },
  description: String,
  slug: String,
});

schema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

schema.post(/update/i, async function () {
  const category = await this.model.findOne(this.getQuery());
  category.slug = slugify(category.title);
  category.save();
});

const Category = mongoose.model("Category", schema);

module.exports = Category;
