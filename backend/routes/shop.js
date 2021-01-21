const router = require("express").Router();
const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");
const User = require("../models/user");
const log = (type, message) => console.log(`[${type}]: ${message}`);
//const ObjectId = require("mongodb").ObjectID;

/*
 * @route POST api/shop/products/type
 * @desc get the products available for sale depending on type
 * {type = all {default} | liked | my}
 */

router.post("/products/:type", async (req, resp) => {
  const type = req.params.type;
  const { id } = req.body;
  console.log(type);
  switch (type) {
    case "my": {
      try {
        const products = await Shop.find({
          seller: id,
        });
        //log("products", products);
        return resp.status(200).json(products);
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error Retreieving data");
      }
    }
    case "requests": {
      try {
        const products = await Shop.find({
          seller: id,
          reserved: { $exists: true },
        });
        //log("products", products);
        return resp.status(200).json(products);
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error Retreieving data");
      }
    }

    case "liked": {
      try {
        const user = await User.findOne({
          _id: id,
          reserved: { $exists: false },
          seller: { $ne: id },
        });
        if (!user._doc.likes || user._doc.likes.length === 0)
          return resp.status(200).json([]);
        const products = await Shop.find({
          _id: { $in: user._doc.likes },
        });
        log("products", products);
        return resp.status(200).json(products);
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error retreiving data at the moment");
      }
    }

    default: {
      try {
        const data = await Shop.find({ reserved: { $exists: false } });
        //log("products data", data);
        return resp.status(200).json(data);
      } catch (err) {
        log("get products", err);
        return resp.status(400).json(err);
      }
    }
  }
});

// @route POST api/shop/addProduct
// @desc add a new prodcut for sale

router.post("/addProduct", async (req, resp) => {
  const { pName, pPrice, image, pDetails, id } = req.body;
  const prodcut = new Shop({
    seller: id,
    name: pName,
    info: pDetails,
    price: pPrice,
    image: image,
  });
  try {
    await prodcut.save();
    return resp.status(200).json("Success");
  } catch (err) {
    console.log(err);
    return resp.status(400).json("Error Saving data");
  }
});

// @route PUT api/shop/like
// @desc like a product

router.put("/like", async (req, resp) => {
  const { user, productId } = req.body;
  console.log(user, productId);
  try {
    await User.findOneAndUpdate({ _id: user }, { $push: { likes: productId } });
    return resp.status(200).json("Success");
  } catch (err) {
    console.log(err);
    return resp.status(400).json("Error Saving data");
  }
});

// @route PUT api/shop/dislike
// @desc dislike a product
router.put("/dislike", async (req, resp) => {
  const { user, productId } = req.body;
  console.log(user, productId);
  try {
    await User.findOneAndUpdate({ _id: user }, { $pull: { likes: productId } });
    return resp.status(200).json("Success");
  } catch (err) {
    console.log(err);
    return resp.status(400).json("Error Saving data");
  }
});

// @route POST api/shop/buy
// @desc to buy a product
router.post("/buy", async (req, resp) => {
  const { user, productId } = req.body;
  console.log(user, productId);
  try {
    await Shop.findByIdAndUpdate(productId, { reserved: user });
    return resp.status(200).json("success");
  } catch (err) {
    log("Buy", err);
    return resp.status(400).json(err);
  }
});

// @route post api/shop/revoke
// @desc to revoke a buy request
router.put("/revoke/:productId", async (req, resp) => {
  const productId = req.params.productId;
  Shop.findById(productId, (err, product) => {
    if (err) throw err;
    product.set("reserved", undefined, { strict: false });
    product
      .save()
      .then(res => {
        return resp.status(200).json("success");
      })
      .catch(err => {
        log("revoke save error", err);

        return resp.status(400).json(err);
      });
  });
});

// @route post api/shop/sell
// @desc to mark a product as sold
router.delete("/sell/:productId", async (req, resp) => {
  const productId = req.params.productId;
  log("sell id", productId);
  try {
    await Shop.findByIdAndDelete(productId);
    return resp.status(200).json("success");
  } catch (err) {
    log("sell", err);
    return resp.status(400).json(err);
  }
});
module.exports = router;
