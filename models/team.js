const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        as: "fav_team",
        foreignKey: "fav_team_id",
      });

      this.hasMany(models.Match, {
        as: "team1",
        foreignKey: "team1_id",
      });

      this.hasMany(models.Match, {
        as: "team2",
        foreignKey: "team2_id",
      });
    }
  }

  Team.init(
    {
      name: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
