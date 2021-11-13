const FCM = require("fcm-node");
const SERVER_KEY =
  "AAAAEXROxtE:APA91bHXglLhhY1NMmX9XpuRwf5XQRSZS9RCyaBiAnZdnrHOWSYvGLMAfey3nUhfPecuu1k9__VW7aifrd-B8bT_rA4EaVUJ403gK07XPOB1Lpt0eY2BjZsPDgF1qxiIsp0FSogMOZet";

async function sendNotification(req, res, next) {
  let { creator_username, team1, team2 } = req.notificationInfo;

  let title = "New Room Created!";
  let body = `${creator_username} created a room to watch ${team1} vs ${team2}!`;
  let regTokens = req.followersTokens;

  try {
    let fcm = new FCM(SERVER_KEY);
    let message = {
      registration_ids: regTokens,
      notification: {
        title,
        body,
      },
    };

    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendNotification,
};
