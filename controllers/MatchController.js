const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");

const { Match, Room } = require("../models");

function getCurrentTime() {
  const current_time = date.format(new Date(), "HH:mm:ss");

  return current_time;
}

function getCurrentDate() {
  const current_date = date.format(new Date(), "YYYY-MM-DD");

  return current_date;
}

async function getMatch(req, res) {
  const { id } = req.params;

  try {
    const response = await Match.findOne({
      where: {
        id: id,
      },
      include: [
        "competition",
        "team1",
        "team2",
        {
          model: Room,
          as: "matchroom",
          include: ["creator"],
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

async function getLiveMatches(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
    const response = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
        kick_off: { [Op.lte]: current_time },
        full_time: { [Op.gte]: current_time },
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

async function getFinishedMatchesToday(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
    const response = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
        full_time: { [Op.lte]: current_time },
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

async function getUpcomingMatchesToday(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
    const response = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
        kick_off: { [Op.gt]: current_time },
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

async function getNextMatch(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
    const response = await Match.findAll({
      where: {
        match_day: current_date,
        kick_off: { [Op.gt]: current_time },
      },
      order: [[Sequelize.col("kick_off"), "ASC"]],
      limit: 1,
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

async function getAvailableMatches(req, res) {
  const current_date = getCurrentDate();
  const current_time = getCurrentTime();

  try {
    const live_matches = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
        kick_off: { [Op.lte]: current_time },
        full_time: { [Op.gte]: current_time },
      },
      include: ["team1", "team2"],
    });

    const upcoming_matches = await Match.findAll({
      order: [[Sequelize.col("kick_off"), "ASC"]],
      where: {
        match_day: current_date,
        kick_off: { [Op.gt]: current_time },
      },
      include: { all: true },
    });

    res.send({ live_matches, upcoming_matches });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getMatch,
  getLiveMatches,
  getFinishedMatchesToday,
  getUpcomingMatchesToday,
  getNextMatch,
  getAvailableMatches,
};
