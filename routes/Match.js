const express = require("express");
const MatchController = require("../controllers/MatchController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/live", MatchController.getLiveMatches);
router.get("/finished", MatchController.getFinishedMatchesToday);

module.exports = router;
