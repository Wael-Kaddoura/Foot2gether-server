const express = require("express");
const BlogController = require("../controllers/BlogController");

const router = express.Router();

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlog);

router.post("/", BlogController.createBlog);
router.put("/:id", BlogController.editBlog);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
