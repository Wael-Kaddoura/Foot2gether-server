const { Team } = require("../models");

async function getTeamLogo(req, res) {
  const { id } = req.params;

  const response = await Team.findOne({
    where: { id: id },
  });

  res.send(response);
}

async function getAllTeam(req, res) {
  const response = await Team.findAll({});

  res.send(response);
}

module.exports = {
  getTeamLogo,
  getAllTeam,
};
