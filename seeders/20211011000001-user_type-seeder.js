"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users_Types", [
      {
        user_type: "Normal User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: "Premium User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
