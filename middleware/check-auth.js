const JWT = require("jsonwebtoken");

// check for a JWT token in the HTTP request
function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded_token = JWT.verify(token, process.env.JWT_KEY);
    req.userData = decoded_token;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token!",
      error: error,
    });
  }
}

// check for a JWT token in the HTTP request & allowing only admin, based on user type in the Token Signature
function checkAuthAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded_token = JWT.verify(token, process.env.JWT_KEY);
    req.userData = decoded_token;

    if (req.userData.user_type == 3) {
      next();
    } else {
      throw "Unauthorized! Admin Only!";
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token!",
      error: error,
    });
  }
}

module.exports = {
  checkAuth,
  checkAuthAdmin,
};
