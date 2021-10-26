"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      stadium: {
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Matches");
  },
};
