const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const Models = require("../models");
const Room = Models.Room;

async function getRoomById(req, res) {
  const { room_id } = req.params;

  const response = await Room.findOne({
    where: { id: room_id },
  });

  res.send(response);
}

async function getMatchRooms(req, res) {
  const { match_id } = req.body;

  const response = await Room.findAll({
    where: { match_id: match_id },
  });

  res.send(response);
}

module.exports = {
  getRoomById,
  getMatchRooms,
};
