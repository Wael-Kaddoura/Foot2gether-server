const { Team } = require("../models");

async function getTeamLogo(req, res) {
  const { id } = req.params;

  const response = await Team.findOne({
    where: { id: id },
  });

  res.send(response);
}

module.exports = {
  getTeamLogo,
};
