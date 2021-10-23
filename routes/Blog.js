const express = require("express");
const BlogController = require("../controllers/BlogController");
const BlogImageUploader = require("../middleware/blog-image-uploader");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/", BlogController.getBlogs);
router.get("/latest", BlogController.getLatestBlogs);
router.get("/comments/:id", BlogController.getBlogComments);
router.get("/:id", BlogController.getBlog);

router.use(checkAuthMiddleware.checkAuth);

router.post(
  "/",
  BlogImageUploader.upload.single("image"),
  BlogController.createBlog
);
router.put("/:id", BlogController.editBlog);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
