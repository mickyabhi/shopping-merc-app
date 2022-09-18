import React, { useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { scaledValue } from "../../../utils/design.utils";
import Button from "../../../components/Button";
import okIcon from "../../../../assets/images/okIcon.png";
// import closeIcon from "../../../../assets/images/close.png";
import LinearGradient from "react-native-linear-gradient";
const DeleteModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      // contentContainerStyle={styles.cardContainer}
    >
      <>
        {props.showOfferSuccess === "first" && (
          <View style={styles.cardMainView}>
            <View>
              <Text allowFontScaling={false} style={styles.text}>
                Do you wish to delete the offer?
              </Text>
              <View style={styles.bottomTabs}>
                <Button
                  title="No"
                  width={scaledValue(227)}
                  height={scaledValue(85)}
                  borderColor="#D9D9D9"
                  color="#000000"
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(26)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.hideModal();
                  }}
                />
                <Button
                  title="Yes"
                  width={scaledValue(227)}
                  height={scaledValue(85)}
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  color="#FFFFFF"
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(26)}
                  fontFamily="Lato-Regular"
                  onPress={() => {
                    props.setShowOfferSuccess("second");
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {props.showOfferSuccess === "second" && (
          <LinearGradient
            colors={["#F26522", "#F8993A", "#F26522"]}
            style={styles.linearGradient}
          >
            <View style={styles.cardView}>
              <Image source={okIcon} style={styles.okIcon} />
              <Text allowFontScaling={false} style={styles.offerDeletedText}>
                Offer deleted succesfully
              </Text>
            </View>
          </LinearGradient>
        )}
      </>
    </Modal>
  );
};

export default DeleteModal;
const styles = StyleSheet.create({
  cardMainView: {
    width: scaledValue(640),
    height: scaledValue(254),
    backgroundColor: "#FFFFFF",
    borderRadius: scaledValue(8),
    elevation: scaledValue(2),
    left: scaledValue(55),
  },
  text: {
    textAlign: "center",
    marginTop: scaledValue(44.48),
    marginBottom: scaledValue(44.48),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(26),
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: scaledValue(44),
  },
  linearGradient: {
    width: scaledValue(560),
    height: scaledValue(331),
    borderRadius: scaledValue(8),
    alignSelf: "center",
  },
  // closeIconView: {
  //   // left: 200,
  // },
  // closeIcon: {
  //   width: scaledValue(28),
  //   height: scaledValue(27.08),
  //   // alignSelf: "flex-end",
  // },
  cardView: {
    alignItems: "center",
    paddingTop: scaledValue(51),
  },
  okIcon: {
    width: scaledValue(165),
    height: scaledValue(165),
    marginBottom: scaledValue(29),
  },
  offerDeletedText: {
    color: "#FFFFFF",
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(29),
  },
});
