const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const { connectDB } = require("./config/config");
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

const routes = ["post", "comment", "user", "shop"];

routes.forEach(route => app.use(`/api/${route}`, require(`./routes/${route}`)));

// io.on("connection", socket => {
//   console.log("A user connected :)");
//   socket.on("new user", function (data) {
//     users[socket.email] = socket;
//     console.log(users);
//   });

//   socket.on("send message", data => {
//     console.log(data);
//     users[email].emit("new message", { msg: data, nick: socket.email });
//   });

//   socket.on("disconnect", function (data) {
//     if (!socket.email) {
//       return;
//     }
//     delete users[socket.email];
//     updatenicknames();
//   });
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
