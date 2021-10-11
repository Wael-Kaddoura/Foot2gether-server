"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("mysql::memory:", {
  define: {
    tableName: "matches",
  },
});
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {}
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
