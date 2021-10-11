"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("matches", [
      {
        date: "2021-10-11 16:00:00.000000",
        competition_id: "3",
        team1_id: "5",
        team2_id: "6",
        team1_score: "1",
        team2_score: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2021-10-11 20:00:00.000000",
        competition_id: "3",
        team1_id: "1",
        team2_id: "4",
        team1_score: "0",
        team2_score: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2021-10-12 14:00:00.000000",
        competition_id: "2",
        team1_id: "8",
        team2_id: "10",
        team1_score: "0",
        team2_score: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
