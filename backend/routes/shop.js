const router = require("express").Router();
const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");

const log = (type, message) => console.log(`[${type}]: ${message}`);

// @route GET api/shop/products/type
// @desc get the products available for sale depending on type {type = all for all products}

router.get("/products/:type", async (req, res) => {
  try {
    //const data = await Shop.find({});
    log("products data", data);
    return res.status(200).json(data);
  } catch (err) {
    log("get products", err);
    return res.status(400).json(err);
  }
});

module.exports = router;
