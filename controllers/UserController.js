const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const Validator = require("fastest-validator");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const { User, UserFollower } = require("../models");

async function login(req, res) {
  const v = new Validator();
  const schema = {
    email: { type: "email", optional: false, max: 100 },
    password: { type: "string", optional: false, min: 6 },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user == null) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    } else {
      bcryptjs.compare(password, user.password, (err, result) => {
        if (result) {
          const token = JWT.sign(
            {
              user_id: user.id,
            },
            process.env.JWT_KEY,
            (err, token) => {
              return res.json({
                message: "Authentication Successful!",
                token: token,
              });
            }
          );
        } else {
          return res.status(401).json({
            message: "Invalid Credentials!",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function signUp(req, res) {
  const v = new Validator();
  const schema = {
    username: { type: "string", optional: false, min: 2, max: 50 },
    email: { type: "email", optional: false, max: 100 },
    password: { type: "string", optional: false, min: 6 },
    gender: { type: "number", optional: false },
    fav_team_id: { type: "number", optional: false },
  };

  const validation_response = v.validate(req.body, schema);

  if (validation_response !== true) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: validation_response,
    });
  }

  const { username, email, password, gender, fav_team_id } = req.body;

  const is_email_used = await User.findOne({ where: { email: email } });
  const is_username_used = await User.findOne({
    where: { username: username },
  });

  if (is_email_used) {
    res.status(409).json({
      message: "Email already used!",
    });
  } else if (is_username_used) {
    res.status(409).json({
      message: "Username already used!",
    });
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, async (err, hash) => {
        const user = {
          username,
          email,
          password: hash,
          gender,
          fav_team_id,
          user_type_id: 1,
        };

        try {
          const response = await User.create(user);
          res.status(201).json({
            message: "User created successfully!",
            user: response,
          });
        } catch (error) {
          res.status(500).json({
            message: "Something went wrong!",
            error: error,
          });
        }
      });
    });
  }
}

async function searchUsersByUsername(req, res) {
  const { username } = req.params;

  const response = await User.findAll({
    where: { username: { [Op.like]: "%" + username + "%" } },
  });

  res.send(response);
}

async function getFollowing(req, res) {
  const my_id = 2;

  const response = await UserFollower.findAll({
    where: { user_id: my_id },
    include: "following",
  });

  res.send(response);
}

async function getFollowers(req, res) {
  const my_id = 1;

  const response = await UserFollower.findAll({
    where: { following_id: my_id },
    include: "follower",
  });

  res.send(response);
}

async function followUser(req, res) {
  const my_id = 1;
  const { followed_user_id } = req.body;

  const response = await UserFollower.create({
    user_id: my_id,
    following_id: followed_user_id,
  });

  res.send({
    response: response,
    message: "User Followed Successfully!",
  });
}

async function unfollowUser(req, res) {
  const my_id = 1;
  const { followed_user_id } = req.body;

  const response = await UserFollower.destroy({
    where: {
      user_id: my_id,
      following_id: followed_user_id,
    },
  });

  res.send({
    response: response,
    message: "User Unfollowed Successfully!",
  });
}

async function getFollowingCount(req, res) {
  const my_id = 2;

  const response = await UserFollower.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "following_count"],
    ],
    where: { user_id: my_id },
  });

  const following_count = response[0];

  res.send(following_count);
}

async function getFollowersCount(req, res) {
  const my_id = 1;

  const response = await UserFollower.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "followers_count"],
    ],
    where: { following_id: my_id },
  });

  const followers_count = response[0];

  res.send(followers_count);
}

async function getUser(req, res) {
  const { id } = req.params;

  const response = await User.findOne({
    where: { id: id },
    include: "fav_team",
  });

  res.send(response);
}

module.exports = {
  login,
  signUp,
  searchUsersByUsername,
  getFollowing,
  getFollowers,
  followUser,
  unfollowUser,
  getFollowingCount,
  getFollowersCount,
  getUser,
};
