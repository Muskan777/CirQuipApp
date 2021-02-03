const mongoose = require("mongoose");

const MessageScehema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("messages", MessageScehema);
