const router = require("express").Router();
let Post = require("../models/Post");
let User = require("../models/user");
let Comment = require("../models/Comments");
const auth = require("../middlewares/auth");
const { s3 } = require("../config/config");
const ObjectId = require("mongodb").ObjectId;
const notifUtils = require("./notifUtils");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/Post");

// @route GET /api/post/getPosts
// @desc Get all existing posts

router.route("/getPosts").get(auth, (req, res) => {
  try {
    Post.find()
      .then(post => {
        let arr = [];
        post.map(doc => {
          for (var i = 0; i < doc.group.length; i++) {
            if (doc.group[i] === req.payload.role) {
              arr.push(doc);
              break;
            }
          }
        });
        console.log(arr);
        res.status(200).send({ post: arr });
      })
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

router.route("/reportPost").post(auth, (req, res) => {
  console.log("Report");
  console.log(req.body.email);
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "testingotp712@gmail.com",
      pass: "sds@1234",
    },
  });

  var mailOptions = {
    from: '"CirQuip" <testingotp712@gmail.com>', // sender address (who sends)
    to: "cirquip@gmail.com", // list of receivers (who receives)
    subject: "Report Post", // Subject line
    text:
      "User " +
      req.body.email +
      " has reported " +
      req.body.name +
      "'s post! \n" +
      req.body.caption +
      "\n" +
      req.body.URL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

//uploads images to S3 and returns the array of URLs

const uploadImages = async (content, id) => {
  let promises = [];
  if (typeof content !== "string") {
    content
      ? content.forEach((image, index) => {
          if (!image) return;
          promises.push(
            new Promise((resolve, reject) => {
              const buf = Buffer.from(
                image.replace(/^data:image\/\w+;base64,/, ""),
                "base64"
              );

              var params = {
                Bucket: "cirquip",
                Body: buf,
                ContentEncoding: "base64",
                ContentType: "image/jpeg",
                Key: `posts/${id}/${Date.now()}_${index}.jpeg`,
                ACL: "public-read",
              };

              s3.upload(params, async function (err, data) {
                //handle error
                if (err) {
                  console.log("Error", err);
                  reject(err);
                }
                //success
                if (data) {
                  console.log("Uploaded in:", data.Location);
                  resolve(data.Location);
                }
              });
            })
          );
        })
      : "";
  } else {
    // string=> video is stored directly as string
    promises.push(
      new Promise((resolve, reject) => {
        const buf = Buffer.from(content, "base64");

        var params = {
          Bucket: "cirquip",
          Body: buf,
          ContentEncoding: "base64",
          ContentType: "video/mp4",
          Key: `posts/${Date.now()}.mp4`,
          ACL: "public-read",
        };

        s3.upload(params, async function (err, data) {
          //handle error
          if (err) {
            console.log("Error", err);
            reject(err);
          }
          //success
          if (data) {
            console.log("Uploaded in:", data.Location);
            resolve(data.Location);
          }
        });
      })
    );
  }
  return Promise.all(promises);
};

// @route POST /api/post/createPost
// @desc Creates new post

router.route("/createPost").post(auth, async (req, res) => {
  let {
    content,
    caption,
    group,
    taggedUsers,
    userCollege,
    userSkill,
    userInterest,
    userClub,
  } = req.body;
  await uploadImages(content, req.payload.email)
    .then(images => {
      const createdAt = Date.now();
      const newPost = new Post({
        userId: req.payload.id,
        userName: req.payload.name,
        userRole: req.payload.role,
        group,
        userCollege,
        userInterest,
        userSkill,
        userClub,
        content: images,
        caption,
        taggedUsers,
        likes: 0,
        saves: 0,
        shares: 0,
        createdAt,
        comments: [],
      });
      console.log("tagged", taggedUsers);
      try {
        newPost
          .save()
          .then(post => {
            taggedUsers.forEach(user => {
              notifUtils.sendNotifications(user._id, {
                title: `${req.payload.name} tagged you in a post`,
                message: caption,
                uid: post._doc._id,
                type: "post",
              });
            });
            res.status(200).send({ msg: "New post created", post: newPost });
          })
          .catch(err => res.status(400).send("Error:" + err));
      } catch (e) {
        console.log(e);
      }
    })
    .catch(err => {
      console.log(err);
      return resp.status(400).json("Error in uploading images");
    });
});

// @route PATCH /api/post/updatePost
// @desc Updates existing post

router.route("/updatePost").patch(async (req, res) => {
  let { content, caption, comments } = req.body;
  likes = parseInt(likes);
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    Post.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { content, caption, comments } }
    )
      .then(post => res.status(200).send({ post: post, msg: "Post updated" }))
      .catch(err => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/post/likePost
// @desc like funcionality for existing post

router.route("/likePost").patch(auth, async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    console.log(Object.keys(post));
    const userId = post._doc.userId;
    const title = post._doc.caption;
    if (!post) {
      return res.status(400).send("Post with id not found");
    }
    if (req.body.liked) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { likes: post.likes - 1 } }
      )
        .then(async post => {
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $pull: { likedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post unliked",
              post: post,
              likes: post.likes - 1,
              liked: false,
            });
        })
        .catch(err => res.status(400).send("Error: " + err));
    } else {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { likes: post.likes + 1 } }
      )
        .then(async post => {
          //replace it by fetching and then updating and saving for optimization
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $push: { likedPosts: req.body.id } },
            { new: true }
          )
            .then(user => {
              notifUtils.sendNotifications(userId, {
                title: "Post Liked ❤️",
                message: `${user._doc.name} liked your post ${title}`,
                type: "post",
                uid: req.body.id,
              });
              res.status(200).send({
                msg: "Post liked",
                post: post,
                likes: post.likes + 1,
                liked: true,
              });
            })
            .catch(err => res.status(400).send("Error: " + err));
        })
        .catch(err => res.status(400).send("Error: " + err));
    }
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/post/savePost
// @desc save funcionality for existing post

router.route("/savePost").patch(auth, async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    if (req.body.saved) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { saves: post.saves - 1 } }
      )
        .then(async post => {
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $pull: { savedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post unsaved",
              post: post,
              saves: post.saves - 1,
              saved: false,
            });
        })
        .catch(err => res.status(400).send("Error: " + err));
    } else {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { saves: post.saves + 1 } }
      )
        .then(async post => {
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $push: { savedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post saved",
              post: post,
              saves: post.saves + 1,
              saved: true,
            });
        })
        .catch(err => res.status(400).send("Error: " + err));
    }
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/post/sharePost
// @desc share funcionality for existing post

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

// @route DELETE /api/post/deletePost
// @desc Deletes existing post

router.route("/deletePost").post(auth, async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    let user = await User.findById(ObjectId(post._doc.userId));
    if (!user) throw "User not found";
    let admin = await User.find({ email: "admin@coep.ac.in" });
    let adminId;
    if (admin) {
      adminId = admin._id;
    }
    if (!post) {
      return res.status(400).send("Post with id not found");
    }
    if (req.payload.id === post.userId || req.payload.id === adminId) {
      let images = [];
      post._doc.content.forEach(image => {
        images.push({
          Key: `posts/${user._doc.email}/${image.split("/").splice(-1)}`,
        });
      });
      let params = {
        Bucket: "cirquip",
        Delete: {
          Objects: images,
        },
      };
      try {
        s3.deleteObjects(params).promise();
      } catch (err) {
        console.log(err, err.stack);
        return res.status(400).json("could not delete images");
      }
      Post.findByIdAndDelete(req.body.id)
        .then(() => res.status(200).send("Post deleted"))
        .catch(err => res.status(400).send("Error:" + err));
    } else {
      return res.status(400).send("Unauthorized deletion requested");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

// @route POST /api/post/getComments
// @desc Get comments for post

router.route("/getComments").post(async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    let arr = [];
    for (var i = 0; i < post.comments.length; i++) {
      let tempComment = await Comment.findById(post.comments[i]);
      if (tempComment) {
        arr.push(tempComment);
      }
    }
    res.status(200).send({ comments: arr });
  } catch (e) {
    console.log(e);
  }
});

// @route POST /api/post/getComments
// @desc Get comments for post

router.route("/getPostWithComment/:commentId").get(async (req, res) => {
  await Comment.findById(req.params.commentId)
    .then(async comment => {
      await Post.findById(comment._doc.postId)
        .then(post => {
          res.status(200).json({ post: post._doc, comment: comment });
        })
        .catch(err => {
          res.status(400).send("Error fetching post");
        });
    })
    .catch(err => {
      res.status(400).send("Error fetching comment");
    });
});

router.get("/getPostWithId/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    return res.status(200).json({ post: [post] });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
