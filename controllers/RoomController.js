const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const Models = require("../models");
const Room = Models.Room;

async function searchRoomById(req, res) {
  const { room_id } = req.params;

  const response = await Room.findOne({
    where: { id: room_id },
  });

  res.send(response);
}

module.exports = {
  searchRoomById,
};
