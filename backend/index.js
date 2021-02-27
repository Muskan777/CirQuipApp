const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const config = require("config");
const { connectDB } = require("./config/config");
const Message = require("./models/message");
const NotificationActions = require("./routes/notifUtils");
const users = {};

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(
  bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(cookieparser());

(async () => await connectDB())();

app.get("/", (req, res) => {
  res.status(200).send("CirQuip API");
});

const routes = ["post", "comment", "user", "shop", "message"];

routes.forEach(route => app.use(`/api/${route}`, require(`./routes/${route}`)));

io.on("connection", socket => {
  socket.on("new user", function (data) {
    users[data] = socket;
  });

  socket.on("send message", msg => {
    console.log(msg);
    delete msg["_id"];
    if (users[msg.to]) {
      users[msg.to].emit("new message", msg);
      msg.recieverRead = true;
    } else {
      console.log("user offline");
      msg.recieverRead = false;
    }
    NewMessage = new Message({
      ...msg,
    });
    try {
      NewMessage.save()
        .then(() => {
          NotificationActions.sendChatNotification(msg);
          console.log("Successful");
        })
        .catch(err => console.log("Error:", err));
    } catch (e) {
      console.log("Error", e);
    }
  });

  socket.on("disconnect", () => {
    delete users[Object.keys(users).find(key => users[key] === socket)];
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
