const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");
const auth = require("../middlewares/auth");
// @route POST api/user/register
// @desc registration of new user

const log = (type, message) => console.log(`[${type}]: ${message}`);
router.post("/register", (req, res) => {
  let { name, phone, college, email, password, role } = req.body;
  phone = parseInt(phone);
  try {
    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).json("Email already exists");
      } else {
        const newUser = new User({
          name,
          phone,
          college,
          email,
          password,
          role,
          Post: [],
        });
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() =>
              res.status(200).send({ msg: "New user created", post: newUser })
            )
            .catch(err => res.status(400).send("Error:" + err));
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

// @route POST api/user/login
// @desc user login for existing user

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  try {
    User.findOne({ email }).then(user => {
      if (!user) {
        return res
          .status(400)
          .send("User with email: " + req.body.email + " not found");
      }
      bcrypt.compare(password, user.password).then(matched => {
        if (matched) {
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
          };
          jwt.sign(
            payload,
            keys.jwtSecretKey,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (token) {
                res.status(200).json({
                  token: token,
                  msg: "User successfully logged in",
                });
              } else {
                res.status(400).json(err);
              }
            }
          );
        } else {
          return res.status(400).send("Incorrect password");
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// @route GET api/user/getUserWithEmail/{email}
// @desc get all details of user when supplied with id of that user

router.get("/getUserWithId/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    log("user", user[0]);
    return res.status(200).json({ ...user[0]._doc, password: "" });
  } catch (err) {
    log("user fetch", err);
    res.status(400).json(err);
  }
});

router.route("/getUsers").get((req, res) => {
  try {
    User.find()
      .then(post => res.status(200).send({ post: post }))
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

router.post("/verifyJWT", auth, (req, res) => {
  req.payload
    ? res.status(200).json(req.payload.id)
    : res.status(400).json("Token Invalid");
});
module.exports = router;
