import * as mutations from "../graphql/mutations";
import { API } from "aws-amplify";
import axios from "axios";
import { firebase } from "@react-native-firebase/auth";
import Config from "react-native-config";

export const sendNotificationToTopic = async (title, body, topic, metaData) => {
  const authToken = await firebase.auth().currentUser.getIdToken();
  topic = topic.replace("+", "_");

  let notification = {
    title,
    body,
    topic,
    isRead: false,
    metaData: JSON.stringify(metaData),
  };

  console.log("sendNotificationToTopic.notification", notification);

  await axios.post(Config.NOTIFICATION_API, notification, {
    headers: {
      Authorization: authToken,
    },
  });
  console.log("axios.notification", notification);
  const createNotification = await API.graphql({
    query: mutations.createNotification,
    variables: { input: notification },
  }).then((resp) => resp.data.createNotification);

  console.log("sendNotificationToTopic.createNotification", createNotification);
};
