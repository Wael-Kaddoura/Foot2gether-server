const express = require("express");
const RoomController = require("../controllers/RoomController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/", RoomController.getLiveRooms);
router.get("/count", RoomController.getLiveRoomsCount);
router.get("/match/:match_id", RoomController.getMatchRooms);
router.get("/user", RoomController.getUserRooms);
router.get("/:room_id", RoomController.getRoomById);

router.use(checkAuthMiddleware.checkAuth);
router.post("/", RoomController.createRoom);

module.exports = router;
