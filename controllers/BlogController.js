const { Sequelize } = require("sequelize");

const { Blog } = require("../models");

async function getBlogs(req, res) {
  const response = await Blog.findAll();

  res.send(response);
}

module.exports = {
  getBlogs,
};
