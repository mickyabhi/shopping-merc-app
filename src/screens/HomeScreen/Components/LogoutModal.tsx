import * as React from "react";
import { Dialog, Button, Paragraph } from "react-native-paper";
import { StyleSheet, ToastAndroid } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import { Auth } from "aws-amplify";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import crashlytics from "@react-native-firebase/crashlytics";
import { useDispatch } from "react-redux";
import { showAlertToast } from "../../AppStore/actions";
import { AlertMessage } from "../../../utils/constants";

const LogoutModal = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const logOutHandle = async () => {
    props.onDismiss();
    await auth()
      .signOut()
      .then(() => {
        ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
      });

    try {
      await Auth.signOut().then(() => AsyncStorage.clear());
    } catch (error) {
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
    navigation.replace("SignInWithPhoneNumber");
  };
  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Dialog.Title style={styles.logoutText}>Logout</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={styles.text}>
          Are you sure you want to logout?
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions style={styles.dialogAction}>
        <Button
          color="#F79939"
          onPress={props.onDismiss}
          labelStyle={styles.cancelText}
        >
          CANCEL
        </Button>
        <Button
          color="#F79939"
          onPress={logOutHandle}
          labelStyle={styles.okText}
        >
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  logoutText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(31),
    color: "#000",
  },
  text: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(31),
    color: "gray",
  },
  cancelText: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(31),
  },
  okText: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(31),
  },
  dialogAction: {
    justifyContent: "space-around",
  },
});
