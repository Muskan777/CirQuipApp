const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
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
    createdAt: { 
        type: Date, default: Date.now 
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        }
    ]
})

module.exports = mongoose.model("post", PostSchema);
