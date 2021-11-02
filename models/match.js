const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.hasMany(models.Room, {
        as: "matchroom",
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
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      kick_off: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      full_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      competition_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      stadium: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      team1_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team2_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team1_score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team2_score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "matches",
      modelName: "Match",
    }
  );

  return Match;
};
