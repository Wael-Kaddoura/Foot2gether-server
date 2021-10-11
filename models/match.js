"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:", {
  define: {
    tableName: "matches",
  },
});
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      // define association here
    }
  }
  Match.init(
    {
      date: {
        type: Sequelize.DATE,
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
