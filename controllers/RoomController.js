const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const { Room } = require("../models");

async function getRoomById(req, res) {
  const { room_id } = req.params;

  const response = await Room.findOne({
    where: { id: room_id },
    include: "creator",
  });

  res.send(response);
}

async function getLiveRooms(req, res) {
  const response = await Room.findAll({
    include: "creator",
  });

  res.send(response);
}

async function getLiveRoomsCount(req, res) {
  const response = await Room.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "live_rooms_count"],
    ],
  });

  const live_rooms_count = response[0];

  res.send(live_rooms_count);
}

async function getMatchRooms(req, res) {
  const { match_id } = req.params;

  const response = await Room.findAll({
    where: { match_id: match_id },
    include: "creator",
  });

  res.send(response);
}

async function getUserRooms(req, res) {
  const { user_id } = req.body;

  const response = await Room.findAll({
    where: { creator_id: user_id },
    include: "match",
  });

  res.send(response);
}

module.exports = {
  getRoomById,
  getLiveRooms,
  getLiveRoomsCount,
  getMatchRooms,
  getUserRooms,
};
