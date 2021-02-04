const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
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
