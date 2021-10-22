module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Blogs", [
      {
        title: "United's Odds in the Premier League",
        body: `On Monday, Manchester United confirmed the signing of Cristiano Ronaldo in an official statement posted on social media. `,

        image: "http://localhost:8000/blogimg/blog2.jpg",
        author_id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Argentina to the Final!",
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! Esse eligendi ab molestias, quod nostrum hic saepe repudiandae non..`,

        image: "http://localhost:8000/blogimg/blog3.jpg",
        author_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Neymar to Balon Dor!",
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! Esse eligendi ab molestias, quod nostrum hic saepe repudiandae non..`,

        image: "http://localhost:8000/blogimg/blog1.jpg",
        author_id: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Neymar to Balon Dor!",
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! Esse eligendi ab molestias, quod nostrum hic saepe repudiandae non..`,

        image: "http://localhost:8000/blogimg/blog1.jpg",
        author_id: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "United's Odds in the Premier League",
        body: `On Monday, Manchester United confirmed the signing of Cristiano Ronaldo in an official statement posted on social media. `,

        image: "http://localhost:8000/blogimg/blog2.jpg",
        author_id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Argentina to the Final!",
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! Esse eligendi ab molestias, quod nostrum hic saepe repudiandae non..`,

        image: "http://localhost:8000/blogimg/blog3.jpg",
        author_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
