"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        username: "Wael Kaddoura",
        email: "wael.kad01@gmail.com",
        password: "wael.kad01@gmail.com",
        gender: "0",
        fav_team_id: "10",
        user_type_id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Bilal Azzam",
        email: "bilal.azzam@gmail.com",
        password: "wael.kad01@gmail.com",
        gender: "0",
        fav_team_id: "6",
        user_type_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
