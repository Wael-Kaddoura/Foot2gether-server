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
router.get("/:id", MatchController.getMatch);

module.exports = router;
