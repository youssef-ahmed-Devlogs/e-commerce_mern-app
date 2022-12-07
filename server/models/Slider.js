const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required."],
  },
  content: {
    type: String,
    required: [true, "Content field is required."],
  },
  image: {
    type: String,
    required: [true, "Image field is required."],
  },
  Order: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Slider = mongoose.model("Slider", schema);

module.exports = Slider;
