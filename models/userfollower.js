const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
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
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      following_id: {
        allowNull: false,
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
