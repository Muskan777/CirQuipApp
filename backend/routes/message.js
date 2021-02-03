const router = require("express").Router();
let Message = require("../models/message");
const auth = require("../middlewares/auth");

// @route GET /api/message/getMessages
// @desc Get all existing messages

router.route("/getMessages").get((req, res) => {
  try {
    Message.find()
      .then(messages => res.status(200).send({ messages: messages }))
      .catch(err => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

router.route("/saveMessages").post((req, res) => {
  console.log("Before Message");
  NewMessage = new Message({
    ...req.body,
  });
  console.log("After Message", NewMessage);
  console.log(req.body);

  try {
    NewMessage.save()
      .then(() =>
        res
          .status(200)
          .send({ msg: "New message created", Message: NewMessage })
      )
      .catch(err => res.status(400).send("Error:" + err));
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = router;
