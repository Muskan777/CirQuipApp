const User = require("../models/user");
const axios = require("axios");
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
            type: dataPayload.type,
            uid: dataPayload.uid,
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = {
  addNotificationToken,
  sendNotifications,
};
