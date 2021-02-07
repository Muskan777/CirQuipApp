const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("comments", CommentSchema);
