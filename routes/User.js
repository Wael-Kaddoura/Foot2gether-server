const express = require("express");
const UserController = require("../controllers/UserController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

router.get("/following", UserController.getFollowingUsers);
router.get("/followers", UserController.getFollowersUsers);
router.get("/:username", UserController.searchUsersByUsername);

router.post("/follow", UserController.followUser);

module.exports = router;
