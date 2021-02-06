const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    userId: {
      type: String,
    },
    userRole: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    likes: {
      type: Number,
    },
    saves: {
      type: Number,
    },
    shares: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    group: {
      type: Array,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { strict: false }
);

module.exports = mongoose.model("posts", PostSchema);
