const router = require("express").Router();
let Comment = require("../models/Comments");
let Post = require("../models/Post");
let User = require("../models/user");
const auth = require("../middlewares/auth");
const notifUtils = require("./notifUtils");
// @route POST /api/comment/createComment
// @desc Creates new comment

router.route("/createComment").post(auth, async (req, res) => {
  let { postId, comment } = req.body;
  const createdAt = Date.now();

  const newComment = new Comment({
    userId: req.payload.id,
    userName: req.payload.name,
    userRole: req.payload.role,
    postId,
    comment,
    likes: [],
    createdAt,
  });
  try {
    newComment
      .save()
      .then(async newcomment => {
        await Post.findOneAndUpdate(
          { _id: newcomment.postId },
          { $push: { comments: newcomment._id } }
        )
          .then(post => {
            notifUtils.sendNotifications(post._doc.userId, {
              title: `${req.payload.name} commented on your post ${post._doc.caption}`,
              message: `${comment}`,
              type: "comment",
              uid: newcomment._doc._id,
            });
            res
              .status(200)
              .send({ msg: "New comment created", comment: newComment });
          })
          .catch(err => res.status(400).send("Error:" + err));
      })
      .catch(err => res.status(400).send("Error:" + err));
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/comment/updateComment
// @desc Updates existing comment

router.route("/updateComment").patch(async (req, res) => {
  let { comment, likes } = req.body;
  likes = parseInt(likes);

  try {
    let comments = await Comment.findById(req.body.id);
    if (!comments) {
      res.status(400).send("Comment with id not found");
    }
    Comment.findOneAndUpdate({ _id: req.body.id }, { $set: { comment, likes } })
      .then(() => res.status(200).send("Comment updated"))
      .catch(err => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

// @route PATCH /api/comment/likeComment
// @desc Likes existing comment

router.route("/likeComment").patch(auth, async (req, res) => {
  try {
    let comment = await Comment.findById(req.body.id);
    if (!comment) {
      return res.status(400).send("Comment with id not found");
    }
    if (req.body.liked) {
      Comment.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { likes: req.payload.id } }
      )
        .then(() => {
          res.status(200).send({
            msg: "Comment unliked",
            liked: false,
          });
        })
        .catch(err => res.status(400).send("Error: " + err));
    } else {
      Comment.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { likes: req.payload.id } }
      )
        .then(async comment => {
          //let post = await Post.findById(comment._doc.postId);
          notifUtils.sendNotifications(comment._doc.userId, {
            title: `You received a like ❤️  on your comment`,
            message: `${req.payload.name} liked your comment "${comment.comment}"`,
            uid: req.body.id,
            type: "comment-like",
          });

          res.status(200).send({
            msg: "Comment liked",
            liked: true,
          });
        })
        .catch(err => res.status(400).send("Error: " + err));
    }
  } catch (e) {
    console.log(e);
  }
});

// @route POST /api/comment/deleteComment
// @desc Deletes existing comment
const admin_accounts = ["604e2ec44e3ba4bb03c3da25"];

router.route("/deleteComment").post(auth, async (req, res) => {
  try {
    let comment = await Comment.findById(req.body.id);
    let user = await User.findById(comment._doc.userId);
    if (!user) throw "User not found";
    let admin = await User.find({ email: "admin@coep.ac.in" });
    let adminId;
    if (admin) {
      adminId = admin._id;
    }
    if (!comment) {
      return res.status(404).send("Comment with id not found");
    }
    if (
      req.payload.id === comment._doc.userId ||
      req.payload.id === admin_accounts[0]
    ) {
      Comment.findByIdAndDelete(req.body.id)
        .then(async () => {
          await Post.findOneAndUpdate(
            { _id: comment.postId },
            { $pull: { comments: req.body.id } }
          ),
            res.status(200).send("Comment deleted");
        })
        .catch(err => res.status(400).send("Error:" + err));
    } else {
      return res.status(400).send("Unauthorized deletion requested");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

module.exports = router;
