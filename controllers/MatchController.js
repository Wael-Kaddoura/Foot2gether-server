const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");

const { Match } = require("../models");

const current_date_time = new Date();
const current_date = date.format(current_date_time, "YYYY-MM-DD");
const current_time = date.format(current_date_time, "HH:mm:ss");

async function getMatch(req, res) {
  const { id } = req.params;

  const response = await Match.findOne({
    where: {
      id: id,
    },
    include: { all: true },
  });

  res.send(response);
}

async function getLiveMatches(req, res) {
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
}

async function getFinishedMatchesToday(req, res) {
  const response = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
      full_time: { [Op.lte]: current_time },
    },
    include: { all: true },
  });

  res.send(response);
}

async function getUpcomingMatchesToday(req, res) {
  const response = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
      kick_off: { [Op.gt]: current_time },
    },
    include: { all: true },
  });

  res.send(response);
}

async function getNextMatch(req, res) {
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
}

async function getAvailableMatches(req, res) {
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
}

module.exports = {
  getMatch,
  getLiveMatches,
  getFinishedMatchesToday,
  getUpcomingMatchesToday,
  getNextMatch,
  getAvailableMatches,
};
