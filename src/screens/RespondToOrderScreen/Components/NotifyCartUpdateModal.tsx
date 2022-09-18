import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import { Modal } from "react-native-paper";

const NotifyCartUpdateModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      contentContainerStyle={styles.containerStyle}
    >
      <View style={styles.notifyRefundModalView}>
        <Text allowFontScaling={false} style={styles.notifyMessage}>
          Notification to the customer will be sent on the non-availability of
          the product. A refund will be initiated
        </Text>
        <View style={styles.actionTextsView}>
          <Text
            style={styles.actionText}
            onPress={() => props?.onCancelHandler && props?.onCancelHandler()}
          >
            CANCEL
          </Text>
          <Text
            style={styles.actionText}
            onPress={() => props?.onAcceptHandler && props?.onAcceptHandler()}
          >
            OK
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default NotifyCartUpdateModal;

const styles = StyleSheet.create({
  notifyRefundModalView: {
    paddingHorizontal: scaledValue(60),
    paddingTop: scaledValue(60),
  },
  notifyMessage: {
    color: "gray",
  },
  actionTextsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scaledValue(39),
    paddingLeft: scaledValue(338),
  },
  actionText: {
    color: "#F79939",
  },
  containerStyle: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: scaledValue(505.5),
    left: scaledValue(39),
    right: scaledValue(101.75),
    borderRadius: scaledValue(8),
    width: scaledValue(671),
  },
});
