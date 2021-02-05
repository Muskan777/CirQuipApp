const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const connectDB = require("./config/config");
const Message = require("./models/message");
const users = {};

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieparser());

(async () => await connectDB())();

app.get("/", (req, res) => {
  res.status(200).send("CirQuip API");
});

const routes = ["post", "comment", "user", "shop", "message"];

routes.forEach(route => app.use(`/api/${route}`, require(`./routes/${route}`)));

io.on("connection", socket => {
  socket.on("new user", function (data) {
    console.log("data", data);
    users[data] = socket;
  });

  socket.on("send message", msg => {
    delete msg["_id"];
    if (users[msg.to]) {
      users[msg.to].emit("new message", msg);
    } else {
      console.log("user offline");
    }
    console.log("[send-message]", msg);

    NewMessage = new Message({
      ...msg,
    });
    try {
      NewMessage.save()
        .then(() => console.log("Successful"))
        .catch(err => console.log("Error:", err));
    } catch (e) {
      console.log("Error", e);
    }
  });

  socket.on("disconnect", () => {
    console.log(Object.keys(users));
    delete users[Object.keys(users).find(key => users[key] === socket)];
    console.log(Object.keys(users));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
