const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.UserFollower, {
        as: "follower",
        foreignKey: "following_id",
      });

      this.hasMany(models.UserFollower, {
        as: "following",
        foreignKey: "user_id",
      });

      this.hasMany(models.Room, {
        as: "creator",
        foreignKey: "creator_id",
      });

      this.hasMany(models.Blog, {
        as: "author",
        foreignKey: "author_id",
      });

      this.hasMany(models.BlogComment, {
        as: "comment_author",
        foreignKey: "author_id",
      });

      this.belongsTo(models.Team, {
        as: "fav_team",
        foreignKey: "fav_team_id",
      });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fav_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      profile_picture: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cover_photo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      notification_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
