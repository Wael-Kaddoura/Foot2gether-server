const FCM = require("fcm-node");
const SERVER_KEY =
  "AAAAmDQh_nE:APA91bFcJnYtohVwbGoQv9RSiEZGvn6RDDsIP6bwMx9IYb_b1xXZGteaSZzOT84mVycaU3zVoW02EbfJHE4gu15h-38Wtylb8U5-_yeSL0zJoJpLO7MMISRiDTPf9UJ-nojA8ml4KM88";

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
