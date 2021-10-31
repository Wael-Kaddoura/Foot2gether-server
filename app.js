require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8000;

const adminRoute = require("./routes/Admin");
const userRoute = require("./routes/User");
const matchRoute = require("./routes/Match");
const roomRoute = require("./routes/Room");
const blogRoute = require("./routes/Blog");
const teamRoute = require("./routes/Team");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("images/uploads"));
app.use("/logos", express.static("images/teams_logos"));
app.use("/blog_image", express.static("images/blogs"));
app.use("/profile_picture", express.static("images/profile_pictures"));
app.use("/cover_photo", express.static("images/cover_photos"));

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/match", matchRoute);
app.use("/room", roomRoute);
app.use("/blog", blogRoute);
app.use("/team", teamRoute);

app.listen(port, () => {
  console.log("Listening on port", port);
});
