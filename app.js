require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8000;

const userRoute = require("./routes/User");
const matchRoute = require("./routes/Match");
const roomRoute = require("./routes/Room");
const blogRoute = require("./routes/Blog");
const fcmRoute = require("./routes/FCM");
const imageRoute = require("./routes/Image");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("images/uploads"));
app.use("/logos", express.static("images/teams_logos"));

app.use("/user", userRoute);
app.use("/match", matchRoute);
app.use("/room", roomRoute);
app.use("/blog", blogRoute);
app.use("/fcm", fcmRoute);
app.use("/image", imageRoute);

app.listen(port, () => {
  console.log("Listening on port", port);
});
