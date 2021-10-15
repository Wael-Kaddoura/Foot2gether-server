const express = require("express");
const FCMController = require("../controllers/FCMController");

const router = express.Router();

router.post("/", FCMController.sendNotification);

module.exports = router;
