module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Teams", [
      {
        name: "Arsenal",
        country: "England",
        logo: "http://3.144.252.18/logos/arsenal.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chelsea",
        country: "England",
        logo: "http://3.144.252.18/logos/chelsea.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Liverpool",
        country: "England",
        logo: "http://3.144.252.18/logos/liverpool.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manchester City",
        country: "England",
        logo: "http://3.144.252.18/logos/manchester_city.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manchester United",
        country: "England",
        logo: "http://3.144.252.18/logos/manchester_united.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tottenham",
        country: "England",
        logo: "http://3.144.252.18/logos/tottenham.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Atletico Madrid",
        country: "Spain",
        logo: "http://3.144.252.18/logos/atletico_madrid.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Barcelona",
        country: "Spain",
        logo: "http://3.144.252.18/logos/barcelona.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Real Madrid",
        country: "Spain",
        logo: "http://3.144.252.18/logos/real_madrid.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AC Milan",
        country: "Italy",
        logo: "http://3.144.252.18/logos/ac_milan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Inter Milan",
        country: "Italy",
        logo: "http://3.144.252.18/logos/inter_milan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Juventus",
        country: "Italy",
        logo: "http://3.144.252.18/logos/juventus.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Napoli",
        country: "Italy",
        logo: "http://3.144.252.18/logos/napoli.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bayern Munich",
        country: "Germany",
        logo: "http://3.144.252.18/logos/bayern_munich.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dortmund",
        country: "Germany",
        logo: "http://3.144.252.18/logos/borussia_dortmund.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PSG",
        country: "France",
        logo: "http://3.144.252.18/logos/psg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leicester City",
        country: "England",
        logo: "http://3.144.252.18/logos/leicester_city.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "West Ham",
        country: "England",
        logo: "http://3.144.252.18/logos/west_ham_united.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Athletic Club",
        country: "Spain",
        logo: "http://3.144.252.18/logos/athletic_club.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Granada",
        country: "Spain",
        logo: "http://3.144.252.18/logos/granada.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sevilla",
        country: "Spain",
        logo: "http://3.144.252.18/logos/sevilla.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Valencia",
        country: "Spain",
        logo: "http://3.144.252.18/logos/valencia.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Roma",
        country: "Italy",
        logo: "http://3.144.252.18/logos/roma.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leverkusen",
        country: "Germany",
        logo: "http://3.144.252.18/logos/leverkusen.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wolfsburg",
        country: "Germany",
        logo: "http://3.144.252.18/logos/wolfsburg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lyon",
        country: "France",
        logo: "http://3.144.252.18/logos/lyon.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
