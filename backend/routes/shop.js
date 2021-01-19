const router = require("express").Router();
const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");
const User = require("../models/user");
const log = (type, message) => console.log(`[${type}]: ${message}`);

// @route POST api/shop/products/type
// @desc get the products available for sale depending on type {type = all for all products}

router.post("/products/:type", async (req, resp) => {
  const type = req.params.type;
  console.log(type);
  switch (type) {
    case "liked": {
      const { id } = req.body;
      try {
        const user = await User.findOne({ _id: id });
        if (!user._doc.likes || user._doc.likes.length === 0)
          return resp.status(200).json([]);
        const products = await Shop.find({
          _id: { $in: user._doc.likes },
        });
        log("products", products);
        return resp.status(200).json(products);
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error Saving data");
      }
    }

    default: {
      try {
        const data = await Shop.find({});
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
module.exports = router;
