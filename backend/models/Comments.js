const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
})

module.exports = mongoose.model("comments", CommentSchema);