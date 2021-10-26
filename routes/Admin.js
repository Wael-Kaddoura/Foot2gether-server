const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/cards_count", AdminController.getCardsCount);
router.get("/match/all", AdminController.getAllMatches);
router.get("/match/today", AdminController.getTodaysMatches);
router.get("/room/today", AdminController.getTodaysRooms);

module.exports = router;
