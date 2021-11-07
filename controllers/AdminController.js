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

async function getAllMatches(req, res) {
  try {
    const response = await Match.findAll({
      order: [
        [Sequelize.col("match_day"), "DESC"],
        [Sequelize.col("kick_off"), "ASC"],
      ],
      include: { all: true },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getTodaysMatches(req, res) {
  const current_date = getCurrentDate();

  try {
    const response = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
      },
      include: { all: true },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getTodaysRooms(req, res) {
  const current_date = getCurrentDate();

  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getAvailableMatches(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getCreateMatchOptions(req, res) {
  try {
    const competitions = await Competition.findAll({});
    const teams = await Team.findAll({});
    res.send({ competitions: competitions, teams: teams });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
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

async function deleteRoom(req, res) {
  const { room_id } = req.params;

  try {
    await Room.destroy({
      where: { id: room_id },
    });
    res.status(200).json({
      message: "Room Successfully Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function editMatchScore(req, res) {
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

  try {
    const match = await Match.findOne({
      where: { id: match_id },
    });

    match.team1_score = team1_score;
    match.team2_score = team2_score;

    await match.save();

    res.status(200).json({
      message: "Score Successfully Edited!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function editRoom(req, res) {
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

  const { room_id } = req.params;
  const { match_id, name } = req.body;

  try {
    const room = await Room.findOne({
      where: { id: room_id },
    });

    room.name = name;
    room.match_id = match_id;

    await room.save();

    res.status(200).json({
      message: "Room Successfully Edited!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getAllMatches,
  getTodaysMatches,
  getTodaysRooms,
  getCreateMatchOptions,
  getAvailableMatches,
  createNewMatch,
  createNewRoom,
  editMatchScore,
  editRoom,
  deleteRoom,
};
