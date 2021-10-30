const express = require("express");
const BlogController = require("../controllers/BlogController");
const BlogImageUploader = require("../middleware/blog-image-uploader");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/latest", BlogController.getLatestBlogs);

router.use(checkAuthMiddleware.checkAuth);

router.get("/", BlogController.getBlogs);
router.get("/my_blogs", BlogController.getMyBlogs);
router.get("/user/:user_id", BlogController.getUserBlogs);
router.get("/comments/:id", BlogController.getBlogComments);
router.get("/comments_count/:id", BlogController.getBlogCommentsCount);
router.get("/:id", BlogController.getBlog);

router.use(checkAuthMiddleware.checkAuth);

router.post(
  "/",
  BlogImageUploader.upload.single("image"),
  BlogController.createBlog
);
router.post("/comment", BlogController.addComment);

router.put("/:id", BlogController.editBlog);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
