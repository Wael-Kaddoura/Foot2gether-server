const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const date = require("date-and-time");
const Validator = require("fastest-validator");

const { Room, Match, User } = require("../models");
const FCMController = require("./FCMController");

const current_date_time = new Date();
const current_date = date.format(current_date_time, "YYYY-MM-DD");
const current_time = date.format(current_date_time, "HH:mm:ss");

async function getRoomById(req, res) {
  const { room_id } = req.params;

  const response = await Room.findOne({
    where: { id: room_id },
    include: { all: true },
  });

  res.send(response);
}

async function getLiveRooms(req, res) {
  const response = await Room.findAll({
    order: [
      [Sequelize.col("current_participants_number"), "DESC"],
      [Sequelize.col("matchroom.kick_off"), "ASC"],
    ],

    include: [
      {
        model: Match,
        as: "matchroom",
        where: {
          match_day: current_date,
          kick_off: { [Op.lte]: current_time },
          full_time: { [Op.gte]: current_time },
        },
        include: ["team1", "team2"],
      },
      {
        model: User,
        as: "creator",
      },
    ],
  });

  res.send(response);
}

async function checkIfLive(req, res) {
  const { room_id } = req.params;

  const live_matches = await Match.findAll({
    order: [[Sequelize.col("kick_off"), "ASC"]],
    where: {
      match_day: current_date,
      kick_off: { [Op.lte]: current_time },
      full_time: { [Op.gte]: current_time },
    },
    include: "matchroom",
  });

  let live_rooms = [];
  //extracting live rooms IDs
  for (const match_id in live_matches) {
    for (const live_room of live_matches[match_id].matchroom) {
      live_rooms.push(live_room.id);
    }
  }

  const is_live = live_rooms.includes(parseInt(room_id));

  res.send(is_live);
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

async function createRoom(req, res, next) {
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

  const new_room = {
    match_id,
    creator_id,
    name,
    current_participants_number: 0,
  };

  const match_info = await Match.findOne({
    where: { id: match_id },
    include: { all: true },
  });

  const creator_info = await User.findOne({
    where: { id: creator_id },
    include: "follower",
  });

  const followers_list = creator_info.follower;
  let followers_tokens = [];

  //getting notification token of users
  for (const follower of followers_list) {
    const follower_token = await User.findOne({
      where: { id: follower.user_id },
      attributes: ["notification_token"],
    });

    if (follower_token.notification_token) {
      followers_tokens.push(follower_token.notification_token);
    }
  }

  const notification_info = {
    creator_username: creator_info.username,
    team1: match_info.team1.name,
    team2: match_info.team2.name,
  };

  req.notificationInfo = notification_info;
  req.followersTokens = followers_tokens;

  try {
    const response = await Room.create(new_room);
    FCMController.sendNotification(req, res, next);
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
  checkIfLive,
  getMatchRooms,
  getUserRooms,
  getMyRooms,
  createRoom,
};
