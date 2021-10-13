const Validator = require("fastest-validator");

const { Blog } = require("../models");

async function getBlogs(req, res) {
  const response = await Blog.findAll();

  res.send(response);
}

async function getBlog(req, res) {
  const { id } = req.params;

  const response = await Blog.findOne({
    where: { id: id },
  });

  res.send(response);
}

async function createBlog(req, res) {
  const v = new Validator();
  const schema = {
    title: { type: "string", optional: false, min: 2 },
    body: { type: "string", optional: false, min: 5 },
    image: { type: "string", optional: false, min: 5 },
    author_id: { type: "number", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Please fill all required  fields!",
      errors: validation_response,
    });
  }

  const { title, body, image, author_id } = req.body;
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

  const { edited_blog_id, title, body, image } = req.body;
  const edited_blog = { title, body, image };

  const response = await Blog.update(edited_blog, {
    where: { id: edited_blog_id },
  });

  res.status(204).send();
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  editBlog,
};
