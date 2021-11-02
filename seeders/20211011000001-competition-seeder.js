module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("competitions", [
      {
        name: "UEFA Champions League",
        region: "Europe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "La Liga",
        region: "Spain",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Premiere League",
        region: "England",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Serie A",
        region: "Italy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ligue 1",
        region: "France",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bundesiga",
        region: "Germany",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
