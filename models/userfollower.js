"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("mysql::memory:", {
  define: {
    tableName: "users_followers",
  },
});

module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      modelName: "UserFollower",
    }
  );
  return UserFollower;
};
