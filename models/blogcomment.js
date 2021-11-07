const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlogComment extends Model {
    static associate(models) {
      this.belongsTo(models.Blog, {
        as: "comments",
        foreignKey: "blog_id",
      });

      this.belongsTo(models.User, {
        as: "comment_author",
        foreignKey: "author_id",
      });
    }
  }

  BlogComment.init(
    {
      body: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      blog_id: {
        allowNull: false,
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
