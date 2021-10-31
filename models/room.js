const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: "creator",
        foreignKey: "creator_id",
      });

      this.belongsTo(models.Match, {
        as: "matchroom",
        foreignKey: "match_id",
      });
    }
  }
  Room.init(
    {
      match_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      creator_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
