const express = require("express");
const UserController = require("../controllers/UserController");
const ProfilePictureUploader = require("../middleware/profile-picture-uploader");
const CoverPhotoUploader = require("../middleware/cover-photo-uploader");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

router.use(checkAuthMiddleware.checkAuth);

router.get("/type", UserController.getUserType);
router.get("/following", UserController.getFollowing);
router.get("/followers", UserController.getFollowers);
router.get("/following_count", UserController.getFollowingCount);
router.get("/followers_count", UserController.getFollowersCount);

router.get("/my_profile", UserController.getMyProfile);
router.get("/:id", UserController.getUser);
router.get("/search/:username", UserController.searchUsersByUsername);

router.post("/follow", UserController.followUser);
router.post("/unfollow", UserController.unfollowUser);

router.post("/save_notification_token", UserController.saveNotificationToken);

router.post(
  "/change_profile_picture",
  ProfilePictureUploader.upload.single("image"),
  UserController.changeProfilePicture
);

router.post(
  "/change_cover_photo",
  CoverPhotoUploader.upload.single("image"),
  UserController.changeCoverPhoto
);

router.post("/change_bio", UserController.changeBio);

router.delete(
  "/clear_notification_token",
  UserController.clearNotificationToken
);

module.exports = router;
