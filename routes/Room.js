const express = require("express");
const RoomController = require("../controllers/RoomController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

module.exports = router;
