import * as React from "react";
import { Dialog, Button, Paragraph } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import { useDispatch } from "react-redux";
import { showRateUsModal } from "../../AppStore/actions";
const RateUsModal = (props) => {
  const dispatch = useDispatch();
  const rateUsHandler = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=com.blocal.merchant"
    );
    dispatch(showRateUsModal(false));
  };
  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Dialog.Title style={styles.rateUsText}>Rate Us</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={styles.text}>
          If you've enjoyed using the app,
        </Paragraph>
        <Paragraph style={styles.text}>
          Please take a minute to 'Rate Us'.
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions style={styles.dialogAction}>
        <Button
          color="#F79939"
          onPress={props.onDismiss}
          labelStyle={styles.laterText}
        >
          LATER
        </Button>
        <Button
          color="#F79939"
          onPress={rateUsHandler}
          labelStyle={styles.doItNowText}
        >
          DO IT NOW
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default RateUsModal;

const styles = StyleSheet.create({
  rateUsText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(31),
    color: "#000",
  },
  text: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(31),
    color: "gray",
  },
  laterText: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(31),
  },
  doItNowText: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(31),
  },
  dialogAction: {
    justifyContent: "space-between",
  },
});
