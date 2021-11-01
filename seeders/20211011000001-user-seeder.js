const bcryptjs = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash("wael1719", salt, async (err, hash) => {
        const admin_data = {
          username: "Admin",
          email: "admin@foot2gether.com",
          password: hash,
          gender: "0",
          fav_team_id: "9",
          user_type_id: "3",
          profile_picture:
            "http://localhost:8000/profile_picture/default_profile_picture.jpg",
          cover_photo:
            "http://localhost:8000/cover_photo/default_cover_photo.jpg",
          bio: "Hi, its the Admin!",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return queryInterface.bulkInsert("Users", [admin_data]);
      });
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
