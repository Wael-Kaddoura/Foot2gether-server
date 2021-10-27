const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/cards_count", AdminController.getCardsCount);
router.get("/match/all", AdminController.getAllMatches);
router.get("/match/today", AdminController.getTodaysMatches);
router.get("/match/available", AdminController.getAvailableMatches);
router.get("/room/today", AdminController.getTodaysRooms);
router.get("/match/create_options", AdminController.getCreateMatchOptions);

router.post("/match", AdminController.createNewMatch);
router.post("/room", AdminController.createNewRoom);

router.put("/match_score", AdminController.changeMatchScore);

module.exports = router;
