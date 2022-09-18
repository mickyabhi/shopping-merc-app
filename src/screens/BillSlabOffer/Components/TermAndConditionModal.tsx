import * as React from "react";
import { Modal } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import Button from "../../../components/Button";
const MyComponent = (props) => {
  // const containerStyle = ;

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.containerStyle}
    >
      <View style={styles.modalHeadingView}>
        <Text allowFontScaling={false} style={styles.modalHeading}>
          Terms and conditions on offer
        </Text>
      </View>
      <ScrollView style={styles.scrollbar}>
        <View style={styles.modalBody}>
          <Text allowFontScaling={false} style={styles.modalText}>
            1. Valid only on …… (Credit Cards, Debit Cards, Net banking etc){" "}
            {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            2. Get instant discounts on your orders from ….. (date/month/year)
            to ….. (date/ month/year) {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            3. Offer strictly valid on one transaction per customer mobile
            number. {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            4. Coupon code is valid for one time activation and one transaction
            only {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            5. Offer applicable on promo threshold amount only {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            6. Min cart value required Rs…… and above Max coupon discount Rs…..{" "}
            {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            7. The Instant Discount Offer may be availed only once by each User
            during the Tenure of Instant Discount Offer.{"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            8. Instant Discount Offer cannot be combined with any other
            promotion offered by B local or …….{"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            9. Blocal or Channel Partners may at its discretion, modify the
            terms of the Instant Discount Offer at any time, and without any
            intimation to Users {"\n"}
          </Text>
          <Text allowFontScaling={false} style={styles.modalText}>
            10. Blocal do not assume any liability whatsoever arising out of
            this Instant Discount Offer. Maximum liability of Blocal is limited
            only to the value of the minimum billing amount of the Instant
            Discount Offer.
            {"\n"}
          </Text>
        </View>
        <View style={styles.bottomTabs}>
          <Button
            title="Cancel"
            width={scaledValue(205.69)}
            height={scaledValue(58.05)}
            borderColor="#CACACA"
            color="#000000"
            borderRadius={scaledValue(8)}
            fontSize={scaledValue(26)}
            fontFamily="Lato-Medium"
            onPress={() => {
              props.hideModal();
            }}
          />
          <Button
            title="Accept"
            width={scaledValue(202.54)}
            height={scaledValue(58.05)}
            backgroundColor="#F8993A"
            borderColor="#F8993A"
            color="#FFFFFF"
            borderRadius={scaledValue(8)}
            fontSize={scaledValue(26)}
            fontFamily="Lato-Regular"
            onPress={() => {
              props.hideModal();
            }}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    left: scaledValue(50),
    width: scaledValue(626),
    height: scaledValue(1014),
    borderRadius: scaledValue(8),
    paddingLeft: scaledValue(51),
    paddingRight: scaledValue(47),
    paddingBottom: scaledValue(45.5),
    paddingTop: scaledValue(65),
  },
  modalHeading: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Bold",
    color: "#555555",
  },
  modalHeadingView: { marginBottom: scaledValue(43) },
  modalBody: {
    marginRight: scaledValue(30),
  },
  modalText: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
    color: "#000000",
  },
  scrollbar: {
    // backgroundColor: "pink",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
