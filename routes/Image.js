const express = require("express");
const imageController = require("../controllers/ImageController");
const imageUploader = require("../middleware/image-uploader");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuthMiddleware.checkAuth);

router.post(
  "/upload",
  imageUploader.upload.single("image"),
  imageController.upload
);

module.exports = router;
