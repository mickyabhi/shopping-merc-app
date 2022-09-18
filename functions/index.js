/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationToTopic = functions.https.onRequest(
  async (req, res) => {
    // const tokenId = req.get("Authorization").split("Bearer ")[1];
    // admin
    //   .auth()
    //   .verifyIdToken(tokenId)
    //   .catch((err) => res.status(401).send(err));
    console.log("sendNotificationToTopic.req", req);
    const body = req.body;
    console.log("sendNotificationToTopic.body", body);

    if (body == null) res.status(400).send({ err: "Invalid request" });

    const payload = {
      topic: body.topic,
      notification: {
        title: body.title,
        body: body.body,
      },
      android: {
        notification: {
          channel_id: "blocal_notification_channel",
        },
      },
      data: {
        body: body.metaData,
      },
    };

    const resp = await admin
      .messaging()
      .send(payload)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return { success: true };
      });

    console.log("sendNotificationToTopic.resp", resp);
    res.json(resp);
  }
);
