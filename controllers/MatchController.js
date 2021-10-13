const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");

const { Match } = require("../models");

const current_date_time = new Date();
const current_date = date.format(current_date_time, "YYYY-MM-DD");
const current_time = date.format(current_date_time, "HH:mm:ss");

async function getLiveMatches(req, res) {
  const response = await Match.findAll({
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
    where: {
      match_day: current_date,
      kick_off: { [Op.gt]: current_time },
    },
    include: { all: true },
  });

  res.send(response);
}

async function getLiveMatchesCount(req, res) {
  const response = await Match.findAll({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "live_count"]],
    where: {
      match_day: current_date,
      kick_off: { [Op.lte]: current_time },
      full_time: { [Op.gte]: current_time },
    },
  });

  const live_count = response[0];

  res.send(live_count);
}

async function getFinishedMatchesCount(req, res) {
  const response = await Match.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "finished_count"],
    ],
    where: {
      match_day: current_date,
      full_time: { [Op.lte]: current_time },
    },
  });

  const finished_count = response[0];

  res.send(finished_count);
}

module.exports = {
  getLiveMatches,
  getFinishedMatchesToday,
  getUpcomingMatchesToday,
  getLiveMatchesCount,
  getFinishedMatchesCount,
};
