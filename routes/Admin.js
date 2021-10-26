const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/cards_count", AdminController.getCardsCount);

module.exports = router;
