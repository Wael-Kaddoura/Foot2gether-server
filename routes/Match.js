const express = require("express");
const MatchController = require("../controllers/MatchController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/live", MatchController.getLiveMatches);
router.get("/finished", MatchController.getFinishedMatchesToday);
router.get("/upcoming", MatchController.getUpcomingMatchesToday);
router.get("/next", MatchController.getNextMatch);

router.get("/live_count", MatchController.getLiveMatchesCount);
router.get("/finished_count", MatchController.getFinishedMatchesTodayCount);
router.get("/upcoming_count", MatchController.getUpcomingMatchesTodayCount);

router.get("/:id", MatchController.getMatch);

module.exports = router;
