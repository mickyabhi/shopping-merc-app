import { actions } from "./actions";
import { takeEvery } from "redux-saga/effects";
import {
  getItemFromAsyncStorage,
  setItemInAsyncStorage,
} from "../../../utils/storage.utils";
import { Auth } from "aws-amplify";
import messaging from "@react-native-firebase/messaging";
import crashlytics from "@react-native-firebase/crashlytics";
import { loadAmplifyAuth } from "../../../utils/common.utils";

function* signIn() {
  console.log("signIn");
  try {
    yield loadAmplifyAuth();

    const cognitoUserData = yield getItemFromAsyncStorage("cognitoUserData");
    const cognitoUser = JSON.parse(cognitoUserData);
    console.log("performCognitoAuth.auth.user", cognitoUser);

    const currentUserId = cognitoUser.attributes.phone_number.replace("+", "_");

    let topic = "MAU" + currentUserId;
    console.log("subscribeToTopic.topic", topic);

    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log("subscribeToTopic.success", topic))
      .catch((err) => {
        console.log("subscribeToTopic.err", err);
        crashlytics().recordError(err);
        return null;
      });

    yield setItemInAsyncStorage("current_user_id", currentUserId);
    yield setItemInAsyncStorage(
      "accessToken",
      cognitoUser?.signInUserSession?.accessToken?.jwtToken
    );
    yield setItemInAsyncStorage(
      "idToken",
      cognitoUser.signInUserSession.idToken.jwtToken
    );
  } catch (error) {
    crashlytics().recordError(error);
    console.log("signIn.error", error);
  }
}

function* saga() {
  yield takeEvery(actions.SIGN_IN_USER, signIn);
}
export default saga;
