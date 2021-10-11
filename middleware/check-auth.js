const JWT = require("jsonwebtoken");

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

module.exports = {
  checkAuth,
};
