"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: "follower",
        foreignKey: "following_id",
      });
      this.belongsTo(models.User, {
        as: "following",
        foreignKey: "user_id",
      });
    }
  }
  UserFollower.init(
    {
      user_id: {
        type: Sequelize.INTEGER,
      },
      following_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "users_followers",
      modelName: "UserFollower",
    }
  );
  return UserFollower;
};
