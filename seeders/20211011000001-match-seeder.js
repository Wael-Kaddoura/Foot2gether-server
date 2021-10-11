"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("matches", [
      {
        match_day: "2021-10-11",
        kick_off: "16:00:00",
        full_time: "18:00:00",
        competition_id: "3",
        team1_id: "5",
        team2_id: "6",
        team1_score: "1",
        team2_score: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        match_day: "2021-10-11",
        kick_off: "20:00:00",
        full_time: "22:00:00",
        competition_id: "3",
        team1_id: "1",
        team2_id: "4",
        team1_score: "0",
        team2_score: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        match_day: "2021-10-12",
        kick_off: "16:00:00",
        full_time: "18:00:00",
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
