const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  phone: {
    type: String,
    required: true,
    maxLength: 10,
  },
  college: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  password2: {
    type: String,
    required: true,
    minLength: 8,
  },
  token: {
    type: String,
  },
});

UserSchema.pre("save", async (next) => {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    let hash = bcrypt.hash(this.password, 10);
    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (pass, next) {
  try {
    let matched = bcrypt.compare(pass, this.password);
    return matched;
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("users", UserSchema);
