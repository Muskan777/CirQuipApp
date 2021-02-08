const router = require("express").Router();
let Post = require("../models/Post");
let User = require("../models/user");
let Comment = require("../models/Comments");
const auth = require("../middlewares/auth");

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
        res.status(200).send({ post: arr });
      })
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route POST /api/post/createPost
// @desc Creates new post

router.route("/createPost").post(auth, (req, res) => {
  let { content, caption, group, taggedUsers } = req.body;
  const createdAt = Date.now();
  const newPost = new Post({
    userId: req.payload.id,
    userName: req.payload.name,
    userRole: req.payload.role,
    group,
    content,
    caption,
    taggedUsers,
    likes: 0,
    saves: 0,
    shares: 0,
    createdAt,
    comments: [],
  });

  try {
    newPost
      .save()
      .then(() =>
        res.status(200).send({ msg: "New post created", post: newPost })
      )
      .catch(err => res.status(400).send("Error:" + err));
  } catch (e) {
    console.log(e);
  }
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
          await User.findOneAndUpdate(
            { _id: req.payload.id },
            { $push: { likedPosts: req.body.id } }
          ),
            res.status(200).send({
              msg: "Post liked",
              post: post,
              likes: post.likes + 1,
              liked: true,
            });
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

router.route("/deletePost").delete(auth, async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    let admin = await User.find({ email: "admin@coep.ac.in" });
    let adminId = admin[0]._id;
    if (!post) {
      return res.status(400).send("Post with id not found");
    }
    if (req.payload.id === post.userId || req.payload.id === adminId) {
      Post.findByIdAndDelete(req.body.id)
        .then(() => res.status(200).send("Post deleted"))
        .catch(err => res.status(400).send("Error:" + err));
    } else {
      return res.status(400).send("Unauthorized deletion requested");
    }
  } catch (e) {
    console.log(e);
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

module.exports = router;
