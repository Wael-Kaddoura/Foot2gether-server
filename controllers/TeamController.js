const { Team } = require("../models");

async function getTeamLogo(req, res) {
  const { id } = req.params;

  const response = await Team.findOne({
    where: { id: id },
  });

  res.send(response);
}

async function getTopTeams(req, res) {
  const response = await Team.findAll({
    limit: 16,
  });

  res.send(response);
}

module.exports = {
  getTeamLogo,
  getTopTeams,
};
