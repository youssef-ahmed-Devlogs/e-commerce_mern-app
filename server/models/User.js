const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: false,
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
  passwordChangedAt: Date,
  verifyEmailToken: String,
  verifyEmailExpires: Date,
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

const User = mongoose.model("User", schema);

module.exports = User;
