const mongoose = require("mongoose");

const ProductsScehema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("products", ProductsScehema);
