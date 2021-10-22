const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlogComment extends Model {
    static associate(models) {
      this.belongsTo(models.Blog, {
        as: "comments",
        foreignKey: "blog_id",
      });
    }
  }
  BlogComment.init(
    {
      body: {
        type: Sequelize.STRING,
      },
      author_id: {
        type: Sequelize.INTEGER,
      },
      blog_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "blogs_comments",
      modelName: "BlogComment",
    }
  );
  return BlogComment;
};
