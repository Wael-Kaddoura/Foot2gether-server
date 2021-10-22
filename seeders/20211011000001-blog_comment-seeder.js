module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Blogs_Comments", [
      {
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! `,
        author_id: 1,
        blog_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! `,
        author_id: 2,
        blog_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! `,
        author_id: 3,
        blog_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! `,
        author_id: 1,
        blog_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: `Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! `,
        author_id: 4,
        blog_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
