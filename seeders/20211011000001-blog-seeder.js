module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Blogs", [
      {
        title: "United's Odds in the Premier League",
        body: `On Monday, Manchester United confirmed the signing of Cristiano Ronaldo in an official statement posted on social media. `,

        image:
          "http://localhost:8000/public/images/teams_logos/Manchester_United.png",
        author_id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
