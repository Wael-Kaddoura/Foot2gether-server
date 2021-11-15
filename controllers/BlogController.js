const { Sequelize } = require("sequelize");
const Validator = require("fastest-validator");

const { Blog, BlogComment } = require("../models");

// get all blogs
async function getBlogs(req, res) {
  try {
    const response = await Blog.findAll({ include: "author" });
    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

// get latest 2 blogs
async function getLatestBlogs(req, res) {
  try {
    const response = await Blog.findAll({
      order: [[Sequelize.col("updatedAt"), "DESC"]],
      limit: 2,
      include: "author",
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

// get blogs created by the current user
async function getMyBlogs(req, res) {
  const user_id = req.userData.user_id;

  try {
    const response = await Blog.findAll({
      order: [[Sequelize.col("updatedAt"), "DESC"]],
      where: { author_id: user_id },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

// get blogs created by a certain user
async function getUserBlogs(req, res) {
  const { user_id } = req.params;

  try {
    const response = await Blog.findAll({
      order: [[Sequelize.col("updatedAt"), "DESC"]],
      where: { author_id: user_id },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

// get comments on a certain blog
async function getBlogComments(req, res) {
  const { id } = req.params;

  try {
    const response = await BlogComment.findAll({
      where: { blog_id: id },
      include: { all: true },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getBlogCommentsCount(req, res) {
  const { id } = req.params;

  try {
    const response = await BlogComment.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "comments_count"],
      ],
      where: { blog_id: id },
    });

    const comments_count = response[0];

    res.send(comments_count);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

// get data about a certain blog
async function getBlog(req, res) {
  const { id } = req.params;

  try {
    const response = await Blog.findOne({
      where: { id: id },
      include: "author",
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function createBlog(req, res) {
  const v = new Validator();
  const schema = {
    title: { type: "string", optional: false, min: 2 },
    body: { type: "string", optional: false, min: 5 },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Please fill all required  fields!",
      errors: validation_response,
    });
  }

  const { title, body } = req.body;
  const author_id = req.userData.user_id;
  const image = "https://foot2gether.ml/blog_image/" + req.file.filename;

  const new_blog = {
    title,
    body,
    image,
    author_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await Blog.create(new_blog);

    res.status(201).send({
      message: "Blog Created Successfully!",
    });
  } catch (error) {
    res.status(422).send({
      message: "Failed to Post Blog!",
      error,
    });
  }
}

async function editBlog(req, res) {
  const v = new Validator();
  const schema = {
    title: { type: "string", optional: false, min: 2 },
    body: { type: "string", optional: false, min: 5 },
    image: { type: "string", optional: false, min: 5 },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Please fill all required  fields!",
      errors: validation_response,
    });
  }

  const { id } = req.params;
  const { title, body, image } = req.body;
  const edited_blog = { title, body, image };

  try {
    await Blog.update(edited_blog, {
      where: { id: id },
    });

    res.status(204).send({
      message: "Blog Edited Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  try {
    Blog.destroy({
      where: { id: id },
    });

    res.status(204).send({
      message: "Blog Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function addComment(req, res) {
  const v = new Validator();
  const schema = {
    body: { type: "string", optional: false, min: 1 },
    blog_id: { type: "string", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Please fill all required  fields!",
      errors: validation_response,
    });
  }

  const { body, blog_id } = req.body;
  const author_id = req.userData.user_id;

  const new_blog = { body, author_id, blog_id };

  try {
    const response = await BlogComment.create(new_blog);

    res.status(201).send({
      message: "Comment Added Successfully!",
      blog: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getBlogs,
  getMyBlogs,
  getUserBlogs,
  getLatestBlogs,
  getBlogComments,
  getBlogCommentsCount,
  getBlog,
  createBlog,
  editBlog,
  deleteBlog,
  addComment,
};
