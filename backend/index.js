const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const connectDB = require("./config/config");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieparser());

(async () => await connectDB())();

app.get("/", (req, res) => {
  res.status(200).send("CirQuip API");
});

const routes = ["post"];

routes.forEach((route) =>
  app.use(`/api/${route}`, require(`./routes/${route}`))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
