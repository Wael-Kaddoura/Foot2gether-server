const express = require("express");
const UserController = require("../controllers/UserController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

router.use(checkAuthMiddleware.checkAuth);

module.exports = router;
