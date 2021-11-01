const express = require("express");
const RoomController = require("../controllers/RoomController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuthMiddleware.checkAuth);

router.get("/", RoomController.getLiveRooms);
router.get("/count", RoomController.getLiveRoomsCount);
router.get("/check_if_live/:room_id", RoomController.checkIfLive);
router.get("/match/:match_id", RoomController.getMatchRooms);
router.get("/user/:user_id", RoomController.getUserRooms);
router.get("/my_rooms", RoomController.getMyRooms);
router.get("/:room_id", RoomController.getLiveRoomById);

router.post("/", RoomController.createRoom);

module.exports = router;
