const Validator = require("fastest-validator");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const Models = require("../models");
const User = Models.User;

function userIndex(req, res) {
  console.log(req);
  res.json({ user1: { user: "Wael" }, user2: { user: "Raee" } });
}

async function userDetails(req, res) {
  const { id } = req.params;

  const response = await User.findAll();
  res.send(response);
}

async function userLogin(req, res) {
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
              email: email,
              user_id: user.id,
            },
            process.env.JWT_KEY,
            (err, token) => {
              return res.status(200).json({
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

async function userSignUp(req, res) {
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

  const is_email_used = await User.findOne({ where: { email: email } });

  if (is_email_used) {
    res.status(409).json({
      message: "Email already used!",
    });
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, async (err, hash) => {
        const user = {
          email,
          password: hash,
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

async function userUpdate(req, res) {
  const { id } = req.params;
  const { email, password } = req.body;

  const user = {
    email: email,
    password: sha256(password),
  };

  const response = await User.update(user, { where: { id: id } });
  res.send(response);
}

async function userDelete(req, res) {
  const { id } = req.params;
  const response = User.destroy({ where: { id: id } });
  res.send(response);
}

module.exports = {
  userIndex,
  userDetails,
  userSignUp,
  userLogin,
  userUpdate,
  userDelete,
};
