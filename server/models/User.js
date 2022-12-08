const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const Review = require("./Review");
const Favorite = require("./Favorite");
const Cart = require("./Cart");
const Order = require("./Order");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name field is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name field is required."],
    },
    username: {
      type: String,
      required: [true, "Username field is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required."],
      unique: true,
      lower: true,
      validate: [isEmail, "Email field must be a valid email."],
    },
    phone: {
      type: String,
      required: [true, "Phone field is required."],
      unique: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    password: {
      type: String,
      required: [true, "Password field is required."],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm field is required."],
      minlength: 8,
      select: false,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same.",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: Number,
      default: 2, // 1 Active || 2 Disabled || 3 Banned
      // select: false,
    },
    address: {
      geoLocation: {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        lat: String,
        long: String,
      },
      city: String,
      street: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    accessTokens: [
      {
        val: String,
        iat: Date,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,
    verifyEmailToken: String,
    verifyEmailExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.virtual("fullName").get(function () {
  return (this.name = `${this.firstName} ${this.lastName}`);
});

schema.methods.compareHashPassword = async function (pass, hashPass) {
  return await bcrypt.compare(pass, hashPass);
};

// iat => token issued at
schema.methods.checkIfPasswordChange = function (iat) {
  if (this.passwordChangedAt) {
    const timestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return timestamp > iat;
  }
  return false;
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

schema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

schema.post("remove", async function (doc) {
  await Review.remove({ createdBy: { $in: doc._id } });
  await Favorite.remove({ user: { $in: doc._id } });
  await Cart.remove({ user: { $in: doc._id } });
  await Order.remove({ user: { $in: doc._id } });
});

const User = mongoose.model("User", schema);

module.exports = User;
