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

async function getAllMatches(req, res) {
  const response = await Match.findAll({
    order: [
      [Sequelize.col("match_day"), "DESC"],
      [Sequelize.col("kick_off"), "ASC"],
    ],
  });

  res.send(response);
}

async function getTodaysMatches(req, res) {
  const response = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
    },
  });

  res.send(response);
}

async function getTodaysRooms(req, res) {
  const response = await Room.findAll({
    order: [[Sequelize.col("matchroom.kick_off"), "DESC"]],

    include: [
      {
        model: Match,
        as: "matchroom",
        where: {
          match_day: current_date,
        },
      },
    ],
  });

  res.send(response);
}

async function createNewMatch(req, res) {
  const v = new Validator();
  const schema = {
    match_day: { type: "string", optional: false },
    kick_off: { type: "string", optional: false },
    full_time: { type: "string", optional: false },
    competition_id: { type: "string", optional: false },
    stadium: { type: "string", optional: false },
    team1_id: { type: "string", optional: false },
    team2_id: { type: "string", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const {
    match_day,
    kick_off,
    full_time,
    competition_id,
    stadium,
    team1_id,
    team2_id,
  } = req.body;

  const new_match = {
    match_day,
    kick_off,
    full_time,
    competition_id,
    stadium,
    team1_id,
    team2_id,
    team1_score: 0,
    team2_score: 0,
  };

  try {
    const response = await Match.create(new_match);
    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getCardsCount,
  getAllMatches,
  getTodaysMatches,
  getTodaysRooms,
  createNewMatch,
};
