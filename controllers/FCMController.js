const FCM = require("fcm-node");
const SERVER_KEY =
  "AAAAmDQh_nE:APA91bFcJnYtohVwbGoQv9RSiEZGvn6RDDsIP6bwMx9IYb_b1xXZGteaSZzOT84mVycaU3zVoW02EbfJHE4gu15h-38Wtylb8U5-_yeSL0zJoJpLO7MMISRiDTPf9UJ-nojA8ml4KM88";

async function sendNotification(req, res, next) {
  try {
    let fcm = new FCM(SERVER_KEY);
    let message = {
      to: "fr0z-B2m8M1Xn72kQc97zv:APA91bEUjSubqXn9i6NnjkZwvUvslzyD8FM6EiSUVmJcSA_oqJOcoo_o371JHrQQA4nSL0EqJoxu2P9tm3LiUzeqHXVw-A4h68fYg3jJ0cddS5gCk5EvxXd9vf8TjC1heKubBYnbt-sp",
      notification: {
        title: req.body.title,
        body: req.body.body,
        // click_action: "FCM_PLUGIN_ACTIVITY",
        // icon: "fcm_push_icon",
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
