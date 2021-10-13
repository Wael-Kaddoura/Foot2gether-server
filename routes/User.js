const express = require("express");
const UserController = require("../controllers/UserController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

router.get("/following", UserController.getFollowing);
router.get("/followers", UserController.getFollowers);
router.get("/following_count", UserController.getFollowingCount);
router.get("/followers_count", UserController.getFollowersCount);

router.get("/:id", UserController.getUser);
router.get("/search/:username", UserController.searchUsersByUsername);

router.post("/follow", UserController.followUser);
router.post("/unfollow", UserController.unfollowUser);

module.exports = router;
