const express = require("express");
const MatchController = require("../controllers/MatchController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/live", MatchController.getLiveMatches);
router.get("/finished", MatchController.getFinishedMatchesToday);
router.get("/upcoming", MatchController.getUpcomingMatchesToday);

router.get("/live_count", MatchController.getLiveMatchesCount);
router.get("/finished_count", MatchController.getFinishedMatchesCount);

module.exports = router;
