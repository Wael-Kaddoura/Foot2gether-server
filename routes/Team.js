const express = require("express");
const TeamController = require("../controllers/TeamController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/", TeamController.getAllTeam);
router.get("/logo/:id", TeamController.getTeamLogo);

module.exports = router;
