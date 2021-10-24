"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "Wael Kaddoura",
        email: "wael.kad01@gmail.com",
        password: "wael123",
        gender: "0",
        fav_team_id: "10",
        user_type_id: "2",
        profile_picture:
          "http://localhost:8000/profile_picture/default_profile_picture.jpg",
        cover_photo:
          "http://localhost:8000/cover_photo/default_cover_photo.jpg",
        bio: "Hala Madrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Bilal Azzam",
        email: "bilal.azzam@gmail.com",
        password: "bilal123",
        gender: "0",
        fav_team_id: "6",
        user_type_id: "1",
        profile_picture:
          "http://localhost:8000/profile_picture/default_profile_picture.jpg",
        cover_photo:
          "http://localhost:8000/cover_photo/default_cover_photo.jpg",
        bio: "United is a life , the rest are mere details",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Abed Raee",
        email: "abed.raee@gmail.com",
        password: "abed123",
        gender: "0",
        fav_team_id: "4",
        user_type_id: "1",
        profile_picture:
          "http://localhost:8000/profile_picture/default_profile_picture.jpg",
        cover_photo:
          "http://localhost:8000/cover_photo/default_cover_photo.jpg",
        bio: "YNWA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Hassan Moussa",
        email: "hassan.moussa@gmail.com",
        password: "hassan123",
        gender: "0",
        fav_team_id: "1",
        user_type_id: "1",
        profile_picture:
          "http://localhost:8000/profile_picture/default_profile_picture.jpg",
        cover_photo:
          "http://localhost:8000/cover_photo/default_cover_photo.jpg",
        bio: "Mia san Mia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
