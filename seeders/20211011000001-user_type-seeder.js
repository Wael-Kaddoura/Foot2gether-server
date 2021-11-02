module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_types", [
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
      {
        user_type: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
