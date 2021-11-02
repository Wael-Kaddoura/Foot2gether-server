const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      this.hasMany(models.BlogComment, {
        as: "comments",
        foreignKey: "blog_id",
      });

      this.belongsTo(models.User, {
        as: "author",
        foreignKey: "author_id",
      });
    }
  }

  Blog.init(
    {
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "blogs",
      modelName: "Blog",
    }
  );
  return Blog;
};
