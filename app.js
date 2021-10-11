const express = require("express");

const userRoute = require("./routes/User");
const matchRoute = require("./routes/Match");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/match", matchRoute);

app.listen(8000, () => {
  console.log("Listening on Port 8000:");
});
