const router = require("express").Router();
const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");
const User = require("../models/user");
const log = (type, message) => console.log(`[${type}]: ${message}`);
const { s3 } = require("../config/config");
const auth = require("../middlewares/auth");
const notifUtils = require("./notifUtils");
//const ObjectId = require("mongodb").ObjectID;

/*
 * @route POST api/shop/search/query
 * @desc get the products on basis of search query
 */

//router.get("/search/:query", async (req, resp) => {
//const query = req.params.query;
//// '^' + query
//const regex = new RegExp(query, "i");
//try {
//const data = await Shop.find({ name: { $regex: regex } });
//return resp.status(200).json(data);
//} catch (err) {
//log("search", err);
//return resp.status(401).json("Error in searching query");
//}
//});
router.post("/products/:type/:query", async (req, resp) => {
  const query = req.params.query;
  const type = req.params.type;
  const { id } = req.body;
  let regex;
  if (req.header("search")) regex = new RegExp(query, "i");
  else regex = new RegExp(".*");

  console.log(type, regex);
  switch (type) {
    case "my": {
      try {
        const products = await Shop.find({
          seller: id,
          name: { $regex: regex },
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
          name: { $regex: regex },
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
        });
        console.log(user);
        if (!user._doc.likes || user._doc.likes.length === 0)
          return resp.status(200).json([]);
        const products = await Shop.find({
          _id: { $in: user._doc.likes },
          reserved: { $exists: false },
          //seller: { $ne: id },
          name: { $regex: regex },
        });
        //log("products", products);
        return resp.status(200).json(products);
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error retreiving data at the moment");
      }
    }

    default: {
      try {
        const data = await Shop.find({
          reserved: { $exists: false },
          name: { $regex: regex },
        });
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

router.post("/addProduct", auth, async (req, resp) => {
  let { pName, pPrice, image, pDetails, id } = req.body;
  const buf = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  //configuring parameters

  var params = {
    Bucket: "cirquip",
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    Key: `products/${req.payload.email}/${Date.now()}.jpeg`,
    ACL: "public-read",
  };

  s3.upload(params, async function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
      return resp.status(400).json("error in uploading image");
    }
    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
      image = data.Location;
      const product = new Shop({
        seller: id,
        name: pName,
        info: pDetails,
        price: pPrice,
        image: image,
      });
      try {
        await product.save();
        return resp.status(200).json("Success");
      } catch (err) {
        console.log(err);
        return resp.status(400).json("Error Saving data");
      }
    }
  });
});

// @route PUT api/shop/like
// @desc like a product

router.put("/like", async (req, resp) => {
  const { user, productId } = req.body;
  console.log(user, productId);
  try {
    await User.findOneAndUpdate(
      { _id: user },
      { $push: { likes: productId } }
    ).then(async user => {
      const product = await Shop.findById(productId);
      console.log(product);
      notifUtils.sendNotifications(product._doc.seller, {
        title: "Product Liked ❤️ ",
        message: `${user._doc.name} liked your product ${product._doc.name}`,
        uid: productId,
        type: "product",
        ...product._doc,
      });
    });

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
router.post("/sell/:productId", auth, async (req, resp) => {
  const productId = req.params.productId;
  log("sell id", productId);
  try {
    await Shop.findById(productId)
      .then(async product => {
        console.log(product._doc.image);
        console.log(
          `products/${req.payload.email}/${product._doc.image
            .split("/")
            .splice(-1)}`
        );
        var params = {
          Bucket: "cirquip",
          Key: `products/${req.payload.email}/${product._doc.image
            .split("/")
            .splice(-1)}`,
        };
        try {
          s3.deleteObject(params).promise();
        } catch (err) {
          console.log(err, err.stack);
          resp.status(400).json("could not delete product image");
        }
        await Shop.findByIdAndDelete(productId)
          .then(() => {
            return resp.status(200).json("success");
          })
          .catch(err => {
            log("delete", err);
            return resp.status(400).json("Error in deletion");
          });
      })
      .catch(err => {
        log("delete", err);
        return resp.status(400).json("Error in deletion");
      });
  } catch (err) {
    log("sell", err);
    return resp.status(400).json(err);
  }
});
module.exports = router;
