"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "Admin",
        email: "admin@foot2gether.com",
        password: "wael123",
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
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
