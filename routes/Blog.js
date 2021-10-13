const express = require("express");
const BlogController = require("../controllers/BlogController");

const router = express.Router();

router.get("/", BlogController.getBlogs);

router.post("/", BlogController.createBlog);

module.exports = router;
