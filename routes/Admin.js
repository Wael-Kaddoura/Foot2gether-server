const express = require("express");
const AdminController = require("../controllers/AdminController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuthMiddleware.checkAuthAdmin);

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
