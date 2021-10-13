const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {}
  }

  Blog.init(
    {
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      author_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};