const express = require("express");
const MatchController = require("../controllers/MatchController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/next", MatchController.getNextMatch);

router.use(checkAuthMiddleware.checkAuth);

router.get("/live", MatchController.getLiveMatches);
router.get("/finished", MatchController.getFinishedMatchesToday);
router.get("/upcoming", MatchController.getUpcomingMatchesToday);
router.get("/available", MatchController.getAvailableMatches);
router.get("/live_count", MatchController.getLiveMatchesCount);
router.get("/finished_count", MatchController.getFinishedMatchesTodayCount);
router.get("/upcoming_count", MatchController.getUpcomingMatchesTodayCount);
router.get("/:id", MatchController.getMatch);

module.exports = router;
