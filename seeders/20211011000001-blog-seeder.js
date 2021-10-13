module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("blogs", []);
  },

  down: async (queryInterface, Sequelize) => {},
};
