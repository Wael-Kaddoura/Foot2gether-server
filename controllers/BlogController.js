const { Sequelize } = require("sequelize");
const Validator = require("fastest-validator");

const { Blog, BlogComment } = require("../models");

async function getBlogs(req, res) {
  const response = await Blog.findAll({ include: "author" });

  res.send(response);
}

async function getLatestBlogs(req, res) {
  const response = await Blog.findAll({
    order: [[Sequelize.col("updatedAt"), "DESC"]],
    limit: 2,
    include: "author",
  });

  res.send(response);
}

async function getBlogComments(req, res) {
  console.log("hello");
  const { id } = req.params;

  const response = await BlogComment.findAll({
    where: { blog_id: id },
    include: { all: true },
  });

  res.send(response);
}

async function getBlog(req, res) {
  const { id } = req.params;

  const response = await Blog.findOne({
    where: { id: id },
    include: "author",
  });

  res.send(response);
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
  const image = "http://localhost:8000/blogimg/" + req.file.filename;

  const new_blog = { title, body, image, author_id };

  const response = await Blog.create(new_blog);

  res.status(201).send({
    message: "Blog created successfully!",
    blog: response,
  });
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

  const response = await Blog.update(edited_blog, {
    where: { id: id },
  });

  res.status(204).send();
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const response = Blog.destroy({
    where: { id: id },
  });

  res.status(204).send();
}

module.exports = {
  getBlogs,
  getLatestBlogs,
  getBlogComments,
  getBlog,
  createBlog,
  editBlog,
  deleteBlog,
};
