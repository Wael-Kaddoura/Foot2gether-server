module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Blogs", [
      {
        title: "United's Odds in the Premier League",
        body: `On Monday, Manchester United confirmed the signing of Cristiano Ronaldo in an official statement posted on social media. The GOAT candidate is making a comeback to the team where he spent six seasons, from 2003 to 2009.

        During his first Manchester United spell, CR7 won the Premier League three times, as well as one Champions League trophy. He also won many individual accolades, including the first of his five Ballon d’Or awards.
        
        Although he’s turning 37 next February, Ronaldo is showing no signs of slowing down. He’s coming off an impressive season in the Italian Serie A, where he scored 29 goals for Juventus, winning the Capocannoniere award (top-scorer) along the way.
        
        Over the next two years, he’s supposed to play in the Premier League, where he’ll certainly try to do something similar. It seems that everyone believes in him, including the top soccer betting apps that have slashed Manchester United odds since his arrival.`,
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
