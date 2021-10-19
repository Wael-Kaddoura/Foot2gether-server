"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Teams", [
      {
        name: "Arsenal",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/arsenal.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chelsea",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Chelsea.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leicester City",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Leicester_City.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Liverpool",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Liverpool.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manchester City",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Manchester_City.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manchester United",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Manchester_United.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tottenham",
        country: "England",
        logo: "http://localhost:8000/images/teams_logos/Tottenham.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Barcelona",
        country: "Spain",
        logo: "http://localhost:8000/images/teams_logos/Barcelona.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Granada",
        country: "Spain",
        logo: "http://localhost:8000/images/teams_logos/Granada.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Real Madrid",
        country: "Spain",
        logo: "http://localhost:8000/images/teams_logos/Real_Madrid.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Valencia",
        country: "Spain",
        logo: "http://localhost:8000/images/teams_logos/Valencia.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
