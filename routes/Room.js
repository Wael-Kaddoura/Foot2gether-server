const express = require("express");
const RoomController = require("../controllers/RoomController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/match/:match_id", RoomController.getMatchRooms);
router.get("/user", RoomController.getUserRooms);
router.get("/:room_id", RoomController.getRoomById);

module.exports = router;
