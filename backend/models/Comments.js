const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    createdAt: { 
        type: Date, default: Date.now 
    }
})

module.exports = mongoose.model("post", PostSchema);