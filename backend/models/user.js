const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    role: {
      type: String,
      required: true,
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
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    admissionYear: {
      type: Number,
    },
    branch: {
      type: String,
    },
    title: {
      type: String,
    },
    projects: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    clubs: {
      type: Array,
    },
    Post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { strict: false }
);

module.exports = mongoose.model("users", UserSchema);
