const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");
const Validator = require("fastest-validator");

const { Room, Match, Competition, Team, User } = require("../models");

function getCurrentTime() {
  const current_time = date.format(new Date(), "HH:mm:ss");

  return current_time;
}

function getCurrentDate() {
  const current_date = date.format(new Date(), "YYYY-MM-DD");

  return current_date;
}

async function getCardsCount(req, res) {
  const current_date = getCurrentDate();

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

  // //get today's rooms count
  // const todays_rooms_data = await Room.findAll({
  //   attributes: [
  //     [Sequelize.fn("COUNT", Sequelize.col("Room.id")), "todays_rooms_count"],
  //   ],

  //   // include: [
  //   //   {
  //   //     model: Match,
  //   //     as: "matchroom",
  //   //     where: {
  //   //       match_day: current_date,
  //   //     },
  //   //   },
  //   // ],
  // });

  // const todays_rooms_count = todays_rooms_data[0].dataValues.todays_rooms_count;

  // const cards_count = {
  //   total_matches_count,
  //   todays_matches_count,
  //   // todays_rooms_count,
  // };

  res.send({ total_matches_count, todays_matches_count });
}

async function getAllMatches(req, res) {
  const response = await Match.findAll({
    order: [
      [Sequelize.col("match_day"), "DESC"],
      [Sequelize.col("kick_off"), "ASC"],
    ],
    include: { all: true },
  });

  res.send(response);
}

async function getTodaysMatches(req, res) {
  const current_date = getCurrentDate();

  const response = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
    },
    include: { all: true },
  });

  res.send(response);
}

async function getTodaysRooms(req, res) {
  const current_date = getCurrentDate();

  const response = await Room.findAll({
    order: [
      [Sequelize.col("matchroom.kick_off"), "DESC"],
      [Sequelize.col("match_id")],
    ],

    include: [
      {
        model: Match,
        as: "matchroom",
        where: {
          match_day: current_date,
        },
        include: ["team1", "team2"],
      },
      {
        model: User,
        as: "creator",
      },
    ],
  });

  res.send(response);
}

async function getAvailableMatches(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  const response = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
      full_time: { [Op.gt]: current_time },
    },
    order: [[Sequelize.col("kick_off"), "ASC"]],
    include: ["team1", "team2"],
  });

  res.send(response);
}

async function getCreateMatchOptions(req, res) {
  const competitions = await Competition.findAll({});
  const teams = await Team.findAll({});

  res.send({ competitions: competitions, teams: teams });
}

async function createNewMatch(req, res) {
  const v = new Validator();
  const schema = {
    match_day: { type: "string", optional: false },
    kick_off: { type: "string", optional: false },
    full_time: { type: "string", optional: false },
    competition_id: { type: "number", optional: false },
    stadium: { type: "string", optional: false },
    team1_id: { type: "number", optional: false },
    team2_id: { type: "number", optional: false },
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

async function createNewRoom(req, res) {
  const v = new Validator();
  const schema = {
    match_id: { type: "string", optional: false },
    name: { type: "string", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const { match_id, name } = req.body;
  const new_room = {
    match_id,
    creator_id: 1,
    name,
  };

  try {
    const response = await Room.create(new_room);
    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function changeMatchScore(req, res) {
  const v = new Validator();
  const schema = {
    match_id: { type: "number", optional: false },
    team1_score: { type: "number", optional: false },
    team2_score: { type: "number", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const { match_id, team1_score, team2_score } = req.body;

  const match = await Match.findOne({
    where: { id: match_id },
  });

  match.team1_score = team1_score;
  match.team2_score = team2_score;

  const response = await match.save();

  res.send(response);
}

module.exports = {
  getCardsCount,
  getAllMatches,
  getTodaysMatches,
  getTodaysRooms,
  getCreateMatchOptions,
  getAvailableMatches,
  createNewMatch,
  createNewRoom,
  changeMatchScore,
};
