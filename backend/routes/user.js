const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");

// @route POST api/user/register
// @desc registration of new user

const log = (type, message) => console.log(`[${type}]: ${message}`);
router.post("/register", (req, res) => {
  let { name, phone, college, email, password, password2 } = req.body;
  phone = parseInt(phone);
  try {
    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).send("Email already exists");
      } else {
        const newUser = new User({
          name,
          phone,
          college,
          email,
          password,
          Post: [],
        });
        if (newUser.password === password2) {
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
        } else {
          return res.status(400).send("Passwords do not match");
        }
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
          };
          jwt.sign(
            payload,
            keys.jwtSecretKey,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (token) {
                res.status(200).send({
                  token: token,
                  msg: "User successfully logged in",
                });
              } else {
                res.status(400).send("Err:" + err);
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
// @desc get all details of user when supplied with email of that user

router.get("/getUserWithEmail/:email", async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });
    log("user", user[0]);
    return res.status(200).json({ ...user[0]._doc, password: "" });
  } catch (err) {
    log("user fetch", err);
    res.status(400).json(err);
  }
});
module.exports = router;
