const User = require("../models/user");
const axios = require("axios");
const config = require("config");
/*
 * firebase account for notification
 * email - testingotp712@gmail.com
 * password - sds@1234
 * project - criquip-test
 */

const admin_accounts = [
  "cirquip_a1@yahoo.com",

  "cirquip_a2@yahoo.com",

  "cirquip_a3@outlook.com",

  "cirquip_a4@outlook.com",
];
var serviceAccount = require("../config/firebase-keys.json");
const addNotificationToken = async (token, userId, email) => {
  try {
    if (admin_accounts.includes(email))
      await User.findByIdAndUpdate(userId, {
        $addToSet: { notifTokens: token },
      });
    else
      await User.findByIdAndUpdate(userId, { $set: { notifTokens: [token] } });
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
    title: `${msg.user._id === "Admin" ? "Admin" : userFrom._doc.name}`,
    message: `${msg.text}`,
    type: `${msg.to === "Admin" ? "chat-user" : "chat-admin"}`,
    email: userTo._doc.email,
    thread: {
      _id: userFrom._doc.email,
      name: userFrom._doc.name,
      role: userFrom._doc.role,
    },
  });
};

module.exports = {
  addNotificationToken,
  sendNotifications,
  sendChatNotification,
};
