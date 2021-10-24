const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const Validator = require("fastest-validator");

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
    order: [[Sequelize.col("current_participants_number"), "DESC"]],
    include: { all: true },
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
    order: [[Sequelize.col("current_participants_number"), "DESC"]],
    where: { match_id: match_id },
    include: "creator",
  });

  res.send(response);
}

async function getUserRooms(req, res) {
  const { user_id } = req.params;

  const response = await Room.findAll({
    order: [[Sequelize.col("current_participants_number"), "DESC"]],
    where: { creator_id: user_id },
    include: { all: true },
  });

  res.send(response);
}

async function getMyRooms(req, res) {
  const user_id = req.userData.user_id;

  const response = await Room.findAll({
    order: [[Sequelize.col("current_participants_number"), "DESC"]],
    where: { creator_id: user_id },
    include: { all: true },
  });

  res.send(response);
}

async function createRoom(req, res) {
  const v = new Validator();
  const schema = {
    match_id: { type: "string", optional: false },
    name: { type: "string", optional: false, min: 2, max: 20 },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const { match_id, name } = req.body;
  const creator_id = req.userData.user_id;

  const room = {
    match_id,
    creator_id,
    name,
    current_participants_number: 0,
  };

  try {
    const response = await Room.create(room);
    res.status(201).json({
      message: "Room created successfully!",
      room: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  getRoomById,
  getLiveRooms,
  getLiveRoomsCount,
  getMatchRooms,
  getUserRooms,
  getMyRooms,
  createRoom,
};
