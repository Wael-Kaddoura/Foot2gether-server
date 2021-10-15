const express = require("express");
const app = express();

const PORT = 8000;

const userRoute = require("./routes/User");
const matchRoute = require("./routes/Match");
const roomRoute = require("./routes/Room");
const blogRoute = require("./routes/Blog");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/match", matchRoute);
app.use("/room", roomRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}:`);
});
