const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");
const Validator = require("fastest-validator");

const { Room, Match } = require("../models");

const current_date_time = new Date();
const current_date = date.format(current_date_time, "YYYY-MM-DD");
const current_time = date.format(current_date_time, "HH:mm:ss");

async function getCardsCount(req, res) {
  //get total matches count
  const total_matches_data = await Match.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "total_matches_count"],
    ],
  });
  const total_matches_count =
    total_matches_data[0].dataValues.total_matches_count;

  //get today's matches count
  const todays_matches_data = await Match.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "todays_matches_count"],
    ],
    where: {
      match_day: current_date,
    },
  });
  const todays_matches_count =
    todays_matches_data[0].dataValues.todays_matches_count;

  //get today's rooms count
  const todays_rooms_data = await Match.findAll({
    attributes: [
      [
        Sequelize.fn("COUNT", Sequelize.col("matchroom.id")),
        "todays_rooms_count",
      ],
    ],
    where: {
      match_day: current_date,
    },
    include: "matchroom",
  });
  const todays_rooms_count = todays_rooms_data[0].dataValues.todays_rooms_count;

  const cards_count = {
    total_matches_count,
    todays_matches_count,
    todays_rooms_count,
  };

  res.send(cards_count);
}

module.exports = {
  getCardsCount,
};
