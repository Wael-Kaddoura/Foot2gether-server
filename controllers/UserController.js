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
          const is_admin = user.user_type_id == 3 ? true : false;

          const token = JWT.sign(
            {
              user_id: user.id,
              user_type: user.user_type_id,
            },
            process.env.JWT_KEY,
            (err, token) => {
              return res.json({
                message: "Authentication Successful!",
                token: token,
                isAdmin: is_admin,
                user: {
                  user_id: user.id,
                  username: user.username,
                  user_profile_picture: user.profile_picture,
                  user_cover_photo: user.cover_photo,
                  user_bio: user.bio,
                },
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
    confirm_password: { type: "equal", field: "password" },
    gender: { type: "string", optional: false },
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
  const profile_picture =
    "http://localhost:8000/profile_picture/default_profile_picture.jpg";

  const cover_photo =
    "http://localhost:8000/cover_photo/default_cover_photo.jpg";

  const is_email_used = await User.findOne({ where: { email: email } });
  const is_username_used = await User.findOne({
    where: { username: username },
  });

  if (is_email_used) {
    res.status(409).json({
      conflict: "Email",
      message: "Email already used!",
    });
  } else if (is_username_used) {
    res.status(409).json({
      conflict: "Username",
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
          profile_picture,
          cover_photo,
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

async function getUserType(req, res) {
  const user_id = req.userData.user_id;

  const response = await User.findOne({
    where: { id: user_id },
    attributes: ["user_type_id"],
  });

  res.send(response);
}

async function searchUsersByUsername(req, res) {
  const { username } = req.params;

  const response = await User.findAll({
    attributes: ["username", "profile_picture"],
    where: { username: { [Op.like]: "%" + username + "%" } },
    include: ["fav_team", "follower"],
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

async function getMyProfile(req, res) {
  const id = req.userData.user_id;

  const response = await User.findOne({
    attributes: ["id", "username"],
    where: { id: id },
    include: ["fav_team", "follower", "following"],
  });

  res.send(response);
}

async function saveNotificationToken(req, res) {
  const id = req.userData.user_id;

  const { notification_token } = req.body;

  const user = await User.findOne({
    where: { id: id },
  });

  user.notification_token = notification_token;

  const response = await user.save();

  res.send(response);
}

async function clearNotificationToken(req, res) {
  const id = req.userData.user_id;

  const user = await User.findOne({
    where: { id: id },
  });

  user.notification_token = "";

  const response = await user.save();

  res.send(response);
}

async function changeProfilePicture(req, res) {
  const id = req.userData.user_id;

  const user = await User.findOne({
    where: { id: id },
  });

  user.profile_picture =
    "http://localhost:8000/profile_picture/" + req.file.filename;

  const response = await user.save();

  res.send(response.profile_picture);
}

async function changeCoverPhoto(req, res) {
  const id = req.userData.user_id;

  const user = await User.findOne({
    where: { id: id },
  });

  user.cover_photo = "http://localhost:8000/cover_photo/" + req.file.filename;

  const response = await user.save();

  res.send(response.cover_photo);
}

async function changeBio(req, res) {
  const id = req.userData.user_id;
  const { new_bio } = req.body;

  const user = await User.findOne({
    where: { id: id },
  });

  user.bio = new_bio;

  const response = await user.save();

  res.send(response.bio);
}

async function getUser(req, res) {
  const { id } = req.params;
  const my_id = req.userData.user_id;

  const response = await User.findOne({
    attributes: ["id", "username", "profile_picture", "cover_photo", "bio"],
    where: { id: id },
    include: ["fav_team", "follower", "following"],
  });

  const check_if_followed = await UserFollower.findOne({
    where: { user_id: my_id, following_id: id },
  });

  let is_followed = false;
  if (check_if_followed) {
    is_followed = true;
  }

  res.send({ user_data: response, is_followed });
}

async function userTypeCheck(user_id) {
  //getting followers count
  const followed_user_info = await UserFollower.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "followers_count"],
    ],
    where: { following_id: user_id },
  });

  const followers_count = followed_user_info[0].dataValues.followers_count;

  //changing user type depending on followers count
  if (followers_count >= 5) {
    const user = await User.findOne({
      where: { id: user_id },
    });

    user.user_type_id = 2;

    await user.save();
  } else {
    const user = await User.findOne({
      where: { id: user_id },
    });

    user.user_type_id = 1;

    await user.save();
  }
}

async function followUser(req, res) {
  const id = req.userData.user_id;

  const { followed_user_id } = req.body;

  const response = await UserFollower.create({
    user_id: id,
    following_id: followed_user_id,
  });

  //checking user type based on followers count
  await userTypeCheck(followed_user_id);

  res.send({
    response: response,
    message: "User Followed Successfully!",
  });
}

async function unfollowUser(req, res) {
  const id = req.userData.user_id;

  const { unfollowed_user_id } = req.body;

  const response = await UserFollower.destroy({
    where: {
      user_id: id,
      following_id: unfollowed_user_id,
    },
  });

  //checking user type based on followers count
  await userTypeCheck(unfollowed_user_id);

  res.send({
    response: response,
    message: "User Unfollowed Successfully!",
  });
}

module.exports = {
  login,
  signUp,
  getUserType,
  searchUsersByUsername,
  getFollowing,
  getFollowers,
  followUser,
  unfollowUser,
  saveNotificationToken,
  clearNotificationToken,
  getFollowingCount,
  getFollowersCount,
  getMyProfile,
  changeProfilePicture,
  changeCoverPhoto,
  changeBio,
  getUser,
};
