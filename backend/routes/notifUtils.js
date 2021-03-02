const User = require("../models/user");
const axios = require("axios");
const config = require("config");
/*
 * firebase account for notification
 * email - testingotp712@gmail.com
 * password - sds@1234
 * project - criquip-test
 */
var serviceAccount = require("../config/firebase-keys.json");
const addNotificationToken = async (token, userId) => {
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { notifTokens: token } });
    return true;
  } catch (err) {
    return false;
  }
};
const sendNotifications = async (
  authPayload,
  dataPayload = { title: "", message: "", type: "", uid: "" },
  access = true
) => {
  if (!authPayload) return;
  let tokens = [];
  if (access) {
    console.log(authPayload);
    const user = await User.findById(authPayload);
    if (!user) {
      console.log("notif:no user found");
      return;
    }
    tokens = user._doc.notifTokens;
  } else {
    tokens = authPayload;
  }
  if (!tokens || !tokens.length) return;

  let users = Array.from(new Set(tokens.filter(Boolean)));
  users.forEach(async token => {
    await axios
      .post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: token,
          data: {
            ...dataPayload,
          },
          title: dataPayload.title,
          body: dataPayload.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const sendChatNotification = async msg => {
  console.log(msg.to === "Admin", msg.to);
  console.log(msg.user._id === "Admin", msg.user._id);
  const userTo = await User.findOne({
    email: msg.to === "Admin" ? config.get("admin") : msg.to,
  });
  const userFrom = await User.findOne({
    email: msg.user._id === "Admin" ? config.get("admin") : msg.user._id,
  });
  //console.log(userTo, userFrom);
  sendNotifications(userTo._doc._id, {
    title: `${userFrom._doc.name} ${msg.user._id === "Admin" ? "| Admin" : ""}`,
    message: `${msg.text}`,
    type: `${msg.to === "Admin" ? "chat-user" : "chat-admin"}`,
    email: userTo._doc.email,
    thread: {
      _id: userTo._doc.email,
      name: userTo._doc.name,
      role: userTo._doc.role,
    },
  });
};

module.exports = {
  addNotificationToken,
  sendNotifications,
  sendChatNotification,
};
