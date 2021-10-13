const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {}
  }

  Competition.init(
    {
      name: {
        type: Sequelize.STRING,
      },
      region: {
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
