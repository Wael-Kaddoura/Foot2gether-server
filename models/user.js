const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserFollower, {
        as: "following",
        foreignKey: "following_id",
      });

      this.hasMany(models.UserFollower, {
        as: "follower",
        foreignKey: "user_id",
      });

      this.hasMany(models.Room, {
        as: "creator",
        foreignKey: "creator_id",
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
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.INTEGER,
      },
      fav_team_id: {
        type: Sequelize.INTEGER,
      },
      user_type_id: {
        type: Sequelize.INTEGER,
      },
      current_room_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
