const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // Room.belongsTo(models.Match);
    }
  }
  Room.init(
    {
      match_id: {
        type: Sequelize.INTEGER,
      },
      creator_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      current_participants_number: {
        type: Sequelize.INTEGER,
      },
      max_capacity: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
