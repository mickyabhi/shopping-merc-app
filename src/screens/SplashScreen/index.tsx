import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import auth from "@react-native-firebase/auth";
import splashImage from "../../../assets/images/splash_img.png";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import * as queries from "../../graphql/queries";
import { API } from "aws-amplify";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import {
  isEmptyString,
  loadAmplifyAuth,
  signOutUser,
} from "../../utils/common.utils";
import { Dialog, Button, Paragraph } from "react-native-paper";
import { Linking } from "react-native";
import database from "@react-native-firebase/database";
import Config from "react-native-config";
import { useDispatch } from "react-redux";
import { showAlertToast } from "../AppStore/actions";
import { AlertMessage, ErrorMessage } from "../../utils/constants";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [showForceUpdate, setShowForceUpdate] = useState(null);

  const initApp = async () => {
    try {
      const currentUserId = await getItemFromAsyncStorage("current_user_id");
      const storeId = await getItemFromAsyncStorage("store_id");
      const currentUser = auth()?.currentUser;
      console.log("currentUser", currentUser);

      if (currentUser == null || isEmptyString(currentUserId)) {
        await signOutUser().then(navigation.replace("SignInWithPhoneNumber"));
        return;
      }

      const user = await API.graphql({
        query: queries.getUser,
        variables: { id: currentUserId },
      }).then((resp) => resp.data.getUser);

      const minAppVersion = await database()
        .ref("/AppForceUpdateVersion/merchant")
        .once("value")
        .then((snapshot) => parseInt(snapshot.val()))
        .catch((err) => {
          console.log("database.AppForceUpdateVersion/customer", err);
          return parseInt(Config.VERSION_CODE);
        });

      const forceUpdateRequired = Config.VERSION_CODE < minAppVersion;
      console.log("minAppVersion", minAppVersion);
      console.log("Config.VERSION_CODE", Config.VERSION_CODE);
      console.log("forceUpdateRequired", forceUpdateRequired);

      if (forceUpdateRequired) {
        setShowForceUpdate(true);
        return;
      }

      if (user == null) {
        navigation.replace("MapScreen");
        return;
      }

      const bankInfo = await API.graphql({
        query: queries.bankInfoByStoreId,
        variables: { storeId: storeId },
      }).then((resp) => resp.data.bankInfoByStoreId.items);
      console.log("bankInfo", bankInfo);

      if (bankInfo.length == 0) {
        navigation.replace("BankInfo");
        return;
      }

      // await loadAmplifyAuth();
      navigation.replace("BottomTabs");
      return;
    } catch (error) {
      console.log("initApp.error", error);
      if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
        dispatch(
          showAlertToast({
            alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,

            actionButtonTitle: "OK",
          })
        );
      }
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  const forceUpgradeDialog = () => (
    <Dialog visible={true}>
      <Dialog.Title>New version available</Dialog.Title>
      <Dialog.Content>
        <Paragraph>
          Please, update B.Local app to new version to enjoy awesome shopping
          experience.
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          color="#F79939"
          onPress={() => {
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=" +
                Config.APPLICATION_ID
            );
          }}
        >
          Update
        </Button>
      </Dialog.Actions>
    </Dialog>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor="#F5842E" />
      <ImageBackground source={splashImage} style={styles.splashImage} />
      {showForceUpdate && forceUpgradeDialog()}
    </SafeAreaView>
  );
};

export default SplashScreen;
