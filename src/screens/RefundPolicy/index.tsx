/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const RefundPolicy = (props) => (
  <View style={styles.refundPolicyView}>
    <Header
      headerTitle="Refund Policy"
      goBack={() => {
        props.navigation.goBack();
      }}
    />
    <View style={styles.refundPolicyMainView}>
      <Text allowFontScaling={false} style={styles.refundPolicyText}>
        The transaction initiated by Buyer/s shall be confirmed and executed
        pursuant to Buyer/s confirmation. The Vendor/s shall have no right to
        cancel the orders placed by the Buyer/s.
      </Text>
      <Text allowFontScaling={false} style={styles.refundPolicyText}>
        Further, as long as the Vendor/s has not executed or shipped the order
        or the Vendor/s is willing to accept the changes in the order, Buyer/s
        are free to alter the order or cancel the order. Any payment made
        towards such cancelled or altered order shall be refunded by the
        Vendor/s either by cash or to your i.e., Buyer/s authorised account in a
        reasonable time based on payment gateway provider. However, in the event
        the Vendor/s has already shipped your order you order is final and
        cannot be altered or cancelled through the Platform. Under such
        circumstances only the Vendor/s may cancel your order on the Platform
        pursuant to your specific request to the Vendor/s.
      </Text>
    </View>
  </View>
);

export default RefundPolicy;

const styles = StyleSheet.create({
  refundPolicyView: {
    flex: 1,
  },
  refundPolicyText: {
    fontSize: scaledValue(31),
    lineHeight: scaledValue(46),
    marginTop: scaledValue(48),
    width: scaledValue(657),
    fontFamily: "Lato-Medium",
  },
  refundPolicyMainView: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  refundPolicyContactText: {
    fontSize: scaledValue(31),
    lineHeight: scaledValue(46),
    width: scaledValue(661),
  },
});
