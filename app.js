require("dotenv/config");
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

const userRoute = require("./routes/User");
const matchRoute = require("./routes/Match");
const roomRoute = require("./routes/Room");
const blogRoute = require("./routes/Blog");
const fcmRoute = require("./routes/FCM");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/match", matchRoute);
app.use("/room", roomRoute);
app.use("/blog", blogRoute);
app.use("/fcm", fcmRoute);

app.listen(port, () => {
  console.log("Listening on port", port);
});
