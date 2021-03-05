const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");
const auth = require("../middlewares/auth");
const emailHandler = require("./email");
const notifUtils = require("./notifUtils");
const { s3 } = require("../config/config");
// @route POST api/user/register
// @desc registration of new user

const log = (type, message) => console.log(`[${type}]: ${message}`);
router.post("/register", (req, res) => {
  let { firstname, lastname, phone, college, email, password, role } = req.body;
  let name = firstname + " " + lastname;
  phone = parseInt(phone);
  let num = Math.floor(Math.random() * 10000).toString();
  console.log(num);
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
          admissionYear: 1970,
          branch: "",
          title: "",
          projects: [],
          skills: [],
          clubs: [],
          posts: [],
          likedPosts: [],
          savedPosts: [],
          verified: false,
          otp: num,
          sharedPosts: [],
          profileImage: null,
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
        emailHandler.email(newUser.email, newUser.otp);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

// @route POST api/user/login
// @desc user login for existing user

router.post("/login", (req, res) => {
  let { email, password, notifToken: token = null } = req.body;

  console.log(email, password, token);
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
            email: user.email,
            phone: user.phone,
            likedPosts: user.likedPosts,
            savedPosts: user.savedPosts,
            sharedPosts: user.sharedPosts,
            profileImage: user.profileImage,
          };
          if (token) notifUtils.addNotificationToken(token, user.id);
          jwt.sign(
            payload,
            keys.jwtSecretKey,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (token) {
                res.status(200).json({
                  ...user._doc,
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

router.post("/verifyJWT", auth, (req, res) => {
  req.payload
    ? res.status(200).json(req.payload.id)
    : res.status(400).json("Token Invalid");
});

router.route("/sharePost").patch(auth, async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    if (req.body.shared) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { shares: post.shares - 1 } }
      )
        .then(async post => {
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $pull: { sharedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post unshared",
              post: post,
              shares: post.shares - 1,
              shared: false,
            });
        })
        .catch(err => res.status(400).send("Error: " + err));
    } else {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { shares: post.shares + 1 } }
      )
        .then(async post => {
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $push: { sharedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post shared",
              post: post,
              shares: post.shares + 1,
              shared: true,
            });
        })
        .catch(err => res.status(400).send("Error: " + err));
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/updateUserData").patch(async (req, res) => {
  // console.log("Update!", req.body.user);

  try {
    await User.findOneAndUpdate(
      { email: req.body.user.email },
      {
        $set: {
          name: req.body.user.name,
          phone: req.body.user.phone,
          email: req.body.user.email,
          role: req.body.user.role,
          admissionYear: req.body.user.admissionYear,
          branch: req.body.user.branch,
          projects: req.body.user.projects,
          title: req.body.user.title,
          skills: req.body.user.skills,
          clubs: req.body.user.clubs,
          showContact: req.body.user.showContact,
          showEmail: req.body.user.showEmail,
          profileImage: req.body.user.profileImage,
        },
      }
    )
      .then(() => {
        console.log("Done");
      })
      .catch(err => res.status(400).send("Error: " + err));
  } catch {
    e => console.log("Error", e);
  }
});

// @route GET /api/user/getUsers
// @desc Get all existing users

router.route("/getUsers").get((req, res) => {
  try {
    User.find()
      .then(user => res.status(200).send({ users: user }))
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/user/updateUser
// @desc Updates user profile

router.route("/updateUser").patch(auth, async (req, res) => {
  let { admissionYear, branch, title, projects, clubs, skills } = req.body;
  admissionYear = parseInt(admissionYear);
  try {
    User.findOneAndUpdate(
      { _id: req.payload.id },
      { $set: { admissionYear, branch, title, projects, clubs, skills } }
    )
      .then(() => res.status(200).send("User updated"))
      .catch(err => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route post /api/user/resendOtp
router.route("/resendOtp").post(auth, async (req, res) => {
  let { email, otp } = req.body;
  try {
    if (email) {
      emailHandler.email(email, otp);
      return res.status(200).send("Resent successfully!");
    } else {
      return res.status(400).send("Invalid body!");
    }
  } catch (e) {
    console.log(e);
  }
});
// @route GET /api/user/getLikedPosts
// @desc Gets posts liked by user

router.route("/getLikedPosts").get(auth, async (req, res) => {
  try {
    User.findOne({ _id: req.payload.id })
      .then(user => {
        if (user) {
          return res.status(200).send({
            likedPosts: user.likedPosts,
            savedPosts: user.savedPosts,
            sharedPosts: user.sharedPosts,
          });
        } else {
          return res.status(400).send("User not found");
        }
      })
      .catch(err => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});
// @route PATCH /api/user/verify

router.patch("/verify/:email", async (req, res) => {
  let email = req.params.email;
  console.log(email);
  try {
    if (email !== undefined) {
      User.findOneAndUpdate({ email: email }, { $set: { verified: true } })
        .then(() => res.status(200).send("Verified"))
        .catch(err => res.status(400).send("Error: " + err));
    } else {
      res.status(400).send("Invalid email!");
    }
  } catch (e) {
    console.log(e);
  }
});

// @route DELETE /api/user/deleteUser
// @desc Deletes existing user

router.route("/deleteUser").delete(auth, async (req, res) => {
  try {
    let user = await User.findById(req.body.id);
    let admin = await User.find({ email: "admin@coep.ac.in" });
    let adminId = admin[0]._id;
    if (!user) {
      return res.status(400).send("User with id not found");
    }
    if (req.payload.id === `${user._id}` || req.payload.id === adminId) {
      User.findByIdAndDelete(req.body.id)
        .then(() => res.status(200).send("User deleted"))
        .catch(err => res.status(400).send("Error:" + err));
    } else {
      return res.status(400).send("Unauthorized deletion requested");
    }
  } catch (e) {
    console.log(e);
  }
});
//to be tested !!
router.post("/removeNotificationId", async (req, res) => {
  const { id: username, notifToken: notification_id } = req.body;
  // console.log(username, notification_id);
  if (!username || !notification_id) {
    return res.status(400).json("parameters missing");
  }
  try {
    await User.findById(username, async (err, resp) => {
      if (
        resp._doc.notification_id &&
        resp._doc.notification_id.includes(notification_id)
      ) {
        // console.log("ITS HERE");
        var idx = resp._doc.notification_id.indexOf(notification_id);
        resp._doc.notification_id.splice(idx, 1);
        // console.log(resp);
        resp.markModified("notification_id");
        resp.save(function (err) {
          if (err) {
            return res.status(400).json(err);
          } else {
            console.log("SUCCESS");
          }
        });
      }
      return res.status(200);
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});
module.exports = router;
