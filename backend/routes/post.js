const router = require("express").Router();
let Post = require("../models/Post");

// @route GET /api/post/getPosts
// @desc Get all existing posts

router.route("/getPosts").get((req, res) => {
  try {
    Post.find()
      .then(post => res.status(200).send({ post: post }))
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route POST /api/post/createPost
// @desc Creates new post

router.route("/createPost").post((req, res) => {
  let { content, caption } = req.body;
  const createdAt = Date.now();

  const newPost = new Post({
    content,
    caption,
    likes: 0,
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
  let { content, caption, likes, comments } = req.body;
  likes = parseInt(likes);
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    Post.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { content, caption, likes, comments } }
    )
      .then(() => res.status(200).send("Post updated"))
      .catch(err => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route DELETE /api/post/deletePost
// @desc Deletes existing post

router.route("/deletePost").delete(async (req, res) => {
  try {
    let post = await Post.findById(req.body.id);
    if (!post) {
      res.status(400).send("Post with id not found");
    }
    Post.findByIdAndDelete(req.body.id)
      .then(() => res.status(200).send("Post deleted"))
      .catch(err => res.status(400).send("Error:" + err));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
