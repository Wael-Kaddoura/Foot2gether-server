const express = require("express");
const imageController = require("../controllers/ImageController");
const imageUploader = require("../middleware/image-uploader");

const router = express.Router();

router.post(
  "/upload",
  imageUploader.upload.single("image"),
  imageController.upload
);

module.exports = router;
