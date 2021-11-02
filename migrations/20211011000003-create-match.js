module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      match_day: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      kick_off: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      full_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      competition_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      stadium: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      team1_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team2_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team1_score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team2_score: {
        allowNull: false,
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
    await queryInterface.dropTable("matches");
  },
};
