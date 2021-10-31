const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {
      this.hasMany(models.Match, {
        as: "competition",
        foreignKey: "competition_id",
      });
    }
  }

  Competition.init(
    {
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      region: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Competition",
    }
  );
  return Competition;
};
