"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("rooms", [
      {
        match_id: "2",
        creator_id: "1",
        name: "Let's go gunners!",
        current_participants_number: "6",
        max_capacity: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        match_id: "3",
        creator_id: "1",
        name: "El Classico!",
        current_participants_number: "8",
        max_capacity: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        match_id: "1",
        creator_id: "1",
        name: "Manchester Derby!",
        current_participants_number: "7",
        max_capacity: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
