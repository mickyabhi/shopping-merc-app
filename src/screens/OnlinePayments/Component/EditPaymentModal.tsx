import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, Modal } from "react-native-paper";
import { scaledValue } from "../../../utils/design.utils";
import Ionicons from "react-native-vector-icons/Ionicons";

const EditPaymentModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.containerStyle}
    >
      <View style={styles.iconView}>
        <Ionicons name="folder-outline" size={22} color="#058375" />
      </View>
      <View style={{ paddingLeft: scaledValue(35) }}>
        <View style={styles.mainTextView}>
          <Text allowFontScaling={false} style={styles.mainTxt}>
            Allow{" "}
          </Text>
          <Text allowFontScaling={false} style={styles.paymentTxt}>
            B.Local Merchant{" "}
          </Text>
          <Text allowFontScaling={false} style={styles.mainTxt}>
            to access{" "}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.mainTxt}>
          photos, media and files on your device?
        </Text>
      </View>
      <Divider style={styles.dividerLine} />
      <View style={styles.buttonView}>
        <TouchableOpacity>
          <Text allowFontScaling={false} style={styles.bottomBtn}>
            Allow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.hideModal}>
          <Text allowFontScaling={false} style={styles.bottomBtn}>
            Deny
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditPaymentModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: scaledValue(590),
    borderRadius: scaledValue(25),
  },
  iconView: {
    alignItems: "center",
    marginTop: scaledValue(35),
  },
  mainTextView: {
    paddingHorizontal: scaledValue(40),
    paddingTop: scaledValue(20),
    paddingBottom: scaledValue(10),
    flexDirection: "row",
  },
  mainTxt: {
    color: "#505152",
  },
  dividerLine: {
    marginTop: scaledValue(19.69),
  },
  paymentTxt: {
    fontWeight: "bold",
    color: "#000000",
  },
  buttonView: {
    alignItems: "center",
    paddingTop: scaledValue(20),
    paddingBottom: scaledValue(20),
  },
  bottomBtn: {
    color: "#058375",
    fontWeight: "bold",
    padding: scaledValue(10),
  },
});
