const { Team } = require("../models");

async function getTeamLogo(req, res) {
  const { id } = req.params;

  try {
    const response = await Team.findOne({
      where: { id: id },
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function getTopTeams(req, res) {
  try {
    const response = await Team.findAll({
      limit: 16,
    });

    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getTeamLogo,
  getTopTeams,
};
