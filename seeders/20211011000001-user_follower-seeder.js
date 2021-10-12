"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_followers", [
      {
        user_id: "2",
        following_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "3",
        following_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "4",
        following_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
