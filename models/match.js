const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.hasMany(models.Room, {
        as: "match",
        foreignKey: "match_id",
      });

      this.belongsTo(models.Competition, {
        as: "competition",
        foreignKey: "competition_id",
      });

      this.belongsTo(models.Team, {
        as: "team1",
        foreignKey: "team1_id",
      });

      this.belongsTo(models.Team, {
        as: "team2",
        foreignKey: "team2_id",
      });
    }
  }

  Match.init(
    {
      match_day: {
        type: Sequelize.DATEONLY,
      },
      kick_off: {
        type: Sequelize.TIME,
      },
      full_time: {
        type: Sequelize.TIME,
      },
      competition_id: {
        type: Sequelize.INTEGER,
      },
      team1_id: {
        type: Sequelize.INTEGER,
      },
      team2_id: {
        type: Sequelize.INTEGER,
      },
      team1_score: {
        type: Sequelize.INTEGER,
      },
      team2_score: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Match",
    }
  );

  return Match;
};
