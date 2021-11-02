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
        allowNull: false,
        type: Sequelize.STRING,
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      tableName: "teams",
      modelName: "Team",
    }
  );
  return Team;
};
